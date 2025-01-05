import * as cheerio from "cheerio";

/**
 * Get the text of some HTML.
 */
export const formatHtml = (html: string): string => {
  const $ = cheerio.load(html);
  return $("p").text();
};
