<!DOCTYPE html>
<html>
	<head>
		<title><?php print $head_title; ?></title>
		<?php print $head; ?>
		<?php print $styles; ?>
		<?php print $main_js; ?>
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body class="<?php print $classes; ?>">
		<div class="wrapper">
			<header class="header">
				<?php print $logo;?>
				<?php print render($language_switcher); ?>
			</header>

			<main class="main">
				<div class="maintenance-content">
					<section class="top-content">
						<h1><?php print t("Dafabet will be back soon."); ?></h1>
						<p><?php print $content; ?></p>
					</section>
					<div class="bottom-content">
						<section class="maintenance-option">
							<?php print $bottom_content; ?>
						</section>
					</div>
				</div>
			</main>

			<footer class="footer">
				<p class="copyright">
					<?php print t("Copyright"). " &copy; " . date('Y'). " Dafabet. " . t("All rights reserved"); ?>
				</p>
			</footer>
		</div>
		<?php print $scripts; ?>
		<?php print $page_bottom; ?>
	</body>
</html>