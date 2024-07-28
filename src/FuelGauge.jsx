import { useCallback, useMemo } from "react";
import { scaleLinear } from "d3";

import BaseSVG from './components/BaseSVG';
import GaugeArc from './components/GaugeArc';
import Label from "./components/Label";
import Pointer from "./components/Pointer";
// import InvertedTriangle from "./components/InvertedTriangle";
import UnitOfMeasurement from "./components/UnitOfMeasurement";
import Circle from "./components/Circle";
import Rectangle from "./components/Rectangle";

const defaultSize = 250;

const FuelGauge = ({
  removeDial = false,
  dialProps = {
    dialColor: 'black',
    dialRadius: 135
  },
  height,
  width,
  disabled,
  value = -1,
  min = 0,
  max = 100,
  maxAngle = 135,
  minAngle = -135,
  tickCount = 5,
  arcSegments = [{ min: 0, max: 1, color: "skyblue" }],
  labelProps = {
    offsetText: -7.5
  },
  uom = "",
  uomProps = {
    offsetText: -7.5
  },
  pointerLabel = "",
  ...props
}) => {
  const gaugeOrigin = useMemo(() => ({ x: 140, y: 140 }), []);

  const valueScale = useCallback(
    scaleLinear()
      .domain([min, max])
      .range([0, 1]),
    [min, max]
  );

  /** Value scaled to [0,1] */
  const valueRef = useMemo(() => valueScale(value), [value, valueScale]);

  return (
    <BaseSVG
      className="gauge"
      width={width || height || defaultSize}
      height={height || width || defaultSize}
      viewBox={"0 0 280 280"}
      style={{
        transition: "all 0.25s 0.25s"
      }}
      {...props}
    >
      <Rectangle
        x={100}
        y={210}
        width={80}
        height={36}
        fill="yellow"
        stroke="green"
        strokeWidth={3}
        number={35}
        numberColor="black"
        numberSize={24}
      />
      <Circle cx={140} cy={140} r={12} stroke="#333" strokeWidth={1} fill="#333" />
      {!removeDial && (
        <Circle cx={140} cy={140} r={dialProps.dialRadius ?? 135} stroke={dialProps.dialColor ?? 'black'} strokeWidth={5} fill="transparent" />)
      }
      <GaugeArc
        stroke={"#344c69"}
        strokeWidth={4}
        center={gaugeOrigin}
        maxAngle={maxAngle}
        minAngle={minAngle}
        opacity={disabled ? 0.25 : undefined}
      />
      <Label
        disabled={disabled}
        center={gaugeOrigin}
        tickCount={tickCount}
        min={min}
        max={max}
        maxAngle={maxAngle}
        minAngle={minAngle}
        {...labelProps}
      />
      {arcSegments.map(({ min, max, color, node }, idx) => (
        <g key={`arcsegment-${idx}`}>
          {typeof node === "function" ? node(disabled) : node}
          <GaugeArc
            key={`gauge-arcsegment-${idx}`}
            inset={12}
            min={min}
            max={max}
            stroke={
              disabled && !node
                ? `rgba(${idx * 15},${idx * 15},${idx * 15}, ${idx * 0.1 +
                0.1})`
                : color
            }
            strokeWidth={20}
            center={gaugeOrigin}
            maxAngle={maxAngle}
            minAngle={minAngle}
          />
        </g>
      ))}
      {/* <InvertedTriangle center={gaugeOrigin} disabled={disabled} /> */}
      <Pointer
        value={disabled ? -0.025 : valueRef}
        center={gaugeOrigin}
        disabled={disabled}
        maxAngle={maxAngle}
        minAngle={minAngle}
        tooltip={pointerLabel || value}
      />
      <UnitOfMeasurement
        value={uom}
        disabled={disabled}
        center={gaugeOrigin}
        {...uomProps}
      />
      <text
        x={60}
        y={180}
        fontSize={64}
        fontFamily="Roboto, sans-serif"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{
          fontWeight: 'bolder',
          transition: "all 0.25s 0.25s"
        }}
      >
        E
      </text>
      <text
        x={230}
        y={180}
        fontSize={64}
        fontFamily="Roboto, sans-serif"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{
          fontWeight: 'bolder',
          transition: "all 0.25s 0.25s"
        }}
      >
        F
      </text>
    </BaseSVG>
  );
};

export default FuelGauge;
