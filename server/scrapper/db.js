import fs from "fs";

export const readDB = (db) => {
  let rawdata = fs.readFileSync(db);
  return JSON.parse(rawdata);
};

export const writeDB = (db, data) => {
  let raw = JSON.stringify(data, null, 2);
  fs.writeFileSync(db, raw);
};
