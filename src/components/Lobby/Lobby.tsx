import { useEventListener } from "@huddle01/react";
import { useHuddle01Web } from "@huddle01/react/hooks";
import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { CiMicrophoneOn, CiCamera, CiMicrophoneOff } from "react-icons/ci";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";

const Lobby = () => {
  const [isCamPaused, setIsCamPaused] = useState(false);

  const { state, send } = useHuddle01Web();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    send("INIT");
    send("JOIN_LOBBY");
  }, [send]);

  useEventListener(state, "JoinedLobby.Cam.On", () => {
    if (videoRef.current && state.context.camStream) {
      videoRef.current.srcObject = state.context.camStream as MediaStream;
    }
  });

  return (
    <div className="flex  flex-col items-center justify-center gap-6 w-full h-full">
      <div className="glassPanel">
        {videoRef ? (
          <video
            ref={videoRef}
            muted
            autoPlay
            className="rounded-lg object-cover w-full h-full "
            width="100%"
            height="100%"
          />
        ) : (
          "lol"
        )}
      </div>

      <div className="flex items-center gap-6">
        <Button className="p-1.5" event="DISABLE_CAM">
          <BsCameraVideoOff size={25} />
        </Button>

        <Button className="p-1.5" event="ENABLE_CAM">
          <BsCameraVideo size={25} />
        </Button>

        <Button event="JOIN_ROOM" className="px-6">
          Start Demo
        </Button>

        <Button className="p-1.5" event="ENABLE_MIC">
          <CiMicrophoneOn size={25} />
        </Button>
        <Button className="p-1.5" event="ENABLE_MIC">
          <CiMicrophoneOff size={25} />
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
