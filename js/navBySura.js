
document.addEventListener('DOMContentLoaded', async () => {
    const db=new Localbase('basair');
    const surahs = await db.collection('surahs').get();
    surahs.forEach(it =>{
            var card = `<div class="card"><div class="soura" value="${it.id}"  >
                    <a href='#' class="navLinks" onclick="goSora(${it.id})">${it.englishName} </a>
                    <a href="#" onclick="goMap(${it.id})" class="navLinks fa-solid fa-sitemap hierarchyIcon"></a>
                    <a href='#' class="navLinks" onclick="goSora(${it.id})">${it.name}</a></div></div>`
            document.querySelector('.container').innerHTML+=card;
        }
    )
});
function goSora(e) {
    localStorage.clear()
    localStorage.setItem("suraPage", 1);
    localStorage.setItem("suraID", e);
    if(e==4){
       window.location.replace('nisaVerses.html')
    }else{
        window.location.replace('verses.html')
    }

}
function goMap(e){
    if(e==4)
        window.location.replace('topics.html')
}
