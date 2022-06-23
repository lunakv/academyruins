import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

async function fetchMetadata() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/cr`);
  const json = await res.json();
  return json.data;
}

const fileToUrl = (name: string) =>
  `${process.env.REACT_APP_API_URL}/files/cr/${encodeURIComponent(name)}`;

interface Metadata {
  creation_day: string;
  set_code: string;
  set_name: string;
  file_name: string;
}

const CrArchive = () => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  useEffect(() => {
    fetchMetadata().then(setMetadata);
  }, []);

  const chunks = metadata.reduce((all: Metadata[][], item, i) => {
    const chunkIndex = Math.floor(i / 3); // 3 columns total
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
            <div>
              <i className={`ss ss-${item.set_code.toLowerCase()}`} />{" "}
              <a href={fileToUrl(item.file_name)}>{item.set_name}</a>
            </div>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default CrArchive;
