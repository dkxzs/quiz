import { useState } from "react";
import ModalDeleteQuiz from "./ModalDeleteQuiz.js";
import { getAllQuizForAdmin } from "../../../../services/apiServices.js";
import ModalUpdateQuiz from "./ModalUpdateQuiz.js";

const TableQuiz = (props) => {
  const { listQuiz, setListQuiz } = props;
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const handleUpdate = (quiz) => {
    setDataUpdate(quiz);
    setShowModalUpdate(true);
  };

  const resetData = () => {
    setDataUpdate({});
  };

  const handleDelete = (quizId) => {
    setDataDelete(quizId);
    setShowModalDelete(true);
  };

  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  return (
    <>
      <div>List Quizzes: </div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        resetData={resetData}
        fetchAllQuiz={fetchAllQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetchAllQuiz={fetchAllQuiz}
      />
    </>
  );
};

export default TableQuiz;
