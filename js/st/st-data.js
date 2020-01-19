/* st-data.js */

st.data = {
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
	talents: [],
	complications: [],

	init: function() {
		st.log("data.init");
		var data = st.data;
		data.loadPersonalities();
		data.loadValuesWho();
		data.loadValuesWhat();
		data.loadWorldviews();
		data.loadEarlybackgrounds();
		data.loadChildhoodevents();
		data.loadFriendsenemies();
		data.loadLovewar();
		data.loadCurrentsituations();
		data.loadCurrentoutlooks();
		data.loadStats();
		data.loadDerivedstats();
		data.loadStr();
		data.loadSkills();
		data.loadEverymanSkills();
		data.loadTalents();
		data.loadComplications();
		data.readyCheck();
	},
	loadTxt: function(url, spec) {
		var data = st.data;

		$.ajax({url: url,
				async: false})
			.done(function(d, status, jqxhr) {
				data[spec] = d.trim().replace("\r","").split("\n");
				st.utils.trimArr(data[spec]);
			})
			.fail(function() {
				alert("Error: unable to load personalities.");
			})
			.always(function() {
			});
	},
	loadPersonalities: function() { 
		st.data.loadTxt("data/personalities.txt","personalities");
	},
	loadValuesWho: function() {
		st.data.loadTxt("data/values-who.txt","valuesWho");
	},
	loadValuesWhat: function() {
		st.data.loadTxt("data/values-what.txt","valuesWhat");
	},
	loadWorldviews: function() {
		st.data.loadTxt("data/worldviews.txt","worldviews");
	},
	loadEarlybackgrounds: function() {
		st.data.loadTxt("data/earlybackgrounds.txt","earlybackgrounds");
	},
	loadChildhoodevents: function() {
		st.data.loadTxt("data/childhoodevents.txt","childhoodevents");
	},
	loadFriendsenemies: function() {
		st.data.loadTxt("data/friendsenemies.txt","friendsenemies");
	},
	loadLovewar: function() {
		st.data.loadTxt("data/lovewar.txt","lovewar");
	},
	loadCurrentsituations: function() {
		st.data.loadTxt("data/currentsituations.txt","currentsituations");
	},
	loadCurrentoutlooks: function() {
		st.data.loadTxt("data/currentoutlooks.txt","currentoutlooks");
	},
	loadStats: function() {
		st.log("data.loadStats");
		Papa.parse("data/stats.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.data.statsResponse("stats", d);
			},
			encoding: "UTF-8"
		});
	},
	statsResponse: function(type, d) {
		for (var i=0;i<d.data.length; i++) {
			st.data.addStat(type, d.data[i]);
		}
	},
	loadDerivedstats: function() {
		st.log("data.loadDerivedstats");
		Papa.parse("data/derivedstats.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.data.statsResponse("derivedstats", d);
			},
			encoding: "UTF-8"
		});
	},
	loadStr: function() {
		st.log("data.loadStr");
		var that = st.data;

		Papa.parse("data/str.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				that.strResponse(d);
			},
			encoding: "UTF-8"
		});
	},
	strResponse: function(d) {
		for (var i=0; i<d.data.length; i++) {
			st.data.str[d.data[i]["STR"]] = d.data[i]["Lift"];
		}
	},
	loadEverymanSkills: function() {
		st.data.loadTxt("data/skills-everyman.txt","everymanskills");
		st.utils.uppercaseArr(st.data.everymanskills);
	},
	loadSkills: function() {
		st.log("data.loadSkills");
		Papa.parse("data/skills-bgc.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.data.skillsResponse(d);
			},
			encoding: "UTF-8"
		});
	},
	skillsResponse: function(d) {
		for (var i=0; i<d.data.length; i++) {
			st.data.skills.push({
				skill:d.data[i]["Skill"],
				stat:d.data[i]["Stat"],
				desc:d.data[i]["Description"]
			});
		}
	},
	addStat: function(type, d) {
		var s = {
			"stat": d["Statistic"], 
			"abb": d["Abbreviation"],
			"group": d["Group"],
			"units": d["Units"],
			"desc": d["Description"]
		};
		st.data[type].push(s);
	},
	loadTalents: function() {
		st.log("data.loadTalents");
		Papa.parse("data/talents.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.data.talentsResponse(d);
			},
			encoding: "UTF-8"
		});
	},
	talentsResponse: function(d) {
		for (var i=0; i<d.data.length; i++) {
			st.data.talents.push({
				talent:d.data[i]["Talent"],
				desc:d.data[i]["Description"]
			});
		}
	},
	loadComplications: function() {
		st.log("data.loadComplications");
		Papa.parse("data/complications.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				st.data.complicationsResponse(d);
			},
			encoding: "UTF-8"
		});
	},
	complicationsResponse: function(d) {
		var data = st.data;
		for (var i=0; i<d.data.length; i++) {
			data.complications.push({
				complication:d.data[i]["Complication"],
				type:d.data[i]["Type"],
				basedesc:d.data[i]["Base Description"],
				mild:d.data[i]["Mild"],
				strong:d.data[i]["Strong"],
				severe:d.data[i]["Severe"],
				extreme:d.data[i]["Extreme"]
			});
		}
	},
	findStat: function(abb) {
		var data = st.data;
		var r = _.find(data.stats,
			function(item) { return item.abb == abb; });
		return r;
	},
	findDerivedStat: function(abb) {
		var data = st.data;
		var r = _.find(data.derivedstats,
			function(stat) { return stat.abb == abb; });
		return r;
	},
	findComplicationOfType: function(complicationType) {
		var data = st.data;
		var complications = data.complications;
		var complicationsOfType = [];
		for (var i=0; i<complications.length;i++) {
			if (complications[i].type == complicationType) {
				complicationsOfType.push(complications[i]);
			}
		}
		var complication = complicationsOfType[st.math.dieArray(complicationsOfType)];
		return complication;
	},
	findComplication: function(complication) {
		var data = st.data;
		var r = _.find(data.complications,
			function(item) { return item.complication == complication; });
		return r;
	},
	findComplicationIntensity: function(intensity) {
		//st.log("findComplicationIntensity");
		//st.log(["intensity",intensity]);
		var ret = "";
		switch (intensity) {
			case 5:
				ret = "mild";
				break;
			case 10:
				ret = "strong";
				break;
			case 15:
				ret = "severe";
				break;
			case 20:
				ret = "extreme"
				break;
		}
		//st.log(["ret",ret]);
		return ret;
	},
	findComplicationImportance: function(importance) {
		//st.log("data.findComplicationImportance");
		//st.log(["importance",importance]);
		var ret = "";
		switch (importance) {
			case 0.2:
				ret = "minor";
				break;
			case 0.5:
				ret = "major";
				break;
			case 1.0:
				ret = "extreme";
				break;
		}
		//st.log(["ret",ret]);
		return ret;
	},
	readyCheck: function() {
		st.log("data.readyCheck");
		var data = st.data;
		if (!data.stats || st.utils.mapSize(data.stats) === 0) {
			window.setTimeout("st.data.readyCheck()", 100);
			return;
		} else if (!data.str || st.utils.mapSize(data.str) === 0) {
			window.setTimeout("st.data.readyCheck()", 100);
			return;
		} else if (!data.skills || st.utils.mapSize(data.skills) === 0) {
			window.setTimeout("st.data.readyCheck()", 100);
			return;
		} else if (!data.talents || st.utils.mapSize(data.talents) === 0) {
			window.setTimeout("st.data.readyCheck()", 100);
			return;
		} else if (!data.complications || st.utils.mapSize(data.complications) === 0) {
			window.setTimeout("st.data.readyCheck()", 100);
			return;
		} else {
			st.char.random();
		}
	}
};