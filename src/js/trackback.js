var id = undefined;
chrome.runtime.sendMessage({method: "getHatenaId"}, function(response) {
    id = response["hatenaId"];
    if (id) {
        var href = "http://anond.hatelabo.jp/" + id + "/edit";
        $(".sectionfooter").each(function(index) {
            var footer = $(this);
            var a = footer.find('a');
            var date = a.eq(0).attr('href').split('/')[1];
            footer.prepend('<a href="' + href + '" class="trackback_link" data-tbid="' + date + '">返信</a> | ');
        });

        $(".trackback_link").click(function(e) {
            var tbId = $(this).data("tbid");
            localStorage['tbid'] = tbId;
        });
    }
});

