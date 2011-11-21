<?php

	// search
	$searchTerm = $_REQUEST['searchTerm'];

	// data
	$data = array(	array('label'=>'Testing', 'id' => '1'),
					array('label'=>'Something', 'id' => '2'),
					array('label'=>'Else', 'id' => '3'),
					array('label'=>'Searchable', 'id' => '4'),
					array('label'=>'Content', 'id' => '5'),
					array('label'=>'Cotent from somewhere', 'id' => '6'),
					array('label'=>'Some more stuff', 'id' => '7'),
					array('label'=>'Various bits and pieces', 'id' => '8'),
					array('label'=>'Lots of stuff', 'id' => '9')
				);

	// output
	$output = array();			
				
	// filter the data
	foreach($data as $dataRow) {
		// if label
		if(stristr($dataRow['label'], $searchTerm)) {
			// add to the output
			$output[] = $dataRow;
		}
	}			

	// echo json encode
	echo json_encode($output);