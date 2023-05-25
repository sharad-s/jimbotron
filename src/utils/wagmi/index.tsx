import {  createConfig, configureChains } from "wagmi";
import { arbitrum } from '@wagmi/core/chains'
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});
