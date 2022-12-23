import Head from "next/head";
import Header from "../component/Header";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* Headerを追加 */}
      <Header/>
    </div>  
  );
}
