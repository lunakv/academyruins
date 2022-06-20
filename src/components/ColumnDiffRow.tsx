import { transformRuleText } from "../utils/ruleChangeTransform";
import { Diff } from "../types";

interface ColumnDiffProps {
  row: Diff;
}

const ColumnDiffRow = ({ row }: ColumnDiffProps) => {
  const oldText = transformRuleText(row.old?.ruleText, true);
  const newText = transformRuleText(row.new?.ruleText, false);
  return (
    <tr>
      <td>
        <b>{row.old?.ruleNum}</b>
        <br />
        {oldText}
      </td>
      <td>
        <b>{row.new?.ruleNum}</b>
        <br />
        {newText}
      </td>
    </tr>
  );
};

export default ColumnDiffRow;
