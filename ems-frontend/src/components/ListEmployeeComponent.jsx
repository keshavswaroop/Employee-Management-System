import { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  // const data = [
  //   {
  //     id: 1,
  //     firstName: "Swaroop",
  //     lastName: "S",
  //     email: "swas@email.com",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Vishal",
  //     lastName: "B B",
  //     email: "vbb@email.com",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Manoj",
  //     lastName: "M",
  //     email: "man@email.com",
  //   },
  //   {
  //     id: 4,
  //     firstName: "Ram",
  //     lastName: "G",
  //     email: "ram@email.com",
  //   },
  // ];

  const [emp, setEmp] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployeesData();
  }, []);
  function getAllEmployeesData() {
    getAllEmployees()
      .then((response) => {
        setEmp(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function handleAddEmployee() {
    navigate("/addEmployee");
  }

  function updateEmployee(id) {
    navigate(`/updateEmployee/${id}`);
  }

  function handleDelete(id) {
    deleteEmployee(id)
      .then((response) => {
        getAllEmployeesData();
        console.log(response.data);
      })
      .catch((error) => console.errror(error));
  }
  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emp.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstname}</td>
              <td>{emp.lastname}</td>
              <td>{emp.email}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => updateEmployee(emp.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(emp.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-dark"
        onClick={handleAddEmployee}
      >
        Add Employee
      </button>
    </div>
  );
};

export default ListEmployeeComponent;
