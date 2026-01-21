import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProjectManagement from "./pages/ProjectManagement";
import TeamManagement from "./pages/TeamManagement";
import Settings from "./pages/Settings";
import NewTask from "./pages/NewTask";
import NewTeam from "./pages/NewTeam";
import Report from "./pages/Report";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Teams from "./pages/Teams";
import NewProject from "./pages/NewProject";
import TaskDetails from "./pages/TaskDetails";
import ProjectView from "./pages/ProjectView";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />

        <Routes>
          <Route element={<AuthLayout />}>
            {" "}
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>

          <Route element={<AppLayout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectManagement />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/projects/:projectId"
              element={
                <ProtectedRoute>
                  <ProjectView />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/teams"
              element={
                <ProtectedRoute>
                  <Teams />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/teams/:teamId"
              element={
                <ProtectedRoute>
                  <TeamManagement />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="tasks/:taskId"
              element={
                <ProtectedRoute>
                  <TaskDetails />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/addtask"
              element={
                <ProtectedRoute>
                  <NewTask />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/addteam"
              element={
                <ProtectedRoute>
                  <NewTeam />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/addproject"
              element={
                <ProtectedRoute>
                  <NewProject />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
