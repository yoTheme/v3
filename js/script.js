$(function() {
    //初始化全局参数
    var $w = $(window); //窗体DOM
    var wh = parseInt($w.height()); //窗口高度
    var ww = parseInt($w.width()); //窗口宽度
    var baseUrl = "http://youed.me/"; //默认网站地址
    var themeUrl = baseUrl+"wp-content/themes/yotheme_v3/"; //主题地址
    //var baseUrl = "http://www.mirageyard.com/"; //默认网站地址
    //var themeUrl = baseUrl+"wp-content/themes/yotheme_v3/"; //主题地址
    var encode = false; //如果使用英文别名，则设置为 true
    var per = 10; //每页文章数量
    var alw = ww - 40; //减去左边距之后的列表宽度（滚动一屏的宽度）
    var hh = 120; //头部高度
    var fh = 50; //尾部高度
    var bh = wh - hh - fh; //主体部分高度(最大920，最小350)
    if (bh>920) {
        bh = 920;
    } else if (bh<350) {
        bh = 350;
    }
    var faw = bh*1.5; //第一篇文章的宽度
    if (faw>1226) {
        faw = 1226;
    } else if (faw<466) {
        faw = 466;
    }
    var fas = faw*0.15; //第一篇文章后面的间距
    var aw = faw/2; //其它文章的宽度
    var as = faw*0.05; //每篇文章布局之间的默认间距
    var ah = bh/2 - as/2; //其它文章的高度
    var ls = window.localStorage; //定义 localstorage
    var wp = document.getElementById("wrapper");
    var $wp = $(wp); //转化为jQuery对象
    var $p = $(".pagenavi");
    /*****
     ** 基础交互
    *****/
    //顶部导航栏
    $("#top").hover(function() {
        var $s = $(this);
        delay = setTimeout(function() {
            if (!$s.is(":animated")) {
                $s.animate({
                    top: "0"
                },200);
                $(".top-slide").fadeOut();
            }
        },500);
    }, function() {
        clearTimeout(delay);
        $(this).animate({
            top: "-80px"
        },150);
        $(".top-slide").fadeIn();
    });
    $(".top-close").click(function(event) {
        clearTimeout(delay);
        $("#top").animate({
            top: "-80px"
        },150);
        event.stopImmediatePropagation(); //阻止事件冒泡
    });
    $("#s").hover(function() {
        if (!$(this).is(":animated")) {
            if (!$(this).is(":focus")&&!$(this).val()) {
                $(this).animate({
                    opacity: 0.8
                },100);
            }
        }
    }, function() {
        if (!$(this).is(":focus")&&!$(this).val()) {
            $(this).animate({
                opacity: 0.6
            },100);
        }
    });
    $("#s").focusin(function() {
        if (!$(this).is(":animated")) {
            $(this).css("cursor","text");
            $(this).animate({
                opacity: 1,
                width: 200,
            },200);
        }
    });
    $("#s").focusout(function() {
        if (!$(this).val()) {
            $(this).css("cursor","pointer");
            $(this).animate({
                opacity: 0.6,
                width: 0
            },200);
        }
    });
    $(".tips-button").click(function(event) {
        tips('tips','hide');
        tips('loading','hide');
        tips('ploading','hide');
        event.stopImmediatePropagation(); //阻止事件冒泡
    });
    $(".logo").click(function(event) {
        articleLayout(false, per, 1);
        $(".bc").html("");
        $wp.removeAttr("data-cat");
        $p.attr("data-index","1");
        setUrl(baseUrl);
    });
    $(".menu li a").click(function(event) {
        var $s = $(this);
        var $li = $s.parent("li");
        var _url = $s.attr("href");
        var _catslug = getSlug(_url);
        var _name = $s.text();
        if (_catslug) {
            articleLayout(false, per, 1, _catslug);
            $li.addClass("current").siblings().removeClass("current");
            $(".bc").html('<strong>Category:</strong> '+_name);
            $wp.attr("data-cat",_catslug);
            setUrl(_url);
            $p.attr("data-index","1");
            $("#article").hide();
            return false;
        } else {
            tips('tips','show','没有这个目录，请重试！');
            return false;
        }
        event.stopImmediatePropagation(); //阻止事件冒泡
    });
    //初始化
    baseLayout();
    articleLayout(false, per, 1);
    //loadSingleArticle('post', 'the-new-theme-release-yotheme-v2-0');
    //创建基础布局
    function baseLayout() {
        $wp.css({"height":bh, "margin-top":hh});
    }
    //提示、加载中
    function tips(type,visable,txt) {
        var $dom;
        switch (type) {
            case "tips":
                $dom = $("#tips");
                $(".tips-content").children("p").html(txt);
            break;
            case "loading":
                $dom = $("#loading");
            break;
            case "ploading":
                $dom = $("#page_loading");
            break;
        }
        switch (visable) {
            case "show":
                $dom.fadeIn(200);
            break;
            case "hide":
                $dom.fadeOut(100);
            break;
        }
    }
    //文章加载完成后执行
    function afterArticleLoad() {
        var _aid = $("#article").attr("data-id");
        $("#post_id").val(_aid);
        //发表评论
        $(".post-comment").click(function(event) {
            var $forms = $(".comment-post-wrapper");
            if ($forms.is(":hidden")) {
                $forms.show(500);
            } else {
                //获取数据
                var _name = $("#com_name").val();
                var _url = $("#com_url").val();
                var _content = $("#com_content").val();
                var _email = $("#com_email").val();
                var _pid = $("#parent_id").val();
                //验证数据完整
                if (!_name) {
                    tips('tips', 'show', '雁过留声，人过留名！无名氏阁下。');
                    return false;
                }
                if (!_email) {
                    tips('tips', 'show', '都说了不会公开你的Email的啦，填一下又不会长肉肉！');
                    return false;
                } else {
                    var reg = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
                    if (!reg.test(_email)) {
                        tips('tips', 'show', 'Email地址不太对啊亲！xx@xx.xxx格式别搞错了');
                        return false;
                    }
                }
                if (!_content) {
                    tips('tips', 'show', '哈！啥也不填也想评论？别说门了，窗都没有！');
                    return false;
                }
                //提交数据
                $.ajax({
                    type: "POST",
                    url: "/api/respond/submit_comment/",
                    data: {post_id:_aid, parent:_pid, email:_email, name:_name, url:_url, content:_content},
                    timeout: 30000,
                    beforeSend: function() {
                        //显示 Loading
                        tips('loading','show');
                    },
                    success: function(data) {
                        var _d = data;
                        if (_d.status=="ok") { //写一条新评论
                            var htm = "";
                            htm += '<li id="comment_'+_d.id+'" data-user="'+_d.name+'">';
                            htm += '<div class="comment-author"><a href="javascript:;" class="reply" data-id="'+_d.id+'">Reply</a>';
                            if (_d.url) {
                                htm += '<a href="'+_d.url+'" target="_blank" rel="nofollow">'+_d.name+'</a>';
                            } else {
                                htm += '<span>'+_d.name+'</span>';
                            }
                            htm += '（'+_d.date.split(" ")[0]+'）</div><div class="comment-c">'+_d.content+'</div><div class="comment-reply"></div>';
                            htm += '<div class="comment-arrow"></div>';
                            htm += '</li>';
                            $(".comments-list").prepend(htm);
                            $(".comment-none").fadeOut();
                            $(".close-comment").trigger("click");
                            //提交成功后，存储用户信息
                            if (!ls["lsName"]||!ls["lsEmail"]||!ls["lsUrl"]) {
                                ls["lsName"] = _name;
                                ls["lsEmail"] = _email;
                                ls["lsUrl"] = _url;
                            }
                            tips('loading','hide');
                            return false;
                        } else {
                            tips('tips', 'show', '评论提交失败，请刷新或稍后重试！');
                            return false;
                        }
                    },
                    error: function() {
                        tips('tips', 'show', '评论提交失败，请刷新或稍后重试！');
                        return false;
                    }
                });
            }
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        $(".reply").click(function(event) {
            var $s = $(this);
            var _pid = $s.attr("data-id");
            var _pname = $s.parent().parent().attr("data-user");
            $("#parent_id").val(_pid);
            $("#com_content").val('@'+_pname+': ');
            $(".comment-post-wrapper").show(500);
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        $(".close-comment").click(function(event) {
            $("#com_content").val("");
            $("#parent_id").val("");
            $(".comment-post-wrapper").hide(300);
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        $(".comments").click(function(event) {
            $(".comment-post-wrapper").show(500);
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        //返回按钮
        $(".back").click(function(event) {
            if ($(this).attr("href")=="javascript:;") {
                var _cat = $wp.attr("data-cat");
                var _url;
                if (_cat) {
                    _url = baseUrl+"category/"+_cat+"/";
                } else {
                    _url = baseUrl;
                }
                setUrl(_url);
                $("#article").fadeOut(400);
            } else {
                location.href = '/';
            }
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        //返回顶部
        $(".go-top").click(function(event) {
            $("#article").animate({
                scrollTop: 0
            },400);
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        //显示文章信息
        $(".info").click(function(event) {
            $(this).toggleClass("current");
            $(".article-info").fadeToggle(200);
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        //设置评论区的高度
        $(".comments-list").height(parseInt($w.height())-195);
        //评论区悬浮
        $("#article").bind("scroll", function() {
            var $dom = $(".article-comments");
            var $list = $dom.find(".comments-list");
            var $wrapper = $(".article-wrapper");
            var $container = $(".article-container");
            var _top = parseInt($(this).scrollTop());
            var _aw = parseInt($wrapper.width()); //整体区域的宽度
            var _acw = parseInt($container.width()); //文章内容区域的宽度
            var _overW = ww - _aw; //页面宽度减去整体区域的宽度，得到页面多余区域的宽度
            var _left;
            if (parseInt($container.css("margin-right"))==60) {
                _left = _acw + _overW/2 - 220;
            } else {
                var _awx = parseInt($wrapper.width()); //重新计算宽度
                var _acwx = parseInt($container.width()); //文章内容区域的宽度
                var _overWx = ww - _aw; //页面宽度减去整体区域的宽度，得到页面多余区域的宽度
                _left = _acwx + _overWx/2 + 20;
            }
            if (_top>=70) {
                if (!$dom.attr("style")) {
                    $dom.css({"position":"fixed", "top":"20px", "left":_left+"px"});
                    if (!$list.is(":animated")) {
                        $list.animate({
                            height: (wh - 122)+"px"
                        },500);
                    }
                }
            } else {
                if ($dom.attr("style")) {
                    $dom.removeAttr("style");
                    $list.animate({
                        height: (wh - 192)+"px"
                    },400);
                }
            }
        });
        //评论开关
        $(".comments-option").click(function(event) {
            var $s = $(this);
            var $comments = $(".article-comments");
            var $comtitle = $(".comments-title").children("span");
            var $comwrap = $comments.children(".comments-wrapper");
            var $content = $(".article-container");
            if ($s.hasClass("close")) {
                $comtitle.fadeIn(300);
                $comwrap.fadeIn(300);
                $content.animate({
                    marginRight: "300px"
                },300);
            } else {
                $comtitle.fadeOut(100);
                $comwrap.fadeOut(100);
                $content.animate({
                    marginRight: "60px"
                },300);
            }
            $s.toggleClass("close");
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
    }
    //加载单篇文章
    function loadSingleArticle(type,slug) {
        if (slug) {
            //console.log(type+','+slug);
            $.ajax({
                type: "GET",
                dataType: "json",
                //url: "data/article-271.json",
                url: "/api/get_"+type+"/",
                data: {slug:slug},
                timeout: 30000,
                beforeSend: function() {
                    //显示 Loading
                    tips('loading','show');
                },
                success: function(data) {
                    var $a = $("#article");
                    var _d = data;
                    if (_d.status=="ok") {
                        var _prev = _d.next_url;
                        var _next = _d.previous_url;
                        var _p;
                        if (type=="post") {
                            _p = _d.post;
                        } else {
                            _p = _d.page;
                        }
                        if (_p.status=="publish") {
                            //开始获取文章数据
                            var _title = _p.title;
                            var _id = _p.id;
                            var _slug = _p.slug;
                            var _url = _p.url;
                            var _content = _p.content;
                            var _date = _p.date;
                            var _tag = _p.tags;
                            var _cats = _p.categories;
                            var _author = _p.author.name;
                            var _comCount = _p.comment_count;
                            var _comStatus = _p.comment_status;
                            //定义DOM
                            var $prev = $(".prev-link");
                            var $next = $(".next-link");
                            var $com = $(".comments-list");
                            var $comp = $(".comment-post");
                            if(type=="post") {
                                if (_prev) {
                                    $prev.attr("href",_prev);
                                    $prev.show();
                                } else {
                                    $prev.hide();
                                }
                                if (_next) {
                                    $next.attr("href",_next);
                                    $next.show();
                                } else {
                                    $next.hide();
                                }
                                //console.log(_prev+","+_next);
                            } else {
                                $prev.hide();
                                $next.hide();
                            }
                            $(".title").html(_title);
                            $(".author span").html(_author);
                            $(".comments").html(_comCount);
                            var _tagLength = _tag.length;
                            if (_tagLength!==0) {
                                var i, htm = "Tags: ";
                                for (i=0;i<_tagLength;i++) {
                                    htm += _tag[i].title+', ';
                                }
                                $(".article-info p:nth-child(1)").html(htm);
                            }
                            $(".article-info p:nth-child(2)").html("Time: "+_date);
                            var _catsLength = _cats.length;
                            if (_catsLength!==0) {
                                var i, htm = "Categories: ";
                                for (i=0;i<_catsLength;i++) {
                                    htm += _cats[i].title+', ';
                                }
                                $(".article-info p:nth-child(3)").html(htm);
                            }
                            var $ac = $(".article-content");
                            $ac.hide();
                            $ac.html(_content);
                            //var $fimg = $ac.find("img");
                            //$fimg.parents("p:not(.full-img)").addClass("full-img");
                            //$fimg.removeAttr("width");
                            //$fimg.removeAttr("height");
                            $ac.show();
                            $(".comments-title span").html("Comments（"+_comCount+"）");
                            //console.log(_comStatus);
                            if (_comStatus=="open") {
                                var _com = _p.comments;
                                var _comLength = parseInt(_com.length);
                                $comp.show();
                                if (ls["lsName"]||ls["lsEmail"]||ls["lsUrl"]) { //检查localstorage
                                    var $comu = $(".comment-user");
                                    var $comi = $(".comment-user-info");
                                    if (!$comi.text()) {
                                        $("#com_name").val(ls["lsName"]);
                                        $("#com_email").val(ls["lsEmail"]);
                                        $("#com_url").val(ls["lsUrl"]);
                                        $comi.text('欢迎回来，'+ls["lsName"]);
                                    }
                                    $comu.children(".comment-input").hide();
                                }
                                if (_comLength!==0) {
                                    var i, htm = "";
                                    for (i=_comLength-1;i>-1;i--) {
                                        var _parent = _com[i].parent;
                                        if (!_parent) {
                                            htm += '<li id="comment_'+_com[i].id+'" data-user="'+_com[i].name+'">';
                                            htm += '<div class="comment-author"><a href="javascript:;" class="reply" data-id="'+_com[i].id+'">Reply</a>';
                                            if (_com[i].url) {
                                                htm += '<a href="'+_com[i].url+'" target="_blank" rel="nofollow">'+_com[i].name+'</a>';
                                            } else {
                                                htm += '<span>'+_com[i].name+'</span>';
                                            }
                                            htm += '（'+_com[i].date.split(" ")[0]+'）</div><div class="comment-c">'+_com[i].content+'</div><div class="comment-reply"></div>';
                                            htm += '<div class="comment-arrow"></div>';
                                            htm += '</li>';
                                        }
                                    }
                                    $com.html(htm);
                                    //写入回复的评论
                                    for (i=_comLength-1;i>0;i--) {
                                        var _parent = _com[i].parent;
                                        if (_parent) {
                                            var $dom = $("#comment_"+_parent);
                                            var _pname = $dom.attr("data-user");
                                            $dom.find(".comment-reply").append('<div id="comment_'+_com[i].id+'" class="comment-child"><div class="comment-author"><a href="javascript:;" data-id="'+_com[i].id+'" class="reply">Reply</a><a href="'+_com[i].url+'" target="_blank" rel="nofollow">'+_com[i].name+'</a>（'+_com[i].date.split(" ")[0]+'）</div><div class="comment-c">'+_com[i].content+'</div></div>');
                                        }
                                    }
                                } else {
                                    $com.html('<div class="comment-none">来消灭零回复吧，亲~</div>');
                                }
                            } else {
                                $comp.hide();
                                $com.html('<div class="comment-none">评论被关闭了喔~</div>');
                            }
                            $a.attr("data-id",_id);
                            $a.attr("data-slug",_slug);
                            tips('loading','hide');
                            $a.fadeIn(400);
                            afterArticleLoad();
                        } else {
                            //显示 Tips（正在非法访问文章）
                            tips('tips','show','这是一篇尚未公开的文章，无权访问。');
                            return false
                        }
                    } else {
                        //显示 Error（数据加载出错）
                        tips('tips','show','数据加载出错，请稍后重试。');
                        return false;
                    }
                },
                error: function() {
                    //显示 Error（Json 数据抓取失败）
                    tips('tips','show','数据抓取失败。');
                    return false;
                }
            });
        } else {

        }
    }
    //文章列表加载完成后执行
    function afterListLoad() {
        //列表 hover 效果
        $(".item").hover(function() {
            var $s = $(this);
            delay = setTimeout(function() {
                if (!$s.find(".item-title").is(":animated")) {
                    $s.find(".item-title").fadeOut(100);
                    $s.find(".item-summary").fadeIn(200);
                }
            },200);
        },function() {
            clearTimeout(delay);
            var $s = $(this);
            $s.find(".item-title").fadeIn(300);
            $s.find(".item-summary").fadeOut(300);
        });
        //打开文章
        $(".article-link").click(function(event) {
            var _url = $(this).attr("href");
            loadSingleArticle('post', getSlug(_url));
            setUrl(_url);
            return false;
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        //打开页面
        $(".page_item a").click(function(event) {
            var _url = $(this).attr("href");
            loadSingleArticle('page', getSlug(_url));
            setUrl(_url);
            return false;
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        //加载更多文章
        $(".load-more").click(function(event) {
            var _cat = $wp.attr("data-cat");
            var _index = parseInt($p.attr("data-index"));
            if (_cat) {
                articleLayout(true, per, _index+1, _cat);
            } else {
                articleLayout(true, per, _index+1);
            }
            $p.attr("data-index",_index+1);
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        //定位列表
        $(".scroll-screen").click(function(event) {
            var $s = $(this);
            var _i = $s.index();
            $wp.animate({
                scrollLeft: _i*alw
            },400, function() {
                $s.addClass("current").siblings().removeClass("current");
            });
            event.stopImmediatePropagation(); //阻止事件冒泡
        });
        $wp.bind("scroll", function() {
            var $s = $(this);
            var _sl = $s.scrollLeft(); //动态获取滚动的位置
            $(".scroll-screen").eq(parseInt(_sl/alw)).addClass("current").siblings().removeClass("current");
        });
    }
    //加载文章列表
    function articleLayout(re, num, p, catslug) {//是否重复加载，每页数量，当前页数，分类 ID
        //获取数据
        var url;
        if (catslug) {
                url = "/api/get_category_posts/";
            } else {
                url = "/api/get_posts/";
            }
        $.ajax({
            type: "GET",
            dataType: "json",
            //url: "data/articles-p1.json",
            url: url,
            data: {count:num, page:p, slug:catslug},
            timeout: 30000,
            beforeSend: function() {
                //显示Loading
                tips('ploading','show');
            },
            success: function(data) {
                var _d = data;
                if (_d.status=="ok") {
                    var _total = _d.count_total; //当前总共可显示的文章数
                    var _per = _d.count; //当前页面显示的文章数
                    var _p = _d.pages; //总页数
                    var _post = _d.posts; //文章集合
                    //开始循环输出文章
                    var i, j, k = -1, htm = "";
                    for (i=0;i<_per;i++) {
                        htm += '<article class="item';
                        if (!re) {
                            if (i==0) {
                                htm += ' item-first" style="width:'+faw+'px; height:'+bh+'px;"';
                            } else {
                                htm += '" style="width:'+aw+'px; height:'+ah+'px;';
                                var baseLeft = faw + fas; //默认左边距离
                                k++; //进入另一循环
                                if (k>1) { //得到两组数据的顺序
                                    k = 0;
                                }
                                j = parseInt((i-1)/2); //得到数据组
                                var left = baseLeft+aw*j + as*j; //第一篇文章的宽度加上默认间距
                                var top = ah*k + as*k; //k的值是0和1，1表示位置在下面的一篇，则top的值为本身高度加上默认间距
                                //console.log(i+","+k+","+j+","+left+","+top);
                                htm += ' left:'+left+'px; top:'+top+'px;"';
                            }
                        } else {
                            var $last = $(".item").eq(-1);
                            var _lastLeft = parseInt($last.css("left"));
                            var _lastTop = parseInt($last.css("top"));
                            htm += '" style="width:'+aw+'px; height:'+ah+'px;';
                            var _left, _top = 0;
                            k++; //进入另一循环
                            if (k>1) { //得到两组数据的顺序
                                k = 0;
                            }
                            if (i==0) {
                                if (!_lastTop) {//如果当前最后一个 li 的top 位置是0
                                    k = 1;
                                    j = 0
                                } else {
                                    k = 0;
                                }
                            } else {
                                j = parseInt((i+1)/2);
                            }
                            _top = ah*k + as*k;
                            _left = _lastLeft + aw*j + as*j;
                            //console.log(i+","+k+","+j+","+_left+","+_top);
                            htm += ' left:'+_left+'px; top:'+_top+'px;"';
                        }
                        htm += ' data-id="'+_post[i].id+'">';
                        htm += '<div class="item-wrapper">';
                        htm += '<div class="item-pic">';
                        var _pic = _post[i].attachments;
                        var _custom = _post[i].custom_fields; //获取自定义字段
                        if (_pic.length!==0) {
                            if (i==0&&!re) {
                                htm += '<img src="'+_pic[0].images.full.url+'"';
                            } else {
                                htm += '<img src="'+_pic[0].images.medium.url+'"';
                            }
                        } else {
                            if (_custom.length!==0) {
                                if (_custom.topic) {
                                    htm += '<img src="'+_custom.topic[0]+'"';
                                } else {
                                    htm += '<img src="'+themeUrl+'images/nopic.jpg"';
                                }
                            }
                        }
                        htm += ' alt="'+_post[i].title+'" />';
                        htm += '</div>';
                        htm += '<div class="item-comment">';
                        htm += '<a href="'+_post[i].url+'" class="article-link" title="'+_post[i].title+'">';
                        htm += _post[i].comment_count;
                        htm += '</a>';
                        htm += '</div>';
                        htm += '<div class="item-summary">';
                        htm += '<a href="'+_post[i].url+'" class="article-link" title="'+_post[i].title+'">';
                        htm += '<h3>'+_post[i].title+'</h3>';
                        htm += '<div class="item-date">'+_post[i].date+'</div>';
                        htm += '<div class="item-excerpt">'+_post[i].excerpt+'</div>';
                        htm += '</a>';
                        htm += '</div>';
                        htm += '<div class="item-title">';
                        htm += '<a href="'+_post[i].url+'" class="article-link" title="'+_post[i].title+'">';
                        htm += _post[i].title;
                        htm += '</a>';
                        htm += '</div>'
                        htm += '</div>';
                        htm += '</article>';
                    }
                    //处理“加载更多”按钮
                    var $more = $(".load-more");
                    if (!re) {
                        $(".item").remove(); //删除旧列表
                    }
                    $more.before(htm); //生成文章列表
                    var $item = $(".item");
                    //console.log(typeof(_p)+","+typeof(parseInt($p.attr("data-index"))));
                    //console.log(_p+","+parseInt($p.attr("data-index")));
                    if (parseInt($p.attr("data-index"))>_p) {
                        $more.hide();
                    } else {
                        var _last_l = parseInt($item.eq(-1).css("left"));
                        var _last_t = parseInt($item.eq(-1).css("top"));
                        var _more_t = 0, _more_l = 0;
                        if (_last_t==0) {
                            _more_t = ah + as;
                            _more_l = _last_l;
                        } else { 
                            _more_l = _last_l + aw + as;
                        }
                        $more.css({"width":aw, "height":ah, "left":_more_l, "top":_more_t});
                    }
                    tips('ploading','hide');
                    //重新生成pagenavi
                    var _items = parseInt(($item.length+1)/2);
                    var _totalW = _items*aw + as*(_items-1) + faw + fas; //计算列表占用的总宽度
                    //console.log(_items*aw+","+as*(_items-1)+","+faw);
                    //console.log(parseInt(_totalW));
                    var x, navi = "";
                    for (x=1;x<parseInt(_totalW/alw)+2;x++) {
                        navi += '<a href="javascript:;" class="scroll-screen'
                        if (x==1) {
                            navi += ' first-screen';
                        }
                        navi += '">';
                        navi += x;
                        navi += '</a>';
                    }
                    $p.html(navi);
                    var _sl = $wp.scrollLeft(); //动态获取滚动的位置
                    $(".scroll-screen").eq(parseInt(_sl/alw)).addClass("current").siblings().removeClass("current");
                    afterListLoad();
                } else {
                    tips('tips','show','数据加载出错，请稍后重试。');
                    return false;
                }
            },
            error: function() {
                tips('tips','show','数据抓取失败。');
                return false;
            }
        });
    }
    //将网站改变为横向滚动模式
    var Browser = function() {
        var d_ = document,n_ = navigator,t_ = this,s_= screen;
        var b = n_.appName;
        var ua = n_.userAgent.toLowerCase();
        t_.name = "Unknow";
        t_.safari = ua.indexOf("safari")>-1;  // always check for safari & opera
        t_.opera = ua.indexOf("opera")>-1;    // before ns or ie
        t_.firefox = !t_.safari && ua.indexOf('firefox')>-1; // check for gecko engine
        t_.ns = !t_.firefox && !t_.opera && !t_.safari && (b=="Netscape");
        t_.ie = !t_.opera && (b=="Microsoft Internet Explorer");
        t_.name = (t_.ie ? "IE" : (t_.firefox ? "Firefox" : (t_.ns ? "Netscape" : (t_.opera ? "Opera" : (t_.safari ? "Safari" : "Unknow")))));
    }
    var brw = new Browser();
    var perWidth = wp.clientWidth / 8;
    //var perWidth = 100; //每次滚动的宽度
    var mouse_wheel = function(e){
        var evt = window.event || e;
        if(evt.detail > 0 || evt.wheelDelta < 0)
            wp.scrollLeft += perWidth;
        else
            wp.scrollLeft -= perWidth;
    }
    var mouse_wheel_opera = function(e){
        var obj = e.srcElement;
        if(obj == wp){
            mouse_wheel(e);
        }
    }   
    switch(brw.name){
        case "IE":
        case "Safari":
            wp.onmousewheel = mouse_wheel;
            break;
        case "Firefox":
            wp.addEventListener("DOMMouseScroll", mouse_wheel, false);
            break;
        case "Opera":
            document.onmousewheel = mouse_wheel_opera;
            break;
    }
    function fixedEncodeURI (str) {
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    }
    function getSlug(url) {
        var _url = url.split("/").slice(-2,-1)
        if (encode) {
            return _url;
        } else {
            return fixedEncodeURI(_url);
        }
    }
    function setUrl(url) {
        window.history.pushState({},0,url);
    }
});