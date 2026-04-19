# SpiderBot 🕷️

**Web Scraping Framework** - Concurrent crawling with Playwright/Puppeteer.

## Features

- **⚡ Concurrent Crawling** - Multiple pages simultaneously
- **🎯 CSS Selector Extraction** - Extract specific elements
- **⏱️ Auto Rate Limiting** - Respect server limits
- **🔄 Proxy Rotation** - Built-in proxy support
- **📄 Multiple Formats** - HTML, JSON, Markdown output

## Installation

```bash
npm install spiderbot
```

## Usage

```typescript
import { SpiderBot } from 'spiderbot';

const spider = new SpiderBot();

const results = await spider.crawl([
  'https://example.com/page1',
  'https://example.com/page2',
]);

for (const page of results) {
  const title = await spider.extract(page.html, 'h1');
  console.log(title);
}
```

## CLI

```bash
# Scrape a single page
spiderbot scrape https://example.com

# Crawl multiple pages
spiderbot crawl urls.txt

# Extract specific elements
spiderbot extract https://example.com "h1, .price, #content"
```

## Configuration

```typescript
const spider = new SpiderBot({
  concurrency: 5,
  delay: 1000,
  retries: 3,
  proxy: 'http://proxy:8080'
});
```

## License

MIT
