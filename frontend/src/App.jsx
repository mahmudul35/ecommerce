import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 min-h-[calc(100vh-6rem)]">
        <Outlet />
      </main>
    </>
  );
};

export default App;
