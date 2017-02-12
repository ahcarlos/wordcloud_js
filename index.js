const fs = require('fs');

let text = fs.readFileSync('./tweets.txt',"utf-8");
let array = text.split(" ")

//console.log(text);
//console.log(array);
console.log(array.length);

function stopWords(value)
{
  let stopWords = fs.readFileSync('./stopwords/stopwords.es',"utf-8");
  let stopWordsArray = stopWords.split("\n");
  console.log(stopWordsArray.length);
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

var filtered = stopWords(array);


console.log(filtered.length);
//console.log(filtered);
console.log((array.length - filtered.length) / array.length * 100);
