import Gradient from "../components/Gradient";

const useGradient = (startColour, stopColour, id) => {
  return {
    color: `url(#${id})`,
    node: disabled => (
      <Gradient
        start={startColour}
        end={stopColour}
        id={id}
        disabled={disabled}
      />
    )
  };
};

export default useGradient;