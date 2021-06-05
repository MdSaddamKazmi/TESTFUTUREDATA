  sap.ui.define([],

  	// eslint-disable-next-line strict
  	function (
  		json

  	) {
  		return {

  			// eslint-disable-next-line camelcase
  			available_capacity: function (sValue) {

  				var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

  				if (sValue === 0) {
  					//	sValue = 'No Slots';
  					sValue = oResourceBundle.getText("no_slots");
  				} else {
  					var sAvailable = oResourceBundle.getText("available");
  					//	sValue = 'Available: ' + sValue;
  					sValue = sAvailable + sValue;
  				}
  				return sValue;
  			},

  			// eslint-disable-next-line camelcase
  			available_capacity_icon: function (sValue) {

  				if (sValue === 0) {

  					return "sap-icon://thumb-down";
  				} else {

  					return "sap-icon://thumb-up";
  				}
  			},

  			vaccine_image: function (sValue) {

  				if (sValue === "COVISHIELD") {

  					return "../images/covishield.jpg";
  				} else if (sValue === "COVAXIN") {

  					return "../images/covaxin.jpg";
  				}
  			},

  			// eslint-disable-next-line camelcase
  			link_enabled: function (sValue) {

  				// var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
  				var result;
  				if (sValue > 0) {

  					result = Boolean("true");
  				} else {

  					result = Boolean(0);
  				}
  				sValue = result;
  				return sValue;
  			}

  		};
  	});
