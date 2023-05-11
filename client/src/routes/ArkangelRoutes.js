import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

//Pages
import Home from "../components/Home/Home";
import Login from "../pages/Login/Login";
import Patient from "../components/Patient/Patient";
import EditPatient from "../components/Patient/EditPatient";
import Doctor from "../components/Doctor/Doctor";
import EditDoctor from "../components/Doctor/EditDoctor";
import Appointment from "../components/Appointment/Appointment";
import EditAppointment from "../components/Appointment/EditAppointment";
import Billing from "../components/Billing/Billing";
import EditBilling from "../components/Billing/EditBilling";

const EchelonRoutes = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/patient"} element={<Patient />} />
        <Route path={"/patient/update/:id"} element={<EditPatient />} />
        <Route path={"/doctor"} element={<Doctor />} />
        <Route path={"/doctor/update/:id"} element={<EditDoctor />} />
        <Route path={"/appointment"} element={<Appointment />} />
        <Route path={"/appointment/update/:id"} element={<EditAppointment />} />
        <Route path={"/billing"} element={<Billing />} />
        <Route path={"/billing/update/:id"} element={<EditBilling />} />
      </Routes>
    </>
  );
};

export default EchelonRoutes;
