import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Chats = ({ chatsList, activeRoomId, setActiveRoomId }) => {
  // console.log(chatsList);
  return (
    <SidebarMenu>
      {chatsList.map((item) => (
        <SidebarMenuItem
          key={item.roomId}
          className={
            activeRoomId === item.roomId ? "bg-zinc-800 rounded-sm" : ""
          }
        >
          <SidebarMenuButton
            className="h-12"
            onClick={() => setActiveRoomId(item.roomId)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg font-display bg-sky-900">{`${
                  item.roomName[0]
                }${item.roomName[item.roomName.length - 1]}`}</AvatarFallback>
              </Avatar>
              <p>{item.roomName}</p>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default Chats;
