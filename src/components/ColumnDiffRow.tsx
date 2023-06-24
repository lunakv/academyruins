import { transformRuleText } from "../utils/ruleChangeTransform";
import { CrDiffItem } from "../types";

interface ColumnDiffProps {
  row: CrDiffItem;
  setIds?: boolean;
}

const rowId = (row: CrDiffItem) => (row.new ? row.new.ruleNumber : "d" + row.old?.ruleNumber);

const ColumnDiffRow = ({ row, setIds = true }: ColumnDiffProps) => {
  const [oldText, newText] = transformRuleText(row.old?.ruleText, row.new?.ruleText);
  return (
    <tr id={setIds ? rowId(row) : undefined}>
      <td id={setIds ? row.old && "o" + row.old.ruleNumber : undefined}>
        <b>{row.old?.ruleNumber}</b>
        <br />
        {oldText}
      </td>
      <td id={setIds ? row.new && "n" + row.new.ruleNumber : undefined}>
        <b>{row.new?.ruleNumber}</b>
        <br />
        {newText}
      </td>
    </tr>
  );
};

export default ColumnDiffRow;
