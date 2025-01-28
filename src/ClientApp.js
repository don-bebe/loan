import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CalculateIcon from "@mui/icons-material/Calculate";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthClient from "./auth/AuthClient";
import ConfirmDialog from "./utils/ConfirmDialog";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "loan",
    title: "My Loans",
    icon: <CreditScoreIcon />,
  },
  {
    segment: "calculator",
    title: "Loan Calculator",
    icon: <CalculateIcon />,
  },
  {
    segment: "documents",
    title: "My Documents",
    icon: <FileUploadIcon />,
  },
  {
    segment: "profile",
    title: "My Profile",
    icon: <PermContactCalendarIcon />,
  },
  {
    segment: "register",
    title: "Register",
    icon: <PersonAddIcon />,
  },
];

export default function ClientApp() {
  const { borrower } = useSelector((state) => state.clientAuth);
  const [session, setSession] = React.useState(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const navigate = useNavigate();

  const userLogout = async () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      setSession(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (borrower) {
      setSession({
        user: {
          name: `${borrower.role === "individual" ? borrower.firstName + " " + borrower.lastName : borrower.businessName}`,
          email: borrower.email,
          image: <AccountCircleIcon />,
        },
      });
    } else {
      setSession(null);
    }
  }, [borrower]);

  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        setOpenLogin(true);
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
    [setConfirmDialog]
  );

  // Filter navigation items based on session state
  const navigation = React.useMemo(() => {
    if (!session) {
      // When not signed in, show only
      return NAVIGATION_ITEMS.filter((item) =>
        ["Home", "Loan Calculator", "Register"].includes(item.title)
      );
    }
    // When signed in, exclude "Login" and "Register"
    return NAVIGATION_ITEMS.filter((item) =>
      [
        "Home",
        "My Loans",
        "My Documents",
        "Loan Calculator",
        "My Profile",
      ].includes(item.title)
    );
  }, [session]);

  return (
    <>
      <AppProvider
        session={session}
        navigation={navigation}
        authentication={authentication}
        branding={{
          logo: <img src="/logo.png" alt="Logo" />,
          title: "MicroLend",
        }}
      >
        <Outlet />
      </AppProvider>
      <AuthClient openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
