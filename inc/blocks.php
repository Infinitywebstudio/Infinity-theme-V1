<?php
/**
 * Register Custom Gutenberg Blocks
 *
 * @package Infinity_2025_Simple
 */

/**
 * Register block scripts and styles
 */
function infinity_register_block_assets() {
    // Register the block editor script
    wp_register_script(
        'infinity-container-editor',
        INFINITY_URI . '/inc/blocks/infinity-container/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components' ),
        INFINITY_VERSION,
        true
    );

    // Register the block style
    wp_register_style(
        'infinity-container-style',
        INFINITY_URI . '/inc/blocks/infinity-container/style.css',
        array(),
        INFINITY_VERSION
    );

    // Register the editor style
    wp_register_style(
        'infinity-container-editor-style',
        INFINITY_URI . '/inc/blocks/infinity-container/editor.css',
        array(),
        INFINITY_VERSION
    );
}
add_action( 'init', 'infinity_register_block_assets' );

/**
 * Register Infinity Container Block
 */
function infinity_register_blocks() {
    // Register Infinity Container block
    register_block_type( 'infinity/container', array(
        'editor_script'   => 'infinity-container-editor',
        'editor_style'    => 'infinity-container-editor-style',
        'style'           => 'infinity-container-style',
        'render_callback' => 'infinity_container_render_callback',
        'attributes'      => array(
            'customClass'        => array( 'type' => 'string', 'default' => '' ),
            'width'              => array( 'type' => 'string', 'default' => '' ),
            'height'             => array( 'type' => 'string', 'default' => '' ),
            'paddingTop'         => array( 'type' => 'string', 'default' => '' ),
            'paddingRight'       => array( 'type' => 'string', 'default' => '' ),
            'paddingBottom'      => array( 'type' => 'string', 'default' => '' ),
            'paddingLeft'        => array( 'type' => 'string', 'default' => '' ),
            'marginTop'          => array( 'type' => 'string', 'default' => '' ),
            'marginRight'        => array( 'type' => 'string', 'default' => '' ),
            'marginBottom'       => array( 'type' => 'string', 'default' => '' ),
            'marginLeft'         => array( 'type' => 'string', 'default' => '' ),
            'backgroundColor'    => array( 'type' => 'string', 'default' => '' ),
            'backgroundImage'    => array( 'type' => 'string', 'default' => '' ),
            'borderColor'        => array( 'type' => 'string', 'default' => '' ),
            'borderWidth'        => array( 'type' => 'string', 'default' => '' ),
            'borderRadius'       => array( 'type' => 'string', 'default' => '' ),
            'borderStyle'        => array( 'type' => 'string', 'default' => 'solid' ),
            'display'            => array( 'type' => 'string', 'default' => '' ),
            'flexDirection'      => array( 'type' => 'string', 'default' => '' ),
            'justifyContent'     => array( 'type' => 'string', 'default' => '' ),
            'alignItems'         => array( 'type' => 'string', 'default' => '' ),
            'gap'                => array( 'type' => 'string', 'default' => '' ),
            'gridTemplateColumns' => array( 'type' => 'string', 'default' => '' ),
        ),
    ) );
}
add_action( 'init', 'infinity_register_blocks' );

/**
 * Render callback for Infinity Container block
 */
function infinity_container_render_callback( $attributes, $content, $block ) {
    // Le contenu des InnerBlocks est déjà dans $content grâce à InnerBlocks.Content
    // Si vide, essayer de récupérer depuis $block (fallback)
    if ( empty( $content ) ) {
        if ( ! empty( $block->inner_html ) ) {
            $content = $block->inner_html;
        } elseif ( ! empty( $block->inner_blocks ) ) {
            $content = '';
            foreach ( $block->inner_blocks as $inner_block ) {
                $content .= render_block( $inner_block );
            }
        }
    }

    // Include the render template
    ob_start();
    include INFINITY_DIR . '/inc/blocks/infinity-container/render.php';
    return ob_get_clean();
}
