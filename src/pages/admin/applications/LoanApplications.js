import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../utils/Popup";
import PageHeader from "../../../utils/PageHeader";
import {
  AppRegistrationTwoTone,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  InputAdornment,
  Toolbar,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Controls from "../../../components/Controls";
import useTable from "../../../utils/useTable";
import {
  AllLoanApplications,
  ApproveLoanApplication,
  reset,
} from "../../../functions/loanApplySlice";
import ViewApplication from "./ViewApplication";
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";

const headCells = [
  { id: "id", label: "" },
  { id: "client", label: "Client" },
  { id: "loanType", label: "Package" },
  { id: "loanAmount", label: "Applied($)" },
  { id: "loanTerm", label: "Term" },
  { id: "interestRate", label: "Rate" },
  { id: "originationFee", label: "O.Fee" },
  { id: "date", label: "Date" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function LoanApplications() {
  const [records, setRecords] = useState([]);
  const [recordForView, setRecordForView] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const dispatch = useDispatch();

  const { apply, isError, isSuccess, message } = useSelector(
    (state) => state.apply
  );

  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [loading, setLoading] = useState(false);

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

  async function fetchAllApplications() {
    try {
      const response = await AllLoanApplications();
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const loanStatusColors = {
    cancelled: "red",
    pending: "orange",
    approved: "green",
    rejected: "gray",
  };

  const openInPopupView = (item) => {
    setRecordForView(item);
    setOpenPopup(true);
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
      setOpenPopup(false);
    }
    dispatch(reset());
    fetchAllApplications();
  }, [apply, dispatch, isError, isSuccess, message]);

  const handleSubmit = (detail) => {
    try {
      setLoading(true);
      dispatch(
        ApproveLoanApplication({ uuid: detail.uuid, details: detail })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader
        title="MicroLend | Loan Applications"
        subTitle="Application history"
        icon={<AppRegistrationTwoTone fontSize="large" />}
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
                {item.client_individual_detail
                  ? item.client_individual_detail?.firstName +
                    " " +
                    item.client_individual_detail?.lastName
                  : item.client_business_detail?.businessName}
              </TableCell>
              <TableCell>{item.loanType}</TableCell>
              <TableCell>{item.loanAmount}</TableCell>
              <TableCell>{item.loanTerm}</TableCell>
              <TableCell>{item.interestRate}</TableCell>
              <TableCell>{item.originationFee}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell
                style={{
                  color: loanStatusColors[item.status] || "black",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </TableCell>
              <TableCell>
                <Controls.ActionButton
                  onClick={() => {
                    openInPopupView(item);
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
        title="MicroLend | View Loan Application"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ViewApplication item={recordForView} updateStatus={handleSubmit} />
      </Popup>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
