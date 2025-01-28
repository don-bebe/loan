import React, { useEffect, useState } from "react";
import { Provider } from "../../utils/MultiFormContext";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ClientType from "./ClientType";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import SignUp from "./SignUp";
import StepperIcon from "./StepperIcon";
import { styled } from "@mui/material/styles";
import PageHeader from "../../utils/PageHeader";
import { AddBusiness } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateBusinessClient,
  CreateIndividualClient,
  reset,
} from "../../functions/clientsSlice";
import Loading from "../../utils/Loading";
import Notification from "../../utils/Notification";

const StyledStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0, 5),
}));

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <ClientType />;

    case 1:
      return <PersonalInfo />;

    case 2:
      return <AddressInfo />;
    case 3:
      return <SignUp />;

    default:
      throw new Error("Unknown step");
  }
};

const RegistrationForm = () => {
  const { clients, isSuccess, isError, message } = useSelector(
    (state) => state.clients
  );
  const [activeStep, setActiveStep] = useState(0);
  const [isIndividual, setIsIndividual] = useState(false);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [ID_number, setID] = useState("");
  const [dateOfBirth, setDOB] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [businessName, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [registrationNumber, setRegNum] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [addressLine1, setAddress] = useState("");
  const [addressLine2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    if (isIndividual) {
      setTitle("Fill in your Personal Information");
    } else {
      setTitle("Fill in Organisation and Contact Person Details");
    }
  }, [isIndividual]);

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

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    dispatch(reset());
  }, [clients, dispatch, isError, isSuccess, message, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const individual_details = {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      ID_number,
      emailAddress,
      phoneNumber,
      password,
      confirmPassword,
      city,
      country,
      addressLine1,
      addressLine2,
    };

    const business_details = {
      businessName,
      registrationNumber,
      companyPhone,
      contactPerson,
      emailAddress,
      phoneNumber,
      password,
      confirmPassword,
      city,
      country,
      addressLine1,
      addressLine2,
    };
    setLoading(true);
    if (isIndividual) {
      dispatch(CreateIndividualClient(individual_details));
    } else {
      dispatch(CreateBusinessClient(business_details));
    }
  };
  return (
    <>
      <Provider
        value={{
          handleBack,
          handleNext,
          setIsIndividual,
          isIndividual,
          title,
          firstName,
          setFirstName,
          lastName,
          setLastName,
          setDOB,
          dateOfBirth,
          emailAddress,
          setEmail,
          gender,
          setGender,
          ID_number,
          setID,
          businessName,
          setName,
          contactPerson,
          setContactPerson,
          registrationNumber,
          setRegNum,
          phoneNumber,
          setPhone,
          companyPhone,
          setCompanyPhone,
          addressLine1,
          setAddress,
          city,
          setCity,
          country,
          setCountry,
          addressLine2,
          setAddress2,
          password,
          setPassword,
          confirmPassword,
          setConfirmPassword,
          handleSubmit,
        }}
      >
        <PageHeader
          title="MicroLend | Registration Form"
          subTitle="Complete all the steps to register successfully"
          icon={<AddBusiness fontSize="large" />}
        />
        <StyledStepper activeStep={activeStep} alternativeLabel>
          {[0, 1, 2, 3].map((step) => (
            <Step key={step}>
              <StepLabel StepIconComponent={StepperIcon}>
                Step {step + 1}
              </StepLabel>
            </Step>
          ))}
        </StyledStepper>
        <main>{renderStep(activeStep)}</main>
      </Provider>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default RegistrationForm;
