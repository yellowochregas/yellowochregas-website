import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "@/components/AppShell";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";
import AssistantPage from "@/pages/AssistantPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import AreaPage from "@/pages/AreaPage";
import CustomerDashboard from "@/pages/CustomerDashboard";
import EngineerDashboard from "@/pages/EngineerDashboard";
import QuotePage from "@/pages/QuotePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/assistant/:issueId" element={<AssistantPage />} />
          <Route path="/confirmation/:publicId" element={<ConfirmationPage />} />
          <Route path="/areas/:slug" element={<AreaPage />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/engineer" element={<EngineerDashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/strategy" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
