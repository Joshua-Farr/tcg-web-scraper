import * as cheerio from "cheerio";
import axios from "axios";

const priceGuides = {
  OP05: "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/awakening-of-the-new-era",
  OP06: "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/wings-of-the-captain",
  OP07: "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/500-years-in-the-future",
  EB01: "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/extra-booster-memorial-collection",
};

const getWebsiteData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    return console.log(`Error: ${e}`);
  }
};

const scrapeWebsite = async (url) => {
  console.log("Beginning scraping...");
  try {
    const websiteData = await getWebsiteData(url);
    const $ = cheerio.load(websiteData);
    console.log("Scraping was successful");
    return $.html();
  } catch (e) {
    console.log(`Unable to make the scraping request to the URL: ${url}`);
    console.log("Error:" + e);
  }
};

const runScraping = async () => {
  const data = await scrapeWebsite(priceGuides.EB01);
  console.log(data);
};

runScraping();
