function main () {
	//declare the form variable, used later
	var f = document.getElementById('f');
	//add event listener to submit button of recommendations form
	var submit = document.getElementById('submit');
	submit.addEventListener('click', getRecs, false);
	//To start, load data from database and put into collection table.
	getDataRecs();
	var recObj = {};
	//******Test out getDataRecs *******
	// //delay alert to see if problem is that have to wait for ajax to complete
	// var timeoutID;
	// function delayedAlert() {
	// 	timeoutID = window.setTimeout(slowAlert, 1000);
	// }
	// function slowAlert() {
	// 	alert(" are you getting this? this is from the return of the sucess funtion: " + recObj.res);
	// }
	// delayedAlert();
	// *******End of testing getDataRecs*********

	//when user clicks submit
	//get recommendation data from form, post to database. In AJAX callback, update table.
	function getRecs(e) {
		//don't reload page
		e.preventDefault();
		console.log("this is here");
		var formEls = f.elements;
		var dated = dating();
		var recFields = {
			res: formEls[0].value,
			topic: formEls[1].value,
			name: formEls[2].value,
			pos: formEls[3].value,
			why: formEls[4].value,
			dates: dated
		};
		
		//add recommendation to database. After done, callback pulls data from database, refeshes
		//table. Can I pull from database and update table all in one
		//AJAX POST or GET? Right now it's one POST with putRecs() and one GET with getDataRecs().
		putRecs(recFields);
		//scroll to bottom of table which is called 'collection'
		$("html, body").animate({scrollTop: $('#collection').offset().top + $('#collection').outerHeight(true)}, 900);
		// var collection =document.getElementById('collection');
		// window.scrollTo(0,collection.getBoundingClientRect().bottom);
	}

	//to add recommendations into database
	function putRecs(recfields) {
		console.log("start of putRecs function");
		$.ajax({
			type: 'POST',
			url: 'http://theclimbingtree.net/steamforkids/recToData.php',
			data: recfields,
			datatype: 'json',
			success: function(response) {
				console.log("success response: " + response);
				//after POST to database, GET from database and update table
				getDataRecs();
			},
			error:function(exception){alert('Exception-getRecs:'+exception);}
		});
		console.log("end of putRecs")
	}

	//pull recommendations from database
	function getDataRecs() {
		$.ajax({
			type: 'GET',
			url: '/steamforkids/recFromData.php',
			success: function(data) {
				var result = $.parseJSON(data);
				//alert("res: " + result[0] + ", topic: " + result[1]);
				//store data in recObj which has a main-function scope
				recObj.res = $.parseJSON(result[0]);
				recObj['topic'] = $.parseJSON(result[1]);
				recObj['name'] = $.parseJSON(result[2]);
				recObj['pos'] = $.parseJSON(result[3]);
				recObj['why'] = $.parseJSON(result[4]);
				recObj.hi = "hello";
				
				//array with data results
				//0: res, 1: topic, 2: name, 3: pos, 4: why, 5: dates
				var recArr = [];
				recArr[0] = $.parseJSON(result[0]);
				recArr[1] = $.parseJSON(result[1]);
				recArr[2] = $.parseJSON(result[2]);
				recArr[3] = $.parseJSON(result[3]);
				recArr[4] = $.parseJSON(result[4]);
				recArr[5] = $.parseJSON(result[5]);

				console.log("got into success of getDataRecs");
				//update client-side table with recArr
				updateRecTable(recArr);
				//tests for how data comes out
				// alert(recObj.res);
				// var res = $.parseJSON(result[0]);
				// alert(res);
				// alert(result);
			},
			error:function(exception){alert('Exception-getDataRecs:'+exception);}
		});
	}

	//Use data to update Recommendations Table. Can be data from submit form or from database.
	//Takes an array as a parameter with order of values:
	// 0: res, 1: topic, 2: name, 3: pos, 4: why, 5: date.
	function updateRecTable (recs){
		console.log("in updateRecTable function");
		//create new table body
		var new_tbody = document.createElement('tbody');
		//assign old table body to variable
		var old_tbody = document.getElementById('coltbody');
		
		//create a row for every entry in the res (rescources) column
		for(var i = 0; i < recs[0].length; i++) {
			console.log(recs.length);
			var row = document.createElement('tr');
			//iterate through all columns on row i adding cells to table
			for(var j = 0; j < recs.length; j++) {
				var cell = document.createElement('td');
				cell.innerHTML = recs[j][i];

				console.log("in the loop");
				row.appendChild(cell);
			}
			//add recommendation to table client-side
			new_tbody.appendChild(row);
		}
		//replace old table body with new
		old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
		//give new_tbody same id as old_tbody used to have. coltbody stands for collection tbody
		new_tbody.id = "coltbody";
		
		//remove rounded corners classes. this could be more specific?
		$("tbody tr td").removeClass("bottomleft");
		$("tbody tr td").removeClass("bottomright");
		//add rounded corners classes to last row
		$("tbody tr:last-child td:first-child").addClass("bottomleft");
		$("tbody tr:last-child td:last-child").addClass("bottomright");
	}

	//formating dates
	function dating() {
		var myDate = new Date();

		var month=new Array();
		month[0]="Jan";
		month[1]="Feb";
		month[2]="Mar";
		month[3]="Apr";
		month[4]="May";
		month[5]="Jun";
		month[6]="Jul";
		month[7]="Aug";
		month[8]="Sep";
		month[9]="Oct";
		month[10]="Nov";
		month[11]="Dec";
		var hours = myDate.getHours();
		var minutes = myDate.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ampm;
		//"13 Jan 2012 11:00am";
		// var dt = myDate.getDate()+" "+month[myDate.getMonth()]+" "+(myDate.getFullYear() - 2000) + " "+strTime;
		var dt = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
		return dt;
	}
}

window.addEventListener('load', main, false);