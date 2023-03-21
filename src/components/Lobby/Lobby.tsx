import { useEventListener } from "@huddle01/react";
import { useHuddle01Web } from "@huddle01/react/hooks";
import { useEffect, useRef } from "react";

import { useRouter } from "next/router";
import useSdkStore from "@/store";
import RoomData from "../RoomData/RoomData";
import LobbyData from "./Lobbydata";
import Video from "../Video/Video";

const Lobby = () => {
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
    <div className="flex  flex-col items-center justify-center w-full h-full gap-4">
      <div className="glassPanel">
        Me Video:
        <video ref={videoRef} autoPlay muted></video>
        <div className="grid grid-cols-4">
          {Object.keys(state.context.consumers)
            .filter(
              (consumerId) =>
                state.context.consumers[consumerId] &&
                state.context.consumers[consumerId].track?.kind === "video"
            )
            .map((consumerId) => (
              <Video
                key={consumerId}
                track={state.context.consumers[consumerId].track}
              />
            ))}
        </div>
      </div>

      <LobbyData />
    </div>
  );
};

export default Lobby;
