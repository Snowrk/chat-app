import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const MobileChats = ({ chatsList, setActiveRoomId }) => {
  return (
    <div className="flex flex-col flex-grow">
      <ScrollArea className="flex-grow">
        <ul className="list-none p-0 m-0 h-40">
          {chatsList.map((item) => (
            <li key={item.roomId}>
              <Button
                variant="ghost"
                className="w-full h-fit pt-4 pb-4 justify-start"
                onClick={() => setActiveRoomId(item.roomId)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarFallback className="rounded-lg font-display text-lg bg-sky-900">{`${
                      item.roomName[0]
                    }${
                      item.roomName[item.roomName.length - 1]
                    }`}</AvatarFallback>
                  </Avatar>
                  <p>
                    {item.roomName.length > 20
                      ? `${item.roomName.slice(0, 20)}...`
                      : item.roomName}
                  </p>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default MobileChats;
