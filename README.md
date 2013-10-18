![主题截图](http://youed.me/wp-content/themes/yotheme_v3/screenshot.png)

这是一款全站AJAX的主题，支持Retina。

最佳效果：@[Evacuee][3]

**使用本主题必须安装 [JSON API][4]（数据输出） 以及 [wp slug translate][5]（可以替换为同类插件） 这两个插件。**  
**不可以使用 WP No Category Base 插件，暂不支持其他任何评论插件**

安装好以上插件和本主题之后：

1.  wordpress后台，启用JSON API插件，然后进入该插件的设置中将Core和Respond这两个接口启用。 
2.  wordpress后台，找到“设置”-“固定链接”，设置为“文章名”并保存。 
3.  找到`script.js`文件，将`baseUrl`替换为你自己的博客地址。
4.  为了在打开单篇文章时图片自动100%宽度，你需要给文章中包裹图片的`p`标签设置`class="full-img"`。针对此功能的自动处理代码在`script.js`的第443行至446行，你可以将其注释。
5.  你可以将主题`images`目录中的`bg.jpg`替换来改变主题背景图。
6.  输出文章时，会自动将该文章中的第一张图片作为主图显示在列表中，你也可以通过给文章添加`topic`自定义字段来设置主图。如果这两样都没有，则会自动输出一张默认图片作为主图。你可以在主题`images`目录中替换`nopic.jpg`来改变它。
7.  本主题支持retina，更换logo时，请将logo输出为600x100和300x50两个尺寸，并分别命名为logo@2x.png，logo.png，并将主题`images`目录中的这两个文件替换。
8.  同上，替换主loading图时，请将主题`images`目录中`indexbg.jpg`和`indexbg@2x.jpg`进行替换。 
9.  `header.php`中的GA（Google统计）代码请自行替换。
9.  更多问题，请留言。

:)


  [1]: http://youed.me/wp-content/uploads/2013/09/背景.jpg
  [2]: https://github.com/yoTheme/v3
  [3]: http://www.mirageyard.com/
  [4]: http://wordpress.org/plugins/json-api/
  [5]: http://wordpress.org/plugins/wp-slug/
