<?php
/**
 * The template for displaying all pages
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="site-main">

    <?php
    while ( have_posts() ) :
        the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <header class="entry-header">
                <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
            </header>

            <?php infinity_post_thumbnail( 'large' ); ?>

            <div class="entry-content">
                <?php
                the_content();

                wp_link_pages(
                    array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'infinity' ),
                        'after'  => '</div>',
                    )
                );
                ?>
            </div>

        </article>

        <?php
        // Comments (if enabled for pages)
        if ( comments_open() || get_comments_number() ) :
            comments_template();
        endif;

    endwhile;
    ?>

</main>

<?php
get_footer();
