// バージョン設定
var version = chrome.app.getDetails().version;
$('#footer').html('version: ' + version);

// ストレージ削除
$("#clear_button").click(function(e) {
    if (confirm("すべての記録が削除されます。よろしいですか？")) {
        chrome.storage.local.clear(function() {
            location.reload();
        });
    }
});

// 正規表現追加
$("#add_word_button").click(function(e) {
    addWordInput();
});
var addWordInput = function(id) {
    if ( ! id) {
        var max = localStorage["word_length"] || 0;
        max = parseInt(max) + 1;
        chrome.storage.local.set({"word_length": max}, function(e) {
            localStorage["word_length"] = max;
        });
        id = max.toString();
    }
    var block = "";
    block += '<div class="input_block" data-id="' + id + '">';
    block += '<input class="word_input" type="text" maxlength="128" id="cw' + id + '"></input>';
    block += '<button class="commit_button" data-id="' + id + '">保存</button>';
    block += '<button class="delete_button" data-id="' + id + '">削除</button>';
    block += '</div><br />';
    $(".clear_words").prepend(block);

    $(".commit_button[data-id='" + id + "'").click(function(e) {
        commitButtonClicked($(this), e);
    });
    $(".delete_button[data-id='" + id + "'").click(function(e) {
        deleteButtonClicked($(this), e);
    });
};

var commitButtonClicked = function(thisObject, e) {
    var id = thisObject.data("id").toString();
    var val = $("#cw" + id).val();
    var data = {};
    data["word" + id] = val.toString();
    chrome.storage.local.set(data, function(result) {
        alert("保存しました");
    });
};
var deleteButtonClicked = function(thisObject, e) {
    var id = thisObject.data("id").toString();
    chrome.storage.local.remove("word" + id, function(result) {
        $("div.input_block").each(function(index) {
            if ($(this).data("id") == id) {
                $(this).remove();
                return;
            }
        });
    });
};

// 起動処理
var length = localStorage["word_length"] || 0;
for (var i = 0; i <= length; i++) {
    var id = i.toString();
    var name = "word" + id;
    chrome.storage.local.get(name, function(data) {
        if (data[name]) {
            console.log(data);
            addWordInput(id);
            $("#cw" + id).val(data[name]);
        }
    });
}
