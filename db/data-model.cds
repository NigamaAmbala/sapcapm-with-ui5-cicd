namespace demo.db;

using { cuid } from '@sap/cds/common';
using {reusable.types as types} from './ReusableTypes';
@assert.unique: {
  email: [email],
  phonenumber: [phonenumber]
}
entity employee:cuid {
    fname : String;
    lname : String;
    age : String;
    dob  : Date;
  email : String;
  phonenumber : Integer;
  department  :  Association to Department;
   address         : Composition of many Address
                     on address.employee = $self;

  salary          : Association to Salary;
  designation     : Association to Designation;
}

entity Department : cuid {
  name        : String;
  description : String;
  headCount   : Integer;
}

entity Address : cuid {
  city     : String;
  address  : String;
  pincode  : Integer;
  street   : String;
  landmark : String;
   employee : Association to employee;
}

entity Salary : cuid {
  costToCompany : types.Amount;
  employeePf    : types.Amount;
  employerPf    : types.Amount;
  nps           : types.Amount;
  vpf           : types.Amount;
}

entity Designation : cuid {
  name        : String;
  description : String;
  level       : String;
}