function main () {
	//add event listener to recommendations form
	var f = document.getElementById('f');
	f.addEventListener('submit', getRecs, false);

	//get and post recommendation data into table when user clicks submit
	function getRecs(e) {
		//don't reload page
		e.preventDefault();
		console.log("this is here");
		var formEls = f.elements;
		var recFields = {
			res: formEls[0],
			topic: formEls[1],
			name: formEls[2],
			pos: formEls[3],
			why: formEls[4],
			sub: formEls[5]
		};

		var t = document.getElementById('collection');
		console.log("this is here");
		
		var row = document.createElement('tr');
		for(p in recFields) {
			var cell = document.createElement('td');
			if(recFields[p].value !== "Submit") {
				cell.innerHTML = recFields[p].value;
			}
			else{
				cell.innerHTML = dating();
			}
			
			row.appendChild(cell);
		}
		//add recommendation to table client-side
		t.appendChild(row);
		//add recommendation to database
		putRecs(e, recFields);
	}

	//to add recommendations into database
	function putRecs(e, recfields) {
		$.ajax({
			type: 'GET',
			url: '../recToData.php',
			data: recfields,
			success: function(response) {
				console.log(response);
			}
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