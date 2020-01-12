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
		var h = "<tr><th colspan=\"2\">Statistics</th></tr>"
			+ "<tr><td class=\"st-stat\"><%- INT %></td><td class=\"st-tb-lbl\">INTelligence</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- WILL %></td><td class=\"st-tb-lbl\">WILLpower</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- PERS %></td><td class=\"st-tb-lbl\">PERSonality</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- TECH %></td><td class=\"st-tb-lbl\">TECHnique</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- REF %></td><td class=\"st-tb-lbl\">REFlexes</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- DEX %></td><td class=\"st-tb-lbl\">DEXterity</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- CON %></td><td class=\"st-tb-lbl\">CONstitution</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- STR %></td><td class=\"st-tb-lbl\">STRength</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- BODY %></td><td class=\"st-tb-lbl\">BODy</td></tr>"
			+ "<tr><td class=\"st-stat\"><%- MOVE %></td><td class=\"st-tb-lbl\">MOVEment</td></tr>"
		;
		var template = _.template(h);
		t.push("<table class=\"st-tb st-statistics\"><tbody>" + template(that.spec.stats) + "</tbody></table>");
		
		// derived statistics
		var h = "<tr><th colspan=\"12\">Derived Statistics</th></tr>"
			+ "<tr><td class=\"st-stat\" colspan=\"6\">LUC <%- LUC %></td><td class=\"st-stat\" colspan=\"6\">RES <%- RES %></td></tr>"
			+ "<tr><td class=\"st-stat\" colspan=\"6\">PUN <%- PUN %></td><td class=\"st-stat\" colspan=\"6\">KICK <%- KICK %></td></tr>"
			+ "<tr><td class=\"st-stat\" colspan=\"6\">END <%- END %></td><td class=\"st-stat\" colspan=\"6\">REC <%- REC %></td></tr>"
			+ "<tr>"
			+ "<td class=\"st-stat\" colspan=\"3\">MAX <%- MAX %></td><td class=\"st-stat\" colspan=\"3\">LIFT <%- LIFT %></td>"
			+ "<td class=\"st-stat\" colspan=\"3\">CARRY <%- CARRY %></td><td class=\"st-stat\" colspan=\"3\">THROW <%- THROW %></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td class=\"st-stat\" colspan=\"4\">STUN <%- STUN %></td>"
			+ "<td class=\"st-stat\" colspan=\"4\">PD <%- PD %></td>"
			+ "<td class=\"st-stat\" colspan=\"4\">HITS <%- HITS %></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td class=\"st-stat\" colspan=\"4\">RUN <%- RUN %></td>"
			+ "<td class=\"st-stat\" colspan=\"4\">LEAP <%- LEAP %></td>"
			+ "<td class=\"st-stat\" colspan=\"4\">SWIM <%- SWIM %></td>"
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
		t.push("<tr><th colspan=\"12\">Skills</th></tr>");
		for(var i in that.spec.skills) {
			var h = "<tr><td class=\"st-stat st-skill-lbl\">"
				+ i
				+ "</td><td class=\"st-skill-val\">"
				+ that.spec.skills[i]
				+ "</td></tr>"
			;
			t.push(h);
		}
		t.push("</tbody></table>");

		// talents
		t.push("<table class=\"st-tb st-talents\"><tbody>");
		t.push("<tr><th colspan=\"12\">Talents</th></tr>");
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
	}
};