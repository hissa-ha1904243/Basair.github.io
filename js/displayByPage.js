const db=new Localbase('basair');
async function navPage(e){
    localStorage.clear()
    let inputVal=" ";
    inputVal = document.getElementById("pageNumber").value;
    const pages= await db.collection('pages').get();
    localStorage.setItem("pageNum", inputVal);
    const pageNum = parseInt(localStorage.getItem("pageNum"));
    const thepage = pages.find(p => p.index == pageNum);
    const theSura = thepage.sura;
    localStorage.setItem("suraID", theSura);
    localStorage.setItem("suraPage", 1);
    window.location.replace('verses.html')

}
