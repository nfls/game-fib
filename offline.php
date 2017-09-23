<?php
function stringEndsWith($whole, $end)
{
    return (strpos($whole, $end, strlen($whole) - strlen($end)) !== false);
}
	$v = file_get_contents("version.lock");
	if(isset($_GET["version"]) && $v == $_GET["version"]){
		die();
	}
	// Get real path for our folder
	$rootPath = realpath('./');

	// Initialize archive object
	$zip = new ZipArchive();
	$temp = (string)rand();
	$zip->open('/tmp/'.$temp.'.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);

	// Initialize empty "delete list"
	$filesToDelete = array();

	// Create recursive directory iterator
	/** @var SplFileInfo[] $files */
	$files = new RecursiveIteratorIterator(
	    new RecursiveDirectoryIterator($rootPath),
	    RecursiveIteratorIterator::LEAVES_ONLY
	);

	foreach ($files as $name => $file)
	{
	    // Skip directories (they would be added automatically)
	    if (!$file->isDir())
	    {
	        // Get real and relative path for current file
	        $filePath = $file->getRealPath();

	        $relativePath = substr($filePath, strlen($rootPath) + 1);

	        $file_parts = pathinfo($filePath);
			if(!stringEndsWith($filePath,"php"))
			  	$zip->addFile($filePath, $relativePath);
	        

	       
	    }
	}

	// Zip archive will be created only after closing object
	$zip->close();

	$attachment_location = '/tmp/'.$temp.'.zip';
        if (file_exists($attachment_location)) {

            header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
            header("Cache-Control: public"); // needed for internet explorer
            header("Content-Type: application/zip");
            header("Content-Transfer-Encoding: Binary");
            header("Content-Length:".filesize($attachment_location));
            header("Content-Disposition: attachment; filename=offline.zip");
            readfile($attachment_location);
            die();        
        } else {
            die("Error: File not found.");
        } 

?>