import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quotes from "../components/quotes";
import { routes } from "../constants/routes";
import Home from "../container/home";

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={routes.quotes} element={<Quotes />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
