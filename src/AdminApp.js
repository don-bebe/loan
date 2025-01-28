import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccessForbidden from "./utils/AccessForbidden";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "./functions/authSlice";
import MoneyIcon from "@mui/icons-material/Money";
import ConfirmDialog from "./utils/ConfirmDialog";

const NAVIGATION = [
  { segment: "admin/dashboard", title: "Home", icon: <DashboardIcon /> },
  {
    segment: "admin/dashboard/clients",
    title: "Clients",
    icon: <PeopleIcon />,
  },
  {
    segment: "admin/dashboard/packages",
    title: "Loan Packages",
    icon: <InventoryIcon />,
  },
  {
    segment: "admin/dashboard/loan",
    title: "Loan Applications",
    icon: <CreditScoreIcon />,
  },
  {
    segment: "admin/dashboard/payment",
    title: "Loan Payments",
    icon: <MoneyIcon />,
  },
];

export default function AdminApp() {
  const { user } = useSelector((state) => state.auth);
  const [session, setSession] = React.useState(null);
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  const userLogout = async () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      navigate("/");
      dispatch(LogOut());
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user) {
      setSession({
        user: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          image: <AccountCircleIcon />,
        },
      });
    } else {
      setSession(null);
    }
  }, [user]);

  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        navigate("/signin");
      },
      signOut: () => {
        setConfirmDialog({
          isOpen: true,
          title: "You are about to logout of the system!",
          subTitle: "Are you sure, you can't undo this operation",
          onConfirm: () => {
            userLogout();
          },
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, setConfirmDialog]
  );

  return (
    <>
      <AppProvider
        navigation={NAVIGATION}
        session={session}
        authentication={authentication}
        branding={{
          logo: <img src="/logo.png" alt="Logo" />,
          title: "MicroLend",
        }}
      >
        {session ? (
          // Authorized Content
          <Outlet />
        ) : (
          // Unauthorized Message
          <AccessForbidden />
        )}
      </AppProvider>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
