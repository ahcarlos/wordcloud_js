console.time('Tiempo ejecucion');
const fs = require('fs');
let WordCounter = require('word-counter');
let wc = new WordCounter();

let text = fs.readFileSync('./tweets.txt',"utf-8");
let array = text.split(" ");
//console.log(array);
console.log(array.length);


function stopWords(value, sw)
{
  let stopWords = fs.readFileSync('./stopwords/' + sw,"utf-8");
  //customsw solo tenia \n, al tener \r\n no filtraba correctamente
  let stopWordsArray = stopWords.split(/\r\n|\n/);
  //let stopWordsArray = stopWords.split(/[^\r\n]?|\r\n|\n/);
  //let stopWordsArray = stopWords.split("\r\n");
  //let stopWordsArray = stopWords.split("\n");
  //console.log(stopWordsArray);
  let result = [];

  for (let i = 0; i < value.length; i++)
  {
    if(!(stopWordsArray.includes(value[i])))
    {
      result.push(value[i]);
    }
  }
  return result;
}

var arrSw = ["customsw.txt", "stopwords.es", "stop-words_english_1_en.txt", "stop-words_english_2_en.txt", "stop-words_english_3_en.txt", "stop-words_english_4_google_en.txt", "stop-words_english_5_en.txt", "stop-words_english_6_en.txt"];
var filtered = array;

for (var i = 0; i < arrSw.length; i++)
{
  filtered = stopWords(filtered, arrSw[i]);
}

let hashtag = [];
let users = [];
let words = [];

for (var i = 0; i < filtered.length; i++)
{
  if(filtered[i].startsWith("#"))
  {
    hashtag.push(filtered[i]);
  }
  else if(filtered[i].startsWith("@"))
  {
    users.push(filtered[i]);
  }
  else
  {
    words.push(filtered[i]);
  }
}
//console.log(words);
fs.writeFileSync('./words.txt',words);
fs.writeFileSync('./hashtags.txt',hashtag);
fs.writeFileSync('./users.txt',users);


let words_ready_to_count = fs.readFileSync('./words.txt',"utf-8");

wc.count(words_ready_to_count);
let report = wc.report();
//console.log(report);
console.timeEnd('Tiempo ejecucion');

//preparando formato para wordcloud
let words_wordcloud = [];
for(let i in report) {
    words_wordcloud.push({
        text: report[i][0],
        size: report[i][1]
    });
}

console.log(words_wordcloud);
console.log(words_wordcloud[1].text); //prueba de que se puede acceder bien al campo text

/*
======== esta parte para JSON =========
let output = JSON.stringify(words_wordcloud);
console.log(output);

*/

//console.log(filtered.length);
//console.log(words.length);
//console.log(hashtag.length);
//console.log(users.length);
//console.log(filtered);
console.log((array.length - filtered.length) / array.length * 100);
//console.log(['a','b','c'].includes('a'));
