/* st-utils.js */

st.utils = {
	init: function() {
		st.log("utils.init");
	},
	sortObject: function(o) {
		return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
	},
	uppercaseArr: function(arr) {
		for (var i=0; i<arr.length; i++) {
			arr[i] = arr[i].toUpperCase();
		}
	}
};