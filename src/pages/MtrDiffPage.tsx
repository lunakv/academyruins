import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import InlineDiff from "../components/InlineDiff";
import { MtrDiffItem } from "../types";
import { formatDate } from "../utils/dateFormatter";
import { useParams } from "react-router-dom";

interface MtrDiff {
  changes: MtrDiffItem[];
  effective_date: string;
}
async function fetchDiff(date: string) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/diff/mtr/${date}`);
  return await res.json();
}

const diffDefault = {
  changes: [],
  effective_date: "",
};

const MtrDiffPage = () => {
  const [loading, setLoading] = useState(true);
  const [diff, setDiff] = useState<MtrDiff>(diffDefault);
  const params = useParams();
  const date = params.date ?? "";

  const [error, setError] = useState(undefined);
  if (error) throw error;

  useEffect(() => {
    setLoading(true);
    fetchDiff(date)
      .then(setDiff)
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e);
      });
  }, [date]);

  return (
    <Loading isLoading={loading} className="mt-5">
      <InlineDiff title={"Effective " + formatDate(diff.effective_date)} changes={diff.changes} />
    </Loading>
  );
};

export default MtrDiffPage;
