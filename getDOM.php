<?php
$dom = file_get_contents($_POST['url']);
var_dump($dom);
//$dom = json_encode($dom);
//echo $dom;

if (file_exists('files/thisdom.html')){
	unlink('files/thisdom.html');
}
$fd = fopen('files/thisdom.html','w+');
         if( $fd == false )
         {
            echo ( "Error in opening file" );
            exit();
         }
fwrite($fd, $dom);
fclose($fd);
?>