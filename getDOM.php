<?php
$dom = file_get_contents($_POST['url']);
$dom = json_encode($dom);
echo $dom;
?>