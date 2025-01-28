import React, { useEffect, useState } from "react";
import PageHeader from "../../../utils/PageHeader";
import {
  PaymentTwoTone,
  PointOfSaleRounded,
  Search,
  Visibility,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  InputAdornment,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";
import {
  GetAllPayments,
  MakeLoanPayment,
  reset,
} from "../../../functions/paymentSlice";
import Controls from "../../../components/Controls";
import useTable from "../../../utils/useTable";
import Popup from "../../../utils/Popup";
import MakePayment from "./MakePayment";
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";
import ViewPayment from "./ViewPayment";

const headCells = [
  { id: "id", label: "" },
  { id: "client", label: "Client" },
  { id: "loanAmount", label: "loanAmount($)" },
  { id: "totalInterest", label: "totalInterest($)" },
  { id: "totalPayment", label: "totalPayment ($)" },
  { id: "loanEMI", label: "loanEMI($)" },
  { id: "amountPaid", label: "AmountPaid($)" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function LoanPayments() {
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [recordForPayment, setRecordForPayment] = useState([]);
  const [recordForView, setRecordForView] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [loading, setLoading] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const { pay, isError, isSuccess, message } = useSelector(
    (state) => state.pay
  );
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.client_loan_application?.client_individual_detail?.lastName
                ?.toLowerCase()
                .includes(target.value) ||
              x.client_loan_application?.client_business_detail?.businessName
                ?.toLowerCase()
                .includes(target.value)
          );
      },
    });
  };

  async function fetchPayments() {
    try {
      const response = await GetAllPayments();
      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, []);

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
    if (pay && isSuccess) {
      setLoading(false);
      setOpenPopup(false);
      setNotify({
        open: true,
        severity: "success",
        message: message,
      });
      fetchPayments();
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, pay, message]);

  const handleSubmitPayment = (payment_details) => {
    try {
      setLoading(true);
      dispatch(MakeLoanPayment(payment_details));
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <>
      <PageHeader
        title="MicroLend | Loan Payments"
        subTitle="Payment history"
        icon={<PaymentTwoTone fontSize="large" />}
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
          label="Search loan payment by client lastname or business name"
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
              <TableCell>
                {item.client_loan_application?.client_individual_detail
                  ? item.client_loan_application?.client_individual_detail
                      ?.firstName +
                    " " +
                    item.client_loan_application?.client_individual_detail
                      ?.lastName
                  : item.client_loan_application?.client_business_detail
                      ?.businessName}
              </TableCell>
              <TableCell>{item.client_loan_application?.loanAmount}</TableCell>
              <TableCell>{item.totalInterest}</TableCell>
              <TableCell>{item.totalPayment}</TableCell>
              <TableCell>{item.loanEMI}</TableCell>
              <TableCell>{item.totalEMIPaid || 0}</TableCell>
              <TableCell
                style={{
                  color: paymentStatusColors[item.status] || "black",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </TableCell>
              <TableCell>
                {item.status !== "paid" && (
                  <Controls.ActionButton
                    onClick={() => {
                      setOpenPopup(true);
                      setRecordForPayment(item);
                    }}
                  >
                    <PointOfSaleRounded fontSize="small" />
                  </Controls.ActionButton>
                )}
                <Controls.ActionButton
                  onClick={() => {
                    setOpen(true);
                    setRecordForView(item);
                  }}
                >
                  <Visibility fontSize="small" />
                </Controls.ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup
        title="MicroLend | Payment form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MakePayment
          item={recordForPayment}
          submitPayment={handleSubmitPayment}
        />
      </Popup>
      <Popup
        title="MicroLend | View Payment History"
        openPopup={open}
        setOpenPopup={setOpen}
      >
        <ViewPayment item={recordForView} />
      </Popup>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
