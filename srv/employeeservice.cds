using { demo.db as my} from '../db/data-model';
@path: '/EmployeeSRV'
service employeeService {
entity employee as projection on my.employee;
entity Department  as projection on my.Department;
entity Address     as projection on my.Address;
entity Salary      as projection on my.Salary;
entity Designation as projection on my.Designation;

}