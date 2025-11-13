import React from "react";
import { Route, Router } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Router>
  );
};

export default MainRoutes;
