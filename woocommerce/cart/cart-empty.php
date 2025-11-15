<?php
/**
 * Empty cart page
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

?>

<div class="cart-empty-message">
    <?php
    /**
     * Hook: woocommerce_cart_is_empty.
     */
    do_action( 'woocommerce_cart_is_empty' );
    ?>

    <p class="cart-empty">
        <?php esc_html_e( 'Votre panier est actuellement vide.', 'infinity' ); ?>
    </p>

    <?php do_action( 'woocommerce_cart_is_empty' ); ?>

    <p class="return-to-shop">
        <a class="button wc-backward<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>">
            <?php esc_html_e( 'Retour à la boutique', 'infinity' ); ?>
        </a>
    </p>
</div>
