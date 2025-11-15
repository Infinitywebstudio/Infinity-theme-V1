<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="site-main">

    <div class="error-404 not-found">
        <header class="page-header">
            <h1 class="page-title"><?php esc_html_e( '404', 'infinity' ); ?></h1>
            <p class="page-subtitle"><?php esc_html_e( 'Page non trouvée', 'infinity' ); ?></p>
        </header>

        <div class="page-content">
            <p><?php esc_html_e( 'Désolé, la page que vous recherchez semble introuvable. Elle a peut-être été déplacée ou supprimée.', 'infinity' ); ?></p>

            <div class="error-404-search">
                <h2><?php esc_html_e( 'Essayez une recherche', 'infinity' ); ?></h2>
                <?php get_search_form(); ?>
            </div>

            <div class="error-404-links">
                <h2><?php esc_html_e( 'Liens utiles', 'infinity' ); ?></h2>
                <ul>
                    <li>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                            <?php esc_html_e( 'Retour à l\'accueil', 'infinity' ); ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>">
                            <?php esc_html_e( 'Voir le blog', 'infinity' ); ?>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</main>

<?php
get_footer();
