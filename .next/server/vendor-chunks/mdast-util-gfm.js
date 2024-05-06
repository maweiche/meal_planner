"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-gfm";
exports.ids = ["vendor-chunks/mdast-util-gfm"];
exports.modules = {

/***/ "(ssr)/./node_modules/mdast-util-gfm/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/mdast-util-gfm/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmFromMarkdown: () => (/* binding */ gfmFromMarkdown),\n/* harmony export */   gfmToMarkdown: () => (/* binding */ gfmToMarkdown)\n/* harmony export */ });\n/* harmony import */ var mdast_util_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-gfm-autolink-literal */ \"(ssr)/./node_modules/mdast-util-gfm-autolink-literal/lib/index.js\");\n/* harmony import */ var mdast_util_gfm_footnote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mdast-util-gfm-footnote */ \"(ssr)/./node_modules/mdast-util-gfm-footnote/lib/index.js\");\n/* harmony import */ var mdast_util_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mdast-util-gfm-strikethrough */ \"(ssr)/./node_modules/mdast-util-gfm-strikethrough/lib/index.js\");\n/* harmony import */ var mdast_util_gfm_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mdast-util-gfm-table */ \"(ssr)/./node_modules/mdast-util-gfm-table/lib/index.js\");\n/* harmony import */ var mdast_util_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mdast-util-gfm-task-list-item */ \"(ssr)/./node_modules/mdast-util-gfm-task-list-item/lib/index.js\");\n/**\n * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension\n * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension\n */\n\n/**\n * @typedef {import('mdast-util-gfm-table').Options} Options\n *   Configuration.\n */\n\n\n\n\n\n\n\n/**\n * Create an extension for `mdast-util-from-markdown` to enable GFM (autolink\n * literals, footnotes, strikethrough, tables, tasklists).\n *\n * @returns {Array<FromMarkdownExtension>}\n *   Extension for `mdast-util-from-markdown` to enable GFM (autolink literals,\n *   footnotes, strikethrough, tables, tasklists).\n */\nfunction gfmFromMarkdown() {\n  return [\n    mdast_util_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_0__.gfmAutolinkLiteralFromMarkdown,\n    (0,mdast_util_gfm_footnote__WEBPACK_IMPORTED_MODULE_1__.gfmFootnoteFromMarkdown)(),\n    mdast_util_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_2__.gfmStrikethroughFromMarkdown,\n    mdast_util_gfm_table__WEBPACK_IMPORTED_MODULE_3__.gfmTableFromMarkdown,\n    mdast_util_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_4__.gfmTaskListItemFromMarkdown\n  ]\n}\n\n/**\n * Create an extension for `mdast-util-to-markdown` to enable GFM (autolink\n * literals, footnotes, strikethrough, tables, tasklists).\n *\n * @param {Options | null | undefined} [options]\n *   Configuration.\n * @returns {ToMarkdownExtension}\n *   Extension for `mdast-util-to-markdown` to enable GFM (autolink literals,\n *   footnotes, strikethrough, tables, tasklists).\n */\nfunction gfmToMarkdown(options) {\n  return {\n    extensions: [\n      mdast_util_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_0__.gfmAutolinkLiteralToMarkdown,\n      (0,mdast_util_gfm_footnote__WEBPACK_IMPORTED_MODULE_1__.gfmFootnoteToMarkdown)(),\n      mdast_util_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_2__.gfmStrikethroughToMarkdown,\n      (0,mdast_util_gfm_table__WEBPACK_IMPORTED_MODULE_3__.gfmTableToMarkdown)(options),\n      mdast_util_gfm_task_list_item__WEBPACK_IMPORTED_MODULE_4__.gfmTaskListItemToMarkdown\n    ]\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1nZm0vbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsOENBQThDO0FBQzNELGFBQWEsMENBQTBDO0FBQ3ZEOztBQUVBO0FBQ0EsYUFBYSx3Q0FBd0M7QUFDckQ7QUFDQTs7QUFLd0M7QUFJUjtBQUlLO0FBQ3dDO0FBSXZDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsSUFBSSwyRkFBOEI7QUFDbEMsSUFBSSxnRkFBdUI7QUFDM0IsSUFBSSxzRkFBNEI7QUFDaEMsSUFBSSxzRUFBb0I7QUFDeEIsSUFBSSxzRkFBMkI7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLE1BQU0seUZBQTRCO0FBQ2xDLE1BQU0sOEVBQXFCO0FBQzNCLE1BQU0sb0ZBQTBCO0FBQ2hDLE1BQU0sd0VBQWtCO0FBQ3hCLE1BQU0sb0ZBQXlCO0FBQy9CO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLWdmbS9saWIvaW5kZXguanM/MTZhYiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLkV4dGVuc2lvbn0gRnJvbU1hcmtkb3duRXh0ZW5zaW9uXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLXRvLW1hcmtkb3duJykuT3B0aW9uc30gVG9NYXJrZG93bkV4dGVuc2lvblxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1nZm0tdGFibGUnKS5PcHRpb25zfSBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgZ2ZtQXV0b2xpbmtMaXRlcmFsRnJvbU1hcmtkb3duLFxuICBnZm1BdXRvbGlua0xpdGVyYWxUb01hcmtkb3duXG59IGZyb20gJ21kYXN0LXV0aWwtZ2ZtLWF1dG9saW5rLWxpdGVyYWwnXG5pbXBvcnQge1xuICBnZm1Gb290bm90ZUZyb21NYXJrZG93bixcbiAgZ2ZtRm9vdG5vdGVUb01hcmtkb3duXG59IGZyb20gJ21kYXN0LXV0aWwtZ2ZtLWZvb3Rub3RlJ1xuaW1wb3J0IHtcbiAgZ2ZtU3RyaWtldGhyb3VnaEZyb21NYXJrZG93bixcbiAgZ2ZtU3RyaWtldGhyb3VnaFRvTWFya2Rvd25cbn0gZnJvbSAnbWRhc3QtdXRpbC1nZm0tc3RyaWtldGhyb3VnaCdcbmltcG9ydCB7Z2ZtVGFibGVGcm9tTWFya2Rvd24sIGdmbVRhYmxlVG9NYXJrZG93bn0gZnJvbSAnbWRhc3QtdXRpbC1nZm0tdGFibGUnXG5pbXBvcnQge1xuICBnZm1UYXNrTGlzdEl0ZW1Gcm9tTWFya2Rvd24sXG4gIGdmbVRhc2tMaXN0SXRlbVRvTWFya2Rvd25cbn0gZnJvbSAnbWRhc3QtdXRpbC1nZm0tdGFzay1saXN0LWl0ZW0nXG5cbi8qKlxuICogQ3JlYXRlIGFuIGV4dGVuc2lvbiBmb3IgYG1kYXN0LXV0aWwtZnJvbS1tYXJrZG93bmAgdG8gZW5hYmxlIEdGTSAoYXV0b2xpbmtcbiAqIGxpdGVyYWxzLCBmb290bm90ZXMsIHN0cmlrZXRocm91Z2gsIHRhYmxlcywgdGFza2xpc3RzKS5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXk8RnJvbU1hcmtkb3duRXh0ZW5zaW9uPn1cbiAqICAgRXh0ZW5zaW9uIGZvciBgbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIChhdXRvbGluayBsaXRlcmFscyxcbiAqICAgZm9vdG5vdGVzLCBzdHJpa2V0aHJvdWdoLCB0YWJsZXMsIHRhc2tsaXN0cykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZm1Gcm9tTWFya2Rvd24oKSB7XG4gIHJldHVybiBbXG4gICAgZ2ZtQXV0b2xpbmtMaXRlcmFsRnJvbU1hcmtkb3duLFxuICAgIGdmbUZvb3Rub3RlRnJvbU1hcmtkb3duKCksXG4gICAgZ2ZtU3RyaWtldGhyb3VnaEZyb21NYXJrZG93bixcbiAgICBnZm1UYWJsZUZyb21NYXJrZG93bixcbiAgICBnZm1UYXNrTGlzdEl0ZW1Gcm9tTWFya2Rvd25cbiAgXVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBleHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIChhdXRvbGlua1xuICogbGl0ZXJhbHMsIGZvb3Rub3Rlcywgc3RyaWtldGhyb3VnaCwgdGFibGVzLCB0YXNrbGlzdHMpLlxuICpcbiAqIEBwYXJhbSB7T3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWR9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uLlxuICogQHJldHVybnMge1RvTWFya2Rvd25FeHRlbnNpb259XG4gKiAgIEV4dGVuc2lvbiBmb3IgYG1kYXN0LXV0aWwtdG8tbWFya2Rvd25gIHRvIGVuYWJsZSBHRk0gKGF1dG9saW5rIGxpdGVyYWxzLFxuICogICBmb290bm90ZXMsIHN0cmlrZXRocm91Z2gsIHRhYmxlcywgdGFza2xpc3RzKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdmbVRvTWFya2Rvd24ob3B0aW9ucykge1xuICByZXR1cm4ge1xuICAgIGV4dGVuc2lvbnM6IFtcbiAgICAgIGdmbUF1dG9saW5rTGl0ZXJhbFRvTWFya2Rvd24sXG4gICAgICBnZm1Gb290bm90ZVRvTWFya2Rvd24oKSxcbiAgICAgIGdmbVN0cmlrZXRocm91Z2hUb01hcmtkb3duLFxuICAgICAgZ2ZtVGFibGVUb01hcmtkb3duKG9wdGlvbnMpLFxuICAgICAgZ2ZtVGFza0xpc3RJdGVtVG9NYXJrZG93blxuICAgIF1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-gfm/lib/index.js\n");

/***/ })

};
;