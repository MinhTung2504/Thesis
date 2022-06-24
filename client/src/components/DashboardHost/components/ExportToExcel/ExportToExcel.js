import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ revenueStat, bookingStat }) => {
    const newRevenueStat = [];
    for (let i = 0; i < revenueStat.length; i++) {
        let period =
            revenueStat[i]._id.month.toString() +
            "-" +
            revenueStat[i]._id.year.toString();
        newRevenueStat.push({ period: period, total: revenueStat[i].total });
    }
    const fileType = "xlsx";

    const exportToCSV = () => {
        const revenueInYear = XLSX.utils.json_to_sheet(newRevenueStat);
        const bookingStatInYear = XLSX.utils.json_to_sheet(bookingStat);
        const wb = { Sheets: { revenue: revenueInYear, booking: bookingStatInYear }, SheetNames: ["revenue", 'booking'] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "myfile" + ".xlsx");
    };
    return <button onClick={exportToCSV}>Export File</button>;
};
