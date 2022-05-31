export const APP_ROUTES = {
  home: '',
  report: {
    create: 'report',
    update: `report/:id`,
    update_id: (id: number) => `report/${id}`, // Includes the id
    search: 'search',
    compare: 'compare',
  },

  error: {
    notFound: '**',
    internal: 'error',
  },
};
