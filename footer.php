        </div><!-- .container -->
    </div><!-- #content -->

    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-inner">
                <div class="site-info">
                    <p>
                        &copy; <?php echo date( 'Y' ); ?>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                            <?php bloginfo( 'name' ); ?>
                        </a>
                    </p>
                    <p>
                        <?php
                        printf(
                            esc_html__( 'Propulsé par %s', 'infinity' ),
                            '<a href="https://wordpress.org/" target="_blank" rel="noopener">WordPress</a>'
                        );
                        ?>
                        |
                        <?php
                        printf(
                            esc_html__( 'Thème: %s par %s', 'infinity' ),
                            'Infinity 2025 Simple',
                            '<a href="https://infinitystudio.com" target="_blank" rel="noopener">Infinity Studio</a>'
                        );
                        ?>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
