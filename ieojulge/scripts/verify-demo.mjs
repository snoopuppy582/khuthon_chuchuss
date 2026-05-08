import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import pngjs from "pngjs";

const { PNG } = pngjs;

const root = process.cwd();
const port = process.env.PORT || "3100";
const baseUrl = `http://127.0.0.1:${port}`;
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  for (let i = 0; i < 80; i += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await wait(500);
  }
  throw new Error("Next server did not start in time");
}

async function assertCanvasHasPixels(page) {
  const canvas = page.locator("canvas").first();
  const buffer = await canvas.screenshot();
  const png = PNG.sync.read(buffer);
  let brightPixels = 0;
  let sampled = 0;
  const stepX = Math.max(1, Math.floor(png.width / 48));
  const stepY = Math.max(1, Math.floor(png.height / 48));

  for (let y = 0; y < png.height; y += stepY) {
    for (let x = 0; x < png.width; x += stepX) {
      const index = (png.width * y + x) * 4;
      const r = png.data[index];
      const g = png.data[index + 1];
      const b = png.data[index + 2];
      sampled += 1;
      if (r + g + b > 36) brightPixels += 1;
    }
  }

  const stats = { found: true, brightPixels, sampled, width: png.width, height: png.height };

  if (brightPixels < sampled * 0.02) {
    throw new Error(`3D canvas pixel check failed: ${JSON.stringify(stats)}`);
  }
}

async function verifyViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(`${baseUrl}/experience`, { waitUntil: "networkidle" });
  await page.waitForSelector("canvas", { timeout: 20000 });
  await page.waitForTimeout(1500);
  await assertCanvasHasPixels(page);

  await page.getByRole("button", { name: "첨성대 설명 열기" }).click();
  await page.getByRole("button", { name: "AI 콘텐츠 창작하기" }).click();
  await page.getByRole("button", { name: "창작하기" }).click();
  await page.getByRole("heading", { name: /첨성대/ }).waitFor({ timeout: 20000 });
  await page.getByRole("button", { name: "QR로 실제 방문 이어가기" }).click();
  await page.getByAltText("첨성대 방문 정보 QR 코드").waitFor({ timeout: 20000 });

  await page.screenshot({
    path: path.join(root, "test-artifacts", `${name}-experience.png`),
    fullPage: true
  });

  await page.goto(`${baseUrl}/offline/cheomseongdae`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "첨성대 방문 정보" }).waitFor({ timeout: 10000 });
  await page.screenshot({
    path: path.join(root, "test-artifacts", `${name}-offline.png`),
    fullPage: true
  });

  await page.close();
}

await mkdir(path.join(root, "test-artifacts"), { recursive: true });

const server = spawn(process.execPath, [nextBin, "start", "-p", port], {
  cwd: root,
  stdio: "pipe",
  env: {
    ...process.env,
    PORT: port
  }
});

try {
  await waitForServer();
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true
  });

  try {
    await verifyViewport(browser, "desktop", { width: 1440, height: 900 });
    await verifyViewport(browser, "mobile", { width: 390, height: 844 });
  } finally {
    await browser.close();
  }

  console.log("Demo verification passed: desktop/mobile canvas, creation flow, QR page.");
} finally {
  server.kill();
}
