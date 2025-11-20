# CSS Synchronization Feature (Future Implementation)

## Vue d'ensemble

Cette fonctionnalité permettra une synchronisation bidirectionnelle entre l'éditeur WordPress et les fichiers CSS générés. Les développeurs pourront éditer le CSS manuellement dans les fichiers, et ces changements seront automatiquement reflétés dans l'éditeur Gutenberg.

---

## Problème actuel

Actuellement, le système fonctionne dans une seule direction :
```
Éditeur → Attributs du bloc → Génération CSS → Fichier CSS
```

**Limitation** : Si un développeur modifie le fichier CSS manuellement, ces changements ne sont pas visibles dans l'éditeur lors du rechargement.

---

## Solution proposée : Synchronisation bidirectionnelle

### Architecture

```
┌─────────────┐         ┌──────────────┐
│   Éditeur   │ ←─────→ │  Fichier CSS │
│ Gutenberg   │         │  (page-X.css)│
└─────────────┘         └──────────────┘
       ↓                       ↓
  Attributs              Règles CSS
    du bloc              parsées
       ↓                       ↓
  Sauvegarde  ──────→  Parse & Sync
```

### Flux de données

1. **Chargement de l'éditeur**
   - Vérifie si un fichier CSS existe pour cette page
   - Parse le CSS et extrait les valeurs
   - Met à jour les contrôles de l'éditeur avec ces valeurs
   - Affiche les valeurs actuelles du CSS

2. **Modification dans l'éditeur**
   - Utilisateur change une valeur (ex: padding)
   - Met à jour l'attribut du bloc
   - À la sauvegarde → Régénère le CSS
   - Le fichier CSS est mis à jour

3. **Modification dans le fichier CSS**
   - Développeur édite le CSS manuellement
   - Sauvegarde le fichier
   - Au rechargement de l'éditeur → Parse le CSS
   - Met à jour les attributs du bloc
   - Les contrôles affichent les nouvelles valeurs

---

## Implémentation technique

### 1. Parser CSS côté serveur (PHP)

```php
/**
 * Parse un fichier CSS et extrait les valeurs pour un sélecteur donné
 */
function infinity_parse_css_file( $css_file, $selector ) {
    if ( ! file_exists( $css_file ) ) {
        return array();
    }

    $css_content = file_get_contents( $css_file );
    $parsed_values = array();

    // Regex pour extraire les règles d'un sélecteur
    $selector_escaped = preg_quote( $selector, '/' );
    if ( preg_match( '/' . $selector_escaped . '\s*\{([^}]+)\}/', $css_content, $matches ) ) {
        $rules = $matches[1];

        // Parser les propriétés individuelles
        if ( preg_match( '/padding-top:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['paddingTop'] = trim( $m[1] );
        }
        if ( preg_match( '/padding-right:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['paddingRight'] = trim( $m[1] );
        }
        if ( preg_match( '/padding-bottom:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['paddingBottom'] = trim( $m[1] );
        }
        if ( preg_match( '/padding-left:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['paddingLeft'] = trim( $m[1] );
        }

        // Parser padding shorthand
        if ( preg_match( '/padding:\s*([^;]+)/', $rules, $m ) ) {
            $padding_values = infinity_parse_padding_shorthand( trim( $m[1] ) );
            $parsed_values = array_merge( $parsed_values, $padding_values );
        }

        // Parser margin
        if ( preg_match( '/margin-top:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['marginTop'] = trim( $m[1] );
        }
        if ( preg_match( '/margin-right:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['marginRight'] = trim( $m[1] );
        }
        if ( preg_match( '/margin-bottom:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['marginBottom'] = trim( $m[1] );
        }
        if ( preg_match( '/margin-left:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['marginLeft'] = trim( $m[1] );
        }

        // Parser margin shorthand
        if ( preg_match( '/margin:\s*([^;]+)/', $rules, $m ) ) {
            $margin_values = infinity_parse_margin_shorthand( trim( $m[1] ) );
            $parsed_values = array_merge( $parsed_values, $margin_values );
        }

        // Parser gap
        if ( preg_match( '/gap:\s*([^;]+)/', $rules, $m ) ) {
            $gap_values = infinity_parse_gap_value( trim( $m[1] ) );
            $parsed_values = array_merge( $parsed_values, $gap_values );
        }

        // Parser background
        if ( preg_match( '/background-color:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['backgroundColor'] = trim( $m[1] );
        }

        // Parser border
        if ( preg_match( '/border:\s*([^;]+)/', $rules, $m ) ) {
            $border_values = infinity_parse_border_shorthand( trim( $m[1] ) );
            $parsed_values = array_merge( $parsed_values, $border_values );
        }

        // Parser layout
        if ( preg_match( '/display:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['display'] = trim( $m[1] );
        }
        if ( preg_match( '/flex-direction:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['flexDirection'] = trim( $m[1] );
        }
        if ( preg_match( '/justify-content:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['justifyContent'] = trim( $m[1] );
        }
        if ( preg_match( '/align-items:\s*([^;]+)/', $rules, $m ) ) {
            $parsed_values['alignItems'] = trim( $m[1] );
        }
    }

    return $parsed_values;
}

/**
 * Parse padding shorthand en valeurs individuelles
 */
function infinity_parse_padding_shorthand( $value ) {
    $parts = preg_split( '/\s+/', trim( $value ) );
    $count = count( $parts );

    if ( $count === 1 ) {
        // padding: 10px → toutes les côtés
        return array(
            'paddingTop' => $parts[0],
            'paddingRight' => $parts[0],
            'paddingBottom' => $parts[0],
            'paddingLeft' => $parts[0],
        );
    } elseif ( $count === 2 ) {
        // padding: 10px 20px → vertical horizontal
        return array(
            'paddingTop' => $parts[0],
            'paddingRight' => $parts[1],
            'paddingBottom' => $parts[0],
            'paddingLeft' => $parts[1],
        );
    } elseif ( $count === 3 ) {
        // padding: 10px 20px 30px
        return array(
            'paddingTop' => $parts[0],
            'paddingRight' => $parts[1],
            'paddingBottom' => $parts[2],
            'paddingLeft' => $parts[1],
        );
    } elseif ( $count === 4 ) {
        // padding: 10px 20px 30px 40px
        return array(
            'paddingTop' => $parts[0],
            'paddingRight' => $parts[1],
            'paddingBottom' => $parts[2],
            'paddingLeft' => $parts[3],
        );
    }

    return array();
}

/**
 * Parse margin shorthand (identique à padding)
 */
function infinity_parse_margin_shorthand( $value ) {
    $parts = preg_split( '/\s+/', trim( $value ) );
    $count = count( $parts );

    if ( $count === 1 ) {
        return array(
            'marginTop' => $parts[0],
            'marginRight' => $parts[0],
            'marginBottom' => $parts[0],
            'marginLeft' => $parts[0],
        );
    } elseif ( $count === 2 ) {
        return array(
            'marginTop' => $parts[0],
            'marginRight' => $parts[1],
            'marginBottom' => $parts[0],
            'marginLeft' => $parts[1],
        );
    } elseif ( $count === 3 ) {
        return array(
            'marginTop' => $parts[0],
            'marginRight' => $parts[1],
            'marginBottom' => $parts[2],
            'marginLeft' => $parts[1],
        );
    } elseif ( $count === 4 ) {
        return array(
            'marginTop' => $parts[0],
            'marginRight' => $parts[1],
            'marginBottom' => $parts[2],
            'marginLeft' => $parts[3],
        );
    }

    return array();
}

/**
 * Parse gap value (row column)
 */
function infinity_parse_gap_value( $value ) {
    $parts = preg_split( '/\s+/', trim( $value ) );
    $count = count( $parts );

    if ( $count === 1 ) {
        // gap: 10px → les deux
        return array(
            'gapRow' => $parts[0],
            'gapColumn' => $parts[0],
        );
    } elseif ( $count === 2 ) {
        // gap: 10px 20px → row column
        return array(
            'gapRow' => $parts[0],
            'gapColumn' => $parts[1],
        );
    }

    return array();
}

/**
 * Parse border shorthand
 * Ex: border: 1px solid #000
 */
function infinity_parse_border_shorthand( $value ) {
    $parts = preg_split( '/\s+/', trim( $value ) );
    $parsed = array();

    // Extraire width, style, color
    foreach ( $parts as $part ) {
        if ( preg_match( '/^\d+/', $part ) ) {
            // C'est probablement la largeur
            $parsed['borderWidthTop'] = $part;
            $parsed['borderWidthRight'] = $part;
            $parsed['borderWidthBottom'] = $part;
            $parsed['borderWidthLeft'] = $part;
        } elseif ( in_array( $part, array( 'solid', 'dashed', 'dotted', 'double', 'none' ) ) ) {
            // C'est le style
            $parsed['borderStyle'] = $part;
        } elseif ( preg_match( '/^#[0-9a-f]{3,6}$/i', $part ) || strpos( $part, 'rgb' ) === 0 ) {
            // C'est la couleur
            $parsed['borderColor'] = $part;
        }
    }

    return $parsed;
}
```

### 2. REST API endpoint

```php
/**
 * Créer un endpoint REST pour que JavaScript puisse récupérer le CSS parsé
 */
add_action( 'rest_api_init', function() {
    register_rest_route( 'infinity/v1', '/parse-css/(?P<id>\d+)/(?P<selector>[^/]+)', array(
        'methods' => 'GET',
        'callback' => 'infinity_get_parsed_css',
        'permission_callback' => function() {
            return current_user_can( 'edit_posts' );
        },
    ));
});

function infinity_get_parsed_css( $request ) {
    $post_id = $request['id'];
    $selector = urldecode( $request['selector'] );

    $post = get_post( $post_id );
    if ( ! $post ) {
        return new WP_Error( 'no_post', 'Post not found', array( 'status' => 404 ) );
    }

    // Get page slug
    $page_slug = $post->post_name;
    if ( empty( $page_slug ) ) {
        $page_slug = sanitize_title( $post->post_title );
    }
    if ( empty( $page_slug ) ) {
        $page_slug = $post_id;
    }

    $css_file = INFINITY_DIR . '/assets/css/pages/page-' . $page_slug . '.css';

    if ( ! file_exists( $css_file ) ) {
        return array(); // Pas de CSS, retourner vide
    }

    // Parser le CSS
    $parsed = infinity_parse_css_file( $css_file, $selector );

    return $parsed;
}
```

### 3. JavaScript - Charger les valeurs du CSS

```javascript
// Dans index.js, au chargement du bloc
edit: function(props) {
    const { attributes, setAttributes, clientId } = props;
    const { useState, useEffect } = wp.element;
    const [cssLoaded, setCssLoaded] = useState(false);

    // Charger les valeurs du CSS au montage du composant
    useEffect(() => {
        if (!cssLoaded && attributes.customClass) {
            const postId = wp.data.select('core/editor').getCurrentPostId();
            const selector = '.' + attributes.customClass.replace(/\s+/g, '.');

            // Appeler l'API REST
            wp.apiFetch({
                path: `/infinity/v1/parse-css/${postId}/${encodeURIComponent(selector)}`
            }).then(cssValues => {
                if (Object.keys(cssValues).length > 0) {
                    // Merger les valeurs du CSS avec les attributs existants
                    // Priorité au CSS si les deux existent
                    const updatedAttrs = {};

                    Object.keys(cssValues).forEach(key => {
                        if (cssValues[key]) {
                            updatedAttrs[key] = cssValues[key];
                        }
                    });

                    if (Object.keys(updatedAttrs).length > 0) {
                        setAttributes(updatedAttrs);
                    }
                }
                setCssLoaded(true);
            }).catch(error => {
                console.error('Error loading CSS values:', error);
                setCssLoaded(true);
            });
        }
    }, [cssLoaded, attributes.customClass]);

    // ... reste du code edit
}
```

### 4. Gestion des conflits et timestamps

```php
/**
 * Ajouter un timestamp au fichier CSS généré
 */
function infinity_generate_post_css( $post_id ) {
    // ... code existant ...

    if ( ! empty( $css_rules ) ) {
        $timestamp = current_time( 'timestamp' );
        $date_formatted = date( 'Y-m-d H:i:s', $timestamp );

        $css_content = "/**\n";
        $css_content .= " * Generated CSS for: {$post->post_title}\n";
        $css_content .= " * Post ID: {$post_id} | Slug: {$page_slug}\n";
        $css_content .= " * Last modified: {$date_formatted}\n";
        $css_content .= " * Modified by: CSS Generator\n";
        $css_content .= " * Timestamp: {$timestamp}\n";
        $css_content .= " * Auto-generated by Infinity Container blocks\n";
        $css_content .= " */\n\n";

        // ... reste du code
    }
}

/**
 * Vérifier si le CSS a été modifié manuellement
 */
function infinity_is_css_manually_modified( $css_file ) {
    if ( ! file_exists( $css_file ) ) {
        return false;
    }

    $content = file_get_contents( $css_file );

    // Extraire le timestamp du CSS
    if ( preg_match( '/\* Timestamp: (\d+)/', $content, $matches ) ) {
        $css_timestamp = intval( $matches[1] );
        $file_modified = filemtime( $css_file );

        // Si le fichier a été modifié après le timestamp enregistré
        // C'est qu'il a été édité manuellement
        if ( $file_modified > $css_timestamp + 5 ) { // 5 secondes de marge
            return true;
        }
    }

    return false;
}
```

---

## Cas d'usage avancés

### 1. Valeurs CSS calculées

```css
.my-class {
    padding: calc(20px + 1rem);
}
```

**Solution** : Stocker la valeur telle quelle dans l'attribut
```javascript
paddingTop: "calc(20px + 1rem)"
```

### 2. Variables CSS

```css
.my-class {
    padding: var(--spacing-medium);
}
```

**Solution** : Stocker la variable
```javascript
paddingTop: "var(--spacing-medium)"
```

### 3. Multiple classes

```css
.class1.class2 {
    padding: 20px;
}
```

**Solution** : Parser correctement le sélecteur avec plusieurs classes

---

## Défis techniques

### 1. **Performance**
- Parser le CSS à chaque chargement peut être lent
- **Solution** : Mettre en cache les valeurs parsées dans les post meta

### 2. **Conflits de priorité**
- Que faire si l'éditeur et le CSS ont des valeurs différentes ?
- **Solution** : Toujours prioriser le CSS (dernière modification)

### 3. **CSS complexe**
- Media queries, pseudo-classes, etc.
- **Solution** : Ne parser que les règles de base, ignorer le reste

### 4. **Shorthand vs Longhand**
- `padding: 20px` vs `padding-top: 20px`
- **Solution** : Parser les deux et merger intelligemment

---

## Planning d'implémentation

### Phase 1 : Parser basique (2-3h)
- [ ] Créer la fonction `infinity_parse_css_file()`
- [ ] Parser padding, margin, gap
- [ ] Tests unitaires

### Phase 2 : REST API (1-2h)
- [ ] Créer l'endpoint `/parse-css/`
- [ ] Gestion des permissions
- [ ] Tests

### Phase 3 : Intégration JavaScript (2-3h)
- [ ] Hook `useEffect` pour charger le CSS
- [ ] Merger les valeurs
- [ ] Mise à jour des contrôles

### Phase 4 : Gestion des conflits (2h)
- [ ] Système de timestamps
- [ ] Détection de modification manuelle
- [ ] UI pour informer l'utilisateur

### Phase 5 : Tests & Debug (3-4h)
- [ ] Tests sur différents scénarios
- [ ] Gestion des edge cases
- [ ] Optimisation performance

**Total estimé : 10-14 heures**

---

## Notes

- Cette fonctionnalité est **optionnelle** et **avancée**
- Le système actuel fonctionne parfaitement sans synchronisation
- Implémenter seulement si le besoin est confirmé
- Privilégier la stabilité et la simplicité

---

## Références

- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [wp.apiFetch](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/)
- [CSS Parsing in PHP](https://github.com/sabberworm/PHP-CSS-Parser)
- [Gutenberg Block Attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/)
