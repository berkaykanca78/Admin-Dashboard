function clickSpan() {
    let i = 1;
    let str = [];
    while (i <= document.querySelectorAll('span[id^="select"]').length) {
        document.getElementById("select" + i).onclick = function (e) {
            e.preventDefault();
            let shadesEl = ($(this)[0].classList);
            if (shadesEl.contains('badge-secondary')) {
                shadesEl.remove('badge-secondary');
                shadesEl.add('badge-success');
                str.push(($(this)[0].innerText));
                document.getElementById('List').value = str;
                console.log(str);
            } else {
                shadesEl.remove('badge-success');
                shadesEl.add('badge-secondary');
                str.splice(str.indexOf($(this)[0].innerText), 1);
                document.getElementById('List').value = str;
                console.log(str);
            }
        };
        i++;
    }
}
function clearSpan() {
    $('span[id^="select"]').removeClass("badge-success");
    $('span[id^="select"]').addClass("badge-secondary");
}
$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    document.getElementById("inputId").value = id;
})