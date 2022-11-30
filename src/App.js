import "./App.css";
import Home from "./container/home";
import { ApplicationContextProvider } from "./context/applicationContext";
import AppRoutes from "./routes/app-routes";

function App() {
  return (
    <ApplicationContextProvider>
      <AppRoutes />
    </ApplicationContextProvider>
  );
}

export default App;
