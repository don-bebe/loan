import React, { useEffect, useState } from "react";
import PageHeader from "../../../utils/PageHeader";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Toolbar,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Controls from "../../../components/Controls";
import { Search, AddAlert, Edit, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../utils/useTable";
import Popup from "../../../utils/Popup";
import AddorEdit from "./AddorEdit";
import {
  reset,
  AllLoanPackages,
  UpdateLoanPackage,
  CreateLoanPackage,
} from "../../../functions/loanPackageSlice";
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";

const headCells = [
  { id: "id", label: "" },
  { id: "name", label: "packageName" },
  { id: "loanAmount", label: "loanAmount($)" },
  { id: "repayment", label: "Period(months)" },
  { id: "interest", label: "Interest Rate(%) " },
  { id: "origination", label: "Origination fee($)" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function LoanPackages() {
  const { packages, isSuccess, isError, message } = useSelector(
    (state) => state.packages
  );
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

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
            x.packageName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  async function LoanPackageData() {
    try {
      const response = await AllLoanPackages();
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    LoanPackageData();
  }, []);

  useEffect(() => {
    if (isError) {
      setLoading(false);
      setNotify({
        open: true,
        severity: "error",
        message: message,
      });
    }
    if (packages && isSuccess) {
      setNotify({
        open: true,
        severity: "success",
        message: message,
      });
      setLoading(false);
      setOpenPopup(false);
      LoanPackageData();
    }
    dispatch(reset());
  }, [isError, message, packages, isSuccess, dispatch]);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleSubmit = (packageDetails, resetForm) => {
    try {
      setLoading(true);
      if (packageDetails.id) {
        dispatch(
          UpdateLoanPackage({
            id: packageDetails.id,
            package_details: packageDetails,
          })
        );
      } else {
        dispatch(CreateLoanPackage(packageDetails));
      }
      LoanPackageData();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader
        title="MicroLend | Loan Packages"
        subTitle="Specialized loan packages"
        icon={<InventoryIcon fontSize="large" />}
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
          label="Search employees"
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
          text="Add new"
          variant="outlined"
          startIcon={<AddAlert />}
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
          }}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.packageName}</TableCell>
              <TableCell>{item.maxLoanAmount}</TableCell>
              <TableCell>{item.maxRepaymentPeriod}</TableCell>
              <TableCell>{item.maxInterestRate}</TableCell>
              <TableCell>{item.maxOriginationFee}</TableCell>
              <TableCell>
                <Controls.ActionButton
                  onClick={() => {
                    openInPopup(item);
                  }}
                >
                  <Edit fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton>
                  <Visibility fontSize="small" />
                </Controls.ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup
        title={
          recordForEdit
            ? "MicroLend | Update Loan Package Details"
            : "MicroLend | Add New Loan Package"
        }
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddorEdit recordForEdit={recordForEdit} submitRecord={handleSubmit} />
      </Popup>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
