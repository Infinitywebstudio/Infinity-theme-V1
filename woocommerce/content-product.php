<?php
/**
 * The template for displaying product content within loops
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
    return;
}
?>
<li <?php wc_product_class( 'product-item', $product ); ?>>
    <div class="product-inner">
        <?php
        /**
         * Hook: woocommerce_before_shop_loop_item.
         */
        do_action( 'woocommerce_before_shop_loop_item' );
        ?>

        <div class="product-thumbnail">
            <a href="<?php echo esc_url( $product->get_permalink() ); ?>">
                <?php echo $product->get_image( 'woocommerce_thumbnail' ); ?>
            </a>
            <?php
            /**
             * Hook: woocommerce_before_shop_loop_item_title.
             */
            do_action( 'woocommerce_before_shop_loop_item_title' );
            ?>
        </div>

        <div class="product-info">
            <?php
            /**
             * Hook: woocommerce_shop_loop_item_title.
             */
            do_action( 'woocommerce_shop_loop_item_title' );

            /**
             * Hook: woocommerce_after_shop_loop_item_title.
             */
            do_action( 'woocommerce_after_shop_loop_item_title' );

            /**
             * Hook: woocommerce_after_shop_loop_item.
             */
            do_action( 'woocommerce_after_shop_loop_item' );
            ?>
        </div>
    </div>
</li>
