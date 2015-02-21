var tbid = localStorage["tbid"] || null;
delete(localStorage["tbid"]);
var title = tbid == null ? null : "anond:" + tbid;

if (title && $("#text-title").val() == "") {
    $("#text-title").val(title);
}
