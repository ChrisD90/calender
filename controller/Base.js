sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History"],function(t,n){"use strict";return t.extend("chris.calendar.controller.Base",{getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},getManifestEntry:function(t){return this.getOwnerComponent().getMetadata().getManifestEntry(t)},getRouteName:function(t){return this.getManifestEntry("sap.ui5").routing.routes[t].name},navBack:function(){var t,e;void 0!==n.getInstance().getPreviousHash()?history.go(-1):this.getRouter().navTo("home",{},!0)},navToHome:function(){this.getRouter().navTo("home")},getAppController:function(t){return this.getRouter().getView(t).getParent().getParent().getParent().getController()}})});