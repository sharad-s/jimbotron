import React from "react";

import { BinChart } from "./Chart";
import useBinsLiquidity from "../hooks/useBinsLiquidity";
import { BinResults } from "../types";
import useBinData from "../hooks/useBinData";

export const JimboStats = () => {

  const binResults = useBinData()

  const binsLiquidity = useBinsLiquidity(
    binResults.floorBin,
    binResults.maxBin
  );



  return (
    <div>
      <h1>Start Bin ID: {binResults.initialBin}</h1>
      <h1>
        Floor Bin ID: {binResults.floorBin} (+
        {binResults.floorBin - binResults.initialBin} above startBin)
      </h1>
      <h1>
        Anchor Bin: {binResults.anchorBin} (+
        {binResults.anchorBin - binResults.floorBin} above floorBin){" "}
      </h1>
      <h1>Num Anchor Bins: {binResults.numAnchorBins} </h1>
      <h1>
        Active Bin ID: {binResults.activeBin} (+
        {binResults.activeBin - binResults.floorBin} above floorBin){" "}
      </h1>
      <h1>
        Trigger Bin: {binResults.triggerBin} (+
        {binResults.triggerBin - binResults.activeBin} above activeBin){" "}
      </h1>
      <h1>
        Max Bin ID: {binResults.maxBin} (+
        {binResults.maxBin - binResults.floorBin} above activeBin)
      </h1>
      <BinChart binResults={binResults} binsLiquidity={binsLiquidity} />
    </div>
  );
};

export default JimboStats;
