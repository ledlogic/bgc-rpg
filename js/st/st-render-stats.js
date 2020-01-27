/* st-render-stats.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("render stats");
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

		var t = [];
			
		// stats
		t.push("<h3>Stats</h3>");
		t.push("<table class=\"st-tb st-statistics-desc\"><tbody>");
		
		var h = "<tr>"
			+ "<th>#</th>"
			+ "<th>Abbreviation</th>" 
			+ "<th>Stat</th>" 
			+ "<th>Units</th>" 
			+ "<th>Desc</th>" 
			+ "</tr>"
		;
		t.push(h);

		for(var i=0; i<st.data.stats.length; i++) {
			var h = "<tr>"
				+ "<td>" + (i+1) + "</td>"
				+ "<td>" + st.data.stats[i].abb + "</td>" 
				+ "<td>" + st.data.stats[i].stat + "</td>" 
				+ "<td>" + st.data.stats[i].units + "</td>" 
				+ "<td>" + st.data.stats[i].desc + "</td>" 
				+ "</tr>"
			;
			t.push(h);
		}	
		t.push("</tbody></table>");

		// stats
		t.push("<hr/>");

		t.push("<h3>Derived Stats</h3>");
		t.push("<table class=\"st-tb st-statistics-desc\"><tbody>");

		var h = "<tr>"
			+ "<th>#</th>"
			+ "<th>Abbreviation</th>" 
			+ "<th>Stat</th>" 
			+ "<th>Units</th>" 
			+ "<th>Desc</th>" 
			+ "</tr>"
		;
		t.push(h);

		for(var i=0; i<st.data.derivedstats.length; i++) {
			var h = "<tr>"
				+ "<td>" + (i+1) + "</td>"
				+ "<td>" + st.data.derivedstats[i].abb + "</td>" 
				+ "<td>" + st.data.derivedstats[i].stat + "</td>" 
				+ "<td>" + st.data.derivedstats[i].units + "</td>" 
				+ "<td>" + st.data.derivedstats[i].desc + "</td>" 
				+ "</tr>"
			;
			t.push(h);
		}	
		t.push("</tbody></table>");


		$(".st-page-ft").html(t.join(""));
	}
};