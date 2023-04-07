import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChunkedList from "../ChunkedList";
import Loading from "../Loading";
import { Col, Row } from "react-bootstrap";
import SetIcon from "../SetIcon";
import classes from "./CrDiffArchive.module.css";
import { ReactComponent as UpdateBulletinIcon } from "bootstrap-icons/icons/megaphone.svg";

async function fetchMetadata() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/cr-diffs`);
  const json = await res.json();
  return json.data;
}

interface DiffMetadata {
  sourceCode: string;
  destCode: string;
  destName: string;
  bulletinUrl?: string;
}

function diffToUrl(item: DiffMetadata) {
  return `/diff/cr/${item.sourceCode}-${item.destCode}`;
}

const CrDiffArchive = () => {
  const [metadata, setMetadata] = useState<DiffMetadata[]>([]);

  useEffect(() => {
    fetchMetadata().then(setMetadata);
  }, []);

  return (
    <Loading isLoading={metadata.length === 0} className="mt-3">
      <ChunkedList cols={2}>
        {metadata.map((diff) => (
          <Row>
            <Col xs={1} className="pe-0">
              <SetIcon setCode={diff.destCode} />
            </Col>
            <Col xs={11} className={`ps-0 ${classes.archiveLink}`}>
              <Link to={diffToUrl(diff)}>{diff.destName}</Link>{" "}
              {diff.bulletinUrl && (
                <span className="text-nowrap">
                  [
                  <a
                    style={{ marginLeft: "1px", marginRight: "1px" }}
                    href={diff.bulletinUrl}
                    aria-label={`Update Bulletin Link for ${diff.destCode}`}
                  >
                    <UpdateBulletinIcon />
                  </a>
                  ]
                </span>
              )}
            </Col>
          </Row>
        ))}
      </ChunkedList>
    </Loading>
  );
};

export default CrDiffArchive;
