const UnitOfMeasurement = ({ value, disabled, center, offsetText, ...rest }) => {
    return (
      <text
        transform={`translate(${center.x + offsetText},${center.y + 50})`}
        opacity={disabled ? 0.4 : undefined}
        {...rest}
      >
        {value}
      </text>
    );
  };
  
  export default UnitOfMeasurement;
  