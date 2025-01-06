import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";

const uri = process.env.NEXT_PUBLIC_API;

const OnlineUsers = ({ onlineList, connectPrivateRoom }) => {
  return (
    <SidebarMenu>
      {onlineList.map((item) => (
        <SidebarMenuItem key={item.userId}>
          <SidebarMenuButton
            className="h-12"
            onClick={() => connectPrivateRoom(item)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-orange-800 font-display">{`${
                  item.userName[0]
                }${item.userName[item.userName.length - 1]}`}</AvatarFallback>
              </Avatar>
              <p>{item.userName}</p>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default OnlineUsers;
