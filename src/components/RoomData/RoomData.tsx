import { useHuddle01Web } from "@huddle01/react/hooks";
import { useRef } from "react";
import Button from "../common/Button";
import Video from "../Video/Video";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import useSdkStore from "@/store";

const RoomData = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const displayName = useSdkStore((state) => state.displayName);

  const { state } = useHuddle01Web();

  const { consumers } = state.context;

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
      <div className="flex items-center justify-center gap-6 w-full p-2">
        <div className="glassPanel">
          <video
            ref={videoRef}
            muted
            autoPlay
            className="rounded-lg object-cover w-full h-full"
            width="100%"
            height="100%"
          />
        </div>
        <div
          className={`${
            Object.keys(consumers).length > 0
              ? "glassPanel grid grid-cols-4 gap-4"
              : "hidden"
          }`}
        >
          {Object.keys(consumers)
            .filter(
              (consumerId) =>
                consumers[consumerId] &&
                consumers[consumerId].track.kind === "video"
            )
            .map((consumerId) => (
              <Video key={consumerId} track={consumers[consumerId].track} />
            ))}
        </div>
      </div>

      <div className="text-xl text-slate-50 font-semibold capitalize">
        {displayName}
      </div>

      <div className="flex items-center gap-6">
        <Button className="p-1.5" event="STOP_PRODUCING_CAM">
          <BsCameraVideoOff size={25} />
        </Button>

        <Button className="p-1.5" event="PRODUCE_CAM">
          <BsCameraVideo size={25} />
        </Button>
        <Button event="LEAVE_ROOM" className="px-6">
          Leave Room
        </Button>

        <Button className="p-1.5" event="PRODUCE_MIC">
          <CiMicrophoneOn size={25} />
        </Button>
        <Button className="p-1.5" event="STOP_PRODUCING_MIC">
          <CiMicrophoneOff size={25} />
        </Button>
      </div>
    </div>
  );
};

export default RoomData;
