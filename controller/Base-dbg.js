sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History"
], function (Controller, History) {
  "use strict";

  return Controller.extend("chris.calendar.controller.Base", {   
  	
    getRouter: function () {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },

    getManifestEntry: function(sManifestEntry) {
      return this.getOwnerComponent().getMetadata().getManifestEntry(sManifestEntry);
    },

    getRouteName: function(sRoute) {
      return this.getManifestEntry("sap.ui5").routing.routes[sRoute].name;
    },

    navBack: function () {
      var oHistory = History.getInstance();
      var sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        history.go(-1);
      } else {
        this.getRouter().navTo("home", {}, true);
      }
    },

    navToHome: function () {
      this.getRouter().navTo("home");
    },

    getAppController: function(sView) {
      return this.getRouter().getView(sView)
        .getParent().getParent().getParent().getController();
    },
  });
});