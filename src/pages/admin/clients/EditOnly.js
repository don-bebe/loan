import React, { useEffect } from "react";
import { useClientsForm, Form } from "../../../utils/useClientsForm";
import Grid from "@mui/material/Grid2";
import Controls from "../../../components/Controls";

const individual = {
  firstName: "",
  lastName: "",
  ID_number: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  emailAddress: "",
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
  },
  isApproved: false,
};

const business = {
  businessName: "",
  registrationNumber: "",
  companyPhone: "",
  contactPerson: "",
  emailAddress: "",
  phoneNumber: "",
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
  },
  isApproved: false,
};

export default function EditOnly(props) {
  const { isIndividual, recordForEdit, submitForm } = props;

  const initialFValues = isIndividual ? individual : business;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("emailAddress" in fieldValues)
      temp.emailAddress = fieldValues.emailAddress ? "" : "Email is required.";
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber = fieldValues.phoneNumber
        ? ""
        : "Phone number is required.";
    if ("addressLine1" in fieldValues)
      temp.addressLine1 = fieldValues.addressLine1 ? "" : "Address is required";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "City is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useClientsForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      submitForm(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
        address: {
          addressLine1: recordForEdit.address?.addressLine1 || "",
          addressLine2: recordForEdit.address?.addressLine2 || "",
          city: recordForEdit.address?.city || "",
          country: recordForEdit.address?.country || "",
        },
      });
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        {isIndividual ? (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                label="First name"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="ID number"
                name="ID_number"
                type="text"
                value={values.ID_number}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                label="Last name"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Gender"
                name="gender"
                type="text"
                value={values.gender}
                onChange={handleInputChange}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                label="Company name"
                name="businessName"
                type="text"
                value={values.businessName}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Company phone(tel)"
                name="companyPhone"
                type="tel"
                value={values.companyPhone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controls.Input
                label="Registration number"
                name="registrationNumber"
                type="text"
                value={values.registrationNumber}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Contact Person name"
                name="contactPerson"
                type="text"
                value={values.contactPerson}
                onChange={handleInputChange}
              />
            </Grid>
          </>
        )}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controls.Input
            label="Email Address"
            name="emailAddress"
            type="email"
            value={values.emailAddress}
            onChange={handleInputChange}
            error={errors.emailAddress}
          />
          <Controls.Input
            label="City"
            name="address.city"
            type="text"
            value={values.address?.city}
            onChange={handleInputChange}
            error={errors.city}
          />
          <Controls.Input
            label="Address line"
            name="address.addressLine1"
            type="text"
            value={values.address?.addressLine1}
            onChange={handleInputChange}
            error={errors.addressLine1}
            multiline
            rows={3}
          />
          <Controls.Checkbox
            name="isApproved"
            value={values.isApproved}
            label="isApproved"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controls.PhoneNumberInput
            label="Phone number"
            name="phoneNumber"
            id="phoneNumber"
            enableSearch={true}
            value={values.phoneNumber}
            onChange={(e) =>
              handleInputChange({ target: { value: e, name: "phoneNumber" } })
            }
            inputProps={{
              required: true,
            }}
          />
          <Controls.Input
            label="Country"
            name="address.country"
            type="text"
            value={values.address?.country}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Address line (optional)"
            name="address.addressLine2"
            type="text"
            value={values.address?.addressLine2}
            onChange={handleInputChange}
            error={errors.addressLine2}
            multiline
            rows={3}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
