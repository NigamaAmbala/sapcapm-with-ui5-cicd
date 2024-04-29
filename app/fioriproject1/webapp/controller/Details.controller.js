sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.fioriproject1.controller.Details", {
        onInit: function() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.EmployeeDetails, this); 
        },

        // EmployeeDetails: function(oEvent ){
        //     const {empId} = oEvent.getParameter("arguments");
        //     const sRouterName = oEvent.getParameter("name");
        //     const oForm = this.getView().byId("idEmployeeDetailsForm"); 

        //     oForm.bindElement(`/employee(${empId})`, {
        //         expand: 'salary,address'
        //     });
        //     debugger;
        // }
           
        EmployeeDetails: function(oEvent ){ 
          const {empId} = oEvent.getParameter("arguments");
          const sRouterName = oEvent.getParameter("name");
          const oObjectPage = this.getView().byId("idEmployeeDetailsObjectPage");

          oObjectPage.bindElement(`/employee(${empId})`, {
              expand: 'salary,address,department'
          });
        }

      });
    }
  );