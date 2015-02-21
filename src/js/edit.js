var tbid = localStorage["tbid"] || null;
delete(localStorage["tbid"]);
var title = tbid == null ? null : "anond:" + tbid;

var body = localStorage["tbbody"] || null;
    console.log(body);
delete(localStorage["tbbody"]);
body = body == null ? null : ">>\n" + body + "<<\n";

if (title && $("#text-title").val() == "") {
    $("#text-title").val(title);
    $("#text-body").val(body);
    $(".section h3").append('<button id="clear_button" style="margin-left: 20px;">引用しない</button>');
    $('#clear_button').click(function(e) {
        $("#text-body").val("");
        $(this).remove();
    });
}
