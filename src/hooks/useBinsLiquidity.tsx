import { fillBins } from "../utils/bins";
import { JIMBO_POOL_ADDRESS, e18BN } from "../utils/constants";
import ILBPair from "../files/ILBPair";
import { useContractReads } from "wagmi";
import { BinsLiquidity } from "../types";

const jimboPoolContract = {
  address: JIMBO_POOL_ADDRESS,
  abi: ILBPair,
};

const useBinsLiquidity = (
  startBin: number | undefined,
  endBin: number | undefined
): BinsLiquidity[] => {
  const bins = fillBins(startBin, endBin);

  const { data, isError, isLoading } = useContractReads({
    contracts: bins.map((binId) => ({
      ...jimboPoolContract,
      functionName: "getBin",
      args: [binId],
    })),
  });

  if (!startBin || !endBin) return [];

  if (isError) {
    return [];
  }
  if (isLoading) {
    return [];
  }

  const binsLiquidity: BinsLiquidity[] = data.map((bin, index: number) => {
    if (bin.status === "success") {
      return {
        binId: bins[index],
        liquidityJIMBO: Number(bin.result[0]) / 1e18,
        liquidityETH: Number(bin.result[1]) / 1e18,
      };
    }
  });

  return binsLiquidity;
};

export default useBinsLiquidity;
