import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const delete_todolist = (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, "../../constant/todolist.json");
  const params: { id?: string } = req.params;
  const id = params.id;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }

    const dataParse: todolistType[] = JSON.parse(data.toString());

    if (dataParse.length === 0) {
      return res
        .status(403)
        .send({ message: "Data is empty, please add a todo" });
    }

    const todoIsFind = dataParse.find((todo) => todo.id === Number(id));

    const todoIndex = dataParse.findIndex((todo) => todo.id === Number(id));

    if (!todoIsFind) {
      return res.status(404).send({ message: "todo not found" });
    }

    dataParse.splice(todoIndex, 1);

    fs.writeFile(filePath, JSON.stringify(dataParse), (err) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
      }
      return res.send({ message: "remove todo successfully" });
    });
  });
};

export default delete_todolist;
