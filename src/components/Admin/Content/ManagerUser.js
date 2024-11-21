import ModalCreateUser from "./ModalCreatUser.js";
import "./ManagerUser.scss";

const ManagerUser = (props) => {
  return (
    <div className="manager-user-container">
      <div className="title">Manager User</div>
      <div className="users-content">
        <div>
          <button>Add new user</button>
        </div>
        <div className="">table users</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManagerUser;
