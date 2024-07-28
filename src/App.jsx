import React, { useState, useEffect } from "react";

import Gauge from "./Gauge";
import FuelGauge from "./FuelGauge";
import VoltMeter from "./VoltMeter";
import useGradient from "./hooks/useGradient";

import {
    Slider,
    TextField,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Card,
    CardContent,
    CardHeader
} from "@mui/material";

const App = () => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [value, setValue] = useState(35);
    const [minAngle, setMinAngle] = useState(-135);
    const [maxAngle, setMaxAngle] = useState(135);
    const [disabled, setDisabled] = useState(false);
    const [tickCount, setTickCount] = useState(11);
    const [uom, setUom] = useState("Km/h");
    const [uomOffset, setUomOffset] = useState(-15);
    const [labelOffset, setLabelOffset] = useState(-7);

    // For stress test.
    const [gauges, setGauges] = useState(15);

    // Just to ensure the values are within min max.
    useEffect(() => {
        if (value < min || value > max) {
            setValue(min);
        }
    }, [min, max, value]);

    /** Red gradient props for arcSegments */
    const redFade = useGradient(
        "rgba(255,0,0,0)",
        "rgba(255,0,0,1)",
        "redFade-randomkey"
    );

    /** Renders coloured arcs to demarcate target ranges. */
    const arcSegments = [
        { min: 0, max: 0.3, color: "green" },
        { min: 0.3, max: 0.5, color: "yellow" },
        { min: 0.5, max: 1, color: "orange" },
        {
            min: 0.75,
            max: 1,
            ...redFade
        }
    ];

    return (
        <>
            {/* Gauges */}
            <div style={{ display: "flex" }}>
                <Card
                    style={{
                        marginRight: "1em",
                        marginBottom: "1em",
                        width: 280,
                        height: 380
                    }}
                >
                    <CardHeader title="Speed Gauge" />
                    <CardContent>
                        <Gauge
                            dialProps={{
                                dialColor: 'gold',
                            }}
                            min={min}
                            max={max}
                            value={value}
                            maxAngle={maxAngle}
                            minAngle={minAngle}
                            disabled={disabled}
                            pointerLabel={disabled ? "Disabled" : value}
                            tickCount={Number(tickCount)}
                            uom={uom}
                            uomProps={{
                                offsetX: -28,
                                offsetY: 56,
                                fontSize: 24
                            }}
                            labelProps={{
                                offsetText: labelOffset,
                            }}
                            arcSegments={arcSegments}
                            
                        />
                    </CardContent>
                </Card>
                <Card
                    style={{
                        marginRight: "1em",
                        marginBottom: "1em",
                        width: 280,
                        height: 380
                    }}
                >
                    <CardHeader title="Fuel Gauge" />
                    <CardContent>
                        <FuelGauge
                            dialProps={{
                                dialColor: 'blue',
                            }}
                            min={0}
                            max={210}
                            value={value}
                            maxAngle={80}
                            minAngle={-80}
                            disabled={disabled}
                            pointerLabel={disabled ? "Disabled" : value}
                            tickCount={Number(7)}
                            uom={'L'}
                            uomProps={{
                                offsetX: -8,
                                offsetY: 52,
                                fontSize: 24
                            }}
                            labelProps={{
                                offsetText: labelOffset,
                            }}
                            arcSegments={arcSegments}
                        />
                    </CardContent>
                </Card>
                <Card
                    style={{
                        marginRight: "1em",
                        marginBottom: "1em",
                        width: 280,
                        height: 380
                    }}
                >
                    <CardHeader title="Volt Meter" />
                    <CardContent>
                        <VoltMeter
                            dialProps={{
                                dialColor: 'blue',
                                dialColorInner: 'red'
                            }}
                            value={value}
                            disabled={disabled}
                            pointerLabel={disabled ? "Disabled" : value}
                            uom={'V'}
                            uomProps={{
                                offsetX: -8,
                                offsetY: 75,
                                fontSize: 30
                            }}
                            labelProps={{
                                offsetText: labelOffset,
                            }}
                            arcSegments={arcSegments}
                        />
                    </CardContent>
                </Card>
            </div>
            {/* Controls */}
            <div style={{ display: "flex", userSelect: "none" }}>
                <Card style={{ marginRight: "1em", marginBottom: "1em" }}>
                    <CardHeader
                        title="Values and Range"
                        action={
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={disabled}
                                            onChange={() => setDisabled(!disabled)}
                                        />
                                    }
                                    label="Disable Gauge"
                                />
                            </FormGroup>
                        }
                    />
                    <CardContent>
                        <TextField
                            variant="outlined"
                            label="Min Angle"
                            type="number"
                            value={minAngle}
                            onChange={e => setMinAngle(e.target.value)}
                            error={Number.isNaN(Number(minAngle))}
                            margin="normal"
                        />
                        <TextField
                            variant="outlined"
                            label="Min Value"
                            type="number"
                            value={min}
                            onChange={e => setMin(e.target.value)}
                            error={Number.isNaN(Number(min))}
                            margin="normal"
                        />
                        <Slider
                            min={Number(min)}
                            max={Number(max)}
                            value={Number(value)}
                            onChange={(e, v) => setValue(v)}
                            valueLabelDisplay="auto"
                            disabled={disabled}
                        />
                        <TextField
                            variant="outlined"
                            label="Max Angle"
                            type="number"
                            value={maxAngle}
                            onChange={e => setMaxAngle(e.target.value)}
                            error={Number.isNaN(Number(maxAngle))}
                            margin="normal"
                        />
                        <TextField
                            variant="outlined"
                            label="Max Value"
                            type="number"
                            value={max}
                            onChange={e => setMax(e.target.value)}
                            error={Number.isNaN(Number(max))}
                            margin="normal"
                        />
                    </CardContent>
                </Card>
                <Card style={{ marginRight: "1em", marginBottom: "1em" }}>
                    <CardHeader title="Gauge Props" />
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Slider
                                        min={-35}
                                        max={0}
                                        step={0.5}
                                        value={uomOffset}
                                        onChange={(e, v) => setUomOffset(v)}
                                        valueLabelDisplay="auto"
                                    />
                                }
                                label="UOM Offset"
                            />
                            <FormControlLabel
                                control={
                                    <Slider
                                        min={-20}
                                        max={5}
                                        step={0.5}
                                        value={labelOffset}
                                        onChange={(e, v) => setLabelOffset(v)}
                                        valueLabelDisplay="auto"
                                    />
                                }
                                label="Label Offset"
                            />
                        </FormGroup>
                        <TextField
                            variant="outlined"
                            label="UOM"
                            value={uom}
                            onChange={e => setUom(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            variant="outlined"
                            type="number"
                            label="Ticks"
                            value={tickCount}
                            onChange={e => setTickCount(e.target.value)}
                            error={Number.isNaN(Number(tickCount))}
                            margin="normal"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Stress Test */}
            {/* <Card style={{ marginRight: "1em", marginBottom: "1em" }}>
        <CardHeader
          title="Performance Test"
          action={
            <TextField
              variant="outlined"
              type="number"
              label="Gauges to render"
              value={gauges}
              onChange={e => setGauges(Number(e.target.value))}
              error={Number.isNaN(Number(tickCount))}
              margin="normal"
            />
          }
        />
        <CardContent>
          {[...Array(gauges ? gauges : 0)].map((v, i) => (
            <Gauge
              width={50}
              min={0}
              max={1}
              key={`stress-gauge-${i}`}
              value={Math.random()}
              disabled={disabled}
              pointerLabel={disabled ? "Disabled" : value}
              tickCount={Number(tickCount)}
              arcSegments={arcSegments}
            />
          ))}
        </CardContent>
      </Card> */}
        </>
    );
};

export default App;