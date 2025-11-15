<?php
/**
 * The Template for displaying all single products
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 */
do_action( 'woocommerce_before_main_content' );

?>

<?php
while ( have_posts() ) :
    the_post();
    wc_get_template_part( 'content', 'single-product' );
endwhile;
?>

<?php
/**
 * Hook: woocommerce_after_main_content.
 */
do_action( 'woocommerce_after_main_content' );

get_footer( 'shop' );
