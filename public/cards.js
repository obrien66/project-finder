// // require("dotenv").config()

// var cardList = document.getElementById('cardlist')

// var getJSON = function(url, callback) {
//     var request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.responseType = 'json';

//     request.onload = function() {
// 		var status = request.status;
// 		console.log()
// 		if (status === 200) {
// 			callback(null, request.response);
// 		}
// 		else {
// 			callback(new Error("request failed"), request.response);
// 		}
//     };
//     request.send();
// };

// // var url = `http://localhost:${process.env.PORT}/data`
// var url = "http://localhost:8080/data"
// console.log(url)
// getJSON(url, (err, data) => {
// 	if (err) {
// 		alert("goofed")
// 	}
// 	else {
// 		console.log()
// 	}
// })
