<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <title><?php bloginfo('name'); ?></title>
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" media="all" />
    <link rel="shortcut icon" type="image/x-icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico" />
    <?php wp_head(); ?>
    <!--[if lte IE 9]>
        <script src="<?php bloginfo('template_directory'); ?>/js/html5.js"></script>
    <![endif]-->
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-6589969-7']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
</head>
<body style="background-image:url(<?php bloginfo('template_directory'); ?>/images/bg.jpg);">
    <div id="tips">
        <div class="tips-content">
            <p></p>
            <div class="tips-func"><button class="tips-button">确 定</button></div>
        </div>
    </div>
    <div id="loading">
        <div class="loading-content"><i></i>喝口茶，做个眼保健操什么的，然后等待…</div>
    </div>
    <div id="page_loading">
        <img src="<?php bloginfo('template_directory'); ?>/images/loadingp.gif" alt="页面正在加载中……" />
    </div>