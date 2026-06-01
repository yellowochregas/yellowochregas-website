import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "@/components/AppShell";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";
import AssistantPage from "@/pages/AssistantPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import AreaPage from "@/pages/AreaPage";
import CustomerDashboard from "@/pages/CustomerDashboard";
import EngineerDashboard from "@/pages/EngineerDashboard";
import LoginPage from "@/pages/LoginPage";
import QuotePage from "@/pages/QuotePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/login/:role?" element={<LoginPage />} />
            <Route path="/assistant/:issueId" element={<AssistantPage />} />
            <Route path="/confirmation/:publicId" element={<ConfirmationPage />} />
            <Route path="/areas/:slug" element={<AreaPage />} />
            <Route path="/customer" element={<ProtectedRoute roles={["CUSTOMER"]}><CustomerDashboard /></ProtectedRoute>} />
            <Route path="/engineer" element={<ProtectedRoute roles={["ENGINEER"]}><EngineerDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute roles={["ADMIN"]}><AdminPage /></ProtectedRoute>} />
            <Route path="/strategy" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
