"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Graph.css");
const react_1 = require("react");
require("chart.js/auto");
const react_chartjs_2_1 = require("react-chartjs-2");
const requests_1 = require("../../Util/requests");
const react_2 = __importDefault(require("react"));
function Graph({ clicked, mobile }) {
    const [data, setData] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        (0, requests_1.getCountrySpecificPastData)(clicked['Alpha-2'], 4, setData);
    }, [clicked]);
    return (react_2.default.createElement("div", { id: 'graph-container' },
        react_2.default.createElement("h3", { id: 'graph-header' }, "Data Analysis of the previous week"),
        data
            ? react_2.default.createElement(react_chartjs_2_1.Line, { data: data, width: mobile ? 250 : 800, height: mobile ? 200 : 800 })
            : react_2.default.createElement("h3", { id: 'graph-header', style: { 'padding': '150px 0 150px 0' } }, "No data for this country")));
}
exports.default = Graph;
;
