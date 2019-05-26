function clickedSpan() {
    let i = 1;
    let str = [];
    while (i <= document.querySelectorAll('span[id^="selected"]').length) {
        document.getElementById("selected" + i).onclick = function (e) {
            e.preventDefault();
            let shadesEl = ($(this)[0].classList);
            if (shadesEl.contains('badge-secondary')) {
                shadesEl.remove('badge-secondary');
                shadesEl.add('badge-success');
                str.push(($(this)[0].innerText));
                document.getElementById('Lists').value = str;
                console.log(str);
            } else {
                shadesEl.remove('badge-success');
                shadesEl.add('badge-secondary');
                str.splice(str.indexOf($(this)[0].innerText), 1);
                document.getElementById('Lists').value = str;
                console.log(str);
            }
        };
        i++;
    }
}
function clearedSpan() {
    $('span[id^="selected"]').removeClass("badge-success");
    $('span[id^="selected"]').addClass("badge-secondary");
}