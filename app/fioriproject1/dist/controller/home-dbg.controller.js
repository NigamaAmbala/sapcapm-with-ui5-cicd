sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Token,JSONModel,MessageBox) {
        "use strict";

        return Controller.extend("com.app.fioriproject1.controller.home", {
            onInit: function () {
                var oView = this.getView();
                var oFirstNameFilter = oView.byId("idFNameFilterValue");
                var oLastNameFilter = oView.byId("idLNameFilterValue");
                var  oAgeFilter = oView.byId("iAgeFilterValue");
                var  oEmailFilter = oView.byId("idEmailFilterValue");
                let validate = function (args) {
                    if (true) {
                        var text = args.text;
                        return new Token({key: text, text: text});
                    }
                }
                oFirstNameFilter.addValidator(validate);
                oLastNameFilter.addValidator(validate);
                oAgeFilter.addValidator(validate);
                oEmailFilter.addValidator(validate);

                const oLocalModel = new JSONModel({
                    fname: "",
                    lname: "",
                    age: "",
                    dob: "",
                    gender: "",
                    email: "",
                    phonenumber: ""
                });
                this.getView().setModel(oLocalModel, "localModel");
                this.getRouter().attachRoutePatternMatched(this.onEmployeeListLoad, this);
            },
            onEmployeeListLoad: function () {
                this.getView().byId("idEmployeeTable").getBinding("items").refresh();
            },

            onGoPress: function () {
                const oView = this.getView(),

                    oFirstNameFilter = oView.byId("idFNameFilterValue"),
                    sFirstName = oFirstNameFilter.getTokens(),

                    oLastNameFilter = oView.byId("idLNameFilterValue"),
                    sLastName = oLastNameFilter.getTokens(),

                    oAgeFilter = oView.byId("iAgeFilterValue"),
                    sAge = oAgeFilter.getTokens(),

                    oEmailFilter = oView.byId("idEmailFilterValue"),
                    sEmail = oEmailFilter.getTokens(),

    

                    oTable = oView.byId("idEmployeeTable"),
                    aFilters = [];

                    sFirstName.filter((element) => {
                        element ? aFilters.push(new Filter("fname", FilterOperator.EQ, element.getKey())) : "";
                    })

                    sLastName.filter((element) => {
                        element ? aFilters.push(new Filter("lname", FilterOperator.EQ, element.getKey())) : "";
                    })

                    sAge.filter((element) => {
                        element ? aFilters.push(new Filter("age", FilterOperator.EQ, element.getKey())) : "";
                    })   
                    
                    sEmail.filter((element) => {
                        element ? aFilters.push(new Filter("email", FilterOperator.EQ, element.getKey())) : "";
                    }) 

                // sFirstName ? aFilters.push(new Filter("fname", FilterOperator.EQ, sFirstName)) : "";
                // sLastName ? aFilters.push(new Filter("lname", FilterOperator.EQ, sLastName)) : "";
                // sPhone ? aFilters.push(new Filter("age", FilterOperator.EQ, sPhone)) : "";
                // sEmail ? aFilters.push(new Filter("email", FilterOperator.EQ, sEmail)) : "";
                 oTable.getBinding("items").filter(aFilters);
            },
            onClearFilterPress: function () {

                const oView = this.getView(),
                oClearFname = oView.byId("idFNameFilterValue").removeAllTokens(),
                oClearLname = oView.byId("idLNameFilterValue").removeAllTokens(),
                oClearPhone = oView.byId("iAgeFilterValue").removeAllTokens(),
                oClearEmail = oView.byId("idEmailFilterValue").removeAllTokens();


                // oClearFname = oView.byId("idFNameFilterValue").setValue( ),
                // oClearLname = oView.byId("idLNameFilterValue").setValue(),
                // oClearPhone = oView.byId("iPhoneFilterValue").setValue(),
                // oViewEmail = oView.byId("idEmailFilterValue").setValue();

            },
            EmployeeDetails: function (oEvent) {
                const { ID, fname} = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                const oRouter = this.getRouter();
                oRouter.navTo("RouteDetails", {
                    empId: ID, 
                    empName: fname
                })
            },
            addbutton: async function () {
                if (!this.oCreateEmployeeDialog) {
                    this.oCreateEmployeeDialog = await this.loadFragment("CreateEmployeeDialog")
                }

                this.oCreateEmployeeDialog.open();
            },

            onCloseDialog: function(){
                if(this.oCreateEmployeeDialog.isOpen()){
                    this.oCreateEmployeeDialog.close()
                }
            },
            onCreateEmployee: async function () {
                const oPayload = this.getView().getModel("localModel").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
                try {
                    await this.createData(oModel, oPayload, "/employee");
                    this.getView().byId("idEmployeeTable").getBinding("items").refresh();
                    this.oCreateEmployeeDialog.close();
                } catch (error) {
                    this.oCreateEmployeeDialog.close();
                    MessageBox.error("Some technical Issue");
                }

            }
        });
    });