sap.ui.define(["./BaseController","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("com.app.fioriproject1.controller.Details",{onInit:function(){const e=this.getRouter();e.attachRoutePatternMatched(this.EmployeeDetails,this)},EmployeeDetails:function(e){const{empId:t}=e.getParameter("arguments");this.ID=t;const o=e.getParameter("name");const a=this.getView().byId("idEmployeeDetailsObjectPage");a.bindElement(`/employee(${t})`,{expand:"salary,address,department"})},onDeleteEmployee:async function(){const e=this.getView().getModel("ModelV2");try{await this.deleteData(e,"/employee",this.ID);this.getRouter().navTo("Routehome")}catch(e){t.error("Some Technical Issue")}}})});