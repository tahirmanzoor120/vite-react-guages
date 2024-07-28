const UnitOfMeasurement = ({ value, disabled, center, fontSize, offsetX, offsetY, ...rest }) => {
    return (
      <text
        transform={`translate(${center.x + offsetX},${center.y + offsetY})`}
        fontFamily="Roboto, sans-serif"
        fontSize={fontSize}
        style={{fontWeight: 'bolder'}}
        opacity={disabled ? 0.4 : undefined}
        {...rest}
      >
        {value}
      </text>
    );
  };
  
  export default UnitOfMeasurement;
  