import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { NavUser } from "./nav-user";
import Chats from "./chats";
import OnlineUsers from "./online-users";

// const onlineList = [
//   {
//     id: 1,
//     name: "User1",
//   },
//   {
//     id: 2,
//     name: "User2",
//   },
//   {
//     id: 3,
//     name: "User3",
//   },
//   {
//     id: 4,
//     name: "User4",
//   },
//   {
//     id: 5,
//     name: "User5",
//   },
//   {
//     id: 6,
//     name: "User6",
//   },
//   {
//     id: 7,
//     name: "User7",
//   },
//   {
//     id: 8,
//     name: "User8",
//   },
//   {
//     id: 9,
//     name: "User9",
//   },
//   {
//     id: 10,
//     name: "User10",
//   },
// ];

// const chatsList = [
//   {
//     id: 1,
//     name: "Global",
//   },
//   {
//     id: 2,
//     name: "Private1",
//   },
//   {
//     id: 3,
//     name: "Private2",
//   },
//   {
//     id: 4,
//     name: "Private3",
//   },
//   {
//     id: 5,
//     name: "Private4",
//   },
//   {
//     id: 6,
//     name: "Private5",
//   },
//   {
//     id: 7,
//     name: "Private6",
//   },
//   {
//     id: 8,
//     name: "Private7",
//   },
//   {
//     id: 9,
//     name: "Private8",
//   },
//   {
//     id: 10,
//     name: "Private9",
//   },
// ];

// Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

// const user = {
//   name: "shadcn",
//   email: "m@example.com",
//   avatar: "/avatars/shadcn.jpg",
// };

export function AppSidebar({
  activeRoomId,
  setActiveRoomId,
  showAccount,
  profile,
  chatsList,
  onlineList,
  logout,
  connectPrivateRoom,
}) {
  return (
    <div className="flex flex-col w-[240px] flex-shrink-0 bg-zinc-900 border-r-2">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image width={40} height={40} src="/message.png" alt="logo" />
          <p className="font-display text-3xl text-sky-600">ChatApp</p>
        </div>
      </SidebarHeader>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Chats
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <ScrollArea>
              <SidebarGroupContent className="max-h-[calc(50vh-140px)]">
                <Chats
                  chatsList={chatsList}
                  activeRoomId={activeRoomId}
                  setActiveRoomId={setActiveRoomId}
                />
              </SidebarGroupContent>
            </ScrollArea>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Online
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <ScrollArea>
              <SidebarGroupContent className="max-h-[calc(50vh-140px)]">
                <OnlineUsers
                  onlineList={onlineList}
                  connectPrivateRoom={connectPrivateRoom}
                />
              </SidebarGroupContent>
            </ScrollArea>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      <SidebarFooter className="mt-auto border-t-2 h-[70px] flex items-center">
        <NavUser profile={profile} showAccount={showAccount} logout={logout} />
      </SidebarFooter>
    </div>
  );
}
