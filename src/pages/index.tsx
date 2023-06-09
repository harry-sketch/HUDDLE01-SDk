import Code from "@/components/Code/Code";
import useSdkStore from "@/store";
import dynamic from "next/dynamic";
import Head from "next/head";

const Lobby = dynamic(() => import("@/components/Lobby/Lobby"), { ssr: false });

export default function Home() {
  const roomView = useSdkStore((state) => state.roomView);

  const roomViewObj: {
    [key: string]: JSX.Element;
  } = {
    normal: <Lobby />,
    code: <Code />,
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen flex items-center justify-center text-slate-300 p-2">
        {roomViewObj[roomView]}
      </main>
    </>
  );
}
