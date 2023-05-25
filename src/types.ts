export interface BinResults {
  initialBin: number | undefined;
  numAnchorBins: number | undefined;
  floorBin: number | undefined;
  maxBin: number | undefined;
  anchorBin: number | undefined;
  triggerBin: number | undefined;
  activeBin: number | undefined;
}

export interface BinsLiquidity {
  binId: number;
  liquidityETH: number;
  liquidityJIMBO: number;
}

export interface ChartData extends BinsLiquidity {
  name: string;
  color: string;
  maxBinValue?: number;
}
