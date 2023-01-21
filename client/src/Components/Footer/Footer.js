"use strict";
import React from "react";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
require("./Footer.css");
const react_1 = __importDefault(require("react"));
function Footer() {
    return (react_1.default.createElement("div", { id: 'footer-container' },
        react_1.default.createElement("p", { id: 'paragraph-footer' },
            react_1.default.createElement("span", null, "This page is done for easing the process of reading news"),
            react_1.default.createElement("span", null,
                "The project is ",
                react_1.default.createElement("a", { className: 'footer-highlight', href: 'https://github.com/TerenceGrover/HSTW' }, "open-source"),
                " . Any contribution is appreciated"),
            react_1.default.createElement("span", null, "For transparency concern, all calculations can be found in the Transparency page")),
        react_1.default.createElement("div", { id: 'link-container' },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/about', className: 'footer-link' }, "About the Page"),
            react_1.default.createElement(react_router_dom_1.Link, { to: '/transparency', className: 'footer-link' }, "Transparency")),
        react_1.default.createElement("div", { id: 'logo-container' },
            react_1.default.createElement("a", { className: 'logo-footer', href: "https://github.com/TerenceGrover/HSTW" },
                react_1.default.createElement("i", { className: "fa fa-github" })),
            react_1.default.createElement("a", { className: 'logo-footer', href: "https://www.linkedin.com/in/terence-grover-monaco/" },
                react_1.default.createElement("i", { className: "fa fa-linkedin-square" })))));
}
exports.default = Footer;
