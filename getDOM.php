<?php
$dom = file_get_contents($_POST['url']);
//$dom = json_encode($dom);
//echo $dom;

$fd = fopen('files/thisdom.html','w');
         if( $fd == false )
         {
            echo ( "Error in opening file" );
            exit();
         }
fwrite($fd, $dom);
fclose($fd);
?>