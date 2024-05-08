import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  fetchDeatils,
  updateDepartment,
} from "../services/DepartmentService";

const DepartmentComponent = () => {
  const [deptName, setDeptName] = useState("");
  const [deptDetails, setDeptDetails] = useState("");

  const [errors, setErrors] = useState({
    deptName: "",
    deptDetails: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  function validateInputs() {
    let valid = true;
    const copyError = { ...errors };
    if (deptName.trim()) {
      copyError.deptName = "";
    } else {
      copyError.deptName = "Deparmtent Name is required";
      valid = false;
    }
    if (deptDetails.trim()) {
      copyError.deptDetails = "";
    } else {
      copyError.deptDetails = "Department Details is required";
      valid = false;
    }
    setErrors(copyError);
    return valid;
  }
  function handleSaveOrUpdate(e) {
    e.preventDefault();
    if (validateInputs()) {
      const dept = { departmentName: deptName, departmentDetails: deptDetails };
      if (id) {
        updateDepartment(id, dept)
          .then((response) => {
            console.log(response);
            navigate("/department");
          })
          .catch((error) => console.error(error));
      } else {
        createDepartment(dept)
          .then((response) => {
            console.log(response.data);
            navigate("/department");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }
  useEffect(() => {
    if (id) {
      fetchDeatils(id).then((response) => {
        setDeptName(response.data.departmentName);
        setDeptDetails(response.data.departmentDetails);
      });
    }
  }, [id]);

  function handleDeptName(e) {
    setDeptName(e.target.value);
  }

  function handleDeptDetails(e) {
    setDeptDetails(e.target.value);
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}

          <div className="div-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="deptName"
                  value={deptName}
                  className={`form-control ${
                    errors.deptName ? "is-invalid" : ""
                  }`}
                  onChange={handleDeptName}
                ></input>
                {errors.deptName && (
                  <div className="invalid-feedback"> {errors.deptName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Deparement Details:</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="deptDetals"
                  value={deptDetails}
                  className={`form-control ${
                    errors.deptDetails ? "is-invalid" : ""
                  }`}
                  onChange={handleDeptDetails}
                ></input>
                {errors.deptDetails && (
                  <div className="invalid-feedback"> {errors.deptDetails}</div>
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

export default DepartmentComponent;
