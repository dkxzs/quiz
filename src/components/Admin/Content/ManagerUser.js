import ModalCreateUser from "./ModalCreatUser.js";
import "./ManagerUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManagerUser = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="manager-user-container">
      <div className="title">Manager User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <FcPlus />
            Add new user
          </button>
        </div>
        <div className="table-users">table users</div>
        <ModalCreateUser show={showModal} setShow={setShowModal} />
      </div>
    </div>
  );
};

export default ManagerUser;
