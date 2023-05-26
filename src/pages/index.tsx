import Head from "next/head";
import dynamic from "next/dynamic";
const JimboStats = dynamic(() => import("../components/JimboStats"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>JIMBOTRON</title>
        <meta name="description" content="Jimboimage.png Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <JimboStats />
     
    </div>
  );
}
