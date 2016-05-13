<div class="wrapper">
	<header class="header">
			<?php print($logo); ?>
			<?php print render($language_switcher); ?>
	</header>
	<main class="main">
	<?php print($node_content); ?>
	</main>

	<?php if($page['footer']): ?>
			<footer class="footer">
				<p class="copyright">
					<?php print t("Copyright"). " &copy; " . date('Y'). " Dafabet. " . t("All rights reserved"); ?>
				</p>
			</footer>
	<?php endif; ?>
</div>