<?php
/**
 * The template for displaying WooCommerce pages
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

get_header();
?>

<div class="woocommerce-container">
    <?php woocommerce_content(); ?>
</div>

<?php
get_footer();
