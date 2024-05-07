sap.ui.define(
  [
      "./BaseController",
      "sap/m/MessageBox"
  ],
  function(BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("com.app.fioriproject1.controller.Details", {
      onInit: function() {
          const oRouter = this.getRouter();
          oRouter.attachRoutePatternMatched(this.EmployeeDetails, this); 
      },
      EmployeeDetails: function(oEvent ){ 
        const {empId} = oEvent.getParameter("arguments");
        this.ID = empId;
        const sRouterName = oEvent.getParameter("name");
        const oObjectPage = this.getView().byId("idEmployeeDetailsObjectPage");

        oObjectPage.bindElement(`/employee(${empId})`, {
            expand: 'salary,address,department'
        });
      },
      onDeleteEmployee: async function(){
        const oModel = this.getView().getModel("ModelV2");
       
        try {
          await this.deleteData(oModel, "/employee", this.ID);
          this.getRouter().navTo("Routehome");
        } catch (error) {
          MessageBox.error("Some Technical Issue");
        }
    }
    });
  }
);