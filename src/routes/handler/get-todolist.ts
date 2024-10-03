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
    if (data && data.toString().trim()) {
      const dataParse = JSON.parse(data.toString());
      return res.send(dataParse);
    } else {
      fs.writeFile(filePath, JSON.stringify([]), (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: err.message });
        }
        return res.send([]);
      });
    }
  });
};

export default get_todolist;
