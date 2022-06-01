import { APP_SETTINGS } from './settings';

interface TextDictionary {
  // Key and value.
  // Language, category / section, item.
  [lang: string]: { [category: string]: { [item: string]: any } };
}

const APP_TEXT: TextDictionary = {
  en: {
    app: {
      name: 'Budget Tracker',
    },
    home: {
      btnCreateReport: 'CREATE NEW REPORT (COPY LAST)',
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
      lblDate: 'REPORT DATE',
      lblDateHint: 'MM/DD/YYYY',
      lblName: 'REPORT NAME',
      lblAddItems: 'ADD ITEM TO REPORT',
      lblReportData: 'REPORT INFORMATION',
      btnHide: 'HIDE',
      btnShow: 'SHOW',
      msgReportDeleted: (name: string) => `Report ${name} deleted.`,
      msgCopyFailed: `Couldn't copy report.`,
    },
    searchReport: {
      lblRange: 'SINCE (MM/DD/YYYY) – UNTIL (MM/DD/YYYY)',
      lblDate: 'REPORT DATE',
      lblName: 'REPORT NAME',
      lblStartDate: 'SINCE (DATE)',
      lblEndDate: 'UNTIL (DATE)',
      btnSearch: 'SEARCH',
      lblSearchReport: 'SEARCH REPORT',
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
    snackbar: {
      btnOK: 'OK',
      error: (msg: string) => `ERROR: ${msg}`,
    },
    error: {
      internal: `Internal error.`,
      notFound: 'Site not found.',
    },
  },
  es: {
    app: {
      name: 'Expense Tracker',
    },
    home: {
      btnCreateReport: 'CREAR NUEVO REPORTE (COPIA DE ÚLTIMO)',
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
      lblDate: 'FECHA DE REPORTE',
      lblDateHint: 'MM/DD/AAAA',
      lblName: 'NOMBRE DE REPORTE',
      lblAddItems: 'AÑADIR ITEM A REPORTE',
      lblReportData: 'INFORMACIÓN DE REPORTE',
      btnHide: 'OCULTAR',
      btnShow: 'MOSTRAR',
      msgReportDeleted: (name: string) => `Reporte ${name} eliminado.`,
      msgCopyFailed: `No se pudo copiar el reporte.`,
    },
    searchReport: {
      lblRange: 'DESDE (MM/DD/AAAA) – HASTA (MM/DD/AAAA)',
      lblDate: 'FECHA DE REPORTE',
      lblName: 'NOMBRE DE REPORTE',
      lblStartDate: 'DESDE (FECHA)',
      lblEndDate: 'HASTA (FECHA)',
      btnSearch: 'BUSCAR',
      lblSearchReport: 'BUSCAR REPORTE',
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
    snackbar: {
      btnOK: 'OK',
      error: (msg: string) => `ERROR: ${msg}`,
    },
    error: {
      internal: `Error interno.`,
      notFound: 'Contenido no existe.',
    },
  },
};
export const GET_APP_TEXT = (category: string, text: string) => {
  return APP_TEXT[APP_SETTINGS.lang][category][text];
};
