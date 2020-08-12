import fs from "fs";
import path from "path";
import superagent from "superagent";
// import Analysor from "./Analysor";
import Anothor from "./anothor";

export interface AnalysorClass {
  analyze: (html: string, filePath: string) => string;
}
class Crawler {
  private filePath = path.resolve(__dirname, "../data/course.json");
  constructor(private url: string, private analyzer: AnalysorClass) {
    this.initSpider();
  }
  async initSpider() {
    const html = await this.getRwaHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }
  async getRwaHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
}
const url = `http://148.70.249.151:8086/book.html`;
// const analyzer = new Analysor();
const analyzer = new Anothor();
new Crawler(url, analyzer);
