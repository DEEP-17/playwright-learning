import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  env: "LOCAL",
});

await stagehand.init();

const page = stagehand.page;

await page.goto("https://www.irctc.co.in/nget/train-search");

await page.act("Select Ahmedabad as source station");
await page.act("Select Mumbai Central as destination station");
await page.act("Choose First Class");
await page.act("Search for trains");