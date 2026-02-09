import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";          // Vite-friendly import
import autoTable from "jspdf-autotable"; // IMPORTANT: use as function
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";

/* ========== HELPER ========== */
const buildTableRows = (data, columns) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [["No records available"]];
  }

  return data.map(row =>
    columns.map(col => row[col.key] ?? "")
  );
};

/* =================== EXCEL =================== */
export const downloadExcel = async (
  data = [],
  fileName,
  sheetName,
  title,
  columns
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.mergeCells(`A1:${String.fromCharCode(64 + columns.length)}1`);
  const titleCell = worksheet.getCell("A1");
  titleCell.value = title;
  titleCell.font = { size: 16, bold: true };
  titleCell.alignment = { horizontal: "center", vertical: "middle" };

  worksheet.addRow([]);

  const headerRow = worksheet.addRow(columns.map(col => col.header));
  headerRow.font = { bold: true };

  worksheet.columns = columns.map(col => ({
    key: col.key,
    width: col.width || 20,
  }));

  (data || []).forEach(row => worksheet.addRow(row));

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};

/* =================== CSV =================== */
export const downloadCSV = (data = [], fileName, columns) => {
  const headers = columns.map(c => c.header).join(",");

  const rows = (data || []).map(row =>
    columns
      .map(col => `"${row[col.key] ?? ""}"`)
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, `${fileName}.csv`);
};

/* =================== PDF — 🔥 VITE FIXED 🔥 =================== */
export const downloadPDF = async (data = [], fileName, title, columns) => {
  try {
    const doc = new jsPDF("landscape");

    doc.setFontSize(16);
    doc.text(title, 14, 15);

    const headers = [columns.map(c => c.header)];
    const body = buildTableRows(data, columns);

    // 🔥 KEY CHANGE: call autoTable as a FUNCTION (works in Vite)
    autoTable(doc, {
      head: headers,
      body: body,
      startY: 25,
      theme: "grid",
      styles: { fontSize: 9 },
    });

    // 🔥 Safe manual download (works everywhere)
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (err) {
    console.error("PDF Download Failed:", err);
    alert("PDF failed — check console.");
  }
};

/* =================== WORD =================== */
export const downloadWord = async (
  data = [],
  fileName,
  title,
  columns
) => {
  const headerRow = new TableRow({
    children: columns.map(col =>
      new TableCell({
        width: {
          size: 100 / columns.length,
          type: WidthType.PERCENTAGE,
        },
        children: [new Paragraph({ text: col.header, bold: true })],
      })
    ),
  });

  const dataRows = (data || []).map(row =>
    new TableRow({
      children: columns.map(col =>
        new TableCell({
          width: {
            size: 100 / columns.length,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph(String(row[col.key] ?? "")),
          ],
        })
      ),
    })
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: title, heading: "Heading1" }),
          new Table({
            rows: [headerRow, ...dataRows],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
};

/* =================== PRINT =================== */
export const printTable = (data = [], title, columns) => {
  const printWindow = window.open("", "_blank");

  const rowsHTML = (data || [])
    .map(
      row => `
      <tr>
        ${columns
          .map(col => `<td>${row[col.key] ?? ""}</td>`)
          .join("")}
      </tr>
    `
    )
    .join("");

  const tableHTML = `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial; padding: 20px; }
         h2 { text-align: center;}
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid black; padding: 8px; }
        th { background-color: #f2f2f2; }
      </style>

    </head>
    <body>
      <h2>${title}</h2>
      <table>
        <thead>
          <tr>
            ${columns.map(c => `<th>${c.header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rowsHTML || "<tr><td colspan='100%'>No data available</td></tr>"}
        </tbody>
      </table>
      <script>window.print();</script>
    </body>
    </html>
  `;

  printWindow.document.write(tableHTML);
  printWindow.document.close();
};