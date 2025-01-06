import { ChevronLeft, Settings } from "lucide-react";
import { Button } from "./ui/button";

export const Account = ({ closeAccount }) => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="p-10 flex items-center gap-1">
        <Button variant="ghost" onClick={closeAccount}>
          <ChevronLeft />
        </Button>
        <Settings />
        <h1 className="text-center">Account Settings</h1>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <p>empty</p>
      </div>
    </div>
  );
};
