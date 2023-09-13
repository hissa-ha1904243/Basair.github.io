
const db=new Localbase('basair');
const theTafsir = document.querySelector(".tafsir");
document.addEventListener('DOMContentLoaded', async () => {
    const index = parseInt(localStorage.getItem('tafsir'));
    const tafsir = await db.collection('tafsir').get();
    const topics = await db.collection('topic').get();
    const nisaTafsir = tafsir.find(t => t.index === "4");
    const theTafsirOfAyat = nisaTafsir.ayat;


    topics.filter(t => t.index == index).forEach(element => {
        const {text, ayahat, color} = element
        //grouping the tafsir of each topic
        const versesTafsir = theTafsirOfAyat.filter(t => ayahat.includes(parseInt(t.index)))
        console.log(versesTafsir)
        let tafsirText = ''
        versesTafsir.forEach(v => {
            tafsirText += `(${v.text}) ` +`[${v.index}]`+ '<br>'
        })
        theTafsir.innerHTML += `
                <tr><td class="box">${tafsirText}</td></tr>`

    });
});