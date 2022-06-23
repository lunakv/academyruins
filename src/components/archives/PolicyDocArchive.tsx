import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

interface Metadata {
  creation_day: string;
  file_name: string;
}

type DocKind = "mtr" | "ipg";

async function fetchMetadata(kind: DocKind) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/${kind}`);
  const json = await res.json();
  return json.data;
}

function fileToUrl(fileName: string, kind: DocKind) {
  return `${process.env.REACT_APP_API_URL}/static/raw_docs/${kind}/${fileName}`;
}

const PolicyDocArchive = ({ kind }: { kind: DocKind }) => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  useEffect(() => {
    fetchMetadata(kind).then(setMetadata);
  }, [kind]);

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
            <div>
              <a href={fileToUrl(item.file_name, kind)}>
                {new Date(item.creation_day).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </a>
            </div>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default PolicyDocArchive;
