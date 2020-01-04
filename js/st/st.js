/* st.js */

var st = {
	log: function(s) {
		if (typeof(window.console) != "undefined") {
			console.log(s);
		}
	},

	init: function() {
		st.firebase.init();
		st.math.init();
		st.char.init();
		st.nav.init();
		st.render.init();
	}
};

$(document).ready(st.init);
