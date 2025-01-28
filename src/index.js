import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import "./index.css";
import Layout from "./layout/Layout";
import ClientDashboard from "./pages/client/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientApp from "./ClientApp";
import LoanApplication from "./pages/client/loans/LoanApplication";
import MyDocuments from "./pages/client/documents/MyDocuments";
import Calculator from "./pages/client/Calculator";
import AdminApp from "./AdminApp";
import SignIn from "./auth/employee/SignIn";
import ClientList from "./pages/admin/clients/ClientList";
import LoanPackages from "./pages/admin/packages/LoanPackages";
import RegistrationForm from "./auth/register/RegistrationForm";
import BusinessClientList from "./pages/admin/clients/BusinessClientList";
import LoanApplications from "./pages/admin/applications/LoanApplications";
import LoanPayments from "./pages/admin/payments/LoanPayments";
import MyProfile from "./pages/client/profile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ClientApp,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            index: true,
            Component: ClientDashboard,
          },
          {
            path: "loan",
            Component: LoanApplication,
          },
          {
            path: "documents",
            Component: MyDocuments,
          },
          {
            path: "calculator",
            Component: Calculator,
          },
          {
            path: "profile",
            Component: MyProfile,
          },
          {
            path: "register",
            Component: RegistrationForm,
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/admin",
    Component: AdminApp,
    children: [
      {
        path: "dashboard",
        Component: Layout,
        children: [
          {
            index: true,
            Component: AdminDashboard,
          },
          {
            path: "clients",
            Component: ClientList,
          },
          {
            path: "business",
            Component: BusinessClientList,
          },
          {
            path: "packages",
            Component: LoanPackages,
          },
          {
            path: "loan",
            Component: LoanApplications,
          },
          {
            path: "payment",
            Component: LoanPayments,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
