<?php
/**
 * Enqueue scripts and styles
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enqueue theme assets (CSS and JavaScript)
 */
function infinity_enqueue_assets() {
    /**
     * Enqueue main stylesheet
     */
    wp_enqueue_style(
        'infinity-style',
        INFINITY_URI . '/assets/css/style.css',
        array(),
        INFINITY_VERSION,
        'all'
    );

    /**
     * Enqueue main JavaScript file
     */
    wp_enqueue_script(
        'infinity-main',
        INFINITY_URI . '/assets/js/main.js',
        array(),
        INFINITY_VERSION,
        true
    );

    /**
     * Enqueue comment reply script if needed
     */
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    /**
     * Localize script for AJAX and theme data
     */
    wp_localize_script(
        'infinity-main',
        'infinityData',
        array(
            'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
            'themeUrl'  => INFINITY_URI,
            'homeUrl'   => home_url(),
            'nonce'     => wp_create_nonce( 'infinity-nonce' ),
        )
    );
}
