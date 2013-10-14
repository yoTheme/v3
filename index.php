<?php get_header(); ?>
    <div id="article" data-id="" data-slug="">
        <div class="article-back">
            <div>
                <a href="javascript:;" class="back" title="返回">返回</a>
            </div>
        </div>
        <div class="article-wrapper">
            <div class="article-functionbar">
                <div class="article-navi">
                    <a href="" class="prev-link article-link" title="上一篇文章">上一篇：</a>
                    <a href="" class="next-link article-link" title="下一篇文章">下一篇：</a>
                </div>
                <div class="breadcrumbs">
                    <?php bloginfo('name'); ?>
                </div>
            </div>
            <div class="article-comments">
                <h3 class="comments-title"><a href="javascript:;" class="comments-option" title="评论 开/关">评论 开/关</a><span></span></h3>
                <div class="comments-wrapper">
                    <ul class="comments-list"></ul>
                    <div class="comment-post">
                        <div class="comment-post-wrapper">
                            <h3><a href="javascript:;" class="close-comment" title="关闭">&times;</a>发表评论</h3>
                            <div class="comment-user">
                                <span class="comment-user-info"></span>
                                <div class="comment-input">
                                    <input type="text" id="com_name" placeholder="怎么称呼？" />
                                </div>
                                <div class="comment-input">
                                    <input type="url" id="com_email" placeholder="Email不会被公开，放心吧！" />
                                </div>
                                <div class="comment-input">
                                    <input type="url" id="com_url" placeholder="有网站么？当然，你也可以不填" />
                                </div>
                            </div>
                            <div class="comment-input">
                                <textarea id="com_content" placeholder="说点儿什么吧？"></textarea>
                            </div>
                            <input type="hidden" id="parent_id" value="" />
                        </div>
                        <div class="comment-submit">
                            <input type="submit" class="post-comment" value="发表评论" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="article-container">
                <div class="article-head">
                    <h2 class="title"></h2>
                    <div class="author">
                        Post By <span></span>
                    </div>
                    <div class="functionbar">
                        <a href="javascript:;" class="share" title="分享这篇文章">分享</a>
                        <a href="javascript:;" class="comments" title="说点儿啥吧！"></a>
                        <a href="javascript:;" class="info" title="文章信息">文章信息</a>
                    </div>
                    <div class="article-info">
                        <p>Tags: </p>
                        <p>Times: </p>
                        <p>Categories: </p>
                    </div>
                </div>
                <div class="article-content"></div>
                <div class="article-foot">End<a href="javascript:;" class="go-top"><i></i>Top</a></div>
            </div>
        </div>
    </div>
    <div id="top">
        <div class="top-func">
            <a href="#" class="top-close">收起</a>
            <div id="searchform">
                <input type="text" id="s" name="s" />
                <input type="submit" id="searchsubmit" />
            </div>
            <ul class="menu">
                <?php wp_list_categories('title_li=') ?>
                <!--li><a href="javascript:;" data-id="1">Design</a></li>
                <li><a href="javascript:;" data-id="2">Diary</a></li>
                <li><a href="javascript:;" data-id="3">Painting</a></li>
                <li><a href="javascript:;" data-id="4">Photographs</a></li>
                <li><a href="javascript:;" data-id="5">Share</a></li-->
            </ul>
        </div>
        <div class="top-slide"><span></span></div>
    </div>
    <header id="header">
        <div class="head-left">
            <h1 class="logo"><a href="javascript:;">MIRAGEYARD</a></h1>
            <div class="bc"></div>
        </div>
        <div class="head-right">
            <nav class="page-menu">
                <ul>
                    <?php wp_list_pages('title_li=') ?>
                    <!--li><a href="javascript:;" class="page-link" data-slug="about">About</a></li>
                    <li><a href="javascript:;" class="page-link" data-slug="contact">Contact</a></li>
                    <li><a href="javascript:;" class="page-link" data-slug="map">Map</a></li>
                    <li><a href="javascript:;" class="page-link" data-slug="code">Code</a></li>
                    <li><a href="javascript:;" class="page-link" data-slug="resouce">Resouce</a></li-->
                </ul>
            </nav>
        </div>
    </header>
    <div id="wrapper">
        <div class="load-more"><a href="javascript:;">加载更多</a></div>
    </div>
<?php get_footer(); ?>