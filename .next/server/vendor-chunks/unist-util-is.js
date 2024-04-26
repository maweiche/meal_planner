"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unist-util-is";
exports.ids = ["vendor-chunks/unist-util-is"];
exports.modules = {

/***/ "(ssr)/./node_modules/unist-util-is/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/unist-util-is/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   convert: () => (/* binding */ convert),\n/* harmony export */   is: () => (/* binding */ is)\n/* harmony export */ });\n/**\n * @typedef {import('unist').Node} Node\n * @typedef {import('unist').Parent} Parent\n */\n\n/**\n * @typedef {Record<string, unknown>} Props\n * @typedef {null | undefined | string | Props | TestFunctionAnything | Array<string | Props | TestFunctionAnything>} Test\n *   Check for an arbitrary node, unaware of TypeScript inferral.\n *\n * @callback TestFunctionAnything\n *   Check if a node passes a test, unaware of TypeScript inferral.\n * @param {unknown} this\n *   The given context.\n * @param {Node} node\n *   A node.\n * @param {number | null | undefined} [index]\n *   The node’s position in its parent.\n * @param {Parent | null | undefined} [parent]\n *   The node’s parent.\n * @returns {boolean | void}\n *   Whether this node passes the test.\n */\n\n/**\n * @template {Node} Kind\n *   Node type.\n * @typedef {Kind['type'] | Partial<Kind> | TestFunctionPredicate<Kind> | Array<Kind['type'] | Partial<Kind> | TestFunctionPredicate<Kind>>} PredicateTest\n *   Check for a node that can be inferred by TypeScript.\n */\n\n/**\n * Check if a node passes a certain test.\n *\n * @template {Node} Kind\n *   Node type.\n * @callback TestFunctionPredicate\n *   Complex test function for a node that can be inferred by TypeScript.\n * @param {Node} node\n *   A node.\n * @param {number | null | undefined} [index]\n *   The node’s position in its parent.\n * @param {Parent | null | undefined} [parent]\n *   The node’s parent.\n * @returns {node is Kind}\n *   Whether this node passes the test.\n */\n\n/**\n * @callback AssertAnything\n *   Check that an arbitrary value is a node, unaware of TypeScript inferral.\n * @param {unknown} [node]\n *   Anything (typically a node).\n * @param {number | null | undefined} [index]\n *   The node’s position in its parent.\n * @param {Parent | null | undefined} [parent]\n *   The node’s parent.\n * @returns {boolean}\n *   Whether this is a node and passes a test.\n */\n\n/**\n * Check if a node is a node and passes a certain node test.\n *\n * @template {Node} Kind\n *   Node type.\n * @callback AssertPredicate\n *   Check that an arbitrary value is a specific node, aware of TypeScript.\n * @param {unknown} [node]\n *   Anything (typically a node).\n * @param {number | null | undefined} [index]\n *   The node’s position in its parent.\n * @param {Parent | null | undefined} [parent]\n *   The node’s parent.\n * @returns {node is Kind}\n *   Whether this is a node and passes a test.\n */\n\n/**\n * Check if `node` is a `Node` and whether it passes the given test.\n *\n * @param node\n *   Thing to check, typically `Node`.\n * @param test\n *   A check for a specific node.\n * @param index\n *   The node’s position in its parent.\n * @param parent\n *   The node’s parent.\n * @returns\n *   Whether `node` is a node and passes a test.\n */\nconst is =\n  /**\n   * @type {(\n   *   (() => false) &\n   *   (<Kind extends Node = Node>(node: unknown, test: PredicateTest<Kind>, index: number, parent: Parent, context?: unknown) => node is Kind) &\n   *   (<Kind extends Node = Node>(node: unknown, test: PredicateTest<Kind>, index?: null | undefined, parent?: null | undefined, context?: unknown) => node is Kind) &\n   *   ((node: unknown, test: Test, index: number, parent: Parent, context?: unknown) => boolean) &\n   *   ((node: unknown, test?: Test, index?: null | undefined, parent?: null | undefined, context?: unknown) => boolean)\n   * )}\n   */\n  (\n    /**\n     * @param {unknown} [node]\n     * @param {Test} [test]\n     * @param {number | null | undefined} [index]\n     * @param {Parent | null | undefined} [parent]\n     * @param {unknown} [context]\n     * @returns {boolean}\n     */\n    // eslint-disable-next-line max-params\n    function is(node, test, index, parent, context) {\n      const check = convert(test)\n\n      if (\n        index !== undefined &&\n        index !== null &&\n        (typeof index !== 'number' ||\n          index < 0 ||\n          index === Number.POSITIVE_INFINITY)\n      ) {\n        throw new Error('Expected positive finite index')\n      }\n\n      if (\n        parent !== undefined &&\n        parent !== null &&\n        (!is(parent) || !parent.children)\n      ) {\n        throw new Error('Expected parent node')\n      }\n\n      if (\n        (parent === undefined || parent === null) !==\n        (index === undefined || index === null)\n      ) {\n        throw new Error('Expected both parent and index')\n      }\n\n      // @ts-expect-error Looks like a node.\n      return node && node.type && typeof node.type === 'string'\n        ? Boolean(check.call(context, node, index, parent))\n        : false\n    }\n  )\n\n/**\n * Generate an assertion from a test.\n *\n * Useful if you’re going to test many nodes, for example when creating a\n * utility where something else passes a compatible test.\n *\n * The created function is a bit faster because it expects valid input only:\n * a `node`, `index`, and `parent`.\n *\n * @param test\n *   *   when nullish, checks if `node` is a `Node`.\n *   *   when `string`, works like passing `(node) => node.type === test`.\n *   *   when `function` checks if function passed the node is true.\n *   *   when `object`, checks that all keys in test are in node, and that they have (strictly) equal values.\n *   *   when `array`, checks if any one of the subtests pass.\n * @returns\n *   An assertion.\n */\nconst convert =\n  /**\n   * @type {(\n   *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &\n   *   ((test?: Test) => AssertAnything)\n   * )}\n   */\n  (\n    /**\n     * @param {Test} [test]\n     * @returns {AssertAnything}\n     */\n    function (test) {\n      if (test === undefined || test === null) {\n        return ok\n      }\n\n      if (typeof test === 'string') {\n        return typeFactory(test)\n      }\n\n      if (typeof test === 'object') {\n        return Array.isArray(test) ? anyFactory(test) : propsFactory(test)\n      }\n\n      if (typeof test === 'function') {\n        return castFactory(test)\n      }\n\n      throw new Error('Expected function, string, or object as test')\n    }\n  )\n\n/**\n * @param {Array<string | Props | TestFunctionAnything>} tests\n * @returns {AssertAnything}\n */\nfunction anyFactory(tests) {\n  /** @type {Array<AssertAnything>} */\n  const checks = []\n  let index = -1\n\n  while (++index < tests.length) {\n    checks[index] = convert(tests[index])\n  }\n\n  return castFactory(any)\n\n  /**\n   * @this {unknown}\n   * @param {Array<unknown>} parameters\n   * @returns {boolean}\n   */\n  function any(...parameters) {\n    let index = -1\n\n    while (++index < checks.length) {\n      if (checks[index].call(this, ...parameters)) return true\n    }\n\n    return false\n  }\n}\n\n/**\n * Turn an object into a test for a node with a certain fields.\n *\n * @param {Props} check\n * @returns {AssertAnything}\n */\nfunction propsFactory(check) {\n  return castFactory(all)\n\n  /**\n   * @param {Node} node\n   * @returns {boolean}\n   */\n  function all(node) {\n    /** @type {string} */\n    let key\n\n    for (key in check) {\n      // @ts-expect-error: hush, it sure works as an index.\n      if (node[key] !== check[key]) return false\n    }\n\n    return true\n  }\n}\n\n/**\n * Turn a string into a test for a node with a certain type.\n *\n * @param {string} check\n * @returns {AssertAnything}\n */\nfunction typeFactory(check) {\n  return castFactory(type)\n\n  /**\n   * @param {Node} node\n   */\n  function type(node) {\n    return node && node.type === check\n  }\n}\n\n/**\n * Turn a custom test into a test for a node that passes that test.\n *\n * @param {TestFunctionAnything} check\n * @returns {AssertAnything}\n */\nfunction castFactory(check) {\n  return assertion\n\n  /**\n   * @this {unknown}\n   * @param {unknown} node\n   * @param {Array<unknown>} parameters\n   * @returns {boolean}\n   */\n  function assertion(node, ...parameters) {\n    return Boolean(\n      node &&\n        typeof node === 'object' &&\n        'type' in node &&\n        // @ts-expect-error: fine.\n        Boolean(check.call(this, node, ...parameters))\n    )\n  }\n}\n\nfunction ok() {\n  return true\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdW5pc3QtdXRpbC1pcy9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsd0JBQXdCO0FBQ3JDOztBQUVBO0FBQ0EsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSx5R0FBeUc7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QztBQUNBLFdBQVcsMkJBQTJCO0FBQ3RDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQSxhQUFhLGdJQUFnSTtBQUM3STtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QztBQUNBLFdBQVcsMkJBQTJCO0FBQ3RDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVywyQkFBMkI7QUFDdEM7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QztBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QztBQUNBLFdBQVcsMkJBQTJCO0FBQ3RDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsTUFBTTtBQUNyQixlQUFlLDJCQUEyQjtBQUMxQyxlQUFlLDJCQUEyQjtBQUMxQyxlQUFlLFNBQVM7QUFDeEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsOENBQThDO0FBQ3pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYSx1QkFBdUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxZQUFZO0FBQ1osYUFBYSxnQkFBZ0I7QUFDN0IsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGVBQWU7QUFDZjtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsc0JBQXNCO0FBQ2pDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1osYUFBYSxTQUFTO0FBQ3RCLGFBQWEsZ0JBQWdCO0FBQzdCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlzdC11dGlsLWlzL2xpYi9pbmRleC5qcz8zMTk2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgndW5pc3QnKS5Ob2RlfSBOb2RlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCd1bmlzdCcpLlBhcmVudH0gUGFyZW50XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7UmVjb3JkPHN0cmluZywgdW5rbm93bj59IFByb3BzXG4gKiBAdHlwZWRlZiB7bnVsbCB8IHVuZGVmaW5lZCB8IHN0cmluZyB8IFByb3BzIHwgVGVzdEZ1bmN0aW9uQW55dGhpbmcgfCBBcnJheTxzdHJpbmcgfCBQcm9wcyB8IFRlc3RGdW5jdGlvbkFueXRoaW5nPn0gVGVzdFxuICogICBDaGVjayBmb3IgYW4gYXJiaXRyYXJ5IG5vZGUsIHVuYXdhcmUgb2YgVHlwZVNjcmlwdCBpbmZlcnJhbC5cbiAqXG4gKiBAY2FsbGJhY2sgVGVzdEZ1bmN0aW9uQW55dGhpbmdcbiAqICAgQ2hlY2sgaWYgYSBub2RlIHBhc3NlcyBhIHRlc3QsIHVuYXdhcmUgb2YgVHlwZVNjcmlwdCBpbmZlcnJhbC5cbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpc1xuICogICBUaGUgZ2l2ZW4gY29udGV4dC5cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogICBBIG5vZGUuXG4gKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtpbmRleF1cbiAqICAgVGhlIG5vZGXigJlzIHBvc2l0aW9uIGluIGl0cyBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudCB8IG51bGwgfCB1bmRlZmluZWR9IFtwYXJlbnRdXG4gKiAgIFRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbiB8IHZvaWR9XG4gKiAgIFdoZXRoZXIgdGhpcyBub2RlIHBhc3NlcyB0aGUgdGVzdC5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7Tm9kZX0gS2luZFxuICogICBOb2RlIHR5cGUuXG4gKiBAdHlwZWRlZiB7S2luZFsndHlwZSddIHwgUGFydGlhbDxLaW5kPiB8IFRlc3RGdW5jdGlvblByZWRpY2F0ZTxLaW5kPiB8IEFycmF5PEtpbmRbJ3R5cGUnXSB8IFBhcnRpYWw8S2luZD4gfCBUZXN0RnVuY3Rpb25QcmVkaWNhdGU8S2luZD4+fSBQcmVkaWNhdGVUZXN0XG4gKiAgIENoZWNrIGZvciBhIG5vZGUgdGhhdCBjYW4gYmUgaW5mZXJyZWQgYnkgVHlwZVNjcmlwdC5cbiAqL1xuXG4vKipcbiAqIENoZWNrIGlmIGEgbm9kZSBwYXNzZXMgYSBjZXJ0YWluIHRlc3QuXG4gKlxuICogQHRlbXBsYXRlIHtOb2RlfSBLaW5kXG4gKiAgIE5vZGUgdHlwZS5cbiAqIEBjYWxsYmFjayBUZXN0RnVuY3Rpb25QcmVkaWNhdGVcbiAqICAgQ29tcGxleCB0ZXN0IGZ1bmN0aW9uIGZvciBhIG5vZGUgdGhhdCBjYW4gYmUgaW5mZXJyZWQgYnkgVHlwZVNjcmlwdC5cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogICBBIG5vZGUuXG4gKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtpbmRleF1cbiAqICAgVGhlIG5vZGXigJlzIHBvc2l0aW9uIGluIGl0cyBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudCB8IG51bGwgfCB1bmRlZmluZWR9IFtwYXJlbnRdXG4gKiAgIFRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gKiBAcmV0dXJucyB7bm9kZSBpcyBLaW5kfVxuICogICBXaGV0aGVyIHRoaXMgbm9kZSBwYXNzZXMgdGhlIHRlc3QuXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgQXNzZXJ0QW55dGhpbmdcbiAqICAgQ2hlY2sgdGhhdCBhbiBhcmJpdHJhcnkgdmFsdWUgaXMgYSBub2RlLCB1bmF3YXJlIG9mIFR5cGVTY3JpcHQgaW5mZXJyYWwuXG4gKiBAcGFyYW0ge3Vua25vd259IFtub2RlXVxuICogICBBbnl0aGluZyAodHlwaWNhbGx5IGEgbm9kZSkuXG4gKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtpbmRleF1cbiAqICAgVGhlIG5vZGXigJlzIHBvc2l0aW9uIGluIGl0cyBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudCB8IG51bGwgfCB1bmRlZmluZWR9IFtwYXJlbnRdXG4gKiAgIFRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGlzIGlzIGEgbm9kZSBhbmQgcGFzc2VzIGEgdGVzdC5cbiAqL1xuXG4vKipcbiAqIENoZWNrIGlmIGEgbm9kZSBpcyBhIG5vZGUgYW5kIHBhc3NlcyBhIGNlcnRhaW4gbm9kZSB0ZXN0LlxuICpcbiAqIEB0ZW1wbGF0ZSB7Tm9kZX0gS2luZFxuICogICBOb2RlIHR5cGUuXG4gKiBAY2FsbGJhY2sgQXNzZXJ0UHJlZGljYXRlXG4gKiAgIENoZWNrIHRoYXQgYW4gYXJiaXRyYXJ5IHZhbHVlIGlzIGEgc3BlY2lmaWMgbm9kZSwgYXdhcmUgb2YgVHlwZVNjcmlwdC5cbiAqIEBwYXJhbSB7dW5rbm93bn0gW25vZGVdXG4gKiAgIEFueXRoaW5nICh0eXBpY2FsbHkgYSBub2RlKS5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2luZGV4XVxuICogICBUaGUgbm9kZeKAmXMgcG9zaXRpb24gaW4gaXRzIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gW3BhcmVudF1cbiAqICAgVGhlIG5vZGXigJlzIHBhcmVudC5cbiAqIEByZXR1cm5zIHtub2RlIGlzIEtpbmR9XG4gKiAgIFdoZXRoZXIgdGhpcyBpcyBhIG5vZGUgYW5kIHBhc3NlcyBhIHRlc3QuXG4gKi9cblxuLyoqXG4gKiBDaGVjayBpZiBgbm9kZWAgaXMgYSBgTm9kZWAgYW5kIHdoZXRoZXIgaXQgcGFzc2VzIHRoZSBnaXZlbiB0ZXN0LlxuICpcbiAqIEBwYXJhbSBub2RlXG4gKiAgIFRoaW5nIHRvIGNoZWNrLCB0eXBpY2FsbHkgYE5vZGVgLlxuICogQHBhcmFtIHRlc3RcbiAqICAgQSBjaGVjayBmb3IgYSBzcGVjaWZpYyBub2RlLlxuICogQHBhcmFtIGluZGV4XG4gKiAgIFRoZSBub2Rl4oCZcyBwb3NpdGlvbiBpbiBpdHMgcGFyZW50LlxuICogQHBhcmFtIHBhcmVudFxuICogICBUaGUgbm9kZeKAmXMgcGFyZW50LlxuICogQHJldHVybnNcbiAqICAgV2hldGhlciBgbm9kZWAgaXMgYSBub2RlIGFuZCBwYXNzZXMgYSB0ZXN0LlxuICovXG5leHBvcnQgY29uc3QgaXMgPVxuICAvKipcbiAgICogQHR5cGUgeyhcbiAgICogICAoKCkgPT4gZmFsc2UpICZcbiAgICogICAoPEtpbmQgZXh0ZW5kcyBOb2RlID0gTm9kZT4obm9kZTogdW5rbm93biwgdGVzdDogUHJlZGljYXRlVGVzdDxLaW5kPiwgaW5kZXg6IG51bWJlciwgcGFyZW50OiBQYXJlbnQsIGNvbnRleHQ/OiB1bmtub3duKSA9PiBub2RlIGlzIEtpbmQpICZcbiAgICogICAoPEtpbmQgZXh0ZW5kcyBOb2RlID0gTm9kZT4obm9kZTogdW5rbm93biwgdGVzdDogUHJlZGljYXRlVGVzdDxLaW5kPiwgaW5kZXg/OiBudWxsIHwgdW5kZWZpbmVkLCBwYXJlbnQ/OiBudWxsIHwgdW5kZWZpbmVkLCBjb250ZXh0PzogdW5rbm93bikgPT4gbm9kZSBpcyBLaW5kKSAmXG4gICAqICAgKChub2RlOiB1bmtub3duLCB0ZXN0OiBUZXN0LCBpbmRleDogbnVtYmVyLCBwYXJlbnQ6IFBhcmVudCwgY29udGV4dD86IHVua25vd24pID0+IGJvb2xlYW4pICZcbiAgICogICAoKG5vZGU6IHVua25vd24sIHRlc3Q/OiBUZXN0LCBpbmRleD86IG51bGwgfCB1bmRlZmluZWQsIHBhcmVudD86IG51bGwgfCB1bmRlZmluZWQsIGNvbnRleHQ/OiB1bmtub3duKSA9PiBib29sZWFuKVxuICAgKiApfVxuICAgKi9cbiAgKFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7dW5rbm93bn0gW25vZGVdXG4gICAgICogQHBhcmFtIHtUZXN0fSBbdGVzdF1cbiAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtpbmRleF1cbiAgICAgKiBAcGFyYW0ge1BhcmVudCB8IG51bGwgfCB1bmRlZmluZWR9IFtwYXJlbnRdXG4gICAgICogQHBhcmFtIHt1bmtub3dufSBbY29udGV4dF1cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xuICAgIGZ1bmN0aW9uIGlzKG5vZGUsIHRlc3QsIGluZGV4LCBwYXJlbnQsIGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNoZWNrID0gY29udmVydCh0ZXN0KVxuXG4gICAgICBpZiAoXG4gICAgICAgIGluZGV4ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgaW5kZXggIT09IG51bGwgJiZcbiAgICAgICAgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgICBpbmRleCA8IDAgfHxcbiAgICAgICAgICBpbmRleCA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgcG9zaXRpdmUgZmluaXRlIGluZGV4JylcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBwYXJlbnQgIT09IG51bGwgJiZcbiAgICAgICAgKCFpcyhwYXJlbnQpIHx8ICFwYXJlbnQuY2hpbGRyZW4pXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBwYXJlbnQgbm9kZScpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHBhcmVudCA9PT0gdW5kZWZpbmVkIHx8IHBhcmVudCA9PT0gbnVsbCkgIT09XG4gICAgICAgIChpbmRleCA9PT0gdW5kZWZpbmVkIHx8IGluZGV4ID09PSBudWxsKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYm90aCBwYXJlbnQgYW5kIGluZGV4JylcbiAgICAgIH1cblxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBMb29rcyBsaWtlIGEgbm9kZS5cbiAgICAgIHJldHVybiBub2RlICYmIG5vZGUudHlwZSAmJiB0eXBlb2Ygbm9kZS50eXBlID09PSAnc3RyaW5nJ1xuICAgICAgICA/IEJvb2xlYW4oY2hlY2suY2FsbChjb250ZXh0LCBub2RlLCBpbmRleCwgcGFyZW50KSlcbiAgICAgICAgOiBmYWxzZVxuICAgIH1cbiAgKVxuXG4vKipcbiAqIEdlbmVyYXRlIGFuIGFzc2VydGlvbiBmcm9tIGEgdGVzdC5cbiAqXG4gKiBVc2VmdWwgaWYgeW914oCZcmUgZ29pbmcgdG8gdGVzdCBtYW55IG5vZGVzLCBmb3IgZXhhbXBsZSB3aGVuIGNyZWF0aW5nIGFcbiAqIHV0aWxpdHkgd2hlcmUgc29tZXRoaW5nIGVsc2UgcGFzc2VzIGEgY29tcGF0aWJsZSB0ZXN0LlxuICpcbiAqIFRoZSBjcmVhdGVkIGZ1bmN0aW9uIGlzIGEgYml0IGZhc3RlciBiZWNhdXNlIGl0IGV4cGVjdHMgdmFsaWQgaW5wdXQgb25seTpcbiAqIGEgYG5vZGVgLCBgaW5kZXhgLCBhbmQgYHBhcmVudGAuXG4gKlxuICogQHBhcmFtIHRlc3RcbiAqICAgKiAgIHdoZW4gbnVsbGlzaCwgY2hlY2tzIGlmIGBub2RlYCBpcyBhIGBOb2RlYC5cbiAqICAgKiAgIHdoZW4gYHN0cmluZ2AsIHdvcmtzIGxpa2UgcGFzc2luZyBgKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gdGVzdGAuXG4gKiAgICogICB3aGVuIGBmdW5jdGlvbmAgY2hlY2tzIGlmIGZ1bmN0aW9uIHBhc3NlZCB0aGUgbm9kZSBpcyB0cnVlLlxuICogICAqICAgd2hlbiBgb2JqZWN0YCwgY2hlY2tzIHRoYXQgYWxsIGtleXMgaW4gdGVzdCBhcmUgaW4gbm9kZSwgYW5kIHRoYXQgdGhleSBoYXZlIChzdHJpY3RseSkgZXF1YWwgdmFsdWVzLlxuICogICAqICAgd2hlbiBgYXJyYXlgLCBjaGVja3MgaWYgYW55IG9uZSBvZiB0aGUgc3VidGVzdHMgcGFzcy5cbiAqIEByZXR1cm5zXG4gKiAgIEFuIGFzc2VydGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnQgPVxuICAvKipcbiAgICogQHR5cGUgeyhcbiAgICogICAoPEtpbmQgZXh0ZW5kcyBOb2RlPih0ZXN0OiBQcmVkaWNhdGVUZXN0PEtpbmQ+KSA9PiBBc3NlcnRQcmVkaWNhdGU8S2luZD4pICZcbiAgICogICAoKHRlc3Q/OiBUZXN0KSA9PiBBc3NlcnRBbnl0aGluZylcbiAgICogKX1cbiAgICovXG4gIChcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Rlc3R9IFt0ZXN0XVxuICAgICAqIEByZXR1cm5zIHtBc3NlcnRBbnl0aGluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAodGVzdCkge1xuICAgICAgaWYgKHRlc3QgPT09IHVuZGVmaW5lZCB8fCB0ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBva1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0eXBlRmFjdG9yeSh0ZXN0KVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlc3QgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRlc3QpID8gYW55RmFjdG9yeSh0ZXN0KSA6IHByb3BzRmFjdG9yeSh0ZXN0KVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNhc3RGYWN0b3J5KHRlc3QpXG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgZnVuY3Rpb24sIHN0cmluZywgb3Igb2JqZWN0IGFzIHRlc3QnKVxuICAgIH1cbiAgKVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nIHwgUHJvcHMgfCBUZXN0RnVuY3Rpb25Bbnl0aGluZz59IHRlc3RzXG4gKiBAcmV0dXJucyB7QXNzZXJ0QW55dGhpbmd9XG4gKi9cbmZ1bmN0aW9uIGFueUZhY3RvcnkodGVzdHMpIHtcbiAgLyoqIEB0eXBlIHtBcnJheTxBc3NlcnRBbnl0aGluZz59ICovXG4gIGNvbnN0IGNoZWNrcyA9IFtdXG4gIGxldCBpbmRleCA9IC0xXG5cbiAgd2hpbGUgKCsraW5kZXggPCB0ZXN0cy5sZW5ndGgpIHtcbiAgICBjaGVja3NbaW5kZXhdID0gY29udmVydCh0ZXN0c1tpbmRleF0pXG4gIH1cblxuICByZXR1cm4gY2FzdEZhY3RvcnkoYW55KVxuXG4gIC8qKlxuICAgKiBAdGhpcyB7dW5rbm93bn1cbiAgICogQHBhcmFtIHtBcnJheTx1bmtub3duPn0gcGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGFueSguLi5wYXJhbWV0ZXJzKSB7XG4gICAgbGV0IGluZGV4ID0gLTFcblxuICAgIHdoaWxlICgrK2luZGV4IDwgY2hlY2tzLmxlbmd0aCkge1xuICAgICAgaWYgKGNoZWNrc1tpbmRleF0uY2FsbCh0aGlzLCAuLi5wYXJhbWV0ZXJzKSkgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vKipcbiAqIFR1cm4gYW4gb2JqZWN0IGludG8gYSB0ZXN0IGZvciBhIG5vZGUgd2l0aCBhIGNlcnRhaW4gZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7UHJvcHN9IGNoZWNrXG4gKiBAcmV0dXJucyB7QXNzZXJ0QW55dGhpbmd9XG4gKi9cbmZ1bmN0aW9uIHByb3BzRmFjdG9yeShjaGVjaykge1xuICByZXR1cm4gY2FzdEZhY3RvcnkoYWxsKVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBhbGwobm9kZSkge1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIGxldCBrZXlcblxuICAgIGZvciAoa2V5IGluIGNoZWNrKSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yOiBodXNoLCBpdCBzdXJlIHdvcmtzIGFzIGFuIGluZGV4LlxuICAgICAgaWYgKG5vZGVba2V5XSAhPT0gY2hlY2tba2V5XSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG4vKipcbiAqIFR1cm4gYSBzdHJpbmcgaW50byBhIHRlc3QgZm9yIGEgbm9kZSB3aXRoIGEgY2VydGFpbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGVja1xuICogQHJldHVybnMge0Fzc2VydEFueXRoaW5nfVxuICovXG5mdW5jdGlvbiB0eXBlRmFjdG9yeShjaGVjaykge1xuICByZXR1cm4gY2FzdEZhY3RvcnkodHlwZSlcblxuICAvKipcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZSAmJiBub2RlLnR5cGUgPT09IGNoZWNrXG4gIH1cbn1cblxuLyoqXG4gKiBUdXJuIGEgY3VzdG9tIHRlc3QgaW50byBhIHRlc3QgZm9yIGEgbm9kZSB0aGF0IHBhc3NlcyB0aGF0IHRlc3QuXG4gKlxuICogQHBhcmFtIHtUZXN0RnVuY3Rpb25Bbnl0aGluZ30gY2hlY2tcbiAqIEByZXR1cm5zIHtBc3NlcnRBbnl0aGluZ31cbiAqL1xuZnVuY3Rpb24gY2FzdEZhY3RvcnkoY2hlY2spIHtcbiAgcmV0dXJuIGFzc2VydGlvblxuXG4gIC8qKlxuICAgKiBAdGhpcyB7dW5rbm93bn1cbiAgICogQHBhcmFtIHt1bmtub3dufSBub2RlXG4gICAqIEBwYXJhbSB7QXJyYXk8dW5rbm93bj59IHBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBhc3NlcnRpb24obm9kZSwgLi4ucGFyYW1ldGVycykge1xuICAgIHJldHVybiBCb29sZWFuKFxuICAgICAgbm9kZSAmJlxuICAgICAgICB0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgJ3R5cGUnIGluIG5vZGUgJiZcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogZmluZS5cbiAgICAgICAgQm9vbGVhbihjaGVjay5jYWxsKHRoaXMsIG5vZGUsIC4uLnBhcmFtZXRlcnMpKVxuICAgIClcbiAgfVxufVxuXG5mdW5jdGlvbiBvaygpIHtcbiAgcmV0dXJuIHRydWVcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/unist-util-is/lib/index.js\n");

/***/ })

};
;