<?php
/**
 * WooCommerce Integration
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * WooCommerce setup function
 */
function infinity_woocommerce_setup() {
    /**
     * Declare WooCommerce support
     */
    add_theme_support(
        'woocommerce',
        array(
            'thumbnail_image_width' => 400,
            'single_image_width'    => 600,
            'product_grid'          => array(
                'default_rows'    => 3,
                'min_rows'        => 2,
                'max_rows'        => 8,
                'default_columns' => 3,
                'min_columns'     => 2,
                'max_columns'     => 4,
            ),
        )
    );

    /**
     * Add support for WooCommerce product gallery features
     */
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'infinity_woocommerce_setup' );

/**
 * Enqueue WooCommerce styles
 */
function infinity_woocommerce_scripts() {
    wp_enqueue_style(
        'infinity-woocommerce',
        INFINITY_URI . '/assets/css/woocommerce.css',
        array( 'infinity-style' ),
        INFINITY_VERSION
    );
}
add_action( 'wp_enqueue_scripts', 'infinity_woocommerce_scripts' );

/**
 * Disable WooCommerce default styles
 * We'll use our custom styles instead
 */
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

/**
 * Set number of products per page
 */
function infinity_products_per_page() {
    return 12;
}
add_filter( 'loop_shop_per_page', 'infinity_products_per_page', 20 );

/**
 * Change number of related products
 */
function infinity_related_products_args( $args ) {
    $args['posts_per_page'] = 3;
    $args['columns']        = 3;
    return $args;
}
add_filter( 'woocommerce_output_related_products_args', 'infinity_related_products_args' );

/**
 * Remove WooCommerce breadcrumbs
 * We'll add our own or use theme breadcrumbs
 */
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );

/**
 * Remove WooCommerce sidebar
 */
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

/**
 * Customize Add to Cart button text
 */
function infinity_custom_add_to_cart_text() {
    return __( 'Ajouter au panier', 'infinity' );
}
add_filter( 'woocommerce_product_single_add_to_cart_text', 'infinity_custom_add_to_cart_text' );
add_filter( 'woocommerce_product_add_to_cart_text', 'infinity_custom_add_to_cart_text' );

/**
 * Customize product columns
 */
function infinity_loop_columns() {
    return 3;
}
add_filter( 'loop_shop_columns', 'infinity_loop_columns' );

/**
 * Remove default WooCommerce wrapper
 */
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );

/**
 * Add custom WooCommerce wrapper
 */
function infinity_woocommerce_wrapper_start() {
    echo '<main id="primary" class="site-main woocommerce-main">';
}
add_action( 'woocommerce_before_main_content', 'infinity_woocommerce_wrapper_start', 10 );

function infinity_woocommerce_wrapper_end() {
    echo '</main>';
}
add_action( 'woocommerce_after_main_content', 'infinity_woocommerce_wrapper_end', 10 );

/**
 * Customize cart fragments for AJAX updates
 */
function infinity_woocommerce_header_add_to_cart_fragment( $fragments ) {
    ob_start();
    ?>
    <span class="cart-count">
        <?php echo WC()->cart->get_cart_contents_count(); ?>
    </span>
    <?php
    $fragments['span.cart-count'] = ob_get_clean();
    return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'infinity_woocommerce_header_add_to_cart_fragment' );

/**
 * Customize sale badge text
 */
function infinity_custom_sale_text( $text, $post, $product ) {
    return '<span class="onsale">' . __( 'Promo', 'infinity' ) . '</span>';
}
add_filter( 'woocommerce_sale_flash', 'infinity_custom_sale_text', 10, 3 );

/**
 * Add cart icon to header
 */
function infinity_woocommerce_cart_link() {
    if ( ! function_exists( 'WC' ) ) {
        return;
    }
    ?>
    <a class="cart-icon" href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="<?php esc_attr_e( 'Voir le panier', 'infinity' ); ?>">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cart-count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
    </a>
    <?php
}

/**
 * Format price with custom styling
 */
function infinity_custom_price_html( $price, $product ) {
    return $price;
}
add_filter( 'woocommerce_get_price_html', 'infinity_custom_price_html', 10, 2 );

/**
 * Customize empty cart message
 */
function infinity_empty_cart_message() {
    return __( 'Votre panier est actuellement vide.', 'infinity' );
}
add_filter( 'wc_empty_cart_message', 'infinity_empty_cart_message' );

/**
 * Customize continue shopping button
 */
function infinity_continue_shopping_redirect() {
    return get_permalink( wc_get_page_id( 'shop' ) );
}
add_filter( 'woocommerce_continue_shopping_redirect', 'infinity_continue_shopping_redirect' );
