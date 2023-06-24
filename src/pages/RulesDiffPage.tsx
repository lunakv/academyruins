import { useCallback, useEffect, useRef, useState } from "react";
import ColumnDiff from "../components/ColumnDiff";
import { CrDiffItem } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavigationPanel from "../components/NavigationPanel";

async function fetchDiff(diffString: string) {
  const sets = diffString.split("-");
  let oldSet, newSet;
  if (sets.length === 1) newSet = sets[0];
  else {
    oldSet = sets[0];
    newSet = sets[1];
  }

  let query = "?nav=true";
  if (oldSet) query += `&old=${encodeURIComponent(oldSet)}`;
  if (newSet) query += `&new=${encodeURIComponent(newSet)}`;

  const res = await fetch(`${process.env.REACT_APP_API_URL}/diff/cr/${query}`);
  const json = await res.json();
  return json;
}

interface ApiDiff {
  changes: CrDiffItem[];
  sourceSet: string;
  destSet: string;
  sourceCode: string;
  destCode: string;
  nav: {
    prevSourceCode?: string;
    nextDestCode?: string;
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
      const newDiff =
        prop === "prev" ? `${diff.nav.prevSourceCode}-${diff.sourceCode}` : `${diff.destCode}-${diff.nav.nextDestCode}`;
      navigate.current(`/diff/cr/${newDiff}`);
      setDiff(undefined);
    },
    [diff]
  );

  return (
    <Loading isLoading={isLoading} className="mt-5">
      <ColumnDiff changes={diff?.changes} oldName={diff?.sourceSet} newName={diff?.destSet} />
      <NavigationPanel
        onClick={handleMove}
        leftDisabled={!diff?.nav.prevSourceCode}
        rightDisabled={!diff?.nav.nextDestCode}
      />
    </Loading>
  );
};

export default RulesDiffPage;
