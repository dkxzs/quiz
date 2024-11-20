import ModalCreateUser from "./ModalCreatUser.js";


const ManagerUser = (props) => {
  return (
    <div className="manager-user-container">
      <div className="title">Manager User</div>
      <div className="users-content">
        <div>
          <button>Add new user</button>
          <ModalCreateUser />
        </div>
        <div className="">table users</div>
      </div>
    </div>
  );
};

export default ManagerUser;
