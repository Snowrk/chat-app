import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const MobileOnlineUsers = ({
  onlineList,

  connectPrivateRoom,
}) => {
  return (
    <div className="flex flex-col flex-grow">
      <ScrollArea className="flex-grow">
        <ul className="list-none p-0 m-0 h-40 flex-grow">
          {onlineList.map((item) => (
            <li key={item.userId}>
              <Button
                variant="ghost"
                className="w-full h-fit pt-4 pb-4 justify-start"
                onClick={() => connectPrivateRoom(item)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarFallback className="rounded-lg text-lg font-display bg-orange-800">{`${
                      item.userName[0]
                    }${
                      item.userName[item.userName.length - 1]
                    }`}</AvatarFallback>
                  </Avatar>
                  <p>{item.userName}</p>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default MobileOnlineUsers;
