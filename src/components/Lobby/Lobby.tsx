import { useEventListener } from "@huddle01/react";
import { useHuddle01Web } from "@huddle01/react/hooks";
import { useEffect, useRef } from "react";

const Lobby = () => {
  const { state, send } = useHuddle01Web();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    send("INIT");
  }, [send]);

  useEventListener(state, "JoinedLobby.Cam.On", () => {
    if (videoRef.current && state.context.camStream) {
      videoRef.current.srcObject = state.context.camStream as MediaStream;
    }
  });

  return (
    <div>
      <div>{JSON.stringify(state.context.huddleClient.meId)}</div>
      <div>
        <video ref={videoRef} autoPlay muted />

        <button
          type="button"
          onClick={() => send({ type: "JOIN_LOBBY", roomId: "abc" })}
        >
          Join Lobby
        </button>

        <button type="button" onClick={() => send("ENABLE_CAM")}>
          Enable Cam
        </button>

        <button type="button" onClick={() => send("DISABLE_CAM")}>
          Disable Cam
        </button>
      </div>
    </div>
  );
};

export default Lobby;
