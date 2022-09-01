import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ChunkedList from "../ChunkedList";
import Loading from "../Loading";
import SetIcon from "../SetIcon";

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

  return (
    <Loading isLoading={metadata.length === 0} className="mt-3">
      <ChunkedList cols={3}>
        {metadata.map((item) => (
          <Row>
            <Col xs={1} className="pe-0">
              <SetIcon setCode={item.set_code} />
            </Col>
            <Col xs={11} className="ps-0">
              <a href={itemToUrl(item)}>{item.set_name}</a>
            </Col>
          </Row>
        ))}
      </ChunkedList>
    </Loading>
  );
};

export default CrArchive;
