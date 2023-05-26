import { BinResults, BinsLiquidity, ChartData } from "../types";
import { binColors, binNames } from "./constants";

export function fillBins(startBin: number, endBin: number) {
  const bins: number[] = [];
  for (let i = startBin; i <= endBin; i++) {
    bins.push(i);
  }
  return bins;
}

const BINS_FILTER = 2;

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
  let initialToFloorBinsCount = 0;

  // Make sure we always include the triggerBin in the chart
  const limitBin = Math.max(triggerBin, activeBin + BINS_FILTER);

  let truncatedBinsCount = maxBin - limitBin > 0 ? maxBin - limitBin : 0;

  const chartData = binsLiquidity
    .filter((bin) => bin.binId !== maxBin)
    .map((bin) => {

      // Skip and count bins that are over the limitBin
      if (bin.binId > limitBin && bin.binId < maxBin) {
        return null; // this will be filtered out later
      }

      // Skip bins between the initialBin and the floorBin (exclusive)
      if (
        initialBin &&
        floorBin &&
        bin.binId > initialBin &&
        bin.binId < floorBin
      ) {
        initialToFloorBinsCount += 1;
        return null; // this will be filtered out later
      }

      let name = ``;
      let color = "grey"; // Default color

      if (bin.binId === activeBin) {
        name = binNames.activeBin ?? name;
        color = binColors.activeBin ?? color;
      } else if (bin.binId === floorBin) {
        name = binNames.floorBin ?? name;
        color = binColors.floorBin ?? color;
      } else if (
        bin.binId >= anchorBin &&
        bin.binId < anchorBin + numAnchorBins
      ) {
        name = binNames.anchorBin ?? name;
        color = binColors.anchorBin ?? color;
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
    })
    .filter((bin) => bin !== null); // filter out skipped bins

  // Add a bin to represent truncated bins, if any
  if (truncatedBinsCount > 0) {
    chartData.push({
      binId: activeBin + 16, // just after the last included bin
      liquidityETH: 0,
      liquidityJIMBO: 0,
      name: `Truncated (${truncatedBinsCount})`,
      color: "purple", // Choose your preferred color for truncated bins
    });
  }

  // Add a bin to represent bins between the initialBin and the floorBin
  if (initialToFloorBinsCount > 0) {
    const initialBinIndex = chartData.findIndex(
      (bin) => bin.binId === initialBin
    );

    chartData.splice(initialBinIndex + 1, 0, {
      binId: initialBin + 1, // just after the initial bin
      liquidityETH: 0,
      liquidityJIMBO: 0,
      name: `Initial to Floor (${initialToFloorBinsCount})`,
      color: "orange", // Choose your preferred color for these bins
    });
  }

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
