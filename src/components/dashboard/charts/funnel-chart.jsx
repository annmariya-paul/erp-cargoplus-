// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/funnel
import { ResponsiveFunnel } from "@nivo/funnel";
import funnelData from "./funnel_data";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const FunnelChart = () => (
  <ResponsiveFunnel
    data={funnelData}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    valueFormat=">-.4s"
    colors={{ scheme: "spectral" }}
    borderWidth={0}
    borderOpacity={0}
    labelColor={{
      from: "color",
      modifiers: [["darker", 3]],
    }}
    beforeSeparatorLength={100}
    beforeSeparatorOffset={20}
    afterSeparatorLength={100}
    afterSeparatorOffset={20}
    currentPartSizeExtension={10}
    currentBorderWidth={40}
    motionConfig="stiff"
    shapeBlending={0.5}
  />
);

export default FunnelChart;
