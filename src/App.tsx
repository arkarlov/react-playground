import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./auth/AuthContext";
import { AuthProvider } from "./auth/AuthProvider";
import "./App.css";
import { useMemo } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const { isAuthenticated, logout } = useAuth();

  const navList = useMemo(
    () => [
      { isDisplayed: true, component: <NavLink to="/">Главная</NavLink> },
      {
        isDisplayed: isAuthenticated,
        component: <NavLink to="/dashboard">Кабинет</NavLink>,
      },
      {
        isDisplayed: isAuthenticated,
        component: <button onClick={logout}>Выйти</button>,
      },
      {
        isDisplayed: !isAuthenticated,
        component: <NavLink to="/login">Вход</NavLink>,
      },
    ],
    [isAuthenticated, logout]
  );

  return (
    <nav>
      {navList
        .filter(({ isDisplayed }) => isDisplayed)
        .map(({ component }, i, arr) => (
          <React.Fragment key={i}>
            {component} {i < arr.length - 1 && " | "}
          </React.Fragment>
        ))}
    </nav>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
