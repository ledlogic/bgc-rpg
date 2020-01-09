/* st-render.js */

st.render = {
	init: function() {
	},
	render: function() {
		st.log("rendering char");
		st.render.renderReset();
		st.render.renderSpec();
		$(".st-page").removeClass("st-initial-state");
	},
	renderSpec: function() {
		st.log("rendering spec");
		var that = st.char;

		var t = [];

		// name
		var h = "<h4 class=\"st-elem st-title\">Title</h4>"
		var template = _.template(h);
		t.push(template(that.spec));
			
		// name
		var h = "<label class=\"st-elem st-name-label\" for=\"st-name\">Character</label>"
			+ "<input id=\"st-name\" class=\"st-elem st-name\" value=\"<%= name %>\" placeholder=\"Character\">";
		var template = _.template(h);
		t.push(template(that.spec));

		// image
		var h = "<img id=\"st-img\" class=\"st-img\" src=\"img/adpolice.jpg\">";
		var template = _.template(h);
		t.push(template(that.spec));
						
		// age
		var h = "<label class=\"st-elem st-age-label\" for=\"st-age\">Age</label>"
			+ "<input id=\"st-age\" class=\"st-elem st-age\" value=\"<%= age %>\" placeholder=\"Age\">";
		var template = _.template(h);
		t.push(template(that.spec));

		// lifepath
		that.spec.eventsHtml = that.spec.events.join("<br/>");
		var h = "<tr><th colspan=\"2\">Lifepath</th>"
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

		// statistics
		var h = "<tr><th colspan=\"2\">Statistics</th>"
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
		var h = "<tr><th colspan=\"12\">Derived Statistics</th>"
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
		
		$(".st-page-ft").html(t.join(""));
	},
	renderReset: function() {
		$(".st-page-ft").html("");
	}
};