// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NEXT_JSON } from "../../utils/general.utils";
const { exec } = require("child_process");
const fs = require("fs");
const prettier = require("prettier");
const JSON_GENERATOR_FOLDER_NAME = "json-generator";
const os = require("os");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    let NEXT_JSON_DATA: NEXT_JSON = req.body.json;
    let project_path =getPlatformPath(req.body.path);

    if (NEXT_JSON_DATA) {
      //generate the json file
      fs.writeFile(
        `${project_path}/next-gen.json`,
        JSON.stringify(NEXT_JSON_DATA),
        (err: any) => {
          if (err) {
            return console.log(err);
          }
          generateProject(project_path);
          waitForResponse(res);
        }
      );
    }
  } else if (req.method == "GET") {
    const currentWorkingDirectory = process.cwd();

    res.status(200).json({
      projectPath: currentWorkingDirectory.split(JSON_GENERATOR_FOLDER_NAME)[0],
    });
  }

  function waitForResponse(res: NextApiResponse) {
    setTimeout(
      () => {
        res
          .status(200)
          .json({ name: "Project Generated. Access it through port 3000" });
      },
      1000 * 60 * 1
    ); //TODO: Find a way to tell when process finishes
  }

  function generateProject(path: string) {
    exec(
      "next-gen generate",
      { cwd: path },
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  }
}

function getPlatformPath(path: string) {
  if (os.platform() === "win32") {
    return path.replace(/\//g, "\\");
  } else {
    return path;
  }
}
