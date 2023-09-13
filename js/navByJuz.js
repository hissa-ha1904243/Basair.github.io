const juzs = 'https://api.quran.com/api/v3/juzs'

function rotate(el) {
    el.classList.toggle('rotate')
    el.parentElement.parentElement.nextElementSibling.classList.toggle('hide')
}

fetch(juzs).then(data => { return data.json() }).then(jsonData => {
    jsonData.juzs.forEach(it => {
        function genHizb() {
            var index = Object.keys(it.verse_mapping).length
            var keys = Object.keys(it.verse_mapping)
            var values = Object.values(it.verse_mapping)
            var hizbList = ''
            for (i = 0; i < index; i++) {
                hizbList += `<div class="rows"><div class="hizb-head" value="start" onclick="goPartOfSora(this)" sora_id="${keys[i]}" verse_ids="${values[i]}">HIZB ${i + 1}</div>
                             <div class="hizb-part" value="quarter" onclick="goPartOfSora(this)">1/4 HIZB</div>
                             <div class="hizb-part" value="half" onclick="goPartOfSora(this)">1/2 HIZB</div>
                             <div class="hizb-part" value="threeQuarter" onclick="goPartOfSora(this)">3/4 HIZB</div></div>`
            }
            return hizbList
        }
        var card = `<div class="card" value="${it.id}"><div class="card-head">
                    <label>Juz ${it.juz_number}</label><div class="card-details">
                    <a href="#">جزء</a><a href="#" class="fa-solid fa-angle-down rotate" onclick="rotate(this)"></a>
                    </div></div><div class="card-body hide">${genHizb()}</div></div>`

        document.querySelector('.container .body').insertAdjacentHTML('beforeend', card)
    })
});



function goPartOfSora(e) {
    function nav2Sora(soraLink, soraPage) {
        console.log(soraLink, soraPage)
        localStorage.clear()

        localStorage.setItem("suraPage", soraPage);
        localStorage.setItem("suraID", soraLink);
        window.location.replace("verses.html")
    }

    var verse_num = parseInt(e.getAttribute('verse_ids').split('-')[0])
    var sora_id = parseInt(e.getAttribute('sora_id'))
    var verse_qUrl = `https://api.quran.com/api/v3/chapters/${sora_id}`

    fetch(verse_qUrl).then(data => { return data.json() }).then(jsonData => {
        console.log(jsonData.chapter.pages[0])
        nav2Sora(parseInt(e.getAttribute('sora_id')), jsonData.chapter.pages[0])
    });

    if (e.getAttribute('value') == "start") {
        // nav2Sora(parseInt(e.getAttribute('sora_id')), parseInt(e.getAttribute('pages').split('-')[0]))
        // nav2Sora(parseInt(e.getAttribute('sora_id')), 1)
        // console.log(parseInt(e.getAttribute('sora_id')), parseInt(e.getAttribute('verse_ids').split('-')[0]))
    } else if (e.getAttribute('value') == "quarter") {
        console.log('quarter', e.getAttribute('value'))
    } else if (e.getAttribute('value') == "half") {
        console.log('half', e.getAttribute('value'))
    } else if (e.getAttribute('value') == "threeQuarter") {
        console.log('threeQuarter', e.getAttribute('value'))
    }

}
