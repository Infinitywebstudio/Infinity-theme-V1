<?php
/**
 * Template part for displaying header content
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */
?>

<div class="site-branding">
    <?php infinity_site_logo(); ?>
    <?php
    $description = get_bloginfo( 'description', 'display' );
    if ( $description || is_customize_preview() ) :
        ?>
        <p class="site-description"><?php echo $description; ?></p>
    <?php endif; ?>
</div>

<?php infinity_primary_menu(); ?>
