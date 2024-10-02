"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const get_todolist = (req, res) => {
    // for get path from the root of the project
    const filePath = path_1.default.resolve(__dirname, "../../constant/todolist.json");
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err.message);
        }
        if (data) {
            const dataParse = JSON.parse(data.toString());
            res.send(dataParse);
        }
        else {
            res.send("No data");
        }
    });
};
exports.default = get_todolist;
