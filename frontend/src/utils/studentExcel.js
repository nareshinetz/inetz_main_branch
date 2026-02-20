import { exportToExcelWithPrintSetup } from "../utils/excelService";

export const downloadStudentsExcel = (students) => {
  const studentColumns = [
    { header: "Name", key: "studentName", width: 25 },
    { header: "Email", key: "emailId", width: 30 },
    { header: "Phone", key: "phoneNumber", width: 15 },
    { header: "Program", key: "programType", width: 20 },
    { header: "Status", key: "status", width: 15 },
  ];
                        
  exportToExcelWithPrintSetup(
    students,
    "students_list",
    "Students",
    "STUDENTS LIST REPORT",
    studentColumns
  );
};