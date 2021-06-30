sap.ui.define([
	"chris/calendar/controller/Base",
	'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel"
], function (Base, MessageToast, JSONModel) {
	"use strict";

	return Base.extend("chris.calendar.controller.Home", {

		_aTiles: null,
		_comesFromRoute: false,
		_iCounter: 0,
		_iErrorCounter: 0,

		_onRouteMatched: function (oEvent) {
			if (!this._comesFromRoute) {
				var oView = this.getView();

				if (!this._comesFromRoute) {
					this._oLoginDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.login", this);
					oView.addDependent(this._oLoginDialog);
					this._oLoginDialog.open();
				}
			}
			this._comesFromRoute = true;
		},

		_initModels: function () {
			var oView = this.getView();

			var oDo = new JSONModel({
				HTML: "<h1></h1>"
					+ "<p>Das ist euer Monatskalender für das Jahr 2021!<br>"
					+ "Hinter jeder Monatskachel verbigt sein ein kleines Geheimnis.<br>"
					+ "Weitere Informationen und Anweisungen erhaltet ihr, sobald ihr euren Kalender öffnet.<br>"
					+ "Und solltet ihr einfach mal Sehnsucht haben oder euch traurig fühlen, findet ihr über den Button 'Ich fühle mich einsam...' Abhilfe.<br>"
					+ "<br>"
					+ "Von Zeit zu Zeit können weitere Funktionen dazukommen...schaut also ab und zu mal vorbei 🙃<br>"
					+ "<br>"
					+ "Viel Liebe<br>"
					+ "C & A 💋</p>"
			});

			var oJanuary = new JSONModel({
				HTML: "<p>❤ Hallo ihr zwei Süßen ❤,<br>"
					+ "im ersten Monat dieses aufregenden Jahres laden wir euch zum<br><br>"
					+ "<strong>Bratapfelessen</strong><br><br>"
					+ "mit anschließendem verspieltem Zeitvertreib ein!<br>"
					+ "<br>"
					+ "Viel Liebe<br>"
					+ "C & A 💋</p>"
			});

			var oFebruary = new JSONModel({
				HTML: "<p>❤ Da seid ihr also doch recht clever, ❤<br>"
					+ "schauen wir doch mal, wie es aussieht, wenn ihr dabei unter Druck seid.<br>"
					+ "Dieses doofe Corona durchkreuzt leider immernoch unseren Plan, es gibt <br> daher zwei Möglichkeiten:<br>"
					+ "<br>"
					+ "1. online (und damit körperlich viel zu weit voneinander entfernt)<br>"
					+ "2. wir warten bis zum 14. Februar ab, ob wir uns dann wieder treffen dürfen.<br>"
					+ "<br>"
					+ "Ihr habt die Wahl!<br>"
					+ "<br>"
					+ "Ach ja...um was geht es eigentlich...ganz im Zeichen dieses Monats, hilft <br>euch vielleicht das Monatsbild etwas weiter.<br>"
					+ "<br>"
					+ "Falls nicht, lasst euch einfach überraschen.<br>"
					+ "<br>"
					+ "Viel Liebe<br>"
					+ "C & A 💋</p>"
			});

			var oMarch = new JSONModel({
				HTML: "<p>❤ Tatü tata, der März ist da! ❤<br>"
				    +"<br>"
					+ "Die Pollen fliegen, die Sonne scheint,<br>"
					+ "Noch immer sind wir nicht vereint.<br>"
					+ "Ei der daus, verdammt noch mal,<br>"
					+ "Da hilft doch nur ein Morgenmahl.<br>"
					+ "Groß und üppig soll es sein,<br>"
					+ "Zu zweit vielleicht, zu viert wär' fein.<br>"
					+ "<br>"
					+ "Man reiche bald den Wein und Weib,<br>"
					+ "Für jeden Tag, sind wir bereit.<br>"
					+ "Als bald das Volk occursum darf,<br>"
					+ "Wir waren viel zu lange brav.<br>"
					+ "<br>"
					+ "Viel lyrische Liebe<br>"
					+ "C & A 💋</p>"
			});

			var oApril = new JSONModel({
				HTML: "<p>❤ Das Wandern ist des Lüstlings Lust! ❤<br>"
				    +"<br>"
					+ "Wir schreiben den 4ten Monat des Jahres 2021. Noch immer warten wir auf die erlösende Impfung.<br>"
					+ "Zeit für ein kleines Abenteuer.<br>"
					+ "Sattelt die Hühner, schnürt die Unterhosen, wir brechen bald auf.<br>"
					+ "Gutesc Schuhwerk, Sonnencreme und -brille solltet ihr nicht vergessen! Es geht in die Natur.<br>"
					+ "<br>"
					+ "EKELHAFT!!! ICH HASSE OUTDOOR!!!<br>"
					+ "<br>"
					+ "Aber sei's drum, wir sorgen für eine ausreichende Versorgung mit Lebensnotwendigkeiten.<br>"
					+ "<br>"
					+ "<br>"
					+ "Viel Liebe<br>"
					+ "C & A 💋</p>"
			});

			var oMay = new JSONModel({
				HTML: "<p>❤ Die Leiden der jungen Liebenden... ❤<br>"
				    +"<br>"
					+ "Liebes Tagebuch,<br>"
					+ "dieser doofe Corona-Typ ist immernoch da. Alles hat zu.<br>"
					+ "Burgerrestaurants ändern plötzlich ihr Image, Menschen sind alle kacke und <br>"
					+ "überhaupt, geht mir das alles richtig auf den Sack. <br>"
					+ "<br>"
					+ "Meinen Frust, kann ich eigentlich nur noch auf zwei Arten abbauen: Sex und Essen.<br>"
					+ "Da Zweiteres (potentiel) einfacher in der Gruppe zu gestalten ist, ist es mal wieder<br>"
					+ "an der Zeit, für ein richtig fettes Barbecue. Mit Spiel und Spaß, viel Frustfleisch und dem ganzen Kram.<br>"
					+ "Wenn sich nur zwei ganz tolle Menschen dazu gesellen würden...<br>"
					+ "<br>"
					+ "<br>"
					+ "Viel Liebe<br>"
					+ "C & A 💋</p>"
			});

			var oJun = new JSONModel({
				HTML: "<p>❤ Und der Sommer er kommt... ❤<br>"
				    +"<br>"
					+ "...und Corona geht (hoffentlich). Wir können wieder raus!<br>"
					+ "Also haben wir uns überlegt, warum nicht mal wieder etwas draußen machen?<br>"
					+ "So unter ein paar Menschen...wobei...ich hasse Menschen...<br>"
					+ "Und damit es auch etwas aufregend bleibt, machen wir ein Abenteuer daraus.<br>"
					+ "Ein Miniabenteuer. Um genau zu sein, ein Minigolfabenteuer.<br>"
					+ "Möge der Chris gewinnen!<br>"
					+ "<br>"
					+ "<br>"
					+ "Viel Liebe<br>"
					+ "C & A 💋</p>"
			});
			
			var oJul = new JSONModel({
				HTML: "<p>❤ Ein Ring sie zu knechten... ❤<br>"
				    +"<br>"
					+ "...es ist so weit...endlich...finally...himmelhochjauchzent!!!<br>"
					+ "Der Juli steht ganz im Zeichen der Liebe! 👩‍❤️‍👨<br>"
					+ "<br>"
					+ "Nehmt euch die Zeit für einander und genießt die Ehe.<br>"
					+ "Dafür legen wir diesen Monat auch eine kleine Pause ein.<br>"
					+ "<br>"
					+ "Wir freuen uns so 🤗 <br>"
					+ "<br>"
					+ "<br>"
					+ "Viel Liebe<br>"
					+ "C & A 💋</p>"
			});



			oView.setModel(oJanuary, "jan");
			oView.setModel(oFebruary, "feb");
			oView.setModel(oMarch, "mar");
			oView.setModel(oApril, "apr");
			oView.setModel(oMay, "may");
			oView.setModel(oJun, "jun");
			oView.setModel(oJul, "jul");

			oView.setModel(oDo, "do");

		},

		_initTiles: function () {
			var oView = this.getView();
			var oCurrentDate = new Date();
			var iYear = 2021;
			var oTile;
			var oTileHeader;
			var oTileImage;
			var oTileDate;
			var sTileImage;
			var sHeaderImage;

			this._aTiles = [
				[oView.byId('tileJanuary'), new Date(iYear, 0, 1), "theme/img/january.jpg", "theme/img/Januar.jpg"],
				[oView.byId('tileFebruary'), new Date(iYear, 0, 1), "theme/img/february.jpg", "theme/img/escape.gif"],
				[oView.byId('tileMarch'), new Date(iYear, 2, 1), "theme/img/march.jpg", "theme/img/März.jpg"],
				[oView.byId('tileApril'), new Date(iYear, 3, 1), "theme/img/april.jpg", "theme/img/april_header.jpg"],
				[oView.byId('tileMay'), new Date(iYear, 4, 1), "theme/img/may.jpg", "theme/img/may_header.jpg"],
				[oView.byId('tileJune'), new Date(iYear, 5, 1), "theme/img/june.png", "theme/img/june_header.jpg"],
				[oView.byId('tileJuly'), new Date(iYear, 6, 1), "theme/img/july.jpg", "theme/img/july_header.JPG"],
				[oView.byId('tileAugust'), new Date(iYear, 7, 1), "theme/img/august", "theme/img/März_Header.jpg"],
				[oView.byId('tileSeptember'), new Date(iYear, 8, 1), "theme/img/september", "theme/img/März_Header.jpg"],
				[oView.byId('tileOctober'), new Date(iYear, 9, 1), "theme/img/october", "theme/img/März_Header.jpg"],
				[oView.byId('tileNovember'), new Date(iYear, 10, 1), "theme/img/november", "theme/img/März_Header.jpg"],
				[oView.byId('tileDecember'), new Date(iYear, 11, 1), "theme/img/december", "theme/img/März_Header.jpg"]
			];

			for (var i = 0; i < this._aTiles.length; i++) {
				oTile = this._aTiles[i][0];
				oTileHeader = oTile.getHeader();
				oTileImage = oTile.getContent();
				oTileDate = this._aTiles[i][1];
				sTileImage = this._aTiles[i][2];
				sHeaderImage = this._aTiles[i][3];

				if (oTileDate < oCurrentDate) {
					oTileImage.setSrc(sTileImage);
					oTileHeader.setIconSrc(sHeaderImage);
				}
			}
		},

		_isActive: function (oTile) {
			var oCurrentDate = new Date();

			for (var i = 0; i < this._aTiles.length; i++) {
				if (this._aTiles[i][0] === oTile) {
					if (this._aTiles[i][1] < oCurrentDate) {
						return false;
					}
				}
			}

			return true;
		},

		_getTileIndex: function (oTile) {
			var iTileIndex = 0;

			for (var i = 0; i < this._aTiles.length; i++) {
				if (this._aTiles[i][0] === oTile) {
					break;
				}
				iTileIndex++;
			}

			return iTileIndex;
		},

		_executeTileAction: function (iTileIndex) {
			var oRouter = this.getOwnerComponent().getRouter();
			var oView = this.getView();

			switch (iTileIndex) {
				case 0:
					this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.january", this);
					oView.addDependent(this._oDialog);
					this._oDialog.open();
					break;
				case 1:
					this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february.february01", this);
					oView.addDependent(this._oDialog);
					this._oDialog.open();
					break;
				case 2:
					this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.march", this);
					oView.addDependent(this._oDialog);
					this._oDialog.open();
					break;
				case 3:
					this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.april", this);
					oView.addDependent(this._oDialog);
					this._oDialog.open();
					break;
				case 4:
					this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.may", this);
					oView.addDependent(this._oDialog);
					this._oDialog.open();
					break;
				case 5:
					this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.june", this);
					oView.addDependent(this._oDialog);
					this._oDialog.open();
					break;
				case 6:
					this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.july", this);
					oView.addDependent(this._oDialog);
					this._oDialog.open();
					break;
				case 7:
					break;
				case 8:
					break;
				case 9:
					break;
				case 10:
					break;
				case 11:
					break;
			}
		},

		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("home").attachMatched(this._onRouteMatched, this);
			this._initTiles();
			this._initModels();
		},

		onAfterRendering: function () {
		},

		onOkPress: function (oEvent) {
			var oView = this.getView();
			var aContent = oEvent.getSource().getParent().getContent()[0].getItems();
			var sUsername = aContent[0].getValue();
			var sPassword = aContent[1].getValue();

			if (sUsername === 'Becci&Oli' && sPassword === 'ichgebehiereinsuperlangesundsicheresPasswortein2021') {
			//if (sUsername === '' && sPassword === '') {
				this._oLoginDialog.close();
				this._oLoginDialog = null;
			} else {
				this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.idiot", this);
				oView.addDependent(this._oDialog);
				this._oDialog.open();
			}
		},

		onClosePress: function (oEvent) {
			if (this._oFebErrorDialog) {
				this._oFebErrorDialog.destroy();
				this._oFebErrorDialog = null;
			} else {
				this._oDialog.close();
				this._oDialog = null;
			}
		},

		onTilePress: function (oEvent) {
			var oView = this.getView();
			var oTileHeader = oEvent.getSource();
			var iTileIndex;

			if (!this._isActive(oTileHeader.getParent())) {
				iTileIndex = this._getTileIndex(oTileHeader.getParent());
				this._executeTileAction(iTileIndex);
			} else {
				this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.date", this);
				oView.addDependent(this._oDialog);
				this._oDialog.open();
			}

		},

		onLonelyPress: function (oEvent) {
			var oView = this.getView();
			this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.lonely", this);
			oView.addDependent(this._oDialog);
			this._oDialog.open();
		},

		onDoPress: function (oEvent) {
			var oView = this.getView();
			this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.do", this);
			oView.addDependent(this._oDialog);
			this._oDialog.open();
		},

		onFeb01NoPress: function (oEvent) {
			var oView = this.getView();

			this._oDialog.close();
			this._oDialog = null;

			this._oFebErrorDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february.february_error", this);
			oView.addDependent(this._oFebErrorDialog);
			this._oFebErrorDialog.open();
		},

		onFeb01YesPress: function (oEvent) {
			var oView = this.getView();

			this._oDialog.close();
			this._oDialog = null;

			this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february.february02", this);
			oView.addDependent(this._oDialog);
			this._oDialog.open();
		},

		onFeb02YesPress: function (oEvent) {
			var oView = this.getView();

			this._oDialog.close();
			this._oDialog = null;

			this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february.february03", this);
			oView.addDependent(this._oDialog);
			this._oDialog.open();
		},

		onFeb03YesPress: function (oEvent) {
			var oView = this.getView();
			var sCode = oEvent.getSource().getParent().getContent()[0].getItems()[1].getValue();

			if (sCode === "Geheimer Code") {
				this._oDialog.close();
				this._oDialog = null;

				this._oDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february", this);
				oView.addDependent(this._oDialog);
				this._oDialog.open();
				this._iErrorCounter = 0;
			} else {
				if (this._iErrorCounter == 0) {

					this._oFebErrorDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february.february_error02", this);
					this._oFebErrorDialog.getContent()[0].getItems()[0].setSrc("theme/img/feb_error04.gif");
					oView.addDependent(this._oFebErrorDialog);
					this._oFebErrorDialog.open();

					this._iErrorCounter++;
				} else if (this._iErrorCounter == 1) {
					this._oFebErrorDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february.february_error02", this);
					this._oFebErrorDialog.getContent()[0].getItems()[0].setSrc("theme/img/feb_error03.gif");
					oView.addDependent(this._oFebErrorDialog);
					this._oFebErrorDialog.open();

					this._iErrorCounter++;
				} else if (this._iErrorCounter >= 2) {
					this._oFebErrorDialog = sap.ui.xmlfragment("chris.calendar.view.fragments.february.february_error02", this);
					this._oFebErrorDialog.getContent()[0].getItems()[0].setSrc("theme/img/feb_error02.gif");
					oView.addDependent(this._oFebErrorDialog);
					this._oFebErrorDialog.open();

					this._iErrorCounter++;
				}
			}


		},

		onCloseFebPress: function (oEvent) {
			this._oFebErrorDialog.destroy();
			this._oFebErrorDialog = null;
		},

		onFeb03OPress: function () {

			if (this._iCounter >= 3) {
				MessageToast.show("Geheimer Code")
				this._iCounter = 0;
			} else {
				this._iCounter++;
			}
		}
	});
});