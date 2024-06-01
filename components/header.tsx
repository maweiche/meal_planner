import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import LightModeLogo from '@/public/lightModeLogo.svg'
import DarkModeLogo from '@/public/darkModeLogo.svg'

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          {/* <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden size-6 mr-2 dark:block" /> */}
          <Image
            src={LightModeLogo}
            alt="Plan 2 Eat Logo"
            className='mr-2 dark:hidden'
            width={140}
          />
          <Image
            src={DarkModeLogo}
            alt="Next Chat Logo"
            className='hidden mr-2 dark:block'
            width={140}
          />
        </Link>
      )}
      <div className="flex items-center">
        {session && <IconSeparator className="size-6 text-muted-foreground/50" />}
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export async function Header() {
  const session = (await auth()) as Session
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      {session?.user && (
        <div className="flex items-center justify-end space-x-2">
          <Link href="/new" rel="nofollow">
              {/* <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
            <IconNextChat className="hidden size-6 mr-2 dark:block" /> */}
            <Image
              src={LightModeLogo}
              alt="Plan 2 Eat Logo"
              className='mr-2 dark:hidden'
              width={140}
            />
            <Image
              src={DarkModeLogo}
              alt="Next Chat Logo"
              className='hidden mr-2 dark:block'
              width={140}
            />
          </Link>
        </div>
      )}
    </header>
  )
}
