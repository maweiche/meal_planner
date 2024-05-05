import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { saveChat, getChats } from '@/app/actions'
import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { Session } from '@/lib/types'
import { useUIState, useAIState } from 'ai/rsc'
import { AI, UIState, getUIStateFromAIState } from '@/lib/chat/actions'
import { ChatList } from '@/components/chat-list'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  console.log('chat page params', params)
  const session = (await auth()) as Session
  console.log('chat page session', session)
  const missingKeys = await getMissingKeys()
  // const [messages] = useUIState()
  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const userId = session.user.id as string
  const chat = await getChat(params.id, userId)
  console.log('get chat result ', chat.messages)
  // if (!chat) {
  //   redirect('/')
  //   // const newChat = {
  //   //   id: params.id,
  //   //   title: 'first chat',
  //   //   createdAt: new Date(),
  //   //   userId,
  //   //   path: `/chat/${params.id}`,
  //   //   messages
  //   // }
  //   // console.log('new chat', newChat)
  //   // await saveChat(newChat)
      
  // }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  const uiState: UIState = getUIStateFromAIState(chat)
  console.log('chat page uiState', uiState)
  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      {/* chat messages fetched { chat.messages[0].content } */}
      <Chat
        id={chat.id}
        session={session}
        initialMessages={uiState}
        missingKeys={missingKeys}
      />
      {/* <ChatList messages={uiState} isShared={true} /> */}
    </AI>
  )
}
