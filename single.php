<?php
/**
 * The template for displaying single posts
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

                <div class="entry-meta">
                    <?php
                    infinity_posted_on();
                    infinity_posted_by();
                    infinity_categories();
                    ?>
                    <span class="reading-time">
                        <?php
                        printf(
                            esc_html__( '%s min de lecture', 'infinity' ),
                            infinity_reading_time()
                        );
                        ?>
                    </span>
                </div>
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

            <footer class="entry-footer">
                <?php infinity_tags(); ?>
            </footer>

        </article>

        <?php
        // Post navigation
        infinity_post_navigation();

        // Comments
        if ( comments_open() || get_comments_number() ) :
            comments_template();
        endif;

    endwhile;
    ?>

</main>

<?php
get_footer();
