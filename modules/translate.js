import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export default async function translate(
  sourceText,
  targetLang,
  sourceLang = "auto"
) {
  try {
    if (!sourceText || !targetLang) {
      return console.log("Not enough arguments");
    }

    const GOOGLE_API =
      "https://translate.googleapis.com/translate_a/single?client=gtx";

    const headers = {
      referer: "https://translate.google.com/",
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    };

    sourceText = `"${sourceText}"`;
    const res = await axios.get(GOOGLE_API, {
      headers,
      params: {
        dt: "t",
        sl: sourceLang,
        tl: targetLang,
        q: sourceText,
      },
    });

    const translatedText = res.data[0]
      .map((el) => el[0])
      .join("")
      .replaceAll('"', "");
    return translatedText;
  } catch (err) {
    return sourceText;
  }
}
