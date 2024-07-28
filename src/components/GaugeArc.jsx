import { useMemo } from "react";
import { scaleLinear, lineRadial } from "d3";

/** Ratio of arc to size of container. */
const baseRatio = 0.8;

const arcResolution = 100;

const GaugeArc = ({
  inset = 0,
  min = 0,
  max = 1,
  maxAngle,
  minAngle,
  center = { x: 125, y: 135 },
  ...props
}) => {

  /** Arc End */
  const maxRatio = maxAngle / 180;
  const arcMax = Math.PI * maxRatio;

  /** Arc Start */
  const minRatio = minAngle / 180;
  const arcMin = Math.PI * minRatio;

  const refToRads = useMemo(() => scaleLinear()
    .domain([0, 1])
    .range([arcMin, arcMax]), [arcMin, arcMax]);

  const arcScale = useMemo(() => scaleLinear()
    .domain([0, arcResolution - 1])
    .range([refToRads(min), refToRads(max)]), [refToRads, min, max]);

  const arc = useMemo(() => lineRadial()
    .angle((d, i) => arcScale(i))
    .radius((250 * baseRatio) / 2 - inset), [arcScale, inset]);

  const arcPath = arc({ length: arcResolution });

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
