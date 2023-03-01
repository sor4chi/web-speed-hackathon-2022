/* eslint-disable sort/object-properties */
const FILE_DIR = __dirname;
const fs = require("fs");
const path = require("path");

const TOP_JSON = path.join(FILE_DIR, "top.json");
const TABLE_JSON = path.join(FILE_DIR, "race-card.json");
const ODDS1_JSON = path.join(FILE_DIR, "odds1.json");
const ODDS2_JSON = path.join(FILE_DIR, "odds2.json");
const RESULT_JSON = path.join(FILE_DIR, "result.json");

const getScore = (data) => {
  const FCP = data["audits"]["first-contentful-paint"]["score"];
  const SI = data["audits"]["speed-index"]["score"];
  const LCP = data["audits"]["largest-contentful-paint"]["score"];
  const TTI = data["audits"]["interactive"]["score"];
  const TBT = data["audits"]["total-blocking-time"]["score"];
  const CLS = data["audits"]["cumulative-layout-shift"]["score"];
  return { CLS, FCP, LCP, SI, TBT, TTI };
};

const calcScore = (FCP, SI, LCP, TTI, TBT, CLS) => {
  const score = FCP * 10 + SI * 10 + LCP * 25 + TTI * 10 + TBT * 30 + CLS * 15;
  return score;
};

const top = JSON.parse(fs.readFileSync(TOP_JSON));
const table = JSON.parse(fs.readFileSync(TABLE_JSON));
const odds1 = JSON.parse(fs.readFileSync(ODDS1_JSON));
const odds2 = JSON.parse(fs.readFileSync(ODDS2_JSON));
const result = JSON.parse(fs.readFileSync(RESULT_JSON));
const all = {
  top,
  table,
  odds1,
  odds2,
  result,
};

console.log("| title | FCP | SI | LCP | TTI | TBT | CLS | score |");
console.log("| --- | --- | --- | --- | --- | --- | --- | --- |");
const AVGS = new Array(7).fill(0);
for (const [page, data] of Object.entries(all)) {
  const { CLS, FCP, LCP, SI, TBT, TTI } = getScore(data);
  const score = calcScore(FCP, SI, LCP, TTI, TBT, CLS);
  AVGS[0] += FCP;
  AVGS[1] += SI;
  AVGS[2] += LCP;
  AVGS[3] += TTI;
  AVGS[4] += TBT;
  AVGS[5] += CLS;
  AVGS[6] += score;
  console.log(
    `| ${page} | ${FCP} | ${SI} | ${LCP} | ${TTI} | ${TBT} | ${CLS} | ${score} |`,
  );
}

console.log(
  `| **avg** | ${AVGS[0] / 5} | ${AVGS[1] / 5} | ${AVGS[2] / 5} | ${
    AVGS[3] / 5
  } | ${AVGS[4] / 5} | ${AVGS[5] / 5} | ${AVGS[6] / 5} |`,
);

console.log(
  `| **total** | ${AVGS[0]} | ${AVGS[1]} | ${AVGS[2]} | ${AVGS[3]} | ${AVGS[4]} | ${AVGS[5]} | ${AVGS[6]} |`,
);
