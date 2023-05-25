import { WagmiConfig } from "wagmi";
import "../styles/globals.css";
import { config } from "../utils/wagmi";

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
