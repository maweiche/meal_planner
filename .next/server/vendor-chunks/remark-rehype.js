"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remark-rehype";
exports.ids = ["vendor-chunks/remark-rehype"];
exports.modules = {

/***/ "(ssr)/./node_modules/remark-rehype/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/remark-rehype/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mdast_util_to_hast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-to-hast */ \"(ssr)/./node_modules/mdast-util-to-hast/lib/index.js\");\n/**\n * @typedef {import('hast').Root} HastRoot\n * @typedef {import('mdast').Root} MdastRoot\n * @typedef {import('mdast-util-to-hast').Options} Options\n * @typedef {import('unified').Processor<any, any, any, any>} Processor\n *\n * @typedef {import('mdast-util-to-hast')} DoNotTouchAsThisImportIncludesRawInTree\n */\n\n\n\n// Note: the `<MdastRoot, HastRoot>` overload doesn’t seem to work :'(\n\n/**\n * Plugin that turns markdown into HTML to support rehype.\n *\n * *   If a destination processor is given, that processor runs with a new HTML\n *     (hast) tree (bridge-mode).\n *     As the given processor runs with a hast tree, and rehype plugins support\n *     hast, that means rehype plugins can be used with the given processor.\n *     The hast tree is discarded in the end.\n *     It’s highly unlikely that you want to do this.\n * *   The common case is to not pass a destination processor, in which case the\n *     current processor continues running with a new HTML (hast) tree\n *     (mutate-mode).\n *     As the current processor continues with a hast tree, and rehype plugins\n *     support hast, that means rehype plugins can be used after\n *     `remark-rehype`.\n *     It’s likely that this is what you want to do.\n *\n * @param destination\n *   Optional unified processor.\n * @param options\n *   Options passed to `mdast-util-to-hast`.\n */\nconst remarkRehype =\n  /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */\n  (\n    function (destination, options) {\n      return destination && 'run' in destination\n        ? bridge(destination, options)\n        : mutate(destination || options)\n    }\n  )\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (remarkRehype);\n\n/**\n * Bridge-mode.\n * Runs the destination with the new hast tree.\n *\n * @type {import('unified').Plugin<[Processor, Options?], MdastRoot>}\n */\nfunction bridge(destination, options) {\n  return (node, file, next) => {\n    destination.run((0,mdast_util_to_hast__WEBPACK_IMPORTED_MODULE_0__.toHast)(node, options), file, (error) => {\n      next(error)\n    })\n  }\n}\n\n/**\n * Mutate-mode.\n * Further plugins run on the hast tree.\n *\n * @type {import('unified').Plugin<[Options?]|void[], MdastRoot, HastRoot>}\n */\nfunction mutate(options) {\n  // @ts-expect-error: assume a corresponding node is returned by `toHast`.\n  return (node) => (0,mdast_util_to_hast__WEBPACK_IMPORTED_MODULE_0__.toHast)(node, options)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVtYXJrLXJlaHlwZS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsc0NBQXNDO0FBQ25ELGFBQWEsaURBQWlEO0FBQzlEO0FBQ0EsYUFBYSw4QkFBOEI7QUFDM0M7O0FBRXlDOztBQUV6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzR0FBc0c7QUFDbkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsWUFBWTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBEQUFNO0FBQzFCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDBEQUFNO0FBQ3pCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlbWFyay1yZWh5cGUvbGliL2luZGV4LmpzP2U4MmIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuUm9vdH0gSGFzdFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuUm9vdH0gTWRhc3RSb290XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLXRvLWhhc3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCd1bmlmaWVkJykuUHJvY2Vzc29yPGFueSwgYW55LCBhbnksIGFueT59IFByb2Nlc3NvclxuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8taGFzdCcpfSBEb05vdFRvdWNoQXNUaGlzSW1wb3J0SW5jbHVkZXNSYXdJblRyZWVcbiAqL1xuXG5pbXBvcnQge3RvSGFzdH0gZnJvbSAnbWRhc3QtdXRpbC10by1oYXN0J1xuXG4vLyBOb3RlOiB0aGUgYDxNZGFzdFJvb3QsIEhhc3RSb290PmAgb3ZlcmxvYWQgZG9lc27igJl0IHNlZW0gdG8gd29yayA6JyhcblxuLyoqXG4gKiBQbHVnaW4gdGhhdCB0dXJucyBtYXJrZG93biBpbnRvIEhUTUwgdG8gc3VwcG9ydCByZWh5cGUuXG4gKlxuICogKiAgIElmIGEgZGVzdGluYXRpb24gcHJvY2Vzc29yIGlzIGdpdmVuLCB0aGF0IHByb2Nlc3NvciBydW5zIHdpdGggYSBuZXcgSFRNTFxuICogICAgIChoYXN0KSB0cmVlIChicmlkZ2UtbW9kZSkuXG4gKiAgICAgQXMgdGhlIGdpdmVuIHByb2Nlc3NvciBydW5zIHdpdGggYSBoYXN0IHRyZWUsIGFuZCByZWh5cGUgcGx1Z2lucyBzdXBwb3J0XG4gKiAgICAgaGFzdCwgdGhhdCBtZWFucyByZWh5cGUgcGx1Z2lucyBjYW4gYmUgdXNlZCB3aXRoIHRoZSBnaXZlbiBwcm9jZXNzb3IuXG4gKiAgICAgVGhlIGhhc3QgdHJlZSBpcyBkaXNjYXJkZWQgaW4gdGhlIGVuZC5cbiAqICAgICBJdOKAmXMgaGlnaGx5IHVubGlrZWx5IHRoYXQgeW91IHdhbnQgdG8gZG8gdGhpcy5cbiAqICogICBUaGUgY29tbW9uIGNhc2UgaXMgdG8gbm90IHBhc3MgYSBkZXN0aW5hdGlvbiBwcm9jZXNzb3IsIGluIHdoaWNoIGNhc2UgdGhlXG4gKiAgICAgY3VycmVudCBwcm9jZXNzb3IgY29udGludWVzIHJ1bm5pbmcgd2l0aCBhIG5ldyBIVE1MIChoYXN0KSB0cmVlXG4gKiAgICAgKG11dGF0ZS1tb2RlKS5cbiAqICAgICBBcyB0aGUgY3VycmVudCBwcm9jZXNzb3IgY29udGludWVzIHdpdGggYSBoYXN0IHRyZWUsIGFuZCByZWh5cGUgcGx1Z2luc1xuICogICAgIHN1cHBvcnQgaGFzdCwgdGhhdCBtZWFucyByZWh5cGUgcGx1Z2lucyBjYW4gYmUgdXNlZCBhZnRlclxuICogICAgIGByZW1hcmstcmVoeXBlYC5cbiAqICAgICBJdOKAmXMgbGlrZWx5IHRoYXQgdGhpcyBpcyB3aGF0IHlvdSB3YW50IHRvIGRvLlxuICpcbiAqIEBwYXJhbSBkZXN0aW5hdGlvblxuICogICBPcHRpb25hbCB1bmlmaWVkIHByb2Nlc3Nvci5cbiAqIEBwYXJhbSBvcHRpb25zXG4gKiAgIE9wdGlvbnMgcGFzc2VkIHRvIGBtZGFzdC11dGlsLXRvLWhhc3RgLlxuICovXG5jb25zdCByZW1hcmtSZWh5cGUgPVxuICAvKiogQHR5cGUgeyhpbXBvcnQoJ3VuaWZpZWQnKS5QbHVnaW48W1Byb2Nlc3NvciwgT3B0aW9ucz9dfFtudWxsfHVuZGVmaW5lZCwgT3B0aW9ucz9dfFtPcHRpb25zXXxbXSwgTWRhc3RSb290Pil9ICovXG4gIChcbiAgICBmdW5jdGlvbiAoZGVzdGluYXRpb24sIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBkZXN0aW5hdGlvbiAmJiAncnVuJyBpbiBkZXN0aW5hdGlvblxuICAgICAgICA/IGJyaWRnZShkZXN0aW5hdGlvbiwgb3B0aW9ucylcbiAgICAgICAgOiBtdXRhdGUoZGVzdGluYXRpb24gfHwgb3B0aW9ucylcbiAgICB9XG4gIClcblxuZXhwb3J0IGRlZmF1bHQgcmVtYXJrUmVoeXBlXG5cbi8qKlxuICogQnJpZGdlLW1vZGUuXG4gKiBSdW5zIHRoZSBkZXN0aW5hdGlvbiB3aXRoIHRoZSBuZXcgaGFzdCB0cmVlLlxuICpcbiAqIEB0eXBlIHtpbXBvcnQoJ3VuaWZpZWQnKS5QbHVnaW48W1Byb2Nlc3NvciwgT3B0aW9ucz9dLCBNZGFzdFJvb3Q+fVxuICovXG5mdW5jdGlvbiBicmlkZ2UoZGVzdGluYXRpb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIChub2RlLCBmaWxlLCBuZXh0KSA9PiB7XG4gICAgZGVzdGluYXRpb24ucnVuKHRvSGFzdChub2RlLCBvcHRpb25zKSwgZmlsZSwgKGVycm9yKSA9PiB7XG4gICAgICBuZXh0KGVycm9yKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBNdXRhdGUtbW9kZS5cbiAqIEZ1cnRoZXIgcGx1Z2lucyBydW4gb24gdGhlIGhhc3QgdHJlZS5cbiAqXG4gKiBAdHlwZSB7aW1wb3J0KCd1bmlmaWVkJykuUGx1Z2luPFtPcHRpb25zP118dm9pZFtdLCBNZGFzdFJvb3QsIEhhc3RSb290Pn1cbiAqL1xuZnVuY3Rpb24gbXV0YXRlKG9wdGlvbnMpIHtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYXNzdW1lIGEgY29ycmVzcG9uZGluZyBub2RlIGlzIHJldHVybmVkIGJ5IGB0b0hhc3RgLlxuICByZXR1cm4gKG5vZGUpID0+IHRvSGFzdChub2RlLCBvcHRpb25zKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/remark-rehype/lib/index.js\n");

/***/ })

};
;