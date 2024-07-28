const Circle = ({
  cx = 50,
  cy = 50,
  r = 40,
  stroke = "black",
  strokeWidth = 2,
  fill = "none",
}) => {
  return (
    <circle cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fill} />
  );
};

export default Circle;
