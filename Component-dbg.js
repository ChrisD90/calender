sap.ui.define([
  "sap/ui/core/UIComponent",
  "chris/calendar/utils/ErrorHandler"
], function (UIComponent, ErrorHandler) {
  "use strict";

  return UIComponent.extend("chris.calendar.Component", {
      _routeName: "",

      metadata: {
          manifest: "json"
      },

      _oErrorHandler: null,

      init: function () {
          // Call the init function of the parent component
          UIComponent.prototype.init.apply(this, arguments);

          // initialize the error handler with the component
          this._oErrorHandler = new ErrorHandler(this);
          
          this.getRouter().initialize();
          
          var oModel = this.getModel();

          if(oModel) {
            oModel.setDefaultCountMode(
              sap.ui.model.odata.CountMode.None
            );
            
            //oModel.setDefaultBindingMode("TwoWay");
          }
      },

      setRouteName: function(sRouteName) {
        this._routeName = sRouteName;
      },

      getRouteName: function() {
        return this._routeName;
      },
      
      getPromise: function() {
      	
      }
  });

});
