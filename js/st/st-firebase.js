/* st-firebase.js */

st.firebase = {
	db: null,

	init: function() {
		st.log("init firebase");

		firebaseConfig = {
			apiKey: "AIzaSyCzRsUykWkVX6MA3mrfKLh27Qnu5rpLvbs",
			authDomain: "ledlogic-bgc.firebaseapp.com",
			databaseURL: "https://ledlogic-bgc.firebaseio.com",
			projectId: "ledlogic-bgc",
			storageBucket: "ledlogic-bgc.appspot.com",
			messagingSenderId: "28323455138",
			appId: "1:28323455138:web:f5407d5c21cbf8e24cf7fb"
		};
		firebase.initializeApp(firebaseConfig);
		st.firebase.db = firebase.firestore();

		st.firebase.list();
	},
	list: function () {
		st.firebase.db.collection("char-spec-2000-01").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				st.log([doc.id,doc.data()]);
			});
		});
	}
};