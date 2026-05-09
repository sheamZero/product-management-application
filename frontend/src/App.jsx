import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main>
      <Navbar />

      <Outlet />
    </main>
  );
};

export default App;