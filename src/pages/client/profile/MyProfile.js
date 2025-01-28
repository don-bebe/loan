import React, { useEffect, useState } from "react";
import PageHeader from "../../../utils/PageHeader";
import { Person2TwoTone } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import Controls from "../../../components/Controls";
import { MyProfileDetails } from "../../../functions/clientAuthSlice";
import Title from "../../../utils/Title";
import ChangePassword from "./ChangePassword";

export default function MyProfile() {
  const { borrower } = useSelector((state) => state.clientAuth);
  const [record, setRecord] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (borrower) {
      async function ViewMyProfile() {
        try {
          const response = await MyProfileDetails();
          console.log(response.data);
          setRecord(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      ViewMyProfile();
    }
  }, [borrower]);
  return (
    <>
      <PageHeader
        title="My Profile"
        subTitle={
          borrower && borrower.role === "individual"
            ? "Individual profile"
            : "Business profile"
        }
        icon={<Person2TwoTone fontSize="large" />}
      />
      <Grid container spacing={2} margin={2}>
        <Grid size={{ xs: 6, md: 6 }}>
          <Title>My details</Title>
          {borrower && borrower.role === "individual" ? (
            <>
              <Controls.Input
                name="firstName"
                label="Fullname"
                value={record.firstName + " " + record.lastName}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="dateOfBirth"
                label="Date of birth"
                value={record.dateOfBirth}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="gender"
                label="Gender"
                value={record.gender}
                inputProps={{ readOnly: true }}
              />
            </>
          ) : (
            <>
              <Controls.Input
                name="businessName"
                label="Fullname"
                value={record.businessName}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="companyTel"
                label="Company phone"
                value={record.companyPhone}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="contactPerson"
                label="Contact person"
                value={record.contactPerson}
                inputProps={{ readOnly: true }}
              />
            </>
          )}

          <Controls.Input
            name="registrationNumber"
            label="Registration number"
            value={
              borrower && borrower.role === "individual"
                ? record.ID_number
                : record.registrationNumber
            }
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="emailAddress"
            label="EmailAddress"
            value={record.emailAddress}
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <Title>Address info</Title>
          <Controls.Input
            name="phoneNumber"
            label="Phone number"
            value={record.phoneNumber}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="addressLine1"
            label="Address Line"
            value={record.address?.addressLine1}
            multiline
            rows={4}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="city"
            label="City"
            value={record.address?.city}
            inputProps={{ readOnly: true }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Controls.Button
              text="Change password"
              variant="contained"
              color="primary"
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </Grid>
      </Grid>
      <ChangePassword open={open} setOpen={setOpen} />
    </>
  );
}
