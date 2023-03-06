import { Bar } from "@nivo/bar";
import data from "./data";

function BarChart({ layout = "horizontal" }) {
  return (
    <Bar
      height={450}
      width={410}
      data={data}
      keys={["dp_world", "maersk", "air_cargo", "hvclean", "real_logistics"]}
      indexBy="agents"
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      pixelRatio={1}
      padding={0.3}
      innerPadding={0}
      minValue="auto"
      maxValue="auto"
      layout={layout}
      reverse={false}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "paired" }}
      colorBy="keys"
      borderWidth={1}
      borderRadius={0}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={{
        legend: "Jobs By Agents",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
        tickRotation: 50,
      }}
      enableGridX={false}
      enableGridY={false}
      labelSkipWidth={124}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 5]],
      }}
      isInteractive={true}
      legends={[]}
      enableLabel={true}
      tooltip={(data) => {
        // console.log("Bar : ", data);
        return (
          <div className="bg-white text-black px-2 py-1 border rounded">
            {data?.indexValue} - {data?.formattedValue}
          </div>
        );
      }}
    />
  );
}

export default BarChart;
