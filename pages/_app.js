import '../styles/globals.css'
import { useRouter } from "next/router";
import Header from "../components/header.js";

function MyApp({ Component, pageProps }) {
  var router = useRouter();
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-900 flex flex-col justify-center items-center gap-8">
      <Header />
      <Component {...pageProps} router={router} />
    </div>
  );
}

export default MyApp;