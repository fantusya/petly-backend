const { City } = require("../../models");

const getCities = async (req, res) => {
  const { query = "" } = req.query;

  function translit(word) {
    let answer = "";
    const converter = {
      а: "a",
      б: "b",
      в: "v",
      г: "h",
      ґ: "g",
      д: "d",
      е: "e",
      є: "ye",
      ж: "zh",
      з: "z",
      и: "y",
      і: "i",
      ї: "yi",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ь: "",
      ю: "yu",
      я: "ya",

      А: "A",
      Б: "B",
      В: "V",
      Г: "H",
      Ґ: "G",
      Д: "D",
      Е: "E",
      Є: "Ye",
      Ж: "Zh",
      З: "Z",
      И: "Y",
      І: "I",
      Ї: "Yi",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "Kh",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Shch",
      Ь: "",
      Ю: "Yu",
      Я: "Ya",
    };

    for (let i = 0; i < word.length; ++i) {
      if (converter[word[i]] === undefined) {
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }

    return answer;
  }

  console.log("translit", translit("Дніпро"));

  const city = await City.find(
    { city: { $regex: query, $options: "i" } },
    "-_id -id"
  );

  if (!city) {
    res.json({ results: "Sorry, city not found" });
  }

  res.json(city);
};

module.exports = getCities;
