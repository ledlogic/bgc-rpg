/* st-char.js */

st.char = {
	spec: {},
	personalities: [],
	valuesWho: [],
	valuesWhat: [],
	worldviews: [],
	earlybackgrounds: [],
	childhoodevents: [],
	friendsenemies: [],
	lovewar: [],
	currentsituations: [],
	currentoutlooks: [],
	stats: [],
	derivedstats: [],
	str: [],

	init: function() {
		st.log("init character");
		var that = st.char;
		that.loadPersonalities();
		that.loadValuesWho();
		that.loadValuesWhat();
		that.loadWorldviews();
		that.loadEarlybackgrounds();
		that.loadChildhoodevents();
		that.loadFriendsenemies();
		that.loadLovewar();
		that.loadCurrentsituations();
		that.loadCurrentoutlooks();
		that.loadStats();
		that.loadDerivedstats();
		that.loadStr();
	},
	reset: function() {
		st.log("char.reset");
		var that = st.char;
		that.spec = {};
		that.spec.stats = {};
		that.spec.derivedstats = {};
	},
	random: function() {
		st.log("char.random");
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

		that.spec.currentsituation = that.currentsituations[st.math.dieArray(that.currentsituations)];
		st.log(["currentsituation",that.spec.currentsituation]);

		that.spec.currentoutlook = that.currentoutlooks[st.math.dieArray(that.currentoutlooks)];
		st.log(["currentoutlook",that.spec.currentoutlook]);

		that.calcStats();
		st.log(["stats",that.spec.stats]);

		that.calcDerivedstats();
		st.log(["derivedstats",that.spec.derivedstats]);

		st.render.render();
	},
	loadTxt: function(url, spec) {
		var that = st.char;
		$.ajax({url: url,
				async: false})
			.done(function(data, status, jqxhr) {
				that[spec] = data.trim().split("\n");
				st.log([spec,that[spec]]);
			})
			.fail(function() {
				alert("Error: unable to load personalities.");
			})
			.always(function() {
			});
	},
	loadPersonalities: function() { 
		var that = st.char;
		that.loadTxt("data/personalities.txt","personalities");
	},
	loadValuesWho: function() {
		var that = st.char;
		that.loadTxt("data/values-who.txt","valuesWho");
	},
	loadValuesWhat: function() {
		var that = st.char;
		that.loadTxt("data/values-what.txt","valuesWhat");
	},
	loadWorldviews: function() {
		var that = st.char;
		that.loadTxt("data/worldviews.txt","worldviews");
	},
	loadEarlybackgrounds: function() {
		var that = st.char;
		that.loadTxt("data/earlybackgrounds.txt","earlybackgrounds");
	},
	loadChildhoodevents: function() {
		var that = st.char;
		that.loadTxt("data/childhoodevents.txt","childhoodevents");
	},
	loadFriendsenemies: function() {
		var that = st.char;
		that.loadTxt("data/friendsenemies.txt","friendsenemies");
	},
	loadLovewar: function() {
		var that = st.char;
		that.loadTxt("data/lovewar.txt","lovewar");
	},
	loadCurrentsituations: function() {
		var that = st.char;
		that.loadTxt("data/currentsituations.txt","currentsituations");
	},
	loadCurrentoutlooks: function() {
		var that = st.char;
		that.loadTxt("data/currentoutlooks.txt","currentoutlooks");
	},
	loadStats: function() {
		st.log("char.loadStats");
		var that = st.char;

		Papa.parse("data/stats.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.char.charResponse("stats", d);
			},
			encoding: "UTF-8"
		});
	},
	loadDerivedstats: function() {
		st.log("char.loadDerivedstats");
		var that = st.char;

		Papa.parse("data/derivedstats.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.char.charResponse("derivedstats", d);
			},
			encoding: "UTF-8"
		});
	},
	loadStr: function() {
		st.log("char.loadStr");
		var that = st.char;

		Papa.parse("data/str.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.char.strResponse(d);
			},
			encoding: "UTF-8"
		});
	},
	charResponse: function(type, d) {
		st.log("char.charResponse, type[" + type + "], d[" + d + "]");
		for (var i=0;i<d.data.length; i++) {
			st.char.addStat(type, d.data[i]);
		}
		st.log(["st.char." + type,st.char[type]]);
	},
	strResponse: function(d) {
		st.log("char.strResponse, d[" + d + "]");
		for (var i=0;i<d.data.length; i++) {
			st.char.str[d.data[i]["STR"]] = d.data[i]["Lift"];
		}
		st.log(["st.char.str", st.char.str]);
	},
	addStat: function(type, d) {
		var s = {
			"stat": d["Statistic"], 
			"abb": d["Abbreviation"],
			"desc": d["Description"]
		};
		st.char[type].push(s);
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
		var evt = "Good with the Bad: ";
		switch (r) {
			case 1:
				var d = st.math.dieN(10);
				evt += "Financial loss or debt: you've lost ¥" + d * 10000 + ".  If you can't play it now, you have a debt to pay, in money or blood.";
				break;
			case 2:
				evt += "Make a powerful connection: A local power player (warlord, official, noble, whatever) befriends yo.  Gain one free Level 3 Favor.";
				break;
			case 3:
				var lvl = Math.ceil(st.math.dieN(6) / 2.0);
				evt += "Mentor: You gained a teach or mentor in your life.  This person has taught you one new skill up to a level of " + lvl + ".";
				break;
			case 4:
				var d = st.math.dieN(10);
				evt += "Imprisonment: You have been exilied, imprisoned or held hostage (your choice) for " + d + " year" + (d > 1 ? "s" : "") + ".  A good place for a PSYCHOLOGICAL complication.";
				break;
			case 5:
				evt += "Falsely Accused: You were set up, and now face arrest or worse.  A good place for an ENEMY complication.";
				break;
			case 6:
				var d = st.math.dieN(10);
				evt += "Windfall: Your financial ship just came in, ¥" + d * 10000 + ".";
				break;
			case 7:
				evt += "Accident or injury: You were in some kind of terrible accident or maimed in some other way.  A good place for a PHYSIOLOGICAL complication.";
				break;
			case 8:
				evt += "Hunted: You incurred the wrath of a powerful person, family, or group.  A good place for an ENEMY complication.";
				break;
			case 9:
				evt += "Mental or Physical Illness: You were struck down by a severe PHYSIOLOGICAL illness or PSYCHOLOGICAL complication.";
				break;
			case 10:
				evt += "Emotional Loss: You lost someone you really cared about. ";
				var d = st.math.dieN(10);
				switch (true) {
					case d < 4:
						evt += "They were murdered.";
						break;
					case d < 8:
						evt += "They died by accident or illness.";
						break;
					default:
						evt += "They vanished, killed themselves or just up and left without any explanation.";
						break;
				}
				break;
		}
		that.addEvent(evt);
	},
	calcFriendsAndEnemies: function() {
		var that = st.char;
		var evt = "Friends & Enemies: ";
		evt += that.friendsenemies[st.math.dieArray(that.friendsenemies)];
		that.addEvent(evt);
	},
	calcLoveAndWar: function() {
		var that = st.char;
		var r = st.math.dieN(10);
		var evt = "Love & War: ";
		switch (r) {
			case 1:
			case 2:
			case 3:
			case 4:
				evt += "Happy love affair: 'Nuff said.";
				break;
			case 5:
			case 6:
				evt += "Nothing serious: 'Nuff said.";
				break;
			default:
				var index = st.math.dieArray(that.lovewar);
				evt += that.lovewar[index];
				if (index === 3) {
					var w = st.math.dieN(3);
					switch (w) {
						case 1:
							evt += " It's a boy!";
							break;
						case 2:
							evt += " It's a girl!";
							break;
						case 2:
							evt += " It's a baby!";
							break;
					}
				}
				st.log(["lovewar",that.spec.lovewar]);
				break;
		}
		that.addEvent(evt);
	},
	addEvent: function(evt) {
		var that = st.char;
		if (!that.spec.events) {
			that.spec.events = [];
		}
		that.spec.events.push(evt);
	},
	calcStats: function() {
		var that = st.char;

		for (var i=0;i<that.stats.length;i++) {
			var stat = that.stats[i];
			that.spec.stats[stat.abb] = 0;
		}

		var max = 60;
		for (var i=0;i<max;i++) {
			var r = st.math.dieArray(that.stats);
			var stat = that.stats[r];
			that.spec.stats[stat.abb]++;
		}
	},
	calcDerivedstats: function() {
			var that = st.char;
			var derivedstats = that.spec.derivedstats;
		for (var i=0;i<that.derivedstats.length;i++) {
			var derivedstat = that.derivedstats[i];
			derivedstats[derivedstat.abb] = 0;
		}

		derivedstats["END"] = that.spec.stats["CON"] * 10;
		derivedstats["HITS"] = that.spec.stats["BODY"] * 5;
		derivedstats["RUN"] = that.spec.stats["MOVE"] * 3;
		derivedstats["LEAP"] = Math.round(that.spec.stats["MOVE"] * 0.5);
		derivedstats["SWIM"] = Math.round(that.spec.stats["MOVE"]);
		derivedstats["LUCK"] = that.spec.stats["INT"] + that.spec.stats["REF"];
		derivedstats["PD"] = that.spec.stats["CON"] * 2;
		derivedstats["REC"] = that.spec.stats["STR"] + that.spec.stats["CON"];
		derivedstats["RES"] = that.spec.stats["WILL"] * 3;
		derivedstats["STUN"] = that.spec.stats["BODY"] * 5;
	}
};