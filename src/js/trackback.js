var id = undefined;

var applyTrackback = function() {
    if (id) {
        var href = "http://anond.hatelabo.jp/" + id + "/edit";
        $(".sectionfooter").each(function(index) {
            var footer = $(this);
            var a = footer.find('a');
            var date = a.eq(0).attr('href').split('/')[1];
            if ( ! footer.find('.trackback_link').get(0)) {
                footer.prepend('<a href="' + href + '" class="trackback_link" data-tbid="' + date + '">返信</a> | ');
            }
        });

        $(".trackback_link").click(function(e) {
            var tbId = $(this).data("tbid");
            localStorage['tbid'] = tbId;
        });
    }
};

chrome.runtime.sendMessage({method: "getHatenaId"}, function(response) {
    id = response["hatenaId"];
    applyTrackback();
});


// AutoPagerize 対応
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e) {
    applyTrackback();
}, true);
