/* st-render-weapons.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("render weapons");
		st.render.renderReset();
		st.render.renderData();
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		$(".st-page-ft").html("");
	},
	renderData: function() {
		st.log("render data");
		var that = st.char;
		var data = st.data;

		var t = [];
			
		// weapons
		t.push("<table class=\"st-tb st-weapons-desc\"><tbody>");

		st.log(data.weapons);

		t.push("<tr>"
			+ "<th class=\"st-name\">Weapon</th>"
			+ "<th>WA</th>"
			+ "<th>Range</th>"
			+ "<th>Damage</th>"
			+ "<th>ROF</th>"
			+ "<th>Shots</th>"
			+ "<th>COST</th>"
			+ "<th>Source</th>"
			+ "</tr>");

		var h = "<tr>"
			+ "<td class=\"st-name\"><%- weapon %></td>"
			+ "<td><%- wa %></td>"
			+ "<td><%- range %></td>"
			+ "<td><%- damage %></td>"
			+ "<td><%- rof %></td>"
			+ "<td><%- shots %></td>"
			+ "<td><%- cost %> (<%- cp %>)</td>"
			+ "<td><%- src %></td>"
			+ "</tr>";
		var template = _.template(h);
		for (var i=0; i<data.weapons.length; i++) {
			var w = data.weapons[i];
			t.push(template(w));
		}

		$(".st-page-ft").html(t.join(""));
	}
};