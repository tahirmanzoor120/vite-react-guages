import { useMemo } from "react";
import { scaleLinear, lineRadial } from "d3";

/** Ratio of arc to size of container. */
const baseRatio = 0.8;

/** Resolution of arc. */
const length = 40;

const GaugeArc = ({
  inset = 0,
  min = 0,
  max = 1,
  maxAngle,
  minAngle,
  center = { x: 125, y: 135 },
  ...props
}) => {

  /** Calculate max angle of arc from degrees to radians */
  const maxRatio = maxAngle / 180;
  const arcMax = Math.PI * maxRatio;

  /** Calculate min angle of arc from degrees to radians */
  const minRatio = minAngle / 180;
  const arcMin = Math.PI * minRatio;

  /** Linear map from [0,1] to [-135,135] degrees in radians */
  const refToRads = useMemo(() => scaleLinear()
    .domain([0, 1])
    .range([arcMin, arcMax]), [arcMin, arcMax]);

  /** Render scale to map [0,length - 1] to [minAngle, maxAngle] for rendering */
  const arcScale = useMemo(() => scaleLinear()
    .domain([0, length - 1])
    .range([refToRads(min), refToRads(max)]), [refToRads, min, max]);

  /** Actual path function to generate path. */
  const arc = useMemo(() => lineRadial()
    .angle((d, i) => arcScale(i))
    .radius((250 * baseRatio) / 2 - inset), [arcScale, inset]);

  const arcPath = arc({ length });

  return (
    <path
      className="gauge-arc"
      d={arcPath}
      transform={`translate(${center.x},${center.y})`}
      fill="transparent"
      style={{
        transition: "all 0.25s 0.25s"
      }}
      {...props}
    />
  );
};

export default GaugeArc;
