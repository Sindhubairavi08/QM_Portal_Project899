sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("qmportal899.controller.Login", {
            onInit: function () {
                var oData = {
                    userId: "",
                    password: ""
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            },

            onLogin: function () {
                var oView = this.getView();
                var oModel = oView.getModel();
                var sUserId = oModel.getProperty("/userId");
                var sPassword = oModel.getProperty("/password");

                if (!sUserId || !sPassword) {
                    MessageToast.show("Please enter both User ID and Password");
                    return;
                }

                // OData Read to authenticate
                var oODataModel = this.getOwnerComponent().getModel();
                var that = this;
                var sPath = "/ZQM899_LOGIN";
                
                // busy indicator
                sap.ui.core.BusyIndicator.show();

                oODataModel.read(sPath, {
                    filters: [
                        new sap.ui.model.Filter("User_ID", sap.ui.model.FilterOperator.EQ, sUserId),
                        new sap.ui.model.Filter("Password", sap.ui.model.FilterOperator.EQ, sPassword)
                    ],
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        if (oData.results && oData.results.length > 0) {
                            // Successful Login
                            MessageToast.show("Login Successful");
                            
                            // Store session
                            var oSessionModel = that.getOwnerComponent().getModel("session");
                            if (!oSessionModel) {
                                oSessionModel = new JSONModel();
                                that.getOwnerComponent().setModel(oSessionModel, "session");
                            }
                            oSessionModel.setProperty("/user", oData.results[0]);
                            
                            // Navigate to Dashboard
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                            oRouter.navTo("RouteDashboard");
                        } else {
                            MessageBox.error("Invalid Customer ID or Password");
                        }
                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error("Login failed. Please try again.");
                    }
                });
            }
        });
    });
