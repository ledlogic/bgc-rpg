/* st-render.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("render");
		st.render.renderReset();
		st.render.renderSpec();
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		st.log("render reset");
		$(".st-page-ft").html("");
	},
	renderSpec: function() {
		st.log("render spec");
		var that = st.char;
		var data = st.data;

		var t = [];
			
		// name
		var h = "<label class=\"st-elem st-name-label\" for=\"st-name\">Character</label>"
			+ "<input id=\"st-name\" class=\"st-elem st-name\" value=\"<%= name %>\" placeholder=\"Character\">";
		var template = _.template(h);
		t.push(template(that.spec));

		// image
		var slug = data.findTemplate(that.spec.template).slug;
		var h = "<div id=\"st-img\" class=\"st-img\">"
			+ "<img src=\"img/" + slug + ".jpg\" />"
			+ "</div>";
		var template = _.template(h);
		t.push(template(that.spec));
						
		// age
		var h = "<label class=\"st-elem st-age-label\" for=\"st-age\">Age</label>"
			+ "<input id=\"st-age\" class=\"st-elem st-age\" value=\"<%= age %>\" placeholder=\"Age\">";
		var template = _.template(h);
		t.push(template(that.spec));

		// occupation
		var h = "<label class=\"st-elem st-occupation-label\" for=\"st-occupation\">Occupation</label>"
			+ "<input id=\"st-occupation\" class=\"st-elem st-occupation\" placeholder=\"Occupation\" value=\"<%- template %>\">";
		var template = _.template(h);
		t.push(template(that.spec));

		// points
		var points = that.spec.points;
		t.push("<table class=\"st-tb st-points\"><tbody>");
		t.push("<tr>");
		t.push("<th>Stat Points</th>");
		t.push("<th>Campaign Points</th>");
		t.push("<th>Complication Points</th>");
		t.push("<th>Total Points</th>");
		t.push("</tr>");
		t.push("<tr>");
		t.push("<td>" + points.stats + "</td>");
		t.push("<td>" + points.campaign 
			+ " (s" + points.skills + ", t" + points.talents + ", w" + points.weapons + ")"
			+ "</td>");
		t.push("<td>" + points.complications + "</td>");
		t.push("<td>" + points.total + "</td>");
		t.push("<tr>");
		t.push("</tbody></table>");

		// statistics
		var statsDisplay = [];
		_.each(that.spec.stats, function(value, key, list) {
			var stat = data.findStat(key);
			var statClass = "";
			switch (true) {
				case value >= 9:
					statClass = "st-stat-extreme";
					break;
				case value >= 6:
					statClass = "st-stat-high";
					break;
				case value >= 3:
					statClass = "st-stat-medium";
					break;
				default:
					statClass = "st-stat-low";
					break;
			}
			statsDisplay[key] = {
				stat: value,
				class: statClass,
				group: stat.group
			};
		});
		var h = "<tr><th colspan=\"4\"><a href=\"stats.html\">Statistics</a></th></tr>"
			+ "<tr><td><%- INT.group %></td><td class=\"st-stat <%- INT.class %>\"><%- INT.stat %></td><td class=\"st-tb-lbl <%- INT.class %>\">INTelligence</td></tr>"
			+ "<tr><td><%- WILL.group %></td><td class=\"st-stat <%- WILL.class %>\"><%- WILL.stat %></td><td class=\"st-tb-lbl <%- WILL.class %>\">WILLpower</td></tr>"
			+ "<tr><td><%- PERS.group %></td><td class=\"st-stat <%- PERS.class %>\"><%- PERS.stat %></td><td class=\"st-tb-lbl <%- PERS.class %>\">PERSonality</td></tr>"
			+ "<tr><td><%- TECH.group %></td><td class=\"st-stat <%- TECH.class %>\"><%- TECH.stat %></td><td class=\"st-tb-lbl <%- TECH.class %>\">TECHnique</td></tr>"
			+ "<tr><td><%- REF.group %></td><td class=\"st-stat <%- REF.class %>\"><%- REF.stat %></td><td class=\"st-tb-lbl <%- REF.class %>\">REFlexes</td></tr>"
			+ "<tr><td><%- DEX.group %></td><td class=\"st-stat <%- DEX.class %>\"><%- DEX.stat %></td><td class=\"st-tb-lbl <%- DEX.class %>\">DEXterity</td></tr>"
			+ "<tr><td><%- CON.group %></td><td class=\"st-stat <%- CON.class %>\"><%- CON.stat %></td><td class=\"st-tb-lbl <%- CON.class %>\">CONstitution</td></tr>"
			+ "<tr><td><%- STR.group %></td><td class=\"st-stat <%- STR.class %>\"><%- STR.stat %></td><td class=\"st-tb-lbl <%- STR.class %>\">STRength</td></tr>"
			+ "<tr><td><%- BODY.group %></td><td class=\"st-stat <%- BODY.class %>\"><%- BODY.stat %></td><td class=\"st-tb-lbl <%- BODY.class %>\">BODy</td></tr>"
			+ "<tr><td><%- MOVE.group %></td><td class=\"st-stat <%- MOVE.class %>\"><%- MOVE.stat %></td><td class=\"st-tb-lbl <%- MOVE.class %>\">MOVEment</td></tr>"
		;
		var template = _.template(h);
		t.push("<table class=\"st-tb st-statistics\"><tbody>" + template(statsDisplay) + "</tbody></table>");
		
		// derived statistics
		var h = "<tr><th colspan=\"12\">Derived Statistics</th></tr>"
			+ "<tr>"
			+ "<td class=\"st-stat\" colspan=\"3\">"
			+ "LUC <%- LUC %>"
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"3\">"
			+ st.render.renderBoxes(that.spec.derivedstats.LUC)
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"6\">RES <%- RES %></td></tr>"
			+ "<tr><td class=\"st-stat\" colspan=\"6\">PUN <%- PUN %></td>"
			+ "<td class=\"st-stat\" colspan=\"6\">KICK <%- KICK %></td>"
			+ "</tr>"

			+ "<tr><td class=\"st-stat\" colspan=\"6\">END <%- END %></td>"+"<td class=\"st-stat\" colspan=\"6\">REC <%- REC %></td></tr>"
			+ "<tr>"
			+ "<td class=\"st-stat\" colspan=\"3\">"
			+ "MAX <%- MAX %>"
			+ st.data.findDerivedStat("MAX").units
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"3\">"
			+ "LIFT <%- LIFT %>"
			+ st.data.findDerivedStat("LIFT").units
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"3\">"
			+ "CARRY <%- CARRY %>"
			+ "</td><td class=\"st-stat\" colspan=\"3\">"
			+ "THROW <%- THROW %>" + st.data.findDerivedStat("THROW").units
			+ "      <%- THROWDIST %>" + st.data.findDerivedStat("THROWDIST").units
			+ "</td>"
			+ "</tr>"

			+ "<tr>"
			+ "<td class=\"st-stat\" colspan=\"3\">SD <%- SD %></td>"
			+ "<td class=\"st-stat\" colspan=\"1\">STUN <%- STUN %>"
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"2\">"
			+ st.render.renderBoxes(that.spec.derivedstats.STUN)
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"3\">KD <%- KD %></td>"
			+ "<td class=\"st-stat\" colspan=\"1\">HITS <%- HITS %>"
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"2\">"
			+ st.render.renderBoxes(that.spec.derivedstats.HITS)
			+ "</td>"
			+ "</tr>"

			+ "<tr>"
			+ "<td class=\"st-stat\" colspan=\"4\">"
			+ "RUN <%- RUN %>"
			+ st.data.findDerivedStat("RUN").units
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"4\">"
			+ "LEAP <%- LEAP %>"
			+ st.data.findDerivedStat("LEAP").units
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"4\">"
			+ "SWIM <%- SWIM %>"
			+ st.data.findDerivedStat("SWIM").units
			+ "</td>"
			+ "</tr>"
		;
		var template = _.template(h);
		t.push("<table class=\"st-tb st-derivedstatistics\"><tbody>" + template(that.spec.derivedstats) + "</tbody></table>");
		
		// weapons
		t.push("<table class=\"st-tb st-weapons\"><tbody>");
		t.push("<tr>"
			+ "<th>Weapon</th>"
			+ "<th>WA</th>"
			+ "<th>Range</th>"
			+ "<th>Damage</th>"
			+ "<th>ROF</th>"
			+ "<th>Shots</th>"
			+ "<th>COST</th>"
			+ "</tr>");

		var h = "<tr>"
			+ "<td><%- weapon %></td>"
			+ "<td><%- wa %></td>"
			+ "<td><%- range %></td>"
			+ "<td><%- damage %></td>"
			+ "<td><%- rof %></td>"
			+ "<td><%- shots %></td>"
			+ "<td><%- cost %> (<%- cp %>)</td>"
			+ "</tr>";
		var template = _.template(h);
		for (var i in that.spec.weapons) {
			var w = that.spec.weapons[i];
			t.push(template(w));
		}

		var weaponsize = st.utils.mapSize(that.spec.weapons);
		for(var i=weaponsize; i<6; i++) {
			t.push("<tr>"
				+ "<td>&nbsp;</td>"
				+ "<td>&nbsp;</td>"
				+ "<td>&nbsp;</td>"
				+ "<td>&nbsp;</td>"
				+ "<td>&nbsp;</td>"
				+ "<td>&nbsp;</td>"
				+ "<td>&nbsp;</td>"
				+ "</tr>");
		}
		t.push("</tbody></table>");

		// lifepath
		that.spec.eventsHtml = that.spec.events.join("<br/>");
		var h = "<tr><th colspan=\"2\">Lifepath</th></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Personality</td><td><%- personality %></td></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Values - people</td><td><%- valuesWho %></td></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Values - things</td><td><%- valuesWhat %></td></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Early Background</td><td><%- earlybackground %></td></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Childhood Event</td><td><%- childhoodevent %></td></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Life Event(s)</td><td><%= eventsHtml %></td></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Current Situation</td><td><%= currentsituation %></td></tr>"
			+ "<tr><td class=\"st-tb-lbl\">Current Outlook</td><td><%= currentoutlook %></td></tr>"
		;
		var template = _.template(h);
		t.push("<table class=\"st-tb st-lifepath\"><tbody>" + template(that.spec) + "</tbody></table>");

		// skills
		t.push("<table class=\"st-tb st-skills\"><tbody>");
		t.push("<tr><th colspan=\"12\"><a href=\"skills.html\">Skills</a></th></tr>");

		// account for everyman skills
		that.spec.skilltotal = 0;
		var cnt = 0;
		for(var i in that.spec.skills) {
			var h = "<tr>"
				+ "<td class=\"st-cnt\" colspan=\"2\">"
				+ (++cnt)
				+ "</td>"
				+ "<td class=\"st-stat\" colspan=\"8\">"
				+ i
				+ st.render.renderDefaultSkill(i)
				+ "</td>"
				+ "<td class=\"st-skill-val\" colspan=\"2\">"
				+ that.spec.skills[i]
				+ "</td></tr>"
			;
			t.push(h);

			that.spec.skilltotal += that.spec.skills[i];
		}
		var h = "<tr class=\"st-total\"><td class=\"st-stat st-skill-lbl\" colspan=\"10\">"
			+ "TOTAL"
			+ "</td>"
			+ "<td class=\"st-skill-val\" colspan=\"2\">"
			+ (that.spec.skilltotal - that.spec.points.everymanskillstotal) + "/" + that.spec.skilltotal
			+ "</td></tr>"
		;
		t.push(h);

		t.push("<tr><td colspan=\"12\">* Everyman skills</td></tr>");

		t.push("</tbody></table>");
		// talents
		t.push("<table class=\"st-tb st-talents\"><tbody>");
		t.push("<tr><th colspan=\"12\">Talents</th></tr>");

		var cnt = 0;
		for(var i in that.spec.talents) {
			var h = "<tr>"
				+ "<td class=\"st-stat st-talents-lbl\">"
				+ that.spec.talents[i].talent
				+ "</td>"
				+ "<td>"
				+ that.spec.talents[i].ranks
				+ "</td>"
				+ "</tr>"
			;
			t.push(h);
			cnt++;
		}
		for (var i=cnt; i<3; i++) {
			var h = "<tr><td class=\"st-stat st-talents-lbl\"></td><td>&nbsp;</td></tr>";
			t.push(h);
		}
		t.push("</tbody></table>");

		// complications
		t.push("<table class=\"st-tb st-complications\"><tbody>");
		t.push("<tr>"
			+ "<th colspan=\"2\">Type</th>"
			+ "<th colspan=\"2\">Complication</th>"
			+ "<th colspan=\"4\">Effect</th>"
			+ "<th>Intensity</th>"
			+ "<th>Frequency</th>"
			+ "<th>Importance</th>"
			+ "<th>Points</th>"
			+ "</tr>");
		var cnt = 0;
		for(var i=0; i<that.spec.complications.length; i++) {
			var specComplication = that.spec.complications[i];
			var h = "";
			if (specComplication.complicationType == "ENEMY") {
				var dataCapabilities = data.findComplication("Capabilities");
				var dataExtent = data.findComplication("Extent");
				var dataIntensity = data.findComplication("Intensity");
				var capabilitiesIntensity = data.findComplicationIntensity(specComplication.capabilities);
				var capabilitiesDescription = dataCapabilities[capabilitiesIntensity];
				var extentIntensity = data.findComplicationIntensity(specComplication.extent);
				var extentDescription = dataExtent[extentIntensity];
				var intensityValue = 0;
				switch (specComplication.intensity) {
					case 0.2:
						intensityValue = 5;
						break;
					case 0.5:
						intensityValue = 10;
						break;
					case 1:
						intensityValue = 15;
						break;
				}
				var intensityIntensity = data.findComplicationIntensity(intensityValue);
				var intensityDescription = dataIntensity[intensityIntensity];

				var description = capabilitiesDescription + "(" + specComplication.capabilities + ") "
					+ extentDescription + "(" + specComplication.extent + ") "
					+ intensityDescription + "(" + specComplication.intensity + "x) "

				h = st.render.renderComplication(specComplication.complicationType,
					specComplication.complication,
					description,
					"*",
					"*",
					"*",
					specComplication.points);
			} else {
				var dataComplication = data.findComplication(specComplication.complication);
				var basedesc = dataComplication.basedesc;
				var intensity = data.findComplicationIntensity(specComplication.intensity);
				var descsuffix = dataComplication[intensity];
				var frequencySuffix = data.findFrequencySuffix(specComplication.frequency);
				var importance = specComplication.importance;
				var importancesuffix = data.findComplicationImportance(importance);
				h = st.render.renderComplication(specComplication.complicationType,
					specComplication.complication,
					basedesc + descsuffix,
					intensity.toUpperCase() + "(" + specComplication.intensity + ")",
					frequencySuffix.toUpperCase() + "(" + specComplication.frequency + ")",
					importancesuffix.toUpperCase() + "(" + specComplication.importance + ")",
					specComplication.points);
			}
			t.push(h);			
			cnt++;
		}	
		for (var i=cnt; i<3; i++) {
			var h = "<tr><td colspan=\"2\" width=\"50\">&nbsp;</td>"
				+ "<td colspan=\"2\">&nbsp;</td>"
				+ "<td colspan=\"4\">&nbsp;</td>"
				+ "<td width=20>&nbsp;</td>"
				+ "<td width=20>&nbsp;</td>"
				+ "<td width=20>&nbsp;</td>"
				+ "<td width=20>&nbsp;</td>"
				+ "</tr>";
			t.push(h);
		}
		t.push("</tbody></table>");
		
		// equipment
		t.push("<table class=\"st-tb st-equipment\"><tbody>");
		t.push("<tr><th colspan=\"4\">Equipment</th><th>Cost</th></tr>");
		for(var i=0; i<10; i++) {
			var h = "<tr><td colspan=\"4\">&nbsp;</td><td>&nbsp;</td></tr>";
			t.push(h);
		}	
		t.push("</tbody></table>");

		$(".st-page-ft").html(t.join(""));
	},

	renderComplication: function(complicationType, complication, description, intensity, frequency, importance, points) {
		var r = "<tr>"
			+ "<td class=\"st-stat st-complications-lbl\" colspan=\"2\" width=\"50\">"
			+ complicationType
			+ "</td>"
			+ "<td class=\"st-stat st-complications-lbl\" colspan=\"2\">"
			+ complication
			+ "</td>"
			+ "<td class=\"st-stat st-complications-lbl\" colspan=\"4\">"
			+ description
			+ "</td>"
			+ "<td class=\"st-stat st-complications-lbl\" width=20>"
			+ intensity
			+ "</td>"
			+ "<td class=\"st-stat st-complications-lbl\" width=20>"
			+ frequency
			+ "</td>"
			+ "<td class=\"st-stat st-complications-lbl\" width=20>"
			+ importance
			+ "</td>"
			+ "<td class=\"st-stat st-complications-lbl\" width=20>"
			+ points
			+ "</td>"
			+ "</tr>";
		return r;
	},

	renderBoxes: function(qty) {
		var r = [];
		for (var i=0; i<qty; i++) {
			r.push("□");
			if ((i+1) % 10 === 0) {
				r.push("<br/>");
			}
		}
		return r.join("");
	},

	renderDefaultSkill: function(i) {
		var data = st.data;
		if (_.contains(data.everymanskills, i)) {
			return "*";
		} else {
			return "";
		}
	}
};