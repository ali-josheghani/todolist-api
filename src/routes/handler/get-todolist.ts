import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const get_todolist = (req: Request, res: Response) => {
  // for get path from the root of the project
  const filePath = path.resolve(__dirname, "../../constant/todolist.json");
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err.message);
    }
    if (data) {
      const dataParse = JSON.parse(data.toString());
      res.send(dataParse);
    } else {
      res.send("No data");
    }
  });
};

export default get_todolist;
