import { useEffect, useState } from "react";
import ColumnDiffPage from "../components/ColumnDiff";
import { Diff } from "../types";
import { useNavigate } from "react-router-dom";
import NavigationSidePanel from "../components/NavigationSidePanel";

async function fetch_latest_diff(sets?: string) {
  if (!sets) sets = "latest";
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/diff/cr/${encodeURIComponent(sets)}`
  );
  const json = await res.json();
  return json;
}

interface ApiDiff {
  changes: Diff[];
  source_set: string;
  dest_set: string;
  nav: {
    prev?: { old: string; new: string };
    next?: { old: string; new: string };
  };
}

const RulesDiffPage = () => {
  const [diff, setDiff] = useState<ApiDiff | undefined>(undefined);
  const [diffString, setDiffString] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (diffString) navigate(`./${diffString}`);
    fetch_latest_diff(diffString)
      .then(setDiff)
      .catch((e) => {
        navigate(`/error?message=${encodeURIComponent(e.message)}`);
      });
  }, [diffString]);

  const handleNext = () => {
    if (!diff || !diff.nav.next) return;
    const sets = diff.nav.next;
    setDiffString(sets.old + "-" + sets.new);
    setDiff(undefined);
  };

  const handlePrev = () => {
    if (!diff || !diff.nav.prev) return;
    const sets = diff.nav.prev;
    setDiffString(sets.old + "-" + sets.new);
    setDiff(undefined);
  };

  if (!diff) return <p>Loading...</p>;

  return (
    <>
      <NavigationSidePanel
        position="left"
        disabled={!diff.nav.prev}
        onClick={handlePrev}
      />
      <ColumnDiffPage
        changes={diff.changes}
        oldName={diff.source_set}
        newName={diff.dest_set}
      />
      <NavigationSidePanel
        position="right"
        disabled={!diff.nav.next}
        onClick={handleNext}
      />
    </>
  );
};

export default RulesDiffPage;
