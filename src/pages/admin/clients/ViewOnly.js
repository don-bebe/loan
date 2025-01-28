import Grid from "@mui/material/Grid2";
import React from "react";
import Controls from "../../../components/Controls";

export default function ViewOnly(props) {
  const { isIndividual, item } = props;
  return (
    <>
      <Grid container>
        {isIndividual ? (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                name="firstName"
                label="Firstname"
                value={item.firstName}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="ID_number"
                label="ID_number"
                value={item.ID_number}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="gender"
                label="Gender"
                value={item.gender}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                name="lastName"
                label="Lastname"
                value={item.lastName}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="dateOfBirth"
                label="Date of Birth"
                value={item.dateOfBirth}
                inputProps={{ readOnly: true }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                name="businessName"
                label="Company name"
                value={item.businessName}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="companyPhone"
                label="Company Phone(tel)"
                value={item.companyPhone}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                name="registrationNumber"
                label="Registration number"
                value={item.registrationNumber}
                inputProps={{ readOnly: true }}
              />
              <Controls.Input
                name="contactPerson"
                label="Contact Person Name"
                value={item.contactPerson}
                inputProps={{ readOnly: true }}
              />
            </Grid>
          </>
        )}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controls.Input
            name="emailAddress"
            label="Email Address"
            value={item.emailAddress}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="addressLine1"
            label="Address Line"
            value={item.address?.addressLine1}
            multiline
            rows={3}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="city"
            label="City"
            value={item.address?.city}
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controls.Input
            name="phoneNumber"
            label="Phone number"
            value={item.phoneNumber}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="addressLine2"
            label="Address Line"
            value={item.address?.addressLine2}
            multiline
            rows={3}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="country"
            label="Country"
            value={item.address?.country}
            inputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </>
  );
}
