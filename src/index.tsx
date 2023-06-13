import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ErrorBoundary from "./Componenets/ErrorBoundary";
import LoginPage from "./Componenets/LoginPage";
import DashboardPage from "./Componenets/Dashboard";
import PrivateRoute from "./Componenets/PrivateRoute";
import { createRoot } from "react-dom/client";
import SignupPage from "./Componenets/SignupPage";
import "./styles.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <ErrorBoundary>
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
    </Router>
  </ErrorBoundary>
);
