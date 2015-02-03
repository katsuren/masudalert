var aUrl = "http://anond.hatelabo.jp/";
var bUrl = "http://api.b.st-hatena.com/entry.count";
var interval = 5 * 60 * 1000;
setTimeout(checkUpdate, interval);

// 起動時に毎回クリアする
localStorage['news'] = "";

checkUpdate();
function checkUpdate()
{
    var id = localStorage["hatenaId"];
    if (id) {
        var url = aUrl + id + '/';
        pageRequest(url, 1);
    }
    setTimeout(checkUpdate, interval);
}

function pageRequest(url, page)
{
    if ( ! page) {
        page = 1;
    }
    var params = {page: page};
    $.get(url, params, function(data) {
        var id = localStorage["hatenaId"];
        var html = $($.parseHTML(data));

        // パンくずに 「idの日記」 の表記がない場合は未ログインまたは別アカウント
        var breadcrumbs = html.find('#breadcrumbs');
        if ( ! breadcrumbs.text().match(id+"の日記")) {
            return;
        }

        // ページャー以上のページの場合はなにもしない
        var pager = html.find('.pager-r');
        var pages = pager.text().split("ページ中");
        var total = pages[0];
        if (page > total) {
            return;
        }

        // 1ヵ月以上前の投稿は取得しない
        // YYYYmmddHHiiss の形式を js できちんとやるのめんどくさいので適当に
        var date = new Date();
        var y = date.getFullYear().toString();
        var m = date.getMonth().toString();
        m = m.length == 1 ? '0' + m: m;
        var d = date.getDate().toString();
        d = d.length == 1 ? '0' + d: d;
        var aMonthAgo = y + m + d + "000000";
        html.find(".section").each(function(index) {
            var footer = $(this).find('.sectionfooter');
            var title = $(this).find('h3');
            var p = $(this).find('p');
            var a = footer.find("a");
            var date = a.eq(0).attr('href').split('/')[1];
            if (date < aMonthAgo) {
                return;
            }

            localStorage[date] = title.text();
            localStorage[date + "_p"] = p.eq(0).text();

            // トラックバックの増加チェック
            var tb = a.eq(1).text().split("トラックバック(")[1].split(")")[0];
            var stored = localStorage[date + "_tb"];
            stored = stored == undefined ? 0 : stored;
            if (store == 0 || tb > stored) {
                chrome.browserAction.getBadgeText({}, function(result) {
                    result++;
                    chrome.browserAction.setBadgeText({text:String(result)});
                });
                var news = localStorage['news'] + "," + date;
                localStorage['news'] = news;
            }
            localStorage[date + "_tb"] = tb;

            // ブクマの数チェック
            $.get(bUrl, {url: aUrl + date}, function(data) {
                var stored = localStorage[date + "_b"];
                stored = stored == undefined ? 0 : stored;
                if (data > stored) {
                    chrome.browserAction.getBadgeText({}, function(result) {
                        result++;
                        chrome.browserAction.setBadgeText({text:String(result)});
                    });
                    var news = localStorage['news'] + "," + date;
                    localStorage['news'] = news;
                }
                localStorage[date + "_b"] = data;
            });
        });

        // 次のページ確認
        pageRequest(aUrl, page + 1);
    });
}
