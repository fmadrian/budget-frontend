import { ReportResponse } from '../payload/report/report.payload';

export const getReportItems = (
  reports: ReportResponse[],
  isIncome: boolean
) => {
  const result: string[] = [];
  reports.map((report) => {
    report.items.map((item) => {
      if (
        result.includes(item.subcategory.name) === false &&
        item.income === isIncome
      ) {
        result.push(item.subcategory.name);
      }
    });
  });
  return result;
};

export const prepareReports = (
  items: string[],
  reports: ReportResponse[],
  isIncome: boolean
) => {
  const result: any[] = [];
  let newReport: any = {};
  reports.map((report, i) => {
    let reportItems = report.items.filter(
      (reportItem) => reportItem.income === isIncome
    );
    // Get the name of the items in the report and filter the income or expenses.
    let reportItemsNames = reportItems.map(
      (reportItem) => reportItem.subcategory.name
    );
    // Add the name of the new report.
    newReport = { name: `${report.id}_${report.name}` };
    items.map((item) => {
      let total = 0;
      // Find one of the items inside the report to get its total, if it doesn't exist, add a 0 as total.
      let itemIndex = reportItemsNames.indexOf(item);
      if (itemIndex != -1) {
        total = reportItems[itemIndex].total;
      }
      // Adds the item and its total to the object
      newReport = { ...newReport, [item]: total };
    });
    // Add the new report to the result array.
    result.push(newReport);
  });
  return result;
};

export const getMaxValue = (reports: ReportResponse[], isIncome: boolean) => {
  // Take the highest income / expense value of all the reports.
  const values = reports.map((report) =>
    isIncome ? report.income : report.expenses
  );
  return Math.max(0, ...values);
};
