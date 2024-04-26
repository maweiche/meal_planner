"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-gfm-table";
exports.ids = ["vendor-chunks/mdast-util-gfm-table"];
exports.modules = {

/***/ "(ssr)/./node_modules/mdast-util-gfm-table/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/mdast-util-gfm-table/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmTableFromMarkdown: () => (/* binding */ gfmTableFromMarkdown),\n/* harmony export */   gfmTableToMarkdown: () => (/* binding */ gfmTableToMarkdown)\n/* harmony export */ });\n/* harmony import */ var mdast_util_to_markdown_lib_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-to-markdown/lib/util/container-phrasing.js */ \"(ssr)/./node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js\");\n/* harmony import */ var mdast_util_to_markdown_lib_handle_inline_code_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mdast-util-to-markdown/lib/handle/inline-code.js */ \"(ssr)/./node_modules/mdast-util-to-markdown/lib/handle/inline-code.js\");\n/* harmony import */ var markdown_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! markdown-table */ \"(ssr)/./node_modules/markdown-table/index.js\");\n/**\n * @typedef {import('mdast').Table} Table\n * @typedef {import('mdast').TableRow} TableRow\n * @typedef {import('mdast').TableCell} TableCell\n * @typedef {import('mdast').InlineCode} InlineCode\n *\n * @typedef {import('markdown-table').MarkdownTableOptions} MarkdownTableOptions\n *\n * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext\n * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension\n * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle\n *\n * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension\n * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle\n * @typedef {import('mdast-util-to-markdown').Context} ToMarkdownContext\n * @typedef {import('mdast-util-to-markdown').SafeOptions} SafeOptions\n */\n\n/**\n * @typedef Options\n *   Configuration.\n * @property {boolean | null | undefined} [tableCellPadding=true]\n *   Whether to add a space of padding between delimiters and cells.\n * @property {boolean | null | undefined} [tablePipeAlign=true]\n *   Whether to align the delimiters.\n * @property {MarkdownTableOptions['stringLength'] | null | undefined} [stringLength]\n *   Function to detect the length of table cell content, used when aligning\n *   the delimiters between cells\n */\n\n\n\n\n\n// To do: next major: use `state` and `state` utilities from `mdast-util-to-markdown`.\n// To do: next major: use `defaultHandlers.inlineCode`.\n// To do: next major: expose functions.\n\n/**\n * Extension for `mdast-util-from-markdown` to enable GFM tables.\n *\n * @type {FromMarkdownExtension}\n */\nconst gfmTableFromMarkdown = {\n  enter: {\n    table: enterTable,\n    tableData: enterCell,\n    tableHeader: enterCell,\n    tableRow: enterRow\n  },\n  exit: {\n    codeText: exitCodeText,\n    table: exitTable,\n    tableData: exit,\n    tableHeader: exit,\n    tableRow: exit\n  }\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterTable(token) {\n  /** @type {Array<'left' | 'right' | 'center' | 'none'>} */\n  // @ts-expect-error: `align` is custom.\n  const align = token._align\n  this.enter(\n    {\n      type: 'table',\n      align: align.map((d) => (d === 'none' ? null : d)),\n      children: []\n    },\n    token\n  )\n  this.setData('inTable', true)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitTable(token) {\n  this.exit(token)\n  this.setData('inTable')\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterRow(token) {\n  this.enter({type: 'tableRow', children: []}, token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exit(token) {\n  this.exit(token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterCell(token) {\n  this.enter({type: 'tableCell', children: []}, token)\n}\n\n// Overwrite the default code text data handler to unescape escaped pipes when\n// they are in tables.\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitCodeText(token) {\n  let value = this.resume()\n\n  if (this.getData('inTable')) {\n    value = value.replace(/\\\\([\\\\|])/g, replace)\n  }\n\n  const node = /** @type {InlineCode} */ (this.stack[this.stack.length - 1])\n  node.value = value\n  this.exit(token)\n}\n\n/**\n * @param {string} $0\n * @param {string} $1\n * @returns {string}\n */\nfunction replace($0, $1) {\n  // Pipes work, backslashes don’t (but can’t escape pipes).\n  return $1 === '|' ? $1 : $0\n}\n\n/**\n * Create an extension for `mdast-util-to-markdown` to enable GFM tables in\n * markdown.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration.\n * @returns {ToMarkdownExtension}\n *   Extension for `mdast-util-to-markdown` to enable GFM tables.\n */\nfunction gfmTableToMarkdown(options) {\n  const settings = options || {}\n  const padding = settings.tableCellPadding\n  const alignDelimiters = settings.tablePipeAlign\n  const stringLength = settings.stringLength\n  const around = padding ? ' ' : '|'\n\n  return {\n    unsafe: [\n      {character: '\\r', inConstruct: 'tableCell'},\n      {character: '\\n', inConstruct: 'tableCell'},\n      // A pipe, when followed by a tab or space (padding), or a dash or colon\n      // (unpadded delimiter row), could result in a table.\n      {atBreak: true, character: '|', after: '[\\t :-]'},\n      // A pipe in a cell must be encoded.\n      {character: '|', inConstruct: 'tableCell'},\n      // A colon must be followed by a dash, in which case it could start a\n      // delimiter row.\n      {atBreak: true, character: ':', after: '-'},\n      // A delimiter row can also start with a dash, when followed by more\n      // dashes, a colon, or a pipe.\n      // This is a stricter version than the built in check for lists, thematic\n      // breaks, and setex heading underlines though:\n      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>\n      {atBreak: true, character: '-', after: '[:|-]'}\n    ],\n    handlers: {\n      table: handleTable,\n      tableRow: handleTableRow,\n      tableCell: handleTableCell,\n      inlineCode: inlineCodeWithTable\n    }\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {Table} node\n   */\n  function handleTable(node, _, context, safeOptions) {\n    return serializeData(\n      handleTableAsData(node, context, safeOptions),\n      node.align\n    )\n  }\n\n  /**\n   * This function isn’t really used normally, because we handle rows at the\n   * table level.\n   * But, if someone passes in a table row, this ensures we make somewhat sense.\n   *\n   * @type {ToMarkdownHandle}\n   * @param {TableRow} node\n   */\n  function handleTableRow(node, _, context, safeOptions) {\n    const row = handleTableRowAsData(node, context, safeOptions)\n    const value = serializeData([row])\n    // `markdown-table` will always add an align row\n    return value.slice(0, value.indexOf('\\n'))\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {TableCell} node\n   */\n  function handleTableCell(node, _, context, safeOptions) {\n    const exit = context.enter('tableCell')\n    const subexit = context.enter('phrasing')\n    const value = (0,mdast_util_to_markdown_lib_util_container_phrasing_js__WEBPACK_IMPORTED_MODULE_0__.containerPhrasing)(node, context, {\n      ...safeOptions,\n      before: around,\n      after: around\n    })\n    subexit()\n    exit()\n    return value\n  }\n\n  /**\n   * @param {Array<Array<string>>} matrix\n   * @param {Array<string | null | undefined> | null | undefined} [align]\n   */\n  function serializeData(matrix, align) {\n    return (0,markdown_table__WEBPACK_IMPORTED_MODULE_1__.markdownTable)(matrix, {\n      align,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      alignDelimiters,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      padding,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      stringLength\n    })\n  }\n\n  /**\n   * @param {Table} node\n   * @param {ToMarkdownContext} context\n   * @param {SafeOptions} safeOptions\n   */\n  function handleTableAsData(node, context, safeOptions) {\n    const children = node.children\n    let index = -1\n    /** @type {Array<Array<string>>} */\n    const result = []\n    const subexit = context.enter('table')\n\n    while (++index < children.length) {\n      result[index] = handleTableRowAsData(\n        children[index],\n        context,\n        safeOptions\n      )\n    }\n\n    subexit()\n\n    return result\n  }\n\n  /**\n   * @param {TableRow} node\n   * @param {ToMarkdownContext} context\n   * @param {SafeOptions} safeOptions\n   */\n  function handleTableRowAsData(node, context, safeOptions) {\n    const children = node.children\n    let index = -1\n    /** @type {Array<string>} */\n    const result = []\n    const subexit = context.enter('tableRow')\n\n    while (++index < children.length) {\n      // Note: the positional info as used here is incorrect.\n      // Making it correct would be impossible due to aligning cells?\n      // And it would need copy/pasting `markdown-table` into this project.\n      result[index] = handleTableCell(\n        children[index],\n        node,\n        context,\n        safeOptions\n      )\n    }\n\n    subexit()\n\n    return result\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {InlineCode} node\n   */\n  function inlineCodeWithTable(node, parent, context) {\n    let value = (0,mdast_util_to_markdown_lib_handle_inline_code_js__WEBPACK_IMPORTED_MODULE_2__.inlineCode)(node, parent, context)\n\n    if (context.stack.includes('tableCell')) {\n      value = value.replace(/\\|/g, '\\\\$&')\n    }\n\n    return value\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1nZm0tdGFibGUvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLDBCQUEwQjtBQUN2QyxhQUFhLDJCQUEyQjtBQUN4QyxhQUFhLDRCQUE0QjtBQUN6QztBQUNBLGFBQWEsK0NBQStDO0FBQzVEO0FBQ0EsYUFBYSxtREFBbUQ7QUFDaEUsYUFBYSw4Q0FBOEM7QUFDM0QsYUFBYSwyQ0FBMkM7QUFDeEQ7QUFDQSxhQUFhLDBDQUEwQztBQUN2RCxhQUFhLHlDQUF5QztBQUN0RCxhQUFhLDBDQUEwQztBQUN2RCxhQUFhLDhDQUE4QztBQUMzRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRCQUE0QjtBQUMxQztBQUNBLGNBQWMsNEJBQTRCO0FBQzFDO0FBQ0EsY0FBYyx5REFBeUQ7QUFDdkU7QUFDQTtBQUNBOztBQUV1RjtBQUNaO0FBQy9COztBQUU1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQSxhQUFhLDZDQUE2QztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBLGNBQWMsK0JBQStCO0FBQzdDOztBQUVBO0FBQ0EsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBLGNBQWMsZ0NBQWdDO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsWUFBWTtBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTywwQ0FBMEM7QUFDakQsT0FBTywwQ0FBMEM7QUFDakQ7QUFDQTtBQUNBLE9BQU8sZ0RBQWdEO0FBQ3ZEO0FBQ0EsT0FBTyx5Q0FBeUM7QUFDaEQ7QUFDQTtBQUNBLE9BQU8sMENBQTBDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1osYUFBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdHQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHFEQUFxRDtBQUNsRTtBQUNBO0FBQ0EsV0FBVyw2REFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLG1CQUFtQjtBQUNoQyxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxtQkFBbUI7QUFDaEMsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLDRGQUFVOztBQUUxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtZ2ZtLXRhYmxlL2xpYi9pbmRleC5qcz80NzFmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5UYWJsZX0gVGFibGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuVGFibGVSb3d9IFRhYmxlUm93XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlRhYmxlQ2VsbH0gVGFibGVDZWxsXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLklubGluZUNvZGV9IElubGluZUNvZGVcbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtYXJrZG93bi10YWJsZScpLk1hcmtkb3duVGFibGVPcHRpb25zfSBNYXJrZG93blRhYmxlT3B0aW9uc1xuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLkNvbXBpbGVDb250ZXh0fSBDb21waWxlQ29udGV4dFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJykuRXh0ZW5zaW9ufSBGcm9tTWFya2Rvd25FeHRlbnNpb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLkhhbmRsZX0gRnJvbU1hcmtkb3duSGFuZGxlXG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC10by1tYXJrZG93bicpLk9wdGlvbnN9IFRvTWFya2Rvd25FeHRlbnNpb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5IYW5kbGV9IFRvTWFya2Rvd25IYW5kbGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5Db250ZXh0fSBUb01hcmtkb3duQ29udGV4dFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC10by1tYXJrZG93bicpLlNhZmVPcHRpb25zfSBTYWZlT3B0aW9uc1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYgT3B0aW9uc1xuICogICBDb25maWd1cmF0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3RhYmxlQ2VsbFBhZGRpbmc9dHJ1ZV1cbiAqICAgV2hldGhlciB0byBhZGQgYSBzcGFjZSBvZiBwYWRkaW5nIGJldHdlZW4gZGVsaW1pdGVycyBhbmQgY2VsbHMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbdGFibGVQaXBlQWxpZ249dHJ1ZV1cbiAqICAgV2hldGhlciB0byBhbGlnbiB0aGUgZGVsaW1pdGVycy5cbiAqIEBwcm9wZXJ0eSB7TWFya2Rvd25UYWJsZU9wdGlvbnNbJ3N0cmluZ0xlbmd0aCddIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3N0cmluZ0xlbmd0aF1cbiAqICAgRnVuY3Rpb24gdG8gZGV0ZWN0IHRoZSBsZW5ndGggb2YgdGFibGUgY2VsbCBjb250ZW50LCB1c2VkIHdoZW4gYWxpZ25pbmdcbiAqICAgdGhlIGRlbGltaXRlcnMgYmV0d2VlbiBjZWxsc1xuICovXG5cbmltcG9ydCB7Y29udGFpbmVyUGhyYXNpbmd9IGZyb20gJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24vbGliL3V0aWwvY29udGFpbmVyLXBocmFzaW5nLmpzJ1xuaW1wb3J0IHtpbmxpbmVDb2RlfSBmcm9tICdtZGFzdC11dGlsLXRvLW1hcmtkb3duL2xpYi9oYW5kbGUvaW5saW5lLWNvZGUuanMnXG5pbXBvcnQge21hcmtkb3duVGFibGV9IGZyb20gJ21hcmtkb3duLXRhYmxlJ1xuXG4vLyBUbyBkbzogbmV4dCBtYWpvcjogdXNlIGBzdGF0ZWAgYW5kIGBzdGF0ZWAgdXRpbGl0aWVzIGZyb20gYG1kYXN0LXV0aWwtdG8tbWFya2Rvd25gLlxuLy8gVG8gZG86IG5leHQgbWFqb3I6IHVzZSBgZGVmYXVsdEhhbmRsZXJzLmlubGluZUNvZGVgLlxuLy8gVG8gZG86IG5leHQgbWFqb3I6IGV4cG9zZSBmdW5jdGlvbnMuXG5cbi8qKlxuICogRXh0ZW5zaW9uIGZvciBgbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIHRhYmxlcy5cbiAqXG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duRXh0ZW5zaW9ufVxuICovXG5leHBvcnQgY29uc3QgZ2ZtVGFibGVGcm9tTWFya2Rvd24gPSB7XG4gIGVudGVyOiB7XG4gICAgdGFibGU6IGVudGVyVGFibGUsXG4gICAgdGFibGVEYXRhOiBlbnRlckNlbGwsXG4gICAgdGFibGVIZWFkZXI6IGVudGVyQ2VsbCxcbiAgICB0YWJsZVJvdzogZW50ZXJSb3dcbiAgfSxcbiAgZXhpdDoge1xuICAgIGNvZGVUZXh0OiBleGl0Q29kZVRleHQsXG4gICAgdGFibGU6IGV4aXRUYWJsZSxcbiAgICB0YWJsZURhdGE6IGV4aXQsXG4gICAgdGFibGVIZWFkZXI6IGV4aXQsXG4gICAgdGFibGVSb3c6IGV4aXRcbiAgfVxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGVudGVyVGFibGUodG9rZW4pIHtcbiAgLyoqIEB0eXBlIHtBcnJheTwnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgfCAnbm9uZSc+fSAqL1xuICAvLyBAdHMtZXhwZWN0LWVycm9yOiBgYWxpZ25gIGlzIGN1c3RvbS5cbiAgY29uc3QgYWxpZ24gPSB0b2tlbi5fYWxpZ25cbiAgdGhpcy5lbnRlcihcbiAgICB7XG4gICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgYWxpZ246IGFsaWduLm1hcCgoZCkgPT4gKGQgPT09ICdub25lJyA/IG51bGwgOiBkKSksXG4gICAgICBjaGlsZHJlbjogW11cbiAgICB9LFxuICAgIHRva2VuXG4gIClcbiAgdGhpcy5zZXREYXRhKCdpblRhYmxlJywgdHJ1ZSlcbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBleGl0VGFibGUodG9rZW4pIHtcbiAgdGhpcy5leGl0KHRva2VuKVxuICB0aGlzLnNldERhdGEoJ2luVGFibGUnKVxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGVudGVyUm93KHRva2VuKSB7XG4gIHRoaXMuZW50ZXIoe3R5cGU6ICd0YWJsZVJvdycsIGNoaWxkcmVuOiBbXX0sIHRva2VuKVxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGV4aXQodG9rZW4pIHtcbiAgdGhpcy5leGl0KHRva2VuKVxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGVudGVyQ2VsbCh0b2tlbikge1xuICB0aGlzLmVudGVyKHt0eXBlOiAndGFibGVDZWxsJywgY2hpbGRyZW46IFtdfSwgdG9rZW4pXG59XG5cbi8vIE92ZXJ3cml0ZSB0aGUgZGVmYXVsdCBjb2RlIHRleHQgZGF0YSBoYW5kbGVyIHRvIHVuZXNjYXBlIGVzY2FwZWQgcGlwZXMgd2hlblxuLy8gdGhleSBhcmUgaW4gdGFibGVzLlxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBleGl0Q29kZVRleHQodG9rZW4pIHtcbiAgbGV0IHZhbHVlID0gdGhpcy5yZXN1bWUoKVxuXG4gIGlmICh0aGlzLmdldERhdGEoJ2luVGFibGUnKSkge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxcXChbXFxcXHxdKS9nLCByZXBsYWNlKVxuICB9XG5cbiAgY29uc3Qgbm9kZSA9IC8qKiBAdHlwZSB7SW5saW5lQ29kZX0gKi8gKHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXSlcbiAgbm9kZS52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuZXhpdCh0b2tlbilcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gJDBcbiAqIEBwYXJhbSB7c3RyaW5nfSAkMVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVwbGFjZSgkMCwgJDEpIHtcbiAgLy8gUGlwZXMgd29yaywgYmFja3NsYXNoZXMgZG9u4oCZdCAoYnV0IGNhbuKAmXQgZXNjYXBlIHBpcGVzKS5cbiAgcmV0dXJuICQxID09PSAnfCcgPyAkMSA6ICQwXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGV4dGVuc2lvbiBmb3IgYG1kYXN0LXV0aWwtdG8tbWFya2Rvd25gIHRvIGVuYWJsZSBHRk0gdGFibGVzIGluXG4gKiBtYXJrZG93bi5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkfSBbb3B0aW9uc11cbiAqICAgQ29uZmlndXJhdGlvbi5cbiAqIEByZXR1cm5zIHtUb01hcmtkb3duRXh0ZW5zaW9ufVxuICogICBFeHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIHRhYmxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdmbVRhYmxlVG9NYXJrZG93bihvcHRpb25zKSB7XG4gIGNvbnN0IHNldHRpbmdzID0gb3B0aW9ucyB8fCB7fVxuICBjb25zdCBwYWRkaW5nID0gc2V0dGluZ3MudGFibGVDZWxsUGFkZGluZ1xuICBjb25zdCBhbGlnbkRlbGltaXRlcnMgPSBzZXR0aW5ncy50YWJsZVBpcGVBbGlnblxuICBjb25zdCBzdHJpbmdMZW5ndGggPSBzZXR0aW5ncy5zdHJpbmdMZW5ndGhcbiAgY29uc3QgYXJvdW5kID0gcGFkZGluZyA/ICcgJyA6ICd8J1xuXG4gIHJldHVybiB7XG4gICAgdW5zYWZlOiBbXG4gICAgICB7Y2hhcmFjdGVyOiAnXFxyJywgaW5Db25zdHJ1Y3Q6ICd0YWJsZUNlbGwnfSxcbiAgICAgIHtjaGFyYWN0ZXI6ICdcXG4nLCBpbkNvbnN0cnVjdDogJ3RhYmxlQ2VsbCd9LFxuICAgICAgLy8gQSBwaXBlLCB3aGVuIGZvbGxvd2VkIGJ5IGEgdGFiIG9yIHNwYWNlIChwYWRkaW5nKSwgb3IgYSBkYXNoIG9yIGNvbG9uXG4gICAgICAvLyAodW5wYWRkZWQgZGVsaW1pdGVyIHJvdyksIGNvdWxkIHJlc3VsdCBpbiBhIHRhYmxlLlxuICAgICAge2F0QnJlYWs6IHRydWUsIGNoYXJhY3RlcjogJ3wnLCBhZnRlcjogJ1tcXHQgOi1dJ30sXG4gICAgICAvLyBBIHBpcGUgaW4gYSBjZWxsIG11c3QgYmUgZW5jb2RlZC5cbiAgICAgIHtjaGFyYWN0ZXI6ICd8JywgaW5Db25zdHJ1Y3Q6ICd0YWJsZUNlbGwnfSxcbiAgICAgIC8vIEEgY29sb24gbXVzdCBiZSBmb2xsb3dlZCBieSBhIGRhc2gsIGluIHdoaWNoIGNhc2UgaXQgY291bGQgc3RhcnQgYVxuICAgICAgLy8gZGVsaW1pdGVyIHJvdy5cbiAgICAgIHthdEJyZWFrOiB0cnVlLCBjaGFyYWN0ZXI6ICc6JywgYWZ0ZXI6ICctJ30sXG4gICAgICAvLyBBIGRlbGltaXRlciByb3cgY2FuIGFsc28gc3RhcnQgd2l0aCBhIGRhc2gsIHdoZW4gZm9sbG93ZWQgYnkgbW9yZVxuICAgICAgLy8gZGFzaGVzLCBhIGNvbG9uLCBvciBhIHBpcGUuXG4gICAgICAvLyBUaGlzIGlzIGEgc3RyaWN0ZXIgdmVyc2lvbiB0aGFuIHRoZSBidWlsdCBpbiBjaGVjayBmb3IgbGlzdHMsIHRoZW1hdGljXG4gICAgICAvLyBicmVha3MsIGFuZCBzZXRleCBoZWFkaW5nIHVuZGVybGluZXMgdGhvdWdoOlxuICAgICAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9zeW50YXgtdHJlZS9tZGFzdC11dGlsLXRvLW1hcmtkb3duL2Jsb2IvNTFhMjAzOC9saWIvdW5zYWZlLmpzI0w1Nz5cbiAgICAgIHthdEJyZWFrOiB0cnVlLCBjaGFyYWN0ZXI6ICctJywgYWZ0ZXI6ICdbOnwtXSd9XG4gICAgXSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgdGFibGU6IGhhbmRsZVRhYmxlLFxuICAgICAgdGFibGVSb3c6IGhhbmRsZVRhYmxlUm93LFxuICAgICAgdGFibGVDZWxsOiBoYW5kbGVUYWJsZUNlbGwsXG4gICAgICBpbmxpbmVDb2RlOiBpbmxpbmVDb2RlV2l0aFRhYmxlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtUb01hcmtkb3duSGFuZGxlfVxuICAgKiBAcGFyYW0ge1RhYmxlfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZShub2RlLCBfLCBjb250ZXh0LCBzYWZlT3B0aW9ucykge1xuICAgIHJldHVybiBzZXJpYWxpemVEYXRhKFxuICAgICAgaGFuZGxlVGFibGVBc0RhdGEobm9kZSwgY29udGV4dCwgc2FmZU9wdGlvbnMpLFxuICAgICAgbm9kZS5hbGlnblxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzbuKAmXQgcmVhbGx5IHVzZWQgbm9ybWFsbHksIGJlY2F1c2Ugd2UgaGFuZGxlIHJvd3MgYXQgdGhlXG4gICAqIHRhYmxlIGxldmVsLlxuICAgKiBCdXQsIGlmIHNvbWVvbmUgcGFzc2VzIGluIGEgdGFibGUgcm93LCB0aGlzIGVuc3VyZXMgd2UgbWFrZSBzb21ld2hhdCBzZW5zZS5cbiAgICpcbiAgICogQHR5cGUge1RvTWFya2Rvd25IYW5kbGV9XG4gICAqIEBwYXJhbSB7VGFibGVSb3d9IG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVRhYmxlUm93KG5vZGUsIF8sIGNvbnRleHQsIHNhZmVPcHRpb25zKSB7XG4gICAgY29uc3Qgcm93ID0gaGFuZGxlVGFibGVSb3dBc0RhdGEobm9kZSwgY29udGV4dCwgc2FmZU9wdGlvbnMpXG4gICAgY29uc3QgdmFsdWUgPSBzZXJpYWxpemVEYXRhKFtyb3ddKVxuICAgIC8vIGBtYXJrZG93bi10YWJsZWAgd2lsbCBhbHdheXMgYWRkIGFuIGFsaWduIHJvd1xuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5pbmRleE9mKCdcXG4nKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7VG9NYXJrZG93bkhhbmRsZX1cbiAgICogQHBhcmFtIHtUYWJsZUNlbGx9IG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVRhYmxlQ2VsbChub2RlLCBfLCBjb250ZXh0LCBzYWZlT3B0aW9ucykge1xuICAgIGNvbnN0IGV4aXQgPSBjb250ZXh0LmVudGVyKCd0YWJsZUNlbGwnKVxuICAgIGNvbnN0IHN1YmV4aXQgPSBjb250ZXh0LmVudGVyKCdwaHJhc2luZycpXG4gICAgY29uc3QgdmFsdWUgPSBjb250YWluZXJQaHJhc2luZyhub2RlLCBjb250ZXh0LCB7XG4gICAgICAuLi5zYWZlT3B0aW9ucyxcbiAgICAgIGJlZm9yZTogYXJvdW5kLFxuICAgICAgYWZ0ZXI6IGFyb3VuZFxuICAgIH0pXG4gICAgc3ViZXhpdCgpXG4gICAgZXhpdCgpXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheTxBcnJheTxzdHJpbmc+Pn0gbWF0cml4XG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZD4gfCBudWxsIHwgdW5kZWZpbmVkfSBbYWxpZ25dXG4gICAqL1xuICBmdW5jdGlvbiBzZXJpYWxpemVEYXRhKG1hdHJpeCwgYWxpZ24pIHtcbiAgICByZXR1cm4gbWFya2Rvd25UYWJsZShtYXRyaXgsIHtcbiAgICAgIGFsaWduLFxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYG1hcmtkb3duLXRhYmxlYCB0eXBlcyBzaG91bGQgc3VwcG9ydCBgbnVsbGAuXG4gICAgICBhbGlnbkRlbGltaXRlcnMsXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yOiBgbWFya2Rvd24tdGFibGVgIHR5cGVzIHNob3VsZCBzdXBwb3J0IGBudWxsYC5cbiAgICAgIHBhZGRpbmcsXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yOiBgbWFya2Rvd24tdGFibGVgIHR5cGVzIHNob3VsZCBzdXBwb3J0IGBudWxsYC5cbiAgICAgIHN0cmluZ0xlbmd0aFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtUYWJsZX0gbm9kZVxuICAgKiBAcGFyYW0ge1RvTWFya2Rvd25Db250ZXh0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7U2FmZU9wdGlvbnN9IHNhZmVPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZUFzRGF0YShub2RlLCBjb250ZXh0LCBzYWZlT3B0aW9ucykge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlblxuICAgIGxldCBpbmRleCA9IC0xXG4gICAgLyoqIEB0eXBlIHtBcnJheTxBcnJheTxzdHJpbmc+Pn0gKi9cbiAgICBjb25zdCByZXN1bHQgPSBbXVxuICAgIGNvbnN0IHN1YmV4aXQgPSBjb250ZXh0LmVudGVyKCd0YWJsZScpXG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IGhhbmRsZVRhYmxlUm93QXNEYXRhKFxuICAgICAgICBjaGlsZHJlbltpbmRleF0sXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHNhZmVPcHRpb25zXG4gICAgICApXG4gICAgfVxuXG4gICAgc3ViZXhpdCgpXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtUYWJsZVJvd30gbm9kZVxuICAgKiBAcGFyYW0ge1RvTWFya2Rvd25Db250ZXh0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7U2FmZU9wdGlvbnN9IHNhZmVPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZVJvd0FzRGF0YShub2RlLCBjb250ZXh0LCBzYWZlT3B0aW9ucykge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlblxuICAgIGxldCBpbmRleCA9IC0xXG4gICAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdXG4gICAgY29uc3Qgc3ViZXhpdCA9IGNvbnRleHQuZW50ZXIoJ3RhYmxlUm93JylcblxuICAgIHdoaWxlICgrK2luZGV4IDwgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAvLyBOb3RlOiB0aGUgcG9zaXRpb25hbCBpbmZvIGFzIHVzZWQgaGVyZSBpcyBpbmNvcnJlY3QuXG4gICAgICAvLyBNYWtpbmcgaXQgY29ycmVjdCB3b3VsZCBiZSBpbXBvc3NpYmxlIGR1ZSB0byBhbGlnbmluZyBjZWxscz9cbiAgICAgIC8vIEFuZCBpdCB3b3VsZCBuZWVkIGNvcHkvcGFzdGluZyBgbWFya2Rvd24tdGFibGVgIGludG8gdGhpcyBwcm9qZWN0LlxuICAgICAgcmVzdWx0W2luZGV4XSA9IGhhbmRsZVRhYmxlQ2VsbChcbiAgICAgICAgY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICBub2RlLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBzYWZlT3B0aW9uc1xuICAgICAgKVxuICAgIH1cblxuICAgIHN1YmV4aXQoKVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtUb01hcmtkb3duSGFuZGxlfVxuICAgKiBAcGFyYW0ge0lubGluZUNvZGV9IG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIGlubGluZUNvZGVXaXRoVGFibGUobm9kZSwgcGFyZW50LCBjb250ZXh0KSB7XG4gICAgbGV0IHZhbHVlID0gaW5saW5lQ29kZShub2RlLCBwYXJlbnQsIGNvbnRleHQpXG5cbiAgICBpZiAoY29udGV4dC5zdGFjay5pbmNsdWRlcygndGFibGVDZWxsJykpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFx8L2csICdcXFxcJCYnKVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-gfm-table/lib/index.js\n");

/***/ })

};
;