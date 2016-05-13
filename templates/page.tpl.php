<div class="wrapper">
	<header class="header">
		<div class="container">
			<?php print $logo;?>
		</div>
		<a class="menubile-anchor" href="#" id="menubile-anchor">Mobile Menu</a>
		<?php print $header_option;?>
	</header>

	<main class="main">
		<div class="container">
			<?php if ($messages): ?>
				<div class="grid_<?php print $grid_columns; ?>"><?php print $messages; ?></div>
			<?php endif; ?>
	
			<?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>

			<?php if($page['main_navigation']): ?>
				<nav class="nav">
						<?php print render($page['main_navigation']); ?>
				</nav>
			<?php endif; ?>
			
			<?php print render($page['content']); ?>
		</div>
	</main>
	<?php if($page['footer']): ?>
		<footer class="footer">
				<?php print render($page['footer']); ?>
			<p class="copyright">
				<?php print t("Copyright"). " &copy; " . date('Y'). " Dafabet. " . t("All rights reserved"); ?>
			</p>
		</footer>
	<?php endif; ?>
</div><!-- .wrapper -->