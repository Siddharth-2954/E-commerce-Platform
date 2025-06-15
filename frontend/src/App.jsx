import React from "react";
import { HashRouter, HashRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
