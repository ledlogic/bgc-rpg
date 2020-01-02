/* st-math.js */

st.math = {
	die : function(qty, die, mod) {
		var ret = mod;
		for (var i = 0; i < qty; i++) {
			ret += st.math.dieN(die);
		}
		return ret;
	},

	dieN : function(die) {
		return Math.floor(Math.random() * die) + 1;
	},
	
	dieArray : function(array) {
		return Math.floor(Math.random() * array.length);
	}
};