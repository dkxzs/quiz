import { useEffect, useState } from "react";
const TableUser = (props) => {
  const { listUsers, onClickUpdate } = props;

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className="text-center">
                    <button className="btn btn-primary">View</button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => onClickUpdate(item)}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUsers.length === 0 && (
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
