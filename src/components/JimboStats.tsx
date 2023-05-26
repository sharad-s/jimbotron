import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";

import { BinChart } from "./Chart";
import useBinsLiquidity from "../hooks/useBinsLiquidity";
import useBinData from "../hooks/useBinData";
import Image from "next/image";

const StatsCard: React.FC<{
  label: string;
  value: string | number;
  annotation?: string;
}> = ({ label, value, annotation }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded shadow-sm">
    <h2 className="text-sm font-semibold text-gray-600">{label}</h2>
    <div className="flex flex-col items-end">
      <h3 className="text-lg font-bold text-gray-800">{value}</h3>
      {annotation && (
        <span className="ml-2 text-sm text-gray-500">{annotation}</span>
      )}
    </div>
  </div>
);

export const JimboStats = () => {
  const binResults = useBinData();

  const binsLiquidity = useBinsLiquidity(
    binResults.initialBin,
    binResults.maxBin
  );

  return (
    <div className="p-6 h-screen flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-4xl mb-4 text-white">Jimbo V2 Pool Stats</h1>
        <div className="flex justify-between space-x-4 items-center">
          <a
            href="https://arbiscan.io/token/0xc3813645ad2ea0ac9d4d72d77c3755ac3b819e38?a"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/etherscan-logo-circle-light.svg"
              width={16}
              height={16}
              alt="dexscreener"
            />
          </a>
          <a
            href="https://www.v2.jimbosprotocol.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGlobe} className="text-white" />
          </a>
          <a
            href="https://dexscreener.com/arbitrum/0x16a5d28b20a3fddecdcaf02df4b3935734df1a1f"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/dexscreener.svg"
              width={16}
              height={16}
              alt="dexscreener"
            />
          </a>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatsCard label="Start Bin " value={binResults.initialBin} />
        <StatsCard
          label="Floor Bin "
          value={binResults.floorBin}
          annotation={`(+${
            binResults.floorBin - binResults.initialBin
          } above startBin)`}
        />
        <StatsCard
          label="Anchor Bin"
          value={binResults.anchorBin}
          annotation={`(+${
            binResults.anchorBin - binResults.floorBin
          } above floorBin)`}
        />
        <StatsCard label="Num Anchor Bins" value={binResults.numAnchorBins} />
        <StatsCard
          label="Active Bin "
          value={binResults.activeBin}
          annotation={`(+${
            binResults.activeBin - binResults.floorBin
          } above floorBin)`}
        />
        <StatsCard
          label="Trigger Bin"
          value={binResults.triggerBin}
          annotation={`(+${
            binResults.triggerBin - binResults.activeBin
          } above activeBin)`}
        />
        <StatsCard
          label="Max Bin "
          value={binResults.maxBin}
          annotation={`(+${
            binResults.maxBin - binResults.floorBin
          } above activeBin)`}
        />
      </div>
      <div className="p-4 bg-rounded shadow-sm">
        <BinChart binResults={binResults} binsLiquidity={binsLiquidity} />
      </div>
    </div>
  );
};

export default JimboStats;
