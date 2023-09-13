const db=new Localbase('basair');
const topicsDiv=document.querySelector(".topics");
document.addEventListener('DOMContentLoaded', async () => {
    const topics = await db.collection('topic').get();
    topicsDiv.innerHTML+=`<thead>
<tr>
<th colspan="2">المحور الاول</th>
</tr>
</thead>`
    for(let i=0 ;i<=5;i++){
        topicsDiv.innerHTML+=`<tr style='background-color: ${topics[i].color}'><td><a href="#" onclick='setPage(${topics[i].index})'>${i}</a></td><td>${topics[i].text}</td></tr>`;
    }
    topicsDiv.innerHTML+=`<thead>
<tr>
<th colspan="2">المحور الثاني</th>
</tr>
</thead>`
    for(let i=6 ;i<=9;i++){
        topicsDiv.innerHTML+=`<tr style='background-color: ${topics[i].color}'><td><a href="#" onclick='setPage(${topics[i].index})'>${i}</a></td><td>${topics[i].text}</td></tr>`;
    }
    topicsDiv.innerHTML+=`<thead>
<tr>
<th colspan="2">المحور الثالث</th>
</tr>
</thead>`
    for(let i=10 ;i<=18;i++){
        topicsDiv.innerHTML+=`<tr style='background-color: ${topics[i].color}'><td><a href="#" onclick='setPage(${topics[i].index})'>${i}</a></td><td>${topics[i].text}</td></tr>`;
    }
    topicsDiv.innerHTML+=`<thead>
<tr>
<th colspan="2">المحورالرابع</th>
</tr>
</thead>`
    for(let i=19 ;i<=23;i++){
        topicsDiv.innerHTML+=`<tr style='background-color: ${topics[i].color}'><td><a href="#" onclick='setPage(${topics[i].index})'>${i}</a></td><td>${topics[i].text}</td></tr>`;
    }
    topicsDiv.innerHTML+=`<thead>
<tr>
<th colspan="2">المحورالخامس</th>
</tr>
</thead>`
    for(let i=24 ;i<=32;i++){
        topicsDiv.innerHTML+=`<tr style='background-color: ${topics[i].color}'><td><a href="#" onclick='setPage(${topics[i].index})'>${i}</a></td><td>${topics[i].text}</td></tr>`;
    }
    topicsDiv.innerHTML+=`<thead>
<tr>
<th colspan="2">المحورالسادس</th>
</tr>
</thead>`
    for(let i=33 ;i<=39;i++){
        topicsDiv.innerHTML+=`<tr style='background-color: ${topics[i].color}'><td><a href="#" onclick='setPage(${topics[i].index})'>${i}</a></td><td>${topics[i].text}</td></tr>`;
    }
    topicsDiv.innerHTML+=`<thead>
<tr>
<th colspan="2">المحورالسابع</th>
</tr>
</thead>`
    for(let i=40 ;i<=51;i++){
        topicsDiv.innerHTML+=`<tr style='background-color: ${topics[i].color}'><td><a href="#" onclick='setPage(${topics[i].index})'>${i}</a></td><td>${topics[i].text}</td></tr>`;
    }
});

async function setPage(index){
    const topic = await db.collection('topic').doc({index: parseInt(index)}).get();
    const nisa = await db.collection('pages').get();
    const nisaPages = nisa.filter(it => it.sura == 4);
    const {ayahat} = topic;

    for (let i = 0; i < nisaPages.length; i++) {
        const currentPage = nisaPages[i];
        const nextPage = nisaPages[i+1];
        
        if(ayahat[0] >= currentPage.aya && ayahat.at(-1) < nextPage.aya){
            localStorage.setItem('page', currentPage.index);
            window.location.href = 'nisaVerses.html';
            break;
        }
        
    }
}