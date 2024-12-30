import React, { useState, useEffect } from "react";
import LineChart from "./lineChart";
import PieChart from "./pieChart";

function adminHome() {
  const [userCount, setUserCount] = useState(null);
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
      setUserCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="p-3 bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-currency-dollar fs-1 text-success"></i>
              <div>
                <span>Earning</span>
                <h2>234</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-people fs-1 text-primary"></i>
              <div>
                <span>Users</span>
                <h2>{userCount}</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-graph-up-arrow fs-1 text-warning"></i>
              <div>
                <span>Increase</span>
                <h2>20%</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-pencil fs-1 text-danger"></i>
              <div>
                <span>Posts</span>
                <h2>5</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-12 col-md-8 p-3">
            <LineChart />
          </div>
          <div className="col-12 col-md-4 p-3">
            <PieChart />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default adminHome;
