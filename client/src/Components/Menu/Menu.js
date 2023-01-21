"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Menu.css");
//@ts-ignore
const Utility_1 = require("../../Util/Utility");
const react_1 = require("react");
const react_search_autocomplete_1 = require("react-search-autocomplete");
const react_2 = __importDefault(require("react"));
function Menu({ setMenu, userCountry, idx, setClicked, }) {
    // if (!userCountry) return;
    const imgURL = process.env.PUBLIC_URL + "/assets/32x32/";
    const arrItem = window.localStorage.getItem("arr") === null
        ? ""
        : window.localStorage.getItem("arr");
    const localArr = window.localStorage.getItem(arrItem);
    const [list, setList] = (0, react_1.useState)([]);
    const [deleteMode, setDeleteMode] = (0, react_1.useState)(false);
    const initialDisplayIndexesState = localArr === null && userCountry !== undefined
        ? [
            { name: "World", code: "world" },
            { name: userCountry.country_name, code: userCountry.country_code },
        ]
        // : [JSON.parse(localArr)] as ISO2[];
        : [JSON.parse(localArr || "")];
    const [displayedIndexes, setDisplayIndexes] = (0, react_1.useState)(initialDisplayIndexesState);
    const ISO2List = process.env.PUBLIC_URL + "/assets/ISO2.json";
    (0, react_1.useEffect)(() => {
        fetch(ISO2List)
            .then((res) => res.json())
            .then((codes) => {
            setList(codes);
        });
    }, []);
    function parse(index) {
        const temp = Number(index) * 10;
        return temp;
    }
    function storeToLocaleStorage(arrOfIdx) {
        const stringified = JSON.stringify(arrOfIdx);
        window.localStorage.setItem("arr", stringified);
    }
    function handleSubmit(e) {
        const tempArr = [...displayedIndexes];
        tempArr.push(e);
        storeToLocaleStorage(tempArr);
        setDisplayIndexes(tempArr);
    }
    function handleSelect(obj) {
        setMenu(false);
        setClicked(obj);
    }
    function handleDelete(country) {
        const tempArr = [...displayedIndexes];
        const newTemp = tempArr.filter((x) => x.name !== country.name);
        storeToLocaleStorage(newTemp);
        setDisplayIndexes(newTemp);
    }
    return (react_2.default.createElement("div", { id: "global-menu-container" },
        react_2.default.createElement("div", { id: "menu-container" },
            react_2.default.createElement("div", { id: "menu-content-container" },
                react_2.default.createElement("button", { id: "edit-countries", onClick: () => setDeleteMode((d) => !d) }, "Edit Countries"),
                displayedIndexes.map((display) => {
                    try {
                        return (react_2.default.createElement("button", { onClick: () => deleteMode
                                ? handleDelete({
                                    name: display.name,
                                    "Alpha-2": display.code,
                                })
                                : handleSelect({
                                    name: display.name,
                                    "Alpha-2": display.code,
                                }), key: display.code, className: "indicator-menu-container", id: deleteMode ? "delete" : "" },
                            react_2.default.createElement("div", { id: "menu-left-container" },
                                react_2.default.createElement("img", { className: "flag-menu", src: imgURL + display.code.toLowerCase() + ".png", width: 15, height: 15 }),
                                react_2.default.createElement("span", { className: "indicator-menu" },
                                    display.name,
                                    " index :")),
                            react_2.default.createElement("span", { className: "indicator-menu menu-index", style: {
                                    backgroundColor: (0, Utility_1.generateColor)(idx[display.code]),
                                } }, parse(idx[display.code].global))));
                    }
                    catch (_a) {
                        return (react_2.default.createElement("button", { onClick: () => deleteMode
                                ? handleDelete({
                                    name: display.name,
                                    "Alpha-2": display.code,
                                })
                                : handleSelect({
                                    name: display.name,
                                    "Alpha-2": display.code,
                                }), key: display.code, className: "indicator-menu-container", id: deleteMode ? "delete" : "" },
                            react_2.default.createElement("span", { className: "indicator-menu" },
                                display.name,
                                " index :",
                                " "),
                            react_2.default.createElement("span", { className: "indicator-menu menu-index", style: { backgroundColor: (0, Utility_1.generateColor)(undefined) } }, "N/A")));
                    }
                }),
                react_2.default.createElement("hr", { style: { width: "100%", marginTop: "15px" } }),
                react_2.default.createElement("div", { id: "buttons-menu" },
                    react_2.default.createElement("div", { id: "search-bar-styler" },
                        react_2.default.createElement(react_search_autocomplete_1.ReactSearchAutocomplete, { placeholder: "Add a Country", key: "auto-complete", items: list, onSelect: handleSubmit }))),
                react_2.default.createElement("div", { id: "connect-buttons" },
                    react_2.default.createElement("a", { className: "logo-footer", href: "https://github.com/TerenceGrover/HSTW" },
                        react_2.default.createElement("i", { className: "fa fa-github" })),
                    react_2.default.createElement("a", { className: "logo-footer", href: "https://www.linkedin.com/in/terence-grover-monaco/" },
                        react_2.default.createElement("i", { className: "fa fa-linkedin-square" }))))),
        react_2.default.createElement("div", { id: "modal-back", onClick: () => setMenu((m) => !m) })));
}
exports.default = Menu;
