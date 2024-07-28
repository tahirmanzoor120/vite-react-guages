import { useCallback, useMemo } from "react";
import { scaleLinear } from "d3";

import BaseSVG from './components/BaseSVG';
import UnitOfMeasurement from "./components/UnitOfMeasurement";
import Circle from "./components/Circle";
import Rectangle from "./components/Rectangle";

const defaultSize = 250;

const VoltMeter = ({
  removeDial = false,
  dialProps = {
    dialColor: 'black',
    dialColorInner: 'red',
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
      <path
        d="M10 1 L14 11 H9 L12 17 L6 9 H12 L10 1 Z"
        transform={`translate(180, 110) scale(4) rotate(180)`}
        fill={'yellow'}
        stroke={'red'}
        strokeWidth={1}
        style={{
          transition: "all 0.25s 0.25s"
        }}
      />
      <Rectangle
        x={66}
        y={120}
        width={150}
        height={48}
        fill="yellow"
        stroke="green"
        strokeWidth={3}
        number={12.5}
        numberColor="black"
        numberSize={36}
      />
      <Circle cx={140} cy={140} r={dialProps.dialRadius ?? 135} stroke={dialProps.dialColor ?? 'black'} strokeWidth={5} fill="transparent" />)
      <Circle cx={140} cy={140} r={dialProps.dialRadius ?? 120} stroke={dialProps.dialColorInner ?? 'red'} strokeWidth={5} fill="transparent" />)
      <UnitOfMeasurement
        value={uom}
        disabled={disabled}
        center={gaugeOrigin}
        {...uomProps}
      />
  
    </BaseSVG>
  );
};

export default VoltMeter;
