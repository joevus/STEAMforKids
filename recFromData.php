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



//checking to see if it's my data object

$query = "SELECT res, topic, name, pos, why
	FROM recs";

//$query ="INSERT INTO recs (res, topic, name, pos, why) VALUES ('horse', 'horse', 'horse', 'horse', 'horse')";
$result = mysqli_query($con,$query);
while($row = mysqli_fetch_array($result)) {
	$res = $row['res'];
	$topic = $row['topic'];
	$name = $row['name'];
	$pos = $row['pos'];
	$why = $row['why'];

}

echo json_encode(array($res,$topic,$name,$pos,$why));

?>