"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (page, limit) => {
    return (page - 1) * limit;
};
exports.calculatePagination = calculatePagination;
