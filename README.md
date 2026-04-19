# SpiderBot 🕷️

<p align="center">
  <img src="https://img.shields.io/npm/v/spiderbot?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/node/v/spiderbot?style=flat-square" alt="node version">
  <img src="https://img.shields.io/npm/dm/spiderbot?style=flat-square" alt="downloads">
  <img src="https://img.shields.io/github/license/spiderbot/spiderbot?style=flat-square" alt="license">
  <img src="https://img.shields.io/github/stars/spiderbot/spiderbot?style=flat-square" alt="stars">
  <img src="https://img.shields.io/github/forks/spiderbot/spiderbot?style=flat-square" alt="forks">
  <img src="https://img.shields.io/github/workflow/status/spiderbot/spiderbot/CI?style=flat-square" alt="CI">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square" alt="TypeScript">
</p>

<p align="center">
  <strong>High-Performance Web Scraping Framework</strong><br>
  Concurrent crawling with Playwright/Puppeteer integration
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [CLI Commands](#-cli-commands)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Advanced Usage](#-advanced-usage)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| ⚡ **Concurrent Crawling** | Scrape multiple pages simultaneously with configurable concurrency limits |
| 🎯 **CSS Selector Extraction** | Extract specific elements using CSS selectors, XPath, or regex patterns |
| ⏱️ **Auto Rate Limiting** | Intelligent delay between requests to respect server limits |
| 🔄 **Proxy Rotation** | Built-in proxy support with automatic rotation |
| 📄 **Multiple Output Formats** | HTML, JSON, Markdown, and plain text output options |
| 🛡️ **Robust Error Handling** | Automatic retries with exponential backoff |
| 🌐 **JavaScript Rendering** | Full browser automation with Playwright/Puppeteer |
| 📊 **Request Metrics** | Built-in tracking of success rates, timing, and errors |

### Advanced Features

- **Headless Browser Support** - Run browsers without visible UI
- **Cookie Management** - Persist and manage cookies across sessions
- **Custom Headers** - Set custom HTTP headers for requests
- **Form Submission** - Automate form filling and submission
- **Screenshot Capture** - Take screenshots of pages during scraping
- **PDF Generation** - Export pages as PDFs
- **Session Management** - Maintain browser sessions across requests
- **Batch Processing** - Process large URL lists efficiently
- **Result Caching** - Cache responses to avoid redundant requests
- **Webhook Notifications** - Send alerts on completion or errors

---

## 🚀 Quick Start

### Basic Usage

```typescript
import { SpiderBot } from 'spiderbot';

// Create a new instance
const spider = new SpiderBot();

// Scrape a single page
const html = await spider.scrape('https://example.com');
console.log(html);

// Crawl multiple pages concurrently
const results = await spider.crawl([
  'https://example.com/page1',
  'https://example.com/page2',
  'https://example.com/page3',
]);

// Extract specific elements
for (const page of results) {
  const titles = await spider.extract(page.html, 'h1');
  const prices = await spider.extract(page.html, '.price');
  console.log({ titles, prices });
}
```

### CLI Quick Start

```bash
# Install globally
npm install -g spiderbot

# Scrape a single page
spiderbot scrape https://example.com

# Crawl URLs from a file
spiderbot crawl urls.txt

# Extract elements and save to JSON
spiderbot extract https://example.com "h1, .price" -o results.json
```

---

## 📦 Installation

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v8.0.0 or higher (or yarn/pnpm)
- **Playwright** (for browser automation) - installed automatically

### Install via npm

```bash
# Latest stable version
npm install spiderbot

# With Playwright browser binaries
npx playwright install chromium

# Specific version
npm install spiderbot@1.0.0
```

### Install via yarn

```bash
yarn add spiderbot
yarn add -D @playwright/test
npx playwright install chromium
```

### Install via pnpm

```bash
pnpm add spiderbot
pnpm exec playwright install chromium
```

### Docker Installation

```dockerfile
FROM node:20-alpine

# Install Playwright dependencies
RUN apk add --no-cache \
    chromium \
    chromium-chromedriver \
    harfbuzz \
    ffmpeg \
    libstdc++

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
CMD ["node", "index.js"]
```

### Build from Source

```bash
# Clone the repository
git clone https://github.com/spiderbot/spiderbot.git
cd spiderbot

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Link for local development
npm link
```

---

## 📖 Usage

### Basic Scraping

```typescript
import { SpiderBot } from 'spiderbot';

const spider = new SpiderBot();

// Simple page fetch
const html = await spider.scrape('https://example.com');
console.log(html.substring(0, 200));
```

### Concurrent Crawling

```typescript
import { SpiderBot } from 'spiderbot';

const spider = new SpiderBot({
  concurrency: 5,
  delay: 1000,
});

const urls = [
  'https://example.com/products',
  'https://example.com/about',
  'https://example.com/contact',
  'https://example.com/blog',
  'https://example.com/pricing',
];

const results = await spider.crawl(urls);

for (const result of results) {
  console.log(`URL: ${result.url}`);
  console.log(`Status: ${result.status}`);
  console.log(`Content Length: ${result.html.length}`);
  console.log('---');
}
```

### Element Extraction

```typescript
import { SpiderBot } from 'spiderbot';

const spider = new SpiderBot();
const page = await spider.scrape('https://news.ycombinator.com');

// Extract by CSS selector
const titles = await spider.extract(page.html, '.titleline > a');
const scores = await spider.extract(page.html, '.score');

// Extract by XPath
const comments = await spider.extract(page.html, '//a[@class="comment"]');

// Extract with regex
const emails = await spider.extract(page.html, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);

// Extract and transform
const prices = await spider.extract(page.html, '.price', {
  transform: (el) => el.textContent.replace('$', '').trim()
});
```

### Custom Configuration

```typescript
import { SpiderBot } from 'spiderbot';

const spider = new SpiderBot({
  // Concurrency settings
  concurrency: 10,
  delay: 500,
  maxRetries: 3,
  retryDelay: 2000,

  // Browser settings
  headless: true,
  userAgent: 'Mozilla/5.0 (compatible; SpiderBot/1.0)',
  viewport: { width: 1920, height: 1080 },

  // Proxy settings
  proxy: {
    host: 'proxy.example.com',
    port: 8080,
    auth: { username: 'user', password: 'pass' }
  },

  // Request settings
  timeout: 30000,
  headers: {
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml'
  },

  // Output settings
  cache: true,
  cacheDir: './.spiderbot-cache',
});

// Now use the configured spider
const results = await spider.crawl(urls);
```

### Working with Results

```typescript
import { SpiderBot, CrawlResult } from 'spiderbot';

const spider = new SpiderBot();
const results: CrawlResult[] = await spider.crawl(urls);

// Filter successful results
const successful = results.filter(r => r.status === 200);

// Get only the HTML content
const htmlContents = results.map(r => r.html);

// Get metadata
const metadata = results.map(r => ({
  url: r.url,
  status: r.status,
  timing: r.timing,
  size: r.html.length,
  error: r.error
}));

// Save results to file
import { writeFile } from 'fs/promises';
await writeFile('results.json', JSON.stringify(results, null, 2));
```

---

## 💻 CLI Commands

### Global Flags

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--output` | `-o` | Output file path | stdout |
| `--format` | `-f` | Output format (json, html, markdown) | json |
| `--concurrency` | `-c` | Number of concurrent requests | 5 |
| `--delay` | `-d` | Delay between requests (ms) | 1000 |
| `--timeout` | `-t` | Request timeout (ms) | 30000 |
| `--proxy` | `-p` | Proxy URL | none |
| `--help` | `-h` | Show help | - |
| `--version` | `-v` | Show version | - |

### scrape

Scrape a single URL and output the content.

```bash
# Basic usage
spiderbot scrape https://example.com

# Save to file
spiderbot scrape https://example.com -o output.html

# With custom timeout
spiderbot scrape https://example.com --timeout 60000

# Using proxy
spiderbot scrape https://example.com --proxy http://proxy:8080
```

**Options:**

- `url` (required) - The URL to scrape
- `--output, -o` - Output file path
- `--format` - Output format (html, json, markdown, text)
- `--timeout` - Request timeout in milliseconds
- `--user-agent` - Custom user agent string

### crawl

Crawl multiple URLs from a file or list.

```bash
# Crawl URLs from file (one URL per line)
spiderbot crawl urls.txt

# Crawl with custom concurrency
spiderbot crawl urls.txt --concurrency 10

# Save results as JSON
spiderbot crawl urls.txt -o results.json --format json

# Crawl with delay between requests
spiderbot crawl urls.txt --delay 2000

# Verbose output with progress
spiderbot crawl urls.txt --verbose
```

**Input file format (urls.txt):**
```
https://example.com/page1
https://example.com/page2
https://example.com/page3
# Lines starting with # are comments
https://example.com/page4
```

**Options:**

- `file` (required) - Path to file containing URLs
- `--concurrency, -c` - Number of concurrent requests
- `--delay, -d` - Delay between batches
- `--output, -o` - Output file path
- `--format` - Output format (json, csv, html)
- `--verbose` - Show progress information

### extract

Extract specific elements from a URL.

```bash
# Extract headings
spiderbot extract https://example.com "h1, h2, h3"

# Extract with multiple selectors
spiderbot extract https://example.com "h1, .price, #content, a.link"

# Extract and save to file
spiderbot extract https://example.com "article h2" -o headlines.json

# Extract using XPath
spiderbot extract https://example.com "//div[@class='product']/span" --xpath
```

**Options:**

- `url` (required) - The URL to extract from
- `selectors` (required) - CSS selectors or XPath expressions
- `--xpath` - Treat selectors as XPath expressions
- `--output, -o` - Output file path
- `--attribute` - Extract specific attribute (e.g., href, src)
- `--all` - Extract all matches (default: true)

### screenshot

Capture a screenshot of a page.

```bash
# Full page screenshot
spiderbot screenshot https://example.com -o screenshot.png

# Viewport screenshot
spiderbot screenshot https://example.com --viewport 1920x1080 -o viewport.png

# Element screenshot
spiderbot screenshot https://example.com --element ".chart" -o chart.png
```

**Options:**

- `url` (required) - The URL to screenshot
- `--output, -o` - Output file path (png, jpg)
- `--viewport` - Viewport size (e.g., 1920x1080)
- `--full-page` - Capture entire scrollable page
- `--element` - Screenshot specific element only
- `--delay` - Wait before screenshot (ms)

### serve

Start an HTTP server for programmatic access.

```bash
# Start server on default port
spiderbot serve

# Custom port
spiderbot serve --port 8080

# With authentication
spiderbot serve --auth user:password

# CORS enabled
spiderbot serve --cors
```

**Endpoints:**

- `GET /scrape?url=<url>` - Scrape a URL
- `POST /crawl` - Crawl multiple URLs (body: { urls: [] })
- `POST /extract` - Extract elements (body: { url, selector })
- `GET /health` - Health check

---

## ⚙️ Configuration

### Configuration File

SpiderBot can read configuration from a `spiderbot.config.js` file:

```javascript
// spiderbot.config.js
export default {
  // Concurrency
  concurrency: 5,
  delay: 1000,
  maxRetries: 3,
  retryDelay: 2000,

  // Browser
  headless: true,
  userAgent: 'Mozilla/5.0 (compatible; SpiderBot/2.0)',
  viewport: {
    width: 1920,
    height: 1080
  },

  // Proxy
  proxy: {
    host: process.env.PROXY_HOST,
    port: parseInt(process.env.PROXY_PORT || '8080'),
    protocol: 'http'
  },

  // Headers
  headers: {
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9'
  },

  // Timeouts
  timeout: 30000,
  navigationTimeout: 60000,

  // Cache
  cache: true,
  cacheDir: './.spiderbot-cache',
  cacheMaxAge: 3600000, // 1 hour

  // Logging
  logLevel: 'info',
  logFile: './spiderbot.log'
};
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SPIDERBOT_CONCURRENCY` | Default concurrency | 5 |
| `SPIDERBOT_DELAY` | Default delay (ms) | 1000 |
| `SPIDERBOT_TIMEOUT` | Default timeout (ms) | 30000 |
| `SPIDERBOT_PROXY` | Default proxy URL | none |
| `SPIDERBOT_CACHE_DIR` | Cache directory | .spiderbot-cache |
| `SPIDERBOT_LOG_LEVEL` | Log level | info |
| `SPIDERBOT_USER_AGENT` | Default user agent | (built-in) |

### Runtime Configuration

Override settings at runtime:

```typescript
const spider = new SpiderBot();

// Override for single scrape
const html = await spider.scrape(url, {
  headers: { 'Authorization': 'Bearer token' },
  timeout: 60000
});

// Override for crawl
const results = await spider.crawl(urls, {
  concurrency: 20,
  delay: 500,
  proxy: 'http://new-proxy:8080'
});
```

---

## 📚 API Reference

### SpiderBot Class

#### Constructor

```typescript
new SpiderBot(options?: SpiderBotOptions)
```

**Options:**

```typescript
interface SpiderBotOptions {
  // Concurrency
  concurrency?: number;           // Default: 5
  delay?: number;                 // Default: 1000 (ms)
  maxRetries?: number;            // Default: 3
  retryDelay?: number;            // Default: 2000 (ms)
  retryBackoff?: 'linear' | 'exponential';  // Default: 'exponential'

  // Browser
  headless?: boolean;             // Default: true
  userAgent?: string;
  viewport?: { width: number; height: number };
  browser?: 'chromium' | 'firefox' | 'webkit';

  // Proxy
  proxy?: string | ProxyConfig;

  // Request
  timeout?: number;               // Default: 30000
  headers?: Record<string, string>;

  // Cache
  cache?: boolean;                // Default: false
  cacheDir?: string;
  cacheMaxAge?: number;            // ms

  // Events
  onRequest?: (url: string) => void;
  onResponse?: (url: string, response: Response) => void;
  onError?: (url: string, error: Error) => void;
  onComplete?: (results: CrawlResult[]) => void;
}
```

#### Methods

##### `scrape(url, options?)`

Scrape a single URL.

```typescript
async scrape(
  url: string,
  options?: ScrapeOptions
): Promise<ScrapeResult>

interface ScrapeResult {
  url: string;
  html: string;
  status: number;
  headers: Record<string, string>;
  timing: {
    start: number;
    end: number;
    duration: number;
  };
  error?: string;
}
```

##### `crawl(urls, options?)`

Crawl multiple URLs concurrently.

```typescript
async crawl(
  urls: string[],
  options?: CrawlOptions
): Promise<CrawlResult[]>

interface CrawlResult {
  url: string;
  html: string;
  status: number;
  headers: Record<string, string>;
  timing: {
    start: number;
    end: number;
    duration: number;
  };
  error?: string;
  retries: number;
}
```

##### `extract(html, selector, options?)`

Extract elements from HTML.

```typescript
async extract(
  html: string,
  selector: string | RegExp,
  options?: ExtractOptions
): Promise<ExtractedElement[]>

interface ExtractOptions {
  attribute?: string;     // Extract attribute instead of text
  all?: boolean;          // Return all matches (default: true)
  transform?: (el: Element) => any;  // Transform function
}

interface ExtractedElement {
  text: string;
  html: string;
  attributes: Record<string, string>;
  tag: string;
}
```

##### `screenshot(url, options?)`

Take a screenshot of a page.

```typescript
async screenshot(
  url: string,
  options?: ScreenshotOptions
): Promise<Buffer>

interface ScreenshotOptions {
  path?: string;          // Save to file
  fullPage?: boolean;
  viewport?: { width: number; height: number };
  element?: string;      // CSS selector
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number;
}
```

##### `destroy()`

Clean up resources (browser instances, cache, etc.).

```typescript
async destroy(): Promise<void>
```

---

## 🔥 Advanced Usage

### Proxy Rotation

```typescript
import { SpiderBot } from 'spiderbot';

const proxies = [
  'http://proxy1:8080',
  'http://proxy2:8080',
  'http://proxy3:8080',
];

let proxyIndex = 0;

const spider = new SpiderBot({
  proxy: () => {
    const proxy = proxies[proxyIndex % proxies.length];
    proxyIndex++;
    return proxy;
  }
});
```

### Custom Error Handling

```typescript
import { SpiderBot, SpiderBotError } from 'spiderbot';

const spider = new SpiderBot({
  maxRetries: 5,
  retryDelay: 3000,

  onError: (url, error) => {
    console.error(`Failed to scrape ${url}:`, error.message);
  }
});

try {
  const results = await spider.crawl(urls);
} catch (error) {
  if (error instanceof SpiderBotError) {
    console.error('SpiderBot error:', error.code, error.message);
  }
}
```

### Batch Processing

```typescript
import { SpiderBot } from 'spiderbot';

const spider = new SpiderBot({ concurrency: 10 });

async function* batchProcess(urls: string[], batchSize: number) {
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const results = await spider.crawl(batch);
    yield results;
  }
}

for await (const batch of batchProcess(allUrls, 100)) {
  await saveToDatabase(batch);
}
```

### JavaScript Interaction

```typescript
import { SpiderBot } from 'spiderbot';

const spider = new SpiderBot();

await spider.evaluate('https://example.com', async (page) => {
  // Click a button
  await page.click('#load-more');

  // Wait for content
  await page.waitForSelector('.loaded-content');

  // Get page height for scrolling
  const height = await page.evaluate(() => document.body.scrollHeight);

  // Scroll and load more content
  for (let i = 0; i < height; i += 500) {
    await page.evaluate((pos) => window.scrollTo(0, pos), i);
    await page.waitForTimeout(500);
  }

  // Return extracted data
  return await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.item')).map(el => ({
      title: el.querySelector('h3')?.textContent,
      price: el.querySelector('.price')?.textContent
    }));
  });
});
```

---

## 💡 Best Practices

### Respect Website Policies

1. **Check robots.txt** - Always check and respect `robots.txt`
2. **Rate limiting** - Use appropriate delays between requests
3. **Off-peak hours** - Schedule large crawls during off-peak times
4. **User agent** - Use a descriptive user agent that identifies your bot
5. **Terms of service** - Review and comply with website ToS

### Performance Optimization

1. **Concurrency tuning** - Adjust based on target server capacity
2. **Cache aggressively** - Cache responses to reduce redundant requests
3. **Selective extraction** - Only fetch what you need
4. **Connection reuse** - Keep connections alive when possible
5. **Resource cleanup** - Always call `destroy()` when done

### Error Resilience

```typescript
const spider = new SpiderBot({
  maxRetries: 5,
  retryBackoff: 'exponential',
  
  onError: (url, error) => {
    // Log for debugging
    logger.error({ url, error: error.message });
    
    // Send alerts for critical failures
    if (error.message.includes('timeout')) {
      alertingService.notify('Timeout on ' + url);
    }
  }
});
```

---

## 🔧 Troubleshooting

### Common Issues

**Q: Getting blocked by websites**

```typescript
const spider = new SpiderBot({
  headless: false,  // Sometimes helps
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  delay: 2000,  // Increase delay
  proxy: 'http://your-proxy:8080'  // Use proxies
});
```

**Q: JavaScript not loading**

```typescript
const spider = new SpiderBot({
  browser: 'chromium',
  headless: true,
  // Ensure page waits for network idle
  waitUntil: 'networkidle2'
});
```

**Q: Memory issues with large crawls**

```typescript
const spider = new SpiderBot({
  concurrency: 2,  // Reduce concurrency
  cache: false     // Disable caching
});

// Process in batches and release memory
for (const batch of chunkedUrls) {
  const results = await spider.crawl(batch);
  await processResults(results);
  await spider.destroy();
}
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting PRs.

```bash
# Fork and clone
git clone https://github.com/your-username/spiderbot.git
cd spiderbot

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm test

# Commit and push
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature

# Open a Pull Request
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with ❤️ by the SpiderBot Team
</p>
