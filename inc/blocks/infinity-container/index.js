(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl, __experimentalBoxControl: BoxControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;

    registerBlockType('infinity/container', {
        title: 'Infinity Container',
        icon: 'grid-view',
        category: 'design',
        attributes: {
            customClass: { type: 'string', default: '' },
            paddingTop: { type: 'string', default: '' },
            paddingRight: { type: 'string', default: '' },
            paddingBottom: { type: 'string', default: '' },
            paddingLeft: { type: 'string', default: '' },
            marginTop: { type: 'string', default: '' },
            marginRight: { type: 'string', default: '' },
            marginBottom: { type: 'string', default: '' },
            marginLeft: { type: 'string', default: '' },
            backgroundColor: { type: 'string', default: '' },
            backgroundImage: { type: 'string', default: '' },
            borderColor: { type: 'string', default: '' },
            borderWidth: { type: 'string', default: '' },
            borderRadius: { type: 'string', default: '' },
            borderStyle: { type: 'string', default: 'solid' }
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                customClass,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                marginTop, marginRight, marginBottom, marginLeft,
                backgroundColor, backgroundImage,
                borderColor, borderWidth, borderRadius, borderStyle
            } = attributes;

            // Styles pour l'éditeur
            const containerStyle = {};
            if (paddingTop) containerStyle.paddingTop = paddingTop;
            if (paddingRight) containerStyle.paddingRight = paddingRight;
            if (paddingBottom) containerStyle.paddingBottom = paddingBottom;
            if (paddingLeft) containerStyle.paddingLeft = paddingLeft;
            if (marginTop) containerStyle.marginTop = marginTop;
            if (marginRight) containerStyle.marginRight = marginRight;
            if (marginBottom) containerStyle.marginBottom = marginBottom;
            if (marginLeft) containerStyle.marginLeft = marginLeft;
            if (backgroundColor) containerStyle.backgroundColor = backgroundColor;
            if (backgroundImage) {
                containerStyle.backgroundImage = 'url(' + backgroundImage + ')';
                containerStyle.backgroundSize = 'cover';
                containerStyle.backgroundPosition = 'center';
            }
            if (borderWidth && borderColor) {
                containerStyle.border = borderWidth + ' ' + borderStyle + ' ' + borderColor;
            }
            if (borderRadius) containerStyle.borderRadius = borderRadius;

            const blockProps = useBlockProps({
                className: 'container ' + (customClass || ''),
                style: containerStyle
            });

            return el(Fragment, {},
                el(InspectorControls, {},
                    // Classe CSS
                    el(PanelBody, { title: 'Classe CSS', initialOpen: false },
                        el(TextControl, {
                            label: 'Classe personnalisée',
                            value: customClass,
                            onChange: function(value) { setAttributes({ customClass: value }); },
                            help: 'Ajouter une classe CSS personnalisée'
                        })
                    ),
                    // Padding
                    el(PanelBody, { title: 'Padding', initialOpen: false },
                        el(TextControl, {
                            label: 'Haut',
                            value: paddingTop,
                            onChange: function(value) { setAttributes({ paddingTop: value }); },
                            placeholder: 'Ex: 20px, 2rem'
                        }),
                        el(TextControl, {
                            label: 'Droite',
                            value: paddingRight,
                            onChange: function(value) { setAttributes({ paddingRight: value }); },
                            placeholder: 'Ex: 20px, 2rem'
                        }),
                        el(TextControl, {
                            label: 'Bas',
                            value: paddingBottom,
                            onChange: function(value) { setAttributes({ paddingBottom: value }); },
                            placeholder: 'Ex: 20px, 2rem'
                        }),
                        el(TextControl, {
                            label: 'Gauche',
                            value: paddingLeft,
                            onChange: function(value) { setAttributes({ paddingLeft: value }); },
                            placeholder: 'Ex: 20px, 2rem'
                        })
                    ),
                    // Margin
                    el(PanelBody, { title: 'Margin', initialOpen: false },
                        el(TextControl, {
                            label: 'Haut',
                            value: marginTop,
                            onChange: function(value) { setAttributes({ marginTop: value }); },
                            placeholder: 'Ex: 20px, 2rem'
                        }),
                        el(TextControl, {
                            label: 'Droite',
                            value: marginRight,
                            onChange: function(value) { setAttributes({ marginRight: value }); },
                            placeholder: 'Ex: 20px, 2rem, auto'
                        }),
                        el(TextControl, {
                            label: 'Bas',
                            value: marginBottom,
                            onChange: function(value) { setAttributes({ marginBottom: value }); },
                            placeholder: 'Ex: 20px, 2rem'
                        }),
                        el(TextControl, {
                            label: 'Gauche',
                            value: marginLeft,
                            onChange: function(value) { setAttributes({ marginLeft: value }); },
                            placeholder: 'Ex: 20px, 2rem, auto'
                        })
                    ),
                    // Arrière-plan
                    el(PanelBody, { title: 'Arrière-plan', initialOpen: false },
                        el(TextControl, {
                            label: 'Couleur de fond (hex)',
                            value: backgroundColor,
                            onChange: function(value) { setAttributes({ backgroundColor: value }); },
                            placeholder: 'Ex: #f5f5f5'
                        }),
                        el(TextControl, {
                            label: 'URL Image de fond',
                            value: backgroundImage,
                            onChange: function(value) { setAttributes({ backgroundImage: value }); },
                            placeholder: 'https://...'
                        })
                    ),
                    // Bordure
                    el(PanelBody, { title: 'Bordure', initialOpen: false },
                        el(TextControl, {
                            label: 'Épaisseur',
                            value: borderWidth,
                            onChange: function(value) { setAttributes({ borderWidth: value }); },
                            placeholder: 'Ex: 1px, 2px'
                        }),
                        el(TextControl, {
                            label: 'Couleur (hex)',
                            value: borderColor,
                            onChange: function(value) { setAttributes({ borderColor: value }); },
                            placeholder: 'Ex: #000000'
                        }),
                        el(TextControl, {
                            label: 'Rayon',
                            value: borderRadius,
                            onChange: function(value) { setAttributes({ borderRadius: value }); },
                            placeholder: 'Ex: 5px, 10px'
                        })
                    )
                ),
                el('div', blockProps,
                    el(InnerBlocks)
                )
            );
        },

        save: function() {
            // Utilise render_callback PHP - pas de save nécessaire
            return null;
        }
    });
})(window.wp);
