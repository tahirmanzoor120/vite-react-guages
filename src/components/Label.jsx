import { useMemo } from "react";
import { scaleLinear, line } from "d3";

const getTickRef = (tickCount, minVal, maxVal, minAngle, maxAngle) => {
    if (tickCount % 2 === 0) {
        console.warn(
            "Ticks should be odd numbered to ensure a tick in the middle of the gauge."
        );
    }

    const idxToRef = scaleLinear()
        .domain([0, tickCount - 1])
        .range([0, 1]);

    const idxToVal = scaleLinear()
        .domain([0, tickCount - 1])
        .range([minVal, maxVal]);

    const refToDeg = scaleLinear()
        .domain([0, 1])
        .range([minAngle, maxAngle]);

    return [...Array(tickCount)].map((v, i) => ({
        index: i,
        val: idxToVal(i),
        deg: refToDeg(idxToRef(i))
    }));
};

const tickLineLong = line()
    .x(0)
    .y((d, i) => i)({ length: 35 });

const tickLineShort = line()
    .x(0)
    .y((d, i) => i)({ length: 12 });

const Label = ({
    disabled,
    center,
    tickCount,
    min,
    max,
    maxAngle,
    minAngle,
    offsetText,
    length = 300 / 2 - 36
}) => {

    const ticks = useMemo(() => getTickRef(tickCount, min, max, minAngle, maxAngle), [tickCount, min, max, minAngle, maxAngle]);

    return (
        <>
            {ticks.map(({ val, deg, index }) => (
                <g
                    className="gauge-label"
                    style={{ userSelect: "none", textAlign: "center" }}
                    key={val}
                    transform={`translate(${center.x},${center.y}) rotate(${deg})`}
                >
                    <path
                        d={index === 0 || index === ticks.length - 1 ? tickLineLong : tickLineShort}
                        stroke="#344c69"
                        strokeWidth="2"
                        transform={`translate(0,${5 - length})`}
                        style={{ transition: "all .25s .25s" }}
                        opacity={disabled ? 0.4 : undefined}
                    />
                    <text
                        transform={`translate(${offsetText},${-length})`}
                        style={{ transition: "all .25s .25s", fontWeight: 'bold' }}
                        opacity={disabled ? 0.4 : undefined}
                        fontSize={16}
                        fontFamily="Roboto, sans-serif"
                    >
                        {Number(val)}
                    </text>
                </g>
            ))}
        </>
    );
};

export default Label;
