import { Col } from "react-bootstrap";
import ColumnDiffRow from "./ColumnDiffRow";
import { ReactComponent as ArrowIcon } from "bootstrap-icons/icons/arrow-right.svg";

enum TraceItemAction {
  Created = "created",
  Edited = "edited",
  Replaced = "replaced",
  Moved = "moved",
}

interface TraceDiffRule {
  ruleNumber: string;
  ruleText?: string;
}

interface Metadata {
  sourceSet: string;
  sourceCode: string;
  destSet: string;
  destCode: string;
}

export interface TraceItem {
  action: TraceItemAction;
  old?: TraceDiffRule;
  new: TraceDiffRule;
  diff: Metadata;
}

interface Props {
  item: TraceItem;
}

const TraceSegment = ({ item }: Props) => {
  let content;
  switch (item.action) {
    case TraceItemAction.Created:
    case TraceItemAction.Edited:
    case TraceItemAction.Replaced:
      const row = {
        old: item.old && { ruleNumber: item.old.ruleNumber, ruleText: item.old.ruleText! },
        new: { ruleNumber: item.new.ruleNumber, ruleText: item.new.ruleText! },
      };
      content = <ColumnDiffRow row={row} setIds={false} />;
      break;
    case TraceItemAction.Moved:
      content = (
        <div className="text-center">
          {item.old!.ruleNumber} <ArrowIcon /> {item.new.ruleNumber}
        </div>
      );
      break;
    default:
      throw new Error(`Unknown action type: ${item.action}`);
  }

  return (
    <Col md={8}>
      <div className="text-center mt-3" id={item.diff.destSet}>
        <h5>
          <a href={itemDiffLink(item)}>
            {item.diff.sourceSet} <ArrowIcon width={20} height={20} /> {item.diff.destSet}
          </a>
        </h5>
      </div>
      {content}
    </Col>
  );
};

function itemDiffLink(item: TraceItem): string {
  let link = `/diff/cr/${item.diff.sourceCode}-${item.diff.destCode}`;
  if (item.action !== TraceItemAction.Moved) link += `#${item.new.ruleNumber}`;
  return link;
}
export default TraceSegment;
