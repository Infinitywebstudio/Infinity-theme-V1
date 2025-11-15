<?php
/**
 * Template Name: Blank Page
 * Description: Ultra-minimal template with only header, content, and footer
 *
 * @package Infinity_2025_Simple
 */

get_header();

if ( have_posts() ) :
    while ( have_posts() ) :
        the_post();
        ?>

        <main>
            <?php the_content(); ?>
        </main>

        <?php
    endwhile;
endif;

get_footer();
