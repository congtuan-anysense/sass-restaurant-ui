import Header from "components/layouts/Header";
import NavigationBar from "components/layouts/NavigationBar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "router/Router";
import { getAccessToken } from "services/utils/auth";
import { authModuleSelector } from "store/modules/authModule";

function App() {
  return <Router />;
}

export default App;
