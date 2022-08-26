import { useCallback, useEffect, useRef, useState } from "react";
import ColumnDiff from "../components/ColumnDiff";
import { Diff } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavigationPanel from "../components/NavigationPanel";

async function fetchDiff(sets: string) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/diff/cr/${encodeURIComponent(sets)}`);
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
  const navigate = useRef(useNavigate());

  const [error, setError] = useState(undefined);
  if (error) throw error;

  useEffect(() => {
    setLoading(true);
    fetchDiff(diffString)
      .then(setDiff)
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e);
      });
  }, [diffString]);

  const handleMove = useCallback(
    (prop: "prev" | "next") => {
      if (!diff) return;
      const sets = diff.nav[prop];
      if (!sets) return;
      navigate.current(`./../${sets.old}-${sets.new}`);
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
