<?php
$selected_text = $_POST['text'];
$username = $_POST['username'];
$con = mysqli_connect("localhost","root","","highnote");

$q = mysqli_query($con, "SELECT * FROM hn_data WHERE username='$username'");
//username exists
if(mysqli_num_rows($q))
{
	$row = mysqli_fetch_array($q);
	$old_selected_text = $row['selected_text'];
	if(strpos($old_selected_text,$selected_text) === false)
	{
		$new_selected_text = $old_selected_text . "|||||" . $selected_text;
		mysqli_query($con, "UPDATE hn_data SET selected_text = '$new_selected_text' WHERE username = '$username'");
	}
	else
	{
		$new_selected_text = str_replace($selected_text,'',$old_selected_text);
		mysqli_query($con,"UPDATE hn_data SET selected_text = '$new_selected_text' WHERE username = '$username'");
	}
}
//username doesn't exists
else
{
mysqli_query($con, "INSERT INTO hn_data(id,selected_text,username) VALUES('','$selected_text','$username')");
}
mysqli_close($con);
?>
