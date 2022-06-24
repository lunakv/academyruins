import "../Rules.css";
// TODO rules.js
// TODO findRules()

import { Container } from "react-bootstrap";
import ColumnDiffRow from "./ColumnDiffRow";
import { Diff } from "../types";
import React, { TouchEventHandler } from "react";

interface Props {
  oldName?: string;
  newName?: string;
  changes?: Diff[];
  onTouchStart?: TouchEventHandler;
  onTouchMove?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  onTouchCancel?: TouchEventHandler;
}

const ColumnDiff = ({ oldName, newName, changes = [], ...props }: Props) => (
  <Container fluid="lg" {...props}>
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
