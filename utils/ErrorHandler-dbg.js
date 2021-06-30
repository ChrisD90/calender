sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
], function (BaseObject, MessageBox) {
    "use strict";

    return BaseObject.extend("chris.calendar.utils.ErrorHandler", {
        constructor: function (oComponent) {
            this._oComponent = oComponent;
            this._oModel = oComponent.getModel();
            this._bMessageOpen = false;
            this._sErrorText = "";

            if(!this._oModel) {
              return;
            }

            try {
                this._oModel.attachMetadataFailed(function (oEvent) {
                    var oParams = oEvent.getParameters();
                    this._extractErrorMessages(oParams.response);
                    this._showMetadataError();
                }, this);

                this._oModel.attachRequestFailed(function (oEvent) {
                    var oParams = oEvent.getParameters();

                    // if we have a status code 0 (out of session) then reload the app
                    if (oParams.response.statusCode == "0") {
                        location.assign(
                            "/"
                        );
                    }

                    // An entity that was not found in the service is also throwing a 404 error in oData.
                    // We already cover this case with a notFound target so we skip it here.
                    // A request that cannot be sent to the server is a technical error that we have to handle though
                    if (oParams.response.statusCode !== "404" || (oParams.response.statusCode === 404 && oParams.response.responseText.indexOf(
                        "Cannot POST") === 0)) {
                        this._extractErrorMessages(oParams.response);
                        this._showServiceError();
                        
                        if(this._oModel.hasPendingChanges()) {
                            var oPendingChanges = this._oModel.getPendingChanges();
                            var aResetChanges = [];
                            
                            for(var key in oPendingChanges) {
                                if(oPendingChanges.hasOwnProperty(key)) {
                                    aResetChanges.push("/{0}".format(key));
                                }
                            }

                            if(aResetChanges) this._oModel.resetChanges(aResetChanges);

                            // This is a hack, because resetChanges does not work
                            // properly with uncommitted temporary changes.
                            for(var oBinding in this._oModel.oData) {
                                if(this._oModel.oData.hasOwnProperty(oBinding)) {
                                    if(aResetChanges.includes("/{0}".format(oBinding))) {
                                        delete this._oModel.oData[oBinding];
                                    }
                                }
                            }
                        }
                    }
                }, this);
            } catch (ex) {
                jQuery.sap.log.error(ex);
            }
        },

        _showMetadataError: function () {
            MessageBox.error(
                this._sErrorText, {
                    id: "metadataErrorMessageBox",
                    styleClass: "sapUiSizeCozy",
                    actions: [MessageBox.Action.RETRY, MessageBox.Action.CLOSE],
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.RETRY) {
                            this._oModel.refreshMetadata();
                            this._sErrorText = "";
                        }
                    }.bind(this)
                }
            );
        },

        _showServiceError: function () {
            if (this._bMessageOpen) {
                return;
            }
            this._bMessageOpen = true;
            MessageBox.error(
                this._sErrorText, {
                    id: "serviceErrorMessageBox",
                    styleClass: "sapUiSizeCozy",
                    actions: [MessageBox.Action.CLOSE],
                    onClose: function () {
                        this._bMessageOpen = false;
                        this._sErrorText = "";
                    }.bind(this)
                }
            );
        },

        _extractErrorMessages: function (oDetails) {
            var aErrors = [],
                oError;

            try {
                oError = JSON.parse(oDetails.responseText).error;

                if (oError.innererror && oError.innererror.errordetails && oError.innererror.errordetails.length) {
                    aErrors = oError.innererror.errordetails;

                    // remove last element as this is alwys set by SAP framework -> "an exception was raised"
                    if (oError.innererror.errordetails.length > 1) {
                        aErrors.pop();
                    }

                    aErrors.forEach(function (oItem, iIdx) {
                        this._sErrorText += oItem.message + "\n";
                    }.bind(this));
                } else {
                    this._sErrorText = oError.message.value;
                }

            } catch (ex) {
                jQuery.sap.log.error(ex);
            }
        }
    });
}
);
