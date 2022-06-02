import fs from "fs";
import path from "path";
import translate from "./modules/translate.js";

const __dirname = path.resolve();
const fsPromises = fs.promises;

async function test() {
  const chapterFile = "adventure.snbt";
  const questChapter = fs.readFileSync(
    `./ftbquests/chapters/${chapterFile}`,
    "utf-8"
  );

  let rewriteChapter = questChapter;
  let rewriteChapterDesc = [];
  let langJson = {};
  const titleRegex = /\btitle: \"[\s\S.]*?\"/gm;
  const subTitleRegex = /\bsubtitle: \"[\s\S.]*?\"/gm;
  const descRegex = /\bdescription: \[[\s\S.]*?\]/gm;
  const stringRegex = /"(?:[^"\\]*|\\")*?"/gm;

  const titles = questChapter.match(titleRegex, null, 2);
  const subTitles = questChapter.match(subTitleRegex, null, 2);
  const descriptions = questChapter.match(descRegex, null, 2);

  const sourceTitles = titles.map((title) => title.replace("title: ", ""));
  const sourceSubTitles = subTitles.map((subTitle) =>
    subTitle.replace("subtitle: ", "")
  );
  const sourceDescriptions = descriptions
    .map((description) => description.replace("description: ", ""))
    .toString()
    .replaceAll('""', "")
    .match(stringRegex);

  // console.log(sourceTitles);
  // console.log(sourceSubTitles);
  // console.log(sourceDescriptions);

  const translateTitles = await Promise.all(
    sourceTitles.map(async (title) => await translate(title, "ko"))
  );

  const translateSubTitles = await Promise.all(
    sourceSubTitles.map(async (subtitle) => await translate(subtitle, "ko"))
  );

  const translateDescriptions = await Promise.all(
    sourceDescriptions.map(
      async (description) => await translate(description, "ko")
    )
  );

  console.log(translateTitles);
  console.log(translateSubTitles);
  console.log(translateDescriptions);

  // fs.writeFileSync(`./ftbquests/output/${chapterFile}`, rewriteChapter);

  // fs.writeFileSync(
  //   `./ftbquests/output/ko_kr.json`,
  //   JSON.stringify(langJson, null, 2)
  // );
}

test();
