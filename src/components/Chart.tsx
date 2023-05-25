import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { BinResults, BinsLiquidity, ChartData } from "../types";
import { generateChartData } from "../utils/bins";
import { binNames } from "../utils/constants";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    const jimboValue = entry.maxBinValue
      ? entry.maxBinValue
      : entry.liquidityJIMBO;
    const ethValue = entry.liquidityETH;
    const name = binNames[label] ?? label;
    const binId = entry.binId;

    return (
      <div className="custom-tooltip">
        <p className="label">{`${name !== "" ? name : "Bin"}: ${binId}`}</p>
        <p className="label">{`ETH Liquidity: ${ethValue}`}</p>
        <p className="label">{`JIMBO Liquidity: ${jimboValue}`}</p>
      </div>
    );
  }

  return null;
};
export const BinChart: React.FC<{
  binsLiquidity: BinsLiquidity[];
  binResults: BinResults;
}> = ({ binsLiquidity, binResults }) => {
  console.log({ binsLiquidity, binResults });

  const data: ChartData[] = generateChartData(binsLiquidity, binResults);
  console.log({ data });

  return (
    <>
      <BarChart
        width={1500}
        height={600}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={100}
        />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar yAxisId="left" dataKey="liquidityETH" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="liquidityJIMBO" fill="#82ca9d" />
      </BarChart>
    </>
  );
};

export default BinChart;
