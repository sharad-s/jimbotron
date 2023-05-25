import { BinResults, BinsLiquidity, ChartData } from "../types";
import { binColors, binNames } from "./constants";

export function fillBins(startBin: number, endBin: number) {
  const bins: number[] = [];
  for (let i = startBin; i <= endBin; i++) {
    bins.push(i);
  }
  return bins;
}

export const generateChartData = (
  binsLiquidity: BinsLiquidity[],
  binResults: BinResults
): ChartData[] => {
  const {
    initialBin,
    numAnchorBins,
    floorBin,
    maxBin,
    anchorBin,
    activeBin,
    triggerBin,
  } = binResults;

  let maxBinData: ChartData | null = null;

  const chartData = binsLiquidity
    .filter((bin) => bin.binId !== maxBin)
    .map((bin) => {
      let name = ``;
      let color = "grey"; // Default color

      if (bin.binId === activeBin) {
        name = binNames.activeBin ?? name;
        color = binColors.activeBin ?? color;
      } else if (bin.binId <= anchorBin && bin.binId > anchorBin - numAnchorBins) {
        name = binNames.anchorBin ?? name;
        color = binColors.anchorBin ?? color;
      }  else if (bin.binId === floorBin) {
        name = binNames.floorBin ?? name;
        color = binColors.floorBin ?? color;
      } else if (bin.binId === initialBin) {
        name = binNames.initialBin ?? name;
        color = binColors.initialBin ?? color;
      } else if (bin.binId === triggerBin) {
        name = binNames.triggerBin ?? name;
        color = binColors.triggerBin ?? color;
      }

      return {
        ...bin,
        name,
        color,
      };
    });

  //   Hardcode MaxBinData and add at end for chart clarity
  if (maxBin) {
    const maxBinLiquidity = binsLiquidity.find((bin) => bin.binId === maxBin);

    if (maxBinLiquidity) {
      maxBinData = {
        ...maxBinLiquidity,
        name: binNames.maxBin ?? `Bin ${maxBin}`,
        color: binColors.maxBin ?? "blue",
        liquidityETH: 0,
        liquidityJIMBO: 1000000,
        maxBinValue: maxBinLiquidity.liquidityJIMBO, // save the actual value
      };
    }
  }

  // append the maxBinData at the end
  return maxBinData ? [...chartData, maxBinData] : chartData;
};
