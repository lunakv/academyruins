import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import InlineDiff from "../components/InlineDiff";
import { MtrDiffItem } from "../types";
import { formatDate } from "../utils/dateFormatter";

interface MtrDiff {
  changes: MtrDiffItem[];
  effective_date: string;
}
async function fetchDiff() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/diff/mtr`);
  return await res.json();
}

const diffDefault = {
  changes: [],
  effective_date: "",
};

const MtrDiffPage = () => {
  const [loading, setLoading] = useState(true);
  const [diff, setDiff] = useState<MtrDiff>(diffDefault);

  useEffect(() => {
    fetchDiff()
      .then(setDiff)
      .then(() => setLoading(false));
  }, []);

  return (
    <Loading isLoading={loading} className="mt-5">
      <InlineDiff title={"Effective " + formatDate(diff.effective_date)} changes={diff.changes} />
    </Loading>
  );
};

export default MtrDiffPage;
