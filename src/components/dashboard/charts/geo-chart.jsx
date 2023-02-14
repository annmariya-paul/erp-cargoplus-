// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/geo
import { ResponsiveChoropleth } from "@nivo/geo";
import geoData from "./geo_data";
import countries from "../../../constants/world_countries.json";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const GeoChart = () => (
  <ResponsiveChoropleth
    data={geoData}
    features={countries?.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[0, 1000000]}
    unknownColor="#ffffff"
    label="properties.name"
    valueFormat=".2s"
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.2}
    borderColor="#152538"
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
      {
        id: "gradient",
        type: "linearGradient",
        colors: [
          {
            offset: 0,
            color: "#000",
          },
          {
            offset: 100,
            color: "inherit",
          },
        ],
      },
    ]}
    fill={[
      {
        match: {
          id: "CAN",
        },
        id: "dots",
      },
      {
        match: {
          id: "CHN",
        },
        id: "lines",
      },
      {
        match: {
          id: "ATA",
        },
        id: "gradient",
      },
    ]}
    legends={[]}
  />
);

export default GeoChart;
