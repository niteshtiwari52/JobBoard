import React, { useEffect, useState } from "react";
import HomeLayout from "../layouts/Homepage.layout";
import Landingcomponent from "../components/LandingPageComponent/Landing.component";
import Dashboardcomponent from "../components/DashboardComponent/Dashboard.component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const user = useSelector((globalState) => globalState.user.selfUser);

  useEffect(() => {
    if (user && user.success && user.company) {
      setIsUserLoggedIn(true);
      navigate("/");
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  return <>{isUserLoggedIn ? <Dashboardcomponent /> : <Landingcomponent />}</>;
};

export default HomeLayout(Homepage);
