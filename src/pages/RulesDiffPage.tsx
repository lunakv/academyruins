import { useCallback, useEffect, useRef, useState } from "react";
import ColumnDiff from "../components/ColumnDiff";
import { CrDiffItem } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavigationPanel from "../components/NavigationPanel";

async function fetchDiff(sets: string) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/diff/cr/${encodeURIComponent(sets)}`);
  const json = await res.json();
  return json;
}

interface ApiDiff {
  changes: CrDiffItem[];
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
  const diffString = params.codes ?? "";
  const navigate = useRef(useNavigate());

  const [error, setError] = useState(undefined);
  if (error) throw error;

  // load diff when diffString changes
  useEffect(() => {
    setLoading(true);
    fetchDiff(diffString)
      .then(setDiff)
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e);
      });
  }, [diffString]);

  // scroll to hash after diff loads
  useEffect(() => {
    if (isLoading || !window.location.hash) return;
    const id = window.location.hash.substring(1);
    document.getElementById(id)?.scrollIntoView();
  }, [isLoading]);

  const handleMove = useCallback(
    (prop: "prev" | "next") => {
      if (!diff) return;
      const sets = diff.nav[prop];
      if (!sets) return;
      navigate.current(`/diff/cr/${sets.old}-${sets.new}`);
      setDiff(undefined);
    },
    [diff]
  );

  return (
    <Loading isLoading={isLoading} className="mt-5">
      <ColumnDiff changes={diff?.changes} oldName={diff?.source_set} newName={diff?.dest_set} />
      <NavigationPanel onClick={handleMove} leftDisabled={!diff?.nav.prev} rightDisabled={!diff?.nav.next} />
    </Loading>
  );
};

export default RulesDiffPage;
