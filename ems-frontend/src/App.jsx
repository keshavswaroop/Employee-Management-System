import "./App.css";
import DepartmentComponent from "./components/DepartmentComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* base url */}
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          {/* if someone calles http"//localhost:3000/api/employees: */}
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          <Route path="/addEmployee" element={<EmployeeComponent />}></Route>
          <Route
            path="/updateEmployee/:id"
            element={<EmployeeComponent />}
          ></Route>
          <Route
            path="/department"
            element={<ListDepartmentComponent />}
          ></Route>

          <Route
            path="/addDepartment"
            element={<DepartmentComponent />}
          ></Route>

          <Route
            path="/updateDepartment/:id"
            element={<DepartmentComponent />}
          ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
