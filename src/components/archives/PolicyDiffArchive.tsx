import { useEffect, useState } from "react";
import Loading from "../Loading";
import ChunkedList from "../ChunkedList";
import { formatDate } from "../../utils/dateFormatter";

interface Metadata {
  effectiveDate: string;
}
async function fetchMetadata() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/mtr-diffs`);
  return await res.json();
}

function dateToUrl(date: string) {
  return `/diff/mtr/${date}`;
}

const PolicyDiffArchive = () => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  useEffect(() => {
    fetchMetadata().then(setMetadata);
  }, []);

  console.log(metadata);

  return (
    <Loading isLoading={metadata.length === 0} className="mt-3">
      <ChunkedList cols={2}>
        {metadata.map((item) => (
          <div>
            <a href={dateToUrl(item.effectiveDate)}>{formatDate(item.effectiveDate)}</a>
          </div>
        ))}
      </ChunkedList>
    </Loading>
  );
};

export default PolicyDiffArchive;
