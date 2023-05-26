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
  ResponsiveContainer,
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
      <div className="p-2 border rounded bg-white text-black">
        <p className="text-sm mb-1">{`${
          name !== "" ? name : "Bin"
        }: ${binId}`}</p>
        <p className="text-sm mb-1">{`ETH Liquidity: ${ethValue}`}</p>
        <p className="text-sm mb-1">{`JIMBO Liquidity: ${jimboValue}`}</p>
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

  const [showTruncatedEnd, setShowTruncatedEnd] = React.useState(false);
  const [showTruncatedStart, setShowTruncatedStart] = React.useState(false);

  const data: ChartData[] = generateChartData(binsLiquidity, binResults);

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        width={1000}
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
        <Bar yAxisId="left" dataKey="liquidityETH" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
        <Bar yAxisId="right" dataKey="liquidityJIMBO" fill="#81ca9d">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BinChart;
