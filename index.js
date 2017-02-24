const fs = require('fs');

let text = fs.readFileSync('./tweets.txt',"utf-8");
let array = text.split(" ")
//console.log(array);
console.log(array.length);


function stopWords(value, sw)
{
  let stopWords = fs.readFileSync('./stopwords/' + sw,"utf-8");
  let stopWordsArray = stopWords.split("\r\n");
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

var arrSw = ["stopwords.es", "stop-words_english_1_en.txt", "stop-words_english_2_en.txt", "stop-words_english_3_en.txt", "stop-words_english_4_google_en.txt", "stop-words_english_5_en.txt", "stop-words_english_6_en.txt"];
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

fs.writeFileSync('./words.txt',words);
fs.writeFileSync('./hashtags.txt',hashtag);
fs.writeFileSync('./users.txt',users);

console.log(filtered.length);
console.log(words.length);
console.log(hashtag.length);
console.log(users.length);
//console.log(filtered);
console.log((array.length - filtered.length) / array.length * 100);
//console.log(['a','b','c'].includes('a'));
