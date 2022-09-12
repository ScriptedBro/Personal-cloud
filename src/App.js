import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import PrivateRoute from "./components/utils/PrivateRoute";
import Profile from "./components/auth/Profile";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/folder/:folderId"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default App;
