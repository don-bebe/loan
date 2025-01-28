import React, { useEffect, useState } from "react";
import PageHeader from "../../../utils/PageHeader";
import {
  BusinessCenter,
  GroupsTwoTone,
  Search,
  Edit,
  Visibility,
} from "@mui/icons-material";
import {
  Toolbar,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import useTable from "../../../utils/useTable";
import Controls from "../../../components/Controls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../utils/Popup";
import ViewOnly from "./ViewOnly";
import EditOnly from "./EditOnly";
import {
  AllIndividualClients,
  reset,
  UpdateIndividualClient,
} from "../../../functions/clientsSlice";
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";

const headCells = [
  { id: "id", label: "" },
  { id: "name", label: "Full Name" },
  { id: "dob", label: "DOB" },
  { id: "ID_Number", label: "ID_Number" },
  { id: "phoneNumber", label: "Cell" },
  { id: "emailAddress", label: "Email" },
  { id: "isApproved", label: "isApproved" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function ClientList() {
  const { clients, isSuccess, isError, message } = useSelector(
    (state) => state.clients
  );

  const [records, setRecords] = useState([]);
  const [recordForView, setRecordForView] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [isIndividual, setIsIndividual] = useState(false);
  const navigate = useNavigate();
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
  const dispatch = useDispatch();

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.lastName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  async function LoadIndividualData() {
    try {
      const response = await AllIndividualClients();
      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    LoadIndividualData();
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
    if (clients && isSuccess) {
      setNotify({
        open: true,
        severity: "success",
        message: message,
      });
      setLoading(false);
      setOpenPopup(false);
      LoadIndividualData();
    }
    dispatch(reset());
  }, [isError, message, clients, isSuccess, dispatch]);

  const openInPopup = (item) => {
    setRecordForView(item);
    setIsIndividual(true);
    setOpen(true);
  };

  const openInPopEdit = (item) => {
    setRecordForEdit(item);
    setIsIndividual(true);
    setOpenPopup(true);
  };

  const handleSubmit = (individual_details, resetForm) => {
    try {
      setLoading(true);
      if (individual_details.uuid) {
        dispatch(
          UpdateIndividualClient({
            uuid: individual_details.uuid,
            individual_details,
          })
        );
      }
      LoadIndividualData();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader
        title="MicroLend | Individual and Business Client List"
        subTitle="System registered clients"
        icon={<GroupsTwoTone fontSize="large" />}
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
          label="Search individual client by lastName"
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
          text="Business"
          variant="outlined"
          startIcon={<BusinessCenter />}
          onClick={() => navigate("/admin/dashboard/business")}
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
              <TableCell>{item.firstName + " " + item.lastName}</TableCell>
              <TableCell>{item.dateOfBirth}</TableCell>
              <TableCell>{item.ID_number}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.emailAddress}</TableCell>
              <TableCell>{item.isApproved ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Controls.ActionButton onClick={() => openInPopEdit(item)}>
                  <Edit fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton onClick={() => openInPopup(item)}>
                  <Visibility fontSize="small" />
                </Controls.ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup
        title="MicroLend | View Client Details"
        openPopup={open}
        setOpenPopup={setOpen}
      >
        <ViewOnly isIndividual={isIndividual} item={recordForView} />
      </Popup>
      <Popup
        title="MicroLend| Edit Individual Client"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditOnly
          isIndividual={isIndividual}
          recordForEdit={recordForEdit}
          submitForm={handleSubmit}
        />
      </Popup>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
