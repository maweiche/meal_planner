"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/parse-entities";
exports.ids = ["vendor-chunks/parse-entities"];
exports.modules = {

/***/ "(ssr)/./node_modules/parse-entities/decode-entity.js":
/*!******************************************************!*\
  !*** ./node_modules/parse-entities/decode-entity.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar characterEntities = __webpack_require__(/*! character-entities */ \"(ssr)/./node_modules/character-entities/index.json\")\n\nmodule.exports = decodeEntity\n\nvar own = {}.hasOwnProperty\n\nfunction decodeEntity(characters) {\n  return own.call(characterEntities, characters)\n    ? characterEntities[characters]\n    : false\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcGFyc2UtZW50aXRpZXMvZGVjb2RlLWVudGl0eS5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWix3QkFBd0IsbUJBQU8sQ0FBQyw4RUFBb0I7O0FBRXBEOztBQUVBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYXJzZS1lbnRpdGllcy9kZWNvZGUtZW50aXR5LmpzP2U5ZGQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbnZhciBjaGFyYWN0ZXJFbnRpdGllcyA9IHJlcXVpcmUoJ2NoYXJhY3Rlci1lbnRpdGllcycpXG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlRW50aXR5XG5cbnZhciBvd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG5mdW5jdGlvbiBkZWNvZGVFbnRpdHkoY2hhcmFjdGVycykge1xuICByZXR1cm4gb3duLmNhbGwoY2hhcmFjdGVyRW50aXRpZXMsIGNoYXJhY3RlcnMpXG4gICAgPyBjaGFyYWN0ZXJFbnRpdGllc1tjaGFyYWN0ZXJzXVxuICAgIDogZmFsc2Vcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/parse-entities/decode-entity.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/parse-entities/index.js":
/*!**********************************************!*\
  !*** ./node_modules/parse-entities/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar legacy = __webpack_require__(/*! character-entities-legacy */ \"(ssr)/./node_modules/character-entities-legacy/index.json\")\nvar invalid = __webpack_require__(/*! character-reference-invalid */ \"(ssr)/./node_modules/character-reference-invalid/index.json\")\nvar decimal = __webpack_require__(/*! is-decimal */ \"(ssr)/./node_modules/is-decimal/index.js\")\nvar hexadecimal = __webpack_require__(/*! is-hexadecimal */ \"(ssr)/./node_modules/is-hexadecimal/index.js\")\nvar alphanumerical = __webpack_require__(/*! is-alphanumerical */ \"(ssr)/./node_modules/is-alphanumerical/index.js\")\nvar decodeEntity = __webpack_require__(/*! ./decode-entity */ \"(ssr)/./node_modules/parse-entities/decode-entity.js\")\n\nmodule.exports = parseEntities\n\nvar own = {}.hasOwnProperty\nvar fromCharCode = String.fromCharCode\nvar noop = Function.prototype\n\n// Default settings.\nvar defaults = {\n  warning: null,\n  reference: null,\n  text: null,\n  warningContext: null,\n  referenceContext: null,\n  textContext: null,\n  position: {},\n  additional: null,\n  attribute: false,\n  nonTerminated: true\n}\n\n// Characters.\nvar tab = 9 // '\\t'\nvar lineFeed = 10 // '\\n'\nvar formFeed = 12 // '\\f'\nvar space = 32 // ' '\nvar ampersand = 38 // '&'\nvar semicolon = 59 // ';'\nvar lessThan = 60 // '<'\nvar equalsTo = 61 // '='\nvar numberSign = 35 // '#'\nvar uppercaseX = 88 // 'X'\nvar lowercaseX = 120 // 'x'\nvar replacementCharacter = 65533 // '�'\n\n// Reference types.\nvar name = 'named'\nvar hexa = 'hexadecimal'\nvar deci = 'decimal'\n\n// Map of bases.\nvar bases = {}\n\nbases[hexa] = 16\nbases[deci] = 10\n\n// Map of types to tests.\n// Each type of character reference accepts different characters.\n// This test is used to detect whether a reference has ended (as the semicolon\n// is not strictly needed).\nvar tests = {}\n\ntests[name] = alphanumerical\ntests[deci] = decimal\ntests[hexa] = hexadecimal\n\n// Warning types.\nvar namedNotTerminated = 1\nvar numericNotTerminated = 2\nvar namedEmpty = 3\nvar numericEmpty = 4\nvar namedUnknown = 5\nvar numericDisallowed = 6\nvar numericProhibited = 7\n\n// Warning messages.\nvar messages = {}\n\nmessages[namedNotTerminated] =\n  'Named character references must be terminated by a semicolon'\nmessages[numericNotTerminated] =\n  'Numeric character references must be terminated by a semicolon'\nmessages[namedEmpty] = 'Named character references cannot be empty'\nmessages[numericEmpty] = 'Numeric character references cannot be empty'\nmessages[namedUnknown] = 'Named character references must be known'\nmessages[numericDisallowed] =\n  'Numeric character references cannot be disallowed'\nmessages[numericProhibited] =\n  'Numeric character references cannot be outside the permissible Unicode range'\n\n// Wrap to ensure clean parameters are given to `parse`.\nfunction parseEntities(value, options) {\n  var settings = {}\n  var option\n  var key\n\n  if (!options) {\n    options = {}\n  }\n\n  for (key in defaults) {\n    option = options[key]\n    settings[key] =\n      option === null || option === undefined ? defaults[key] : option\n  }\n\n  if (settings.position.indent || settings.position.start) {\n    settings.indent = settings.position.indent || []\n    settings.position = settings.position.start\n  }\n\n  return parse(value, settings)\n}\n\n// Parse entities.\n// eslint-disable-next-line complexity\nfunction parse(value, settings) {\n  var additional = settings.additional\n  var nonTerminated = settings.nonTerminated\n  var handleText = settings.text\n  var handleReference = settings.reference\n  var handleWarning = settings.warning\n  var textContext = settings.textContext\n  var referenceContext = settings.referenceContext\n  var warningContext = settings.warningContext\n  var pos = settings.position\n  var indent = settings.indent || []\n  var length = value.length\n  var index = 0\n  var lines = -1\n  var column = pos.column || 1\n  var line = pos.line || 1\n  var queue = ''\n  var result = []\n  var entityCharacters\n  var namedEntity\n  var terminated\n  var characters\n  var character\n  var reference\n  var following\n  var warning\n  var reason\n  var output\n  var entity\n  var begin\n  var start\n  var type\n  var test\n  var prev\n  var next\n  var diff\n  var end\n\n  if (typeof additional === 'string') {\n    additional = additional.charCodeAt(0)\n  }\n\n  // Cache the current point.\n  prev = now()\n\n  // Wrap `handleWarning`.\n  warning = handleWarning ? parseError : noop\n\n  // Ensure the algorithm walks over the first character and the end\n  // (inclusive).\n  index--\n  length++\n\n  while (++index < length) {\n    // If the previous character was a newline.\n    if (character === lineFeed) {\n      column = indent[lines] || 1\n    }\n\n    character = value.charCodeAt(index)\n\n    if (character === ampersand) {\n      following = value.charCodeAt(index + 1)\n\n      // The behaviour depends on the identity of the next character.\n      if (\n        following === tab ||\n        following === lineFeed ||\n        following === formFeed ||\n        following === space ||\n        following === ampersand ||\n        following === lessThan ||\n        following !== following ||\n        (additional && following === additional)\n      ) {\n        // Not a character reference.\n        // No characters are consumed, and nothing is returned.\n        // This is not an error, either.\n        queue += fromCharCode(character)\n        column++\n\n        continue\n      }\n\n      start = index + 1\n      begin = start\n      end = start\n\n      if (following === numberSign) {\n        // Numerical entity.\n        end = ++begin\n\n        // The behaviour further depends on the next character.\n        following = value.charCodeAt(end)\n\n        if (following === uppercaseX || following === lowercaseX) {\n          // ASCII hex digits.\n          type = hexa\n          end = ++begin\n        } else {\n          // ASCII digits.\n          type = deci\n        }\n      } else {\n        // Named entity.\n        type = name\n      }\n\n      entityCharacters = ''\n      entity = ''\n      characters = ''\n      test = tests[type]\n      end--\n\n      while (++end < length) {\n        following = value.charCodeAt(end)\n\n        if (!test(following)) {\n          break\n        }\n\n        characters += fromCharCode(following)\n\n        // Check if we can match a legacy named reference.\n        // If so, we cache that as the last viable named reference.\n        // This ensures we do not need to walk backwards later.\n        if (type === name && own.call(legacy, characters)) {\n          entityCharacters = characters\n          entity = legacy[characters]\n        }\n      }\n\n      terminated = value.charCodeAt(end) === semicolon\n\n      if (terminated) {\n        end++\n\n        namedEntity = type === name ? decodeEntity(characters) : false\n\n        if (namedEntity) {\n          entityCharacters = characters\n          entity = namedEntity\n        }\n      }\n\n      diff = 1 + end - start\n\n      if (!terminated && !nonTerminated) {\n        // Empty.\n      } else if (!characters) {\n        // An empty (possible) entity is valid, unless it’s numeric (thus an\n        // ampersand followed by an octothorp).\n        if (type !== name) {\n          warning(numericEmpty, diff)\n        }\n      } else if (type === name) {\n        // An ampersand followed by anything unknown, and not terminated, is\n        // invalid.\n        if (terminated && !entity) {\n          warning(namedUnknown, 1)\n        } else {\n          // If theres something after an entity name which is not known, cap\n          // the reference.\n          if (entityCharacters !== characters) {\n            end = begin + entityCharacters.length\n            diff = 1 + end - begin\n            terminated = false\n          }\n\n          // If the reference is not terminated, warn.\n          if (!terminated) {\n            reason = entityCharacters ? namedNotTerminated : namedEmpty\n\n            if (settings.attribute) {\n              following = value.charCodeAt(end)\n\n              if (following === equalsTo) {\n                warning(reason, diff)\n                entity = null\n              } else if (alphanumerical(following)) {\n                entity = null\n              } else {\n                warning(reason, diff)\n              }\n            } else {\n              warning(reason, diff)\n            }\n          }\n        }\n\n        reference = entity\n      } else {\n        if (!terminated) {\n          // All non-terminated numeric entities are not rendered, and trigger a\n          // warning.\n          warning(numericNotTerminated, diff)\n        }\n\n        // When terminated and number, parse as either hexadecimal or decimal.\n        reference = parseInt(characters, bases[type])\n\n        // Trigger a warning when the parsed number is prohibited, and replace\n        // with replacement character.\n        if (prohibited(reference)) {\n          warning(numericProhibited, diff)\n          reference = fromCharCode(replacementCharacter)\n        } else if (reference in invalid) {\n          // Trigger a warning when the parsed number is disallowed, and replace\n          // by an alternative.\n          warning(numericDisallowed, diff)\n          reference = invalid[reference]\n        } else {\n          // Parse the number.\n          output = ''\n\n          // Trigger a warning when the parsed number should not be used.\n          if (disallowed(reference)) {\n            warning(numericDisallowed, diff)\n          }\n\n          // Stringify the number.\n          if (reference > 0xffff) {\n            reference -= 0x10000\n            output += fromCharCode((reference >>> (10 & 0x3ff)) | 0xd800)\n            reference = 0xdc00 | (reference & 0x3ff)\n          }\n\n          reference = output + fromCharCode(reference)\n        }\n      }\n\n      // Found it!\n      // First eat the queued characters as normal text, then eat an entity.\n      if (reference) {\n        flush()\n\n        prev = now()\n        index = end - 1\n        column += end - start + 1\n        result.push(reference)\n        next = now()\n        next.offset++\n\n        if (handleReference) {\n          handleReference.call(\n            referenceContext,\n            reference,\n            {start: prev, end: next},\n            value.slice(start - 1, end)\n          )\n        }\n\n        prev = next\n      } else {\n        // If we could not find a reference, queue the checked characters (as\n        // normal characters), and move the pointer to their end.\n        // This is possible because we can be certain neither newlines nor\n        // ampersands are included.\n        characters = value.slice(start - 1, end)\n        queue += characters\n        column += characters.length\n        index = end - 1\n      }\n    } else {\n      // Handle anything other than an ampersand, including newlines and EOF.\n      if (\n        character === 10 // Line feed\n      ) {\n        line++\n        lines++\n        column = 0\n      }\n\n      if (character === character) {\n        queue += fromCharCode(character)\n        column++\n      } else {\n        flush()\n      }\n    }\n  }\n\n  // Return the reduced nodes.\n  return result.join('')\n\n  // Get current position.\n  function now() {\n    return {\n      line: line,\n      column: column,\n      offset: index + (pos.offset || 0)\n    }\n  }\n\n  // “Throw” a parse-error: a warning.\n  function parseError(code, offset) {\n    var position = now()\n\n    position.column += offset\n    position.offset += offset\n\n    handleWarning.call(warningContext, messages[code], position, code)\n  }\n\n  // Flush `queue` (normal text).\n  // Macro invoked before each entity and at the end of `value`.\n  // Does nothing when `queue` is empty.\n  function flush() {\n    if (queue) {\n      result.push(queue)\n\n      if (handleText) {\n        handleText.call(textContext, queue, {start: prev, end: now()})\n      }\n\n      queue = ''\n    }\n  }\n}\n\n// Check if `character` is outside the permissible unicode range.\nfunction prohibited(code) {\n  return (code >= 0xd800 && code <= 0xdfff) || code > 0x10ffff\n}\n\n// Check if `character` is disallowed.\nfunction disallowed(code) {\n  return (\n    (code >= 0x0001 && code <= 0x0008) ||\n    code === 0x000b ||\n    (code >= 0x000d && code <= 0x001f) ||\n    (code >= 0x007f && code <= 0x009f) ||\n    (code >= 0xfdd0 && code <= 0xfdef) ||\n    (code & 0xffff) === 0xffff ||\n    (code & 0xffff) === 0xfffe\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcGFyc2UtZW50aXRpZXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosYUFBYSxtQkFBTyxDQUFDLDRGQUEyQjtBQUNoRCxjQUFjLG1CQUFPLENBQUMsZ0dBQTZCO0FBQ25ELGNBQWMsbUJBQU8sQ0FBQyw0REFBWTtBQUNsQyxrQkFBa0IsbUJBQU8sQ0FBQyxvRUFBZ0I7QUFDMUMscUJBQXFCLG1CQUFPLENBQUMsMEVBQW1CO0FBQ2hELG1CQUFtQixtQkFBTyxDQUFDLDZFQUFpQjs7QUFFNUM7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLHdCQUF3QjtBQUNyRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFyc2UtZW50aXRpZXMvaW5kZXguanM/MWE0MyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxudmFyIGxlZ2FjeSA9IHJlcXVpcmUoJ2NoYXJhY3Rlci1lbnRpdGllcy1sZWdhY3knKVxudmFyIGludmFsaWQgPSByZXF1aXJlKCdjaGFyYWN0ZXItcmVmZXJlbmNlLWludmFsaWQnKVxudmFyIGRlY2ltYWwgPSByZXF1aXJlKCdpcy1kZWNpbWFsJylcbnZhciBoZXhhZGVjaW1hbCA9IHJlcXVpcmUoJ2lzLWhleGFkZWNpbWFsJylcbnZhciBhbHBoYW51bWVyaWNhbCA9IHJlcXVpcmUoJ2lzLWFscGhhbnVtZXJpY2FsJylcbnZhciBkZWNvZGVFbnRpdHkgPSByZXF1aXJlKCcuL2RlY29kZS1lbnRpdHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlRW50aXRpZXNcblxudmFyIG93biA9IHt9Lmhhc093blByb3BlcnR5XG52YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZVxudmFyIG5vb3AgPSBGdW5jdGlvbi5wcm90b3R5cGVcblxuLy8gRGVmYXVsdCBzZXR0aW5ncy5cbnZhciBkZWZhdWx0cyA9IHtcbiAgd2FybmluZzogbnVsbCxcbiAgcmVmZXJlbmNlOiBudWxsLFxuICB0ZXh0OiBudWxsLFxuICB3YXJuaW5nQ29udGV4dDogbnVsbCxcbiAgcmVmZXJlbmNlQ29udGV4dDogbnVsbCxcbiAgdGV4dENvbnRleHQ6IG51bGwsXG4gIHBvc2l0aW9uOiB7fSxcbiAgYWRkaXRpb25hbDogbnVsbCxcbiAgYXR0cmlidXRlOiBmYWxzZSxcbiAgbm9uVGVybWluYXRlZDogdHJ1ZVxufVxuXG4vLyBDaGFyYWN0ZXJzLlxudmFyIHRhYiA9IDkgLy8gJ1xcdCdcbnZhciBsaW5lRmVlZCA9IDEwIC8vICdcXG4nXG52YXIgZm9ybUZlZWQgPSAxMiAvLyAnXFxmJ1xudmFyIHNwYWNlID0gMzIgLy8gJyAnXG52YXIgYW1wZXJzYW5kID0gMzggLy8gJyYnXG52YXIgc2VtaWNvbG9uID0gNTkgLy8gJzsnXG52YXIgbGVzc1RoYW4gPSA2MCAvLyAnPCdcbnZhciBlcXVhbHNUbyA9IDYxIC8vICc9J1xudmFyIG51bWJlclNpZ24gPSAzNSAvLyAnIydcbnZhciB1cHBlcmNhc2VYID0gODggLy8gJ1gnXG52YXIgbG93ZXJjYXNlWCA9IDEyMCAvLyAneCdcbnZhciByZXBsYWNlbWVudENoYXJhY3RlciA9IDY1NTMzIC8vICfvv70nXG5cbi8vIFJlZmVyZW5jZSB0eXBlcy5cbnZhciBuYW1lID0gJ25hbWVkJ1xudmFyIGhleGEgPSAnaGV4YWRlY2ltYWwnXG52YXIgZGVjaSA9ICdkZWNpbWFsJ1xuXG4vLyBNYXAgb2YgYmFzZXMuXG52YXIgYmFzZXMgPSB7fVxuXG5iYXNlc1toZXhhXSA9IDE2XG5iYXNlc1tkZWNpXSA9IDEwXG5cbi8vIE1hcCBvZiB0eXBlcyB0byB0ZXN0cy5cbi8vIEVhY2ggdHlwZSBvZiBjaGFyYWN0ZXIgcmVmZXJlbmNlIGFjY2VwdHMgZGlmZmVyZW50IGNoYXJhY3RlcnMuXG4vLyBUaGlzIHRlc3QgaXMgdXNlZCB0byBkZXRlY3Qgd2hldGhlciBhIHJlZmVyZW5jZSBoYXMgZW5kZWQgKGFzIHRoZSBzZW1pY29sb25cbi8vIGlzIG5vdCBzdHJpY3RseSBuZWVkZWQpLlxudmFyIHRlc3RzID0ge31cblxudGVzdHNbbmFtZV0gPSBhbHBoYW51bWVyaWNhbFxudGVzdHNbZGVjaV0gPSBkZWNpbWFsXG50ZXN0c1toZXhhXSA9IGhleGFkZWNpbWFsXG5cbi8vIFdhcm5pbmcgdHlwZXMuXG52YXIgbmFtZWROb3RUZXJtaW5hdGVkID0gMVxudmFyIG51bWVyaWNOb3RUZXJtaW5hdGVkID0gMlxudmFyIG5hbWVkRW1wdHkgPSAzXG52YXIgbnVtZXJpY0VtcHR5ID0gNFxudmFyIG5hbWVkVW5rbm93biA9IDVcbnZhciBudW1lcmljRGlzYWxsb3dlZCA9IDZcbnZhciBudW1lcmljUHJvaGliaXRlZCA9IDdcblxuLy8gV2FybmluZyBtZXNzYWdlcy5cbnZhciBtZXNzYWdlcyA9IHt9XG5cbm1lc3NhZ2VzW25hbWVkTm90VGVybWluYXRlZF0gPVxuICAnTmFtZWQgY2hhcmFjdGVyIHJlZmVyZW5jZXMgbXVzdCBiZSB0ZXJtaW5hdGVkIGJ5IGEgc2VtaWNvbG9uJ1xubWVzc2FnZXNbbnVtZXJpY05vdFRlcm1pbmF0ZWRdID1cbiAgJ051bWVyaWMgY2hhcmFjdGVyIHJlZmVyZW5jZXMgbXVzdCBiZSB0ZXJtaW5hdGVkIGJ5IGEgc2VtaWNvbG9uJ1xubWVzc2FnZXNbbmFtZWRFbXB0eV0gPSAnTmFtZWQgY2hhcmFjdGVyIHJlZmVyZW5jZXMgY2Fubm90IGJlIGVtcHR5J1xubWVzc2FnZXNbbnVtZXJpY0VtcHR5XSA9ICdOdW1lcmljIGNoYXJhY3RlciByZWZlcmVuY2VzIGNhbm5vdCBiZSBlbXB0eSdcbm1lc3NhZ2VzW25hbWVkVW5rbm93bl0gPSAnTmFtZWQgY2hhcmFjdGVyIHJlZmVyZW5jZXMgbXVzdCBiZSBrbm93bidcbm1lc3NhZ2VzW251bWVyaWNEaXNhbGxvd2VkXSA9XG4gICdOdW1lcmljIGNoYXJhY3RlciByZWZlcmVuY2VzIGNhbm5vdCBiZSBkaXNhbGxvd2VkJ1xubWVzc2FnZXNbbnVtZXJpY1Byb2hpYml0ZWRdID1cbiAgJ051bWVyaWMgY2hhcmFjdGVyIHJlZmVyZW5jZXMgY2Fubm90IGJlIG91dHNpZGUgdGhlIHBlcm1pc3NpYmxlIFVuaWNvZGUgcmFuZ2UnXG5cbi8vIFdyYXAgdG8gZW5zdXJlIGNsZWFuIHBhcmFtZXRlcnMgYXJlIGdpdmVuIHRvIGBwYXJzZWAuXG5mdW5jdGlvbiBwYXJzZUVudGl0aWVzKHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciBzZXR0aW5ncyA9IHt9XG4gIHZhciBvcHRpb25cbiAgdmFyIGtleVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgZm9yIChrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICBvcHRpb24gPSBvcHRpb25zW2tleV1cbiAgICBzZXR0aW5nc1trZXldID1cbiAgICAgIG9wdGlvbiA9PT0gbnVsbCB8fCBvcHRpb24gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRzW2tleV0gOiBvcHRpb25cbiAgfVxuXG4gIGlmIChzZXR0aW5ncy5wb3NpdGlvbi5pbmRlbnQgfHwgc2V0dGluZ3MucG9zaXRpb24uc3RhcnQpIHtcbiAgICBzZXR0aW5ncy5pbmRlbnQgPSBzZXR0aW5ncy5wb3NpdGlvbi5pbmRlbnQgfHwgW11cbiAgICBzZXR0aW5ncy5wb3NpdGlvbiA9IHNldHRpbmdzLnBvc2l0aW9uLnN0YXJ0XG4gIH1cblxuICByZXR1cm4gcGFyc2UodmFsdWUsIHNldHRpbmdzKVxufVxuXG4vLyBQYXJzZSBlbnRpdGllcy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiBwYXJzZSh2YWx1ZSwgc2V0dGluZ3MpIHtcbiAgdmFyIGFkZGl0aW9uYWwgPSBzZXR0aW5ncy5hZGRpdGlvbmFsXG4gIHZhciBub25UZXJtaW5hdGVkID0gc2V0dGluZ3Mubm9uVGVybWluYXRlZFxuICB2YXIgaGFuZGxlVGV4dCA9IHNldHRpbmdzLnRleHRcbiAgdmFyIGhhbmRsZVJlZmVyZW5jZSA9IHNldHRpbmdzLnJlZmVyZW5jZVxuICB2YXIgaGFuZGxlV2FybmluZyA9IHNldHRpbmdzLndhcm5pbmdcbiAgdmFyIHRleHRDb250ZXh0ID0gc2V0dGluZ3MudGV4dENvbnRleHRcbiAgdmFyIHJlZmVyZW5jZUNvbnRleHQgPSBzZXR0aW5ncy5yZWZlcmVuY2VDb250ZXh0XG4gIHZhciB3YXJuaW5nQ29udGV4dCA9IHNldHRpbmdzLndhcm5pbmdDb250ZXh0XG4gIHZhciBwb3MgPSBzZXR0aW5ncy5wb3NpdGlvblxuICB2YXIgaW5kZW50ID0gc2V0dGluZ3MuaW5kZW50IHx8IFtdXG4gIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGhcbiAgdmFyIGluZGV4ID0gMFxuICB2YXIgbGluZXMgPSAtMVxuICB2YXIgY29sdW1uID0gcG9zLmNvbHVtbiB8fCAxXG4gIHZhciBsaW5lID0gcG9zLmxpbmUgfHwgMVxuICB2YXIgcXVldWUgPSAnJ1xuICB2YXIgcmVzdWx0ID0gW11cbiAgdmFyIGVudGl0eUNoYXJhY3RlcnNcbiAgdmFyIG5hbWVkRW50aXR5XG4gIHZhciB0ZXJtaW5hdGVkXG4gIHZhciBjaGFyYWN0ZXJzXG4gIHZhciBjaGFyYWN0ZXJcbiAgdmFyIHJlZmVyZW5jZVxuICB2YXIgZm9sbG93aW5nXG4gIHZhciB3YXJuaW5nXG4gIHZhciByZWFzb25cbiAgdmFyIG91dHB1dFxuICB2YXIgZW50aXR5XG4gIHZhciBiZWdpblxuICB2YXIgc3RhcnRcbiAgdmFyIHR5cGVcbiAgdmFyIHRlc3RcbiAgdmFyIHByZXZcbiAgdmFyIG5leHRcbiAgdmFyIGRpZmZcbiAgdmFyIGVuZFxuXG4gIGlmICh0eXBlb2YgYWRkaXRpb25hbCA9PT0gJ3N0cmluZycpIHtcbiAgICBhZGRpdGlvbmFsID0gYWRkaXRpb25hbC5jaGFyQ29kZUF0KDApXG4gIH1cblxuICAvLyBDYWNoZSB0aGUgY3VycmVudCBwb2ludC5cbiAgcHJldiA9IG5vdygpXG5cbiAgLy8gV3JhcCBgaGFuZGxlV2FybmluZ2AuXG4gIHdhcm5pbmcgPSBoYW5kbGVXYXJuaW5nID8gcGFyc2VFcnJvciA6IG5vb3BcblxuICAvLyBFbnN1cmUgdGhlIGFsZ29yaXRobSB3YWxrcyBvdmVyIHRoZSBmaXJzdCBjaGFyYWN0ZXIgYW5kIHRoZSBlbmRcbiAgLy8gKGluY2x1c2l2ZSkuXG4gIGluZGV4LS1cbiAgbGVuZ3RoKytcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIC8vIElmIHRoZSBwcmV2aW91cyBjaGFyYWN0ZXIgd2FzIGEgbmV3bGluZS5cbiAgICBpZiAoY2hhcmFjdGVyID09PSBsaW5lRmVlZCkge1xuICAgICAgY29sdW1uID0gaW5kZW50W2xpbmVzXSB8fCAxXG4gICAgfVxuXG4gICAgY2hhcmFjdGVyID0gdmFsdWUuY2hhckNvZGVBdChpbmRleClcblxuICAgIGlmIChjaGFyYWN0ZXIgPT09IGFtcGVyc2FuZCkge1xuICAgICAgZm9sbG93aW5nID0gdmFsdWUuY2hhckNvZGVBdChpbmRleCArIDEpXG5cbiAgICAgIC8vIFRoZSBiZWhhdmlvdXIgZGVwZW5kcyBvbiB0aGUgaWRlbnRpdHkgb2YgdGhlIG5leHQgY2hhcmFjdGVyLlxuICAgICAgaWYgKFxuICAgICAgICBmb2xsb3dpbmcgPT09IHRhYiB8fFxuICAgICAgICBmb2xsb3dpbmcgPT09IGxpbmVGZWVkIHx8XG4gICAgICAgIGZvbGxvd2luZyA9PT0gZm9ybUZlZWQgfHxcbiAgICAgICAgZm9sbG93aW5nID09PSBzcGFjZSB8fFxuICAgICAgICBmb2xsb3dpbmcgPT09IGFtcGVyc2FuZCB8fFxuICAgICAgICBmb2xsb3dpbmcgPT09IGxlc3NUaGFuIHx8XG4gICAgICAgIGZvbGxvd2luZyAhPT0gZm9sbG93aW5nIHx8XG4gICAgICAgIChhZGRpdGlvbmFsICYmIGZvbGxvd2luZyA9PT0gYWRkaXRpb25hbClcbiAgICAgICkge1xuICAgICAgICAvLyBOb3QgYSBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICAgICAgICAvLyBObyBjaGFyYWN0ZXJzIGFyZSBjb25zdW1lZCwgYW5kIG5vdGhpbmcgaXMgcmV0dXJuZWQuXG4gICAgICAgIC8vIFRoaXMgaXMgbm90IGFuIGVycm9yLCBlaXRoZXIuXG4gICAgICAgIHF1ZXVlICs9IGZyb21DaGFyQ29kZShjaGFyYWN0ZXIpXG4gICAgICAgIGNvbHVtbisrXG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgc3RhcnQgPSBpbmRleCArIDFcbiAgICAgIGJlZ2luID0gc3RhcnRcbiAgICAgIGVuZCA9IHN0YXJ0XG5cbiAgICAgIGlmIChmb2xsb3dpbmcgPT09IG51bWJlclNpZ24pIHtcbiAgICAgICAgLy8gTnVtZXJpY2FsIGVudGl0eS5cbiAgICAgICAgZW5kID0gKytiZWdpblxuXG4gICAgICAgIC8vIFRoZSBiZWhhdmlvdXIgZnVydGhlciBkZXBlbmRzIG9uIHRoZSBuZXh0IGNoYXJhY3Rlci5cbiAgICAgICAgZm9sbG93aW5nID0gdmFsdWUuY2hhckNvZGVBdChlbmQpXG5cbiAgICAgICAgaWYgKGZvbGxvd2luZyA9PT0gdXBwZXJjYXNlWCB8fCBmb2xsb3dpbmcgPT09IGxvd2VyY2FzZVgpIHtcbiAgICAgICAgICAvLyBBU0NJSSBoZXggZGlnaXRzLlxuICAgICAgICAgIHR5cGUgPSBoZXhhXG4gICAgICAgICAgZW5kID0gKytiZWdpblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFTQ0lJIGRpZ2l0cy5cbiAgICAgICAgICB0eXBlID0gZGVjaVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOYW1lZCBlbnRpdHkuXG4gICAgICAgIHR5cGUgPSBuYW1lXG4gICAgICB9XG5cbiAgICAgIGVudGl0eUNoYXJhY3RlcnMgPSAnJ1xuICAgICAgZW50aXR5ID0gJydcbiAgICAgIGNoYXJhY3RlcnMgPSAnJ1xuICAgICAgdGVzdCA9IHRlc3RzW3R5cGVdXG4gICAgICBlbmQtLVxuXG4gICAgICB3aGlsZSAoKytlbmQgPCBsZW5ndGgpIHtcbiAgICAgICAgZm9sbG93aW5nID0gdmFsdWUuY2hhckNvZGVBdChlbmQpXG5cbiAgICAgICAgaWYgKCF0ZXN0KGZvbGxvd2luZykpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgY2hhcmFjdGVycyArPSBmcm9tQ2hhckNvZGUoZm9sbG93aW5nKVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiBtYXRjaCBhIGxlZ2FjeSBuYW1lZCByZWZlcmVuY2UuXG4gICAgICAgIC8vIElmIHNvLCB3ZSBjYWNoZSB0aGF0IGFzIHRoZSBsYXN0IHZpYWJsZSBuYW1lZCByZWZlcmVuY2UuXG4gICAgICAgIC8vIFRoaXMgZW5zdXJlcyB3ZSBkbyBub3QgbmVlZCB0byB3YWxrIGJhY2t3YXJkcyBsYXRlci5cbiAgICAgICAgaWYgKHR5cGUgPT09IG5hbWUgJiYgb3duLmNhbGwobGVnYWN5LCBjaGFyYWN0ZXJzKSkge1xuICAgICAgICAgIGVudGl0eUNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzXG4gICAgICAgICAgZW50aXR5ID0gbGVnYWN5W2NoYXJhY3RlcnNdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGVybWluYXRlZCA9IHZhbHVlLmNoYXJDb2RlQXQoZW5kKSA9PT0gc2VtaWNvbG9uXG5cbiAgICAgIGlmICh0ZXJtaW5hdGVkKSB7XG4gICAgICAgIGVuZCsrXG5cbiAgICAgICAgbmFtZWRFbnRpdHkgPSB0eXBlID09PSBuYW1lID8gZGVjb2RlRW50aXR5KGNoYXJhY3RlcnMpIDogZmFsc2VcblxuICAgICAgICBpZiAobmFtZWRFbnRpdHkpIHtcbiAgICAgICAgICBlbnRpdHlDaGFyYWN0ZXJzID0gY2hhcmFjdGVyc1xuICAgICAgICAgIGVudGl0eSA9IG5hbWVkRW50aXR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGlmZiA9IDEgKyBlbmQgLSBzdGFydFxuXG4gICAgICBpZiAoIXRlcm1pbmF0ZWQgJiYgIW5vblRlcm1pbmF0ZWQpIHtcbiAgICAgICAgLy8gRW1wdHkuXG4gICAgICB9IGVsc2UgaWYgKCFjaGFyYWN0ZXJzKSB7XG4gICAgICAgIC8vIEFuIGVtcHR5IChwb3NzaWJsZSkgZW50aXR5IGlzIHZhbGlkLCB1bmxlc3MgaXTigJlzIG51bWVyaWMgKHRodXMgYW5cbiAgICAgICAgLy8gYW1wZXJzYW5kIGZvbGxvd2VkIGJ5IGFuIG9jdG90aG9ycCkuXG4gICAgICAgIGlmICh0eXBlICE9PSBuYW1lKSB7XG4gICAgICAgICAgd2FybmluZyhudW1lcmljRW1wdHksIGRpZmYpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gbmFtZSkge1xuICAgICAgICAvLyBBbiBhbXBlcnNhbmQgZm9sbG93ZWQgYnkgYW55dGhpbmcgdW5rbm93biwgYW5kIG5vdCB0ZXJtaW5hdGVkLCBpc1xuICAgICAgICAvLyBpbnZhbGlkLlxuICAgICAgICBpZiAodGVybWluYXRlZCAmJiAhZW50aXR5KSB7XG4gICAgICAgICAgd2FybmluZyhuYW1lZFVua25vd24sIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgdGhlcmVzIHNvbWV0aGluZyBhZnRlciBhbiBlbnRpdHkgbmFtZSB3aGljaCBpcyBub3Qga25vd24sIGNhcFxuICAgICAgICAgIC8vIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAgaWYgKGVudGl0eUNoYXJhY3RlcnMgIT09IGNoYXJhY3RlcnMpIHtcbiAgICAgICAgICAgIGVuZCA9IGJlZ2luICsgZW50aXR5Q2hhcmFjdGVycy5sZW5ndGhcbiAgICAgICAgICAgIGRpZmYgPSAxICsgZW5kIC0gYmVnaW5cbiAgICAgICAgICAgIHRlcm1pbmF0ZWQgPSBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHRoZSByZWZlcmVuY2UgaXMgbm90IHRlcm1pbmF0ZWQsIHdhcm4uXG4gICAgICAgICAgaWYgKCF0ZXJtaW5hdGVkKSB7XG4gICAgICAgICAgICByZWFzb24gPSBlbnRpdHlDaGFyYWN0ZXJzID8gbmFtZWROb3RUZXJtaW5hdGVkIDogbmFtZWRFbXB0eVxuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgIGZvbGxvd2luZyA9IHZhbHVlLmNoYXJDb2RlQXQoZW5kKVxuXG4gICAgICAgICAgICAgIGlmIChmb2xsb3dpbmcgPT09IGVxdWFsc1RvKSB7XG4gICAgICAgICAgICAgICAgd2FybmluZyhyZWFzb24sIGRpZmYpXG4gICAgICAgICAgICAgICAgZW50aXR5ID0gbnVsbFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFscGhhbnVtZXJpY2FsKGZvbGxvd2luZykpIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSBudWxsXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2FybmluZyhyZWFzb24sIGRpZmYpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdhcm5pbmcocmVhc29uLCBkaWZmKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlZmVyZW5jZSA9IGVudGl0eVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0ZXJtaW5hdGVkKSB7XG4gICAgICAgICAgLy8gQWxsIG5vbi10ZXJtaW5hdGVkIG51bWVyaWMgZW50aXRpZXMgYXJlIG5vdCByZW5kZXJlZCwgYW5kIHRyaWdnZXIgYVxuICAgICAgICAgIC8vIHdhcm5pbmcuXG4gICAgICAgICAgd2FybmluZyhudW1lcmljTm90VGVybWluYXRlZCwgZGlmZilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gdGVybWluYXRlZCBhbmQgbnVtYmVyLCBwYXJzZSBhcyBlaXRoZXIgaGV4YWRlY2ltYWwgb3IgZGVjaW1hbC5cbiAgICAgICAgcmVmZXJlbmNlID0gcGFyc2VJbnQoY2hhcmFjdGVycywgYmFzZXNbdHlwZV0pXG5cbiAgICAgICAgLy8gVHJpZ2dlciBhIHdhcm5pbmcgd2hlbiB0aGUgcGFyc2VkIG51bWJlciBpcyBwcm9oaWJpdGVkLCBhbmQgcmVwbGFjZVxuICAgICAgICAvLyB3aXRoIHJlcGxhY2VtZW50IGNoYXJhY3Rlci5cbiAgICAgICAgaWYgKHByb2hpYml0ZWQocmVmZXJlbmNlKSkge1xuICAgICAgICAgIHdhcm5pbmcobnVtZXJpY1Byb2hpYml0ZWQsIGRpZmYpXG4gICAgICAgICAgcmVmZXJlbmNlID0gZnJvbUNoYXJDb2RlKHJlcGxhY2VtZW50Q2hhcmFjdGVyKVxuICAgICAgICB9IGVsc2UgaWYgKHJlZmVyZW5jZSBpbiBpbnZhbGlkKSB7XG4gICAgICAgICAgLy8gVHJpZ2dlciBhIHdhcm5pbmcgd2hlbiB0aGUgcGFyc2VkIG51bWJlciBpcyBkaXNhbGxvd2VkLCBhbmQgcmVwbGFjZVxuICAgICAgICAgIC8vIGJ5IGFuIGFsdGVybmF0aXZlLlxuICAgICAgICAgIHdhcm5pbmcobnVtZXJpY0Rpc2FsbG93ZWQsIGRpZmYpXG4gICAgICAgICAgcmVmZXJlbmNlID0gaW52YWxpZFtyZWZlcmVuY2VdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyc2UgdGhlIG51bWJlci5cbiAgICAgICAgICBvdXRwdXQgPSAnJ1xuXG4gICAgICAgICAgLy8gVHJpZ2dlciBhIHdhcm5pbmcgd2hlbiB0aGUgcGFyc2VkIG51bWJlciBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAgICAgICAgaWYgKGRpc2FsbG93ZWQocmVmZXJlbmNlKSkge1xuICAgICAgICAgICAgd2FybmluZyhudW1lcmljRGlzYWxsb3dlZCwgZGlmZilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTdHJpbmdpZnkgdGhlIG51bWJlci5cbiAgICAgICAgICBpZiAocmVmZXJlbmNlID4gMHhmZmZmKSB7XG4gICAgICAgICAgICByZWZlcmVuY2UgLT0gMHgxMDAwMFxuICAgICAgICAgICAgb3V0cHV0ICs9IGZyb21DaGFyQ29kZSgocmVmZXJlbmNlID4+PiAoMTAgJiAweDNmZikpIHwgMHhkODAwKVxuICAgICAgICAgICAgcmVmZXJlbmNlID0gMHhkYzAwIHwgKHJlZmVyZW5jZSAmIDB4M2ZmKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlZmVyZW5jZSA9IG91dHB1dCArIGZyb21DaGFyQ29kZShyZWZlcmVuY2UpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRm91bmQgaXQhXG4gICAgICAvLyBGaXJzdCBlYXQgdGhlIHF1ZXVlZCBjaGFyYWN0ZXJzIGFzIG5vcm1hbCB0ZXh0LCB0aGVuIGVhdCBhbiBlbnRpdHkuXG4gICAgICBpZiAocmVmZXJlbmNlKSB7XG4gICAgICAgIGZsdXNoKClcblxuICAgICAgICBwcmV2ID0gbm93KClcbiAgICAgICAgaW5kZXggPSBlbmQgLSAxXG4gICAgICAgIGNvbHVtbiArPSBlbmQgLSBzdGFydCArIDFcbiAgICAgICAgcmVzdWx0LnB1c2gocmVmZXJlbmNlKVxuICAgICAgICBuZXh0ID0gbm93KClcbiAgICAgICAgbmV4dC5vZmZzZXQrK1xuXG4gICAgICAgIGlmIChoYW5kbGVSZWZlcmVuY2UpIHtcbiAgICAgICAgICBoYW5kbGVSZWZlcmVuY2UuY2FsbChcbiAgICAgICAgICAgIHJlZmVyZW5jZUNvbnRleHQsXG4gICAgICAgICAgICByZWZlcmVuY2UsXG4gICAgICAgICAgICB7c3RhcnQ6IHByZXYsIGVuZDogbmV4dH0sXG4gICAgICAgICAgICB2YWx1ZS5zbGljZShzdGFydCAtIDEsIGVuZClcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBwcmV2ID0gbmV4dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgd2UgY291bGQgbm90IGZpbmQgYSByZWZlcmVuY2UsIHF1ZXVlIHRoZSBjaGVja2VkIGNoYXJhY3RlcnMgKGFzXG4gICAgICAgIC8vIG5vcm1hbCBjaGFyYWN0ZXJzKSwgYW5kIG1vdmUgdGhlIHBvaW50ZXIgdG8gdGhlaXIgZW5kLlxuICAgICAgICAvLyBUaGlzIGlzIHBvc3NpYmxlIGJlY2F1c2Ugd2UgY2FuIGJlIGNlcnRhaW4gbmVpdGhlciBuZXdsaW5lcyBub3JcbiAgICAgICAgLy8gYW1wZXJzYW5kcyBhcmUgaW5jbHVkZWQuXG4gICAgICAgIGNoYXJhY3RlcnMgPSB2YWx1ZS5zbGljZShzdGFydCAtIDEsIGVuZClcbiAgICAgICAgcXVldWUgKz0gY2hhcmFjdGVyc1xuICAgICAgICBjb2x1bW4gKz0gY2hhcmFjdGVycy5sZW5ndGhcbiAgICAgICAgaW5kZXggPSBlbmQgLSAxXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhhbmRsZSBhbnl0aGluZyBvdGhlciB0aGFuIGFuIGFtcGVyc2FuZCwgaW5jbHVkaW5nIG5ld2xpbmVzIGFuZCBFT0YuXG4gICAgICBpZiAoXG4gICAgICAgIGNoYXJhY3RlciA9PT0gMTAgLy8gTGluZSBmZWVkXG4gICAgICApIHtcbiAgICAgICAgbGluZSsrXG4gICAgICAgIGxpbmVzKytcbiAgICAgICAgY29sdW1uID0gMFxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhcmFjdGVyID09PSBjaGFyYWN0ZXIpIHtcbiAgICAgICAgcXVldWUgKz0gZnJvbUNoYXJDb2RlKGNoYXJhY3RlcilcbiAgICAgICAgY29sdW1uKytcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZsdXNoKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHJlZHVjZWQgbm9kZXMuXG4gIHJldHVybiByZXN1bHQuam9pbignJylcblxuICAvLyBHZXQgY3VycmVudCBwb3NpdGlvbi5cbiAgZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICBvZmZzZXQ6IGluZGV4ICsgKHBvcy5vZmZzZXQgfHwgMClcbiAgICB9XG4gIH1cblxuICAvLyDigJxUaHJvd+KAnSBhIHBhcnNlLWVycm9yOiBhIHdhcm5pbmcuXG4gIGZ1bmN0aW9uIHBhcnNlRXJyb3IoY29kZSwgb2Zmc2V0KSB7XG4gICAgdmFyIHBvc2l0aW9uID0gbm93KClcblxuICAgIHBvc2l0aW9uLmNvbHVtbiArPSBvZmZzZXRcbiAgICBwb3NpdGlvbi5vZmZzZXQgKz0gb2Zmc2V0XG5cbiAgICBoYW5kbGVXYXJuaW5nLmNhbGwod2FybmluZ0NvbnRleHQsIG1lc3NhZ2VzW2NvZGVdLCBwb3NpdGlvbiwgY29kZSlcbiAgfVxuXG4gIC8vIEZsdXNoIGBxdWV1ZWAgKG5vcm1hbCB0ZXh0KS5cbiAgLy8gTWFjcm8gaW52b2tlZCBiZWZvcmUgZWFjaCBlbnRpdHkgYW5kIGF0IHRoZSBlbmQgb2YgYHZhbHVlYC5cbiAgLy8gRG9lcyBub3RoaW5nIHdoZW4gYHF1ZXVlYCBpcyBlbXB0eS5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICByZXN1bHQucHVzaChxdWV1ZSlcblxuICAgICAgaWYgKGhhbmRsZVRleHQpIHtcbiAgICAgICAgaGFuZGxlVGV4dC5jYWxsKHRleHRDb250ZXh0LCBxdWV1ZSwge3N0YXJ0OiBwcmV2LCBlbmQ6IG5vdygpfSlcbiAgICAgIH1cblxuICAgICAgcXVldWUgPSAnJ1xuICAgIH1cbiAgfVxufVxuXG4vLyBDaGVjayBpZiBgY2hhcmFjdGVyYCBpcyBvdXRzaWRlIHRoZSBwZXJtaXNzaWJsZSB1bmljb2RlIHJhbmdlLlxuZnVuY3Rpb24gcHJvaGliaXRlZChjb2RlKSB7XG4gIHJldHVybiAoY29kZSA+PSAweGQ4MDAgJiYgY29kZSA8PSAweGRmZmYpIHx8IGNvZGUgPiAweDEwZmZmZlxufVxuXG4vLyBDaGVjayBpZiBgY2hhcmFjdGVyYCBpcyBkaXNhbGxvd2VkLlxuZnVuY3Rpb24gZGlzYWxsb3dlZChjb2RlKSB7XG4gIHJldHVybiAoXG4gICAgKGNvZGUgPj0gMHgwMDAxICYmIGNvZGUgPD0gMHgwMDA4KSB8fFxuICAgIGNvZGUgPT09IDB4MDAwYiB8fFxuICAgIChjb2RlID49IDB4MDAwZCAmJiBjb2RlIDw9IDB4MDAxZikgfHxcbiAgICAoY29kZSA+PSAweDAwN2YgJiYgY29kZSA8PSAweDAwOWYpIHx8XG4gICAgKGNvZGUgPj0gMHhmZGQwICYmIGNvZGUgPD0gMHhmZGVmKSB8fFxuICAgIChjb2RlICYgMHhmZmZmKSA9PT0gMHhmZmZmIHx8XG4gICAgKGNvZGUgJiAweGZmZmYpID09PSAweGZmZmVcbiAgKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/parse-entities/index.js\n");

/***/ })

};
;