import { Request, Response } from "express";
import fs from "fs";
import Joi from "joi";
import path from "path";

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
});

const add_todolist = (req: Request, res: Response) => {
  const body = req.body;
  const { error } = schema.validate(body);
  const filePath = path.resolve(__dirname, "../../constant/todolist.json");

  if (error && error.message) {
    res.status(500).send({ message: error.message });
    return;
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err.message);
      }
      const dataParse = JSON.parse(data.toString());
      const result = { id: dataParse.length + 1, ...body };
      dataParse.push(result);
      fs.writeFile(filePath, JSON.stringify(dataParse), (err) => {
        if (err) {
          console.log(err.message);
          return res.status(500).send({ message: "internal server error" });
        }
        return res.send({ message: "todo list added successfully!" });
      });
    });
  }
};

export default add_todolist;
