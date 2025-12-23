"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user } = useUser()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {
          user ?
            <div>
              <UserButton />
            </div> : null
        }
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
