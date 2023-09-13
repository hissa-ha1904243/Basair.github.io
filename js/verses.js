const db=new Localbase('basair');
const title= document.querySelector('.title');
const table= document.querySelector('table');
var currentPage = parseInt(localStorage.getItem("suraPage"));
const id = parseInt(localStorage.getItem("suraID"));
const soura = 'https://api.quran.com/api/v3/chapters/' + id + '/verses?page=' + currentPage
const souraInfo = 'https://api.quran.com/api/v3/chapters/' + id
var total_pages = 0


function loadSora() {

    fetch(soura).then(data => { return data.json() }).then(jsonData => {
        //to know the total num of pages
        total_pages = jsonData.pagination.total_pages
        console.log(jsonData)
        var soraString = ''
//name in arabic and english
        fetch(souraInfo).then(data => { return data.json() }).then(jsonInfo => {
            title.innerText = jsonInfo.chapter.name_arabic + ' : ' + jsonInfo.chapter.name_simple
        })
//display the verses
        jsonData.verses.forEach(it => {
            table.innerHTML+=`<tr><td>(${it.verse_number})</td> <td>${it.text_indopak}</td></tr>`

        })
    });
}

loadSora()

function navPage(e) {
    //**
    var page2go = e.previousSibling.previousSibling.value
    if (total_pages < page2go) {
        document.querySelector('.pageNumber').style.outlineColor = 'red'
        document.querySelector('.nav').style.borderColor = 'red'
        document.querySelector('.nav').style.color = 'red'
        alert('page not available, the last page of sora is ' + total_pages)
    } else {
//**
        localStorage.setItem("suraPage", e.previousSibling.previousSibling.value);
        window.location.reload()
    }
}

function nextPage(e) {
    var page2go = (parseInt(currentPage) + 1)
    if (total_pages < page2go) {
        document.querySelector('.pageNumber').style.outlineColor = 'red'
        document.querySelector('.nav').style.borderColor = 'red'
        document.querySelector('.nav').style.color = 'red'
        alert('page not available, the last page of sora is ' + total_pages)

    } else {

        localStorage.setItem("suraPage", page2go);
        window.location.reload()
    }
}

function prevPage(e) {
    var page2go = (parseInt(currentPage) - 1)
    if (total_pages < page2go) {
        document.querySelector('.pageNumber').style.outlineColor = 'red'
        document.querySelector('.nav').style.borderColor = 'red'
        document.querySelector('.nav').style.color = 'red'
        alert('page not available, the last page of sora is ' + total_pages)
    } else {
        localStorage.setItem("suraPage", page2go);
        window.location.reload()
    }
}
