import "../pages/RulesDiffPage.css";
// TODO rules.js
// TODO findRules()

import { Container } from "react-bootstrap";
import ColumnDiffRow from "./ColumnDiffRow";
import { CrDiffItem } from "../types";

interface Props {
  oldName?: string;
  newName?: string;
  changes?: CrDiffItem[];
}

const ColumnDiff = ({ oldName, newName, changes = [] }: Props) => (
  <Container fluid="lg">
    <table className="diff-table">
      <thead>
        <tr>
          <th id="oldHeader" className="w-50">
            {oldName}
          </th>
          <th id="newHeader" className="w-50">
            {newName}
          </th>
        </tr>
      </thead>
      <tbody>
        {changes.map((change) => (
          <ColumnDiffRow row={change} />
        ))}
      </tbody>
    </table>
  </Container>
);

export default ColumnDiff;
