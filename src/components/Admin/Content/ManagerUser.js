import ModalCreateUser from "./ModalCreatUser.js";
import "./ManagerUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser.js";
import { getAllUser } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser.js";

const ManagerUser = (props) => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});

  const onClickUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  };

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
            onClick={() => setShowModalCreate(true)}
          >
            <FcPlus />
            Add new user
          </button>
        </div>
        <div className="table-users">
          <TableUser listUsers={listUsers} onClickUpdate={onClickUpdate} />
        </div>
        <ModalCreateUser
          show={showModalCreate}
          setShow={setShowModalCreate}
          fetchAllUser={fetchAllUser}
        />
        <ModalUpdateUser
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          dataUpdate={dataUpdate}
        />
      </div>
    </div>
  );
};

export default ManagerUser;
