import React, { useState, useEffect } from "react";
import PageHeader from "../../utils/PageHeader";
import {
  BarChartRounded,
  GroupWork,
  HomeTwoTone,
  LocalActivity,
  Store,
} from "@mui/icons-material";
import { AllLoanCount } from "../../functions/loanApplySlice";
import Grid from "@mui/material/Grid2";
import NoteCard from "../../utils/NoteCard";
import BarChart from "../../charts/BarChart";
import PieChart from "../../charts/PieChart";
import { ClientsCount } from "../../functions/clientsSlice";
import { PackagesCount } from "../../functions/loanPackageSlice";
import WeeklyLineChart from "../../charts/WeeklyLineChart";
import MonthlyLineChart from "../../charts/MonthlyLineChart";

export default function AdminDashboard() {
  const [loanCount, setLoanCount] = useState([]);
  const [clients, setClients] = useState([]);
  const [packages, setPackages] = useState([]);

  async function fetchPackageCount() {
    try {
      const count = await PackagesCount();
      setPackages(count);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchClientsCount() {
    try {
      const response = await ClientsCount();
      setClients(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLoanCount() {
    try {
      const count = await AllLoanCount();
      setLoanCount(count);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPackageCount();
    fetchClientsCount();
    fetchLoanCount();
  }, []);

  return (
    <>
      <PageHeader
        title="MicroLend | Home"
        subTitle="Loan Officer Dashboard"
        icon={<HomeTwoTone fontSize="large" />}
      />
      <Grid container spacing={4} sx={{ margin: 2 }}>
        <Grid size={{ xs: 6, md: 3, lg: 3 }}>
          <NoteCard
            title="Total Loans"
            icon={<LocalActivity fontSize="large" color="primary" />}
            details={loanCount}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3, lg: 3 }}>
          <NoteCard
            title="Packages"
            icon={<Store fontSize="large" color="primary" />}
            details={packages}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3, lg: 3 }}>
          <NoteCard
            title="Clients"
            icon={<GroupWork fontSize="large" color="primary" />}
            details={clients}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3, lg: 3 }}>
          <NoteCard
            title="Timeline"
            icon={<BarChartRounded fontSize="large" color="primary" />}
            details={0}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <PieChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <BarChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MonthlyLineChart />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <WeeklyLineChart />
        </Grid>
      </Grid>
    </>
  );
}
