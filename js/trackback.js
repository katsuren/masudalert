var id = undefined;
chrome.runtime.sendMessage({method: "getHatenaId"}, function(response) {
    id = response["hatenaId"];
    if (id) {
        $(".sectionfooter").each(function(index) {
            var footer = $(this);
            var a = footer.find('a');
            var date = a.eq(0).attr('href').split('/')[1];
            var tbId = "anond:" + date;
            footer.prepend('<a href="' + tbId + '" class="trackback_link">返信</a> | ');
        });

        $(".trackback_link").click(function(e) {
            var tbId = $(this).attr("href");
            var url = "http://anond.hatelabo.jp/" + id + "/edit";
            $.get(url, {}, function(data) {
                var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();

                // この時点でjQueryも読み込まれていないので無理やり入れる
                var input = newDoc.getElementById('text-title');
                input.value = tbId;
            });
        });
    }
});

