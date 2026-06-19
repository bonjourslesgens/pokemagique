import { existsSync } from "node:fs";
import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer-core";

const localBrowserCandidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium"
].filter(Boolean) as string[];

function isServerlessRuntime() {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function findLocalBrowser() {
  return localBrowserCandidates.find((candidate) => existsSync(candidate));
}

export async function launchExportBrowser(): Promise<Browser> {
  if (isServerlessRuntime()) {
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: "shell"
    });
  }

  const executablePath = findLocalBrowser();

  if (!executablePath) {
    throw new Error(
      "Aucun navigateur local compatible n’a été trouvé. Installe Chrome ou Edge, ou renseigne PUPPETEER_EXECUTABLE_PATH dans .env.local."
    );
  }

  return puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath,
    headless: true
  });
}
