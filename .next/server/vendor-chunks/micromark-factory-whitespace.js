"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-factory-whitespace";
exports.ids = ["vendor-chunks/micromark-factory-whitespace"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-factory-whitespace/dev/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/micromark-factory-whitespace/dev/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   factoryWhitespace: () => (/* binding */ factoryWhitespace)\n/* harmony export */ });\n/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-factory-space */ \"(ssr)/./node_modules/micromark-factory-space/dev/index.js\");\n/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-character */ \"(ssr)/./node_modules/micromark-util-character/dev/index.js\");\n/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ \"(ssr)/./node_modules/micromark-util-symbol/types.js\");\n/**\n * @typedef {import('micromark-util-types').Effects} Effects\n * @typedef {import('micromark-util-types').State} State\n */\n\n\n\n\n\n/**\n * Parse spaces and tabs.\n *\n * There is no `nok` parameter:\n *\n * *   line endings or spaces in markdown are often optional, in which case this\n *     factory can be used and `ok` will be switched to whether spaces were found\n *     or not\n * *   one line ending or space can be detected with\n *     `markdownLineEndingOrSpace(code)` right before using `factoryWhitespace`\n *\n * @param {Effects} effects\n *   Context.\n * @param {State} ok\n *   State switched to when successful.\n * @returns\n *   Start state.\n */\nfunction factoryWhitespace(effects, ok) {\n  /** @type {boolean} */\n  let seen\n\n  return start\n\n  /** @type {State} */\n  function start(code) {\n    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownLineEnding)(code)) {\n      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)\n      effects.consume(code)\n      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)\n      seen = true\n      return start\n    }\n\n    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownSpace)(code)) {\n      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__.factorySpace)(\n        effects,\n        start,\n        seen ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineSuffix\n      )(code)\n    }\n\n    return ok(code)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLWZhY3Rvcnktd2hpdGVzcGFjZS9kZXYvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0EsYUFBYSx3Q0FBd0M7QUFDckQsYUFBYSxzQ0FBc0M7QUFDbkQ7O0FBRW9EO0FBQ3NCO0FBQ3RCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxhQUFhLFNBQVM7QUFDdEI7O0FBRUE7O0FBRUEsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsUUFBUSw0RUFBa0I7QUFDMUIsb0JBQW9CLGlFQUFLO0FBQ3pCO0FBQ0EsbUJBQW1CLGlFQUFLO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHVFQUFhO0FBQ3JCLGFBQWEscUVBQVk7QUFDekI7QUFDQTtBQUNBLGVBQWUsaUVBQUssY0FBYyxpRUFBSztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taWNyb21hcmstZmFjdG9yeS13aGl0ZXNwYWNlL2Rldi9pbmRleC5qcz9lNDQ0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWljcm9tYXJrLXV0aWwtdHlwZXMnKS5FZmZlY3RzfSBFZmZlY3RzXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLlN0YXRlfSBTdGF0ZVxuICovXG5cbmltcG9ydCB7ZmFjdG9yeVNwYWNlfSBmcm9tICdtaWNyb21hcmstZmFjdG9yeS1zcGFjZSdcbmltcG9ydCB7bWFya2Rvd25MaW5lRW5kaW5nLCBtYXJrZG93blNwYWNlfSBmcm9tICdtaWNyb21hcmstdXRpbC1jaGFyYWN0ZXInXG5pbXBvcnQge3R5cGVzfSBmcm9tICdtaWNyb21hcmstdXRpbC1zeW1ib2wvdHlwZXMuanMnXG5cbi8qKlxuICogUGFyc2Ugc3BhY2VzIGFuZCB0YWJzLlxuICpcbiAqIFRoZXJlIGlzIG5vIGBub2tgIHBhcmFtZXRlcjpcbiAqXG4gKiAqICAgbGluZSBlbmRpbmdzIG9yIHNwYWNlcyBpbiBtYXJrZG93biBhcmUgb2Z0ZW4gb3B0aW9uYWwsIGluIHdoaWNoIGNhc2UgdGhpc1xuICogICAgIGZhY3RvcnkgY2FuIGJlIHVzZWQgYW5kIGBva2Agd2lsbCBiZSBzd2l0Y2hlZCB0byB3aGV0aGVyIHNwYWNlcyB3ZXJlIGZvdW5kXG4gKiAgICAgb3Igbm90XG4gKiAqICAgb25lIGxpbmUgZW5kaW5nIG9yIHNwYWNlIGNhbiBiZSBkZXRlY3RlZCB3aXRoXG4gKiAgICAgYG1hcmtkb3duTGluZUVuZGluZ09yU3BhY2UoY29kZSlgIHJpZ2h0IGJlZm9yZSB1c2luZyBgZmFjdG9yeVdoaXRlc3BhY2VgXG4gKlxuICogQHBhcmFtIHtFZmZlY3RzfSBlZmZlY3RzXG4gKiAgIENvbnRleHQuXG4gKiBAcGFyYW0ge1N0YXRlfSBva1xuICogICBTdGF0ZSBzd2l0Y2hlZCB0byB3aGVuIHN1Y2Nlc3NmdWwuXG4gKiBAcmV0dXJuc1xuICogICBTdGFydCBzdGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhY3RvcnlXaGl0ZXNwYWNlKGVmZmVjdHMsIG9rKSB7XG4gIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgbGV0IHNlZW5cblxuICByZXR1cm4gc3RhcnRcblxuICAvKiogQHR5cGUge1N0YXRlfSAqL1xuICBmdW5jdGlvbiBzdGFydChjb2RlKSB7XG4gICAgaWYgKG1hcmtkb3duTGluZUVuZGluZyhjb2RlKSkge1xuICAgICAgZWZmZWN0cy5lbnRlcih0eXBlcy5saW5lRW5kaW5nKVxuICAgICAgZWZmZWN0cy5jb25zdW1lKGNvZGUpXG4gICAgICBlZmZlY3RzLmV4aXQodHlwZXMubGluZUVuZGluZylcbiAgICAgIHNlZW4gPSB0cnVlXG4gICAgICByZXR1cm4gc3RhcnRcbiAgICB9XG5cbiAgICBpZiAobWFya2Rvd25TcGFjZShjb2RlKSkge1xuICAgICAgcmV0dXJuIGZhY3RvcnlTcGFjZShcbiAgICAgICAgZWZmZWN0cyxcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHNlZW4gPyB0eXBlcy5saW5lUHJlZml4IDogdHlwZXMubGluZVN1ZmZpeFxuICAgICAgKShjb2RlKVxuICAgIH1cblxuICAgIHJldHVybiBvayhjb2RlKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-factory-whitespace/dev/index.js\n");

/***/ })

};
;