"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./Individual.css");
const requests_1 = require("../../Util/requests");
//@ts-ignore
const Utility_1 = require("../../Util/Utility");
function Individual({ clicked, scrollFunc = () => { }, mobile }) {
    const [country, setCountry] = (0, react_1.useState)();
    const [topics, setTopics] = (0, react_1.useState)();
    const [headlines, setHeadlines] = (0, react_1.useState)();
    const [countryData, setCountryData] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const arrOfTopics = [];
        let arrOfHL = [];
        if (countryData && countryData.topics) {
            countryData.topics.forEach((topic) => {
                if (/[a-zA-Z0-9]/.test(topic[0])) {
                    arrOfTopics.push(`${topic[0]} [${topic[1]}]`);
                }
                arrOfHL = countryData.HL;
            });
        }
        setTopics(arrOfTopics);
        setHeadlines(arrOfHL);
    }, [countryData]);
    (0, react_1.useEffect)(() => {
        if (clicked['Alpha-2']) {
            fetchCountry();
            (0, requests_1.getTodayIndividualData)(clicked['Alpha-2'], setCountryData);
            if (clicked['Alpha-2'] !== 'world') {
                scrollFunc();
            }
        }
    }, [clicked]);
    function fetchCountry() {
        return __awaiter(this, void 0, void 0, function* () {
            if (clicked['Alpha-2'] !== 'world') {
                (0, requests_1.getCountryDetails)(clicked['Alpha-2']).then((response) => {
                    setCountry(response);
                });
            }
            else {
                setCountry({
                    flag: '🇺🇳',
                    name: { official: 'The World' },
                    currencies: [{ name: 'Various' }],
                    languages: ['Various'],
                    region: 'None',
                    demonyms: { eng: { m: 'Beings' } },
                    capital: 'Unknown',
                });
            }
        });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, country && country.name && countryData ? (react_1.default.createElement("div", { id: "indiv-container" },
        react_1.default.createElement("div", { id: "indiv-left-container", className: "floaty-container" },
            react_1.default.createElement("div", { id: "flag-name-container" },
                react_1.default.createElement("span", { id: "indiv-flag" }, country.flag),
                react_1.default.createElement("span", { id: "indiv-name" }, country.name.official)),
            react_1.default.createElement("div", { id: "country-properties" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", { id: "prop-name" }, "Currency"),
                    " :",
                    ' ',
                    Object.values(country.currencies)[0]['name']),
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", { id: "prop-name" }, "Languages"),
                    " :",
                    ' ',
                    Object.values(country.languages).join(', ')),
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", { id: "prop-name" }, "Continent"),
                    " : ",
                    country.region),
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", { id: "prop-name" }, "Demonym"),
                    " :",
                    ' ',
                    country.demonyms['eng']['m']),
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", { id: "prop-name" }, "Capital"),
                    " : ",
                    country.capital))),
        react_1.default.createElement("div", { id: "indiv-right-container" },
            react_1.default.createElement("div", { id: "indiv-right-top", className: "floaty-container", style: { backgroundColor: (0, Utility_1.generateColor)(countryData.idx) } },
                react_1.default.createElement("div", { id: "index-display" }, mobile ? (react_1.default.createElement("span", { id: "index-title-mobile" },
                    country.name.official,
                    "'s happiness :",
                    countryData.idx
                        ? parseInt((countryData.idx.global * 10).toString())
                        : 'Unknown')) : (react_1.default.createElement("span", { id: "index-title" },
                    "Today, ",
                    country.name.official,
                    " has a happiness score of :",
                    countryData.idx
                        ? Math.floor(countryData.idx.global * 10)
                        : 'Unknown')))),
            react_1.default.createElement("div", { id: "indiv-right-bottom", className: "floaty-container" }, countryData ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { id: "indiv-main-topics-container" },
                    mobile ? (react_1.default.createElement("span", { className: "header-bottom" }, "Most used word there :")) : (react_1.default.createElement("span", { className: "header-bottom" }, "Most used word in this country :")),
                    react_1.default.createElement("div", { id: "indiv-main-topics", className: "indiv-list" }, (topics === null || topics === void 0 ? void 0 : topics.length) ? (react_1.default.createElement("span", null, topics.join(' - '))) : (react_1.default.createElement("span", null, "No Data")))),
                react_1.default.createElement("div", { id: "indiv-headlines-container", className: "indiv-list" },
                    mobile ? (react_1.default.createElement("span", { className: "header-bottom" }, "What the news look like :")) : (react_1.default.createElement("span", { className: "header-bottom" }, "What the news look like over there :")),
                    react_1.default.createElement("ul", { id: "indiv-headlines" }, headlines ? (headlines
                        .slice(0, 5)
                        .map((Headline) => react_1.default.createElement("li", { key: Headline }, Headline))) : (react_1.default.createElement("span", null, "No Data")))))) : (''))))) : ('')));
}
exports.default = Individual;
