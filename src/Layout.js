import { Routes, Route } from "react-router-dom";

import App from "./App";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManagerUser from "./components/Admin/Content/ManagerUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/NotFound/NotFound";
import ManagerQuiz from "./components/Admin/Content/Quiz/ManagerQuiz";
import Questions from "./components/Admin/Content/Question/Questions";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManagerUser />} />
          <Route path="manage-quiz" element={<ManagerQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;
