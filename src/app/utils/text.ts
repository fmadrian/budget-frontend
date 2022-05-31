import { APP_SETTINGS } from './settings';

interface TextDictionary {
  // Key and value.
  // Language, category / section, item.
  [lang: string]: { [category: string]: { [item: string]: any } };
}

const APP_TEXT: TextDictionary = {
  en: {
    app: {
      name: 'Expense Tracker',
    },
    home: {
      btnCreateReport: 'CREATE NEW REPORT',
      btnCreateReportBlank: 'CREATE NEW REPORT (BLANK)',
      btnSearchReport: 'SEARCH REPORT',
    },
    itemBar: {
      btnAdd: 'ADD',
      btnIsIncome: (isIncome: boolean) => (isIncome ? 'INCOME' : 'EXPENSE'),
      lblSubcategory: 'SUBCATEGORY',
      lblTotal: 'TOTAL',
      lblNotes: 'NOTES',
    },
    reportTable: {
      lblSubcategory: 'SUBCATEGORY',
      lblTotal: 'TOTAL',
      lblNotes: 'NOTES',
      btnDelete: 'DELETE',
    },
    report: {
      lblIncome: 'INCOME',
      lblExpenses: 'EXPENSES',
      lblTotalIncome: 'TOTAL INCOME: ',
      lblTotalExpenses: 'TOTAL EXPENSES: ',
      lblTotal: 'TOTAL: ',
      btnSave: 'SAVE',
      btnBack: 'EXIT',
      lblDate: 'DATE',
      lblDateHint: 'MM/DD/YYYY',
    },
    searchReport: {
      lblRange: 'SINCE (MM/DD/YYYY) – UNTIL (MM/DD/YYYY)',
      lblDate: 'DATE',
      lblName: 'NAME',
      lblStartDate: 'SINCE (DATE)',
      lblEndDate: 'UNTIL (DATE)',
      btnSearch: 'SEARCH REPORT',
    },
    reportResults: {
      lblName: 'NAME',
      lblDate: 'DATE',
      lblIncome: 'INCOME',
      lblExpenses: 'EXPENSES',
      lblTotal: 'TOTAL',
      btnDelete: 'DELETE',
      btnUpdate: 'UPDATE',
      btnCopy: 'COPY',
    },
  },
  es: {
    app: {
      name: 'Expense Tracker',
    },
    home: {
      btnCreateReport: 'CREAR NUEVO REPORTE',
      btnCreateReportBlank: 'CREAR NUEVO REPORTE (DESDE CERO)',
      btnSearchReport: 'BUSCAR REPORTE',
    },
    itemBar: {
      btnAdd: 'AÑADIR',
      btnIsIncome: (isIncome: boolean) => (isIncome ? 'INGRESO' : 'GASTO'),
      lblSubcategory: 'CONCEPTO',
      lblTotal: 'MONTO ',
      lblNotes: 'INFORMACIÓN ADICIONAL',
    },
    reportTable: {
      lblSubcategory: 'CONCEPTO',
      lblTotal: 'TOTAL',
      lblNotes: 'NOTAS',
      btnDelete: 'BORRAR',
    },
    report: {
      lblIncome: 'INGRESO',
      lblExpenses: 'GASTOS',
      lblTotalIncome: 'TOTAL INGRESO: ',
      lblTotalExpenses: 'TOTAL GASTOS: ',
      lblTotal: 'TOTAL: ',
      btnSave: 'GUARDAR',
      btnBack: 'SALIR',
      lblDate: 'FECHA',
      lblDateHint: 'MM/DD/AAAA',
    },
    searchReport: {
      lblRange: 'DESDE (MM/DD/AAAA) – HASTA (MM/DD/AAAA)',
      lblDate: 'FECHA',
      lblName: 'NOMBRE',
      lblStartDate: 'DESDE (FECHA)',
      lblEndDate: 'HASTA (FECHA)',
      btnSearch: 'BUSCAR REPORTE',
    },
    reportResults: {
      lblName: 'NOMBRE',
      lblDate: 'FECHA',
      lblIncome: 'INGRESOS',
      lblExpenses: 'GASTOS',
      lblTotal: 'TOTAL',
      btnDelete: 'BORRAR REPORTE',
      btnUpdate: 'MODIFICAR REPORTE',
      btnCopy: 'COPIAR REPORTE',
    },
  },
};
export const GET_APP_TEXT = (category: string, text: string) => {
  return APP_TEXT[APP_SETTINGS.lang][category][text];
};
