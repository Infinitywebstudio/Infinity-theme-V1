(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl, SelectControl, __experimentalBoxControl: BoxControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;

    registerBlockType('infinity/container', {
        title: 'Infinity Container',
        icon: 'grid-view',
        category: 'design',
        attributes: {
            customClass: { type: 'string', default: '' },
            width: { type: 'string', default: '' },
            height: { type: 'string', default: '' },
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
            borderStyle: { type: 'string', default: 'solid' },
            display: { type: 'string', default: '' },
            flexDirection: { type: 'string', default: '' },
            justifyContent: { type: 'string', default: '' },
            alignItems: { type: 'string', default: '' },
            gap: { type: 'string', default: '' },
            gridTemplateColumns: { type: 'string', default: '' }
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                customClass,
                width, height,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                marginTop, marginRight, marginBottom, marginLeft,
                backgroundColor, backgroundImage,
                borderColor, borderWidth, borderRadius, borderStyle,
                display, flexDirection, justifyContent, alignItems, gap, gridTemplateColumns
            } = attributes;

            // Styles pour l'éditeur
            const containerStyle = {};
            if (width) containerStyle.width = width;
            if (height) containerStyle.height = height;
            if (display) containerStyle.display = display;
            if (flexDirection) containerStyle.flexDirection = flexDirection;
            if (justifyContent) containerStyle.justifyContent = justifyContent;
            if (alignItems) containerStyle.alignItems = alignItems;
            if (gap) containerStyle.gap = gap;
            if (gridTemplateColumns) containerStyle.gridTemplateColumns = gridTemplateColumns;
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

            // Force InnerBlocks to always show the appender for better drop zone
            const ALLOWED_BLOCKS = null; // Allow all blocks
            const TEMPLATE = null;

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
                    // Dimensions
                    el(PanelBody, { title: 'Dimensions', initialOpen: false },
                        el(TextControl, {
                            label: 'Largeur (Width)',
                            value: width,
                            onChange: function(value) { setAttributes({ width: value }); },
                            placeholder: 'Ex: 100%, 500px, 50vw'
                        }),
                        el(TextControl, {
                            label: 'Hauteur (Height)',
                            value: height,
                            onChange: function(value) { setAttributes({ height: value }); },
                            placeholder: 'Ex: 300px, 50vh, auto'
                        })
                    ),
                    // Layout
                    el(PanelBody, { title: 'Layout', initialOpen: false },
                        el(SelectControl, {
                            label: 'Display',
                            value: display,
                            options: [
                                { label: 'Par défaut', value: '' },
                                { label: 'Flex', value: 'flex' },
                                { label: 'Grid', value: 'grid' },
                                { label: 'Block', value: 'block' }
                            ],
                            onChange: function(value) { setAttributes({ display: value }); }
                        }),
                        display === 'flex' && el(SelectControl, {
                            label: 'Flex Direction',
                            value: flexDirection,
                            options: [
                                { label: 'Par défaut', value: '' },
                                { label: 'Row (horizontal)', value: 'row' },
                                { label: 'Column (vertical)', value: 'column' },
                                { label: 'Row Reverse', value: 'row-reverse' },
                                { label: 'Column Reverse', value: 'column-reverse' }
                            ],
                            onChange: function(value) { setAttributes({ flexDirection: value }); }
                        }),
                        (display === 'flex' || display === 'grid') && el(SelectControl, {
                            label: 'Justify Content',
                            value: justifyContent,
                            options: [
                                { label: 'Par défaut', value: '' },
                                { label: 'Flex Start', value: 'flex-start' },
                                { label: 'Center', value: 'center' },
                                { label: 'Flex End', value: 'flex-end' },
                                { label: 'Space Between', value: 'space-between' },
                                { label: 'Space Around', value: 'space-around' },
                                { label: 'Space Evenly', value: 'space-evenly' }
                            ],
                            onChange: function(value) { setAttributes({ justifyContent: value }); }
                        }),
                        (display === 'flex' || display === 'grid') && el(SelectControl, {
                            label: 'Align Items',
                            value: alignItems,
                            options: [
                                { label: 'Par défaut', value: '' },
                                { label: 'Flex Start', value: 'flex-start' },
                                { label: 'Center', value: 'center' },
                                { label: 'Flex End', value: 'flex-end' },
                                { label: 'Stretch', value: 'stretch' },
                                { label: 'Baseline', value: 'baseline' }
                            ],
                            onChange: function(value) { setAttributes({ alignItems: value }); }
                        }),
                        (display === 'flex' || display === 'grid') && el(TextControl, {
                            label: 'Gap (espacement entre éléments)',
                            value: gap,
                            onChange: function(value) { setAttributes({ gap: value }); },
                            placeholder: 'Ex: 20px, 1rem'
                        }),
                        display === 'grid' && el(TextControl, {
                            label: 'Grid Template Columns',
                            value: gridTemplateColumns,
                            onChange: function(value) { setAttributes({ gridTemplateColumns: value }); },
                            placeholder: 'Ex: repeat(3, 1fr), 200px 1fr 1fr'
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
                    el(InnerBlocks, {
                        allowedBlocks: ALLOWED_BLOCKS,
                        template: TEMPLATE,
                        renderAppender: InnerBlocks.DefaultBlockAppender,
                        orientation: 'vertical'
                    })
                )
            );
        },

        save: function() {
            // Sauvegarder les InnerBlocks pour qu'ils soient disponibles pour le render callback
            return el(InnerBlocks.Content);
        }
    });
})(window.wp);
