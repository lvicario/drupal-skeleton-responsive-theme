<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
// var_dump($row->_field_data['nid']['entity']->field_image_height['und'][0]['value']);die();
?>

<?php
	$font_size ="";
	$font_color = "";
	$font_align ="";
?>

<?php
	if(isset($row->_field_data['nid']['entity']->field_font_size['und'][0]['value'])){
		$font_size = $row->_field_data['nid']['entity']->field_font_size['und'][0]['value'];
	}
	if(isset($row->_field_data['nid']['entity']->field_font_alignment['und'][0]['value'])){
		$font_alignment = $row->_field_data['nid']['entity']->field_font_alignment['und'][0]['value'];
	}
	// if(isset($row->_field_data['nid']['entity']->field_font_size['und'][0]['value'])){
	// 	$font_size = $row->_field_data['nid']['entity']->field_font_size['und'][0]['value'];
	// }
?>

<div class="slider-content">
<?php 
print '<a href="'.$row->field_field_slider_link_url[0]['raw']['value'].'" target="'.$row->field_field_open_in[0]['raw']['value'].'">';
?>
	<picture>
      <?php
      print '<source media="(min-width: 768px) and (orientation: portrait)" srcset="'.$row->field_field_tablet_portrait_image[0]['raw']['value'].'" />';
      print '<source media="(min-width: 768px) and (orientation: landscape)" srcset="'.$row->field_field_tablet_landscape_image[0]['raw']['value'].'" />';
      print '<source media="(min-width: 0px) and (orientation: portrait)" srcset="'.$row->field_field_mobile_portrait_image[0]['raw']['value'].'" />';
      print '<source media="(min-width: 0px) and (orientation: landscape)" srcset="'.$row->field_field_tablet_landscape_image[0]['raw']['value'].'" />';
      print '<img alt="'.$row->node_title.'" height="256" src="'.$row->field_field_tablet_portrait_image[0]['raw']['value'].'" width="768" />';
      ?> 
	</picture>
</a>
<?php
print '<div class="slider-blurb '.$font_size.' '.$font_alignment.'">'.$row->_field_data['nid']['entity']->field_blurb['und'][0]['safe_value'].'</div>';
?>
</div>