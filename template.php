<?php

define('THEME__NAME', 'central_registration');
define('THEME__PATH', drupal_get_path('theme', THEME__NAME));
/**
 * Implements template_preprocess_html().
 * 
 */
function central_registration_preprocess_html(&$variables) {
	
	$node = menu_get_object();

	// Render Region in html.tpl.php
	$variables['extra_header'] = block_get_blocks_by_region('extra_header');

	if ($node && $node->nid && (current_path() == variable_get('site_403'))) {
		$variables['classes_array'][] = 'restriction-page';
	}


	// Add <link> tag for apple touch icon and use the source from drupal favicon
	$favicon = theme_get_setting('favicon');
    drupal_add_html_head_link(array('rel' => 'apple-touch-icon', 'href' => drupal_strip_dangerous_protocols($favicon)));
}


/**
 * Implements template_preprocess_page().
 */
function central_registration_preprocess_page(&$variables) 
{
	// Theme settings, @see theme-settings.php
	global $language, $base_url;

	$node = menu_get_object();

	$status = drupal_get_http_header("status");

	$txtLogo = isVariableBlank(variable_get('header_logo_text'), 'Dafabet');
	$product = 'dafabet';
	if(isset($_SESSION['mobile_product'])) {
        $product = $_SESSION['mobile_product'];
    }

	$product_token = '['.variable_get('matterhorn_domain_token').":".$product.']';
	$product = token_replace($product_token);
    
	$logo = l(
		$txtLogo[$product].'<img src="/' . drupal_get_path('module', 'eiger').'/assets/images/dafabet-logo.png' . '"/>',
		''.$product,
		array(
		'attributes' => array(
			'height' => '31',
			'width' => '130',
			'alt' => $txtLogo[$product]
		),
		'html' => TRUE,
		'absolute' => TRUE
		)
	);

	//Header Login Button
	$login = l(
		t('Login'), token_replace(variable_get('header_login_link', '')),
		array(
		'attributes' => array(
			'class' => 'btn-login'
		),
		'html' => TRUE
		)
	);

	$variables['header_option'] = $login;


	if(!drupal_is_front_page()) {
		$variables['logo'] = '<p class="logo">'.$logo .'</p>';
	} else {
		$variables['logo'] = '<h1 class="logo">'.$logo .'</h1>';
	}

	if ($node && $node->nid && (current_path() == variable_get('site_403'))) {
		$variables['theme_hook_suggestions'][] = 'page__' . 'restricted';
		$variables['node_content'] = $node->body['und'][0]['safe_value'];
		$languages = block_load('i18n', 'language');
		$variables['language_switcher'] =  _block_get_renderable_array(_block_render_blocks(array($languages)));
	}

	// Add New Template
	if (isset($variables['node'])) {
		$variables['theme_hook_suggestions']['system_main'] = 'page__'. str_replace('_', '_', $variables['node']->type);
	}

	// Display the content for restricted page.
    if(in_array($status, array('403 Forbidden'))) {

        // Ready the default body by default.
        $variables['node_content'] = token_replace($node->body['und'][0]['value']);

        // Change the template to be used.
        $variables['theme_hook_suggestions'][] = 'page__restricted';
        return;
    }
}

/*
 * Implements hook_html_head_alter
 */
function central_registration_html_head_alter(&$head_elements) {
  // Force the latest IE rendering engine and Google Chrome Frame.

	foreach ($head_elements as $key => $headElement) {
		if(isset($headElement['#attributes']['rel'])) {
			if(isset($head_elements[$key]['#attributes']['href'])) {
				$head_elements[$key]['#attributes']['href'] = preg_replace('/^http:/', 'https:', $headElement['#attributes']['href']);
			}
		}
	}

}

function central_registration_preprocess_maintenance_page(&$variables)
{
	$logo = '<img src="/' . drupal_get_path('module', 'eiger').'/assets/images/dafabet-logo.png' . '"/>';
	$eigerBody = variable_get('eiger_maintenance_message','');
	$eigerBottom = variable_get('eiger_maintenance_bottom_content','');
	$variables['content'] = $eigerBody['value'];
	$variables['bottom_content'] = $eigerBottom['value'];
	$variables['logo'] = '<p class="logo"> <span>'. $logo . '</span></p>';
	$languages = block_load('i18n', 'language');
	$variables['language_switcher'] =  _block_get_renderable_array(_block_render_blocks(array($languages)));


    $module_path = drupal_get_path('theme', 'central_registration');

    drupal_add_js($module_path . '/js/tail.concatenated.js', array(
        'scope' => 'header', 'weight' => 10
    ));

    drupal_add_js(drupal_get_path('module', 'eiger') . '/assets/js/jquery-1.11.3.min.js',
        array('scope' => 'header','group' => -9999, 'weight' => -1000)
    );
}