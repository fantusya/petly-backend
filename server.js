const mongoose = require("mongoose");
const app = require("./app");
// const { City } = require("./models");

const { DB_HOST, PORT = 3030 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database connection successful. API is on port: ${PORT}`)
    )
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// function translit(word) {
//   let answer = "";
//   const converter = {
//     a: "а",
//     b: "б",
//     v: "в",
//     h: "г",
//     g: "ґ",
//     d: "д",
//     e: "е",
//     ye: "є",
//     zh: "ж",
//     z: "з",
//     y: "и",
//     i: "і",
//     yi: "ї",
//     y: "й",
//     k: "к",
//     l: "л",
//     m: "м",
//     n: "н",
//     o: "о",
//     p: "п",
//     r: "р",
//     s: "с",
//     t: "е",
//     u: "у",
//     f: "ф",
//     kh: "ч",
//     ts: "ц",
//     ch: "ч",
//     sh: "ш",
//     shch: "щ",
//     yu: "ю",
//     ya: "я",

//     А: "A",
//     Б: "B",
//     В: "V",
//     Г: "H",
//     Ґ: "G",
//     Д: "D",
//     Е: "E",
//     Є: "Ye",
//     Ж: "Zh",
//     З: "Z",
//     И: "Y",
//     І: "I",
//     Ї: "Yi",
//     Й: "Y",
//     К: "K",
//     Л: "L",
//     М: "M",
//     Н: "N",
//     О: "O",
//     П: "P",
//     Р: "R",
//     С: "S",
//     Т: "T",
//     У: "U",
//     Ф: "F",
//     Х: "Kh",
//     Ц: "Ts",
//     Ч: "Ch",
//     Ш: "Sh",
//     Щ: "Shch",
//     Ь: "",
//     Ю: "Yu",
//     Я: "Ya",
//   };

//   for (let i = 0; i < word.length; ++i) {
//     if (converter[word[i]] === undefined) {
//       answer += word[i];
//     } else {
//       answer += converter[word[i]];
//     }
//   }

//   return answer;
// }

// function translit(word) {
//   let answer = "";
//   const converter = {
//     а: "a",
//     б: "b",
//     в: "v",
//     г: "h",
//     ґ: "g",
//     д: "d",
//     е: "e",
//     є: "ye",
//     ж: "zh",
//     з: "z",
//     и: "y",
//     і: "i",
//     ї: "yi",
//     й: "y",
//     к: "k",
//     л: "l",
//     м: "m",
//     н: "n",
//     о: "o",
//     п: "p",
//     р: "r",
//     с: "s",
//     т: "t",
//     у: "u",
//     ф: "f",
//     х: "kh",
//     ц: "ts",
//     ч: "ch",
//     ш: "sh",
//     щ: "shch",
//     ь: "",
//     ю: "yu",
//     я: "ya",

//     А: "A",
//     Б: "B",
//     В: "V",
//     Г: "H",
//     Ґ: "G",
//     Д: "D",
//     Е: "E",
//     Є: "Ye",
//     Ж: "Zh",
//     З: "Z",
//     И: "Y",
//     І: "I",
//     Ї: "Yi",
//     Й: "Y",
//     К: "K",
//     Л: "L",
//     М: "M",
//     Н: "N",
//     О: "O",
//     П: "P",
//     Р: "R",
//     С: "S",
//     Т: "T",
//     У: "U",
//     Ф: "F",
//     Х: "Kh",
//     Ц: "Ts",
//     Ч: "Ch",
//     Ш: "Sh",
//     Щ: "Shch",
//     Ь: "",
//     Ю: "Yu",
//     Я: "Ya",
//   };

//   for (let i = 0; i < word.length; ++i) {
//     if (converter[word[i]] === undefined) {
//       answer += word[i];
//     } else {
//       answer += converter[word[i]];
//     }
//   }

//   return answer;
// }

// console.log("translit", translit("Дніпро"));

// console.log("translit", translit("Запоріжжя"));

// const cities = async () => {
// await City.updateMany({}, [
//   {
//     $set: { " city_en ": translit("$city") },
//   },
// ]);

// const array = await City.findOne({ _id: 1 });
// console.log("array", array);
// for (const item of array) {
//   // console.log("CITY", item.city);
//   await City.updateOne({ _id: 1 }, { city_en: translit(item.city) });
// }

// await City.updateMany(
//   {},
//   {
//     $set: { " city_en ": { $concat: translit($city) } },
//   }
// );

// await City.updateMany({}, { city_en: translit("$city") });
// };

// cities();
