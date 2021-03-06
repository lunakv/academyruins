import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

async function fetchMetadata() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/cr`);
  const json = await res.json();
  return json.data;
}

const itemToUrl = (item: Metadata) => `${process.env.REACT_APP_API_URL}/file/cr/${encodeURIComponent(item.set_code)}`;

interface Metadata {
  creation_day: string;
  set_code: string;
  set_name: string;
}

const CrArchive = () => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  useEffect(() => {
    fetchMetadata().then(setMetadata);
  }, []);

  const chunks = metadata.reduce((all: Metadata[][], item, i) => {
    const chunkIndex = Math.floor(i / (metadata.length / 3)); // 3 columns total
    if (!all[chunkIndex]) {
      all[chunkIndex] = [];
    }
    all[chunkIndex].push(item);
    return all;
  }, []);

  return (
    <Row>
      {chunks.map((chunk) => (
        <Col md={4}>
          {chunk.map((item) => (
            <Row>
              <Col xs={1} className="pe-0">
                <i className={`ss ss-${item.set_code.toLowerCase()}`} />{" "}
              </Col>
              <Col xs={11} className="ps-0">
                <a href={itemToUrl(item)}>{item.set_name}</a>
              </Col>
            </Row>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default CrArchive;
