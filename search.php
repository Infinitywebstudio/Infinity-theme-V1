<?php
/**
 * The template for displaying search results
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="site-main">

    <?php if ( have_posts() ) : ?>

        <header class="page-header">
            <h1 class="page-title">
                <?php
                printf(
                    esc_html__( 'Résultats de recherche pour: %s', 'infinity' ),
                    '<span>' . get_search_query() . '</span>'
                );
                ?>
            </h1>
        </header>

        <div class="posts-grid">
            <?php
            while ( have_posts() ) :
                the_post();
                ?>

                <article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>

                    <?php infinity_post_thumbnail(); ?>

                    <div class="post-card-content">
                        <header class="entry-header">
                            <?php
                            the_title(
                                '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">',
                                '</a></h2>'
                            );
                            ?>
                        </header>

                        <div class="entry-meta">
                            <?php
                            infinity_posted_on();
                            infinity_posted_by();
                            ?>
                        </div>

                        <div class="entry-summary">
                            <?php the_excerpt(); ?>
                        </div>

                        <footer class="entry-footer">
                            <a href="<?php echo esc_url( get_permalink() ); ?>" class="read-more">
                                <?php esc_html_e( 'Lire la suite', 'infinity' ); ?> &rarr;
                            </a>
                        </footer>
                    </div>
                </article>

            <?php endwhile; ?>
        </div>

        <?php infinity_pagination(); ?>

    <?php else : ?>

        <div class="no-results">
            <header class="page-header">
                <h1 class="page-title"><?php esc_html_e( 'Aucun résultat trouvé', 'infinity' ); ?></h1>
            </header>

            <div class="page-content">
                <p><?php esc_html_e( 'Désolé, aucun résultat ne correspond à votre recherche. Veuillez essayer avec d\'autres mots-clés.', 'infinity' ); ?></p>
                <?php get_search_form(); ?>
            </div>
        </div>

    <?php endif; ?>

</main>

<?php
get_footer();
