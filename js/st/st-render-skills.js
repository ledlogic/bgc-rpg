/* st-render-skills.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("render skills");
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
			
		// skills
		t.push("<table class=\"st-tb st-skills-desc\"><tbody>");
		t.push("<tr><th colspan=\"4\">Skills</th></tr>");

		for(var i=0; i<st.data.skills.length; i++) {
			var h = "<tr>"
				+ "<td>" + (i+1) + "</td>"
				+ "<td>" + st.data.skills[i].skill + "</td>" 
				+ "<td>" + st.data.skills[i].stat + "</td>" 
				+ "<td>" + st.data.skills[i].desc + "</td>" 
				+ "</tr>"
			;
			t.push(h);
		}	
		t.push("</tbody></table>");

		$(".st-page-ft").html(t.join(""));
	}
};