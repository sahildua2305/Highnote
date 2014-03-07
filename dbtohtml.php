<?php
session_start();
$_SESSION['username'] = 'sahil';
$username = $_SESSION['username'];

$con = mysqli_connect("localhost","root","","highnote");
$q = mysqli_query($con, "SELECT selected_text FROM hn_data WHERE username='$username'");
$q = mysqli_fetch_array($q);
$selected_words = explode("|||||",$q['selected_text']);
$i=1;
$array = array();
foreach($selected_words as $word)
{
	$array[$i] = $word;
	$i++;
}
echo json_encode($array);
?>
