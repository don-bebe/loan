import React, { useState, useEffect } from "react";
import PageHeader from "../../../utils/PageHeader";
import {
  FileUploadTwoTone,
  Search,
  UploadFile,
  PictureAsPdf,
  Description,
  InsertDriveFile,
  Image,
} from "@mui/icons-material";
import Popup from "../../../utils/Popup";
import MyFiles from "./MyFiles";
import useTable from "../../../utils/useTable";
import Controls from "../../../components/Controls";
import {
  Toolbar,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  AddMyDocuments,
  AllMyDocuments,
  reset,
} from "../../../functions/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";

const fileIcons = {
  pdf: <PictureAsPdf color="error" />,
  doc: <Description color="primary" />,
  docx: <Description color="primary" />,
  txt: <InsertDriveFile color="secondary" />,
  jpg: <Image color="action" />,
  jpeg: <Image color="action" />,
  png: <Image color="action" />,
  gif: <Image color="action" />,
};

const headCells = [
  { id: "id", label: "" },
  { id: "documentType", label: "Type" },
  { id: "documentFile", label: "File" },
];

const url = "http://localhost:5050";

export default function MyDocuments() {
  const { docs, isError, isSuccess, message } = useSelector(
    (state) => state.docs
  );

  const [openPopup, setOpenPopup] = useState(false);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const dispatch = useDispatch();

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
            x.documentType.toLowerCase().includes(target.value)
          );
      },
    });
  };

  async function fetchMyDocument() {
    try {
      const response = await AllMyDocuments();
      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMyDocument();
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
    if (docs && isSuccess) {
      setLoading(false);
      setNotify({
        open: true,
        severity: "success",
        message: message,
      });
      setOpenPopup(false);
      fetchMyDocument();
    }
    dispatch(reset());
  }, [docs, dispatch, isError, isSuccess, message]);

  const handleSubmit = (documents, resetForm) => {
    try {
      setLoading(true);
      dispatch(AddMyDocuments(documents));
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    return fileIcons[extension] || <InsertDriveFile color="disabled" />;
  };

  return (
    <>
      <PageHeader
        title="My Documents"
        subTitle=""
        icon={<FileUploadTwoTone fontSize="large" />}
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
          label="Search document"
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
          text="Upload files"
          startIcon={<UploadFile />}
          variant="outlined"
          onClick={() => {
            setOpenPopup(true);
          }}
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
              <TableCell>{item.documentType}</TableCell>
              <TableCell>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    window.open(`${url}/${item.documentFile}`, "_blank")
                  }
                >
                  {getFileIcon(item.documentFile)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup title="My files" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <MyFiles submitForm={handleSubmit} />
      </Popup>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
