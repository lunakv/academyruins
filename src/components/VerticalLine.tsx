interface Props {
  height: string | number;
}

const VerticalLine = ({ height }: Props) => {
  const gradient = "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5), rgba(0,0,0,0))";
  return (
    <div
      style={{
        borderWidth: "0",
        height: height,
        margin: "0",
        padding: "0",
        width: "2px",
        backgroundImage: gradient,
      }}
    />
  );
};

export default VerticalLine;
