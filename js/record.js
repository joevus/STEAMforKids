function main () {
	//add event listener to recommendations form
	var f = document.getElementById('f');
	f.addEventListener('submit', getRecs, false);

	//******Test out getDataRecs *******
	getDataRecs();
	//when user clicks submit
	//get recommendation data from form, post to page, then database
	function getRecs(e) {
		//don't reload page
		e.preventDefault();
		console.log("this is here");
		var formEls = f.elements;
		var recFields = {
			res: formEls[0].value,
			topic: formEls[1].value,
			name: formEls[2].value,
			pos: formEls[3].value,
			why: formEls[4].value,
			sub: formEls[5].value
		};

		var ctbody = document.getElementById('coltbody');
		
		var row = document.createElement('tr');
		for(p in recFields) {
			var cell = document.createElement('td');
			if(recFields[p].value !== "Submit") {
				cell.innerHTML = recFields[p];
			}
			else{
				cell.innerHTML = dating();
			}
			console.log("in the loop");
			row.appendChild(cell);
		}
		//add rounded corners classes to last row
		$("tr:last-child td:first-child").addClass("bottomleft");
		$("tr:last-child td:last-child").addClass("bottomright");
		//add recommendation to table client-side
		ctbody.appendChild(row);
		//remove rounded corners classes. this could be more specific?
		$("tr td").removeClass("bottomleft");
		$("tr td").removeClass("bottomright");
		//add rounded corners classes to last row
		$("tr:last-child td:first-child").addClass("bottomleft");
		$("tr:last-child td:last-child").addClass("bottomright");
		//add recommendation to database
		putRecs(recFields);
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
			},
			error:function(exception){alert('Exception:'+exception);}
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
				var res = $.parseJSON(result[0]);
				alert(res);
				alert(result);
			},
			error:function(exception){alert('Exception:'+exception);}
		});
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
		var dt = myDate.getDate()+" "+month[myDate.getMonth()]+" "+myDate.getFullYear()+" "+strTime;
		return dt;
	}
}

window.addEventListener('load', main, false);