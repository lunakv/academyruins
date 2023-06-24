import Trace from "../components/Trace";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TraceItem } from "../components/TraceSegment";
import Loading from "../components/Loading";

async function fetchTrace(ruleNumber: string): Promise<TraceItem[] | null> {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/cr/trace/${encodeURIComponent(ruleNumber)}`);
  if (res.status === 404) return null;
  if (res.status === 429) throw new Error("Rate limit exceeded.");
  return res.json();
}

const TracePage = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [trace, setTrace] = useState<TraceItem[] | null>(null);
  const ruleNumber = params.rule!;

  const [error, setError] = useState(undefined);
  if (error) throw error;

  useEffect(() => {
    setLoading(true);
    fetchTrace(ruleNumber)
      .then((trace) => {
        setLoading(false);
        setTrace(trace);
      })
      .catch((e) => {
        setError(e);
      });
  }, [ruleNumber]);

  return (
    <Loading isLoading={isLoading} className="mt-5">
      <Trace trace={trace} ruleNumber={ruleNumber ?? ""} />
    </Loading>
  );
};

export default TracePage;
