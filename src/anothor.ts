import { AnalysorClass } from "./crawler";

export default class Anothor implements AnalysorClass {
  analyze(html: string, filePath: string) {
    return html;
  }
}
