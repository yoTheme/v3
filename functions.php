<?php
/* ShortUrl */
function myUrl($atts, $content = null) {

extract(shortcode_atts(array(

"href" => 'http://'

), $atts));

return '<a target="_blank" href="'.$href.'" rel="nofollow">'.$content.'</a>';

}

add_shortcode("url", "myUrl");
?>