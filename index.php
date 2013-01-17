<?php
$title='Template for testprogram';
include(__DIR__ . '/incl/header.php');

$p="connect";
if(isset($_GET['p']) && ($_GET['p']=="connect" || $_GET['p']=="connected") )
{
	$p=$_GET['p'];
}
include(__DIR__ . "/".$p.".php"); 
?>
 

 
<?php $path=__DIR__; include(__DIR__ . '/incl/footer.php'); ?>
