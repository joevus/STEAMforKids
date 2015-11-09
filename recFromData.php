<?php
//it worked without this header and with it
header("Content-Type: text/javascript; charset=utf-8");
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

$query = "SELECT res, topic, name, pos, why, dates
	FROM recs";

//$query ="INSERT INTO recs (res, topic, name, pos, why) VALUES ('horse', 'horse', 'horse', 'horse', 'horse')";
$result = mysqli_query($con,$query);
$i = 0;
while($row = mysqli_fetch_array($result)) {
	$res[$i] = $row['res'];
	$topic[$i] = $row['topic'];
	$name[$i] = $row['name'];
	$pos[$i] = $row['pos'];
	$why[$i] = $row['why'];
	$dates[$i] = $row['dates'];
	++$i;

}
$resj = json_encode($res);
$topicj = json_encode($topic);
$namej = json_encode($name);
$posj = json_encode($pos);
$whyj = json_encode($why);
$datesj = json_encode($dates);

echo json_encode(array($resj,$topicj,$namej,$posj,$whyj,$datesj));

?>