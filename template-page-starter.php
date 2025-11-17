<?php
/**
 * Template Name: Page Starter
 * Description: Ultra-minimal template - Clean HTML with zero wrappers
 *
 * @package Infinity_2025_Simple
 */

get_header();
?>

<main>
<?php
while ( have_posts() ) :
    the_post();
    the_content();
endwhile;
?>
</main>

<?php
get_footer();
