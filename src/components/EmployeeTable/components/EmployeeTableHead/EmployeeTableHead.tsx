import React from "react";

type EmployeeTableHeadProps = {
  headers: string[];
};

const EmployeeTableHead: React.FC<EmployeeTableHeadProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((text) => (
          <th key={text}>{text}</th>
        ))}
      </tr>
    </thead>
  );
};

export default EmployeeTableHead;
