const BaseSVG = ({ children, ...props }) => {
    return <svg {...props}>{children}</svg>;
};

export default BaseSVG;