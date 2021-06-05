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

			var rb1 = this.getView().byId("RB1").getSelected();
			var rb2 = this.getView().byId("RB2").getSelected();

			if (rb1 === true) {
				// var stateSelected = this.getView().byId("comboDistrict").getSelectedItem().getKey();
				var districtSelected = this.getView().byId("comboDistrict").getSelectedKey();
			}
			var pincode = this.getView().byId("pin").getValue();

			var msg;

			if (rb1 === true) {
				if (DP1 === '') {
					msg = "Please fill the date";
				} else if (districtSelected === '') {
					msg = "Please fill State/District";
				} else if (districtSelected === '' && DP1 === '') {
					msg = "Please fill date and State/District";
				}

				if (msg !== '' && msg !== undefined) {
					MessageToast.show(msg);
					return;
				}

			}

			if (rb2 === true) {
				if (DP1 === '') {
					msg = "Please fill the date";
				} else if (pincode === '') {
					msg = "Please fill PinCode";
				} else if (pincode === '' && DP1 === '') {
					msg = "Please fill date and Pincode";
				}

				if (msg !== '' && msg !== undefined) {
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

			if ((districtSelected != '' && DP1 != '') || (pincode != '' && DP1 != '')) {

				if (rb1 === true) {

					var sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + districtSelected +
						"&date=" +
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
			var table = this.getView().byId("table1");
			if (rb1 === false) {
				this.getView().byId("combo1").setVisible(false);
				this.getView().byId("comboDistrict").setVisible(false);
				this.getView().byId("pin").setVisible(true);
				this.getView().byId("pin").setValue("");
				table.destroyItems(null);
			} else {
				this.getView().byId("combo1").setVisible(true);
				this.getView().byId("comboDistrict").setVisible(true);
				this.getView().byId("pin").setVisible(false);
				this.getView().byId("combo1").setValue("");
				this.getView().byId("comboDistrict").setValue("");
				table.destroyItems(null);
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
