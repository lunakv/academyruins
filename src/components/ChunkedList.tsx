import { Col, Row } from "react-bootstrap";

type ColCount = 1 | 2 | 3 | 4 | 6 | 12;

interface Props {
  children: JSX.Element[];
  cols: ColCount;
}

const ChunkedList = ({ children, cols = 3 }: Props) => {
  const chunks = children.reduce((all: any[][], item: any, i: number) => {
    const chunkIndex = Math.floor((i / children.length) * cols);
    if (!all[chunkIndex]) {
      all[chunkIndex] = [];
    }

    all[chunkIndex].push(item);
    return all;
  }, []);

  return (
    <Row>
      {chunks.map((chunk) => (
        <Col md={12 / cols}>{chunk.map((item) => item)}</Col>
      ))}
    </Row>
  );
};

export default ChunkedList;
