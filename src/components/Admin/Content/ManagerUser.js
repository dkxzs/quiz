import ModalCreateUser from "./ModalCreatUser.js";
import "./ManagerUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser.js";
import { useEffect } from "react";
import { getAllUser } from "../../../services/apiServices";

const ManagerUser = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    const response = await getAllUser();
    console.log(response.DT);
    setListUsers(response.DT || []);
  };

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
        <div className="table-users">
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={showModal}
          setShow={setShowModal}
          fetchAllUser={fetchAllUser}
        />
      </div>
    </div>
  );
};

export default ManagerUser;
