import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeDetails,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDepartment } from "../services/DepartmentService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDeaprtments] = useState([]);

  useEffect(() => {
    getAllDepartment()
      .then((response) => {
        setDeaprtments(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  //for validation of form input
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleSaveOrUpdate(e) {
    e.preventDefault(); //disables the default values from submitting
    if (validationForm()) {
      const emp = {
        firstname: firstName,
        lastname: lastName,
        email,
        dept_id: departmentId,
      };
      console.log(emp);

      if (id) {
        updateEmployee(id, emp)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => console.error(error));
      } else {
        createEmployee(emp)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validationForm() {
    let valid = true;

    const copyError = { ...errors };
    if (firstName.trim()) {
      copyError.firstName = "";
    } else {
      copyError.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      copyError.lastName = "";
    } else {
      copyError.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      copyError.email = "";
    } else {
      copyError.email = "Email Id is required";
      valid = false;
    }

    if (departmentId) {
      copyError.department = "";
    } else {
      copyError.department = "Select Department";
      valid = false;
    }

    setErrors(copyError);

    return valid;
  }

  //dynamically update the page title
  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  //To get the existing data fro update table fields
  useEffect(() => {
    if (id) {
      getEmployeeDetails(id)
        .then((response) => {
          console.log(response.data);
          setFirstName(response.data.firstname);
          setLastName(response.data.lastname);
          setEmail(response.data.email);
          setDepartmentId(response.data.dept_id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="div-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstname"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={handleFirstName}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastname"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={handleLastName}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email Id:</label>
                <input
                  type="email"
                  placeholder="Enter Email Id"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Select Department</label>
                <select
                  className={`form-control ${
                    errors.department ? "is-invalid" : ""
                  }`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="Select Department">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback"> {errors.department}</div>
                )}
              </div>

              <button className="btn btn-success" onClick={handleSaveOrUpdate}>
                Save Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
