import React, { useState, useEffect } from "react";
import PageHeader from "../../../utils/PageHeader";
import {
  GroupsTwoTone,
  Search,
  Edit,
  Visibility,
  PersonAddAlt,
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
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";
import {
  AllBusinessClients,
  reset,
  UpdateBusinessClient,
} from "../../../functions/clientsSlice";

const headCells = [
  { id: "id", label: "" },
  { id: "name", label: "Company Name" },
  { id: "registrationNumber", label: "Reg number" },
  { id: "contactPerson", label: "Contact Person" },
  { id: "phoneNumber", label: "Cell" },
  { id: "emailAddress", label: "Email" },
  { id: "isApproved", label: "isApproved" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function BusinessClientList() {
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
            x.contactPerson.toLowerCase().includes(target.value)
          );
      },
    });
  };

  async function LoadBusinessData() {
    try {
      const response = await AllBusinessClients();
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    LoadBusinessData();
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
      LoadBusinessData();
    }
    dispatch(reset());
  }, [dispatch, clients, isError, isSuccess, message]);

  const openInPopup = (item) => {
    setRecordForView(item);
    setIsIndividual(false);
    setOpen(true);
  };

  const openInPopEdit = (item) => {
    setRecordForEdit(item);
    setIsIndividual(false);
    setOpenPopup(true);
  };

  const handleSubmit = (business_details, resetForm) => {
    try {
      setLoading(true);
      if (business_details.uuid) {
        dispatch(
          UpdateBusinessClient({
            uuid: business_details.uuid,
            business_details,
          })
        );
      }
      LoadBusinessData();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader
        title="MicroLend | Business and Individual Client List"
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
          label="Search business client by contact person"
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
          text="Individual"
          variant="outlined"
          startIcon={<PersonAddAlt />}
          onClick={() => navigate("/admin/dashboard/clients")}
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
              <TableCell>{item.businessName}</TableCell>
              <TableCell>{item.registrationNumber}</TableCell>
              <TableCell>{item.contactPerson}</TableCell>
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
        title="MicroLend | Edit Business Client"
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
