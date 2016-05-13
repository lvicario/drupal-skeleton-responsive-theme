<!DOCTYPE html>
<html>
<head>
	<?php print $head; ?>
	<?php if($head_title): ?>
		<title><?php print $head_title; ?></title>
	<?php endif;?>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php print $styles; ?>
	<?php print $header_scripts; ?>
	<?php echo render($extra_header) ?>

</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
	<?php print $page_top; ?>
	<?php print $page; ?>
	<?php print $scripts; ?>
	<?php print $page_bottom; ?>
</body>
</html>