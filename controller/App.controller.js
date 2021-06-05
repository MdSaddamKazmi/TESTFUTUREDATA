sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/MessageToast',
	"../formatter"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast, formatter) {
	"use strict";

	return Controller.extend("my.Test.controller.App", {
		formatter: formatter,
		onInit: function () {

			// //	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1

			var oModelState = new JSONModel("https://cdn-api.co-vin.in/api/v2/admin/location/states");
			this.getView().byId("combo1").setModel(oModelState);
			this.onSelectRB();
			this.getView().byId("DP1").setValue(this.onGetDate());
		},

		onGetDate: function () {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			today = yyyy + mm + dd;
return today;
		},

		onSearch: function (oEvent) {
			var tableArray = [];

			var DP1 = this.getView().byId("DP1")._getInputValue();

			// if (DP1 === '') {
			// 	var msg = "Please fill the date";
			// 	MessageToast.show(msg);
			// 	return;
			// }

			var rb1 = this.getView().byId("RB1").getSelected();
			var rb2 = this.getView().byId("RB2").getSelected();

			if (rb1 === true) {
				var stateSelected = this.getView().byId("comboDistrict").getSelectedItem().getKey();
			}
			var pincode = this.getView().byId("pin").getValue();

			if (rb1 === true) {
				if (DP1 === '') {
					var msg = "Please fill the date";
				}
				if (stateSelected === undefined) {
					msg = msg + " and State/District";
				}

				if (msg != '') {
					MessageToast.show(msg);
					return;
				}

			}

			function getDate(that, n) {

				var sDate = that.getView().byId("DP1").getDateValue();
				var today = new Date(sDate);
				today.setDate(today.getDate() + n);
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
				if (dd < 10) {
					dd = '0' + dd;
				}
				if (mm < 10) {
					mm = '0' + mm;
				}
				today = dd + '-' + mm + '-' + yyyy;

				return today;
			}

			// var pinPath = "https://api.postalpincode.in/pincode/803101";
			// var oPinCodeModel = new JSONModel(pinPath);

			if ((stateSelected != '' && DP1 != '') || (pincode != '' && DP1 != '')) {

				if (rb1 === true) {

					var sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + stateSelected + "&date=" +
						getDate(this, 0);
				} else if (rb2 === true) {

					sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + getDate(this, 0);

				}

				var oPinModel = new JSONModel(sPath);
				tableArray.push(oPinModel);
				//Bind the data to the table
				var table = this.getView().byId("table1");
				table.setModel(tableArray[0]);

			}
		},

		onSelectRB: function (oEvent) {
			var rb1 = this.getView().byId("RB1").getSelected();

			if (rb1 === false) {
				this.getView().byId("combo1").setEnabled(false);
				this.getView().byId("comboDistrict").setEnabled(false);
				this.getView().byId("pin").setEnabled(true);

			} else {
				this.getView().byId("combo1").setEnabled(true);
				this.getView().byId("comboDistrict").setEnabled(true);
				this.getView().byId("pin").setEnabled(false);
			}
		},

		onhandleChange: function (oEvent) {
			//	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1
			var stateSelected = this.getView().byId("combo1").getSelectedItem().getKey();
			var districtPath = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateSelected;
			var oModelDistrict = new sap.ui.model.json.JSONModel(districtPath);
			this.getView().byId("comboDistrict").setModel(oModelDistrict);

		},

		onPress: function (oEvent) {
			var spath = oEvent.getSource().getBindingContext("invoice").getPath();
			var selectedPath = JSON.stringify(oEvent.getSource().getBindingContext("invoice").getProperty(spath));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				"invoicePath": selectedPath
			});
		}

	});
});
