import { useRef } from "react";

interface Props {
  track: MediaStreamTrack;
}

const Video: React.FC<Props> = ({ track }) => {
  const consuRef = useRef<HTMLVideoElement>(null);

  return <video ref={consuRef} autoPlay />;
};

export default Video;
