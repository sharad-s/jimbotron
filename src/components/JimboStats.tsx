import React from "react";

import { BinChart } from "./Chart";
import useBinsLiquidity from "../hooks/useBinsLiquidity";
import { BinResults } from "../types";
import useBinData from "../hooks/useBinData";

export const JimboStats = () => {
  const binResults = useBinData();

  const binsLiquidity = useBinsLiquidity(
    binResults.initialBin,
    binResults.maxBin
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Start Bin ID: {binResults.initialBin}</h1>
        <h1 className="text-3xl mb-2">
          Floor Bin ID: {binResults.floorBin} (+
          {binResults.floorBin - binResults.initialBin} above startBin)
        </h1>
        <h1 className="text-3xl mb-2">
          Anchor Bin: {binResults.anchorBin} (+
          {binResults.anchorBin - binResults.floorBin} above floorBin){" "}
        </h1>
        <h1 className="text-3xl mb-2">
          Num Anchor Bins: {binResults.numAnchorBins}{" "}
        </h1>
        <h1 className="text-3xl mb-2">
          Active Bin ID: {binResults.activeBin} (+
          {binResults.activeBin - binResults.floorBin} above floorBin){" "}
        </h1>
        <h1 className="text-3xl mb-2">
          Trigger Bin: {binResults.triggerBin} (+
          {binResults.triggerBin - binResults.activeBin} above activeBin){" "}
        </h1>
        <h1 className="text-3xl mb-2">
          Max Bin ID: {binResults.maxBin} (+
          {binResults.maxBin - binResults.floorBin} above activeBin)
        </h1>
        <div className="border-2 p-4 rounded">
          <BinChart binResults={binResults} binsLiquidity={binsLiquidity} />
        </div>
      </div>
    </div>
  );
};

export default JimboStats;
