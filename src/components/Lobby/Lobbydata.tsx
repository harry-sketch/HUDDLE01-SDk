import Button from "../common/Button";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import useSdkStore from "@/store";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LobbyData: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const displayName = useSdkStore((state) => state.displayName);
  const setDisplayName = useSdkStore((state) => state.setDisplayName);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-6">
        <Button event="JOIN_LOBBY" className="px-6">
          Join Lobby
        </Button>
        <Button className="p-1.5" event="DISABLE_CAM">
          <BsCameraVideoOff size={25} />
        </Button>

        <Button className="p-1.5" event="ENABLE_CAM">
          <BsCameraVideo size={25} />
        </Button>

        <Button className="px-6" event="JOIN_ROOM">
          Start Demo
        </Button>

        <Button className="p-1.5" event="ENABLE_MIC">
          <CiMicrophoneOn size={25} />
        </Button>
        <Button className="p-1.5" event="ENABLE_MIC">
          <CiMicrophoneOff size={25} />
        </Button>

        <Button className="p-1.5" event="STOP_PRODUCING_CAM">
          <BsCameraVideoOff size={25} />
        </Button>

        <Button className="p-1.5" event="PRODUCE_CAM">
          <BsCameraVideo size={25} />
        </Button>
        <Button event="LEAVE_ROOM" className="px-6">
          Leave Room
        </Button>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-6 glassButton h-10 w-auto flex items-center justify-center text-sm rounded-xl font-bold"
        >
          {isOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        {/* <Button className="p-1.5" event="PRODUCE_MIC">
          <CiMicrophoneOn size={25} />
        </Button>
        <Button className="p-1.5" event="STOP_PRODUCING_MIC">
          <CiMicrophoneOff size={25} />
        </Button> */}
      </div>
    </div>
  );
};

export default LobbyData;
