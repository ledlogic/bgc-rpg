/* st-nav.js */

st.nav = {
	init: function() {
		st.log("nav.init");
		var char = st.char;
		$(".st-action-random").click(char.random);
	}
};