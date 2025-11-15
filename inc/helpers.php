<?php
/**
 * Helper functions
 *
 * @package Infinity_2025_Simple
 * @since 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Display site logo or site title
 */
function infinity_site_logo() {
    if ( has_custom_logo() ) {
        the_custom_logo();
    } else {
        ?>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-title" rel="home">
            <?php bloginfo( 'name' ); ?>
        </a>
        <?php
    }
}

/**
 * Display primary navigation menu
 */
function infinity_primary_menu() {
    if ( has_nav_menu( 'primary' ) ) {
        wp_nav_menu(
            array(
                'theme_location' => 'primary',
                'menu_class'     => 'primary-menu',
                'container'      => 'nav',
                'container_class'=> 'primary-navigation',
                'fallback_cb'    => false,
            )
        );
    }
}

/**
 * Display post date
 */
function infinity_posted_on() {
    $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

    $time_string = sprintf(
        $time_string,
        esc_attr( get_the_date( 'c' ) ),
        esc_html( get_the_date() )
    );

    printf(
        '<span class="posted-on">%s</span>',
        $time_string
    );
}

/**
 * Display post author
 */
function infinity_posted_by() {
    printf(
        '<span class="posted-by">%s <a href="%s">%s</a></span>',
        esc_html__( 'Par', 'infinity' ),
        esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
        esc_html( get_the_author() )
    );
}

/**
 * Display post categories
 */
function infinity_categories() {
    $categories_list = get_the_category_list( ', ' );
    if ( $categories_list ) {
        printf(
            '<span class="categories">%s %s</span>',
            esc_html__( 'Dans', 'infinity' ),
            $categories_list
        );
    }
}

/**
 * Display post tags
 */
function infinity_tags() {
    $tags_list = get_the_tag_list( '', ', ' );
    if ( $tags_list ) {
        printf(
            '<div class="tags">%s %s</div>',
            esc_html__( 'Tags:', 'infinity' ),
            $tags_list
        );
    }
}

/**
 * Display pagination
 */
function infinity_pagination() {
    the_posts_pagination(
        array(
            'mid_size'  => 2,
            'prev_text' => __( '&laquo; Précédent', 'infinity' ),
            'next_text' => __( 'Suivant &raquo;', 'infinity' ),
        )
    );
}

/**
 * Display post navigation (single)
 */
function infinity_post_navigation() {
    the_post_navigation(
        array(
            'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Précédent', 'infinity' ) . '</span> <span class="nav-title">%title</span>',
            'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Suivant', 'infinity' ) . '</span> <span class="nav-title">%title</span>',
        )
    );
}

/**
 * Display archive title
 */
function infinity_archive_title() {
    if ( is_category() ) {
        single_cat_title();
    } elseif ( is_tag() ) {
        single_tag_title();
    } elseif ( is_author() ) {
        printf( __( 'Auteur: %s', 'infinity' ), get_the_author() );
    } elseif ( is_year() ) {
        printf( __( 'Année: %s', 'infinity' ), get_the_date( 'Y' ) );
    } elseif ( is_month() ) {
        printf( __( 'Mois: %s', 'infinity' ), get_the_date( 'F Y' ) );
    } elseif ( is_day() ) {
        printf( __( 'Jour: %s', 'infinity' ), get_the_date() );
    } else {
        the_archive_title();
    }
}

/**
 * Display featured image
 *
 * @param string $size Image size.
 */
function infinity_post_thumbnail( $size = 'post-thumbnail' ) {
    if ( has_post_thumbnail() ) {
        ?>
        <div class="post-thumbnail">
            <?php the_post_thumbnail( $size ); ?>
        </div>
        <?php
    }
}

/**
 * Get reading time estimate
 *
 * @return int Reading time in minutes.
 */
function infinity_reading_time() {
    $content      = get_post_field( 'post_content', get_the_ID() );
    $word_count   = str_word_count( strip_tags( $content ) );
    $reading_time = ceil( $word_count / 200 );

    return $reading_time;
}
