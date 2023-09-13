const versesDiv=document.querySelector(".verses");
const title=document.querySelector(".title");
const db=new Localbase('basair');
let currentPage = 77;
document.addEventListener('DOMContentLoaded', async () => {
    currentPage = localStorage.getItem('page') ? parseInt(localStorage.getItem('page')) : 77

    const verses = await db.collection('verses').get();
    const topics = await db.collection('topic').get();
    const pages = await db.collection('pages').get();
    const nisa = verses.find(v => v.id === 4)
    const startAyah = pages.find(v => v.index === currentPage)
    const lastAyah = pages.find(v => v.index === currentPage +1 )

    title.innerHTML = "سوره "+nisa.name;

    topics.forEach(element => {
        const {text, ayahat, color, index} = element
        //to have pages, each page have a number of ayaht
        if (ayahat && ayahat[0] >= startAyah.aya && ayahat.at(-1) < lastAyah.aya) {
            //to group the verses that make a قسم
            //ayaht is an array in topics json file and it contains ayaht num that are in the قسم
            const nisaVerses = nisa.verses.filter(v => ayahat.includes(v.id))
            let allText = ''
            nisaVerses.forEach(v => {
                allText += `(${v.id}) ` + v.text + '<br>'

            })

            versesDiv.innerHTML += `
                <tr style='background-color: ${color}'><td>${allText}</td><td>${text}<br>
                    <div class="links">
                        <a href="basair.html" onclick='setBasir(${index})'>بصائر</a>
                        <a href="tafsir.html" onclick='setTafsir(${index})'>تفسير</a>
                        <a href="https://www.youtube.com/watch?v=Eu6jrg7tdtY">فيديو</a>
                        <a href="https://www.lovely0smile.com/2016/quanmap/quanmap-004.jpg">تصميم غرافيك</a>
                    </div>
                </td></tr>`

        }

    });

});

async function setBasir(index){
    localStorage.setItem('basair',index);
}

async function setTafsir(index){
    localStorage.setItem('tafsir',index);
}

async function nextPage() {
    //to get all the data in the database of verses
    const verses = await db.collection('verses').get();
    const topics = await db.collection('topic').get();
    const pages = await db.collection('pages').get();
    const nisa = verses.find(v => v.id === 4)
    currentPage++;


    const startAyah = pages.find(v => v.index === currentPage)
    const lastAyah = pages.find(v => v.index === currentPage + 1)

    versesDiv.innerHTML = ''

    topics.forEach(element => {
        const {text, ayahat, color} = element

        if (ayahat && (ayahat.includes(startAyah.aya) || ayahat.includes(lastAyah.aya)) ) {
            const nisaVerses = nisa.verses.filter(v => ayahat.includes(v.id))
            let allText = ''
            nisaVerses.forEach(v => {
                allText += `(${v.id}) ` + v.text + '<br>'

            })
            versesDiv.innerHTML += `
                <tr style='background-color: ${color}'><td>${allText}</td><td>${text}<br>
                    <div class="links">
                         <a href="basair.html">بصائر</a>
                        <a href="tafsir.html">تفسير</a>
                        <a href="https://www.youtube.com/watch?v=Eu6jrg7tdtY">فيديو</a>
                        <a href="https://www.lovely0smile.com/2016/quanmap/quanmap-004.jpg">تصميم غرافيك</a>
                    </div>
                </td></tr>`
        }
    });
}
async function previousPage(){
    //to get all the data in the database of verses
    const verses = await db.collection('verses').get();
    const topics = await db.collection('topic').get();
    const pages = await db.collection('pages').get();
    const nisa= verses.find(v=>v.id===4)
    const nisaPages= pages.filter(v=>v.sura===4)

    if(currentPage != 77)
        currentPage -= 1

        const startAyah = pages.find(v => v.index === currentPage)
        const lastAyah = pages.find(v => v.index === currentPage +1)


    versesDiv.innerHTML = ''

    topics.forEach(element => {
        const {text, ayahat, color} = element


        if (ayahat && (ayahat.includes(startAyah.aya) || ayahat.includes(lastAyah.aya)) ) {
            const nisaVerses = nisa.verses.filter(v => ayahat.includes(v.id))
            let allText = ''
            nisaVerses.forEach(v => {
                allText += `(${v.id}) ` + v.text + '<br>'

            })
            versesDiv.innerHTML += `
                <tr style='background-color: ${color}'><td>${allText}</td><td>${text}<br>
                    <div class="links">
                        <a href="basair.html">بصائر</a>
                        <a href="tafsir.html">تفسير</a>
                        <a href="https://www.youtube.com/watch?v=Eu6jrg7tdtY">فيديو</a>
                        <a href="https://www.lovely0smile.com/2016/quanmap/quanmap-004.jpg">تصميم غرافيك</a>
                    </div>
                </td></tr>`
        }
    });
    
}




