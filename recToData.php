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
$con=mysqli_connect("localhost","theclimb_main","XttLgZPvTQk4","theclimb_STEAMcollection");
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
$id = $_GET['id'];
$query = "UPDATE sitetable SET clicks = clicks+1 WHERE site_id='$id'";
mysqli_query($con,$query);
?>