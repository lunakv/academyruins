import { useEffect, useState } from "react";
import ColumnDiffPage from "../components/ColumnDiff";
import { Diff } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import NavigationSidePanel from "../components/NavigationSidePanel";
import Loading from "../components/Loading";

async function fetch_latest_diff(sets: string) {
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
  const params = useParams();
  const [diff, setDiff] = useState<ApiDiff | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const diffString = params.codes ?? "latest";
  const navigate = useNavigate();

  const [error, setError] = useState(undefined);
  if (error) throw error;

  useEffect(() => {
    setLoading(true);
    fetch_latest_diff(diffString)
      .then(setDiff)
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e);
      });
  }, [diffString]);

  const handleMove = (prop: "prev" | "next") => {
    if (!diff) return;
    const sets = diff.nav[prop];
    if (!sets) return;
    navigate(`./../${sets.old}-${sets.new}`);
    setDiff(undefined);
  };

  const handlePrev = () => handleMove("prev");
  const handleNext = () => handleMove("next");

  return (
    <Loading isLoading={isLoading} className="mt-5">
      <NavigationSidePanel
        position="left"
        disabled={!diff?.nav.prev}
        onClick={handlePrev}
      />
      <ColumnDiffPage
        changes={diff?.changes}
        oldName={diff?.source_set}
        newName={diff?.dest_set}
      />
      <NavigationSidePanel
        position="right"
        disabled={!diff?.nav.next}
        onClick={handleNext}
      />
    </Loading>
  );
};

export default RulesDiffPage;
