import { Calendar, Home, Inbox, LayoutTemplate, MonitorSpeaker, Pen, PenTool, Search, Settings,User, WalletCards } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
// Menu items.<PenTool />
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Templates",
    url: "templates",
    icon: LayoutTemplate,
  },
  {
    title: "Editor",
    url: "editor",
    icon: PenTool,
  },
  {
    title: "Invoice",
    url: "invoice",
    icon: WalletCards,
  },
  {
    title: "Employee",
    url: "employee",
    icon: User,
  },
  {
    title: "Attendance",
    url: "attendance",
    icon: Inbox,
  },
  {
    title: "Device",
    url: "device",
    icon: MonitorSpeaker,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <Link href={'/'} className="cursor-pointer p-3">
          <p className="uppercase">Multi<span className="font-bold">VAR</span></p> 
          </Link>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
