"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Navbar.css");
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importDefault(require("react"));
function Navbar({ mobile, setMenu }) {
    return (react_1.default.createElement("div", { id: "nav-top-container" }, mobile ? (react_1.default.createElement("div", { id: "navbar-container-mobile" },
        react_1.default.createElement("button", { title: "toggle-menu-variable", id: "ham-menu", onClick: () => setMenu((m) => !m) },
            react_1.default.createElement("i", { className: "fa fa-solid fa-bars" })),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/", id: "mobile-header", className: "navbar-header" },
            "How's The World ",
            react_1.default.createElement("span", { id: "io" }, ".io")),
        react_1.default.createElement("div", { style: { width: "30px" } }))) : (react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "navbar-header" },
        "How's The World ",
        react_1.default.createElement("span", { id: "io" }, ".io")))));
}
exports.default = Navbar;
