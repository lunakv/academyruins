import { useEffect, useState } from "react";
import ChunkedList from "../ChunkedList";
import Loading from "../Loading";
import { formatDate } from "../../utils/dateFormatter";

interface Metadata {
  creationDay: string;
}

type DocKind = "mtr" | "ipg";

async function fetchMetadata(kind: DocKind) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/metadata/${kind}`);
  const json = await res.json();
  return json.data;
}

function fileToUrl(date: string, kind: DocKind) {
  return `${process.env.REACT_APP_API_URL}/file/${kind}/${date}`;
}

const PolicyDocArchive = ({ kind }: { kind: DocKind }) => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  useEffect(() => {
    fetchMetadata(kind).then(setMetadata);
  }, [kind]);

  return (
    <Loading isLoading={metadata.length === 0} className="mt-3">
      <ChunkedList cols={3}>
        {metadata.map((item) => (
          <div>
            <a href={fileToUrl(item.creationDay, kind)}>{formatDate(item.creationDay)}</a>
          </div>
        ))}
      </ChunkedList>
    </Loading>
  );
};

export default PolicyDocArchive;
