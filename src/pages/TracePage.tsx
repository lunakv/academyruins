import Trace, { TraceModel } from "../components/Trace";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";

async function fetchTrace(ruleNumber: string, exact: boolean): Promise<TraceModel | null> {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/cr/trace/${encodeURIComponent(ruleNumber)}?find_definition=${!exact}`
  );
  if (res.status === 404) return null;
  if (res.status === 429) throw new Error("Rate limit exceeded.");
  return res.json();
}

const TracePage = () => {
  const params = useParams();
  const [queryParams] = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [trace, setTrace] = useState<TraceModel | null>(null);
  const ruleNumber = params.rule!;
  const exactSearch = queryParams.get("exact");

  const [error, setError] = useState(undefined);
  if (error) throw error;

  useEffect(() => {
    setLoading(true);
    fetchTrace(ruleNumber, exactSearch === "true")
      .then((trace) => {
        setLoading(false);
        setTrace(trace);
      })
      .catch((e) => {
        setError(e);
      });
  }, [ruleNumber, exactSearch]);

  return (
    <Loading isLoading={isLoading} className="mt-5">
      <Trace trace={trace} ruleNumber={ruleNumber ?? ""} />
    </Loading>
  );
};

export default TracePage;
