import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AauthContext.jsx";
import { ProjectProvider } from "./contexts/ProjectContext.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
import { TeamProvider } from "./contexts/TeamContext.jsx";
import { TagProvider } from "./contexts/TagContext.jsx";
import { OwnerProvider } from "./contexts/OwnersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <TeamProvider>
            <TagProvider>
              <OwnerProvider>
                <App />
              </OwnerProvider>
            </TagProvider>
          </TeamProvider>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  </StrictMode>
);
