import fs from "fs";
import translate from "./modules/translate.js";

async function questExtract(chapterFile, modPack, isTranslate) {
  // chapterFile = "getting_started.snbt";
  isTranslate = "true";
  modPack = "e6e";

  const chapter = chapterFile.replace(".snbt", "");
  const questChapter = fs
    .readFileSync(`./ftbquests/chapters/${chapterFile}`, "utf-8")
    .replaceAll('\\"', "'");

  !fs.existsSync("./output/chapters") &&
    fs.mkdirSync("./output/chapters", { recursive: true });

  let rewriteChapter = questChapter;
  let lang = {};
  let translatedLang = {};
  const titleRegex = /\btitle: \"[\s\S.]*?\"/gm;
  const subTitleRegex = /\bsubtitle: \[?\"[\s\S.]*?\"\]?/gm;
  const descRegex = /\bdescription: \[[\s\S.]*?\]/gm;

  const titles = questChapter.match(titleRegex);
  const subTitles = questChapter.match(subTitleRegex);
  const descriptions = questChapter.match(descRegex);

  function getString(text, part) {
    const stringRegex = /(?<=("))(?:(?=(\\?))\2.)*?(?=\1)/gm;
    return text
      .replace(`${part}: `, "")
      .toString()
      .replaceAll('""', "")
      .match(stringRegex);
  }

  function convert(part, array, translatedArray) {
    for (let i = 0; i < array.length; i++) {
      const string = array[i];
      rewriteChapter = rewriteChapter.replace(
        `"${string}"`,
        `"{${modPack}.${chapter}.${part}${i}}"`
      );

      if (isTranslate) {
        const translatedString = translatedArray[i];
        translatedLang = {
          ...translatedLang,
          [`${modPack}.${chapter}.${part}${i}`]: translatedString,
        };
      }

      lang = {
        ...lang,
        [`${modPack}.${chapter}.${part}${i}`]: string,
      };
    }
  }

  if (!titles && !subTitles && !descriptions) return;

  if (titles) {
    const sourceTitles = titles.flatMap((title) => getString(title, "title"));
    let translateTitles;
    if (isTranslate) {
      translateTitles = await Promise.all(
        sourceTitles.map((text) => {
          return translate(text, "ko");
        })
      );
    }
    convert("title", sourceTitles, translateTitles);
  }

  if (subTitles) {
    const sourceSubTitles = subTitles.flatMap((subTitle) =>
      getString(subTitle, "subTitle")
    );
    let translateSubTitles;
    if (isTranslate) {
      translateSubTitles = await Promise.all(
        sourceSubTitles.map((text) => {
          return translate(text, "ko");
        })
      );
    }
    convert("subTitle", sourceSubTitles, translateSubTitles);
  }
  if (descriptions) {
    const sourceDescriptions = descriptions.flatMap((description) =>
      getString(description, "description")
    );
    let translateDescriptions;
    if (isTranslate) {
      translateDescriptions = await Promise.all(
        sourceDescriptions.map((text) => {
          return translate(text, "ko");
        })
      );
    }
    convert("description", sourceDescriptions, translateDescriptions);
  }

  // console.log(sourceTitles);
  // console.log(sourceSubTitles);
  // console.log(descriptions);

  // console.log(lang);

  fs.writeFileSync(`./output/chapters/${chapterFile}`, rewriteChapter);

  if (fs.existsSync("./output/en_us.json")) {
    const langFile = fs.readFileSync(`./output/en_us.json`, "utf-8");
    lang = { ...lang, ...JSON.parse(langFile) };
    fs.writeFileSync(`./output/en_us.json`, JSON.stringify(lang, null, 2));
  } else {
    fs.writeFileSync(`./output/en_us.json`, JSON.stringify(lang, null, 2));
  }

  if (isTranslate) {
    if (fs.existsSync("./output/ko_kr.json")) {
      const langFile = fs.readFileSync(`./output/ko_kr.json`, "utf-8");
      translatedLang = { ...translatedLang, ...JSON.parse(langFile) };
      fs.writeFileSync(
        `./output/ko_kr.json`,
        JSON.stringify(translatedLang, null, 2)
      );
    } else {
      fs.writeFileSync(
        `./output/ko_kr.json`,
        JSON.stringify(translatedLang, null, 2)
      );
    }
  }
}

// questExtract();

(async () => {
  fs.readdir(`./ftbquests/chapters`, function (err, fileLists) {
    fileLists.map((file) => questExtract(file, "e6e", true));
  });
})();
