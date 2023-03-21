import { useEventListener } from "@huddle01/react";
import { useHuddle01Web } from "@huddle01/react/hooks";
import { useEffect, useRef, useState } from "react";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import Button from "../common/Button";
import { useRouter } from "next/router";

const Lobby = () => {
  const [displayName, setDisplayName] = useState<string>("");

  const { state, send } = useHuddle01Web();

  const { consumers } = state.context;

  const videoRef = useRef<HTMLVideoElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const { push } = useRouter();

  useEffect(() => {
    send("INIT");
    send("JOIN_LOBBY");
  }, [send]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEventListener(state, "JoinedLobby.Cam.On", () => {
    if (videoRef.current && state.context.camStream) {
      videoRef.current.srcObject = state.context.camStream as MediaStream;
    }
  });

  // Funs
  const handleJoinRoom = () => {
    send("JOIN_ROOM");

    push("/room");
  };

  return (
    <div className="flex  flex-col items-center justify-center gap-6 w-full h-full">
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

      <div>
        <input
          ref={inputRef}
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your first Name"
          className="glassButton text-base focus:outline-none border-none p-2.5 rounded-lg w-96"
        />
      </div>

      <div className="flex items-center gap-6">
        <Button className="p-1.5" event="DISABLE_CAM">
          <BsCameraVideoOff size={25} />
        </Button>

        <Button className="p-1.5" event="ENABLE_CAM">
          <BsCameraVideo size={25} />
        </Button>

        <button
          onClick={handleJoinRoom}
          type="button"
          className="glassButton h-10 w-auto flex items-center justify-center text-base rounded-xl font-bold px-6"
        >
          Start Demo
        </button>

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
