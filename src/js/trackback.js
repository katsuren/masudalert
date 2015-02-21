var id = undefined;

// ページ開始時に非表示正規表現を取得しておく
var regs = new Array();
chrome.storage.local.get("word_length", function(data) {
    var max = data["word_length"] || 0;
    max = parseInt(max);
    var names = new Array();
    for (var i = 0; i <= max; i++) {
        var name = "word" + i.toString();
        names.push(name);
    }
    chrome.storage.local.get(names, function(data) {
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            if (data[name]) {
                regs.push(data[name]);
            }
        }
        applyTrackback();
    });
});

var applyTrackback = function() {
    if (id) {
        var href = "http://anond.hatelabo.jp/" + id + "/edit";
        $(".section").each(function(index) {
            // セクションに削除する正規表現があったら非表示
            var text = $(this).text();
            for (var i = 0; i < regs.length; i++) {
                var r = new RegExp(regs[i]);
                if (text.match(r)) {
                    $(this).remove();
                    return;
                }
            }

            var footer = $(this).find(".sectionfooter");
            var a = footer.find('a');
            var date = a.eq(0).attr('href').split('/')[1];
            if ( ! footer.find('.trackback_link').get(0)) {
                footer.prepend('<a href="' + href + '" class="trackback_link" data-tbid="' + date + '">返信</a> | ');
                $(this).attr('id', date);
            }
        });

        $(".trackback_link").click(function(e) {
            var tbId = $(this).data("tbid");
            localStorage['tbid'] = tbId;
            var section = $("#" + tbId);
            section.find("h3:first").remove();
            section.find(".afc").prev().remove();
            section.find(".afc").remove();
            section.find("#rectangle-middle").next().remove();
            section.find("#rectangle-middle").remove();
            section.find(".sectionfooter").next().remove();
            section.find(".sectionfooter").remove();
            section.html(section.html().replace(/<br \/>/g, "\n"));
            section.html(section.html().replace(/<\/p>/g, "</p>\n"));
            section.html(section.html().replace(/<\/blockquote>/g, "<<\n"));
            section.html(section.html().replace(/<blockquote>/g, ">>\n"));
            localStorage['tbbody'] = section.text().replace(/\n\n/g, "\n");
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
