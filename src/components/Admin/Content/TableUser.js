import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";
const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    const response = await getAllUser();
    console.log(response.DT);
    setListUser(response.DT || []);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col" className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className="text-center">
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser.length === 0 && (
            <tr>
              <td colSpan={4}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
