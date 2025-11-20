import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Controls from "../../../components/Controls";
import Title from "../../../utils/Title";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AllDocumentsByClient } from "../../../functions/documentSlice";
import {
  PictureAsPdf,
  Description,
  InsertDriveFile,
  Image,
} from "@mui/icons-material";
import { AllPastLoanApplications } from "../../../functions/loanApplySlice";

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

const url = "https://loan-server-jdbs.onrender.com";

export default function ViewApplication({ item, updateStatus }) {
  const [documents, setDocuments] = useState([]);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await AllDocumentsByClient(item.client_uuid);
        setDocuments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDocuments();
  }, [item]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await AllPastLoanApplications(item.uuid);
        setHistory(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchHistory();
  }, [item]);

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    return fileIcons[extension] || <InsertDriveFile color="disabled" />;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status) {
      const detail = {
        uuid: item.uuid,
        status: status,
      };
      updateStatus(detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {item.client_individual_detail ? (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <Title>Individual Client Details</Title>
              <Controls.Input
                name="firstName"
                label="Full name"
                value={
                  item.client_individual_detail?.firstName +
                  " " +
                  item.client_individual_detail?.lastName
                }
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="ID_number"
                label="ID_number"
                value={item.client_individual_detail?.ID_number}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="emailAddress"
                label="Email Address"
                value={item.client_individual_detail?.emailAddress}
                inputProps={{ readOnly: true }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <Title>Business Client Details</Title>
              <Controls.Input
                name="businessName"
                label="Company name"
                value={item.client_business_detail?.businessName}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="contactPerson"
                label="Contact Person"
                value={item.client_business_detail?.contactPerson}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="emailAddress"
                label="Contact Person email"
                value={item.client_business_detail?.emailAddress}
                inputProps={{ readOnly: true }}
              />
            </Grid>
          </>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <div>
            <Title>Documents of proof</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>File</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((item, index) => (
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
                        {getFileIcon(item.documentFile)} open
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div>
            <Title>Application History</Title>
            {history && history.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <strong>Loan</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Interest</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Payable</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Term</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((item, index) => (
                    <TableRow
                      key={item.uuid}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.loanAmount}</TableCell>
                      <TableCell>{item.interestRate}</TableCell>
                      <TableCell>
                        {item.client_loan_payment?.totalPayment}
                      </TableCell>
                      <TableCell>{item.loanTerm}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              "No previous loan applications for this user"
            )}
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="p-5">
            <Title>My Application</Title>
            <span style={{ marginLeft: 15 }}>
              Date: {new Date(item.createdAt).toDateString()}
            </span>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>$</TableCell>
                  <TableCell>$</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Gross loan</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{item.loanAmount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Origination</TableCell>
                  <TableCell>{item.originationFee}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Net loan</b>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <b>{item.netLoanAmount}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Interest</TableCell>
                  <TableCell>{item.interestRate}%</TableCell>
                  <TableCell>
                    {item.client_loan_payment?.totalInterest}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Loan term</TableCell>
                  <TableCell>{item.loanTerm}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EMI</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{item.client_loan_payment?.loanEMI}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Payable</b>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <b>{item.client_loan_payment?.totalPayment}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <Title>Status</Title>
            {item.status === "pending" ? (
              <>
                <FormControl
                  component="fieldset"
                  sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
                >
                  <FormLabel component="legend">Application status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <FormControlLabel
                      value="approved"
                      label="Approve"
                      sx={{ mr: 1 }}
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value="rejected"
                      label="Reject"
                      sx={{ mr: 1 }}
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
                <div>
                  <Controls.Button type="submit" text="Update" />
                </div>
              </>
            ) : (
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
                        paymentStatusColors[item.client_loan_payment?.status] ||
                        "black",
                      fontWeight: "bold",
                    }}
                  >
                    {item.client_loan_payment?.status}
                  </span>
                </span>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
