import React from "react";

const Rectangle = ({
  x = 0,
  y = 0,
  width = 100,
  height = 50,
  fill = "none",
  stroke = "black",
  strokeWidth = 2,
  number = 0,
  numberColor = "black",
  numberSize = 16,
  ...props
}) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        rx={4}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{
          transition: "all 0.25s 0.25s"
        }}
      />
      <text
        x={x + width / 2}
        y={(y + height / 2) + 2}
        fill={numberColor}
        fontSize={numberSize}
        fontFamily="Roboto, sans-serif"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{
          transition: "all 0.25s 0.25s"
        }}
      >
        {number}
      </text>
    </g>
  );
};

export default Rectangle;
