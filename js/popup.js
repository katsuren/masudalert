var id = localStorage["hatenaId"];
if (id) {
    $("#hatenaId").val(id);
}

$("#form").submit(function(e) {
    localStorage["hatenaId"] = $("#hatenaId").val();
});


document.addEventListener('DOMContentLoaded', function() {
    chrome.browserAction.setBadgeText({text:""});

    // 100 項目以上になった場合はクリア
    if ($("#main").length > 100) {
        $("#main").html("");
    }

    var news = localStorage['news'];
    news = news.split(",");
    if (news.length > 100) {
        var str = "";
        for (var i=news.length - 100; i<news.length; i++) {
            if (str == "") {
                str = news[i];
            } else {
                str += "," + news[i];
            }
        }
        localStorage['news'] = str;
    }

    var already = new Object();
    for (var i=news.length-1; i>=0; i--) {
        var date = news[i];
        if (date && already[date] == undefined) {
            var title = localStorage[date];
            var url = "http://anond.hatelabo.jp/" + date;
            var item = "<div><a href='" + url + "' target='_blank'>" + title + "</a></div>";
            $("#main").append(item);
            already[date] = true;
        }
    }
});



