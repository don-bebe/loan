import React, { useState, useEffect } from "react";
import NoteCard from "../../utils/NoteCard";
import Grid from "@mui/material/Grid2";
import {
  AttachMoney,
  CreditScore,
  HomeTwoTone,
  Info,
  LocalAtm,
} from "@mui/icons-material";
import PageHeader from "../../utils/PageHeader";
import Title from "../../utils/Title";
import PackageCard from "../../utils/PackageCard";
import { AllLoanPackagesActive } from "../../functions/loanPackageSlice";
import { useSelector } from "react-redux";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyCreditScore } from "../../functions/creditScoreSlice";
import ApplyLoan from "./loans/ApplyLoan";
import Notification from "../../utils/Notification";
import AuthClient from "../../auth/AuthClient";
import { MyLoanCount } from "../../functions/loanApplySlice";
import { PaymentBalance } from "../../functions/paymentSlice";

const carouselStyle = {
  position: "relative",
  height: "400px",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px",
  textAlign: "center",
};

export default function ClientDashboard() {
  const { borrower } = useSelector((state) => state.clientAuth);
  const [packages, setPackages] = useState([]);
  const [myScore, setMyScore] = useState([]);
  const [loanCount, setLoanCount] = useState([]);
  const [balance, setBalance] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    async function getPackagesData() {
      try {
        const response = await AllLoanPackagesActive();
        setPackages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
      }
    }
    getPackagesData();
  }, []);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const [lnc, my, bal,] = await Promise.all([
          MyCreditScore(),
          MyLoanCount(),
          PaymentBalance()
        ]);
        setMyScore(lnc);
        setLoanCount(my);
        setBalance(bal);
        
      }catch(error){
        console.log(error);
      }
    }

    if(borrower) fetchData();
  },[borrower])


  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setOpen(true);
  };
  const carouselImages = ["/0.png", "/2.jpg", "/3.png", "/3.jpg"];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleOpenLogin = () => {
    setNotify({
      open: true,
      severity: "error",
      message: "Please login to apply for loan",
    });
    setOpenLogin(true);
  };

  return (
    <>
      {borrower ? (
        <>
          <PageHeader
            title="MicroLend | Home"
            subTitle="Client Dashboard"
            icon={<HomeTwoTone fontSize="large" />}
          />
          <Grid container spacing={3} sx={{ margin: 2 }}>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <NoteCard
                title="My Credit Score"
                icon={<CreditScore fontSize="large" color="primary" />}
                details={myScore || 0}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <NoteCard
                title="Total Loans"
                icon={<LocalAtm fontSize="large" color="primary" />}
                details={loanCount || 0}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <NoteCard
                title="Balance"
                icon={<AttachMoney fontSize="large" color="primary" />}
                details={parseFloat(balance).toFixed(2) || 0}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <div style={carouselStyle}>
            <Carousel
              {...settings}
              autoplay={true}
              autoplaySpeed={3000}
              arrows={false}
            >
              {carouselImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`carousel-image-${index}`}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Carousel>

            <div style={overlayStyle}>
              <Title>Welcome to MicroLend</Title>
              <p>
                This is a <strong>Digital Lending</strong> platform for
                Microfinance Institutions in Zimbabwe.
              </p>
              <p>
                <strong>Unlock</strong> the power of microfinance! MicroLend is
                your partner in empowering financial inclusion for all
                Zimbabweans.
              </p>
              <p>
                Say goodbye to lengthy loan processes! MicroLend makes access to
                finance easy, fast and convenient for all.
              </p>
              <p>
                Join the microfinance revolution. MicroLend is transforming the
                way microfinance institutions operate, making financial services
                more accessible and efficient.
              </p>
            </div>
          </div>
        </>
      )}
      <Title>Loan Packages</Title>
      <Grid container spacing={3} sx={{ marginLeft: 2, marginRight: 2 }}>
        {packages.map((pkg) => (
          <Grid key={pkg.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <PackageCard
              icon={<Info />}
              values={pkg}
              handleClick={
                borrower ? () => handlePackageClick(pkg) : handleOpenLogin
              }
            />
          </Grid>
        ))}
      </Grid>
      <ApplyLoan
        open={open}
        setOpen={setOpen}
        selectedPackage={selectedPackage}
        packages={packages}
        setSelectedPackage={setSelectedPackage}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <AuthClient openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </>
  );
}
