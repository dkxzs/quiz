import ModalCreateUser from "./ModalCreatUser.js";
import "./ManagerUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser.js";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser.js";
import ModalDeleteUser from "./ModalDeleteUser.js";
import TableUserPaginate from "./TableUserPaginate.js";

const ManagerUser = (props) => {
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const onClickUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  };

  const onClickDelete = (user) => {
    setShowModalDelete(true);
    setDataDelete(user);
  };

  const resetData = () => {
    setDataUpdate({});
  };

  useEffect(() => {
    // fetchAllUser();
    fetchAllUserWithPaging(1);
  }, []);

  const fetchAllUser = async () => {
    const response = await getAllUser();
    setListUsers(response.DT || []);
  };

  const fetchAllUserWithPaging = async (page) => {
    const response = await getUserWithPaginate(page, LIMIT_USER);
    if (response.EC === 0) {
      console.log(response.DT);
      setListUsers(response.DT.users || []);
      setPageCount(response.DT.totalPages);
    }
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
          {/* <TableUser
            listUsers={listUsers}
            onClickUpdate={onClickUpdate}
            onClickDelete={onClickDelete}
          /> */}

          <TableUserPaginate
            listUsers={listUsers}
            onClickUpdate={onClickUpdate}
            onClickDelete={onClickDelete}
            fetchAllUserWithPaging={fetchAllUserWithPaging}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreate}
          setShow={setShowModalCreate}
          fetchAllUser={fetchAllUser}
          fetchAllUserWithPaging={fetchAllUserWithPaging}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          dataUpdate={dataUpdate}
          fetchAllUser={fetchAllUser}
          resetData={resetData}
          fetchAllUserWithPaging={fetchAllUserWithPaging}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalDeleteUser
          show={showModalDelete}
          setShow={setShowModalDelete}
          dataDelete={dataDelete}
          fetchAllUser={fetchAllUser}
          fetchAllUserWithPaging={fetchAllUserWithPaging}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManagerUser;
