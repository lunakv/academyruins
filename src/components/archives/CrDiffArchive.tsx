import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons/faBullhorn";

async function fetchMetadata() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/cr-diffs`);
  const json = await res.json();
  return json.data;
}

interface DiffMetadata {
  source_code: string;
  dest_code: string;
  dest_name: string;
  bulletin_url?: string;
}

function diffToUrl(item: DiffMetadata) {
  return `/diff/cr/${item.source_code}-${item.dest_code}`;
}

const CrDiffArchive = () => {
  const [metadata, setMetadata] = useState<DiffMetadata[]>([]);

  useEffect(() => {
    fetchMetadata().then(setMetadata);
  }, []);

  return (
    <>
      {metadata.map((diff) => (
        <p>
          <Link to={diffToUrl(diff)}>{diff.dest_name}</Link>{" "}
          {diff.bulletin_url && (
            <span>
              [
              <a
                style={{ marginLeft: "1px", marginRight: "1px" }}
                href={diff.bulletin_url}
                aria-label="Update Bulletin Link"
              >
                <FontAwesomeIcon icon={faBullhorn} />
              </a>
              ]
            </span>
          )}
        </p>
      ))}
    </>
  );
};

export default CrDiffArchive;
