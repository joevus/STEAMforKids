function main () {
	//add event listener to recommendations form
	var f = document.getElementById('f');
	f.addEventListener('submit', getRecs, false);

	//get and post recommendation data into table when user clicks submit
	function getRecs(e) {
		//don't reload page
		e.preventDefault();
		console.log("this is here");

		var res = document.getElementById('resource');
		var top = document.getElementById('topic');
		var nm = document.getElementById('name');

		var t = document.getElementById('collection');
		console.log("this is here");
		var formEls = f.elements;
		var row = document.createElement('tr');
		for (var i = 0, el; el = formEls[i]; i++) {
			var cell = document.createElement('td');
			if(el.value !== "Submit") {
				cell.innerHTML = el.value;
			}
			else{
				cell.innerHTML = dating();
			}
			
			row.appendChild(cell);
		}
		t.appendChild(row);
	}

	//putting recommendations into database
	function putRecs(e) {
		var data = {

		};

		$.ajax({
			type: 'GET',
			url: '../recToData.php',
			data: data,
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