import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllLoanPackagesActive } from "../../../functions/loanPackageSlice";
import ApplyLoan from "./ApplyLoan";
import PageHeader from "../../../utils/PageHeader";
import {
  AddAlert,
  Close,
  LocalAtmTwoTone,
  Payment,
  Search,
  Visibility,
  CalendarMonth,
} from "@mui/icons-material";
import {
  InputAdornment,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";
import useTable from "../../../utils/useTable";
import Controls from "../../../components/Controls";
import {
  AllMyLoanApplications,
  CancelLoanApplication,
  reset,
} from "../../../functions/loanApplySlice";
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";
import ConfirmDialog from "../../../utils/ConfirmDialog";
import Popup from "../../../utils/Popup";
import ViewLoan from "./ViewLoan";
import Checkout from "../payment/Checkout";
import PaymentCalender from "../payment/PaymentCalender";

const headCells = [
  { id: "id", label: "" },
  { id: "loanType", label: "Package" },
  { id: "loanAmount", label: "Applied($)" },
  { id: "netLoan", label: "Received($)" },
  { id: "totalAmount", label: "To pay($)" },
  { id: "emi", label: "EMI($)" },
  { id: "loanTerm", label: "Period" },
  { id: "interestRate", label: "Rate(%)" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function LoanApplication() {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [records, setRecords] = useState([]);
  const [recordForView, setRecordForView] = useState([]);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { apply, isError, isSuccess, message } = useSelector(
    (state) => state.apply
  );
  const dispatch = useDispatch();
  const [openCalendarPopup, setOpenCalendarPopup] = useState(false);

  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [loading, setLoading] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.loanType.toLowerCase().includes(target.value)
          );
      },
    });
  };

  async function fetchMyLoanData() {
    try {
      const response = await AllMyLoanApplications();
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMyLoanData();
  }, []);

  const handleViewLoan = (item) => {
    setOpenPopup(true);
    setRecordForView(item);
  };

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await AllLoanPackagesActive();
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching loan packages:", error);
      }
    }
    fetchPackages();
  }, []);

  const loanStatusColors = {
    cancelled: "red",
    pending: "orange",
    approved: "green",
    rejected: "gray",
  };

  const paymentStatusColors = {
    pending: "orange",
    cancelled: "red",
    partial: "blue",
    paid: "green",
  };

  useEffect(() => {
    if (isError) {
      setLoading(false);
      setNotify({
        open: true,
        severity: "error",
        message: message,
      });
    }
    if (apply && isSuccess) {
      setLoading(false);
      setNotify({
        open: true,
        severity: "success",
        message: message,
      });
    }
    dispatch(reset());
    fetchMyLoanData();
  }, [apply, dispatch, isSuccess, message, isError]);

  const handleCancelLoan = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      setLoading(true);
      dispatch(CancelLoanApplication({ uuid: item }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPayment = (payment_details) => {
    setLoading(true);
    try {
      alert(JSON.stringify(payment_details));
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const handleViewCalendar = () => {
    setOpenCalendarPopup(true);
  };
  return (
    <>
      <PageHeader
        title="My Loans"
        subTitle="Payment history"
        icon={<LocalAtmTwoTone fontSize="large" />}
      />
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <Controls.Input
          label="Search application by loan type"
          sx={{ width: "60%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <Controls.Button
          text="Apply"
          startIcon={<AddAlert />}
          variant="outlined"
          onClick={() => {
            setOpen(true);
            setSelectedPackage(null);
          }}
        />
        {records.length > 0 && (
          <Controls.Button
            text="View Payment Calendar"
            startIcon={<CalendarMonth />}
            variant="contained"
            color="primary"
            onClick={handleViewCalendar}
          />
        )}
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, index) => (
            <TableRow
              key={item.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{item.loanType}</TableCell>
              <TableCell>{item.loanAmount}</TableCell>
              <TableCell>{item.netLoanAmount}</TableCell>
              <TableCell>{item.client_loan_payment?.totalPayment}</TableCell>
              <TableCell>{item.client_loan_payment?.loanEMI}</TableCell>
              <TableCell>{item.loanTerm}</TableCell>
              <TableCell>{item.interestRate}</TableCell>
              <TableCell>
                <div>
                  <span>
                    <strong>Loan: </strong>
                    <span
                      style={{
                        color: loanStatusColors[item.status] || "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item.status}
                    </span>
                  </span>
                  <br />
                  <span>
                    <strong>Payment: </strong>
                    <span
                      style={{
                        color:
                          paymentStatusColors[
                            item.client_loan_payment?.status
                          ] || "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item.client_loan_payment?.status}
                    </span>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {item.status === "approved" &&
                  item.client_loan_payment?.status !== "paid" && (
                    <Controls.ActionButton
                      onClick={() => {
                        setOpenPaymentPopup(true);
                        setSelectedRecord(item);
                      }}
                    >
                      <Payment />
                    </Controls.ActionButton>
                  )}
                <Controls.ActionButton
                  onClick={() => {
                    handleViewLoan(item);
                  }}
                >
                  <Visibility fontSize="small" />
                </Controls.ActionButton>
                {item.status === "pending" && (
                  <Controls.ActionButton
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title:
                          "You are about to cancel your loan application, are your sure?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          handleCancelLoan(item.uuid);
                        },
                      });
                    }}
                  >
                    <Close fontSize="small" />
                  </Controls.ActionButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <ApplyLoan
        open={open}
        setOpen={setOpen}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        packages={packages}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Popup
        title="MicroLend | My Loan Profile"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ViewLoan item={recordForView} />
      </Popup>
      <Popup
        title="MicroLend | Payment form"
        openPopup={openPaymentPopup}
        setOpenPopup={setOpenPaymentPopup}
      >
        <Checkout item={selectedRecord} submitPayment={handleSubmitPayment} />
      </Popup>
      <Popup
        title="MicroLend | Payment Calendar"
        openPopup={openCalendarPopup}
        setOpenPopup={setOpenCalendarPopup}
      >
        <PaymentCalender />
      </Popup>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
