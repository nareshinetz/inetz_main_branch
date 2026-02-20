// import React from "react";
// import { AgGridReact } from "ag-grid-react";
// import { myTheme } from "./AgGridTheme";

// const AgGridTable = ({
//   rowData = [],
//   columnDefs = [],
//   loadingMessage = "Loading data...",
//   height = 620,
// }) => {
//   return (
//     <div style={{ height: height, width: "100%" }}>
//       <AgGridReact
//         theme={myTheme}
//          suppressRowHoverHighlight={true}
//         rowData={Array.isArray(rowData) ? rowData : []}
//         columnDefs={columnDefs}
//         pagination={true}
//         paginationPageSize={10}
//         paginationPageSizeSelector={[10, 20, 50, 100]}
//         animateRows={true}
//         domLayout="normal"
//         alwaysShowVerticalScroll={true}
//         suppressHorizontalScroll={false}
//         loadingOverlayComponentParams={{
//           loadingMessage,
//         }}
//       />
//     </div>
//   );
// };

// export default AgGridTable;

import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { myTheme } from "./AgGridTheme";

const AgGridTable = ({
  rowData = [],
  columnDefs = [],
  loadingMessage = "Loading data...",
}) => {

  const rows = Array.isArray(rowData) ? rowData : [];

  const calculatedHeight = useMemo(() => {
    const headerHeight = 56;   // AG Grid default
    const rowHeight = 42;      // AG Grid default
    const paginationHeight = 60; // bottom pagination area
    const maxRows = 10;

    if (rows.length === 0) {
      return 180;
    }

    const visibleRows = Math.min(rows.length, maxRows);

    return headerHeight + (visibleRows * rowHeight) + paginationHeight;
  }, [rows.length]);

  return (
    <div style={{ height: calculatedHeight, width: "100%" }}>
      <AgGridReact
        theme={myTheme}
        rowData={rows}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        rowHeight={42}
        headerHeight={56}
        animateRows={true}
        domLayout="normal"
      />
    </div>
  );
};

export default AgGridTable;