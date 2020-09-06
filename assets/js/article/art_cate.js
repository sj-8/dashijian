$(function () {
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {

                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
            }
        });
    }
    initArtCateList()
})