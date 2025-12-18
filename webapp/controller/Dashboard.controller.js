sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("qmportal899.controller.Dashboard", {
            onInit: function () {

            },

            onNavToInspectionLots: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteInspectionLots");
            },

            onNavToResultRecording: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteResultRecording");
            },

            onNavToUsageDecision: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteUsageDecision");
            },

            onLogout: function () {
                var that = this;
                MessageBox.confirm("Are you sure you want to logout?", {
                    onClose: function (oAction) {
                        if (oAction === MessageBox.Action.OK) {
                            // Clear session
                            var oSessionModel = that.getOwnerComponent().getModel("session");
                            if (oSessionModel) {
                                oSessionModel.setData({});
                            }
                            // Navigate to Login
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                            oRouter.navTo("RouteLogin");
                        }
                    }
                });
            }
        });
    });
