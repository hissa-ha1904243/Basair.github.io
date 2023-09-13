//move the data from json file to the database

//create the database
const db = new Localbase('basair');

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}
//it will load when we open the page
document.addEventListener('DOMContentLoaded', async () => {
  const dataVerses = await fetchData('./data/verses.json');
  const dataPages = await fetchData('./data/pages.json');
  const dataSurahs = await fetchData('./data/surahs.json');
  const dataTafsir = await fetchData('./data/tasfir.json');
  const dataTopic = await fetchData('./data/topic.json');
  
  const souraInfo = await fetchData('https://api.quran.com/api/v3/chapters/');
//get all the data in the collection verses and store it in versesDB to check if it is empty or not.
  const versesDB = await db.collection('verses').get();
  // if the collection is empty we will loop through each verse in the array after fetching and add to the collection.
  if (versesDB.length == 0) {
    dataVerses.map(async (verse) => {
      await db.collection('verses').add(verse);
    });
  }
  const pagesDB = await db.collection('pages').get();
  if (pagesDB.length == 0) {
    dataPages.map(async (page) => {
      await db.collection('pages').add(page);
    });
  }
  const surahsDB = await db.collection('surahs').get();
  if (surahsDB.length == 0) {
    dataSurahs.map(async (surah) => {
      await db.collection('surahs').add(surah);
    });
  }
  const tafsirDB = await db.collection('tafsir').get();
  if (tafsirDB.length == 0) {
    dataTafsir.map(async (tafsir, index) => {
      await db.collection('tafsir').add({...tafsir, id: index});
    });
  }
  const topicDB = await db.collection('topic').get();
  if (topicDB.length == 0) {
    dataTopic.map(async (topic,index) => {
      await db.collection('topic').add({...topic,index});
    });
  }
  const surahInfoDB = await db.collection('surahInfo').get();
  if (surahInfoDB.length == 0) {
    souraInfo.chapters.map(async (info) => {
      await db.collection('surahInfo').add(info);
    });
  }
});
