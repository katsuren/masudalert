$(".section").each(function(index) {
    var section = $(this);
    var header = section.find("h3");
    var link = header.find("a").eq(1);
    var href = link.attr("href");
    if (href && href.match(/.*anond\.hatelabo\.jp.*/)) {
    alert(href);
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
});
