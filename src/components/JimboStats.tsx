import React from "react";
import { useContractReads } from "wagmi";
import JimboControllerABI from "../files/JimboController"; // Assuming the ABI is stored in JimboABI.js file
import {
  JIMBO_CONTROLLER_ADDRESS,
  JIMBO_POOL_ADDRESS,
} from "../utils/constants";
import ILBPair from "../files/ILBPair";
import { BinChart } from "./Chart";
import useBinsLiquidity from "../hooks/useBinsLiquidity";
import { BinResults } from "../types";

const jimboContract = {
  address: JIMBO_CONTROLLER_ADDRESS,
  abi: JimboControllerABI,
};

const jimboPoolContract = {
  address: JIMBO_POOL_ADDRESS,
  abi: ILBPair,
};

export const JimboStats = () => {
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...jimboContract,
        functionName: "INITIAL_BIN_ID",
      },
      {
        ...jimboContract,
        functionName: "NUM_ANCHOR_BINS",
      },
      {
        ...jimboContract,
        functionName: "floorBin",
      },
      {
        ...jimboContract,
        functionName: "maxBin",
      },
      {
        ...jimboContract,
        functionName: "anchorBin",
      },
      {
        ...jimboContract,
        functionName: "triggerBin",
      },
      {
        ...jimboPoolContract,
        functionName: "getActiveId",
      },
    ],
  });

  console.log({ data });

  const binResults: BinResults = {
    initialBin: data && data[0] && (data[0].result as number),
    numAnchorBins: data && data[1] && (data[1].result as number),
    floorBin: data && data[2] && (data[2].result as number),
    maxBin: data && data[3] && (data[3].result as number),
    anchorBin: data && data[4] && (data[4].result as number),
    triggerBin: data && data[5] && (data[5].result as number),
    activeBin: data && data[6] && (data[6].result as number),
  };

  const binsLiquidity = useBinsLiquidity(
    binResults.floorBin,
    binResults.maxBin
  );
  console.log({ binsLiquidity });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred</div>;
  }

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
