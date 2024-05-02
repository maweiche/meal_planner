'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { Message } from '@/lib/chat/actions'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { saveChat, getChats } from '@/app/actions'
import { type Chat } from '@/lib/types'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  async function getAndSaveChat() {
    if(!id) {
      console.log('no id')
      return
    }
    if(messages.length === 0) {
      console.log('no messages')
      return
    }
    const createdAt = new Date()
    const userId = session!.user.id as string
    const path = `/chat/${id}`
    
    console.log('chat not found in chats, saving chats')
    console.log('messages', messages)
    console.log('aiState', aiState)
    const title = messages[0].display.props.children.substring(0, 100)
    const newChat: Chat = {
      id,
      title,
      createdAt,
      userId,
      path,
      messages: aiState.messages,
    }
    console.log('new chat,',typeof newChat)
    const chats = await getChats(userId)
    console.log('chats', chats)
    // if (!chats.find((c) => c.id === chats!.id)) {
      console.log('chat not found in chats, saving chats')
      saveChat(newChat) 
    // }
  }

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
        // getAndSaveChat()
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
  //   if (messagesLength === 2) {
  //     router.refresh()
  //   }
  if(messagesLength > 0) {
  console.log('aiState.messages', aiState.messages)
  console.log('messagesLength', messagesLength)
  getAndSaveChat()
  }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <>
            messages.length is {messages.length}
            <ChatList messages={messages} isShared={false} session={session} />
          </>
          
        ) : (
          <>  
            message.length is {messages.length}
            <EmptyScreen />
          </>
          
        )}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}
