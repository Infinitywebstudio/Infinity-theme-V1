<?php
/**
 * Theme Setup and Configuration
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Sets up theme defaults and registers support for various WordPress features
 */
function infinity_setup() {
    /**
     * Make theme available for translation
     */
    load_theme_textdomain( 'infinity', INFINITY_DIR . '/languages' );

    /**
     * Add default posts and comments RSS feed links to head
     */
    add_theme_support( 'automatic-feed-links' );

    /**
     * Let WordPress manage the document title
     */
    add_theme_support( 'title-tag' );

    /**
     * Enable support for Post Thumbnails on posts and pages
     */
    add_theme_support( 'post-thumbnails' );

    /**
     * Set custom image sizes
     */
    set_post_thumbnail_size( 1200, 675, true ); // Default featured image
    add_image_size( 'infinity-medium', 800, 600, true );
    add_image_size( 'infinity-small', 400, 300, true );

    /**
     * Register navigation menus
     */
    register_nav_menus(
        array(
            'primary' => __( 'Menu Principal', 'infinity' ),
        )
    );

    /**
     * Switch default core markup to output valid HTML5
     */
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    /**
     * Add theme support for custom logo
     */
    add_theme_support(
        'custom-logo',
        array(
            'height'      => 100,
            'width'       => 400,
            'flex-height' => true,
            'flex-width'  => true,
        )
    );

    /**
     * Add support for full and wide align images in Gutenberg
     */
    add_theme_support( 'align-wide' );

    /**
     * Add support for responsive embedded content
     */
    add_theme_support( 'responsive-embeds' );

    /**
     * Add support for editor styles
     */
    add_theme_support( 'editor-styles' );

    /**
     * Customize excerpt length
     */
    add_filter( 'excerpt_length', 'infinity_excerpt_length', 999 );

    /**
     * Customize excerpt more string
     */
    add_filter( 'excerpt_more', 'infinity_excerpt_more' );
}

/**
 * Custom excerpt length
 *
 * @param int $length Excerpt length.
 * @return int Modified excerpt length.
 */
function infinity_excerpt_length( $length ) {
    return 30;
}

/**
 * Custom excerpt more string
 *
 * @param string $more The excerpt more string.
 * @return string Modified excerpt more string.
 */
function infinity_excerpt_more( $more ) {
    return '...';
}

/**
 * Set the content width in pixels
 */
function infinity_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'infinity_content_width', 1200 );
}
add_action( 'after_setup_theme', 'infinity_content_width', 0 );
