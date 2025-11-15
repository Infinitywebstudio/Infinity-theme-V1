<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
    echo get_the_password_form();
    return;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'product-single', $product ); ?>>

    <div class="product-single-content">

        <div class="product-gallery-wrapper">
            <?php
            /**
             * Hook: woocommerce_before_single_product_summary.
             */
            do_action( 'woocommerce_before_single_product_summary' );
            ?>
        </div>

        <div class="product-summary-wrapper summary entry-summary">
            <?php
            /**
             * Hook: woocommerce_single_product_summary.
             */
            do_action( 'woocommerce_single_product_summary' );
            ?>
        </div>

    </div>

    <?php
    /**
     * Hook: woocommerce_after_single_product_summary.
     */
    do_action( 'woocommerce_after_single_product_summary' );
    ?>
</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
