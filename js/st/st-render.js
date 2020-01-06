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
		var h = "<input class=\"st-name\" value=\"<%= name %>\">";
		var template = _.template(h);
		t.push(template(that.spec));
						
		// age
		var h = "<input class=\"st-age\" value=\"<%= age %>\">";
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
		/*
		var h = "<tr><th colspan=\"2\">Statistics</th>"
			+ "<tr><td><%- int %></td><td class=\"st-tb-lbl\">INTelligence</td></tr>"
			+ "<tr><td><%- will %></td><td class=\"st-tb-lbl\">WILLpower</td></tr>"
			+ "<tr><td><%- pers %></td><td class=\"st-tb-lbl\">PERSonlality</td></tr>"
			+ "<tr><td><%- tech %></td><td class=\"st-tb-lbl\">TECHnique</td></tr>"
			+ "<tr><td><%- ref %></td><td class=\"st-tb-lbl\">REFlexes</td></tr>"
			+ "<tr><td><%- dex %></td><td class=\"st-tb-lbl\">DEXterity</td></tr>"
			+ "<tr><td><%- con %></td><td class=\"st-tb-lbl\">CONstitution</td></tr>"
			+ "<tr><td><%- str %></td><td class=\"st-tb-lbl\">STRength</td></tr>"
			+ "<tr><td><%- bod %></td><td class=\"st-tb-lbl\">BODy</td></tr>"
			+ "<tr><td><%- move %></td><td class=\"st-tb-lbl\">MOVEment</td></tr>"
		;
		var template = _.template(h);
		t.push("<table class=\"st-tb st-statistics\"><tbody>" + template(that.spec.stats) + "</tbody></table>");
		*/
		
		$(".st-page-ft").html(t.join(""));
	},
	renderReset: function() {
		$(".st-page-ft").html("");
	}
};