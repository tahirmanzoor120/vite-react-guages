import { useMemo } from "react";
import { symbol, symbolTriangle } from "d3";

const InvertedTriangle = ({ center, disabled }) => {
  const pathData = useMemo(() => symbol().type(symbolTriangle)(), []);

  return (
    <path
      className="gauge-target"
      d={pathData}
      transform={`translate(${center.x},${center.y - 110}) rotate(180)`}
      fill={disabled ? "#adb2ba" : "#ffa500"}
      stroke={disabled ? "#adb2ba" : "#000"}
      strokeWidth={1}
      style={{
        transition: "all 0.25s 0.25s"
      }}
    />
  );
};

export default InvertedTriangle;
