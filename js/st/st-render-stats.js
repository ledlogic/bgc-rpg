/* st-render-stats.js */

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
			
		// talents
		t.push("<table class=\"st-tb st-statistics-desc\"><tbody>");
		t.push("<tr><th colspan=\"4\">Stats</th></tr>");

		st.log(st.data.talents);

		for(var i=0; i<st.data.stats.length; i++) {
			var h = "<tr>"
				+ "<td>" + (i+1) + "</td>"
				+ "<td>" + st.data.stats[i].abb + "</td>" 
				+ "<td>" + st.data.stats[i].stat + "</td>" 
				+ "<td>" + st.data.stats[i].desc + "</td>" 
				+ "</tr>"
			;
			t.push(h);
		}	
		t.push("</tbody></table>");

		$(".st-page-ft").html(t.join(""));
	}
};