"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.listen(PORT, () => {
    return console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map