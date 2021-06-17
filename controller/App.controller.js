sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
		"sap/ui/export/library",
	"sap/ui/export/Spreadsheet",
	'sap/m/MessageToast',
	"../formatter",
	"sap/ui/model/Sorter"
], function (Controller, JSONModel, Filter, FilterOperator, exportLibrary, Spreadsheet, MessageToast, formatter, Sorter) {
	"use strict";

	var EdmType = exportLibrary.EdmType;

	return Controller.extend("my.Test.controller.App", {
		formatter: formatter,
		onInit: function () {


			// //	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1

			var oModelState = new JSONModel("https://cdn-api.co-vin.in/api/v2/admin/location/states");
			this.getView().byId("combo1").setModel(oModelState);
			// this.getView().byId("combo1").setValue("");
			// var that = this;
			// $.ajax("https://cdn-api.co-vin.in/api/v2/admin/location/states", {
			// 	type: 'GET',
			// 	success: function (data) {
			// 		// 
			// 		that.getOwnerComponent().getModel("local").setProperty("/states", data.states);
			// 	},
			// 	error: function (oErr) {
			// 		// 
			// 	}
			// });

			this.byId('combo1').setSelectedKey(null);
			// this.onSelectRB();
			this.byId('seg').setSelectedKey("dis");
			this.onSelectSegment();
			this.getView().byId("DP1").setValue(this.onGetDate());

			this.bDescending = true;
			// this.fnApplyFiltersAndOrdering();
			this.byId("DP1").setMinDate(new Date()).setValue(this.onGetDate());
		},

		onGetDate: function () {
			var date;
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = String(today.getFullYear());

			var yy = yyyy.substr(2, 2);

			date = mm + "/" + dd + "/" + yy;
			return date;
		},



		_fnGroup: function (oContext) {
			var avalibility = oContext.getProperty("available_capacity");

			return {
				key: avalibility
					// text: available_capacity
			};
		},

		fnApplyFiltersAndOrdering: function (oEvent) {
			var aSorters = [];

			aSorters.push(new Sorter("available_capacity", this.bDescending));

			if (this.byId('seg').getSelectedKey() !== "available") {
				this.byId("table1").getBinding("items").sort(aSorters);
			} else {
				// this.byId("centertable").getBinding("items").sort(aSorters);
			}
		},

		// setProductTypeFromSegmented: function (oevent) {
		// 	var productType = oevent.getParameters().item.getText();
		// 	// this.model.setProperty("/productType", productType);
		// 	// this._wizard.validateStep(this.byId("ProductTypeStep"));
		// },

		// onFilterCentres: function (oEvent) {

		// 	// build filter array
		// 	var aFilter = [];
		// 	//	var sQuery = oEvent.getParameter("query");
		// 	// var sQuery = oEvent.getSource().getValue();
		// 	var sQuery = this.getView().byId("Search").getValue();
		// 	if (sQuery) {
		// 		aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));

		// 		// filter binding
		// 		var oList = this.byId("table1");
		// 		var oBinding = oList.getBinding("items");
		// 		oBinding.filter(aFilter);

		// 	} else if (sQuery == "") {
		// 		this.onSelectCheckbox();

		// 	}

		// },

		onSelectCheckbox: function (oEvent) {
			// var filtermodel = new sap.ui.model.json.JSONModel();
			var filterArray = [];
			// var oData1 = { filter: filterArray };
			var oFilter;

			var oSegmentedButton = this.byId('seg').getSelectedKey();

			if (oSegmentedButton === "pin" || oSegmentedButton === "dis") {

				var oBinding = this.getView().byId("table1").getBinding("items");
				oBinding.filter([]);
			} else if (oSegmentedButton === "available") {
				var oBinding1 = this.getView().byId("centertable").getBinding("items");
				var oBinding2 = this.getView().byId("centertable1").getBinding("items");
				var oBinding3 = this.getView().byId("centertable2").getBinding("items");
				var oBinding4 = this.getView().byId("centertable2").getBinding("items");
				var oBinding5 = this.getView().byId("centertable2").getBinding("items");
				var oBinding6 = this.getView().byId("centertable2").getBinding("items");
				var oBinding7 = this.getView().byId("centertable2").getBinding("items");
				var oBinding8 = this.getView().byId("centertable2").getBinding("items");
				var oBinding9 = this.getView().byId("centertable2").getBinding("items");
				oBinding1.filter([]);
				oBinding2.filter([]);
				oBinding3.filter([]);
				oBinding4.filter([]);
				oBinding5.filter([]);
				oBinding6.filter([]);
				oBinding7.filter([]);
				oBinding8.filter([]);
				oBinding9.filter([]);
			}

			var sQuery = this.getView().byId("Search").getValue();
			if (sQuery) {
				oFilter = new sap.ui.model.Filter("name", FilterOperator.Contains, sQuery);
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chk18").getSelected()) {
				oFilter = new sap.ui.model.Filter("min_age_limit", "EQ", "18");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chk45").getSelected()) {
				oFilter = new sap.ui.model.Filter("min_age_limit", "EQ", "45");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkcovaxin").getSelected()) {
				oFilter = new sap.ui.model.Filter("vaccine", "EQ", "COVAXIN");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkcovishield").getSelected()) {
				oFilter = new sap.ui.model.Filter("vaccine", "EQ", "COVISHIELD");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkfree").getSelected()) {
				oFilter = new sap.ui.model.Filter("fee_type", "EQ", "Free");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkpaid").getSelected()) {
				oFilter = new sap.ui.model.Filter("fee_type", "EQ", "Paid");
				filterArray.push(oFilter);
			}
			if (this.getView().byId("chkdose1").getSelected()) {
				oFilter = new sap.ui.model.Filter("available_capacity_dose1", "NE", "0");
				filterArray.push(oFilter);
			}
			if (this.getView().byId("chkdose2").getSelected()) {
				oFilter = new sap.ui.model.Filter("available_capacity_dose2", "NE", "0");
				filterArray.push(oFilter);
			}

			oFilter = new sap.ui.model.Filter("available_capacity", "NE", "0");
			filterArray.push(oFilter);

			if (oSegmentedButton === "pin" || oSegmentedButton === "dis") {

				oBinding.filter(filterArray);
			} else if (oSegmentedButton === "available") {
				oBinding1.filter(filterArray);
				oBinding2.filter(filterArray);
				oBinding3.filter(filterArray);
				oBinding4.filter(filterArray);
				oBinding5.filter(filterArray);
				oBinding6.filter(filterArray);
				oBinding7.filter(filterArray);
				oBinding8.filter(filterArray);
				oBinding9.filter(filterArray);
			}

			// this.onFilterCentres();

		},

		onButtonPress: function (oEvent) {
			window.open("https://selfregistration.cowin.gov.in/", "_blank");
		},

		onSearch: function (oEvent) {
			var tableArray = [];

			var DP1 = this.getView().byId("DP1")._getInputValue();

			var oSegmentedButton = this.byId('seg').getSelectedKey();

			// var rb1 = this.getView().byId("RB1").getSelected();
			// var rb2 = this.getView().byId("RB2").getSelected();

			if (oSegmentedButton === "dis") {
				// var stateSelected = this.getView().byId("comboDistrict").getSelectedItem().getKey();
				var districtSelected = this.getView().byId("comboDistrict").getSelectedKey();
			} else if (oSegmentedButton === "available") {
				var centerSelected = this.getView().byId("comboCentre").getSelectedKey();
			}
			var pincode = this.getView().byId("pin").getValue();

			var msg;

			if (oSegmentedButton === "dis") {
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

			if (oSegmentedButton === "pin") {
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

				if (oSegmentedButton === "dis") {

					var sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + districtSelected +
						"&date=" +
						getDate(this, 0);
				} else if (oSegmentedButton === "pin") {

					sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + getDate(this,
						0);

				}
				// else if (oSegmentedButton === "available") {

				// sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=" + centerSelected + "&date=" +
				// 	getDate(this,
				// 		0);
				// }

				if (oSegmentedButton === "dis" || oSegmentedButton === "pin") {
					var oPinModel = new JSONModel(sPath);
					tableArray.push(oPinModel);
					//Bind the data to the table
					var table = this.getView().byId("table1");
					table.setModel(tableArray[0]);
					this.getView().byId("table1").setVisible(true);
					this.getView().byId("centertable").setVisible(false);
				}
				if (oSegmentedButton === "available") {
					var i = 0;
					do {
						sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=" + centerSelected + "&date=" +
							getDate(this,
								i);

						var ocenterModel = new JSONModel(sPath);
						tableArray.push(ocenterModel);
						i = i + 7;
					}
					while (i < 71);

					//Bind the data to the table
					var tablenew = this.getView().byId("centertable");
					tablenew.setModel(tableArray[0], "local");

					// test
					var tablenew1 = this.getView().byId("centertable1");
					tablenew1.setModel(tableArray[1], "local");

					var tablenew2 = this.getView().byId("centertable2");
					tablenew2.setModel(tableArray[2], "local");

					var tablenew3 = this.getView().byId("centertable3");
					tablenew3.setModel(tableArray[3], "local");

					var tablenew4 = this.getView().byId("centertable4");
					tablenew4.setModel(tableArray[4], "local");

					var tablenew5 = this.getView().byId("centertable5");
					tablenew5.setModel(tableArray[5], "local");

					var tablenew6 = this.getView().byId("centertable6");
					tablenew6.setModel(tableArray[6], "local");

					var tablenew7 = this.getView().byId("centertable7");
					tablenew7.setModel(tableArray[7], "local");

					var tablenew8 = this.getView().byId("centertable8");
					tablenew8.setModel(tableArray[8], "local");

					var tablenew9 = this.getView().byId("centertable9");
					tablenew9.setModel(tableArray[9], "local");
					// test

					this.getView().byId("table1").setVisible(false);
					this.getView().byId("centertable").setVisible(true);
					this.getView().byId("centertable1").setVisible(true);
					this.getView().byId("centertable2").setVisible(true);
					this.getView().byId("centertable3").setVisible(true);
					this.getView().byId("centertable4").setVisible(true);
					this.getView().byId("centertable5").setVisible(true);
					this.getView().byId("centertable6").setVisible(true);
					this.getView().byId("centertable7").setVisible(true);
					this.getView().byId("centertable8").setVisible(true);
					this.getView().byId("centertable9").setVisible(true);

					// var oTable = this.getView().byId("centertable");
					// var oModel = oTable.getModel();
					// var aRows = oModel.getData().data;

					// var tableloop = document.getElementById("centertable");
					// for (var p in tableloop.rows) {
					// 	var row = tableloop.rows[p]
					// 		//iterate through rows
					// 		//rows would be accessed using the "row" variable assigned in the for loop
					// 	for (var j in row.cells) {
					// 		var col = row.cells[j];
					// 		//iterate through columns
					// 		//columns would be accessed using the "col" variable assigned in the for loop
					// 	}
					// }

				}

				this.onSelectCheckbox();
				// if (oSegmentedButton !== "available") {
				this.fnApplyFiltersAndOrdering();

				// var rowCount = this.getView().byId("table1").getBinding("items").getLength();
				// }
				// var combo = [];
				// var comboctr = this.getView().byId("comboCentre");
				// comboctr.destroyItems();

			}
		},

		onSelectRB: function (oEvent) {
			var rb1 = this.getView().byId("RB1").getSelected();
			var table = this.getView().byId("table1");
			this.getView().byId("panel2").setExpanded(true);

			var tableArr = [];
			var tableData = this.getView().byId("table1");
			tableData.setModel(tableArr[0]);
			table.destroyItems(null);

			if (rb1 === false) {
				this.getView().byId("combo1").setVisible(false);
				this.getView().byId("comboDistrict").setVisible(false);
				this.getView().byId("pin").setVisible(true);
				this.getView().byId("pin").setValue("");

			} else {
				this.getView().byId("combo1").setVisible(true);
				this.getView().byId("comboDistrict").setVisible(true);
				this.getView().byId("pin").setVisible(false);
				this.getView().byId("combo1").setValue("");
				this.getView().byId("comboDistrict").setValue("");

				// table.destroyItems(null);
			}
		},

		onSelectSegment: function (oEvent) {

			var table = this.getView().byId("table1");
			this.getView().byId("panel2").setExpanded(true);

			var tableArr = [];
			var tableData = this.getView().byId("table1");
			tableData.setModel(tableArr[0]);
			table.destroyItems(null);

			var tableArr1 = [];
			var tableData1 = this.getView().byId("centertable");
			tableData.setModel(tableArr[0]);
			table.destroyItems(null);

			var oSegmentedButton = this.byId("seg").getSelectedKey();
			// oSelectedItemId = oSegmentedButton.getSelectedKey();

			if (oSegmentedButton === "pin") {
				this.getView().byId("combo1").setVisible(false);
				this.getView().byId("comboDistrict").setVisible(false);
				this.getView().byId("comboCentre").setVisible(false);
				this.getView().byId("pin").setVisible(true);
				this.getView().byId("pin").setValue("");

			} else if (oSegmentedButton === "dis") {
				this.getView().byId("combo1").setVisible(true);
				this.getView().byId("comboDistrict").setVisible(true);
				this.getView().byId("comboCentre").setVisible(false);
				this.getView().byId("pin").setVisible(false);
				this.getView().byId("combo1").setValue("");
				this.getView().byId("comboDistrict").setValue("");

			} else if (oSegmentedButton === "available") {
				this.getView().byId("combo1").setVisible(false);
				this.getView().byId("comboDistrict").setVisible(false);
				this.getView().byId("comboCentre").setVisible(true);
				this.getView().byId("pin").setVisible(true);
				this.getView().byId("combo1").setValue("");
				this.getView().byId("comboDistrict").setValue("");

			}
			this.getView().byId("table1").setVisible(false);
			this.getView().byId("centertable").setVisible(false);
			this.getView().byId("centertable1").setVisible(false);
			this.getView().byId("centertable2").setVisible(false);
			this.getView().byId("centertable3").setVisible(false);
			this.getView().byId("centertable4").setVisible(false);
			this.getView().byId("centertable5").setVisible(false);
			this.getView().byId("centertable6").setVisible(false);
			this.getView().byId("centertable7").setVisible(false);
			this.getView().byId("centertable8").setVisible(false);
			this.getView().byId("centertable9").setVisible(false);

		},

		onhandleChange: function (oEvent) {
			//	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1
			var stateSelected = this.getView().byId("combo1").getSelectedItem().getKey();
			var districtPath = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateSelected;
			var oModelDistrict = new sap.ui.model.json.JSONModel(districtPath);
			this.getView().byId("comboDistrict").setModel(oModelDistrict);

		},
		
		createColumnConfig: function () {
			var aCols = [];

			aCols.push({
				label: "Center name",
				property: "name",
				type: EdmType.String

			});

			aCols.push({
				label: "Date",
				type: EdmType.String,
				property: "date"
			});

			aCols.push({
				label: "Vaccine Name",
				type: EdmType.String,
				property: "vaccine"
			});

			aCols.push({
				label: "Availability",
				property: "available_capacity",
				type: EdmType.String
			});

			aCols.push({
				label: "Age Limit",
				property: "min_age_limit",
				type: EdmType.String
			});

			aCols.push({
				label: "Fee type",
				property: "fee_type",
				type: EdmType.String
			});



			return aCols;
		},
		
		
		onExport: function () {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId("table1");
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding("items");
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: "Level"
				},
				dataSource: oRowBinding,
				fileName: "Vaccine Availibility.xlsx",
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function () {
				oSheet.destroy();
			});
		},		

		onhandlecenter: function (oControlEvent) {
			var pin = this.getView().byId("pin").getValue();

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

			var centerPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin + "&date=" + getDate(
				this, 0);

			var oModelCentre = new sap.ui.model.json.JSONModel(centerPath);
			this.getView().byId("comboCentre").setModel(oModelCentre);
		},

		onPress: function (oEvent) {
			// var spath = oEvent.getSource().getBindingContext("invoice").getPath();
			// var selectedPath = JSON.stringify(oEvent.getSource().getBindingContext("invoice").getProperty(spath));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail");
		}

	});
});
