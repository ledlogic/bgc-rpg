/* st-char.js */

st.char = {
	spec: {},
	personalities: [],
	valuesWho: [],
	valuesWhat: [],
	worldviews: [],
	earlybackgrounds: [],
	childhoodevents: [],

	init: function() {
		st.log("init character");
		var that = st.char;
		that.loadPersonalities();
		that.loadValuesWho();
		that.loadValuesWhat();
		that.loadWorldviews();
		that.loadEarlybackgrounds();
		that.loadChildhoodevents();
	},
	reset: function() {
		var that = st.char;
		that.spec = {};
	},
	random: function() {
		var that = st.char;
		that.reset();

		that.spec.personality = that.personalities[st.math.dieArray(that.personalities)];
		st.log(["personality",that.spec.personality]);

		that.spec.valuesWho = that.valuesWho[st.math.dieArray(that.valuesWho)];
		st.log(["valuesWho",that.spec.valuesWho]);

		that.spec.valuesWhat = that.valuesWhat[st.math.dieArray(that.valuesWhat)];
		st.log(["valuesWhat",that.spec.valuesWhat]);

		that.spec.worldview = that.worldviews[st.math.dieArray(that.worldviews)];
		st.log(["worldview",that.spec.worldview]);
		
		that.spec.earlybackground = that.earlybackgrounds[st.math.dieArray(that.earlybackgrounds)];
		st.log(["earlybackground",that.spec.earlybackground]);
		
		that.calcChildhoodEvent();
		st.log(["childhoodevent",that.spec.childhoodevent]);
		
		that.calcAge();
		st.log(["age",that.spec.age]);

		var years = that.spec.age - 16;
		st.log(["years",years]);

		that.spec.events = [];
		for (var i=0; i<years; i++) {
			that.calcLifeevent();
		}
		st.log(["lifeevents",that.spec.lifeevents]);

		that.render();
	},
	loadPersonalities: function() {
		var that = st.char;
		$.ajax({url: "data/personalities.txt",
				async: false})
			.done(function(data, status, jqxhr) {
				that.personalities = data.trim().split("\n");
				st.log(["personalities",that.personalities]);
			})
			.fail(function() {
				alert("Error: unable to load personalities.");
			})
			.always(function() {
			});
	},
	loadValuesWho: function() {
		var that = st.char;
		$.ajax({url: "data/values-who.txt",
				async: false})
			.done(function(data, status, jqxhr) {
				that.valuesWho = data.trim().split("\n");
				st.log(["valuesWho",that.valuesWho]);
			})
			.fail(function() {
				alert("Error: unable to load values-who.");
			})
			.always(function() {
			});
	},
	loadValuesWhat: function() {
		var that = st.char;
		$.ajax({url: "data/values-what.txt",
				async: false})
			.done(function(data, status, jqxhr) {
				that.valuesWhat = data.trim().split("\n");
				st.log(["valuesWhat",that.valuesWhat]);
			})
			.fail(function() {
				alert("Error: unable to load values-what.");
			})
			.always(function() {
			});
	},
	loadWorldviews: function() {
		var that = st.char;
		$.ajax({url: "data/worldviews.txt",
				async: false})
			.done(function(data, status, jqxhr) {
				that.worldviews = data.trim().split("\n");
				st.log(["worldviews",that.worldviews]);
			})
			.fail(function() {
				alert("Error: unable to load worldviews.");
			})
			.always(function() {
			});
	},
	loadEarlybackgrounds: function() {
		var that = st.char;
		$.ajax({url: "data/earlybackgrounds.txt",
				async: false})
			.done(function(data, status, jqxhr) {
				that.earlybackgrounds = data.trim().split("\n");
				st.log(["earlybackgrounds",that.earlybackgrounds]);
			})
			.fail(function() {
				alert("Error: unable to load early backgrounds.");
			})
			.always(function() {
			});
	},
	loadChildhoodevents: function() {
		var that = st.char;
		$.ajax({url: "data/childhoodevents.txt",
				async: false})
			.done(function(data, status, jqxhr) {
				that.childhoodevents = data.trim().split("\n");
				st.log(["childhoodevents",that.childhoodevents]);
			})
			.fail(function() {
				alert("Error: unable to load early childhoodevents.");
			})
			.always(function() {
			});
	},
	calcChildhoodEvent: function() {
		var that = st.char;
		var r = st.math.dieN(10);
		switch (true) {
			case r<7:
				that.spec.childhoodevent = "Boring childhood";
				break;
			default:
				var w = st.math.dieN(6);
				var prefix = "";
				var suffix = "";
				switch (true) {
					case w < 4:
						prefix = "One or some family members were";
						break;
					default:
						prefix = "Your entire family was";
						break;
				}
				var r2 = st.math.dieArray(that.childhoodevents);
				if (r2 === 7) {
					var r3 = st.math.dieN(10);			
					switch (true) {
						case w < 6:
							var y = st.math.dieN(10);
							suffix = "They were imprisoned for " + y + " year" + (y>1 ? "s" : "") + ".";
							break;
						default:
							suffix = "They escaped imprisonment but are still under the gun.";
							break;
					}
				}
				that.spec.childhoodevent = (prefix + " " + that.childhoodevents[r2] + " " + suffix).trim();
				break;
		}
	},
	calcAge: function() {
		var that = st.char;
		var age = st.math.die(1, 10, 16);
		that.spec.age = age;
	},
	calcLifeevent: function() {
		var that = st.char;
		var r = st.math.dieN(6);
		switch (r) {
			case 1:
			case 2:
				that.calcGoodWithTheBad();
				break;
			case 3:
			case 4:
				that.calcFriendsAndEnemies();
				break;
			case 5:
				that.calcLoveAndWar();
				break;
		}
	},
	calcGoodWithTheBad: function() {
		var that = st.char;
		var r = st.math.dieN(10);
		var evt = null;
		switch (r) {
			case 1:
				var d = st.math.dieN(10);
				evt = "Financial loss or debt: you've lost ¥" + d * 10000 + ".  If you can't play it now, you have a debt to pay, in money or blood.";
				break;
			case 2:
				evt = "Make a powerful connection: A local power player (warlord, official, noble, whatever) befriends yo.  Gain one free Level 3 Favor.";
				break;
			case 3:
				var lvl = Math.ceil(st.math.dieN(6) / 2.0);
				evt = "Mentor: You gained a teach or mentor in your life.  This person has taught you one new skill up to a level of " + lvl + ".";
				break;
			case 4:
				var d = st.math.dieN(10);
				evt = "Imprisonment: You have been exilied, imprisoned or held hostage (your choice) for " + d + " year" + (d > 1 ? "s" : "") + ".  A good place for a PSYCHOLOGICAL complication.";
				break;
			case 5:
				evt = "Falsely Accused: You were set up, and now face arrest or worse.  A good place for an ENEMY complication.";
				break;
			case 6:
				var d = st.math.dieN(10);
				evt = "Windfall: Your financial ship just came in, ¥" + d * 10000 + ".";
				break;
			case 7:
				evt = "Accident or injury: You were in some kind of terrible accident or maimed in some other way.  A good place for a PHYSIOLOGICAL complication.";
				break;
			case 8:
				evt = "Hunted: You incurred the wrath of a powerful person, family, or group.  A good place for an ENEMY complication.";
				break;
			case 9:
				evt = "Mental or Physical Illness: You were struck down by a severe PHYSIOLOGICAL illness or PSYCHOLOGICAL complication.";
				break;
			case 10:
				var d = st.math.dieN(10);
				switch (true) {
					case d < 4:
						s = "They were murdered.";
						break;
					case d < 8:
						s = "They died by accident or illness.";
						break;
					default:
						s = "They vanished, killed themselves or just up and left without any explanation.";
						break;
				}
				evt = "Emotional Loss: You lost someone you really cared about. " + s;
				break;
		}
		that.addEvent(evt);
	},
	calcFriendsAndEnemies: function() {
		var that = st.char;
		var r = st.math.dieN(10);
	},
	calcLoveAndWar: function() {
		var that = st.char;
		var r = st.math.dieN(10);
	},
	addEvent: function(evt) {
		var that = st.char;
		if (!that.spec.events) {
			that.spec.events = [];
		}
		that.spec.events.push(evt);
	},
	render: function() {
		st.log("rendering char");
		var that = st.char;
		that.renderSpec();
		$(".st-page").removeClass("st-initial-state");
	},
	renderSpec: function() {
		st.log("rendering spec");
		var that = st.char;

		that.spec.eventsHtml = that.spec.events.join("<br/>");
		
		var h = "<tr><th colspan=\"2\">Lifepath Notes</th>"
			  + "<tr><td class=\"st-tb-lbl\">Age</td><td><%- age %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Values - people</td><td><%- valuesWho %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Values - things</td><td><%- valuesWhat %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Early Background</td><td><%- earlybackground %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Personality</td><td><%- personality %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Childhood Event</td><td><%- childhoodevent %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Life Event</td><td><%= eventsHtml %></td></tr>"
		;
		var template = _.template(h);
		var t = "<table class=\"st-tb\"><tbody>" + template(that.spec) + "</tbody></table>";		
		$(".st-page-ft").html(t);
	},
	renderReset: function() {
		st.char.$pageft.html("");
	}
};