import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === "/login" || location.pathname === "/register";

  console.log(isLoginPath)

  return (
    <main>
      {!isLoginPath && <Navbar />}

      <Outlet />
    </main>
  );
};

export default App;