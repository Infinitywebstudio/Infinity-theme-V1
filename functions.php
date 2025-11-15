<?php
/**
 * Infinity 2025 Simple - Functions and definitions
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Define Constants
 */
define( 'INFINITY_VERSION', '1.0.0' );
define( 'INFINITY_DIR', get_template_directory() );
define( 'INFINITY_URI', get_template_directory_uri() );

/**
 * Load theme files
 */
require_once INFINITY_DIR . '/inc/setup.php';
require_once INFINITY_DIR . '/inc/enqueue.php';
require_once INFINITY_DIR . '/inc/helpers.php';

/**
 * Load WooCommerce integration if WooCommerce is active
 */
if ( class_exists( 'WooCommerce' ) ) {
    require_once INFINITY_DIR . '/inc/integrations/woocommerce.php';
}

/**
 * After setup theme hook
 */
add_action( 'after_setup_theme', 'infinity_setup' );

/**
 * Enqueue scripts and styles
 */
add_action( 'wp_enqueue_scripts', 'infinity_enqueue_assets' );
