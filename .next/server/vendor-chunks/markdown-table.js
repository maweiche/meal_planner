"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/markdown-table";
exports.ids = ["vendor-chunks/markdown-table"];
exports.modules = {

/***/ "(ssr)/./node_modules/markdown-table/index.js":
/*!**********************************************!*\
  !*** ./node_modules/markdown-table/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   markdownTable: () => (/* binding */ markdownTable)\n/* harmony export */ });\n/**\n * @typedef Options\n *   Configuration (optional).\n * @property {string|null|ReadonlyArray<string|null|undefined>} [align]\n *   One style for all columns, or styles for their respective columns.\n *   Each style is either `'l'` (left), `'r'` (right), or `'c'` (center).\n *   Other values are treated as `''`, which doesn’t place the colon in the\n *   alignment row but does align left.\n *   *Only the lowercased first character is used, so `Right` is fine.*\n * @property {boolean} [padding=true]\n *   Whether to add a space of padding between delimiters and cells.\n *\n *   When `true`, there is padding:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   When `false`, there is no padding:\n *\n *   ```markdown\n *   |Alpha|B    |\n *   |-----|-----|\n *   |C    |Delta|\n *   ```\n * @property {boolean} [delimiterStart=true]\n *   Whether to begin each row with the delimiter.\n *\n *   > 👉 **Note**: please don’t use this: it could create fragile structures\n *   > that aren’t understandable to some markdown parsers.\n *\n *   When `true`, there are starting delimiters:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   When `false`, there are no starting delimiters:\n *\n *   ```markdown\n *   Alpha | B     |\n *   ----- | ----- |\n *   C     | Delta |\n *   ```\n * @property {boolean} [delimiterEnd=true]\n *   Whether to end each row with the delimiter.\n *\n *   > 👉 **Note**: please don’t use this: it could create fragile structures\n *   > that aren’t understandable to some markdown parsers.\n *\n *   When `true`, there are ending delimiters:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   When `false`, there are no ending delimiters:\n *\n *   ```markdown\n *   | Alpha | B\n *   | ----- | -----\n *   | C     | Delta\n *   ```\n * @property {boolean} [alignDelimiters=true]\n *   Whether to align the delimiters.\n *   By default, they are aligned:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   Pass `false` to make them staggered:\n *\n *   ```markdown\n *   | Alpha | B |\n *   | - | - |\n *   | C | Delta |\n *   ```\n * @property {(value: string) => number} [stringLength]\n *   Function to detect the length of table cell content.\n *   This is used when aligning the delimiters (`|`) between table cells.\n *   Full-width characters and emoji mess up delimiter alignment when viewing\n *   the markdown source.\n *   To fix this, you can pass this function, which receives the cell content\n *   and returns its “visible” size.\n *   Note that what is and isn’t visible depends on where the text is displayed.\n *\n *   Without such a function, the following:\n *\n *   ```js\n *   markdownTable([\n *     ['Alpha', 'Bravo'],\n *     ['中文', 'Charlie'],\n *     ['👩‍❤️‍👩', 'Delta']\n *   ])\n *   ```\n *\n *   Yields:\n *\n *   ```markdown\n *   | Alpha | Bravo |\n *   | - | - |\n *   | 中文 | Charlie |\n *   | 👩‍❤️‍👩 | Delta |\n *   ```\n *\n *   With [`string-width`](https://github.com/sindresorhus/string-width):\n *\n *   ```js\n *   import stringWidth from 'string-width'\n *\n *   markdownTable(\n *     [\n *       ['Alpha', 'Bravo'],\n *       ['中文', 'Charlie'],\n *       ['👩‍❤️‍👩', 'Delta']\n *     ],\n *     {stringLength: stringWidth}\n *   )\n *   ```\n *\n *   Yields:\n *\n *   ```markdown\n *   | Alpha | Bravo   |\n *   | ----- | ------- |\n *   | 中文  | Charlie |\n *   | 👩‍❤️‍👩    | Delta   |\n *   ```\n */\n\n/**\n * @typedef {Options} MarkdownTableOptions\n * @todo\n *   Remove next major.\n */\n\n/**\n * Generate a markdown ([GFM](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)) table..\n *\n * @param {ReadonlyArray<ReadonlyArray<string|null|undefined>>} table\n *   Table data (matrix of strings).\n * @param {Options} [options]\n *   Configuration (optional).\n * @returns {string}\n */\nfunction markdownTable(table, options = {}) {\n  const align = (options.align || []).concat()\n  const stringLength = options.stringLength || defaultStringLength\n  /** @type {Array<number>} Character codes as symbols for alignment per column. */\n  const alignments = []\n  /** @type {Array<Array<string>>} Cells per row. */\n  const cellMatrix = []\n  /** @type {Array<Array<number>>} Sizes of each cell per row. */\n  const sizeMatrix = []\n  /** @type {Array<number>} */\n  const longestCellByColumn = []\n  let mostCellsPerRow = 0\n  let rowIndex = -1\n\n  // This is a superfluous loop if we don’t align delimiters, but otherwise we’d\n  // do superfluous work when aligning, so optimize for aligning.\n  while (++rowIndex < table.length) {\n    /** @type {Array<string>} */\n    const row = []\n    /** @type {Array<number>} */\n    const sizes = []\n    let columnIndex = -1\n\n    if (table[rowIndex].length > mostCellsPerRow) {\n      mostCellsPerRow = table[rowIndex].length\n    }\n\n    while (++columnIndex < table[rowIndex].length) {\n      const cell = serialize(table[rowIndex][columnIndex])\n\n      if (options.alignDelimiters !== false) {\n        const size = stringLength(cell)\n        sizes[columnIndex] = size\n\n        if (\n          longestCellByColumn[columnIndex] === undefined ||\n          size > longestCellByColumn[columnIndex]\n        ) {\n          longestCellByColumn[columnIndex] = size\n        }\n      }\n\n      row.push(cell)\n    }\n\n    cellMatrix[rowIndex] = row\n    sizeMatrix[rowIndex] = sizes\n  }\n\n  // Figure out which alignments to use.\n  let columnIndex = -1\n\n  if (typeof align === 'object' && 'length' in align) {\n    while (++columnIndex < mostCellsPerRow) {\n      alignments[columnIndex] = toAlignment(align[columnIndex])\n    }\n  } else {\n    const code = toAlignment(align)\n\n    while (++columnIndex < mostCellsPerRow) {\n      alignments[columnIndex] = code\n    }\n  }\n\n  // Inject the alignment row.\n  columnIndex = -1\n  /** @type {Array<string>} */\n  const row = []\n  /** @type {Array<number>} */\n  const sizes = []\n\n  while (++columnIndex < mostCellsPerRow) {\n    const code = alignments[columnIndex]\n    let before = ''\n    let after = ''\n\n    if (code === 99 /* `c` */) {\n      before = ':'\n      after = ':'\n    } else if (code === 108 /* `l` */) {\n      before = ':'\n    } else if (code === 114 /* `r` */) {\n      after = ':'\n    }\n\n    // There *must* be at least one hyphen-minus in each alignment cell.\n    let size =\n      options.alignDelimiters === false\n        ? 1\n        : Math.max(\n            1,\n            longestCellByColumn[columnIndex] - before.length - after.length\n          )\n\n    const cell = before + '-'.repeat(size) + after\n\n    if (options.alignDelimiters !== false) {\n      size = before.length + size + after.length\n\n      if (size > longestCellByColumn[columnIndex]) {\n        longestCellByColumn[columnIndex] = size\n      }\n\n      sizes[columnIndex] = size\n    }\n\n    row[columnIndex] = cell\n  }\n\n  // Inject the alignment row.\n  cellMatrix.splice(1, 0, row)\n  sizeMatrix.splice(1, 0, sizes)\n\n  rowIndex = -1\n  /** @type {Array<string>} */\n  const lines = []\n\n  while (++rowIndex < cellMatrix.length) {\n    const row = cellMatrix[rowIndex]\n    const sizes = sizeMatrix[rowIndex]\n    columnIndex = -1\n    /** @type {Array<string>} */\n    const line = []\n\n    while (++columnIndex < mostCellsPerRow) {\n      const cell = row[columnIndex] || ''\n      let before = ''\n      let after = ''\n\n      if (options.alignDelimiters !== false) {\n        const size =\n          longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0)\n        const code = alignments[columnIndex]\n\n        if (code === 114 /* `r` */) {\n          before = ' '.repeat(size)\n        } else if (code === 99 /* `c` */) {\n          if (size % 2) {\n            before = ' '.repeat(size / 2 + 0.5)\n            after = ' '.repeat(size / 2 - 0.5)\n          } else {\n            before = ' '.repeat(size / 2)\n            after = before\n          }\n        } else {\n          after = ' '.repeat(size)\n        }\n      }\n\n      if (options.delimiterStart !== false && !columnIndex) {\n        line.push('|')\n      }\n\n      if (\n        options.padding !== false &&\n        // Don’t add the opening space if we’re not aligning and the cell is\n        // empty: there will be a closing space.\n        !(options.alignDelimiters === false && cell === '') &&\n        (options.delimiterStart !== false || columnIndex)\n      ) {\n        line.push(' ')\n      }\n\n      if (options.alignDelimiters !== false) {\n        line.push(before)\n      }\n\n      line.push(cell)\n\n      if (options.alignDelimiters !== false) {\n        line.push(after)\n      }\n\n      if (options.padding !== false) {\n        line.push(' ')\n      }\n\n      if (\n        options.delimiterEnd !== false ||\n        columnIndex !== mostCellsPerRow - 1\n      ) {\n        line.push('|')\n      }\n    }\n\n    lines.push(\n      options.delimiterEnd === false\n        ? line.join('').replace(/ +$/, '')\n        : line.join('')\n    )\n  }\n\n  return lines.join('\\n')\n}\n\n/**\n * @param {string|null|undefined} [value]\n * @returns {string}\n */\nfunction serialize(value) {\n  return value === null || value === undefined ? '' : String(value)\n}\n\n/**\n * @param {string} value\n * @returns {number}\n */\nfunction defaultStringLength(value) {\n  return value.length\n}\n\n/**\n * @param {string|null|undefined} value\n * @returns {number}\n */\nfunction toAlignment(value) {\n  const code = typeof value === 'string' ? value.codePointAt(0) : 0\n\n  return code === 67 /* `C` */ || code === 99 /* `c` */\n    ? 99 /* `c` */\n    : code === 76 /* `L` */ || code === 108 /* `l` */\n    ? 108 /* `l` */\n    : code === 82 /* `R` */ || code === 114 /* `r` */\n    ? 114 /* `r` */\n    : 0\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWFya2Rvd24tdGFibGUvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsa0RBQWtEO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDJCQUEyQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxREFBcUQ7QUFDaEU7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDTywwQ0FBMEM7QUFDakQ7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QjtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkM7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQSxhQUFhLGVBQWU7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVcsdUJBQXVCO0FBQ2xDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLHVCQUF1QjtBQUNsQyxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWFya2Rvd24tdGFibGUvaW5kZXguanM/ZGY4YiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIE9wdGlvbnNcbiAqICAgQ29uZmlndXJhdGlvbiAob3B0aW9uYWwpLlxuICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbHxSZWFkb25seUFycmF5PHN0cmluZ3xudWxsfHVuZGVmaW5lZD59IFthbGlnbl1cbiAqICAgT25lIHN0eWxlIGZvciBhbGwgY29sdW1ucywgb3Igc3R5bGVzIGZvciB0aGVpciByZXNwZWN0aXZlIGNvbHVtbnMuXG4gKiAgIEVhY2ggc3R5bGUgaXMgZWl0aGVyIGAnbCdgIChsZWZ0KSwgYCdyJ2AgKHJpZ2h0KSwgb3IgYCdjJ2AgKGNlbnRlcikuXG4gKiAgIE90aGVyIHZhbHVlcyBhcmUgdHJlYXRlZCBhcyBgJydgLCB3aGljaCBkb2VzbuKAmXQgcGxhY2UgdGhlIGNvbG9uIGluIHRoZVxuICogICBhbGlnbm1lbnQgcm93IGJ1dCBkb2VzIGFsaWduIGxlZnQuXG4gKiAgICpPbmx5IHRoZSBsb3dlcmNhc2VkIGZpcnN0IGNoYXJhY3RlciBpcyB1c2VkLCBzbyBgUmlnaHRgIGlzIGZpbmUuKlxuICogQHByb3BlcnR5IHtib29sZWFufSBbcGFkZGluZz10cnVlXVxuICogICBXaGV0aGVyIHRvIGFkZCBhIHNwYWNlIG9mIHBhZGRpbmcgYmV0d2VlbiBkZWxpbWl0ZXJzIGFuZCBjZWxscy5cbiAqXG4gKiAgIFdoZW4gYHRydWVgLCB0aGVyZSBpcyBwYWRkaW5nOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfCBBbHBoYSB8IEIgICAgIHxcbiAqICAgfCAtLS0tLSB8IC0tLS0tIHxcbiAqICAgfCBDICAgICB8IERlbHRhIHxcbiAqICAgYGBgXG4gKlxuICogICBXaGVuIGBmYWxzZWAsIHRoZXJlIGlzIG5vIHBhZGRpbmc6XG4gKlxuICogICBgYGBtYXJrZG93blxuICogICB8QWxwaGF8QiAgICB8XG4gKiAgIHwtLS0tLXwtLS0tLXxcbiAqICAgfEMgICAgfERlbHRhfFxuICogICBgYGBcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2RlbGltaXRlclN0YXJ0PXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gYmVnaW4gZWFjaCByb3cgd2l0aCB0aGUgZGVsaW1pdGVyLlxuICpcbiAqICAgPiDwn5GJICoqTm90ZSoqOiBwbGVhc2UgZG9u4oCZdCB1c2UgdGhpczogaXQgY291bGQgY3JlYXRlIGZyYWdpbGUgc3RydWN0dXJlc1xuICogICA+IHRoYXQgYXJlbuKAmXQgdW5kZXJzdGFuZGFibGUgdG8gc29tZSBtYXJrZG93biBwYXJzZXJzLlxuICpcbiAqICAgV2hlbiBgdHJ1ZWAsIHRoZXJlIGFyZSBzdGFydGluZyBkZWxpbWl0ZXJzOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfCBBbHBoYSB8IEIgICAgIHxcbiAqICAgfCAtLS0tLSB8IC0tLS0tIHxcbiAqICAgfCBDICAgICB8IERlbHRhIHxcbiAqICAgYGBgXG4gKlxuICogICBXaGVuIGBmYWxzZWAsIHRoZXJlIGFyZSBubyBzdGFydGluZyBkZWxpbWl0ZXJzOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgQWxwaGEgfCBCICAgICB8XG4gKiAgIC0tLS0tIHwgLS0tLS0gfFxuICogICBDICAgICB8IERlbHRhIHxcbiAqICAgYGBgXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtkZWxpbWl0ZXJFbmQ9dHJ1ZV1cbiAqICAgV2hldGhlciB0byBlbmQgZWFjaCByb3cgd2l0aCB0aGUgZGVsaW1pdGVyLlxuICpcbiAqICAgPiDwn5GJICoqTm90ZSoqOiBwbGVhc2UgZG9u4oCZdCB1c2UgdGhpczogaXQgY291bGQgY3JlYXRlIGZyYWdpbGUgc3RydWN0dXJlc1xuICogICA+IHRoYXQgYXJlbuKAmXQgdW5kZXJzdGFuZGFibGUgdG8gc29tZSBtYXJrZG93biBwYXJzZXJzLlxuICpcbiAqICAgV2hlbiBgdHJ1ZWAsIHRoZXJlIGFyZSBlbmRpbmcgZGVsaW1pdGVyczpcbiAqXG4gKiAgIGBgYG1hcmtkb3duXG4gKiAgIHwgQWxwaGEgfCBCICAgICB8XG4gKiAgIHwgLS0tLS0gfCAtLS0tLSB8XG4gKiAgIHwgQyAgICAgfCBEZWx0YSB8XG4gKiAgIGBgYFxuICpcbiAqICAgV2hlbiBgZmFsc2VgLCB0aGVyZSBhcmUgbm8gZW5kaW5nIGRlbGltaXRlcnM6XG4gKlxuICogICBgYGBtYXJrZG93blxuICogICB8IEFscGhhIHwgQlxuICogICB8IC0tLS0tIHwgLS0tLS1cbiAqICAgfCBDICAgICB8IERlbHRhXG4gKiAgIGBgYFxuICogQHByb3BlcnR5IHtib29sZWFufSBbYWxpZ25EZWxpbWl0ZXJzPXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGRlbGltaXRlcnMuXG4gKiAgIEJ5IGRlZmF1bHQsIHRoZXkgYXJlIGFsaWduZWQ6XG4gKlxuICogICBgYGBtYXJrZG93blxuICogICB8IEFscGhhIHwgQiAgICAgfFxuICogICB8IC0tLS0tIHwgLS0tLS0gfFxuICogICB8IEMgICAgIHwgRGVsdGEgfFxuICogICBgYGBcbiAqXG4gKiAgIFBhc3MgYGZhbHNlYCB0byBtYWtlIHRoZW0gc3RhZ2dlcmVkOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfCBBbHBoYSB8IEIgfFxuICogICB8IC0gfCAtIHxcbiAqICAgfCBDIHwgRGVsdGEgfFxuICogICBgYGBcbiAqIEBwcm9wZXJ0eSB7KHZhbHVlOiBzdHJpbmcpID0+IG51bWJlcn0gW3N0cmluZ0xlbmd0aF1cbiAqICAgRnVuY3Rpb24gdG8gZGV0ZWN0IHRoZSBsZW5ndGggb2YgdGFibGUgY2VsbCBjb250ZW50LlxuICogICBUaGlzIGlzIHVzZWQgd2hlbiBhbGlnbmluZyB0aGUgZGVsaW1pdGVycyAoYHxgKSBiZXR3ZWVuIHRhYmxlIGNlbGxzLlxuICogICBGdWxsLXdpZHRoIGNoYXJhY3RlcnMgYW5kIGVtb2ppIG1lc3MgdXAgZGVsaW1pdGVyIGFsaWdubWVudCB3aGVuIHZpZXdpbmdcbiAqICAgdGhlIG1hcmtkb3duIHNvdXJjZS5cbiAqICAgVG8gZml4IHRoaXMsIHlvdSBjYW4gcGFzcyB0aGlzIGZ1bmN0aW9uLCB3aGljaCByZWNlaXZlcyB0aGUgY2VsbCBjb250ZW50XG4gKiAgIGFuZCByZXR1cm5zIGl0cyDigJx2aXNpYmxl4oCdIHNpemUuXG4gKiAgIE5vdGUgdGhhdCB3aGF0IGlzIGFuZCBpc27igJl0IHZpc2libGUgZGVwZW5kcyBvbiB3aGVyZSB0aGUgdGV4dCBpcyBkaXNwbGF5ZWQuXG4gKlxuICogICBXaXRob3V0IHN1Y2ggYSBmdW5jdGlvbiwgdGhlIGZvbGxvd2luZzpcbiAqXG4gKiAgIGBgYGpzXG4gKiAgIG1hcmtkb3duVGFibGUoW1xuICogICAgIFsnQWxwaGEnLCAnQnJhdm8nXSxcbiAqICAgICBbJ+S4reaWhycsICdDaGFybGllJ10sXG4gKiAgICAgWyfwn5Gp4oCN4p2k77iP4oCN8J+RqScsICdEZWx0YSddXG4gKiAgIF0pXG4gKiAgIGBgYFxuICpcbiAqICAgWWllbGRzOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfCBBbHBoYSB8IEJyYXZvIHxcbiAqICAgfCAtIHwgLSB8XG4gKiAgIHwg5Lit5paHIHwgQ2hhcmxpZSB8XG4gKiAgIHwg8J+RqeKAjeKdpO+4j+KAjfCfkakgfCBEZWx0YSB8XG4gKiAgIGBgYFxuICpcbiAqICAgV2l0aCBbYHN0cmluZy13aWR0aGBdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvc3RyaW5nLXdpZHRoKTpcbiAqXG4gKiAgIGBgYGpzXG4gKiAgIGltcG9ydCBzdHJpbmdXaWR0aCBmcm9tICdzdHJpbmctd2lkdGgnXG4gKlxuICogICBtYXJrZG93blRhYmxlKFxuICogICAgIFtcbiAqICAgICAgIFsnQWxwaGEnLCAnQnJhdm8nXSxcbiAqICAgICAgIFsn5Lit5paHJywgJ0NoYXJsaWUnXSxcbiAqICAgICAgIFsn8J+RqeKAjeKdpO+4j+KAjfCfkaknLCAnRGVsdGEnXVxuICogICAgIF0sXG4gKiAgICAge3N0cmluZ0xlbmd0aDogc3RyaW5nV2lkdGh9XG4gKiAgIClcbiAqICAgYGBgXG4gKlxuICogICBZaWVsZHM6XG4gKlxuICogICBgYGBtYXJrZG93blxuICogICB8IEFscGhhIHwgQnJhdm8gICB8XG4gKiAgIHwgLS0tLS0gfCAtLS0tLS0tIHxcbiAqICAgfCDkuK3mlocgIHwgQ2hhcmxpZSB8XG4gKiAgIHwg8J+RqeKAjeKdpO+4j+KAjfCfkakgICAgfCBEZWx0YSAgIHxcbiAqICAgYGBgXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T3B0aW9uc30gTWFya2Rvd25UYWJsZU9wdGlvbnNcbiAqIEB0b2RvXG4gKiAgIFJlbW92ZSBuZXh0IG1ham9yLlxuICovXG5cbi8qKlxuICogR2VuZXJhdGUgYSBtYXJrZG93biAoW0dGTV0oaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vZW4vZ2l0aHViL3dyaXRpbmctb24tZ2l0aHViL3dvcmtpbmctd2l0aC1hZHZhbmNlZC1mb3JtYXR0aW5nL29yZ2FuaXppbmctaW5mb3JtYXRpb24td2l0aC10YWJsZXMpKSB0YWJsZS4uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seUFycmF5PFJlYWRvbmx5QXJyYXk8c3RyaW5nfG51bGx8dW5kZWZpbmVkPj59IHRhYmxlXG4gKiAgIFRhYmxlIGRhdGEgKG1hdHJpeCBvZiBzdHJpbmdzKS5cbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24gKG9wdGlvbmFsKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrZG93blRhYmxlKHRhYmxlLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgYWxpZ24gPSAob3B0aW9ucy5hbGlnbiB8fCBbXSkuY29uY2F0KClcbiAgY29uc3Qgc3RyaW5nTGVuZ3RoID0gb3B0aW9ucy5zdHJpbmdMZW5ndGggfHwgZGVmYXVsdFN0cmluZ0xlbmd0aFxuICAvKiogQHR5cGUge0FycmF5PG51bWJlcj59IENoYXJhY3RlciBjb2RlcyBhcyBzeW1ib2xzIGZvciBhbGlnbm1lbnQgcGVyIGNvbHVtbi4gKi9cbiAgY29uc3QgYWxpZ25tZW50cyA9IFtdXG4gIC8qKiBAdHlwZSB7QXJyYXk8QXJyYXk8c3RyaW5nPj59IENlbGxzIHBlciByb3cuICovXG4gIGNvbnN0IGNlbGxNYXRyaXggPSBbXVxuICAvKiogQHR5cGUge0FycmF5PEFycmF5PG51bWJlcj4+fSBTaXplcyBvZiBlYWNoIGNlbGwgcGVyIHJvdy4gKi9cbiAgY29uc3Qgc2l6ZU1hdHJpeCA9IFtdXG4gIC8qKiBAdHlwZSB7QXJyYXk8bnVtYmVyPn0gKi9cbiAgY29uc3QgbG9uZ2VzdENlbGxCeUNvbHVtbiA9IFtdXG4gIGxldCBtb3N0Q2VsbHNQZXJSb3cgPSAwXG4gIGxldCByb3dJbmRleCA9IC0xXG5cbiAgLy8gVGhpcyBpcyBhIHN1cGVyZmx1b3VzIGxvb3AgaWYgd2UgZG9u4oCZdCBhbGlnbiBkZWxpbWl0ZXJzLCBidXQgb3RoZXJ3aXNlIHdl4oCZZFxuICAvLyBkbyBzdXBlcmZsdW91cyB3b3JrIHdoZW4gYWxpZ25pbmcsIHNvIG9wdGltaXplIGZvciBhbGlnbmluZy5cbiAgd2hpbGUgKCsrcm93SW5kZXggPCB0YWJsZS5sZW5ndGgpIHtcbiAgICAvKiogQHR5cGUge0FycmF5PHN0cmluZz59ICovXG4gICAgY29uc3Qgcm93ID0gW11cbiAgICAvKiogQHR5cGUge0FycmF5PG51bWJlcj59ICovXG4gICAgY29uc3Qgc2l6ZXMgPSBbXVxuICAgIGxldCBjb2x1bW5JbmRleCA9IC0xXG5cbiAgICBpZiAodGFibGVbcm93SW5kZXhdLmxlbmd0aCA+IG1vc3RDZWxsc1BlclJvdykge1xuICAgICAgbW9zdENlbGxzUGVyUm93ID0gdGFibGVbcm93SW5kZXhdLmxlbmd0aFxuICAgIH1cblxuICAgIHdoaWxlICgrK2NvbHVtbkluZGV4IDwgdGFibGVbcm93SW5kZXhdLmxlbmd0aCkge1xuICAgICAgY29uc3QgY2VsbCA9IHNlcmlhbGl6ZSh0YWJsZVtyb3dJbmRleF1bY29sdW1uSW5kZXhdKVxuXG4gICAgICBpZiAob3B0aW9ucy5hbGlnbkRlbGltaXRlcnMgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBzdHJpbmdMZW5ndGgoY2VsbClcbiAgICAgICAgc2l6ZXNbY29sdW1uSW5kZXhdID0gc2l6ZVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBsb25nZXN0Q2VsbEJ5Q29sdW1uW2NvbHVtbkluZGV4XSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgc2l6ZSA+IGxvbmdlc3RDZWxsQnlDb2x1bW5bY29sdW1uSW5kZXhdXG4gICAgICAgICkge1xuICAgICAgICAgIGxvbmdlc3RDZWxsQnlDb2x1bW5bY29sdW1uSW5kZXhdID0gc2l6ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJvdy5wdXNoKGNlbGwpXG4gICAgfVxuXG4gICAgY2VsbE1hdHJpeFtyb3dJbmRleF0gPSByb3dcbiAgICBzaXplTWF0cml4W3Jvd0luZGV4XSA9IHNpemVzXG4gIH1cblxuICAvLyBGaWd1cmUgb3V0IHdoaWNoIGFsaWdubWVudHMgdG8gdXNlLlxuICBsZXQgY29sdW1uSW5kZXggPSAtMVxuXG4gIGlmICh0eXBlb2YgYWxpZ24gPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIGFsaWduKSB7XG4gICAgd2hpbGUgKCsrY29sdW1uSW5kZXggPCBtb3N0Q2VsbHNQZXJSb3cpIHtcbiAgICAgIGFsaWdubWVudHNbY29sdW1uSW5kZXhdID0gdG9BbGlnbm1lbnQoYWxpZ25bY29sdW1uSW5kZXhdKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjb2RlID0gdG9BbGlnbm1lbnQoYWxpZ24pXG5cbiAgICB3aGlsZSAoKytjb2x1bW5JbmRleCA8IG1vc3RDZWxsc1BlclJvdykge1xuICAgICAgYWxpZ25tZW50c1tjb2x1bW5JbmRleF0gPSBjb2RlXG4gICAgfVxuICB9XG5cbiAgLy8gSW5qZWN0IHRoZSBhbGlnbm1lbnQgcm93LlxuICBjb2x1bW5JbmRleCA9IC0xXG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3Qgcm93ID0gW11cbiAgLyoqIEB0eXBlIHtBcnJheTxudW1iZXI+fSAqL1xuICBjb25zdCBzaXplcyA9IFtdXG5cbiAgd2hpbGUgKCsrY29sdW1uSW5kZXggPCBtb3N0Q2VsbHNQZXJSb3cpIHtcbiAgICBjb25zdCBjb2RlID0gYWxpZ25tZW50c1tjb2x1bW5JbmRleF1cbiAgICBsZXQgYmVmb3JlID0gJydcbiAgICBsZXQgYWZ0ZXIgPSAnJ1xuXG4gICAgaWYgKGNvZGUgPT09IDk5IC8qIGBjYCAqLykge1xuICAgICAgYmVmb3JlID0gJzonXG4gICAgICBhZnRlciA9ICc6J1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMTA4IC8qIGBsYCAqLykge1xuICAgICAgYmVmb3JlID0gJzonXG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAxMTQgLyogYHJgICovKSB7XG4gICAgICBhZnRlciA9ICc6J1xuICAgIH1cblxuICAgIC8vIFRoZXJlICptdXN0KiBiZSBhdCBsZWFzdCBvbmUgaHlwaGVuLW1pbnVzIGluIGVhY2ggYWxpZ25tZW50IGNlbGwuXG4gICAgbGV0IHNpemUgPVxuICAgICAgb3B0aW9ucy5hbGlnbkRlbGltaXRlcnMgPT09IGZhbHNlXG4gICAgICAgID8gMVxuICAgICAgICA6IE1hdGgubWF4KFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIGxvbmdlc3RDZWxsQnlDb2x1bW5bY29sdW1uSW5kZXhdIC0gYmVmb3JlLmxlbmd0aCAtIGFmdGVyLmxlbmd0aFxuICAgICAgICAgIClcblxuICAgIGNvbnN0IGNlbGwgPSBiZWZvcmUgKyAnLScucmVwZWF0KHNpemUpICsgYWZ0ZXJcblxuICAgIGlmIChvcHRpb25zLmFsaWduRGVsaW1pdGVycyAhPT0gZmFsc2UpIHtcbiAgICAgIHNpemUgPSBiZWZvcmUubGVuZ3RoICsgc2l6ZSArIGFmdGVyLmxlbmd0aFxuXG4gICAgICBpZiAoc2l6ZSA+IGxvbmdlc3RDZWxsQnlDb2x1bW5bY29sdW1uSW5kZXhdKSB7XG4gICAgICAgIGxvbmdlc3RDZWxsQnlDb2x1bW5bY29sdW1uSW5kZXhdID0gc2l6ZVxuICAgICAgfVxuXG4gICAgICBzaXplc1tjb2x1bW5JbmRleF0gPSBzaXplXG4gICAgfVxuXG4gICAgcm93W2NvbHVtbkluZGV4XSA9IGNlbGxcbiAgfVxuXG4gIC8vIEluamVjdCB0aGUgYWxpZ25tZW50IHJvdy5cbiAgY2VsbE1hdHJpeC5zcGxpY2UoMSwgMCwgcm93KVxuICBzaXplTWF0cml4LnNwbGljZSgxLCAwLCBzaXplcylcblxuICByb3dJbmRleCA9IC0xXG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3QgbGluZXMgPSBbXVxuXG4gIHdoaWxlICgrK3Jvd0luZGV4IDwgY2VsbE1hdHJpeC5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSBjZWxsTWF0cml4W3Jvd0luZGV4XVxuICAgIGNvbnN0IHNpemVzID0gc2l6ZU1hdHJpeFtyb3dJbmRleF1cbiAgICBjb2x1bW5JbmRleCA9IC0xXG4gICAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICAgIGNvbnN0IGxpbmUgPSBbXVxuXG4gICAgd2hpbGUgKCsrY29sdW1uSW5kZXggPCBtb3N0Q2VsbHNQZXJSb3cpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSByb3dbY29sdW1uSW5kZXhdIHx8ICcnXG4gICAgICBsZXQgYmVmb3JlID0gJydcbiAgICAgIGxldCBhZnRlciA9ICcnXG5cbiAgICAgIGlmIChvcHRpb25zLmFsaWduRGVsaW1pdGVycyAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9XG4gICAgICAgICAgbG9uZ2VzdENlbGxCeUNvbHVtbltjb2x1bW5JbmRleF0gLSAoc2l6ZXNbY29sdW1uSW5kZXhdIHx8IDApXG4gICAgICAgIGNvbnN0IGNvZGUgPSBhbGlnbm1lbnRzW2NvbHVtbkluZGV4XVxuXG4gICAgICAgIGlmIChjb2RlID09PSAxMTQgLyogYHJgICovKSB7XG4gICAgICAgICAgYmVmb3JlID0gJyAnLnJlcGVhdChzaXplKVxuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDk5IC8qIGBjYCAqLykge1xuICAgICAgICAgIGlmIChzaXplICUgMikge1xuICAgICAgICAgICAgYmVmb3JlID0gJyAnLnJlcGVhdChzaXplIC8gMiArIDAuNSlcbiAgICAgICAgICAgIGFmdGVyID0gJyAnLnJlcGVhdChzaXplIC8gMiAtIDAuNSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmVmb3JlID0gJyAnLnJlcGVhdChzaXplIC8gMilcbiAgICAgICAgICAgIGFmdGVyID0gYmVmb3JlXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFmdGVyID0gJyAnLnJlcGVhdChzaXplKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmRlbGltaXRlclN0YXJ0ICE9PSBmYWxzZSAmJiAhY29sdW1uSW5kZXgpIHtcbiAgICAgICAgbGluZS5wdXNoKCd8JylcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBvcHRpb25zLnBhZGRpbmcgIT09IGZhbHNlICYmXG4gICAgICAgIC8vIERvbuKAmXQgYWRkIHRoZSBvcGVuaW5nIHNwYWNlIGlmIHdl4oCZcmUgbm90IGFsaWduaW5nIGFuZCB0aGUgY2VsbCBpc1xuICAgICAgICAvLyBlbXB0eTogdGhlcmUgd2lsbCBiZSBhIGNsb3Npbmcgc3BhY2UuXG4gICAgICAgICEob3B0aW9ucy5hbGlnbkRlbGltaXRlcnMgPT09IGZhbHNlICYmIGNlbGwgPT09ICcnKSAmJlxuICAgICAgICAob3B0aW9ucy5kZWxpbWl0ZXJTdGFydCAhPT0gZmFsc2UgfHwgY29sdW1uSW5kZXgpXG4gICAgICApIHtcbiAgICAgICAgbGluZS5wdXNoKCcgJylcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuYWxpZ25EZWxpbWl0ZXJzICE9PSBmYWxzZSkge1xuICAgICAgICBsaW5lLnB1c2goYmVmb3JlKVxuICAgICAgfVxuXG4gICAgICBsaW5lLnB1c2goY2VsbClcblxuICAgICAgaWYgKG9wdGlvbnMuYWxpZ25EZWxpbWl0ZXJzICE9PSBmYWxzZSkge1xuICAgICAgICBsaW5lLnB1c2goYWZ0ZXIpXG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLnBhZGRpbmcgIT09IGZhbHNlKSB7XG4gICAgICAgIGxpbmUucHVzaCgnICcpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgb3B0aW9ucy5kZWxpbWl0ZXJFbmQgIT09IGZhbHNlIHx8XG4gICAgICAgIGNvbHVtbkluZGV4ICE9PSBtb3N0Q2VsbHNQZXJSb3cgLSAxXG4gICAgICApIHtcbiAgICAgICAgbGluZS5wdXNoKCd8JylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaW5lcy5wdXNoKFxuICAgICAgb3B0aW9ucy5kZWxpbWl0ZXJFbmQgPT09IGZhbHNlXG4gICAgICAgID8gbGluZS5qb2luKCcnKS5yZXBsYWNlKC8gKyQvLCAnJylcbiAgICAgICAgOiBsaW5lLmpvaW4oJycpXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8bnVsbHx1bmRlZmluZWR9IFt2YWx1ZV1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/ICcnIDogU3RyaW5nKHZhbHVlKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFN0cmluZ0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUubGVuZ3RoXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8bnVsbHx1bmRlZmluZWR9IHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiB0b0FsaWdubWVudCh2YWx1ZSkge1xuICBjb25zdCBjb2RlID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlLmNvZGVQb2ludEF0KDApIDogMFxuXG4gIHJldHVybiBjb2RlID09PSA2NyAvKiBgQ2AgKi8gfHwgY29kZSA9PT0gOTkgLyogYGNgICovXG4gICAgPyA5OSAvKiBgY2AgKi9cbiAgICA6IGNvZGUgPT09IDc2IC8qIGBMYCAqLyB8fCBjb2RlID09PSAxMDggLyogYGxgICovXG4gICAgPyAxMDggLyogYGxgICovXG4gICAgOiBjb2RlID09PSA4MiAvKiBgUmAgKi8gfHwgY29kZSA9PT0gMTE0IC8qIGByYCAqL1xuICAgID8gMTE0IC8qIGByYCAqL1xuICAgIDogMFxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/markdown-table/index.js\n");

/***/ })

};
;