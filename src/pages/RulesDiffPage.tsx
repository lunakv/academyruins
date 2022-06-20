import { useEffect, useState } from "react";
import ColumnDiffPage from "../components/ColumnDiff";
import { Diff } from "../types";

async function fetch_diff() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/diff/cr/latest`);
  const json = await res.json();
  return json;
}

interface ApiDiff {
  changes: Diff[];
  source_set: string;
  dest_set: string;
}

const RulesDiffPage = () => {
  const [diff, setDiff] = useState<ApiDiff | undefined>(undefined);

  useEffect(() => {
    fetch_diff().then(setDiff);
  }, []);

  if (!diff) return <p>Loading...</p>;

  return (
    <ColumnDiffPage
      changes={diff.changes}
      oldName={diff.source_set}
      newName={diff.dest_set}
    />
  );
};

export default RulesDiffPage;
