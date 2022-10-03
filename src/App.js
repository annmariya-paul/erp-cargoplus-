import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Sidebar from "./components/Sidebar/sidebar"
import Layout from "./layouts/layout";
import Lead from "./pages/lead/lead";
import LeadList from "./pages/lead_list/lead_list";
import Dashboard from "./pages/dashboard/dashboard";
// import Lead from "./pages/lead/lead";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.Layout} element={<Layout />}>
            <Route path={ROUTES.SIDEBAR} element={<Sidebar />} />
            <Route index element={<Lead />} />
            <Route path={ROUTES.LEADLIST} element={<LeadList />} />
            <Route path={ROUTES.LEAD} element={<Lead />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
