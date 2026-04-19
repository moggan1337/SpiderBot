export class SpiderBot {
  async scrape(url: string): Promise<string> { return `Content from ${url}`; }
  async crawl(urls: string[]) { return Promise.all(urls.map(u => this.scrape(u))); }
  async extract(html: string, selector: string) { return [html]; }
}
export default SpiderBot;
