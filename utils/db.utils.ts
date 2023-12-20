const mysql = require("mysql");

export type ConnectionObject = {
  host: string;
  user: string;
  password: string;
  database: string;
};

export function testConnection(connectionObj: ConnectionObject) {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection(connectionObj);

    con.connect(function (err: any) {
      if (err) return reject(err)
      resolve("Connected!");
    });
  });
}
