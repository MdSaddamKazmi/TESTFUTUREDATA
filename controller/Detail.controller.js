sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {
	"use strict";

	return Controller.extend("my.Test.controller.Detail", {

		onInit: function () {
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.getRoute("detail").attachMatched(this._onObjectMatched, this);

			// var tableArray = [];
			// var sPath = "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id="

			// var ocenterModel = new JSONModel(sPath);

			// this.getOwnerComponent().getModel("local").setProperty("/IndiaDetails", ocenterModel);
			// // tableArray.push(ocenterModel);

			var oModelState = new JSONModel("https://cdn-api.co-vin.in/api/v2/admin/location/states");
			this.getView().byId("comboState").setModel(oModelState);

			var that = this;
			$.ajax("https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=", {
				type: "GET",
				success: function (data) {

					that.getOwnerComponent().getModel("local").setProperty("/IndiaDetails", data);
				}

			});

		},
		// _onObjectMatched: function (oEvent) {
		// 	var selectedArguments = oEvent.getParameter("arguments");
		// 	var selectedRecord = JSON.parse(selectedArguments.invoicePath);

		// 	var obj = {
		// 		"invoicePath": selectedRecord
		// 	};
		// 	var navigationobjModel = new JSONModel();
		// 	navigationobjModel.setData(obj);
		// 	this.getView().setModel(navigationobjModel);

		// },

		/*
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").invoicePath,
				model: "invoice"
			});
		}, */

		onStateChange: function (oEvent) {
			//	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1
			var stateSelected = this.getView().byId("comboState").getSelectedItem().getKey();
			var districtPath = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateSelected;
			var oModelDistrict = new sap.ui.model.json.JSONModel(districtPath);
			this.getView().byId("comboDistrict").setModel(oModelDistrict);

			var that = this;
			var path = "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=" + stateSelected + "&district_id=";
			$.ajax(path, {
				type: "GET",
				success: function (data) {

					that.getOwnerComponent().getModel("local").setProperty("/IndiaDetails", data);
				}

			});

		},

		onDistrictChange: function (oEvent) {
			//	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1
			var stateSelected = this.getView().byId("comboState").getSelectedItem().getKey();
			var districtSelected = this.getView().byId("comboDistrict").getSelectedItem().getKey();

			var that = this;
			var path = "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=" + stateSelected + "&district_id=" + districtSelected;
			$.ajax(path, {
				type: "GET",
				success: function (data) {

					that.getOwnerComponent().getModel("local").setProperty("/IndiaDetails", data);
				}

			});

		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				/*	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("app", null, "true"); */
				this.getOwnerComponent().getRouter().navTo("app", null, true);

			}
		}
	});
});
