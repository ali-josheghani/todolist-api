"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const delete_todolist = (req, res) => {
    const filePath = path_1.default.resolve(__dirname, "../../constant/todolist.json");
    const params = req.params;
    const id = params.id;
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send({ message: err.message });
        }
        const dataParse = JSON.parse(data.toString());
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
        fs_1.default.writeFile(filePath, JSON.stringify(dataParse), (err) => {
            if (err) {
                console.log(err.message);
                return res.status(500).send({ message: err.message });
            }
            return res.send({ message: "remove todo successfully" });
        });
    });
};
exports.default = delete_todolist;
