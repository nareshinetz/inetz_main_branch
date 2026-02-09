import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  downloadExcel,
  downloadCSV,
  downloadPDF,
  downloadWord,
  printTable
} from "../utils/excelService";

const DownloadDropdown = ({ data, columns, fileName, sheetName, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDownload = (type) => {
    handleClose();

    if (type === "excel") {
      downloadExcel(data, fileName, sheetName, title, columns);
    } else if (type === "csv") {
      downloadCSV(data, fileName, columns);
    } else if (type === "pdf") {
      downloadPDF(data, fileName, title, columns);
    } else if (type === "word") {
      downloadWord(data, fileName, title, columns);
    } else if (type === "print") {
      printTable(data, title, columns);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Download ▼
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleDownload("excel")}>Download Excel</MenuItem>
        <MenuItem onClick={() => handleDownload("csv")}>Download CSV</MenuItem>
        <MenuItem onClick={() => handleDownload("pdf")}>Download PDF</MenuItem>
        <MenuItem onClick={() => handleDownload("word")}>Download Word</MenuItem>
        <MenuItem onClick={() => handleDownload("print")}>Print</MenuItem>
      </Menu>
    </>
  );
};

export default DownloadDropdown;