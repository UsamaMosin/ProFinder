import React, { useState, useEffect } from "react";
import AdminSidebar from "./adminSidebar";
import NavBar from "./adminNavbar";

function adminUser() {
  const [usersData, setUsersData] = useState(null);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getAllUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    // Logic to reject the connection request
    try {
      const res = await fetch(`http://localhost:3001/deleteUser/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        getAllUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex">
        <div className="w-auto">
          <AdminSidebar />
        </div>
        <div className="col overflow auto">
          <NavBar />
          <div className="p-5 bg-light">
            <div className="bg-white rounded p-4">
              <caption className="text-black fs-4">Users</caption>
              <table className="table caption-top">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData &&
                    usersData.map((user, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            style={{
                              backgroundColor: "#D4403A",
                              color: "white",
                            }}
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default adminUser;
