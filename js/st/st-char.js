/* st-char.js */

st.char = {
	spec: {},

	MIN_AGE: 16,
	MAX_TALENTS: 3,
	MAX_SKILLS: 20,

	init: function() {
		st.log("char.init");
	},
	reset: function() {
		st.log("char.reset");
		var that = st.char;
		that.spec = {};
		that.spec.points = {};
		that.spec.stats = {};
		that.spec.derivedstats = {};
		that.spec.skills = [];
		that.spec.talents = [];
		that.spec.complications = [];
		that.spec.weapons = [];

		// calculated mean stat points for all characters in television show
		that.spec.points.stats = 0;
		that.spec.points.skills = 0;
		that.spec.points.talents = 0;
		that.spec.points.campaign = 0;
		that.spec.points.complications = 0;
		that.spec.points.weapons = 0;
		that.spec.points.total = 0;
	},
	random: function() {
		st.log("random");

		var that = st.char;
		var data = st.data;
		that.reset();

		that.spec.personality = data.personalities[st.math.dieArray(data.personalities)];
		that.spec.valuesWho = data.valuesWho[st.math.dieArray(data.valuesWho)];
		that.spec.valuesWhat = data.valuesWhat[st.math.dieArray(data.valuesWhat)];
		that.spec.worldview = data.worldviews[st.math.dieArray(data.worldviews)];
		that.spec.earlybackground = data.earlybackgrounds[st.math.dieArray(data.earlybackgrounds)];
		that.spec.currentsituation = data.currentsituations[st.math.dieArray(data.currentsituations)];
		that.spec.currentoutlook = data.currentoutlooks[st.math.dieArray(data.currentoutlooks)];

		that.calcChildhoodEvent();
		that.calcAge();
		that.calcLifeevents();
		that.calcComplications();

		// calcPoints must come after complications
		that.calcPoints();

		that.calcWeapons();
		that.calcStats();
		that.calcDerivedstats();
		that.calcTemplate();
		that.calcSkills();
		that.calcTalents();

		st.render.render();
	},
	calcPoints: function() {
		st.log("calcStats");

		var that = st.char;
		var data = st.data;

		if (that.spec.points.complications < -20) {
			that.spec.points.weapons = 20;
		}
		if (that.spec.points.complications < -10) {
			that.spec.points.weapons = 10;
		} 
		if (that.spec.points.complications < -5) {
			that.spec.points.weapons = 5;
		}

		that.spec.points.stats = 50;
		that.spec.points.complicationsToTalents = ((-that.spec.points.complications * Math.random() * 0.5) / 3 >> 0) * 3;
		that.spec.points.complicationsToSkills = -that.spec.points.complications - that.spec.points.complicationsToTalents;
		that.spec.points.skills = 65 + that.spec.points.complicationsToSkills;
		that.spec.points.talents = that.spec.points.complicationsToTalents;
		that.spec.points.campaign = that.spec.points.skills
			+ that.spec.points.talents;
		that.spec.points.total = that.spec.points.stats
			+ that.spec.points.campaign
			+ that.spec.points.complications;
	},
	calcChildhoodEvent: function() {
		var that = st.char;
		var data = st.data;

		var r = st.math.dieN(10);
		switch (true) {
			case r <= 6:
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
		st.log("calcAge");
		var that = st.char;

		var age = st.math.die(1, 7, 16);
		that.spec.age = age;
	},
	calcLifeevents: function() {
		var that = st.char;

		var years = that.spec.age - that.MIN_AGE;
		that.spec.events = [];
		for (var i=0; i<years; i++) {
			that.calcLifeevent();
		}
		that.spec.events.sort();
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
				evt += "Imprisonment: You have been exilied, imprisoned or held hostage (your choice) for " + d + " year" + (d > 1 ? "s" : "") + ".";
				that.spec.complications.push("PSYCHOLOGICAL");
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
				break;
		}
		that.addEvent(evt);
	},
	addEvent: function(evt) {
		var that = st.char;
		if (!that.spec.events) {
			that.spec.events = [];
		}
		if (!_.contains(that.spec.events, evt)) {
			that.spec.events.push(evt);
		}
	},
	calcStats: function() {
		st.log("calcStats");
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
		st.log("calcDerivedstats");
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
		derivedstats["SD"] = that.spec.stats["CON"] * 2;
		derivedstats["KD"] = that.spec.stats["CON"] * 2;
		derivedstats["REC"] = that.spec.stats["STR"] + that.spec.stats["CON"];
		derivedstats["RES"] = that.spec.stats["WILL"] * 3;
		derivedstats["STUN"] = that.spec.stats["BODY"] * 5;

		derivedstats["MAX"] = st.data.str[that.spec.stats["STR"]];
		derivedstats["LIFT"] = Math.round(data.str[that.spec.stats["STR"]] * 0.5);
		derivedstats["CARRY"] = Math.round(data.str[that.spec.stats["STR"]] * 0.25);
		derivedstats["THROW"] = that.spec.stats["BODY"] * 2;
		derivedstats["THROWDIST"] = that.spec.stats["STR"] * 10;
		derivedstats["HITS"] = that.spec.stats["BODY"] * 5;

		derivedstats["X"] = (derivedstats["HITS"] / 5) + that.spec.stats["DEX"];
	},
	calcTemplate: function() {
		st.log("calcTemplate");

		var that = st.char;
		var data = st.data;

		var template = data.templates[st.math.dieArray(data.templates)];
		st.log("chose template[" + template.name + "]");
		that.spec.template = template.name;
	},
	calcSkills: function() {
		var that = st.char;
		var data = st.data;

		// everyman
		var everymanAdjustment = 2;
		that.spec.points.everymanskillstotal = 0;
		for (var i=0; i<data.everymanskills.length; i++) {
			var skill = data.everymanskills[i];
			that.spec.skills[skill] = everymanAdjustment;
			that.spec.points.everymanskillstotal += everymanAdjustment;
		}

		for (var i=0; i<that.spec.points.skills; i++) {
			var r = st.math.dieN(10);
			var skillSize = st.utils.mapSize(that.spec.skills);
			if ((skillSize >= that.MAX_SKILLS) || (r > 6)) {
				that.incrExistingSkill();
			} else {
				that.incrRandomSkill();
			}
		}
		that.spec.skills = st.utils.sortObject(that.spec.skills);
	},
	incrRandomSkill: function() {
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
		var that = st.char;
		var obj = that.spec.skills;
		var keys = Object.keys(obj);
		var r = st.math.dieN(keys.length) - 1;
		var k = keys[r];
		that.spec.skills[k]++;
	},
	calcTalents: function() {
		st.log("calcTalents");
		var that = st.char;
		var data = st.data;

		for (var i=0; i<that.spec.points.complicationsToTalents; i+=3) {
			var r = st.math.dieArray(data.talents);
			var talent = data.talents[r];
			var spec = that.findTalentSpec(talent.talent);
			if (spec != null) {
				spec.ranks++;
			} else {
				if (_.size(that.spec.talents) >= that.MAX_TALENTS) {
					i -= 3
				} else {
					var spec = {
						talent: talent.talent,
						ranks: 1
					};
					that.spec.talents.push(spec);
				}
			}
		}
		that.spec.talents = _.sortBy(that.spec.talents, function(talent) { 
			return talent.talent; 
		});
	},
	findTalentSpec: function(talent) {
		var that = st.char;
		var r = _.find(that.spec.talents,
			function(spec) { if (spec.talent == talent) { return spec; } });
		return r;
	},
	// calcualate complications up to the amount in the value complication
	// return the final computation
	calcComplications: function() {
		st.log("calcComplications");
		var that = st.char;
		var data = st.data;

		that.spec.points.complications = 0;

		var complications = [];
		var complicationPoints = 5 * Math.max((st.math.dieN(4) - 1), that.spec.complications.length);
		
		for (var i=0; -that.spec.points.complications < complicationPoints; i++) {
			var complication = null;
			var complicationType = "";

			if (i<that.spec.complications.length) {
				complicationType = that.spec.complications[i];
				complication = data.findComplicationOfType(complicationType);
				complicationType = complication.complicationType;
			} else {
				var r = st.math.dieArray(data.complications);
				complication = data.complications[r];
				complicationType = complication.complicationType;
			}
			if (complication) {
				var spec = {};
				var points = 0;
				if (complicationType == "ENEMY") {
					// enemy spec
					var capabilities = 5 * st.math.dieN(4);
					var extent = 5 * st.math.dieN(3);
					var intensity = st.math.dieN(3);
					var intensityCoefficient = 0;
					switch (intensity) {
						case 1:  
							intensityCoefficient = 0.2;
							break;
						case 2:
							intensityCoefficient = 0.5;
							break;
						case 3:
							intensityCoefficient = 1.0;
							break;
					}
					points = Math.round((intensityCoefficient * (capabilities + extent)));
					spec = {
						complicationType: complicationType,
						complication: "Enemy",
						capabilities: capabilities,
						extent: extent,
						intensity: intensityCoefficient,
						points: points
					}
				} else {
					// standard spec
					var frequency = 5 * st.math.dieN(3);
					var maxIntensity = 4;
					if (!complication.extreme) {
						maxIntensity = 3;
					}
					if (!complication.severe) {
						maxIntensity = 2;
					}
					if (!complication.strong) {
						maxIntensity = 1;
					}
					var intensity = 5 * st.math.dieN(maxIntensity);
					var importance = st.math.dieN(3);
					var importanceCoefficient = 0;
					switch (importance) {
						case 1:  
							importanceCoefficient = 0.2;
							break;
						case 2:
							importanceCoefficient = 0.5;
							break;
						case 3:
							importanceCoefficient = 1.0;
							break;
					}
					points = Math.round((importanceCoefficient * (frequency + intensity)));
					spec = {
						complicationType: complicationType,
						complication: complication.complication,
						intensity: intensity,
						frequency: frequency,
						importance: importanceCoefficient,
						points: points
					}
				}
				complications.push(spec);
				that.spec.points.complications -= spec.points;
			} else {
				st.log("Could not find complication of complicationType[" + complicationType + "]");
			}
		}
		that.spec.complications = _.sortBy(complications, function(complication) { 
            return complication.complicationType + ":" + complication.complication; 
		});
	},
	calcWeapons: function() {
		st.log("calcWeapons");
		var that = st.char;
		var data = st.data;
		var weapons = that.spec.weapons;

		var w = data.findWeapon("Handgun");
		that.addWeapon(w);

		switch (that.spec.points.weapons) {
			case 20:
				var w = data.findWeapon("Railgun");
				that.addWeapon(w);
				break;
			case 10:
				var w = data.findWeapon("M42-A1");
				that.addWeapon(w);
				break;
			case 5:
				var w = data.findWeapon("Shotgun");
				that.addWeapon(w);
				break;
		}
	},
	addWeapon: function(w) {
		var that = st.char;
		var weapons = that.spec.weapons;
		weapons.push(w);
	}
};
