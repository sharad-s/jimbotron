import { BinResults } from "../types";

export const JIMBO_ADDRESS = "0xC3813645Ad2Ea0AC9D4d72D77c3755ac3B819e38";
export const JIMBO_CONTROLLER_ADDRESS =
  "0x271944d9d8ca831f7c0dbcb20c4ee482376d6de7";
export const JIMBO_POOL_ADDRESS = "0x16a5d28b20a3fddecdcaf02df4b3935734df1a1f";

export const e18BN = BigInt("1000000000000000000"); // 1e18

export const binColors: Partial<{ [K in keyof BinResults]: string }> = {
  activeBin: "red",
  anchorBin: "purple",
  floorBin: "green",
  initialBin: "blue",
  maxBin: "blue",
  triggerBin: "yellow",
};

export const binNames: Partial<{ [K in keyof BinResults]: string }> = {
  activeBin: "Active Bin",
  anchorBin: "Anchor Bin",
  floorBin: "Floor Bin",
  initialBin: "Initial bin",
  maxBin: "Max Bin",
  triggerBin: "Trigger Bin",
};
