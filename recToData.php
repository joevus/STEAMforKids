<?php
//Error Reporting on (DEBUG set to true) or off (DEBUG set to false)
define('DEBUG', false);
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
$res = $_GET['res'];
$topic = $_GET['topic'];
$name = $_GET['name'];
$pos = $_GET['pos'];
$why = $_GET['why'];
$query = "INSERT INTO recs (res, topic, name, pos, why)
	VALUES ('$res', '$topic', '$name', '$pos', '$why')";
mysqli_query($con,$query);
?>