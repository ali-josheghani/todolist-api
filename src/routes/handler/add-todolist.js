"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const joi_1 = __importDefault(require("joi"));
const path_1 = __importDefault(require("path"));
const schema = joi_1.default.object({
    title: joi_1.default.string().min(3).required(),
    description: joi_1.default.string().min(10).required(),
});
const add_todolist = (req, res) => {
    const body = req.body;
    const { error } = schema.validate(body);
    const filePath = path_1.default.resolve(__dirname, "../../constant/todolist.json");
    if (error && error.message) {
        res.status(500).send({ message: error.message });
        return;
    }
    else {
        fs_1.default.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err.message);
            }
            const dataParse = JSON.parse(data.toString());
            const result = Object.assign({ id: dataParse.length + 1 }, body);
            dataParse.push(result);
            fs_1.default.writeFile(filePath, JSON.stringify(dataParse), (err) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).send({ message: "internal server error" });
                }
                return res.send({ message: "todo list added successfully!" });
            });
        });
    }
};
exports.default = add_todolist;
