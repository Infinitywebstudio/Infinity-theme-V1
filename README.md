# Infinity 2025 - Version Simplifiée

> **Thème WordPress minimaliste et performant**

## Description

Infinity 2025 Simple est un thème WordPress ultra-léger et performant, conçu pour être simple, rapide et facile à maintenir. Sans dépendances externes, sans système de build complexe, ce thème offre une base solide pour créer des sites WordPress modernes.

## Caractéristiques principales

- ✅ Ultra-léger (~17KB d'assets)
- ✅ Aucune dépendance externe
- ✅ Support complet de Gutenberg
- ✅ CSS et JavaScript vanilla
- ✅ Responsive design
- ✅ SEO-friendly
- ✅ Optimisé pour la performance

## Prérequis

- WordPress 6.0 ou supérieur
- PHP 7.4 ou supérieur
- Serveur web (Apache/Nginx)

## Installation

### Méthode 1 : Installation manuelle

1. Téléchargez le thème
2. Copiez le dossier `infinity-2025` dans `wp-content/themes/`
3. Activez le thème depuis WordPress Admin → Apparence → Thèmes

### Méthode 2 : Installation via ZIP

1. Compressez le dossier du thème en fichier ZIP
2. Dans WordPress Admin, allez dans Apparence → Thèmes → Ajouter
3. Téléversez le fichier ZIP
4. Activez le thème

## Configuration

### Menus

1. Allez dans Apparence → Menus
2. Créez un nouveau menu
3. Assignez-le à l'emplacement "Menu Principal"
4. Ajoutez vos éléments de menu

### Logo personnalisé

1. Allez dans Apparence → Personnaliser → Identité du site
2. Téléversez votre logo

## Structure des fichiers

```
infinity-2025/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── placeholder.jpg
├── inc/
│   ├── setup.php
│   ├── enqueue.php
│   └── helpers.php
├── template-parts/
├── languages/
├── functions.php
├── style.css
├── header.php
├── footer.php
├── index.php
├── single.php
├── page.php
├── archive.php
├── search.php
└── 404.php
```

## Support

### Fonctionnalités WordPress supportées

- Images à la une
- Menus personnalisés
- Logo personnalisé
- Gutenberg (éditeur de blocs)
- HTML5
- Commentaires
- Pagination

## Résolution de problèmes

### Le thème ne s'affiche pas

Vérifiez que :
- Le fichier `style.css` contient l'en-tête WordPress
- Les permissions des fichiers sont correctes (644 pour les fichiers, 755 pour les dossiers)
- Le nom du dossier ne contient pas de caractères spéciaux

### Les CSS/JS ne se chargent pas

1. Videz le cache du navigateur
2. Vérifiez les chemins dans `inc/enqueue.php`
3. Inspectez la console du navigateur pour voir les erreurs

### Erreur de mémoire

1. Augmentez la limite de mémoire PHP dans `wp-config.php` :
   ```php
   define('WP_MEMORY_LIMIT', '256M');
   ```
2. Désactivez temporairement les plugins
3. Videz le cache WordPress

## Évolution future

Ce thème est conçu pour être une base solide. Vous pouvez facilement ajouter :

- Support WooCommerce
- Blocs Gutenberg personnalisés
- Système de build (Vite, Webpack)
- Animations et effets avancés
- Support Elementor

## Crédits

- Développé par Infinity Studio
- Version : 1.0.0
- Licence : GPL v2 ou ultérieure

## Licence

Ce thème est sous licence GPL v2 ou ultérieure.
http://www.gnu.org/licenses/gpl-2.0.html

---

**Infinity Studio** - Créer des expériences web exceptionnelles
