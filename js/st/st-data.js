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

	init: function() {
		st.log("data.init");
		var that = st.data;
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
		that.loadSkills();
		that.loadEverymanSkills();
	},
	loadTxt: function(url, spec) {
		var that = st.data;
		$.ajax({url: url,
				async: false})
			.done(function(data, status, jqxhr) {
				that[spec] = data.trim().replace("\r","").split("\n");
				for (var i=0; i<that[spec].length; i++) {
					that[spec][i] = that[spec][i].trim();
				}
				//st.log([spec,that[spec]]);
			})
			.fail(function() {
				alert("Error: unable to load personalities.");
			})
			.always(function() {
			});
	},
	loadPersonalities: function() { 
		var that = st.data;
		that.loadTxt("data/personalities.txt","personalities");
	},
	loadValuesWho: function() {
		var that = st.data;
		that.loadTxt("data/values-who.txt","valuesWho");
	},
	loadValuesWhat: function() {
		var that = st.data;
		that.loadTxt("data/values-what.txt","valuesWhat");
	},
	loadWorldviews: function() {
		var that = st.data;
		that.loadTxt("data/worldviews.txt","worldviews");
	},
	loadEarlybackgrounds: function() {
		var that = st.data;
		that.loadTxt("data/earlybackgrounds.txt","earlybackgrounds");
	},
	loadChildhoodevents: function() {
		var that = st.data;
		that.loadTxt("data/childhoodevents.txt","childhoodevents");
	},
	loadFriendsenemies: function() {
		var that = st.data;
		that.loadTxt("data/friendsenemies.txt","friendsenemies");
	},
	loadLovewar: function() {
		var that = st.data;
		that.loadTxt("data/lovewar.txt","lovewar");
	},
	loadCurrentsituations: function() {
		var that = st.data;
		that.loadTxt("data/currentsituations.txt","currentsituations");
	},
	loadCurrentoutlooks: function() {
		var that = st.data;
		that.loadTxt("data/currentoutlooks.txt","currentoutlooks");
	},
	loadStats: function() {
		st.log("data.loadStats");
		var that = st.data;

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
		//st.log("data.dataResponse, type[" + type + "], d[" + d + "]");
		var that = st.data;

		for (var i=0;i<d.data.length; i++) {
			that.addStat(type, d.data[i]);
		}
		//st.log(["st.data." + type,st.data[type]]);
	},
	loadDerivedstats: function() {
		st.log("data.loadDerivedstats");
		var that = st.data;

		Papa.parse("data/derivedstats.csv", {
			delimiter: "|",
			download: true,
			header: true,
			complete: function(d) {
				that.statsResponse("derivedstats", d);
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
		//st.log("data.strResponse, d[" + d + "]");
		var that = st.data;

		for (var i=0;i<d.data.length; i++) {
			that.str[d.data[i]["STR"]] = d.data[i]["Lift"];
		}
		//st.log(["st.data.str", st.data.str]);
	},
	loadEverymanSkills: function() {
		var that = st.data;
		that.loadTxt("data/skills-everyman.txt","everymanskills");
		st.utils.uppercaseArr(that.everymanskills);
	},
	loadSkills: function() {
		st.log("data.loadSkills");
		var that = st.data;

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
		//st.log("data.skillsResponse, d[" + d + "]");
		for (var i=0;i<d.data.length; i++) {
			//st.log(["d.data[i]", d.data[i]]);
			st.data.skills.push({
				skill:d.data[i]["Skill"],
				desc:d.data[i]["Description"]
			});
		}
		//st.log(["st.data.skills", st.data.skills]);
	},
	addStat: function(type, d) {
		//st.log("data.addStat, type[" + type + "], d[" + d + "]");
		var s = {
			"stat": d["Statistic"], 
			"abb": d["Abbreviation"],
			"desc": d["Description"]
		};
		st.data[type].push(s);
	}
};