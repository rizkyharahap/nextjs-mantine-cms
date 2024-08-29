export const routes = {
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    otp: "/otp",
    terms: "/terms",
    privacy: "/privacy",
  },

  dashboard: {
    root: "/",

    kanban: "/kanban",

    customers: {
      root: "/customers",
      list: "/customers/list",
      view: (customerId: string) => `/customers/${customerId}`,
    },

    metrics: "/metrics",
    charts: "/charts",
    tables: "/tables",
  },
};
