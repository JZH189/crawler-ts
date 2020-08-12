import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import { AnalysorClass } from "./crawler";

interface BookInfo {
  title: string;
  commont: number;
}
interface jsonText {
  time: number;
  data: BookInfo[];
}
interface Content {
  [propName: number]: BookInfo[];
}

export default class Analysor implements AnalysorClass {
  private getJson(html: string) {
    const $ = cheerio.load(html);
    const books = $("#component_59").children("li");
    const domJson: BookInfo[] = []; //存抓取的数据
    books.map((index, element) => {
      const descs = $(element);
      const title =
        descs.eq(index).find("a").text().replace(/\s+/g, "") || "默认文字内容";
      const commont =
        parseInt(
          descs
            .eq(index)
            .find(".star a")
            .text()
            .replace(/\s+/g, "")
            .split("条")[0],
          10
        ) || parseInt((Math.random() * 100).toFixed(), 10);
      domJson.push({ title, commont });
    });
    return {
      time: new Date().getTime(),
      data: domJson,
    };
  }

  generateJsonContent(jsonText: jsonText, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[jsonText.time] = jsonText.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const jsonText = this.getJson(html);
    const fileContent = this.generateJsonContent(jsonText, filePath);
    return JSON.stringify(fileContent);
  }
}
