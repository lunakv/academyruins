import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function fetchMetadata() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/cr-diffs`);
  const json = await res.json();
  return json.data;
}

interface DiffMetadata {
  source_code: string;
  dest_code: string;
  dest_name: string;
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
          <Link to={diffToUrl(diff)}>{diff.dest_name}</Link>
        </p>
      ))}
    </>
  );
};

export default CrDiffArchive;
