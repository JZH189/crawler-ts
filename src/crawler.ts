import superagent from "superagent";
import cheerio from "cheerio";
interface Doc {
  title: string;
  count: number;
}
class Crawler {
  private rawHtml = "";
  private url = `http://www.8dian1ke.com/home/course/index/cate_id/2.html`;
  async getRwaHtml() {
    const result = await superagent.get(this.url);
    this.getJsonInfo(result.text);
  }
  getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const collegeItem = $(".college-rect");
    const domJson: Doc[] = []; //存抓取的数据
    collegeItem.map((index, element) => {
      const descs = $(element).find("div");
      const title = descs
        .eq(index)
        .find(".college-rect-top")
        .text()
        .trim()
        .replace(/\s+/g, "");
      const count =
        parseInt(descs.eq(index).find("div").eq(3).text().split("人")[0], 10) ||
        0;
      domJson.push({ title, count });
    });
    const result = {
      time: new Date().toLocaleDateString(),
      data: domJson,
    };
    console.log(result);
  }
  constructor() {
    this.getRwaHtml();
  }
}
const crawler = new Crawler();
