"use strict";
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
exports.getCountrySpecificPastData = exports.getUserCountry = exports.getWorldPop = exports.getCountryDetails = exports.getWorldToday = exports.getDateSpecificGlobalIdx = exports.getDateSpecificIndividualIdx = exports.getDateSpecificIndividualData = exports.getDateSpecificGlobalData = exports.getTodayIndividualData = void 0;
const url = 'https://hstwdrop.co';
// IMPORITNG THE SETTER FUNCTION AS AN ARGUMENT ALLOWS US
// TO SKIP AN AWAIT ALL TOGETHER
// export async function getIdx (setter) {
//   fetch(url)
//   .then(response => response.text())
//   .then(data => setter(data))
// }
function getTodayIndividualData(alphaCode, setter) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${url}/today?code=${alphaCode}`)
            .then((response) => response.json())
            .then((data) => {
            console.log("RETURNED DATA", Object.values(data)[0]);
            setter(Object.values(data)[0]);
        })
            .catch((err) => err);
    });
}
exports.getTodayIndividualData = getTodayIndividualData;
function getDateSpecificGlobalData(date, setter) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${url}/request?date=${date}`)
            .then((response) => response.json())
            .then((data) => setter(Object.values(data)))
            .catch((err) => err);
    });
}
exports.getDateSpecificGlobalData = getDateSpecificGlobalData;
function getDateSpecificIndividualData(alphaCode, date, setter) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${url}/request?code=${alphaCode}&date=${date}`)
            .then((response) => response.json())
            .then((data) => JSON.parse(data))
            .catch((err) => err);
    });
}
exports.getDateSpecificIndividualData = getDateSpecificIndividualData;
function getDateSpecificIndividualIdx(alphaCode, date, setter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return fetch(`${url}/idx?code=${alphaCode}&date=${date}`)
                .then((response) => response.json())
                .then((data) => setter(Object.values(data)[0]))
                .catch((err) => err);
        }
        catch (_a) {
            return 'No Data for Today';
        }
    });
}
exports.getDateSpecificIndividualIdx = getDateSpecificIndividualIdx;
function getDateSpecificGlobalIdx(date, setter) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${url}/idx?date=${date}`)
            .then((response) => response.json())
            .then((data) => setter(Object.values(data)[0]))
            .catch((err) => err);
    });
}
exports.getDateSpecificGlobalIdx = getDateSpecificGlobalIdx;
function getWorldToday(setter) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${url}/today?code=world`)
            .then((response) => response.json())
            .then((data) => setter(data))
            .catch((err) => err);
    });
}
exports.getWorldToday = getWorldToday;
function getCountryDetails(alphaCode) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`https://restcountries.com/v3.1/alpha/${alphaCode}?fields=name,flag,capital,currencies,languages,region,capital,demonyms`)
            .then((response) => response.json())
            .catch((err) => err);
    });
}
exports.getCountryDetails = getCountryDetails;
function getWorldPop() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch('http://api.worldbank.org/v2/population/SP.POP.TOTL/WLD?format=json')
            .then((response) => response.json())
            .then((data) => JSON.parse(data))
            .catch((err) => err);
    });
}
exports.getWorldPop = getWorldPop;
function getUserCountry(setter) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch('https://ipapi.co/json/')
            .then((response) => response.json())
            .then((data) => setter({ country_name: data.country_name, country_code: data.country_code }));
    });
}
exports.getUserCountry = getUserCountry;
function getCountrySpecificPastData(country, days, setter) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${url}/past?code=${country}&days=${days}`)
            .then((response) => response.json())
            .then(data => {
            data = data.reverse();
            console.log(data);
            const chartData = {
                labels: data.map((item) => item.date),
                datasets: [
                    {
                        label: "Happiness Index",
                        data: data.map((item) => item.data.global * 10),
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                    },
                ],
            };
            setter(chartData);
        })
            .catch(() => setter(undefined));
    });
}
exports.getCountrySpecificPastData = getCountrySpecificPastData;
