import React from "react";
import TableTitle from "./tableTitle";
import TableBody from "./tableBody";

const Table = ({ column, onSort, sortColumn, data }) => {
  return (
    <table className="table">
      <TableTitle column={column} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={column} />
    </table>
  );
};

export default Table;
