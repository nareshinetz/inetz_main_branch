import { exportToExcelWithPrintSetup } from "../utils/excelService";

export const downloadStaffExcel = (staff) => {
  const staffColumns = [
    { header: "Full Name", key: "fullName", width: 25 },
    { header: "Email", key: "emailId", width: 30 },
    { header: "Phone", key: "phoneNumber", width: 15 },
    { header: "City", key: "cityName", width: 20 },
    { header: "Experience (Years)", key: "yearsOfExperience", width: 18 },
    { header: "Skills", key: "skills", width: 30 },
    { header: "Date of Joining", key: "dateOfJoining", width: 20 },
  ];

  // Transform data (so Excel looks clean)
  const formattedStaff = staff.map((s) => ({
    ...s,
    yearsOfExperience: s.yearsOfExperience
      ? `${s.yearsOfExperience} ${
          s.yearsOfExperience === "1" ? "year" : "years"
        }`
      : "",
    dateOfJoining: s.dateOfJoining
      ? new Date(s.dateOfJoining).toLocaleDateString()
      : "",
  }));

  exportToExcelWithPrintSetup(
    formattedStaff,
    "staff_list",
    "Staff",
    "STAFF MEMBERS REPORT",
    staffColumns
  );
};