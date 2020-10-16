const axios = require("axios").default;
const fs = require("fs-extra");

async function main() {
  const res = await axios.get(
    "https://raw.githubusercontent.com/HypixelDev/PublicAPI/master/Documentation/misc/GameType.md"
  );
  /**
   * @type {string}
   */
  let str = res.data;
  str = str.split("\n");
  str = str.slice(3);
  str = str.reverse();
  str = str.splice(9);
  str = str.reverse();
  //str = str.join("\n");
  //console.log(str);
  const ids = [];
  str.forEach((string) => {
    const id = string.split("|")[1].trim();
    const typeName = string.split("|")[2].trim();
    const databaseName = string.split("|")[3].trim();
    const cleanName = string.split("|")[4].trim();
    ids.push({ id, typeName, databaseName, cleanName });
  });
  console.log(ids);
  await fs.writeJSON("./gameids.json", ids);
  console.log(`Wrote to gameids.json`);
}

main();
