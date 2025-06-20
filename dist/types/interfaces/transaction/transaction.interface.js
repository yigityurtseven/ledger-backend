"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCategory = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["DEBT"] = "Debt";
    TransactionType["CREDIT"] = "Credit";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var TransactionCategory;
(function (TransactionCategory) {
    TransactionCategory["DOLLAR"] = "Dollar";
    TransactionCategory["EURO"] = "Euro";
    TransactionCategory["LIRA"] = "Lira";
    TransactionCategory["POUND"] = "Pound";
    TransactionCategory["GOLD22"] = "Gold22";
    TransactionCategory["GOLD24"] = "Gold24";
    TransactionCategory["GOLD14"] = "Gold14";
})(TransactionCategory || (exports.TransactionCategory = TransactionCategory = {}));
