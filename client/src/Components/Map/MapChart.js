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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./Map.css");
const react_globe_gl_1 = __importDefault(require("react-globe.gl"));
const requests_1 = require("../../Util/requests");
//@ts-ignore
const Utility_1 = require("../../Util/Utility");
const geoUrl = process.env.PUBLIC_URL + '/assets/Topology.json';
function MapChart({ clickSet, mobile, innerWidth }) {
    const globeEl = (0, react_1.useRef)();
    const [idx, setIdx] = (0, react_1.useState)(false);
    const [countries, setCountries] = (0, react_1.useState)({ features: [] });
    const [hoverD, setHoverD] = (0, react_1.useState)();
    const [clickD, setClickD] = (0, react_1.useState)();
    // This function will check the position of the cursor on hover
    (0, react_1.useEffect)(() => {
        const today = new Date();
        (0, requests_1.getDateSpecificGlobalIdx)((0, Utility_1.parseDate)(today), setIdx);
        // load data
        fetch(geoUrl).then(res => res.json())
            .then(countries => {
            setCountries(countries);
        });
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.3;
        globeEl.current.pointOfView({ altitude: 2 }, 3000);
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null, mobile
        ?
            react_1.default.createElement("div", { id: "mobile-container" },
                react_1.default.createElement(react_globe_gl_1.default, { ref: globeEl, height: 500, width: innerWidth - 24, globeImageUrl: "//unpkg.com/three-globe/example/img/earth-dark.jpg", backgroundImageUrl: "//unpkg.com/three-globe/example/img/night-sky.png", polygonsData: countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'), polygonSideColor: d => d === hoverD ? 'steelblue' : (0, Utility_1.generateColor)(idx[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 0.15), polygonCapColor: d => (0, Utility_1.generateColor)(idx[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 1, d === clickD ? 'click' : undefined), onPolygonClick: d => {
                        clickSet({ name: d.properties.NAME, 'Alpha-2': d.properties.ISO_A2 });
                        setClickD(d);
                    }, polygonStrokeColor: () => '#111', polygonLabel: ({ properties: d }) => `${d.ADMIN} | ${d.ISO_A2}`, polygonAltitude: 0.04, polygonsTransitionDuration: 1000 }))
        :
            react_1.default.createElement("div", { id: "map-container" },
                react_1.default.createElement(react_globe_gl_1.default, { ref: globeEl, height: window.innerHeight / 1.5, width: window.innerWidth - 40, globeImageUrl: "//unpkg.com/three-globe/example/img/earth-dark.jpg", backgroundImageUrl: "//unpkg.com/three-globe/example/img/night-sky.png", polygonsData: countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'), polygonSideColor: d => d === hoverD ? 'steelblue' : (0, Utility_1.generateColor)(idx[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 0.15), polygonCapColor: d => (0, Utility_1.generateColor)(idx[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 1, d === hoverD ? 'hover' : d === clickD ? 'click' : undefined), onPolygonHover: setHoverD, onPolygonClick: d => {
                        clickSet({ name: d.properties.NAME, 'Alpha-2': d.properties.ISO_A2 });
                        setClickD(d);
                    }, polygonStrokeColor: () => '#111', polygonAltitude: 0.07, polygonLabel: ({ properties: d }) => `${d.ADMIN} | ${d.ISO_A2}` }))));
}
exports.default = MapChart;
