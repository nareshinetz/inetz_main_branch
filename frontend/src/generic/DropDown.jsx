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
      <Button variant="contained" color="success" onClick={handleClick}>
        Download
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
    sx: {
      width: anchorEl ? anchorEl.clientWidth : undefined
    }
  }}>
        <MenuItem onClick={() => handleDownload("excel")}>Excel</MenuItem>
        <MenuItem onClick={() => handleDownload("csv")}>CSV</MenuItem>
        <MenuItem onClick={() => handleDownload("pdf")}>PDF</MenuItem>
        {/* <MenuItem onClick={() => handleDownload("word")}>Download Word</MenuItem> */}
        <MenuItem onClick={() => handleDownload("print")}>Print</MenuItem>
      </Menu>
    </>
  );
};

export default DownloadDropdown;