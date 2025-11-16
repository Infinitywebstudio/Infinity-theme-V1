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
$custom_class           = isset( $attributes['customClass'] ) ? esc_attr( $attributes['customClass'] ) : '';
$width                  = isset( $attributes['width'] ) ? esc_attr( $attributes['width'] ) : '';
$height                 = isset( $attributes['height'] ) ? esc_attr( $attributes['height'] ) : '';
$display                = isset( $attributes['display'] ) ? esc_attr( $attributes['display'] ) : '';
$flex_direction         = isset( $attributes['flexDirection'] ) ? esc_attr( $attributes['flexDirection'] ) : '';
$justify_content        = isset( $attributes['justifyContent'] ) ? esc_attr( $attributes['justifyContent'] ) : '';
$align_items            = isset( $attributes['alignItems'] ) ? esc_attr( $attributes['alignItems'] ) : '';
$gap                    = isset( $attributes['gap'] ) ? esc_attr( $attributes['gap'] ) : '';
$grid_template_columns  = isset( $attributes['gridTemplateColumns'] ) ? esc_attr( $attributes['gridTemplateColumns'] ) : '';
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

// Générer les styles CSS dans une balise <style> (pas d'inline)
$css_rules = array();

// Dimensions
if ( ! empty( $width ) ) {
    $css_rules[] = 'width:' . $width;
}
if ( ! empty( $height ) ) {
    $css_rules[] = 'height:' . $height;
}

// Layout
if ( ! empty( $display ) ) {
    $css_rules[] = 'display:' . $display;
}
if ( ! empty( $flex_direction ) ) {
    $css_rules[] = 'flex-direction:' . $flex_direction;
}
if ( ! empty( $justify_content ) ) {
    $css_rules[] = 'justify-content:' . $justify_content;
}
if ( ! empty( $align_items ) ) {
    $css_rules[] = 'align-items:' . $align_items;
}
if ( ! empty( $gap ) ) {
    $css_rules[] = 'gap:' . $gap;
}
if ( ! empty( $grid_template_columns ) ) {
    $css_rules[] = 'grid-template-columns:' . $grid_template_columns;
}

// Background
if ( ! empty( $background_color ) ) {
    $css_rules[] = 'background-color:' . $background_color;
}
if ( ! empty( $background_image ) ) {
    $css_rules[] = 'background-image:url(' . $background_image . ')';
    $css_rules[] = 'background-size:cover';
    $css_rules[] = 'background-position:center';
}

// Padding
if ( ! empty( $padding_top ) ) {
    $css_rules[] = 'padding-top:' . $padding_top;
}
if ( ! empty( $padding_right ) ) {
    $css_rules[] = 'padding-right:' . $padding_right;
}
if ( ! empty( $padding_bottom ) ) {
    $css_rules[] = 'padding-bottom:' . $padding_bottom;
}
if ( ! empty( $padding_left ) ) {
    $css_rules[] = 'padding-left:' . $padding_left;
}

// Margin
if ( ! empty( $margin_top ) ) {
    $css_rules[] = 'margin-top:' . $margin_top;
}
if ( ! empty( $margin_right ) ) {
    $css_rules[] = 'margin-right:' . $margin_right;
}
if ( ! empty( $margin_bottom ) ) {
    $css_rules[] = 'margin-bottom:' . $margin_bottom;
}
if ( ! empty( $margin_left ) ) {
    $css_rules[] = 'margin-left:' . $margin_left;
}

// Border
if ( ! empty( $border_width ) && ! empty( $border_color ) ) {
    $css_rules[] = 'border:' . $border_width . ' ' . $border_style . ' ' . $border_color;
}
if ( ! empty( $border_radius ) ) {
    $css_rules[] = 'border-radius:' . $border_radius;
}

// Construire les classes
$classes = array( 'container' );
$style_class = '';

// Si une classe personnalisée est définie, l'utiliser pour le CSS
// Sinon, générer une classe unique basée sur les attributs
if ( ! empty( $custom_class ) ) {
    $classes[] = $custom_class;
    $style_class = $custom_class;
} else {
    // Générer une classe unique basée sur un hash des attributs
    $unique_id = 'inf-' . substr( md5( serialize( $attributes ) ), 0, 8 );
    $classes[] = $unique_id;
    $style_class = $unique_id;
}

$class_attr = 'class="' . implode( ' ', $classes ) . '"';

// Générer la balise <style> si des règles CSS existent
$style_tag = '';
if ( ! empty( $css_rules ) ) {
    $css_selector = '.' . $style_class;
    $style_tag = '<style>' . $css_selector . '{' . implode( ';', $css_rules ) . ';}</style>';
}

?>
<?php echo $style_tag; ?>
<div <?php echo $class_attr; ?>>
    <?php echo $content; ?>
</div>
