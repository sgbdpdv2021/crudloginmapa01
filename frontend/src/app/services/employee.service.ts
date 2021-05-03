import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Employee } from "../models/employee";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly URL_API = "http://localhost:4000/api/emp";

  constructor(private http: HttpClient) {
    console.log("construyo")
    this.selectedEmployee = new Employee();
  }

  postEmployee(employee: Employee) {
    return this.http.post(this.URL_API, employee);
  }

  getEmployees() {
    const v = this.http.get<Employee[]>(this.URL_API);
    console.log(v)
    return v
  }

  putEmployee(employee: Employee) {
    return this.http.put(this.URL_API + `/${employee._id}`, employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
