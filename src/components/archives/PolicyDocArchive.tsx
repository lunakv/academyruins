import { useEffect, useState } from "react";
import ChunkedList from "../ChunkedList";

interface Metadata {
  creation_day: string;
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
    <ChunkedList cols={3}>
      {metadata.map((item) => (
        <div>
          <a href={fileToUrl(item.creation_day, kind)}>
            {new Date(item.creation_day).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </a>
        </div>
      ))}
    </ChunkedList>
  );
};

export default PolicyDocArchive;
