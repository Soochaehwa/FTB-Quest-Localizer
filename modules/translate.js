import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export default async function translate(
  sourceText,
  targetLang,
  sourceLang = "auto"
) {
  if (!sourceText || !targetLang) {
    return console.log("not enough arguments");
  }

  const langs = [
    "auto",
    "af",
    "ga",
    "sq",
    "it",
    "ar",
    "ja",
    "az",
    "kn",
    "eu",
    "ko",
    "bn",
    "la",
    "be",
    "lv",
    "bg",
    "lt",
    "ca",
    "mk",
    "zh-CN",
    "ms",
    "zh-TW",
    "mt",
    "hr",
    "no",
    "cs",
    "fa",
    "da",
    "pl",
    "nl",
    "pt",
    "en",
    "ro",
    "eo",
    "ru",
    "et",
    "sr",
    "tl",
    "sk",
    "fi",
    "sl",
    "fr",
    "es",
    "gl",
    "sw",
    "ka",
    "sv",
    "de",
    "ta",
    "el",
    "te",
    "gu",
    "th",
    "ht",
    "tr",
    "iw",
    "uk",
    "hi",
    "ur",
    "hu",
    "vi",
    "is",
    "cy",
    "id",
    "yi",
  ];

  if (!langs.includes(targetLang) || !langs.includes(sourceLang)) {
    return console.log("not supported language");
  }
  const GOOGLE_API =
    "https://translate.googleapis.com/translate_a/single?client=gtx";

  const headers = {
    referer: "https://translate.google.com/",
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53",
  };

  const trText = await axios.get(GOOGLE_API, {
    headers,
    params: {
      dt: "t",
      sl: sourceLang,
      tl: targetLang,
      q: sourceText,
    },
  });

  try {
    const translatedText = trText.data[0][0][0];
    return translatedText;
  } catch (error) {
    console.log(trText.data);
    console.log("테에엥...");
  }
}
