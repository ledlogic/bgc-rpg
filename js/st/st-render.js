/* st-render.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("rendering char");
		st.render.renderReset();
		st.render.renderSpec();
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		$(".st-page-ft").html("");
	},
	renderSpec: function() {
		st.log("rendering spec");
		var that = st.char;
		var data = st.data;

		var t = [];
			
		// name
		var h = "<label class=\"st-elem st-name-label\" for=\"st-name\">Character</label>"
			+ "<input id=\"st-name\" class=\"st-elem st-name\" value=\"<%= name %>\" placeholder=\"Character\">";
		var template = _.template(h);
		t.push(template(that.spec));

		// image
		var h = "<div id=\"st-img\" class=\"st-img\"></div>";
		var template = _.template(h);
		t.push(template(that.spec));
						
		// age
		var h = "<label class=\"st-elem st-age-label\" for=\"st-age\">Age</label>"
			+ "<input id=\"st-age\" class=\"st-elem st-age\" value=\"<%= age %>\" placeholder=\"Age\">";
		var template = _.template(h);
		t.push(template(that.spec));

		// occupation
		var h = "<label class=\"st-elem st-occupation-label\" for=\"st-occupation\">Occupation</label>"
			+ "<input id=\"st-occupation\" class=\"st-elem st-occupation\" placeholder=\"Occupation\">";
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
		t.push("<td>" + points.campaign + "</td>");
		t.push("<td>" + points.complication + "</td>");
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
			+ "<td class=\"st-stat\" colspan=\"6\">"
			+ "LUC <%- LUC %>"
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
			+ "<td class=\"st-stat\" colspan=\"3\">STUN <%- STUN %>"
			+ st.render.renderBoxes(that.spec.derivedstats.STUN)
			+ "</td>"
			+ "<td class=\"st-stat\" colspan=\"3\">KD <%- KD %></td>"
			+ "<td class=\"st-stat\" colspan=\"3\">HITS <%- HITS %>"
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
			+ "<th>Shots</th>"
			+ "<th>ROF</th>"
			+ "<th>COST</th>"
			+ "</tr>");
		for(var i=0; i<6; i++) {
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
			  + "<tr><td class=\"st-tb-lbl\">Values - people</td><td><%- valuesWho %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Values - things</td><td><%- valuesWhat %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Early Background</td><td><%- earlybackground %></td></tr>"
			  + "<tr><td class=\"st-tb-lbl\">Personality</td><td><%- personality %></td></tr>"
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
		that.spec.skilltotal = 0;
		for(var i in that.spec.skills) {
			var h = "<tr><td class=\"st-stat st-skill-lbl\">"
				+ i
				+ st.render.renderDefaultSkill(i)
				+ "</td><td class=\"st-skill-val\">"
				+ that.spec.skills[i]
				+ "</td></tr>"
			;
			t.push(h);

			that.spec.skilltotal += that.spec.skills[i];
		}
		var h = "<tr class=\"st-total\"><td class=\"st-stat st-skill-lbl\">"
			+ "TOTAL"
			+ "</td><td class=\"st-skill-val\">"
			+ that.spec.skilltotal
			+ "</td></tr>"
		;
		t.push(h);

		t.push("</tbody></table>");

		// talents
		t.push("<table class=\"st-tb st-talents\"><tbody>");
		t.push("<tr><th colspan=\"12\"><a href=\"talents.html\">Talents</a></th></tr>");
		for(var i in that.spec.talents) {
			var h = "<tr><td class=\"st-stat st-talents-lbl\">"
				+ that.spec.talents[i]
				+ "</td></tr>"
			;
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

	renderBoxes: function(qty) {
		var r = [];
		r.push("<br/>");
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