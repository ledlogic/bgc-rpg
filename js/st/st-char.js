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
	skills: [],
	everymanskills: [],

	init: function() {
		st.log("char.init");
	},
	reset: function() {
		st.log("char.reset");
		var that = st.char;
		that.spec = [];
		that.spec.stats = [];
		that.spec.derivedstats = [];
		that.spec.skills = [];
		that.spec.talents = [];
		that.spec.points = [];
		that.spec.points.stats = 50;

		var talents = Math.max(Math.min(Math.floor(st.math.dieN(40) / 3.0), 10), 2);

		that.spec.points.talents = talents * 3;
		that.spec.points.skills = 40 - talents * 3;
		that.spec.points.campaign = that.spec.points.skills + that.spec.points.talents;
		that.spec.points.complication = 0;
		that.spec.points.total = that.spec.points.stats
							   + that.spec.points.campaign
							   + that.spec.points.complication;
	},
	random: function() {
		st.log("char.random");
		var that = st.char;
		var data = st.data;
		that.reset();

		that.spec.personality = data.personalities[st.math.dieArray(data.personalities)];
		//st.log(["personality",that.spec.personality]);

		that.spec.valuesWho = data.valuesWho[st.math.dieArray(data.valuesWho)];
		//st.log(["valuesWho",that.spec.valuesWho]);

		that.spec.valuesWhat = data.valuesWhat[st.math.dieArray(data.valuesWhat)];
		//st.log(["valuesWhat",that.spec.valuesWhat]);

		that.spec.worldview = data.worldviews[st.math.dieArray(data.worldviews)];
		//st.log(["worldview",that.spec.worldview]);
		
		that.spec.earlybackground = data.earlybackgrounds[st.math.dieArray(data.earlybackgrounds)];
		//st.log(["earlybackground",that.spec.earlybackground]);
		
		that.calcChildhoodEvent();
		//st.log(["childhoodevent",that.spec.childhoodevent]);
		
		that.calcAge();
		//st.log(["age",that.spec.age]);

		var years = that.spec.age - 16;
		//st.log(["years",years]);

		that.spec.complications = [];

		that.spec.events = [];
		for (var i=0; i<years; i++) {
			that.calcLifeevent();
		}
		//st.log(["lifeevents",that.spec.lifeevents]);

		that.spec.currentsituation = data.currentsituations[st.math.dieArray(data.currentsituations)];
		//st.log(["currentsituation",that.spec.currentsituation]);

		that.spec.currentoutlook = data.currentoutlooks[st.math.dieArray(data.currentoutlooks)];
		//st.log(["currentoutlook",that.spec.currentoutlook]);

		that.calcStats();
		//st.log(["stats",that.spec.stats]);

		that.calcDerivedstats();
		//st.log(["derivedstats",that.spec.derivedstats]);

		that.calcSkills();
		//st.log(["skills",that.spec.skills]);

		that.calcTalents();
		st.log(["talents",that.spec.talents]);

		st.render.render();
	},
	calcChildhoodEvent: function() {
		var that = st.char;
		var data = st.data;
		var r = st.math.dieN(6);
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
				var r2 = st.math.dieArray(data.childhoodevents);
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
				that.spec.childhoodevent = (prefix + " " + data.childhoodevents[r2] + " " + suffix).trim();
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
				evt += "Falsely Accused: You were set up, and now face arrest or worse.";
				that.spec.complications.push("ENEMY");
				break;
			case 6:
				var d = st.math.dieN(10);
				evt += "Windfall: Your financial ship just came in, ¥" + d * 10000 + ".";
				break;
			case 7:
				evt += "Accident or injury: You were in some kind of terrible accident or maimed in some other way.";
				that.spec.complications.push("PSYCHOLOGICAL");
				break;
			case 8:
				evt += "Hunted: You incurred the wrath of a powerful person, family, or group.";
				that.spec.complications.push("ENEMY");
				break;
			case 9:
				evt += "Mental or Physical Illness.";
				var d = st.math.dieN(2);
				if (d == 1) {
					that.spec.complications.push("PHYSIOLOGICAL");
				} else {
					that.spec.complications.push("PSYCHOLOGICAL");
				}
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
		var data = st.data;
		var evt = "Friends & Enemies: ";
		evt += data.friendsenemies[st.math.dieArray(data.friendsenemies)];
		that.addEvent(evt);
	},
	calcLoveAndWar: function() {
		var that = st.char;
		var data = st.data;
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
				var index = st.math.dieArray(data.lovewar);
				evt += data.lovewar[index];
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
				//st.log(["lovewar",that.spec.lovewar]);
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
		var data = st.data;

		for (var i=0;i<data.stats.length;i++) {
			var stat = data.stats[i];
			that.spec.stats[stat.abb] = 0;
		}

		for (var i=0;i<that.spec.points.stats;i++) {
			var r = st.math.dieArray(data.stats);
			var stat = data.stats[r];
			that.spec.stats[stat.abb]++;
		}
	},
	calcDerivedstats: function() {
		var that = st.char;
		var data = st.data;
		var derivedstats = that.spec.derivedstats;
		for (var i=0;i<data.derivedstats.length;i++) {
			var derivedstat = data.derivedstats[i];
			derivedstats[derivedstat.abb] = 0;
		}

		derivedstats["END"] = that.spec.stats["CON"] * 10;
		derivedstats["HITS"] = that.spec.stats["BODY"] * 5;
		derivedstats["RUN"] = that.spec.stats["MOVE"] * 3;
		derivedstats["LEAP"] = Math.round(that.spec.stats["MOVE"] * 0.5);
		derivedstats["SWIM"] = Math.round(that.spec.stats["MOVE"]);
		derivedstats["LUC"] = that.spec.stats["INT"] + that.spec.stats["REF"];
		derivedstats["PUN"] = that.spec.stats["STR"] + "d6";
		derivedstats["KICK"] = (that.spec.stats["STR"]+1) + "d6";
		derivedstats["PD"] = that.spec.stats["CON"] * 2;
		derivedstats["REC"] = that.spec.stats["STR"] + that.spec.stats["CON"];
		derivedstats["RES"] = that.spec.stats["WILL"] * 3;
		derivedstats["STUN"] = that.spec.stats["BODY"] * 5;

		derivedstats["MAX"] = st.char.str[that.spec.stats["STR"]];
		derivedstats["LIFT"] = Math.round(data.str[that.spec.stats["STR"]] * 0.5);
		derivedstats["CARRY"] = Math.round(data.str[that.spec.stats["STR"]] * 0.25);
		derivedstats["THROW"] = that.spec.stats["BODY"] * 2;
		derivedstats["HITS"] = that.spec.stats["BODY"] * 5;
	},
	calcSkills: function() {
		var that = st.char;
		var data = st.data;

		// everyman
		for (var i=0;i<data.everymanskills.length;i++) {
			var skill = data.everymanskills[i];
			that.spec.skills[skill] = 1;
		}

		var max = that.spec.points.skills;
		for (var i=0; i<max; i++) {
			var r = st.math.dieN(2);
			if (i > 1 && r == 2) {
				that.incrExistingSkill();
			} else {
				that.incrRandomSkill();
			}
			//kspend ++;
			//st.log("skill[" + kspend + "]");
		}
		that.spec.skills = st.utils.sortObject(that.spec.skills);
	},
	incrRandomSkill: function() {
		//st.log("char.incrRandomSkill");
		var that = st.char;
		var data = st.data;

		var r = st.math.dieArray(data.skills);
		var skill = data.skills[r];
		if (typeof that.spec.skills[skill.skill] == "undefined") {
			that.spec.skills[skill.skill] = 1;
		} else {
			that.spec.skills[skill.skill]++;
		}
	},
	incrExistingSkill: function() {
		//st.log("char.incrExistingSkill");
		var that = st.char;
		var obj = that.spec.skills;
		var keys = Object.keys(obj);
		var r = st.math.dieN(keys.length) - 1;
		var k = keys[r];
		that.spec.skills[k]++;
	},
	calcTalents: function() {
		var that = st.char;
		var data = st.data;

		for (var i=0; i<that.spec.points.talents; i+=3) {
			var r = st.math.dieArray(data.talents);
			var talent = data.talents[r];
			if (that.spec.talents.indexOf(talent.talent) > -1) {
				i-=3;
			} else {
				//tspend += 3;
				//st.log("talent[" + talent.talent + tspend + "]");
				that.spec.talents.push(talent.talent);
			}
		}
		st.utils.sortArr(that.spec.talents);
	},

};

//var tspend = 0;
//var kspend = 0;