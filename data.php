<?php

	// search
	$searchTerm = $_REQUEST['searchTerm'];

	// data
	$data = array(	array('id' => '1', 'label'=>'Testing'),
					array('id' => '2', 'label'=>'Something'),
					array('id' => '3', 'label'=>'Else'),
					array('id' => '4', 'label'=>'Searchable'),
					array('id' => '5', 'label'=>'Content'),
					array('id' => '6', 'label'=>'Cotent from somewhere'),
					array('id' => '7', 'label'=>'Some more stuff'),
					array('id' => '8', 'label'=>'Various bits and pieces'),
					array('id' => '9', 'label'=>'Lots of stuff')
				);

	// output
	$output = array();			
				
	// filter the data
	foreach($data as $dataRow) {
		// if label (stristr for case insensative filtering
		if(stristr($dataRow['label'], $searchTerm)) {
			// add to the output
			$output[] = $dataRow;
		}
	}			

	// echo json encode
	echo json_encode($output);