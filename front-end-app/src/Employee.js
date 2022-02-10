import React, { Component } from "react";

import { variables } from "./Variables";

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      employees: [],
      modalTitle: "",
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png",
      PhotoPath: variables.PHOTO_URL,
    };
  }

  refreshList() {
    fetch(variables.API_URL + "employee")
      .then((response) => response.json())
      .then((emp) => {
        this.setState({ employees: emp });
      });

    fetch(variables.API_URL + "department")
      .then((response) => response.json())
      .then((dept) => {
        this.setState({ departments: dept });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeEmployeeName = (e) => {
    this.setState({ EmployeeName: e.target.value });
  };

  changeDepartment = (e) => {
    this.setState({ Department: e.target.value });
  };

  changeDateOfJoining = (e) => {
    this.setState({ DateOfJoining: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Employee",
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png",
    });
  }

  editClick(emp) {
    this.setState({
      modalTitle: "Edit Employee",
      EmployeeId: emp.EmployeeId,
      EmployeeName: emp.EmployeeName,
      Department: emp.Department,
      DateOfJoining: emp.DateOfJoining,
      PhotoFileName: emp.PhotoFileName,
    });
  }

  createClick() {
    fetch(variables.API_URL + "employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeName: this.state.EmployeeName,
        Department: this.state.Department,
        DateOfJoining: this.state.DateOfJoining,
        PhotoFileName: this.state.PhotoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + "employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: this.state.EmployeeId,
        EmployeeName: this.state.EmployeeName,
        Department: this.state.Department,
        DateOfJoining: this.state.DateOfJoining,
        PhotoFileName: this.state.PhotoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure you want to delete ?")) {
      fetch(variables.API_URL + "employee/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  imageUpload = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("file", e.target.files[0],e.target.files[0].name)

      fetch(variables.API_URL+'employee/savefile', {
          method:'POST',
          body: formData
      })
      .then(resp => resp.json())
      .then(data => {
          this.setState({PhotoFileName: data})
      })
  }

  render() {
    const {
      departments,
      employees,
      modalTitle,
      EmployeeId,
      EmployeeName,
      Department,
      DateOfJoining,
      PhotoFileName,
      PhotoPath,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Employee
        </button>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.EmployeeId}>
                <td>{emp.EmployeeId}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.DateOfJoining}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(emp.EmployeeId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tab-index="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 w-50 bd-highlight">
                        <div className="input-group mb-3">
                        <span className="input-group-text">Employee Name</span>
                        <input
                            type="text"
                            className="form-control"
                            value={EmployeeName}
                            onChange={this.changeEmployeeName}
                        />
                        </div>

                        <div className="input-group mb-3">
                        <span className="input-group-text">Department</span>
                        <input
                            type="date"
                            className="form-control"
                            value={DateOfJoining}
                            onChange={this.changeDateOfJoining}
                        />
                        </div>

                        <div className="input-group mb-3">
                        <span className="input-group-text">Date of Joining</span>
                        <select className="form-select" onChange={this.changeDepartment} value={Department}>
                            {
                                departments.map(dept => <option key={dept.DepartmentId}>{dept.DepartmentName}</option>)
                            }
                        </select>
                        </div>
                    </div>

                    <div className="p-2 w-50 bd-highlight">
                        <img width="250px" height="250px" src={PhotoPath+PhotoFileName} alt="profile.jpg"/>
                        <input className="m-2" type="file" onChange={this.imageUpload}/>
                    </div>

                    
                </div>
                {EmployeeId === 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.createClick()}
                    >
                      Create
                    </button>
                  ) : null}

                  {EmployeeId !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.updateClick()}
                    >
                      Update
                    </button>
                  ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
