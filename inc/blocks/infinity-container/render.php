<?php
/**
 * Infinity Container Block Render Template
 *
 * @package Infinity_2025_Simple
 *
 * @var array $attributes Block attributes
 * @var string $content Block content
 * @var WP_Block $block Block instance
 */

// Récupérer les attributs
$custom_class      = isset( $attributes['customClass'] ) ? esc_attr( $attributes['customClass'] ) : '';
$width             = isset( $attributes['width'] ) ? esc_attr( $attributes['width'] ) : '';
$height            = isset( $attributes['height'] ) ? esc_attr( $attributes['height'] ) : '';
$padding_top       = isset( $attributes['paddingTop'] ) ? esc_attr( $attributes['paddingTop'] ) : '';
$padding_right     = isset( $attributes['paddingRight'] ) ? esc_attr( $attributes['paddingRight'] ) : '';
$padding_bottom    = isset( $attributes['paddingBottom'] ) ? esc_attr( $attributes['paddingBottom'] ) : '';
$padding_left      = isset( $attributes['paddingLeft'] ) ? esc_attr( $attributes['paddingLeft'] ) : '';
$margin_top        = isset( $attributes['marginTop'] ) ? esc_attr( $attributes['marginTop'] ) : '';
$margin_right      = isset( $attributes['marginRight'] ) ? esc_attr( $attributes['marginRight'] ) : '';
$margin_bottom     = isset( $attributes['marginBottom'] ) ? esc_attr( $attributes['marginBottom'] ) : '';
$margin_left       = isset( $attributes['marginLeft'] ) ? esc_attr( $attributes['marginLeft'] ) : '';
$background_color  = isset( $attributes['backgroundColor'] ) ? esc_attr( $attributes['backgroundColor'] ) : '';
$background_image  = isset( $attributes['backgroundImage'] ) ? esc_url( $attributes['backgroundImage'] ) : '';
$border_color      = isset( $attributes['borderColor'] ) ? esc_attr( $attributes['borderColor'] ) : '';
$border_width      = isset( $attributes['borderWidth'] ) ? esc_attr( $attributes['borderWidth'] ) : '';
$border_radius     = isset( $attributes['borderRadius'] ) ? esc_attr( $attributes['borderRadius'] ) : '';
$border_style      = isset( $attributes['borderStyle'] ) ? esc_attr( $attributes['borderStyle'] ) : 'solid';

// Construire le style inline (seulement si des valeurs sont définies)
$styles = array();

if ( ! empty( $width ) ) {
    $styles[] = 'width:' . $width;
}
if ( ! empty( $height ) ) {
    $styles[] = 'height:' . $height;
}

if ( ! empty( $padding_top ) ) {
    $styles[] = 'padding-top:' . $padding_top;
}
if ( ! empty( $padding_right ) ) {
    $styles[] = 'padding-right:' . $padding_right;
}
if ( ! empty( $padding_bottom ) ) {
    $styles[] = 'padding-bottom:' . $padding_bottom;
}
if ( ! empty( $padding_left ) ) {
    $styles[] = 'padding-left:' . $padding_left;
}

if ( ! empty( $margin_top ) ) {
    $styles[] = 'margin-top:' . $margin_top;
}
if ( ! empty( $margin_right ) ) {
    $styles[] = 'margin-right:' . $margin_right;
}
if ( ! empty( $margin_bottom ) ) {
    $styles[] = 'margin-bottom:' . $margin_bottom;
}
if ( ! empty( $margin_left ) ) {
    $styles[] = 'margin-left:' . $margin_left;
}

if ( ! empty( $background_color ) ) {
    $styles[] = 'background-color:' . $background_color;
}
if ( ! empty( $background_image ) ) {
    $styles[] = 'background-image:url(' . $background_image . ')';
    $styles[] = 'background-size:cover';
    $styles[] = 'background-position:center';
}

if ( ! empty( $border_width ) && ! empty( $border_color ) ) {
    $styles[] = 'border:' . $border_width . ' ' . $border_style . ' ' . $border_color;
}
if ( ! empty( $border_radius ) ) {
    $styles[] = 'border-radius:' . $border_radius;
}

// Générer l'attribut style
$style_attr = ! empty( $styles ) ? ' style="' . implode( ';', $styles ) . '"' : '';

// Construire les classes
$classes = array( 'container' );
if ( ! empty( $custom_class ) ) {
    $classes[] = $custom_class;
}
$class_attr = 'class="' . implode( ' ', $classes ) . '"';

?>
<div <?php echo $class_attr . $style_attr; ?>>
    <?php echo $content; ?>
</div>
