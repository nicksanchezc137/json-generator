// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ConnectionObject, testConnection } from "../../utils/db.utils";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    let connectionObj: ConnectionObject = req.body;

    if (connectionObj) {
      testConnection(connectionObj)
        .then(() => {
          res.status(200).json({ name: "Connection Successful" });
        })
        .catch((err) => {
          res.status(422).json({ name: "Connection Failed" });
        });
    }
  }
}
