const db=new Localbase('basair');
const basairDiv=document.querySelector(".basair");
document.addEventListener('DOMContentLoaded',
    async () => {
        const index = parseInt(localStorage.getItem('basair'));
        const topics = await db.collection('topic').get();
        basairDiv.innerHTML += topics.filter(t => t.index == index).map(t => `<tr class="box"><td>${t.basair}</td></tr>`).join(" ");
    });