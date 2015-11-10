<?php
//print some html to show that we got in here
//echo '<h1>got into recToData.php</h1>';
//Error Reporting on (DEBUG set to true) or off (DEBUG set to false)
define('DEBUG', true);
if(DEBUG == true)
{
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
}
else
{
    ini_set('display_errors', 'Off');
    error_reporting(0);
}
$con=mysqli_connect("localhost","theclimb_main","XttLgZPvTQk4","theclimb_steamcollection");
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

$res = $_POST['res'];
$topic = $_POST['topic'];
$name = $_POST['name'];
$pos = $_POST['pos'];
$why = $_POST['why'];
$dates = $_POST['dates'];

//checking to see if it's my data object

$query = "INSERT INTO recs (res, topic, name, pos, why, dates) 
	VALUES ('$res', '$topic', '$name', '$pos', '$why', '$dates')";

//$query ="INSERT INTO recs (res, topic, name, pos, why) VALUES ('horse', 'horse', 'horse', 'horse', 'horse')";
mysqli_query($con,$query);
?>