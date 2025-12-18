sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("qmportal899.controller.ResultRecording", {
            onInit: function () {

            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteDashboard", {}, true);
                }
            },

            onSave: function (oEvent) {
                var oSource = oEvent.getSource();
                var oContext = oSource.getBindingContext();
                var oData = oContext.getObject();
                var oModel = this.getView().getModel();

                // Validate inputs (ensure they are numbers) is handled by type="Number" but logic check:
                // Note: Partial saves allowed.

                var oEntry = {
                    InspectionLot: oData.InspectionLot,
                    UnrestrictedStock: oData.UnrestrictedStock,
                    BlockedStock: oData.BlockedStock,
                    ProductionStock: oData.ProductionStock
                };

                // Using update since we are modifying existing record usually, or creating if it's a detail entity.
                // Assuming ZQM899_RECORD is updateable directly via InspectionLot key.
                var sPath = oContext.getPath();

                sap.ui.core.BusyIndicator.show();
                oModel.update(sPath, oEntry, {
                    success: function () {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Results Saved Successfully");
                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error("Error saving results");
                    }
                });
            }
        });
    });
