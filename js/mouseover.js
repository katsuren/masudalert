$("a").mouseover(function(e) {
    if ($(this).data("checked")) {
        return;
    }
    var link = $(this);
    var href = link.attr("href");
    var sanchor = link.find(".sanchor").html(); // 自身の記事へのリンク
    if (href && !sanchor && (href.match(/.*anond\.hatelabo\.jp\/[0-9]+/) || href.match(/^\/[0-9]+/))) {
        link.addClass("tb");
        $.get(href, {}, function(data) {
            var data = $(data);
            var section = data.find(".section");
            // 本文だけ抜き出す
            section.find("h3").remove();
            section.find(".afc").remove();
            section.find("#rectangle-middle").remove();
            section.find(".share-button").remove();
            section.find(".sectionfooter").remove();
            link.append("<span>" + section.html() + "</span>");
        });
    }
    else {
        link.data("checked", true);
    }
});
