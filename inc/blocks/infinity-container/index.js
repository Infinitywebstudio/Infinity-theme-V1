(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl, SelectControl, Button, __experimentalBoxControl: BoxControl } = wp.components;
    const { createElement: el, Fragment, useState } = wp.element;

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
            gapRow: { type: 'string', default: '' },
            gapColumn: { type: 'string', default: '' },
            backgroundColor: { type: 'string', default: '' },
            backgroundImage: { type: 'string', default: '' },
            borderColor: { type: 'string', default: '' },
            borderWidth: { type: 'string', default: '' },
            borderWidthTop: { type: 'string', default: '' },
            borderWidthRight: { type: 'string', default: '' },
            borderWidthBottom: { type: 'string', default: '' },
            borderWidthLeft: { type: 'string', default: '' },
            borderRadius: { type: 'string', default: '' },
            borderRadiusTopLeft: { type: 'string', default: '' },
            borderRadiusTopRight: { type: 'string', default: '' },
            borderRadiusBottomRight: { type: 'string', default: '' },
            borderRadiusBottomLeft: { type: 'string', default: '' },
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
                gapRow, gapColumn,
                backgroundColor, backgroundImage,
                borderColor, borderWidth, borderWidthTop, borderWidthRight, borderWidthBottom, borderWidthLeft,
                borderRadius, borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft,
                borderStyle,
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

            // Gap handling - use new gapRow and gapColumn if set, fallback to old gap
            if (gapRow && gapColumn) {
                containerStyle.gap = gapRow + ' ' + gapColumn;
            } else if (gapRow || gapColumn) {
                containerStyle.gap = (gapRow || gapColumn);
            } else if (gap) {
                containerStyle.gap = gap;
            }

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

            // Border width (individual sides)
            if (borderWidthTop) containerStyle.borderTopWidth = borderWidthTop;
            if (borderWidthRight) containerStyle.borderRightWidth = borderWidthRight;
            if (borderWidthBottom) containerStyle.borderBottomWidth = borderWidthBottom;
            if (borderWidthLeft) containerStyle.borderLeftWidth = borderWidthLeft;

            // Border style and color
            if (borderColor) containerStyle.borderColor = borderColor;
            if (borderStyle) {
                containerStyle.borderStyle = borderStyle;
            } else if (borderWidthTop || borderWidthRight || borderWidthBottom || borderWidthLeft) {
                containerStyle.borderStyle = 'solid';
            }

            // Border radius (individual corners)
            if (borderRadiusTopLeft) containerStyle.borderTopLeftRadius = borderRadiusTopLeft;
            if (borderRadiusTopRight) containerStyle.borderTopRightRadius = borderRadiusTopRight;
            if (borderRadiusBottomRight) containerStyle.borderBottomRightRadius = borderRadiusBottomRight;
            if (borderRadiusBottomLeft) containerStyle.borderBottomLeftRadius = borderRadiusBottomLeft;

            const blockProps = useBlockProps({
                className: 'container ' + (customClass || ''),
                style: containerStyle
            });

            // Create innerBlocksProps to apply flex/grid styles to the InnerBlocks wrapper
            const innerBlocksStyle = {};
            if (display === 'flex') {
                innerBlocksStyle.display = 'flex';
                if (flexDirection) innerBlocksStyle.flexDirection = flexDirection;
                if (justifyContent) innerBlocksStyle.justifyContent = justifyContent;
                if (alignItems) innerBlocksStyle.alignItems = alignItems;

                // Gap handling for flex
                if (gapRow && gapColumn) {
                    innerBlocksStyle.gap = gapRow + ' ' + gapColumn;
                } else if (gapRow || gapColumn) {
                    innerBlocksStyle.gap = (gapRow || gapColumn);
                } else if (gap) {
                    innerBlocksStyle.gap = gap;
                }
            } else if (display === 'grid') {
                innerBlocksStyle.display = 'grid';
                if (gridTemplateColumns) innerBlocksStyle.gridTemplateColumns = gridTemplateColumns;

                // Gap handling for grid
                if (gapRow && gapColumn) {
                    innerBlocksStyle.gap = gapRow + ' ' + gapColumn;
                } else if (gapRow || gapColumn) {
                    innerBlocksStyle.gap = (gapRow || gapColumn);
                } else if (gap) {
                    innerBlocksStyle.gap = gap;
                }
            }

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
                    (function() {
                        const [paddingLinked, setPaddingLinked] = useState(false);
                        const [paddingUnit, setPaddingUnit] = useState('px');
                        const [paddingDropdownOpen, setPaddingDropdownOpen] = useState(false);

                        const handlePaddingChange = function(side, value) {
                            // Store numeric value with unit
                            var processedValue = value ? value.trim() + paddingUnit : '';

                            if (paddingLinked) {
                                setAttributes({
                                    paddingTop: processedValue,
                                    paddingRight: processedValue,
                                    paddingBottom: processedValue,
                                    paddingLeft: processedValue
                                });
                            } else {
                                var attrs = {};
                                attrs['padding' + side] = processedValue;
                                setAttributes(attrs);
                            }
                        };

                        const extractNumericValue = function(value) {
                            if (!value) return '';
                            return value.replace(/[a-z%]+$/i, '');
                        };

                        return el(PanelBody, {
                            title: 'Padding',
                            initialOpen: false
                        },
                            el('div', { className: 'infinity-spacing-header' },
                                el('span', { className: 'infinity-spacing-title' }, 'Value'),
                                el('div', {
                                    className: 'infinity-unit-selector',
                                    onClick: function(e) {
                                        e.stopPropagation();
                                        setPaddingDropdownOpen(!paddingDropdownOpen);
                                    }
                                },
                                    el('span', {}, paddingUnit),
                                    el('span', { className: 'infinity-dropdown-icon' }, '▼'),
                                    el('div', {
                                        className: 'infinity-dropdown-menu' + (paddingDropdownOpen ? ' show' : ''),
                                        onClick: function(e) { e.stopPropagation(); }
                                    },
                                        ['px', 'rem', 'em', '%', 'vh', 'vw', 'auto'].map(function(unit) {
                                            return el('div', {
                                                key: unit,
                                                className: 'infinity-dropdown-item' + (paddingUnit === unit ? ' active' : ''),
                                                onClick: function(e) {
                                                    e.stopPropagation();
                                                    setPaddingUnit(unit);
                                                    setPaddingDropdownOpen(false);
                                                }
                                            }, unit);
                                        })
                                    )
                                )
                            ),
                            el('div', { className: 'infinity-spacing-controls' },
                                el('div', { className: 'infinity-spacing-row' },
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(paddingTop),
                                            onChange: function(e) { handlePaddingChange('Top', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(paddingRight),
                                            onChange: function(e) { handlePaddingChange('Right', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(paddingBottom),
                                            onChange: function(e) { handlePaddingChange('Bottom', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(paddingLeft),
                                            onChange: function(e) { handlePaddingChange('Left', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('button', {
                                        className: 'infinity-spacing-link-button' + (paddingLinked ? ' active' : ''),
                                        onClick: function() { setPaddingLinked(!paddingLinked); }
                                    },
                                        el('svg', {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            width: 14,
                                            height: 14,
                                            fill: 'currentColor',
                                            viewBox: '0 0 16 16'
                                        },
                                            el('path', {
                                                d: 'M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z'
                                            }),
                                            el('path', {
                                                d: 'M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z'
                                            })
                                        )
                                    )
                                )
                            ),
                            el('div', { className: 'infinity-spacing-labels' },
                                el('span', { className: 'infinity-spacing-label' }, 'Top'),
                                el('span', { className: 'infinity-spacing-label' }, 'Right'),
                                el('span', { className: 'infinity-spacing-label' }, 'Bottom'),
                                el('span', { className: 'infinity-spacing-label' }, 'Left'),
                                el('span', { className: 'infinity-spacing-label' }, '')
                            )
                        );
                    })(),
                    // Margin
                    (function() {
                        const [marginLinked, setMarginLinked] = useState(false);
                        const [marginUnit, setMarginUnit] = useState('px');
                        const [marginDropdownOpen, setMarginDropdownOpen] = useState(false);

                        const handleMarginChange = function(side, value) {
                            // Store numeric value with unit
                            var processedValue = value ? value.trim() + marginUnit : '';

                            if (marginLinked) {
                                setAttributes({
                                    marginTop: processedValue,
                                    marginRight: processedValue,
                                    marginBottom: processedValue,
                                    marginLeft: processedValue
                                });
                            } else {
                                var attrs = {};
                                attrs['margin' + side] = processedValue;
                                setAttributes(attrs);
                            }
                        };

                        const extractNumericValue = function(value) {
                            if (!value) return '';
                            return value.replace(/[a-z%]+$/i, '');
                        };

                        return el(PanelBody, {
                            title: 'Margin',
                            initialOpen: false
                        },
                            el('div', { className: 'infinity-spacing-header' },
                                el('span', { className: 'infinity-spacing-title' }, 'Value'),
                                el('div', {
                                    className: 'infinity-unit-selector',
                                    onClick: function(e) {
                                        e.stopPropagation();
                                        setMarginDropdownOpen(!marginDropdownOpen);
                                    }
                                },
                                    el('span', {}, marginUnit),
                                    el('span', { className: 'infinity-dropdown-icon' }, '▼'),
                                    el('div', {
                                        className: 'infinity-dropdown-menu' + (marginDropdownOpen ? ' show' : ''),
                                        onClick: function(e) { e.stopPropagation(); }
                                    },
                                        ['px', 'rem', 'em', '%', 'vh', 'vw', 'auto'].map(function(unit) {
                                            return el('div', {
                                                key: unit,
                                                className: 'infinity-dropdown-item' + (marginUnit === unit ? ' active' : ''),
                                                onClick: function(e) {
                                                    e.stopPropagation();
                                                    setMarginUnit(unit);
                                                    setMarginDropdownOpen(false);
                                                }
                                            }, unit);
                                        })
                                    )
                                )
                            ),
                            el('div', { className: 'infinity-spacing-controls' },
                                el('div', { className: 'infinity-spacing-row' },
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(marginTop),
                                            onChange: function(e) { handleMarginChange('Top', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(marginRight),
                                            onChange: function(e) { handleMarginChange('Right', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(marginBottom),
                                            onChange: function(e) { handleMarginChange('Bottom', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(marginLeft),
                                            onChange: function(e) { handleMarginChange('Left', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('button', {
                                        className: 'infinity-spacing-link-button' + (marginLinked ? ' active' : ''),
                                        onClick: function() { setMarginLinked(!marginLinked); }
                                    },
                                        el('svg', {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            width: 14,
                                            height: 14,
                                            fill: 'currentColor',
                                            viewBox: '0 0 16 16'
                                        },
                                            el('path', {
                                                d: 'M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z'
                                            }),
                                            el('path', {
                                                d: 'M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z'
                                            })
                                        )
                                    )
                                )
                            ),
                            el('div', { className: 'infinity-spacing-labels' },
                                el('span', { className: 'infinity-spacing-label' }, 'Top'),
                                el('span', { className: 'infinity-spacing-label' }, 'Right'),
                                el('span', { className: 'infinity-spacing-label' }, 'Bottom'),
                                el('span', { className: 'infinity-spacing-label' }, 'Left'),
                                el('span', { className: 'infinity-spacing-label' }, '')
                            )
                        );
                    })(),
                    // Gap
                    (function() {
                        const [gapLinked, setGapLinked] = useState(false);
                        const [gapUnit, setGapUnit] = useState('px');
                        const [gapDropdownOpen, setGapDropdownOpen] = useState(false);

                        const handleGapChange = function(axis, value) {
                            // Store numeric value with unit
                            var processedValue = value ? value.trim() + gapUnit : '';

                            if (gapLinked) {
                                setAttributes({
                                    gapRow: processedValue,
                                    gapColumn: processedValue
                                });
                            } else {
                                var attrs = {};
                                attrs['gap' + axis] = processedValue;
                                setAttributes(attrs);
                            }
                        };

                        const extractNumericValue = function(value) {
                            if (!value) return '';
                            return value.replace(/[a-z%]+$/i, '');
                        };

                        return el(PanelBody, {
                            title: 'Gap',
                            initialOpen: false
                        },
                            el('div', { className: 'infinity-spacing-header' },
                                el('span', { className: 'infinity-spacing-title' }, 'Value'),
                                el('div', {
                                    className: 'infinity-unit-selector',
                                    onClick: function(e) {
                                        e.stopPropagation();
                                        setGapDropdownOpen(!gapDropdownOpen);
                                    }
                                },
                                    el('span', {}, gapUnit),
                                    el('span', { className: 'infinity-dropdown-icon' }, '▼'),
                                    el('div', {
                                        className: 'infinity-dropdown-menu' + (gapDropdownOpen ? ' show' : ''),
                                        onClick: function(e) { e.stopPropagation(); }
                                    },
                                        ['px', 'rem', 'em', '%', 'vh', 'vw'].map(function(unit) {
                                            return el('div', {
                                                key: unit,
                                                className: 'infinity-dropdown-item' + (gapUnit === unit ? ' active' : ''),
                                                onClick: function(e) {
                                                    e.stopPropagation();
                                                    setGapUnit(unit);
                                                    setGapDropdownOpen(false);
                                                }
                                            }, unit);
                                        })
                                    )
                                )
                            ),
                            el('div', { className: 'infinity-spacing-controls' },
                                el('div', { className: 'infinity-spacing-row' },
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(gapRow),
                                            onChange: function(e) { handleGapChange('Row', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('div', { className: 'infinity-spacing-input-wrapper' },
                                        el('input', {
                                            type: 'text',
                                            className: 'infinity-spacing-input',
                                            value: extractNumericValue(gapColumn),
                                            onChange: function(e) { handleGapChange('Column', e.target.value); },
                                            placeholder: '0'
                                        })
                                    ),
                                    el('button', {
                                        className: 'infinity-spacing-link-button' + (gapLinked ? ' active' : ''),
                                        onClick: function() { setGapLinked(!gapLinked); }
                                    },
                                        el('svg', {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            width: 14,
                                            height: 14,
                                            fill: 'currentColor',
                                            viewBox: '0 0 16 16'
                                        },
                                            el('path', {
                                                d: 'M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z'
                                            }),
                                            el('path', {
                                                d: 'M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z'
                                            })
                                        )
                                    )
                                )
                            ),
                            el('div', { className: 'infinity-spacing-labels' },
                                el('span', { className: 'infinity-spacing-label' }, 'Row'),
                                el('span', { className: 'infinity-spacing-label' }, 'Column'),
                                el('span', { className: 'infinity-spacing-label' }, '')
                            )
                        );
                    })(),
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
                            label: 'Couleur (hex)',
                            value: borderColor,
                            onChange: function(value) { setAttributes({ borderColor: value }); },
                            placeholder: 'Ex: #000000'
                        }),
                        // Border Width
                        (function() {
                            const [borderWidthLinked, setBorderWidthLinked] = useState(false);
                            const [borderWidthUnit, setBorderWidthUnit] = useState('px');
                            const [borderWidthDropdownOpen, setBorderWidthDropdownOpen] = useState(false);

                            const handleBorderWidthChange = function(side, value) {
                                // Store numeric value with unit
                                var processedValue = value ? value.trim() + borderWidthUnit : '';

                                if (borderWidthLinked) {
                                    setAttributes({
                                        borderWidthTop: processedValue,
                                        borderWidthRight: processedValue,
                                        borderWidthBottom: processedValue,
                                        borderWidthLeft: processedValue
                                    });
                                } else {
                                    var attrs = {};
                                    attrs['borderWidth' + side] = processedValue;
                                    setAttributes(attrs);
                                }
                            };

                            const extractNumericValue = function(value) {
                                if (!value) return '';
                                return value.replace(/[a-z%]+$/i, '');
                            };

                            return el('div', { style: { marginTop: '16px' } },
                                el('div', { className: 'infinity-spacing-header' },
                                    el('span', { className: 'infinity-spacing-title' }, 'Épaisseur'),
                                    el('div', {
                                        className: 'infinity-unit-selector',
                                        onClick: function(e) {
                                            e.stopPropagation();
                                            setBorderWidthDropdownOpen(!borderWidthDropdownOpen);
                                        }
                                    },
                                        el('span', {}, borderWidthUnit),
                                        el('span', { className: 'infinity-dropdown-icon' }, '▼'),
                                        el('div', {
                                            className: 'infinity-dropdown-menu' + (borderWidthDropdownOpen ? ' show' : ''),
                                            onClick: function(e) { e.stopPropagation(); }
                                        },
                                            ['px', 'rem', 'em', '%'].map(function(unit) {
                                                return el('div', {
                                                    key: unit,
                                                    className: 'infinity-dropdown-item' + (borderWidthUnit === unit ? ' active' : ''),
                                                    onClick: function(e) {
                                                        e.stopPropagation();
                                                        setBorderWidthUnit(unit);
                                                        setBorderWidthDropdownOpen(false);
                                                    }
                                                }, unit);
                                            })
                                        )
                                    )
                                ),
                                el('div', { className: 'infinity-spacing-controls' },
                                    el('div', { className: 'infinity-spacing-row' },
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderWidthTop),
                                                onChange: function(e) { handleBorderWidthChange('Top', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderWidthRight),
                                                onChange: function(e) { handleBorderWidthChange('Right', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderWidthBottom),
                                                onChange: function(e) { handleBorderWidthChange('Bottom', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderWidthLeft),
                                                onChange: function(e) { handleBorderWidthChange('Left', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('button', {
                                            className: 'infinity-spacing-link-button' + (borderWidthLinked ? ' active' : ''),
                                            onClick: function() { setBorderWidthLinked(!borderWidthLinked); }
                                        },
                                            el('svg', {
                                                xmlns: 'http://www.w3.org/2000/svg',
                                                width: 14,
                                                height: 14,
                                                fill: 'currentColor',
                                                viewBox: '0 0 16 16'
                                            },
                                                el('path', {
                                                    d: 'M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z'
                                                }),
                                                el('path', {
                                                    d: 'M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z'
                                                })
                                            )
                                        )
                                    )
                                ),
                                el('div', { className: 'infinity-spacing-labels' },
                                    el('span', { className: 'infinity-spacing-label' }, 'Top'),
                                    el('span', { className: 'infinity-spacing-label' }, 'Right'),
                                    el('span', { className: 'infinity-spacing-label' }, 'Bottom'),
                                    el('span', { className: 'infinity-spacing-label' }, 'Left'),
                                    el('span', { className: 'infinity-spacing-label' }, '')
                                )
                            );
                        })(),
                        // Border Radius
                        (function() {
                            const [borderRadiusLinked, setBorderRadiusLinked] = useState(false);
                            const [borderRadiusUnit, setBorderRadiusUnit] = useState('px');
                            const [borderRadiusDropdownOpen, setBorderRadiusDropdownOpen] = useState(false);

                            const handleBorderRadiusChange = function(corner, value) {
                                // Store numeric value with unit
                                var processedValue = value ? value.trim() + borderRadiusUnit : '';

                                if (borderRadiusLinked) {
                                    setAttributes({
                                        borderRadiusTopLeft: processedValue,
                                        borderRadiusTopRight: processedValue,
                                        borderRadiusBottomRight: processedValue,
                                        borderRadiusBottomLeft: processedValue
                                    });
                                } else {
                                    var attrs = {};
                                    attrs['borderRadius' + corner] = processedValue;
                                    setAttributes(attrs);
                                }
                            };

                            const extractNumericValue = function(value) {
                                if (!value) return '';
                                return value.replace(/[a-z%]+$/i, '');
                            };

                            return el('div', { style: { marginTop: '16px' } },
                                el('div', { className: 'infinity-spacing-header' },
                                    el('span', { className: 'infinity-spacing-title' }, 'Rayon'),
                                    el('div', {
                                        className: 'infinity-unit-selector',
                                        onClick: function(e) {
                                            e.stopPropagation();
                                            setBorderRadiusDropdownOpen(!borderRadiusDropdownOpen);
                                        }
                                    },
                                        el('span', {}, borderRadiusUnit),
                                        el('span', { className: 'infinity-dropdown-icon' }, '▼'),
                                        el('div', {
                                            className: 'infinity-dropdown-menu' + (borderRadiusDropdownOpen ? ' show' : ''),
                                            onClick: function(e) { e.stopPropagation(); }
                                        },
                                            ['px', 'rem', 'em', '%'].map(function(unit) {
                                                return el('div', {
                                                    key: unit,
                                                    className: 'infinity-dropdown-item' + (borderRadiusUnit === unit ? ' active' : ''),
                                                    onClick: function(e) {
                                                        e.stopPropagation();
                                                        setBorderRadiusUnit(unit);
                                                        setBorderRadiusDropdownOpen(false);
                                                    }
                                                }, unit);
                                            })
                                        )
                                    )
                                ),
                                el('div', { className: 'infinity-spacing-controls' },
                                    el('div', { className: 'infinity-spacing-row' },
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderRadiusTopLeft),
                                                onChange: function(e) { handleBorderRadiusChange('TopLeft', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderRadiusTopRight),
                                                onChange: function(e) { handleBorderRadiusChange('TopRight', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderRadiusBottomRight),
                                                onChange: function(e) { handleBorderRadiusChange('BottomRight', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('div', { className: 'infinity-spacing-input-wrapper' },
                                            el('input', {
                                                type: 'text',
                                                className: 'infinity-spacing-input',
                                                value: extractNumericValue(borderRadiusBottomLeft),
                                                onChange: function(e) { handleBorderRadiusChange('BottomLeft', e.target.value); },
                                                placeholder: '0'
                                            })
                                        ),
                                        el('button', {
                                            className: 'infinity-spacing-link-button' + (borderRadiusLinked ? ' active' : ''),
                                            onClick: function() { setBorderRadiusLinked(!borderRadiusLinked); }
                                        },
                                            el('svg', {
                                                xmlns: 'http://www.w3.org/2000/svg',
                                                width: 14,
                                                height: 14,
                                                fill: 'currentColor',
                                                viewBox: '0 0 16 16'
                                            },
                                                el('path', {
                                                    d: 'M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z'
                                                }),
                                                el('path', {
                                                    d: 'M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z'
                                                })
                                            )
                                        )
                                    )
                                ),
                                el('div', { className: 'infinity-spacing-labels' },
                                    el('span', { className: 'infinity-spacing-label' }, 'Top'),
                                    el('span', { className: 'infinity-spacing-label' }, 'Right'),
                                    el('span', { className: 'infinity-spacing-label' }, 'Bottom'),
                                    el('span', { className: 'infinity-spacing-label' }, 'Left'),
                                    el('span', { className: 'infinity-spacing-label' }, '')
                                )
                            );
                        })()
                    )
                ),
                el('div', blockProps,
                    (display === 'flex' || display === 'grid') ?
                        el('div', { style: innerBlocksStyle, className: 'infinity-inner-wrapper' },
                            el(InnerBlocks)
                        ) :
                        el(InnerBlocks)
                )
            );
        },

        save: function() {
            // Sauvegarder les InnerBlocks pour qu'ils soient disponibles pour le render callback
            return el(InnerBlocks.Content);
        }
    });
})(window.wp);
