import { useEffect, useState } from "react";
import {
  deleteDepartment,
  getAllDepartment,
} from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  //   const dummyData = [
  //     {
  //       id: 1,
  //       departmentName: "TDC",
  //       departmentDetails: "Transformation Devops and Cloud",
  //     },
  //     {
  //       id: 2,
  //       departmentName: "CD",
  //       departmentDetails: "Core Development",
  //     },
  //   ];

  const [dept, setDept] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentDetails();
  }, []);

  function getDepartmentDetails() {
    getAllDepartment()
      .then((response) => {
        setDept(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAdd() {
    navigate("/addDepartment");
  }

  function handleUpdate(id) {
    navigate(`/updateDepartment/${id}`);
  }

  function handleDelete(id) {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        getDepartmentDetails();
      })
      .catch((error) => console.error(error));
  }
  return (
    <div className="container">
      <h2 className="text-center">Department Details</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Department Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dept.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.departmentName}</td>
              <td>{dept.departmentDetails}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleUpdate(dept.id)}
                >
                  Update
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={() => handleDelete(dept.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleAdd}>
        Add Department
      </button>
    </div>
  );
};

export default ListDepartmentComponent;
