// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __require = import.meta.require;

// node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS((exports, module) => {
  var p = process || {};
  var argv = p.argv || [];
  var env = p.env || {};
  var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
  var formatter = (open, close, replace = open) => (input) => {
    let string = "" + input, index = string.indexOf(close, open.length);
    return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
  };
  var replaceClose = (string, close, replace, index) => {
    let result = "", cursor = 0;
    do {
      result += string.substring(cursor, index) + replace;
      cursor = index + close.length;
      index = string.indexOf(close, cursor);
    } while (~index);
    return result + string.substring(cursor);
  };
  var createColors = (enabled = isColorSupported) => {
    let f = enabled ? formatter : () => String;
    return {
      isColorSupported: enabled,
      reset: f("\x1B[0m", "\x1B[0m"),
      bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: f("\x1B[3m", "\x1B[23m"),
      underline: f("\x1B[4m", "\x1B[24m"),
      inverse: f("\x1B[7m", "\x1B[27m"),
      hidden: f("\x1B[8m", "\x1B[28m"),
      strikethrough: f("\x1B[9m", "\x1B[29m"),
      black: f("\x1B[30m", "\x1B[39m"),
      red: f("\x1B[31m", "\x1B[39m"),
      green: f("\x1B[32m", "\x1B[39m"),
      yellow: f("\x1B[33m", "\x1B[39m"),
      blue: f("\x1B[34m", "\x1B[39m"),
      magenta: f("\x1B[35m", "\x1B[39m"),
      cyan: f("\x1B[36m", "\x1B[39m"),
      white: f("\x1B[37m", "\x1B[39m"),
      gray: f("\x1B[90m", "\x1B[39m"),
      bgBlack: f("\x1B[40m", "\x1B[49m"),
      bgRed: f("\x1B[41m", "\x1B[49m"),
      bgGreen: f("\x1B[42m", "\x1B[49m"),
      bgYellow: f("\x1B[43m", "\x1B[49m"),
      bgBlue: f("\x1B[44m", "\x1B[49m"),
      bgMagenta: f("\x1B[45m", "\x1B[49m"),
      bgCyan: f("\x1B[46m", "\x1B[49m"),
      bgWhite: f("\x1B[47m", "\x1B[49m"),
      blackBright: f("\x1B[90m", "\x1B[39m"),
      redBright: f("\x1B[91m", "\x1B[39m"),
      greenBright: f("\x1B[92m", "\x1B[39m"),
      yellowBright: f("\x1B[93m", "\x1B[39m"),
      blueBright: f("\x1B[94m", "\x1B[39m"),
      magentaBright: f("\x1B[95m", "\x1B[39m"),
      cyanBright: f("\x1B[96m", "\x1B[39m"),
      whiteBright: f("\x1B[97m", "\x1B[39m"),
      bgBlackBright: f("\x1B[100m", "\x1B[49m"),
      bgRedBright: f("\x1B[101m", "\x1B[49m"),
      bgGreenBright: f("\x1B[102m", "\x1B[49m"),
      bgYellowBright: f("\x1B[103m", "\x1B[49m"),
      bgBlueBright: f("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
      bgCyanBright: f("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: f("\x1B[107m", "\x1B[49m")
    };
  };
  module.exports = createColors();
  module.exports.createColors = createColors;
});

// node_modules/sprintf-js/src/sprintf.js
var require_sprintf = __commonJS((exports) => {
  (function() {
    var re = {
      not_string: /[^s]/,
      not_bool: /[^t]/,
      not_type: /[^T]/,
      not_primitive: /[^v]/,
      number: /[diefg]/,
      numeric_arg: /[bcdiefguxX]/,
      json: /[j]/,
      not_json: /[^j]/,
      text: /^[^\x25]+/,
      modulo: /^\x25{2}/,
      placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
      key: /^([a-z_][a-z_\d]*)/i,
      key_access: /^\.([a-z_][a-z_\d]*)/i,
      index_access: /^\[(\d+)\]/,
      sign: /^[+-]/
    };
    function sprintf(key) {
      return sprintf_format(sprintf_parse(key), arguments);
    }
    function vsprintf(fmt, argv) {
      return sprintf.apply(null, [fmt].concat(argv || []));
    }
    function sprintf_format(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, arg, output = "", i, k, ph, pad, pad_character, pad_length, is_positive, sign;
      for (i = 0;i < tree_length; i++) {
        if (typeof parse_tree[i] === "string") {
          output += parse_tree[i];
        } else if (typeof parse_tree[i] === "object") {
          ph = parse_tree[i];
          if (ph.keys) {
            arg = argv[cursor];
            for (k = 0;k < ph.keys.length; k++) {
              if (arg == undefined) {
                throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
              }
              arg = arg[ph.keys[k]];
            }
          } else if (ph.param_no) {
            arg = argv[ph.param_no];
          } else {
            arg = argv[cursor++];
          }
          if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
            arg = arg();
          }
          if (re.numeric_arg.test(ph.type) && (typeof arg !== "number" && isNaN(arg))) {
            throw new TypeError(sprintf("[sprintf] expecting number but found %T", arg));
          }
          if (re.number.test(ph.type)) {
            is_positive = arg >= 0;
          }
          switch (ph.type) {
            case "b":
              arg = parseInt(arg, 10).toString(2);
              break;
            case "c":
              arg = String.fromCharCode(parseInt(arg, 10));
              break;
            case "d":
            case "i":
              arg = parseInt(arg, 10);
              break;
            case "j":
              arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
              break;
            case "e":
              arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
              break;
            case "f":
              arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
              break;
            case "g":
              arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
              break;
            case "o":
              arg = (parseInt(arg, 10) >>> 0).toString(8);
              break;
            case "s":
              arg = String(arg);
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "t":
              arg = String(!!arg);
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "T":
              arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "u":
              arg = parseInt(arg, 10) >>> 0;
              break;
            case "v":
              arg = arg.valueOf();
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "x":
              arg = (parseInt(arg, 10) >>> 0).toString(16);
              break;
            case "X":
              arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
              break;
          }
          if (re.json.test(ph.type)) {
            output += arg;
          } else {
            if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
              sign = is_positive ? "+" : "-";
              arg = arg.toString().replace(re.sign, "");
            } else {
              sign = "";
            }
            pad_character = ph.pad_char ? ph.pad_char === "0" ? "0" : ph.pad_char.charAt(1) : " ";
            pad_length = ph.width - (sign + arg).length;
            pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : "" : "";
            output += ph.align ? sign + arg + pad : pad_character === "0" ? sign + pad + arg : pad + sign + arg;
          }
        }
      }
      return output;
    }
    var sprintf_cache = Object.create(null);
    function sprintf_parse(fmt) {
      if (sprintf_cache[fmt]) {
        return sprintf_cache[fmt];
      }
      var _fmt = fmt, match, parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = re.text.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        } else if ((match = re.modulo.exec(_fmt)) !== null) {
          parse_tree.push("%");
        } else if ((match = re.placeholder.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = re.key.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                } else {
                  throw new SyntaxError("[sprintf] failed to parse named argument key");
                }
              }
            } else {
              throw new SyntaxError("[sprintf] failed to parse named argument key");
            }
            match[2] = field_list;
          } else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
          }
          parse_tree.push({
            placeholder: match[0],
            param_no: match[1],
            keys: match[2],
            sign: match[3],
            pad_char: match[4],
            align: match[5],
            width: match[6],
            precision: match[7],
            type: match[8]
          });
        } else {
          throw new SyntaxError("[sprintf] unexpected placeholder");
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return sprintf_cache[fmt] = parse_tree;
    }
    if (typeof exports !== "undefined") {
      exports.sprintf = sprintf;
      exports.vsprintf = vsprintf;
    }
    if (typeof window !== "undefined") {
      window["sprintf"] = sprintf;
      window["vsprintf"] = vsprintf;
      if (typeof define === "function" && define["amd"]) {
        define(function() {
          return {
            sprintf,
            vsprintf
          };
        });
      }
    }
  })();
});

// node_modules/xregexp/tools/output/categories.js
var require_categories = __commonJS((exports, module) => {
  module.exports = [
    {
      name: "C",
      alias: "Other",
      isBmpLast: true,
      bmp: "\x00-\x1F\x7F-\x9F\xAD\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EE\u05F5-\u0605\u061C\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB\u07FC\u082E\u082F\u083F\u085C\u085D\u085F\u086B-\u086F\u088F-\u0897\u08E2\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A77-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C0D\u0C11\u0C29\u0C3A\u0C3B\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B\u0C5C\u0C5E\u0C5F\u0C64\u0C65\u0C70-\u0C76\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDC\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D50-\u0D53\u0D64\u0D65\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u1716-\u171E\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180E\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ACF-\u1AFF\u1B4D-\u1B4F\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C89-\u1C8F\u1CBB\u1CBC\u1CC8-\u1CCF\u1CFB-\u1CFF\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20C1-\u20CF\u20F1-\u20FF\u218C-\u218F\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E5E-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u3130\u318F\u31E4-\u31EF\u321F\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7CB-\uA7CF\uA7D2\uA7D4\uA7DA-\uA7F1\uA82D-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C6-\uA8CD\uA8DA-\uA8DF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB6C-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC3-\uFBD2\uFD90\uFD91\uFDC8-\uFDCE\uFDD0-\uFDEF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF",
      astral: "\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9D-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD7B\uDD8B\uDD93\uDD96\uDDA2\uDDB2\uDDBA\uDDBD-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDF7F\uDF86\uDFB1\uDFBB-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE49-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD28-\uDD2F\uDD3A-\uDE5F\uDE7F\uDEAA\uDEAE\uDEAF\uDEB2-\uDEFF\uDF28-\uDF2F\uDF5A-\uDF6F\uDF8A-\uDFAF\uDFCC-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC76-\uDC7E\uDCBD\uDCC3-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD48-\uDD4F\uDD77-\uDD7F\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5C\uDC62-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEBA-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF47-\uDFFF]|\uD806[\uDC3C-\uDC9F\uDCF3-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD47-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE5-\uDDFF\uDE48-\uDE4F\uDEA3-\uDEAF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF9-\uDFAF\uDFB1-\uDFBF\uDFF2-\uDFFE]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80E-\uD810\uD812-\uD819\uD824-\uD82A\uD82D\uD82E\uD830-\uD832\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80B[\uDC00-\uDF8F\uDFF3-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDEBF\uDECA-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE9B-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82B[\uDC00-\uDFEF\uDFF4\uDFFC\uDFFF]|\uD82C[\uDD23-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD833[\uDC00-\uDEFF\uDF2E\uDF2F\uDF47-\uDF4F\uDFC4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDEB-\uDDFF\uDE46-\uDEDF\uDEF4-\uDEFF\uDF57-\uDF5F\uDF79-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD837[\uDC00-\uDEFF\uDF1F-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD50-\uDE8F\uDEAF-\uDEBF\uDEFA-\uDEFE\uDF00-\uDFFF]|\uD839[\uDC00-\uDFDF\uDFE7\uDFEC\uDFEF\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDC70\uDCB5-\uDD00\uDD3E-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDDAE-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDE5F\uDE66-\uDEFF]|\uD83D[\uDED8-\uDEDC\uDEED-\uDEEF\uDEFD-\uDEFF\uDF74-\uDF7F\uDFD9-\uDFDF\uDFEC-\uDFEF\uDFF1-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE\uDCAF\uDCB2-\uDCFF\uDE54-\uDE5F\uDE6E\uDE6F\uDE75-\uDE77\uDE7D-\uDE7F\uDE87-\uDE8F\uDEAD-\uDEAF\uDEBB-\uDEBF\uDEC6-\uDECF\uDEDA-\uDEDF\uDEE8-\uDEEF\uDEF7-\uDEFF\uDF93\uDFCB-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEE0-\uDEFF]|\uD86D[\uDF39-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]"
    },
    {
      name: "Cc",
      alias: "Control",
      bmp: "\x00-\x1F\x7F-\x9F"
    },
    {
      name: "Cf",
      alias: "Format",
      bmp: "\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB",
      astral: "\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC38]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]"
    },
    {
      name: "Cn",
      alias: "Unassigned",
      bmp: "\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EE\u05F5-\u05FF\u070E\u074B\u074C\u07B2-\u07BF\u07FB\u07FC\u082E\u082F\u083F\u085C\u085D\u085F\u086B-\u086F\u088F\u0892-\u0897\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A77-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C0D\u0C11\u0C29\u0C3A\u0C3B\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B\u0C5C\u0C5E\u0C5F\u0C64\u0C65\u0C70-\u0C76\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDC\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D50-\u0D53\u0D64\u0D65\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u1716-\u171E\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ACF-\u1AFF\u1B4D-\u1B4F\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C89-\u1C8F\u1CBB\u1CBC\u1CC8-\u1CCF\u1CFB-\u1CFF\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u2065\u2072\u2073\u208F\u209D-\u209F\u20C1-\u20CF\u20F1-\u20FF\u218C-\u218F\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E5E-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u3130\u318F\u31E4-\u31EF\u321F\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7CB-\uA7CF\uA7D2\uA7D4\uA7DA-\uA7F1\uA82D-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C6-\uA8CD\uA8DA-\uA8DF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB6C-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC3-\uFBD2\uFD90\uFD91\uFDC8-\uFDCE\uFDD0-\uFDEF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD\uFEFE\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFF8\uFFFE\uFFFF",
      astral: "\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9D-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD7B\uDD8B\uDD93\uDD96\uDDA2\uDDB2\uDDBA\uDDBD-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDF7F\uDF86\uDFB1\uDFBB-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE49-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD28-\uDD2F\uDD3A-\uDE5F\uDE7F\uDEAA\uDEAE\uDEAF\uDEB2-\uDEFF\uDF28-\uDF2F\uDF5A-\uDF6F\uDF8A-\uDFAF\uDFCC-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC76-\uDC7E\uDCC3-\uDCCC\uDCCE\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD48-\uDD4F\uDD77-\uDD7F\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5C\uDC62-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEBA-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF47-\uDFFF]|\uD806[\uDC3C-\uDC9F\uDCF3-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD47-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE5-\uDDFF\uDE48-\uDE4F\uDEA3-\uDEAF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF9-\uDFAF\uDFB1-\uDFBF\uDFF2-\uDFFE]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80E-\uD810\uD812-\uD819\uD824-\uD82A\uD82D\uD82E\uD830-\uD832\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDB7F][\uDC00-\uDFFF]|\uD80B[\uDC00-\uDF8F\uDFF3-\uDFFF]|\uD80D[\uDC2F\uDC39-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDEBF\uDECA-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE9B-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82B[\uDC00-\uDFEF\uDFF4\uDFFC\uDFFF]|\uD82C[\uDD23-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA4-\uDFFF]|\uD833[\uDC00-\uDEFF\uDF2E\uDF2F\uDF47-\uDF4F\uDFC4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDDEB-\uDDFF\uDE46-\uDEDF\uDEF4-\uDEFF\uDF57-\uDF5F\uDF79-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD837[\uDC00-\uDEFF\uDF1F-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD50-\uDE8F\uDEAF-\uDEBF\uDEFA-\uDEFE\uDF00-\uDFFF]|\uD839[\uDC00-\uDFDF\uDFE7\uDFEC\uDFEF\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDC70\uDCB5-\uDD00\uDD3E-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDDAE-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDE5F\uDE66-\uDEFF]|\uD83D[\uDED8-\uDEDC\uDEED-\uDEEF\uDEFD-\uDEFF\uDF74-\uDF7F\uDFD9-\uDFDF\uDFEC-\uDFEF\uDFF1-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE\uDCAF\uDCB2-\uDCFF\uDE54-\uDE5F\uDE6E\uDE6F\uDE75-\uDE77\uDE7D-\uDE7F\uDE87-\uDE8F\uDEAD-\uDEAF\uDEBB-\uDEBF\uDEC6-\uDECF\uDEDA-\uDEDF\uDEE8-\uDEEF\uDEF7-\uDEFF\uDF93\uDFCB-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEE0-\uDEFF]|\uD86D[\uDF39-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00\uDC02-\uDC1F\uDC80-\uDCFF\uDDF0-\uDFFF]|[\uDBBF\uDBFF][\uDFFE\uDFFF]"
    },
    {
      name: "Co",
      alias: "Private_Use",
      bmp: "\uE000-\uF8FF",
      astral: "[\uDB80-\uDBBE\uDBC0-\uDBFE][\uDC00-\uDFFF]|[\uDBBF\uDBFF][\uDC00-\uDFFD]"
    },
    {
      name: "Cs",
      alias: "Surrogate",
      bmp: "\uD800-\uDFFF"
    },
    {
      name: "L",
      alias: "Letter",
      bmp: "A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]"
    },
    {
      name: "LC",
      alias: "Cased_Letter",
      bmp: "A-Za-z\xB5\xC0-\xD6\xD8-\xF6\xF8-\u01BA\u01BC-\u01BF\u01C4-\u0293\u0295-\u02AF\u0370-\u0373\u0376\u0377\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0560-\u0588\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FD-\u10FF\u13A0-\u13F5\u13F8-\u13FD\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2134\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C7B\u2C7E-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA640-\uA66D\uA680-\uA69B\uA722-\uA76F\uA771-\uA787\uA78B-\uA78E\uA790-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F5\uA7F6\uA7FA\uAB30-\uAB5A\uAB60-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A",
      astral: "\uD801[\uDC00-\uDC4F\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC]|\uD803[\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD806[\uDCA0-\uDCDF]|\uD81B[\uDE40-\uDE7F]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF09\uDF0B-\uDF1E]|\uD83A[\uDD00-\uDD43]"
    },
    {
      name: "Ll",
      alias: "Lowercase_Letter",
      bmp: "a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5F\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7BB\uA7BD\uA7BF\uA7C1\uA7C3\uA7C8\uA7CA\uA7D1\uA7D3\uA7D5\uA7D7\uA7D9\uA7F6\uA7FA\uAB30-\uAB5A\uAB60-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A",
      astral: "\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD837[\uDF00-\uDF09\uDF0B-\uDF1E]|\uD83A[\uDD22-\uDD43]"
    },
    {
      name: "Lm",
      alias: "Modifier_Letter",
      bmp: "\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u08C9\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F2-\uA7F4\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uAB69\uFF70\uFF9E\uFF9F",
      astral: "\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD838[\uDD37-\uDD3D]|\uD83A\uDD4B"
    },
    {
      name: "Lo",
      alias: "Other_Letter",
      bmp: "\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05EF-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C8\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF4A\uDF50]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD837\uDF0A|\uD838[\uDD00-\uDD2C\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]"
    },
    {
      name: "Lt",
      alias: "Titlecase_Letter",
      bmp: "\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC"
    },
    {
      name: "Lu",
      alias: "Uppercase_Letter",
      bmp: "A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A",
      astral: "\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]"
    },
    {
      name: "M",
      alias: "Mark",
      bmp: "\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F",
      astral: "\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC70\uDC73\uDC74\uDC7F-\uDC82\uDCB0-\uDCBA\uDCC2\uDD00-\uDD02\uDD27-\uDD34\uDD45\uDD46\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDC9-\uDDCC\uDDCE\uDDCF\uDE2C-\uDE37\uDE3E\uDEDF-\uDEEA\uDF00-\uDF03\uDF3B\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC35-\uDC46\uDC5E\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDEAB-\uDEB7\uDF1D-\uDF2B]|\uD806[\uDC2C-\uDC3A\uDD30-\uDD35\uDD37\uDD38\uDD3B-\uDD3E\uDD40\uDD42\uDD43\uDDD1-\uDDD7\uDDDA-\uDDE0\uDDE4\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE3E\uDE47\uDE51-\uDE5B\uDE8A-\uDE99]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD8A-\uDD8E\uDD90\uDD91\uDD93-\uDD97\uDEF3-\uDEF6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF51-\uDF87\uDF8F-\uDF92\uDFE4\uDFF0\uDFF1]|\uD82F[\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]"
    },
    {
      name: "Mc",
      alias: "Spacing_Mark",
      bmp: "\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BE-\u09C0\u09C7\u09C8\u09CB\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0D02\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2\u0DF3\u0F3E\u0F3F\u0F7F\u102B\u102C\u1031\u1038\u103B\u103C\u1056\u1057\u1062-\u1064\u1067-\u106D\u1083\u1084\u1087-\u108C\u108F\u109A-\u109C\u1715\u1734\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1A19\u1A1A\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF7\u302E\u302F\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAA7B\uAA7D\uAAEB\uAAEE\uAAEF\uAAF5\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC",
      astral: "\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD45\uDD46\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDDCE\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3E\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63]|\uD805[\uDC35-\uDC37\uDC40\uDC41\uDC45\uDCB0-\uDCB2\uDCB9\uDCBB-\uDCBE\uDCC1\uDDAF-\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF20\uDF21\uDF26]|\uD806[\uDC2C-\uDC2E\uDC38\uDD30-\uDD35\uDD37\uDD38\uDD3D\uDD40\uDD42\uDDD1-\uDDD3\uDDDC-\uDDDF\uDDE4\uDE39\uDE57\uDE58\uDE97]|\uD807[\uDC2F\uDC3E\uDCA9\uDCB1\uDCB4\uDD8A-\uDD8E\uDD93\uDD94\uDD96\uDEF5\uDEF6]|\uD81B[\uDF51-\uDF87\uDFF0\uDFF1]|\uD834[\uDD65\uDD66\uDD6D-\uDD72]"
    },
    {
      name: "Me",
      alias: "Enclosing_Mark",
      bmp: "\u0488\u0489\u1ABE\u20DD-\u20E0\u20E2-\u20E4\uA670-\uA672"
    },
    {
      name: "Mn",
      alias: "Nonspacing_Mark",
      bmp: "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B55\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0D81\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F",
      astral: "\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC01\uDC38-\uDC46\uDC70\uDC73\uDC74\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDCC2\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDC9-\uDDCC\uDDCF\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3B\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDC5E\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD806[\uDC2F-\uDC37\uDC39\uDC3A\uDD3B\uDD3C\uDD3E\uDD43\uDDD4-\uDDD7\uDDDA\uDDDB\uDDE0\uDE01-\uDE0A\uDE33-\uDE38\uDE3B-\uDE3E\uDE47\uDE51-\uDE56\uDE59-\uDE5B\uDE8A-\uDE96\uDE98\uDE99]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD90\uDD91\uDD95\uDD97\uDEF3\uDEF4]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF8F-\uDF92\uDFE4]|\uD82F[\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]"
    },
    {
      name: "N",
      alias: "Number",
      bmp: "0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D58-\u0D5E\u0D66-\u0D78\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19",
      astral: "\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE48\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDD30-\uDD39\uDE60-\uDE7E\uDF1D-\uDF26\uDF51-\uDF54\uDFC5-\uDFCB]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2\uDD50-\uDD59]|\uD807[\uDC50-\uDC6C\uDD50-\uDD59\uDDA0-\uDDA9\uDFC0-\uDFD4]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDEC0-\uDEC9\uDF50-\uDF59\uDF5B-\uDF61]|\uD81B[\uDE80-\uDE96]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDFCE-\uDFFF]|\uD838[\uDD40-\uDD49\uDEF0-\uDEF9]|\uD83A[\uDCC7-\uDCCF\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]"
    },
    {
      name: "Nd",
      alias: "Decimal_Number",
      bmp: "0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19",
      astral: "\uD801[\uDCA0-\uDCA9]|\uD803[\uDD30-\uDD39]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9\uDD50-\uDD59]|\uD807[\uDC50-\uDC59\uDD50-\uDD59\uDDA0-\uDDA9]|\uD81A[\uDE60-\uDE69\uDEC0-\uDEC9\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD838[\uDD40-\uDD49\uDEF0-\uDEF9]|\uD83A[\uDD50-\uDD59]|\uD83E[\uDFF0-\uDFF9]"
    },
    {
      name: "Nl",
      alias: "Letter_Number",
      bmp: "\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF",
      astral: "\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]"
    },
    {
      name: "No",
      alias: "Other_Number",
      bmp: "\xB2\xB3\xB9\xBC-\xBE\u09F4-\u09F9\u0B72-\u0B77\u0BF0-\u0BF2\u0C78-\u0C7E\u0D58-\u0D5E\u0D70-\u0D78\u0F2A-\u0F33\u1369-\u137C\u17F0-\u17F9\u19DA\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215F\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA830-\uA835",
      astral: "\uD800[\uDD07-\uDD33\uDD75-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE48\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E\uDF1D-\uDF26\uDF51-\uDF54\uDFC5-\uDFCB]|\uD804[\uDC52-\uDC65\uDDE1-\uDDF4]|\uD805[\uDF3A\uDF3B]|\uD806[\uDCEA-\uDCF2]|\uD807[\uDC5A-\uDC6C\uDFC0-\uDFD4]|\uD81A[\uDF5B-\uDF61]|\uD81B[\uDE80-\uDE96]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD83A[\uDCC7-\uDCCF]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D]|\uD83C[\uDD00-\uDD0C]"
    },
    {
      name: "P",
      alias: "Punctuation",
      bmp: "!-#%-\\*,-\\/:;\\?@\\[-\\]_\\{\\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65",
      astral: "\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]"
    },
    {
      name: "Pc",
      alias: "Connector_Punctuation",
      bmp: "_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F"
    },
    {
      name: "Pd",
      alias: "Dash_Punctuation",
      bmp: "\\-\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u2E5D\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D",
      astral: "\uD803\uDEAD"
    },
    {
      name: "Pe",
      alias: "Close_Punctuation",
      bmp: "\\)\\]\\}\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u2E56\u2E58\u2E5A\u2E5C\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63"
    },
    {
      name: "Pf",
      alias: "Final_Punctuation",
      bmp: "\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21"
    },
    {
      name: "Pi",
      alias: "Initial_Punctuation",
      bmp: "\xAB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20"
    },
    {
      name: "Po",
      alias: "Other_Punctuation",
      bmp: "!-#%-'\\*,\\.\\/:;\\?@\\\xA1\xA7\xB6\xB7\xBF\u037E\u0387\u055A-\u055F\u0589\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u166E\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u1805\u1807-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205E\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E16\u2E18\u2E19\u2E1B\u2E1E\u2E1F\u2E2A-\u2E2E\u2E30-\u2E39\u2E3C-\u2E3F\u2E41\u2E43-\u2E4F\u2E52-\u2E54\u3001-\u3003\u303D\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFE10-\uFE16\uFE19\uFE30\uFE45\uFE46\uFE49-\uFE4C\uFE50-\uFE52\uFE54-\uFE57\uFE5F-\uFE61\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF07\uFF0A\uFF0C\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3C\uFF61\uFF64\uFF65",
      astral: "\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]"
    },
    {
      name: "Ps",
      alias: "Open_Punctuation",
      bmp: "\\(\\[\\{\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2308\u230A\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u2E42\u2E55\u2E57\u2E59\u2E5B\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3F\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62"
    },
    {
      name: "S",
      alias: "Symbol",
      bmp: "\\$\\+<->\\^`\\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD",
      astral: "\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDD-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC5\uDED0-\uDED9\uDEE0-\uDEE7\uDEF0-\uDEF6\uDF00-\uDF92\uDF94-\uDFCA]"
    },
    {
      name: "Sc",
      alias: "Currency_Symbol",
      bmp: "\\$\xA2-\xA5\u058F\u060B\u07FE\u07FF\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20C0\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6",
      astral: "\uD807[\uDFDD-\uDFE0]|\uD838\uDEFF|\uD83B\uDCB0"
    },
    {
      name: "Sk",
      alias: "Modifier_Symbol",
      bmp: "\\^`\xA8\xAF\xB4\xB8\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u0888\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u309B\u309C\uA700-\uA716\uA720\uA721\uA789\uA78A\uAB5B\uAB6A\uAB6B\uFBB2-\uFBC2\uFF3E\uFF40\uFFE3",
      astral: "\uD83C[\uDFFB-\uDFFF]"
    },
    {
      name: "Sm",
      alias: "Math_Symbol",
      bmp: "\\+<->\\|~\xAC\xB1\xD7\xF7\u03F6\u0606-\u0608\u2044\u2052\u207A-\u207C\u208A-\u208C\u2118\u2140-\u2144\u214B\u2190-\u2194\u219A\u219B\u21A0\u21A3\u21A6\u21AE\u21CE\u21CF\u21D2\u21D4\u21F4-\u22FF\u2320\u2321\u237C\u239B-\u23B3\u23DC-\u23E1\u25B7\u25C1\u25F8-\u25FF\u266F\u27C0-\u27C4\u27C7-\u27E5\u27F0-\u27FF\u2900-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2AFF\u2B30-\u2B44\u2B47-\u2B4C\uFB29\uFE62\uFE64-\uFE66\uFF0B\uFF1C-\uFF1E\uFF5C\uFF5E\uFFE2\uFFE9-\uFFEC",
      astral: "\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD83B[\uDEF0\uDEF1]"
    },
    {
      name: "So",
      alias: "Other_Symbol",
      bmp: "\xA6\xA9\xAE\xB0\u0482\u058D\u058E\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09FA\u0B70\u0BF3-\u0BF8\u0BFA\u0C7F\u0D4F\u0D79\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u214A\u214C\u214D\u214F\u218A\u218B\u2195-\u2199\u219C-\u219F\u21A1\u21A2\u21A4\u21A5\u21A7-\u21AD\u21AF-\u21CD\u21D0\u21D1\u21D3\u21D5-\u21F3\u2300-\u2307\u230C-\u231F\u2322-\u2328\u232B-\u237B\u237D-\u239A\u23B4-\u23DB\u23E2-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u25B6\u25B8-\u25C0\u25C2-\u25F7\u2600-\u266E\u2670-\u2767\u2794-\u27BF\u2800-\u28FF\u2B00-\u2B2F\u2B45\u2B46\u2B4D-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA828-\uA82B\uA836\uA837\uA839\uAA77-\uAA79\uFD40-\uFD4F\uFDCF\uFDFD-\uFDFF\uFFE4\uFFE8\uFFED\uFFEE\uFFFC\uFFFD",
      astral: "\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFDC\uDFE1-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838\uDD4F|\uD83B[\uDCAC\uDD2E]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFA]|\uD83D[\uDC00-\uDED7\uDEDD-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC5\uDED0-\uDED9\uDEE0-\uDEE7\uDEF0-\uDEF6\uDF00-\uDF92\uDF94-\uDFCA]"
    },
    {
      name: "Z",
      alias: "Separator",
      bmp: " \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000"
    },
    {
      name: "Zl",
      alias: "Line_Separator",
      bmp: "\u2028"
    },
    {
      name: "Zp",
      alias: "Paragraph_Separator",
      bmp: "\u2029"
    },
    {
      name: "Zs",
      alias: "Space_Separator",
      bmp: " \xA0\u1680\u2000-\u200A\u202F\u205F\u3000"
    }
  ];
});

// node_modules/xregexp/tools/output/properties.js
var require_properties = __commonJS((exports, module) => {
  module.exports = [
    {
      name: "ASCII",
      bmp: "\x00-\x7F"
    },
    {
      name: "Alphabetic",
      bmp: "A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0657\u0659-\u065F\u066E-\u06D3\u06D5-\u06DC\u06E1-\u06E8\u06ED-\u06EF\u06FA-\u06FC\u06FF\u0710-\u073F\u074D-\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0817\u081A-\u082C\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u08D4-\u08DF\u08E3-\u08E9\u08F0-\u093B\u093D-\u094C\u094E-\u0950\u0955-\u0963\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C4\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09F0\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A51\u0A59-\u0A5C\u0A5E\u0A70-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC5\u0AC7-\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0-\u0AE3\u0AF9-\u0AFC\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D-\u0B44\u0B47\u0B48\u0B4B\u0B4C\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4C\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCC\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E46\u0E4D\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0ECD\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F71-\u0F81\u0F88-\u0F97\u0F99-\u0FBC\u1000-\u1036\u1038\u103B-\u103F\u1050-\u108F\u109A-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1713\u171F-\u1733\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17C8\u17D7\u17DC\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u1938\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A1B\u1A20-\u1A5E\u1A61-\u1A74\u1AA7\u1ABF\u1AC0\u1ACC-\u1ACE\u1B00-\u1B33\u1B35-\u1B43\u1B45-\u1B4C\u1B80-\u1BA9\u1BAC-\u1BAF\u1BBA-\u1BE5\u1BE7-\u1BF1\u1C00-\u1C36\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1DE7-\u1DF4\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u24B6-\u24E9\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA674-\uA67B\uA67F-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA805\uA807-\uA827\uA840-\uA873\uA880-\uA8C3\uA8C5\uA8F2-\uA8F7\uA8FB\uA8FD-\uA8FF\uA90A-\uA92A\uA930-\uA952\uA960-\uA97C\uA980-\uA9B2\uA9B4-\uA9BF\uA9CF\uA9E0-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA60-\uAA76\uAA7A-\uAABE\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC45\uDC71-\uDC75\uDC82-\uDCB8\uDCC2\uDCD0-\uDCE8\uDD00-\uDD32\uDD44-\uDD47\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDCE\uDDCF\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC41\uDC43-\uDC45\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE80-\uDEB5\uDEB8\uDF00-\uDF1A\uDF1D-\uDF2A\uDF40-\uDF46]|\uD806[\uDC00-\uDC38\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B\uDD3C\uDD3F-\uDD42\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDDF\uDDE1\uDDE3\uDDE4\uDE00-\uDE32\uDE35-\uDE3E\uDE50-\uDE97\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC3E\uDC40\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD41\uDD43\uDD46\uDD47\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD96\uDD98\uDEE0-\uDEF6\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD47\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]"
    },
    {
      name: "Any",
      isBmpLast: true,
      bmp: "\x00-\uFFFF",
      astral: "[\uD800-\uDBFF][\uDC00-\uDFFF]"
    },
    {
      name: "Default_Ignorable_Code_Point",
      bmp: "\xAD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8",
      astral: "\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|[\uDB40-\uDB43][\uDC00-\uDFFF]"
    },
    {
      name: "Lowercase",
      bmp: "a-z\xAA\xB5\xBA\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02B8\u02C0\u02C1\u02E0-\u02E4\u0345\u0371\u0373\u0377\u037A-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1DBF\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u2071\u207F\u2090-\u209C\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2170-\u217F\u2184\u24D0-\u24E9\u2C30-\u2C5F\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7D\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B-\uA69D\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7BB\uA7BD\uA7BF\uA7C1\uA7C3\uA7C8\uA7CA\uA7D1\uA7D3\uA7D5\uA7D7\uA7D9\uA7F6\uA7F8-\uA7FA\uAB30-\uAB5A\uAB5C-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A",
      astral: "\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDF80\uDF83-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD837[\uDF00-\uDF09\uDF0B-\uDF1E]|\uD83A[\uDD22-\uDD43]"
    },
    {
      name: "Noncharacter_Code_Point",
      bmp: "\uFDD0-\uFDEF\uFFFE\uFFFF",
      astral: "[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]"
    },
    {
      name: "Uppercase",
      bmp: "A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A",
      astral: "\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]"
    },
    {
      name: "White_Space",
      bmp: "\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000"
    }
  ];
});

// node_modules/xregexp/tools/output/scripts.js
var require_scripts = __commonJS((exports, module) => {
  module.exports = [
    {
      name: "Adlam",
      astral: "\uD83A[\uDD00-\uDD4B\uDD50-\uDD59\uDD5E\uDD5F]"
    },
    {
      name: "Ahom",
      astral: "\uD805[\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF46]"
    },
    {
      name: "Anatolian_Hieroglyphs",
      astral: "\uD811[\uDC00-\uDE46]"
    },
    {
      name: "Arabic",
      bmp: "\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061C-\u061E\u0620-\u063F\u0641-\u064A\u0656-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u0870-\u088E\u0890\u0891\u0898-\u08E1\u08E3-\u08FF\uFB50-\uFBC2\uFBD3-\uFD3D\uFD40-\uFD8F\uFD92-\uFDC7\uFDCF\uFDF0-\uFDFF\uFE70-\uFE74\uFE76-\uFEFC",
      astral: "\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]"
    },
    {
      name: "Armenian",
      bmp: "\u0531-\u0556\u0559-\u058A\u058D-\u058F\uFB13-\uFB17"
    },
    {
      name: "Avestan",
      astral: "\uD802[\uDF00-\uDF35\uDF39-\uDF3F]"
    },
    {
      name: "Balinese",
      bmp: "\u1B00-\u1B4C\u1B50-\u1B7E"
    },
    {
      name: "Bamum",
      bmp: "\uA6A0-\uA6F7",
      astral: "\uD81A[\uDC00-\uDE38]"
    },
    {
      name: "Bassa_Vah",
      astral: "\uD81A[\uDED0-\uDEED\uDEF0-\uDEF5]"
    },
    {
      name: "Batak",
      bmp: "\u1BC0-\u1BF3\u1BFC-\u1BFF"
    },
    {
      name: "Bengali",
      bmp: "\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FE"
    },
    {
      name: "Bhaiksuki",
      astral: "\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC45\uDC50-\uDC6C]"
    },
    {
      name: "Bopomofo",
      bmp: "\u02EA\u02EB\u3105-\u312F\u31A0-\u31BF"
    },
    {
      name: "Brahmi",
      astral: "\uD804[\uDC00-\uDC4D\uDC52-\uDC75\uDC7F]"
    },
    {
      name: "Braille",
      bmp: "\u2800-\u28FF"
    },
    {
      name: "Buginese",
      bmp: "\u1A00-\u1A1B\u1A1E\u1A1F"
    },
    {
      name: "Buhid",
      bmp: "\u1740-\u1753"
    },
    {
      name: "Canadian_Aboriginal",
      bmp: "\u1400-\u167F\u18B0-\u18F5",
      astral: "\uD806[\uDEB0-\uDEBF]"
    },
    {
      name: "Carian",
      astral: "\uD800[\uDEA0-\uDED0]"
    },
    {
      name: "Caucasian_Albanian",
      astral: "\uD801[\uDD30-\uDD63\uDD6F]"
    },
    {
      name: "Chakma",
      astral: "\uD804[\uDD00-\uDD34\uDD36-\uDD47]"
    },
    {
      name: "Cham",
      bmp: "\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA5C-\uAA5F"
    },
    {
      name: "Cherokee",
      bmp: "\u13A0-\u13F5\u13F8-\u13FD\uAB70-\uABBF"
    },
    {
      name: "Chorasmian",
      astral: "\uD803[\uDFB0-\uDFCB]"
    },
    {
      name: "Common",
      bmp: "\x00-@\\[-`\\{-\xA9\xAB-\xB9\xBB-\xBF\xD7\xF7\u02B9-\u02DF\u02E5-\u02E9\u02EC-\u02FF\u0374\u037E\u0385\u0387\u0605\u060C\u061B\u061F\u0640\u06DD\u08E2\u0964\u0965\u0E3F\u0FD5-\u0FD8\u10FB\u16EB-\u16ED\u1735\u1736\u1802\u1803\u1805\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5-\u1CF7\u1CFA\u2000-\u200B\u200E-\u2064\u2066-\u2070\u2074-\u207E\u2080-\u208E\u20A0-\u20C0\u2100-\u2125\u2127-\u2129\u212C-\u2131\u2133-\u214D\u214F-\u215F\u2189-\u218B\u2190-\u2426\u2440-\u244A\u2460-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2E00-\u2E5D\u2FF0-\u2FFB\u3000-\u3004\u3006\u3008-\u3020\u3030-\u3037\u303C-\u303F\u309B\u309C\u30A0\u30FB\u30FC\u3190-\u319F\u31C0-\u31E3\u3220-\u325F\u327F-\u32CF\u32FF\u3358-\u33FF\u4DC0-\u4DFF\uA700-\uA721\uA788-\uA78A\uA830-\uA839\uA92E\uA9CF\uAB5B\uAB6A\uAB6B\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFF70\uFF9E\uFF9F\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD",
      astral: "\uD800[\uDD00-\uDD02\uDD07-\uDD33\uDD37-\uDD3F\uDD90-\uDD9C\uDDD0-\uDDFC\uDEE1-\uDEFB]|\uD82F[\uDCA0-\uDCA3]|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD66\uDD6A-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDEE0-\uDEF3\uDF00-\uDF56\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDFCB\uDFCE-\uDFFF]|\uD83B[\uDC71-\uDCB4\uDD01-\uDD3D]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD00-\uDDAD\uDDE6-\uDDFF\uDE01\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDD-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC5\uDED0-\uDED9\uDEE0-\uDEE7\uDEF0-\uDEF6\uDF00-\uDF92\uDF94-\uDFCA\uDFF0-\uDFF9]|\uDB40[\uDC01\uDC20-\uDC7F]"
    },
    {
      name: "Coptic",
      bmp: "\u03E2-\u03EF\u2C80-\u2CF3\u2CF9-\u2CFF"
    },
    {
      name: "Cuneiform",
      astral: "\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC70-\uDC74\uDC80-\uDD43]"
    },
    {
      name: "Cypriot",
      astral: "\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F]"
    },
    {
      name: "Cypro_Minoan",
      astral: "\uD80B[\uDF90-\uDFF2]"
    },
    {
      name: "Cyrillic",
      bmp: "\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F"
    },
    {
      name: "Deseret",
      astral: "\uD801[\uDC00-\uDC4F]"
    },
    {
      name: "Devanagari",
      bmp: "\u0900-\u0950\u0955-\u0963\u0966-\u097F\uA8E0-\uA8FF"
    },
    {
      name: "Dives_Akuru",
      astral: "\uD806[\uDD00-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD46\uDD50-\uDD59]"
    },
    {
      name: "Dogra",
      astral: "\uD806[\uDC00-\uDC3B]"
    },
    {
      name: "Duployan",
      astral: "\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9C-\uDC9F]"
    },
    {
      name: "Egyptian_Hieroglyphs",
      astral: "\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E\uDC30-\uDC38]"
    },
    {
      name: "Elbasan",
      astral: "\uD801[\uDD00-\uDD27]"
    },
    {
      name: "Elymaic",
      astral: "\uD803[\uDFE0-\uDFF6]"
    },
    {
      name: "Ethiopic",
      bmp: "\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E",
      astral: "\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]"
    },
    {
      name: "Georgian",
      bmp: "\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u1C90-\u1CBA\u1CBD-\u1CBF\u2D00-\u2D25\u2D27\u2D2D"
    },
    {
      name: "Glagolitic",
      bmp: "\u2C00-\u2C5F",
      astral: "\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]"
    },
    {
      name: "Gothic",
      astral: "\uD800[\uDF30-\uDF4A]"
    },
    {
      name: "Grantha",
      astral: "\uD804[\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]"
    },
    {
      name: "Greek",
      bmp: "\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65",
      astral: "\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45]"
    },
    {
      name: "Gujarati",
      bmp: "\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9-\u0AFF"
    },
    {
      name: "Gunjala_Gondi",
      astral: "\uD807[\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9]"
    },
    {
      name: "Gurmukhi",
      bmp: "\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A76"
    },
    {
      name: "Han",
      bmp: "\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9",
      astral: "\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]"
    },
    {
      name: "Hangul",
      bmp: "\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC"
    },
    {
      name: "Hanifi_Rohingya",
      astral: "\uD803[\uDD00-\uDD27\uDD30-\uDD39]"
    },
    {
      name: "Hanunoo",
      bmp: "\u1720-\u1734"
    },
    {
      name: "Hatran",
      astral: "\uD802[\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDCFF]"
    },
    {
      name: "Hebrew",
      bmp: "\u0591-\u05C7\u05D0-\u05EA\u05EF-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F"
    },
    {
      name: "Hiragana",
      bmp: "\u3041-\u3096\u309D-\u309F",
      astral: "\uD82C[\uDC01-\uDD1F\uDD50-\uDD52]|\uD83C\uDE00"
    },
    {
      name: "Imperial_Aramaic",
      astral: "\uD802[\uDC40-\uDC55\uDC57-\uDC5F]"
    },
    {
      name: "Inherited",
      bmp: "\u0300-\u036F\u0485\u0486\u064B-\u0655\u0670\u0951-\u0954\u1AB0-\u1ACE\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u200C\u200D\u20D0-\u20F0\u302A-\u302D\u3099\u309A\uFE00-\uFE0F\uFE20-\uFE2D",
      astral: "\uD800[\uDDFD\uDEE0]|\uD804\uDF3B|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uDB40[\uDD00-\uDDEF]"
    },
    {
      name: "Inscriptional_Pahlavi",
      astral: "\uD802[\uDF60-\uDF72\uDF78-\uDF7F]"
    },
    {
      name: "Inscriptional_Parthian",
      astral: "\uD802[\uDF40-\uDF55\uDF58-\uDF5F]"
    },
    {
      name: "Javanese",
      bmp: "\uA980-\uA9CD\uA9D0-\uA9D9\uA9DE\uA9DF"
    },
    {
      name: "Kaithi",
      astral: "\uD804[\uDC80-\uDCC2\uDCCD]"
    },
    {
      name: "Kannada",
      bmp: "\u0C80-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2"
    },
    {
      name: "Katakana",
      bmp: "\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D",
      astral: "\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00\uDD20-\uDD22\uDD64-\uDD67]"
    },
    {
      name: "Kayah_Li",
      bmp: "\uA900-\uA92D\uA92F"
    },
    {
      name: "Kharoshthi",
      astral: "\uD802[\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F-\uDE48\uDE50-\uDE58]"
    },
    {
      name: "Khitan_Small_Script",
      astral: "\uD81B\uDFE4|\uD822[\uDF00-\uDFFF]|\uD823[\uDC00-\uDCD5]"
    },
    {
      name: "Khmer",
      bmp: "\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF"
    },
    {
      name: "Khojki",
      astral: "\uD804[\uDE00-\uDE11\uDE13-\uDE3E]"
    },
    {
      name: "Khudawadi",
      astral: "\uD804[\uDEB0-\uDEEA\uDEF0-\uDEF9]"
    },
    {
      name: "Lao",
      bmp: "\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF"
    },
    {
      name: "Latin",
      bmp: "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uAB66-\uAB69\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A",
      astral: "\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD837[\uDF00-\uDF1E]"
    },
    {
      name: "Lepcha",
      bmp: "\u1C00-\u1C37\u1C3B-\u1C49\u1C4D-\u1C4F"
    },
    {
      name: "Limbu",
      bmp: "\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1940\u1944-\u194F"
    },
    {
      name: "Linear_A",
      astral: "\uD801[\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]"
    },
    {
      name: "Linear_B",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA]"
    },
    {
      name: "Lisu",
      bmp: "\uA4D0-\uA4FF",
      astral: "\uD807\uDFB0"
    },
    {
      name: "Lycian",
      astral: "\uD800[\uDE80-\uDE9C]"
    },
    {
      name: "Lydian",
      astral: "\uD802[\uDD20-\uDD39\uDD3F]"
    },
    {
      name: "Mahajani",
      astral: "\uD804[\uDD50-\uDD76]"
    },
    {
      name: "Makasar",
      astral: "\uD807[\uDEE0-\uDEF8]"
    },
    {
      name: "Malayalam",
      bmp: "\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4F\u0D54-\u0D63\u0D66-\u0D7F"
    },
    {
      name: "Mandaic",
      bmp: "\u0840-\u085B\u085E"
    },
    {
      name: "Manichaean",
      astral: "\uD802[\uDEC0-\uDEE6\uDEEB-\uDEF6]"
    },
    {
      name: "Marchen",
      astral: "\uD807[\uDC70-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]"
    },
    {
      name: "Masaram_Gondi",
      astral: "\uD807[\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]"
    },
    {
      name: "Medefaidrin",
      astral: "\uD81B[\uDE40-\uDE9A]"
    },
    {
      name: "Meetei_Mayek",
      bmp: "\uAAE0-\uAAF6\uABC0-\uABED\uABF0-\uABF9"
    },
    {
      name: "Mende_Kikakui",
      astral: "\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]"
    },
    {
      name: "Meroitic_Cursive",
      astral: "\uD802[\uDDA0-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDDFF]"
    },
    {
      name: "Meroitic_Hieroglyphs",
      astral: "\uD802[\uDD80-\uDD9F]"
    },
    {
      name: "Miao",
      astral: "\uD81B[\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F]"
    },
    {
      name: "Modi",
      astral: "\uD805[\uDE00-\uDE44\uDE50-\uDE59]"
    },
    {
      name: "Mongolian",
      bmp: "\u1800\u1801\u1804\u1806-\u1819\u1820-\u1878\u1880-\u18AA",
      astral: "\uD805[\uDE60-\uDE6C]"
    },
    {
      name: "Mro",
      astral: "\uD81A[\uDE40-\uDE5E\uDE60-\uDE69\uDE6E\uDE6F]"
    },
    {
      name: "Multani",
      astral: "\uD804[\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA9]"
    },
    {
      name: "Myanmar",
      bmp: "\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F"
    },
    {
      name: "Nabataean",
      astral: "\uD802[\uDC80-\uDC9E\uDCA7-\uDCAF]"
    },
    {
      name: "Nandinagari",
      astral: "\uD806[\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE4]"
    },
    {
      name: "New_Tai_Lue",
      bmp: "\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u19DE\u19DF"
    },
    {
      name: "Newa",
      astral: "\uD805[\uDC00-\uDC5B\uDC5D-\uDC61]"
    },
    {
      name: "Nko",
      bmp: "\u07C0-\u07FA\u07FD-\u07FF"
    },
    {
      name: "Nushu",
      astral: "\uD81B\uDFE1|\uD82C[\uDD70-\uDEFB]"
    },
    {
      name: "Nyiakeng_Puachue_Hmong",
      astral: "\uD838[\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDD4F]"
    },
    {
      name: "Ogham",
      bmp: "\u1680-\u169C"
    },
    {
      name: "Ol_Chiki",
      bmp: "\u1C50-\u1C7F"
    },
    {
      name: "Old_Hungarian",
      astral: "\uD803[\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF]"
    },
    {
      name: "Old_Italic",
      astral: "\uD800[\uDF00-\uDF23\uDF2D-\uDF2F]"
    },
    {
      name: "Old_North_Arabian",
      astral: "\uD802[\uDE80-\uDE9F]"
    },
    {
      name: "Old_Permic",
      astral: "\uD800[\uDF50-\uDF7A]"
    },
    {
      name: "Old_Persian",
      astral: "\uD800[\uDFA0-\uDFC3\uDFC8-\uDFD5]"
    },
    {
      name: "Old_Sogdian",
      astral: "\uD803[\uDF00-\uDF27]"
    },
    {
      name: "Old_South_Arabian",
      astral: "\uD802[\uDE60-\uDE7F]"
    },
    {
      name: "Old_Turkic",
      astral: "\uD803[\uDC00-\uDC48]"
    },
    {
      name: "Old_Uyghur",
      astral: "\uD803[\uDF70-\uDF89]"
    },
    {
      name: "Oriya",
      bmp: "\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77"
    },
    {
      name: "Osage",
      astral: "\uD801[\uDCB0-\uDCD3\uDCD8-\uDCFB]"
    },
    {
      name: "Osmanya",
      astral: "\uD801[\uDC80-\uDC9D\uDCA0-\uDCA9]"
    },
    {
      name: "Pahawh_Hmong",
      astral: "\uD81A[\uDF00-\uDF45\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]"
    },
    {
      name: "Palmyrene",
      astral: "\uD802[\uDC60-\uDC7F]"
    },
    {
      name: "Pau_Cin_Hau",
      astral: "\uD806[\uDEC0-\uDEF8]"
    },
    {
      name: "Phags_Pa",
      bmp: "\uA840-\uA877"
    },
    {
      name: "Phoenician",
      astral: "\uD802[\uDD00-\uDD1B\uDD1F]"
    },
    {
      name: "Psalter_Pahlavi",
      astral: "\uD802[\uDF80-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]"
    },
    {
      name: "Rejang",
      bmp: "\uA930-\uA953\uA95F"
    },
    {
      name: "Runic",
      bmp: "\u16A0-\u16EA\u16EE-\u16F8"
    },
    {
      name: "Samaritan",
      bmp: "\u0800-\u082D\u0830-\u083E"
    },
    {
      name: "Saurashtra",
      bmp: "\uA880-\uA8C5\uA8CE-\uA8D9"
    },
    {
      name: "Sharada",
      astral: "\uD804[\uDD80-\uDDDF]"
    },
    {
      name: "Shavian",
      astral: "\uD801[\uDC50-\uDC7F]"
    },
    {
      name: "Siddham",
      astral: "\uD805[\uDD80-\uDDB5\uDDB8-\uDDDD]"
    },
    {
      name: "SignWriting",
      astral: "\uD836[\uDC00-\uDE8B\uDE9B-\uDE9F\uDEA1-\uDEAF]"
    },
    {
      name: "Sinhala",
      bmp: "\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4",
      astral: "\uD804[\uDDE1-\uDDF4]"
    },
    {
      name: "Sogdian",
      astral: "\uD803[\uDF30-\uDF59]"
    },
    {
      name: "Sora_Sompeng",
      astral: "\uD804[\uDCD0-\uDCE8\uDCF0-\uDCF9]"
    },
    {
      name: "Soyombo",
      astral: "\uD806[\uDE50-\uDEA2]"
    },
    {
      name: "Sundanese",
      bmp: "\u1B80-\u1BBF\u1CC0-\u1CC7"
    },
    {
      name: "Syloti_Nagri",
      bmp: "\uA800-\uA82C"
    },
    {
      name: "Syriac",
      bmp: "\u0700-\u070D\u070F-\u074A\u074D-\u074F\u0860-\u086A"
    },
    {
      name: "Tagalog",
      bmp: "\u1700-\u1715\u171F"
    },
    {
      name: "Tagbanwa",
      bmp: "\u1760-\u176C\u176E-\u1770\u1772\u1773"
    },
    {
      name: "Tai_Le",
      bmp: "\u1950-\u196D\u1970-\u1974"
    },
    {
      name: "Tai_Tham",
      bmp: "\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD"
    },
    {
      name: "Tai_Viet",
      bmp: "\uAA80-\uAAC2\uAADB-\uAADF"
    },
    {
      name: "Takri",
      astral: "\uD805[\uDE80-\uDEB9\uDEC0-\uDEC9]"
    },
    {
      name: "Tamil",
      bmp: "\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA",
      astral: "\uD807[\uDFC0-\uDFF1\uDFFF]"
    },
    {
      name: "Tangsa",
      astral: "\uD81A[\uDE70-\uDEBE\uDEC0-\uDEC9]"
    },
    {
      name: "Tangut",
      astral: "\uD81B\uDFE0|[\uD81C-\uD820][\uDC00-\uDFFF]|\uD821[\uDC00-\uDFF7]|\uD822[\uDC00-\uDEFF]|\uD823[\uDD00-\uDD08]"
    },
    {
      name: "Telugu",
      bmp: "\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C77-\u0C7F"
    },
    {
      name: "Thaana",
      bmp: "\u0780-\u07B1"
    },
    {
      name: "Thai",
      bmp: "\u0E01-\u0E3A\u0E40-\u0E5B"
    },
    {
      name: "Tibetan",
      bmp: "\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA"
    },
    {
      name: "Tifinagh",
      bmp: "\u2D30-\u2D67\u2D6F\u2D70\u2D7F"
    },
    {
      name: "Tirhuta",
      astral: "\uD805[\uDC80-\uDCC7\uDCD0-\uDCD9]"
    },
    {
      name: "Toto",
      astral: "\uD838[\uDE90-\uDEAE]"
    },
    {
      name: "Ugaritic",
      astral: "\uD800[\uDF80-\uDF9D\uDF9F]"
    },
    {
      name: "Vai",
      bmp: "\uA500-\uA62B"
    },
    {
      name: "Vithkuqi",
      astral: "\uD801[\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC]"
    },
    {
      name: "Wancho",
      astral: "\uD838[\uDEC0-\uDEF9\uDEFF]"
    },
    {
      name: "Warang_Citi",
      astral: "\uD806[\uDCA0-\uDCF2\uDCFF]"
    },
    {
      name: "Yezidi",
      astral: "\uD803[\uDE80-\uDEA9\uDEAB-\uDEAD\uDEB0\uDEB1]"
    },
    {
      name: "Yi",
      bmp: "\uA000-\uA48C\uA490-\uA4C6"
    },
    {
      name: "Zanabazar_Square",
      astral: "\uD806[\uDE00-\uDE47]"
    }
  ];
});

// node_modules/async-lock/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var AsyncLock = function(opts) {
    opts = opts || {};
    this.Promise = opts.Promise || Promise;
    this.queues = Object.create(null);
    this.domainReentrant = opts.domainReentrant || false;
    if (this.domainReentrant) {
      if (typeof process === "undefined" || typeof process.domain === "undefined") {
        throw new Error("Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, " + "use a NodeJS version that still implements Domain, or install a browser polyfill.");
      }
      this.domains = Object.create(null);
    }
    this.timeout = opts.timeout || AsyncLock.DEFAULT_TIMEOUT;
    this.maxOccupationTime = opts.maxOccupationTime || AsyncLock.DEFAULT_MAX_OCCUPATION_TIME;
    this.maxExecutionTime = opts.maxExecutionTime || AsyncLock.DEFAULT_MAX_EXECUTION_TIME;
    if (opts.maxPending === Infinity || Number.isInteger(opts.maxPending) && opts.maxPending >= 0) {
      this.maxPending = opts.maxPending;
    } else {
      this.maxPending = AsyncLock.DEFAULT_MAX_PENDING;
    }
  };
  AsyncLock.DEFAULT_TIMEOUT = 0;
  AsyncLock.DEFAULT_MAX_OCCUPATION_TIME = 0;
  AsyncLock.DEFAULT_MAX_EXECUTION_TIME = 0;
  AsyncLock.DEFAULT_MAX_PENDING = 1000;
  AsyncLock.prototype.acquire = function(key, fn, cb, opts) {
    if (Array.isArray(key)) {
      return this._acquireBatch(key, fn, cb, opts);
    }
    if (typeof fn !== "function") {
      throw new Error("You must pass a function to execute");
    }
    var deferredResolve = null;
    var deferredReject = null;
    var deferred = null;
    if (typeof cb !== "function") {
      opts = cb;
      cb = null;
      deferred = new this.Promise(function(resolve, reject) {
        deferredResolve = resolve;
        deferredReject = reject;
      });
    }
    opts = opts || {};
    var resolved = false;
    var timer = null;
    var occupationTimer = null;
    var executionTimer = null;
    var self = this;
    var done = function(locked, err, ret) {
      if (occupationTimer) {
        clearTimeout(occupationTimer);
        occupationTimer = null;
      }
      if (executionTimer) {
        clearTimeout(executionTimer);
        executionTimer = null;
      }
      if (locked) {
        if (!!self.queues[key] && self.queues[key].length === 0) {
          delete self.queues[key];
        }
        if (self.domainReentrant) {
          delete self.domains[key];
        }
      }
      if (!resolved) {
        if (!deferred) {
          if (typeof cb === "function") {
            cb(err, ret);
          }
        } else {
          if (err) {
            deferredReject(err);
          } else {
            deferredResolve(ret);
          }
        }
        resolved = true;
      }
      if (locked) {
        if (!!self.queues[key] && self.queues[key].length > 0) {
          self.queues[key].shift()();
        }
      }
    };
    var exec = function(locked) {
      if (resolved) {
        return done(locked);
      }
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (self.domainReentrant && locked) {
        self.domains[key] = process.domain;
      }
      var maxExecutionTime = opts.maxExecutionTime || self.maxExecutionTime;
      if (maxExecutionTime) {
        executionTimer = setTimeout(function() {
          if (!!self.queues[key]) {
            done(locked, new Error("Maximum execution time is exceeded " + key));
          }
        }, maxExecutionTime);
      }
      if (fn.length === 1) {
        var called = false;
        try {
          fn(function(err, ret) {
            if (!called) {
              called = true;
              done(locked, err, ret);
            }
          });
        } catch (err) {
          if (!called) {
            called = true;
            done(locked, err);
          }
        }
      } else {
        self._promiseTry(function() {
          return fn();
        }).then(function(ret) {
          done(locked, undefined, ret);
        }, function(error3) {
          done(locked, error3);
        });
      }
    };
    if (self.domainReentrant && !!process.domain) {
      exec = process.domain.bind(exec);
    }
    var maxPending = opts.maxPending || self.maxPending;
    if (!self.queues[key]) {
      self.queues[key] = [];
      exec(true);
    } else if (self.domainReentrant && !!process.domain && process.domain === self.domains[key]) {
      exec(false);
    } else if (self.queues[key].length >= maxPending) {
      done(false, new Error("Too many pending tasks in queue " + key));
    } else {
      var taskFn = function() {
        exec(true);
      };
      if (opts.skipQueue) {
        self.queues[key].unshift(taskFn);
      } else {
        self.queues[key].push(taskFn);
      }
      var timeout = opts.timeout || self.timeout;
      if (timeout) {
        timer = setTimeout(function() {
          timer = null;
          done(false, new Error("async-lock timed out in queue " + key));
        }, timeout);
      }
    }
    var maxOccupationTime = opts.maxOccupationTime || self.maxOccupationTime;
    if (maxOccupationTime) {
      occupationTimer = setTimeout(function() {
        if (!!self.queues[key]) {
          done(false, new Error("Maximum occupation time is exceeded in queue " + key));
        }
      }, maxOccupationTime);
    }
    if (deferred) {
      return deferred;
    }
  };
  AsyncLock.prototype._acquireBatch = function(keys, fn, cb, opts) {
    if (typeof cb !== "function") {
      opts = cb;
      cb = null;
    }
    var self = this;
    var getFn = function(key, fn2) {
      return function(cb2) {
        self.acquire(key, fn2, cb2, opts);
      };
    };
    var fnx = keys.reduceRight(function(prev, key) {
      return getFn(key, prev);
    }, fn);
    if (typeof cb === "function") {
      fnx(cb);
    } else {
      return new this.Promise(function(resolve, reject) {
        if (fnx.length === 1) {
          fnx(function(err, ret) {
            if (err) {
              reject(err);
            } else {
              resolve(ret);
            }
          });
        } else {
          resolve(fnx());
        }
      });
    }
  };
  AsyncLock.prototype.isBusy = function(key) {
    if (!key) {
      return Object.keys(this.queues).length > 0;
    } else {
      return !!this.queues[key];
    }
  };
  AsyncLock.prototype._promiseTry = function(fn) {
    try {
      return this.Promise.resolve(fn());
    } catch (e) {
      return this.Promise.reject(e);
    }
  };
  module.exports = AsyncLock;
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS((exports, module) => {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor;
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS((exports, module) => {
  try {
    util = __require("util");
    if (typeof util.inherits !== "function")
      throw "";
    module.exports = util.inherits;
  } catch (e) {
    module.exports = require_inherits_browser();
  }
  var util;
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS((exports, module) => {
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var buffer = __require("buffer");
  var Buffer2 = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module.exports = buffer;
  } else {
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  SafeBuffer.prototype = Object.create(Buffer2.prototype);
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill !== undefined) {
      if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer.SlowBuffer(size);
  };
});

// node_modules/isarray/index.js
var require_isarray = __commonJS((exports, module) => {
  var toString = {}.toString;
  module.exports = Array.isArray || function(arr) {
    return toString.call(arr) == "[object Array]";
  };
});

// node_modules/es-errors/type.js
var require_type = __commonJS((exports, module) => {
  module.exports = TypeError;
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS((exports, module) => {
  module.exports = Object;
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS((exports, module) => {
  module.exports = Error;
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS((exports, module) => {
  module.exports = EvalError;
});

// node_modules/es-errors/range.js
var require_range = __commonJS((exports, module) => {
  module.exports = RangeError;
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS((exports, module) => {
  module.exports = ReferenceError;
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS((exports, module) => {
  module.exports = SyntaxError;
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS((exports, module) => {
  module.exports = URIError;
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS((exports, module) => {
  module.exports = Math.abs;
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS((exports, module) => {
  module.exports = Math.floor;
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS((exports, module) => {
  module.exports = Math.max;
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS((exports, module) => {
  module.exports = Math.min;
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS((exports, module) => {
  module.exports = Math.pow;
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS((exports, module) => {
  module.exports = Math.round;
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS((exports, module) => {
  module.exports = Number.isNaN || function isNaN2(a) {
    return a !== a;
  };
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS((exports, module) => {
  var $isNaN = require_isNaN();
  module.exports = function sign(number) {
    if ($isNaN(number) || number === 0) {
      return number;
    }
    return number < 0 ? -1 : 1;
  };
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS((exports, module) => {
  module.exports = Object.getOwnPropertyDescriptor;
});

// node_modules/gopd/index.js
var require_gopd = __commonJS((exports, module) => {
  var $gOPD = require_gOPD();
  if ($gOPD) {
    try {
      $gOPD([], "length");
    } catch (e) {
      $gOPD = null;
    }
  }
  module.exports = $gOPD;
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS((exports, module) => {
  var $defineProperty = Object.defineProperty || false;
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty = false;
    }
  }
  module.exports = $defineProperty;
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS((exports, module) => {
  module.exports = function hasSymbols() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (var _ in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS((exports, module) => {
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = require_shams();
  module.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS((exports, module) => {
  module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS((exports, module) => {
  var $Object = require_es_object_atoms();
  module.exports = $Object.getPrototypeOf || null;
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS((exports, module) => {
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr = Object.prototype.toString;
  var max = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i = 0;i < a.length; i += 1) {
      arr[i] = a[i];
    }
    for (var j = 0;j < b.length; j += 1) {
      arr[j + a.length] = b[j];
    }
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0;i < arrLike.length; i += 1, j += 1) {
      arr[j] = arrLike[i];
    }
    return arr;
  };
  var joiny = function(arr, joiner) {
    var str = "";
    for (var i = 0;i < arr.length; i += 1) {
      str += arr[i];
      if (i + 1 < arr.length) {
        str += joiner;
      }
    }
    return str;
  };
  module.exports = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr.apply(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(this, concatty(args, arguments));
        if (Object(result) === result) {
          return result;
        }
        return this;
      }
      return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0;i < boundLength; i++) {
      boundArgs[i] = "$" + i;
    }
    bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {};
      Empty.prototype = target.prototype;
      bound.prototype = new Empty;
      Empty.prototype = null;
    }
    return bound;
  };
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS((exports, module) => {
  var implementation = require_implementation();
  module.exports = Function.prototype.bind || implementation;
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS((exports, module) => {
  module.exports = Function.prototype.call;
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS((exports, module) => {
  module.exports = Function.prototype.apply;
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS((exports, module) => {
  module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS((exports, module) => {
  var bind = require_function_bind();
  var $apply = require_functionApply();
  var $call = require_functionCall();
  var $reflectApply = require_reflectApply();
  module.exports = $reflectApply || bind.call($call, $apply);
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS((exports, module) => {
  var bind = require_function_bind();
  var $TypeError = require_type();
  var $call = require_functionCall();
  var $actualApply = require_actualApply();
  module.exports = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== "function") {
      throw new $TypeError("a function is required");
    }
    return $actualApply(bind, $call, args);
  };
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS((exports, module) => {
  var callBind = require_call_bind_apply_helpers();
  var gOPD = require_gopd();
  var hasProtoAccessor;
  try {
    hasProtoAccessor = [].__proto__ === Array.prototype;
  } catch (e) {
    if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
      throw e;
    }
  }
  var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__");
  var $Object = Object;
  var $getPrototypeOf = $Object.getPrototypeOf;
  module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
    return $getPrototypeOf(value == null ? value : $Object(value));
  } : false;
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS((exports, module) => {
  var reflectGetProto = require_Reflect_getPrototypeOf();
  var originalGetProto = require_Object_getPrototypeOf();
  var getDunderProto = require_get();
  module.exports = reflectGetProto ? function getProto(O) {
    return reflectGetProto(O);
  } : originalGetProto ? function getProto(O) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new TypeError("getProto: not an object");
    }
    return originalGetProto(O);
  } : getDunderProto ? function getProto(O) {
    return getDunderProto(O);
  } : null;
});

// node_modules/hasown/index.js
var require_hasown = __commonJS((exports, module) => {
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind = require_function_bind();
  module.exports = bind.call(call, $hasOwn);
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS((exports, module) => {
  var undefined2;
  var $Object = require_es_object_atoms();
  var $Error = require_es_errors();
  var $EvalError = require_eval();
  var $RangeError = require_range();
  var $ReferenceError = require_ref();
  var $SyntaxError = require_syntax();
  var $TypeError = require_type();
  var $URIError = require_uri();
  var abs = require_abs();
  var floor = require_floor();
  var max = require_max();
  var min = require_min();
  var pow = require_pow();
  var round = require_round();
  var sign = require_sign();
  var $Function = Function;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {}
  };
  var $gOPD = require_gopd();
  var $defineProperty = require_es_define_property();
  var throwTypeError = function() {
    throw new $TypeError;
  };
  var ThrowTypeError = $gOPD ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols = require_has_symbols()();
  var getProto = require_get_proto();
  var $ObjectGPO = require_Object_getPrototypeOf();
  var $ReflectGPO = require_Reflect_getPrototypeOf();
  var $apply = require_functionApply();
  var $call = require_functionCall();
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
  var INTRINSICS = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
    "%AsyncFromSyncIteratorPrototype%": undefined2,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": $Error,
    "%eval%": eval,
    "%EvalError%": $EvalError,
    "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
    "%JSON%": typeof JSON === "object" ? JSON : undefined2,
    "%Map%": typeof Map === "undefined" ? undefined2 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto(new Map()[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": $Object,
    "%Object.getOwnPropertyDescriptor%": $gOPD,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
    "%RangeError%": $RangeError,
    "%ReferenceError%": $ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined2 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto(new Set()[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
    "%Symbol%": hasSymbols ? Symbol : undefined2,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
    "%URIError%": $URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
    "%Function.prototype.call%": $call,
    "%Function.prototype.apply%": $apply,
    "%Object.defineProperty%": $defineProperty,
    "%Object.getPrototypeOf%": $ObjectGPO,
    "%Math.abs%": abs,
    "%Math.floor%": floor,
    "%Math.max%": max,
    "%Math.min%": min,
    "%Math.pow%": pow,
    "%Math.round%": round,
    "%Math.sign%": sign,
    "%Reflect.getPrototypeOf%": $ReflectGPO
  };
  if (getProto) {
    try {
      null.error;
    } catch (e) {
      errorProto = getProto(getProto(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var errorProto;
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto) {
        value = getProto(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = require_function_bind();
  var hasOwn = require_hasown();
  var $concat = bind.call($call, Array.prototype.concat);
  var $spliceApply = bind.call($apply, Array.prototype.splice);
  var $replace = bind.call($call, String.prototype.replace);
  var $strSlice = bind.call($call, String.prototype.slice);
  var $exec = bind.call($call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  module.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
      throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i = 1, isOwn = true;i < parts.length; i += 1) {
      var part = parts[i];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return;
        }
        if ($gOPD && i + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS((exports, module) => {
  var GetIntrinsic = require_get_intrinsic();
  var callBindBasic = require_call_bind_apply_helpers();
  var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
  module.exports = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBindBasic([intrinsic]);
    }
    return intrinsic;
  };
});

// node_modules/is-callable/index.js
var require_is_callable = __commonJS((exports, module) => {
  var fnToStr = Function.prototype.toString;
  var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
    try {
      badArrayLike = Object.defineProperty({}, "length", {
        get: function() {
          throw isCallableMarker;
        }
      });
      isCallableMarker = {};
      reflectApply(function() {
        throw 42;
      }, null, badArrayLike);
    } catch (_) {
      if (_ !== isCallableMarker) {
        reflectApply = null;
      }
    }
  } else {
    reflectApply = null;
  }
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false;
    }
  };
  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) {
        return false;
      }
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr = Object.prototype.toString;
  var objectClass = "[object Object]";
  var fnClass = "[object Function]";
  var genClass = "[object GeneratorFunction]";
  var ddaClass = "[object HTMLAllCollection]";
  var ddaClass2 = "[object HTML document.all class]";
  var ddaClass3 = "[object HTMLCollection]";
  var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
  var isIE68 = !(0 in [,]);
  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if (typeof document === "object") {
    all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) {
      isDDA = function isDocumentDotAll(value) {
        if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
          try {
            var str = toStr.call(value);
            return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
          } catch (e) {}
        }
        return false;
      };
    }
  }
  var all;
  module.exports = reflectApply ? function isCallable(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    try {
      reflectApply(value, null, badArrayLike);
    } catch (e) {
      if (e !== isCallableMarker) {
        return false;
      }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
  } : function isCallable(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    if (hasToStringTag) {
      return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
      return false;
    }
    var strClass = toStr.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
      return false;
    }
    return tryFunctionObject(value);
  };
});

// node_modules/for-each/index.js
var require_for_each = __commonJS((exports, module) => {
  var isCallable = require_is_callable();
  var toStr = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var forEachArray = function forEachArray2(array, iterator, receiver) {
    for (var i = 0, len = array.length;i < len; i++) {
      if (hasOwnProperty.call(array, i)) {
        if (receiver == null) {
          iterator(array[i], i, array);
        } else {
          iterator.call(receiver, array[i], i, array);
        }
      }
    }
  };
  var forEachString = function forEachString2(string, iterator, receiver) {
    for (var i = 0, len = string.length;i < len; i++) {
      if (receiver == null) {
        iterator(string.charAt(i), i, string);
      } else {
        iterator.call(receiver, string.charAt(i), i, string);
      }
    }
  };
  var forEachObject = function forEachObject2(object, iterator, receiver) {
    for (var k in object) {
      if (hasOwnProperty.call(object, k)) {
        if (receiver == null) {
          iterator(object[k], k, object);
        } else {
          iterator.call(receiver, object[k], k, object);
        }
      }
    }
  };
  function isArray(x) {
    return toStr.call(x) === "[object Array]";
  }
  module.exports = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
      throw new TypeError("iterator must be a function");
    }
    var receiver;
    if (arguments.length >= 3) {
      receiver = thisArg;
    }
    if (isArray(list)) {
      forEachArray(list, iterator, receiver);
    } else if (typeof list === "string") {
      forEachString(list, iterator, receiver);
    } else {
      forEachObject(list, iterator, receiver);
    }
  };
});

// node_modules/possible-typed-array-names/index.js
var require_possible_typed_array_names = __commonJS((exports, module) => {
  module.exports = [
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ];
});

// node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS((exports, module) => {
  var possibleNames = require_possible_typed_array_names();
  var g = typeof globalThis === "undefined" ? global : globalThis;
  module.exports = function availableTypedArrays() {
    var out = [];
    for (var i = 0;i < possibleNames.length; i++) {
      if (typeof g[possibleNames[i]] === "function") {
        out[out.length] = possibleNames[i];
      }
    }
    return out;
  };
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS((exports, module) => {
  var $defineProperty = require_es_define_property();
  var $SyntaxError = require_syntax();
  var $TypeError = require_type();
  var gopd = require_gopd();
  module.exports = function defineDataProperty(obj, property, value) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") {
      throw new $TypeError("`obj` must be an object or a function`");
    }
    if (typeof property !== "string" && typeof property !== "symbol") {
      throw new $TypeError("`property` must be a string or a symbol`");
    }
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
      throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
      throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
      throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
      throw new $TypeError("`loose`, if provided, must be a boolean");
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    var desc = !!gopd && gopd(obj, property);
    if ($defineProperty) {
      $defineProperty(obj, property, {
        configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
        enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
        value,
        writable: nonWritable === null && desc ? desc.writable : !nonWritable
      });
    } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
      obj[property] = value;
    } else {
      throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
    }
  };
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS((exports, module) => {
  var $defineProperty = require_es_define_property();
  var hasPropertyDescriptors = function hasPropertyDescriptors2() {
    return !!$defineProperty;
  };
  hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    if (!$defineProperty) {
      return null;
    }
    try {
      return $defineProperty([], "length", { value: 1 }).length !== 1;
    } catch (e) {
      return true;
    }
  };
  module.exports = hasPropertyDescriptors;
});

// node_modules/set-function-length/index.js
var require_set_function_length = __commonJS((exports, module) => {
  var GetIntrinsic = require_get_intrinsic();
  var define2 = require_define_data_property();
  var hasDescriptors = require_has_property_descriptors()();
  var gOPD = require_gopd();
  var $TypeError = require_type();
  var $floor = GetIntrinsic("%Math.floor%");
  module.exports = function setFunctionLength(fn, length) {
    if (typeof fn !== "function") {
      throw new $TypeError("`fn` is not a function");
    }
    if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
      throw new $TypeError("`length` must be a positive 32-bit integer");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD) {
      var desc = gOPD(fn, "length");
      if (desc && !desc.configurable) {
        functionLengthIsConfigurable = false;
      }
      if (desc && !desc.writable) {
        functionLengthIsWritable = false;
      }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
      if (hasDescriptors) {
        define2(fn, "length", length, true, true);
      } else {
        define2(fn, "length", length);
      }
    }
    return fn;
  };
});

// node_modules/call-bind-apply-helpers/applyBind.js
var require_applyBind = __commonJS((exports, module) => {
  var bind = require_function_bind();
  var $apply = require_functionApply();
  var actualApply = require_actualApply();
  module.exports = function applyBind() {
    return actualApply(bind, $apply, arguments);
  };
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS((exports, module) => {
  var setFunctionLength = require_set_function_length();
  var $defineProperty = require_es_define_property();
  var callBindBasic = require_call_bind_apply_helpers();
  var applyBind = require_applyBind();
  module.exports = function callBind(originalFunction) {
    var func = callBindBasic(arguments);
    var adjustedLength = 1 + originalFunction.length - (arguments.length - 1);
    return setFunctionLength(func, adjustedLength > 0 ? adjustedLength : 0, true);
  };
  if ($defineProperty) {
    $defineProperty(module.exports, "apply", { value: applyBind });
  } else {
    module.exports.apply = applyBind;
  }
});

// node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS((exports, module) => {
  var hasSymbols = require_shams();
  module.exports = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
  };
});

// node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS((exports, module) => {
  var forEach = require_for_each();
  var availableTypedArrays = require_available_typed_arrays();
  var callBind = require_call_bind();
  var callBound = require_call_bound();
  var gOPD = require_gopd();
  var getProto = require_get_proto();
  var $toString = callBound("Object.prototype.toString");
  var hasToStringTag = require_shams2()();
  var g = typeof globalThis === "undefined" ? global : globalThis;
  var typedArrays = availableTypedArrays();
  var $slice = callBound("String.prototype.slice");
  var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for (var i = 0;i < array.length; i += 1) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  };
  var cache = { __proto__: null };
  if (hasToStringTag && gOPD && getProto) {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray];
      if (Symbol.toStringTag in arr && getProto) {
        var proto = getProto(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor && proto) {
          var superProto = getProto(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        if (descriptor && descriptor.get) {
          var bound = callBind(descriptor.get);
          cache["$" + typedArray] = bound;
        }
      }
    });
  } else {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray];
      var fn = arr.slice || arr.set;
      if (fn) {
        var bound = callBind(fn);
        cache["$" + typedArray] = bound;
      }
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach(cache, function(getter, typedArray) {
      if (!found) {
        try {
          if ("$" + getter(value) === typedArray) {
            found = $slice(typedArray, 1);
          }
        } catch (e) {}
      }
    });
    return found;
  };
  var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach(cache, function(getter, name) {
      if (!found) {
        try {
          getter(value);
          found = $slice(name, 1);
        } catch (e) {}
      }
    });
    return found;
  };
  module.exports = function whichTypedArray(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag) {
      var tag = $slice($toString(value), 8, -1);
      if ($indexOf(typedArrays, tag) > -1) {
        return tag;
      }
      if (tag !== "Object") {
        return false;
      }
      return trySlices(value);
    }
    if (!gOPD) {
      return null;
    }
    return tryTypedArrays(value);
  };
});

// node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS((exports, module) => {
  var whichTypedArray = require_which_typed_array();
  module.exports = function isTypedArray(value) {
    return !!whichTypedArray(value);
  };
});

// node_modules/typed-array-buffer/index.js
var require_typed_array_buffer = __commonJS((exports, module) => {
  var $TypeError = require_type();
  var callBound = require_call_bound();
  var $typedArrayBuffer = callBound("TypedArray.prototype.buffer", true);
  var isTypedArray = require_is_typed_array();
  module.exports = $typedArrayBuffer || function typedArrayBuffer(x) {
    if (!isTypedArray(x)) {
      throw new $TypeError("Not a Typed Array");
    }
    return x.buffer;
  };
});

// node_modules/to-buffer/index.js
var require_to_buffer = __commonJS((exports, module) => {
  var Buffer2 = require_safe_buffer().Buffer;
  var isArray = require_isarray();
  var typedArrayBuffer = require_typed_array_buffer();
  var isView = ArrayBuffer.isView || function isView2(obj) {
    try {
      typedArrayBuffer(obj);
      return true;
    } catch (e) {
      return false;
    }
  };
  var useUint8Array = typeof Uint8Array !== "undefined";
  var useArrayBuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
  var useFromArrayBuffer = useArrayBuffer && (Buffer2.prototype instanceof Uint8Array || Buffer2.TYPED_ARRAY_SUPPORT);
  module.exports = function toBuffer(data, encoding) {
    if (Buffer2.isBuffer(data)) {
      if (data.constructor && !("isBuffer" in data)) {
        return Buffer2.from(data);
      }
      return data;
    }
    if (typeof data === "string") {
      return Buffer2.from(data, encoding);
    }
    if (useArrayBuffer && isView(data)) {
      if (data.byteLength === 0) {
        return Buffer2.alloc(0);
      }
      if (useFromArrayBuffer) {
        var res = Buffer2.from(data.buffer, data.byteOffset, data.byteLength);
        if (res.byteLength === data.byteLength) {
          return res;
        }
      }
      var uint8 = data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      var result = Buffer2.from(uint8);
      if (result.length === data.byteLength) {
        return result;
      }
    }
    if (useUint8Array && data instanceof Uint8Array) {
      return Buffer2.from(data);
    }
    var isArr = isArray(data);
    if (isArr) {
      for (var i = 0;i < data.length; i += 1) {
        var x = data[i];
        if (typeof x !== "number" || x < 0 || x > 255 || ~~x !== x) {
          throw new RangeError("Array items must be numbers in the range 0-255.");
        }
      }
    }
    if (isArr || Buffer2.isBuffer(data) && data.constructor && typeof data.constructor.isBuffer === "function" && data.constructor.isBuffer(data)) {
      return Buffer2.from(data);
    }
    throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
  };
});

// node_modules/sha.js/hash.js
var require_hash = __commonJS((exports, module) => {
  var Buffer2 = require_safe_buffer().Buffer;
  var toBuffer = require_to_buffer();
  function Hash(blockSize, finalSize) {
    this._block = Buffer2.alloc(blockSize);
    this._finalSize = finalSize;
    this._blockSize = blockSize;
    this._len = 0;
  }
  Hash.prototype.update = function(data, enc) {
    data = toBuffer(data, enc || "utf8");
    var block = this._block;
    var blockSize = this._blockSize;
    var length = data.length;
    var accum = this._len;
    for (var offset = 0;offset < length; ) {
      var assigned = accum % blockSize;
      var remainder = Math.min(length - offset, blockSize - assigned);
      for (var i = 0;i < remainder; i++) {
        block[assigned + i] = data[offset + i];
      }
      accum += remainder;
      offset += remainder;
      if (accum % blockSize === 0) {
        this._update(block);
      }
    }
    this._len += length;
    return this;
  };
  Hash.prototype.digest = function(enc) {
    var rem = this._len % this._blockSize;
    this._block[rem] = 128;
    this._block.fill(0, rem + 1);
    if (rem >= this._finalSize) {
      this._update(this._block);
      this._block.fill(0);
    }
    var bits = this._len * 8;
    if (bits <= 4294967295) {
      this._block.writeUInt32BE(bits, this._blockSize - 4);
    } else {
      var lowBits = (bits & 4294967295) >>> 0;
      var highBits = (bits - lowBits) / 4294967296;
      this._block.writeUInt32BE(highBits, this._blockSize - 8);
      this._block.writeUInt32BE(lowBits, this._blockSize - 4);
    }
    this._update(this._block);
    var hash = this._hash();
    return enc ? hash.toString(enc) : hash;
  };
  Hash.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  };
  module.exports = Hash;
});

// node_modules/sha.js/sha1.js
var require_sha1 = __commonJS((exports, module) => {
  var inherits = require_inherits();
  var Hash = require_hash();
  var Buffer2 = require_safe_buffer().Buffer;
  var K = [
    1518500249,
    1859775393,
    2400959708 | 0,
    3395469782 | 0
  ];
  var W = new Array(80);
  function Sha1() {
    this.init();
    this._w = W;
    Hash.call(this, 64, 56);
  }
  inherits(Sha1, Hash);
  Sha1.prototype.init = function() {
    this._a = 1732584193;
    this._b = 4023233417;
    this._c = 2562383102;
    this._d = 271733878;
    this._e = 3285377520;
    return this;
  };
  function rotl1(num) {
    return num << 1 | num >>> 31;
  }
  function rotl5(num) {
    return num << 5 | num >>> 27;
  }
  function rotl30(num) {
    return num << 30 | num >>> 2;
  }
  function ft(s, b, c, d) {
    if (s === 0) {
      return b & c | ~b & d;
    }
    if (s === 2) {
      return b & c | b & d | c & d;
    }
    return b ^ c ^ d;
  }
  Sha1.prototype._update = function(M) {
    var w = this._w;
    var a = this._a | 0;
    var b = this._b | 0;
    var c = this._c | 0;
    var d = this._d | 0;
    var e = this._e | 0;
    for (var i = 0;i < 16; ++i) {
      w[i] = M.readInt32BE(i * 4);
    }
    for (;i < 80; ++i) {
      w[i] = rotl1(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
    }
    for (var j = 0;j < 80; ++j) {
      var s = ~~(j / 20);
      var t = rotl5(a) + ft(s, b, c, d) + e + w[j] + K[s] | 0;
      e = d;
      d = c;
      c = rotl30(b);
      b = a;
      a = t;
    }
    this._a = a + this._a | 0;
    this._b = b + this._b | 0;
    this._c = c + this._c | 0;
    this._d = d + this._d | 0;
    this._e = e + this._e | 0;
  };
  Sha1.prototype._hash = function() {
    var H = Buffer2.allocUnsafe(20);
    H.writeInt32BE(this._a | 0, 0);
    H.writeInt32BE(this._b | 0, 4);
    H.writeInt32BE(this._c | 0, 8);
    H.writeInt32BE(this._d | 0, 12);
    H.writeInt32BE(this._e | 0, 16);
    return H;
  };
  module.exports = Sha1;
});

// node_modules/crc-32/crc32.js
var require_crc32 = __commonJS((exports) => {
  /*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
  var CRC32;
  (function(factory) {
    if (typeof DO_NOT_EXPORT_CRC === "undefined") {
      if (typeof exports === "object") {
        factory(exports);
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          var module2 = {};
          factory(module2);
          return module2;
        });
      } else {
        factory(CRC32 = {});
      }
    } else {
      factory(CRC32 = {});
    }
  })(function(CRC322) {
    CRC322.version = "1.2.2";
    function signed_crc_table() {
      var c = 0, table = new Array(256);
      for (var n = 0;n != 256; ++n) {
        c = n;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
        table[n] = c;
      }
      return typeof Int32Array !== "undefined" ? new Int32Array(table) : table;
    }
    var T0 = signed_crc_table();
    function slice_by_16_tables(T) {
      var c = 0, v = 0, n = 0, table = typeof Int32Array !== "undefined" ? new Int32Array(4096) : new Array(4096);
      for (n = 0;n != 256; ++n)
        table[n] = T[n];
      for (n = 0;n != 256; ++n) {
        v = T[n];
        for (c = 256 + n;c < 4096; c += 256)
          v = table[c] = v >>> 8 ^ T[v & 255];
      }
      var out = [];
      for (n = 1;n != 16; ++n)
        out[n - 1] = typeof Int32Array !== "undefined" ? table.subarray(n * 256, n * 256 + 256) : table.slice(n * 256, n * 256 + 256);
      return out;
    }
    var TT = slice_by_16_tables(T0);
    var T1 = TT[0], T2 = TT[1], T3 = TT[2], T4 = TT[3], T5 = TT[4];
    var T6 = TT[5], T7 = TT[6], T8 = TT[7], T9 = TT[8], Ta = TT[9];
    var Tb = TT[10], Tc = TT[11], Td = TT[12], Te = TT[13], Tf = TT[14];
    function crc32_bstr(bstr, seed) {
      var C = seed ^ -1;
      for (var i = 0, L = bstr.length;i < L; )
        C = C >>> 8 ^ T0[(C ^ bstr.charCodeAt(i++)) & 255];
      return ~C;
    }
    function crc32_buf(B, seed) {
      var C = seed ^ -1, L = B.length - 15, i = 0;
      for (;i < L; )
        C = Tf[B[i++] ^ C & 255] ^ Te[B[i++] ^ C >> 8 & 255] ^ Td[B[i++] ^ C >> 16 & 255] ^ Tc[B[i++] ^ C >>> 24] ^ Tb[B[i++]] ^ Ta[B[i++]] ^ T9[B[i++]] ^ T8[B[i++]] ^ T7[B[i++]] ^ T6[B[i++]] ^ T5[B[i++]] ^ T4[B[i++]] ^ T3[B[i++]] ^ T2[B[i++]] ^ T1[B[i++]] ^ T0[B[i++]];
      L += 15;
      while (i < L)
        C = C >>> 8 ^ T0[(C ^ B[i++]) & 255];
      return ~C;
    }
    function crc32_str(str, seed) {
      var C = seed ^ -1;
      for (var i = 0, L = str.length, c = 0, d = 0;i < L; ) {
        c = str.charCodeAt(i++);
        if (c < 128) {
          C = C >>> 8 ^ T0[(C ^ c) & 255];
        } else if (c < 2048) {
          C = C >>> 8 ^ T0[(C ^ (192 | c >> 6 & 31)) & 255];
          C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
        } else if (c >= 55296 && c < 57344) {
          c = (c & 1023) + 64;
          d = str.charCodeAt(i++) & 1023;
          C = C >>> 8 ^ T0[(C ^ (240 | c >> 8 & 7)) & 255];
          C = C >>> 8 ^ T0[(C ^ (128 | c >> 2 & 63)) & 255];
          C = C >>> 8 ^ T0[(C ^ (128 | d >> 6 & 15 | (c & 3) << 4)) & 255];
          C = C >>> 8 ^ T0[(C ^ (128 | d & 63)) & 255];
        } else {
          C = C >>> 8 ^ T0[(C ^ (224 | c >> 12 & 15)) & 255];
          C = C >>> 8 ^ T0[(C ^ (128 | c >> 6 & 63)) & 255];
          C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
        }
      }
      return ~C;
    }
    CRC322.table = T0;
    CRC322.bstr = crc32_bstr;
    CRC322.buf = crc32_buf;
    CRC322.str = crc32_str;
  });
});

// node_modules/pako/lib/utils/common.js
var require_common = __commonJS((exports) => {
  var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
  function _has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  exports.assign = function(obj) {
    var sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      var source = sources.shift();
      if (!source) {
        continue;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be non-object");
      }
      for (var p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }
    return obj;
  };
  exports.shrinkBuf = function(buf, size) {
    if (buf.length === size) {
      return buf;
    }
    if (buf.subarray) {
      return buf.subarray(0, size);
    }
    buf.length = size;
    return buf;
  };
  var fnTyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      if (src.subarray && dest.subarray) {
        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
        return;
      }
      for (var i = 0;i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    flattenChunks: function(chunks) {
      var i, l, len, pos, chunk, result;
      len = 0;
      for (i = 0, l = chunks.length;i < l; i++) {
        len += chunks[i].length;
      }
      result = new Uint8Array(len);
      pos = 0;
      for (i = 0, l = chunks.length;i < l; i++) {
        chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }
      return result;
    }
  };
  var fnUntyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      for (var i = 0;i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    flattenChunks: function(chunks) {
      return [].concat.apply([], chunks);
    }
  };
  exports.setTyped = function(on) {
    if (on) {
      exports.Buf8 = Uint8Array;
      exports.Buf16 = Uint16Array;
      exports.Buf32 = Int32Array;
      exports.assign(exports, fnTyped);
    } else {
      exports.Buf8 = Array;
      exports.Buf16 = Array;
      exports.Buf32 = Array;
      exports.assign(exports, fnUntyped);
    }
  };
  exports.setTyped(TYPED_OK);
});

// node_modules/pako/lib/zlib/trees.js
var require_trees = __commonJS((exports) => {
  var utils = require_common();
  var Z_FIXED = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN = 2;
  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  var extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
  var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES + 2) * 2);
  zero(static_ltree);
  var static_dtree = new Array(D_CODES * 2);
  zero(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero(_dist_code);
  var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
  zero(_length_code);
  var base_length = new Array(LENGTH_CODES);
  zero(base_length);
  var base_dist = new Array(D_CODES);
  zero(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }
  function put_short(s, w) {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  }
  function send_bits(s, value, length) {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  }
  function send_code(s, c, tree) {
    send_bits(s, tree[c * 2], tree[c * 2 + 1]);
  }
  function bi_reverse(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 255;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }
  function gen_bitlen(s, desc) {
    var tree = desc.dyn_tree;
    var max_code = desc.max_code;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var extra = desc.stat_desc.extra_bits;
    var base = desc.stat_desc.extra_base;
    var max_length = desc.stat_desc.max_length;
    var h;
    var n, m;
    var bits;
    var xbits;
    var f;
    var overflow = 0;
    for (bits = 0;bits <= MAX_BITS; bits++) {
      s.bl_count[bits] = 0;
    }
    tree[s.heap[s.heap_max] * 2 + 1] = 0;
    for (h = s.heap_max + 1;h < HEAP_SIZE; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      if (n > max_code) {
        continue;
      }
      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2];
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--;
      s.bl_count[bits + 1] += 2;
      s.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length;bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] !== bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  }
  function gen_codes(tree, max_code, bl_count) {
    var next_code = new Array(MAX_BITS + 1);
    var code = 0;
    var bits;
    var n;
    for (bits = 1;bits <= MAX_BITS; bits++) {
      next_code[bits] = code = code + bl_count[bits - 1] << 1;
    }
    for (n = 0;n <= max_code; n++) {
      var len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  }
  function tr_static_init() {
    var n;
    var bits;
    var length;
    var code;
    var dist;
    var bl_count = new Array(MAX_BITS + 1);
    length = 0;
    for (code = 0;code < LENGTH_CODES - 1; code++) {
      base_length[code] = length;
      for (n = 0;n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0;code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0;n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (;code < D_CODES; code++) {
      base_dist[code] = dist << 7;
      for (n = 0;n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    for (bits = 0;bits <= MAX_BITS; bits++) {
      bl_count[bits] = 0;
    }
    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES + 1, bl_count);
    for (n = 0;n < D_CODES; n++) {
      static_dtree[n * 2 + 1] = 5;
      static_dtree[n * 2] = bi_reverse(n, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
  }
  function init_block(s) {
    var n;
    for (n = 0;n < L_CODES; n++) {
      s.dyn_ltree[n * 2] = 0;
    }
    for (n = 0;n < D_CODES; n++) {
      s.dyn_dtree[n * 2] = 0;
    }
    for (n = 0;n < BL_CODES; n++) {
      s.bl_tree[n * 2] = 0;
    }
    s.dyn_ltree[END_BLOCK * 2] = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }
  function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }
  function copy_block(s, buf, len, header) {
    bi_windup(s);
    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
    utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
    s.pending += len;
  }
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
  }
  function pqdownheap(s, tree, k) {
    var v = s.heap[k];
    var j = k << 1;
    while (j <= s.heap_len) {
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      s.heap[k] = s.heap[j];
      k = j;
      j <<= 1;
    }
    s.heap[k] = v;
  }
  function compress_block(s, ltree, dtree) {
    var dist;
    var lc;
    var lx = 0;
    var code;
    var extra;
    if (s.last_lit !== 0) {
      do {
        dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;
        if (dist === 0) {
          send_code(s, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s, code + LITERALS + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
          }
        }
      } while (lx < s.last_lit);
    }
    send_code(s, END_BLOCK, ltree);
  }
  function build_tree(s, desc) {
    var tree = desc.dyn_tree;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems = desc.stat_desc.elems;
    var n, m;
    var max_code = -1;
    var node;
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE;
    for (n = 0;n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (has_stree) {
        s.static_len -= stree[node * 2 + 1];
      }
    }
    desc.max_code = max_code;
    for (n = s.heap_len >> 1;n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    node = elems;
    do {
      n = s.heap[1];
      s.heap[1] = s.heap[s.heap_len--];
      pqdownheap(s, tree, 1);
      m = s.heap[1];
      s.heap[--s.heap_max] = n;
      s.heap[--s.heap_max] = m;
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;
      s.heap[1] = node++;
      pqdownheap(s, tree, 1);
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[1];
    gen_bitlen(s, desc);
    gen_codes(tree, max_code, s.bl_count);
  }
  function scan_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n = 0;n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2]++;
        }
        s.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function send_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0;n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function build_bl_tree(s) {
    var max_blindex;
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    build_tree(s, s.bl_desc);
    for (max_blindex = BL_CODES - 1;max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  }
  function send_all_trees(s, lcodes, dcodes, blcodes) {
    var rank;
    send_bits(s, lcodes - 257, 5);
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    for (rank = 0;rank < blcodes; rank++) {
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
    }
    send_tree(s, s.dyn_ltree, lcodes - 1);
    send_tree(s, s.dyn_dtree, dcodes - 1);
  }
  function detect_data_type(s) {
    var black_mask = 4093624447;
    var n;
    for (n = 0;n <= 31; n++, black_mask >>>= 1) {
      if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n = 32;n < LITERALS; n++) {
      if (s.dyn_ltree[n * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  }
  var static_init_done = false;
  function _tr_init(s) {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    init_block(s);
  }
  function _tr_stored_block(s, buf, stored_len, last) {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    copy_block(s, buf, stored_len, true);
  }
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }
  function _tr_flush_block(s, buf, stored_len, last) {
    var opt_lenb, static_lenb;
    var max_blindex = 0;
    if (s.level > 0) {
      if (s.strm.data_type === Z_UNKNOWN) {
        s.strm.data_type = detect_data_type(s);
      }
      build_tree(s, s.l_desc);
      build_tree(s, s.d_desc);
      max_blindex = build_bl_tree(s);
      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    init_block(s);
    if (last) {
      bi_windup(s);
    }
  }
  function _tr_tally(s, dist, lc) {
    s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
    s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
    s.last_lit++;
    if (dist === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist--;
      s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
      s.dyn_dtree[d_code(dist) * 2]++;
    }
    return s.last_lit === s.lit_bufsize - 1;
  }
  exports._tr_init = _tr_init;
  exports._tr_stored_block = _tr_stored_block;
  exports._tr_flush_block = _tr_flush_block;
  exports._tr_tally = _tr_tally;
  exports._tr_align = _tr_align;
});

// node_modules/pako/lib/zlib/adler32.js
var require_adler32 = __commonJS((exports, module) => {
  function adler32(adler, buf, len, pos) {
    var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len !== 0) {
      n = len > 2000 ? 2000 : len;
      len -= n;
      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);
      s1 %= 65521;
      s2 %= 65521;
    }
    return s1 | s2 << 16 | 0;
  }
  module.exports = adler32;
});

// node_modules/pako/lib/zlib/crc32.js
var require_crc322 = __commonJS((exports, module) => {
  function makeTable() {
    var c, table = [];
    for (var n = 0;n < 256; n++) {
      c = n;
      for (var k = 0;k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  }
  var crcTable = makeTable();
  function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;
    crc ^= -1;
    for (var i = pos;i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
    }
    return crc ^ -1;
  }
  module.exports = crc32;
});

// node_modules/pako/lib/zlib/messages.js
var require_messages = __commonJS((exports, module) => {
  module.exports = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
  };
});

// node_modules/pako/lib/zlib/deflate.js
var require_deflate = __commonJS((exports) => {
  var utils = require_common();
  var trees = require_trees();
  var adler32 = require_adler32();
  var crc32 = require_crc322();
  var msg = require_messages();
  var Z_NO_FLUSH = 0;
  var Z_PARTIAL_FLUSH = 1;
  var Z_FULL_FLUSH = 3;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_BUF_ERROR = -5;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_FILTERED = 1;
  var Z_HUFFMAN_ONLY = 2;
  var Z_RLE = 3;
  var Z_FIXED = 4;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_UNKNOWN = 2;
  var Z_DEFLATED = 8;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  function err(strm, errorCode) {
    strm.msg = msg[errorCode];
    return errorCode;
  }
  function rank(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }
  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  function flush_pending(strm) {
    var s = strm.state;
    var len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }
  function flush_block_only(s, last) {
    trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }
  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }
  function putShortMSB(s, b) {
    s.pending_buf[s.pending++] = b >>> 8 & 255;
    s.pending_buf[s.pending++] = b & 255;
  }
  function read_buf(strm, buf, start, size) {
    var len = strm.avail_in;
    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    utils.arraySet(buf, strm.input, strm.next_in, len, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  }
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length;
    var scan = s.strstart;
    var match;
    var len;
    var best_len = s.prev_length;
    var nice_match = s.nice_match;
    var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
    var _win = s.window;
    var wmask = s.w_mask;
    var prev = s.prev;
    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }
  function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str;
    do {
      more = s.window_size - s.lookahead - s.strstart;
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        s.block_start -= _w_size;
        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        n = _w_size;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
        while (s.insert) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  }
  function deflate_stored(s, flush) {
    var max_block_size = 65535;
    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }
    for (;; ) {
      if (s.lookahead <= 1) {
        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.strstart += s.lookahead;
      s.lookahead = 0;
      var max_start = s.block_start + max_block_size;
      if (s.strstart === 0 || s.strstart >= max_start) {
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.strstart > s.block_start) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_NEED_MORE;
  }
  function deflate_fast(s, flush) {
    var hash_head;
    var bflush;
    for (;; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          do {
            s.strstart++;
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
        }
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_slow(s, flush) {
    var hash_head;
    var bflush;
    var max_insert;
    for (;; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
          s.match_length = MIN_MATCH - 1;
        }
      }
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s.match_available) {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
        if (bflush) {
          flush_block_only(s, false);
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    if (s.match_available) {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_rle(s, flush) {
    var bflush;
    var prev;
    var scan, strend;
    var _win = s.window;
    for (;; ) {
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_huff(s, flush) {
    var bflush;
    for (;; ) {
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s.match_length = 0;
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table;
  configuration_table = [
    new Config(0, 0, 0, 0, deflate_stored),
    new Config(4, 4, 8, 4, deflate_fast),
    new Config(4, 5, 16, 8, deflate_fast),
    new Config(4, 6, 32, 32, deflate_fast),
    new Config(4, 4, 16, 16, deflate_slow),
    new Config(8, 16, 32, 32, deflate_slow),
    new Config(8, 16, 128, 128, deflate_slow),
    new Config(8, 32, 128, 256, deflate_slow),
    new Config(32, 128, 258, 1024, deflate_slow),
    new Config(32, 258, 258, 4096, deflate_slow)
  ];
  function lm_init(s) {
    s.window_size = 2 * s.w_size;
    zero(s.head);
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
    this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
    this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new utils.Buf16(MAX_BITS + 1);
    this.heap = new utils.Buf16(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new utils.Buf16(2 * L_CODES + 1);
    zero(this.depth);
    this.l_buf = 0;
    this.lit_bufsize = 0;
    this.last_lit = 0;
    this.d_buf = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  function deflateResetKeep(strm) {
    var s;
    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;
    if (s.wrap < 0) {
      s.wrap = -s.wrap;
    }
    s.status = s.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler = s.wrap === 2 ? 0 : 1;
    s.last_flush = Z_NO_FLUSH;
    trees._tr_init(s);
    return Z_OK;
  }
  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK) {
      lm_init(strm.state);
    }
    return ret;
  }
  function deflateSetHeader(strm, head) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    if (strm.state.wrap !== 2) {
      return Z_STREAM_ERROR;
    }
    strm.state.gzhead = head;
    return Z_OK;
  }
  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    var wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
      return err(strm, Z_STREAM_ERROR);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    var s = new DeflateState;
    strm.state = s;
    s.strm = strm;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new utils.Buf8(s.w_size * 2);
    s.head = new utils.Buf16(s.hash_size);
    s.prev = new utils.Buf16(s.w_size);
    s.lit_bufsize = 1 << memLevel + 6;
    s.pending_buf_size = s.lit_bufsize * 4;
    s.pending_buf = new utils.Buf8(s.pending_buf_size);
    s.d_buf = 1 * s.lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  }
  function deflateInit(strm, level) {
    return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
  }
  function deflate(strm, flush) {
    var old_flush, s;
    var beg, val;
    if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
    }
    s = strm.state;
    if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
    }
    s.strm = strm;
    old_flush = s.last_flush;
    s.last_flush = flush;
    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        strm.adler = 0;
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) {
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
          put_byte(s, s.gzhead.time & 255);
          put_byte(s, s.gzhead.time >> 8 & 255);
          put_byte(s, s.gzhead.time >> 16 & 255);
          put_byte(s, s.gzhead.time >> 24 & 255);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, s.gzhead.os & 255);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 255);
            put_byte(s, s.gzhead.extra.length >> 8 & 255);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else {
        var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
        var level_flags = -1;
        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;
        s.status = BUSY_STATE;
        putShortMSB(s, header);
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        strm.adler = 1;
      }
    }
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra) {
        beg = s.pending;
        while (s.gzindex < (s.gzhead.extra.length & 65535)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 255);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          strm.adler = 0;
          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    }
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
      return err(strm, Z_BUF_ERROR);
    }
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR);
    }
    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
      var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
        }
        return Z_OK;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          trees._tr_align(s);
        } else if (flush !== Z_BLOCK) {
          trees._tr_stored_block(s, 0, 0, false);
          if (flush === Z_FULL_FLUSH) {
            zero(s.head);
            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK;
        }
      }
    }
    if (flush !== Z_FINISH) {
      return Z_OK;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END;
    }
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      put_byte(s, strm.adler >> 16 & 255);
      put_byte(s, strm.adler >> 24 & 255);
      put_byte(s, strm.total_in & 255);
      put_byte(s, strm.total_in >> 8 & 255);
      put_byte(s, strm.total_in >> 16 & 255);
      put_byte(s, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    return s.pending !== 0 ? Z_OK : Z_STREAM_END;
  }
  function deflateEnd(strm) {
    var status;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    status = strm.state.status;
    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR);
    }
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
  }
  function deflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var s;
    var str, n;
    var wrap;
    var avail;
    var next;
    var input;
    var tmpDict;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    s = strm.state;
    wrap = s.wrap;
    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR;
    }
    if (wrap === 1) {
      strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
    }
    s.wrap = 0;
    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        zero(s.head);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      tmpDict = new utils.Buf8(s.w_size);
      utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    avail = strm.avail_in;
    next = strm.next_in;
    input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH) {
      str = s.strstart;
      n = s.lookahead - (MIN_MATCH - 1);
      do {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK;
  }
  exports.deflateInit = deflateInit;
  exports.deflateInit2 = deflateInit2;
  exports.deflateReset = deflateReset;
  exports.deflateResetKeep = deflateResetKeep;
  exports.deflateSetHeader = deflateSetHeader;
  exports.deflate = deflate;
  exports.deflateEnd = deflateEnd;
  exports.deflateSetDictionary = deflateSetDictionary;
  exports.deflateInfo = "pako deflate (from Nodeca project)";
});

// node_modules/pako/lib/utils/strings.js
var require_strings = __commonJS((exports) => {
  var utils = require_common();
  var STR_APPLY_OK = true;
  var STR_APPLY_UIA_OK = true;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (__) {
    STR_APPLY_OK = false;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  }
  var _utf8len = new utils.Buf8(256);
  for (q = 0;q < 256; q++) {
    _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }
  var q;
  _utf8len[254] = _utf8len[254] = 1;
  exports.string2buf = function(str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
    for (m_pos = 0;m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    buf = new utils.Buf8(buf_len);
    for (i = 0, m_pos = 0;i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i++] = c;
      } else if (c < 2048) {
        buf[i++] = 192 | c >>> 6;
        buf[i++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i++] = 224 | c >>> 12;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      } else {
        buf[i++] = 240 | c >>> 18;
        buf[i++] = 128 | c >>> 12 & 63;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      }
    }
    return buf;
  };
  function buf2binstring(buf, len) {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
        return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
      }
    }
    var result = "";
    for (var i = 0;i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  }
  exports.buf2binstring = function(buf) {
    return buf2binstring(buf, buf.length);
  };
  exports.binstring2buf = function(str) {
    var buf = new utils.Buf8(str.length);
    for (var i = 0, len = buf.length;i < len; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf;
  };
  exports.buf2string = function(buf, max) {
    var i, out, c, c_len;
    var len = max || buf.length;
    var utf16buf = new Array(len * 2);
    for (out = 0, i = 0;i < len; ) {
      c = buf[i++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i < len) {
        c = c << 6 | buf[i++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    return buf2binstring(utf16buf, out);
  };
  exports.utf8border = function(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
});

// node_modules/pako/lib/zlib/zstream.js
var require_zstream = __commonJS((exports, module) => {
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  module.exports = ZStream;
});

// node_modules/pako/lib/deflate.js
var require_deflate2 = __commonJS((exports) => {
  var zlib_deflate = require_deflate();
  var utils = require_common();
  var strings = require_strings();
  var msg = require_messages();
  var ZStream = require_zstream();
  var toString = Object.prototype.toString;
  var Z_NO_FLUSH = 0;
  var Z_FINISH = 4;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_SYNC_FLUSH = 2;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_DEFLATED = 8;
  function Deflate(options) {
    if (!(this instanceof Deflate))
      return new Deflate(options);
    this.options = utils.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream;
    this.strm.avail_out = 0;
    var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }
    if (opt.header) {
      zlib_deflate.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      var dict;
      if (typeof opt.dictionary === "string") {
        dict = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = zlib_deflate.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK) {
        throw new Error(msg[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var status, _mode;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings.string2buf(data);
    } else if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_deflate.deflate(strm, _mode);
      if (status !== Z_STREAM_END && status !== Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
        if (this.options.to === "string") {
          this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
    if (_mode === Z_FINISH) {
      status = zlib_deflate.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK;
    }
    if (_mode === Z_SYNC_FLUSH) {
      this.onEnd(Z_OK);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Deflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Deflate.prototype.onEnd = function(status) {
    if (status === Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function deflate(input, options) {
    var deflator = new Deflate(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || msg[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return deflate(input, options);
  }
  function gzip(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate(input, options);
  }
  exports.Deflate = Deflate;
  exports.deflate = deflate;
  exports.deflateRaw = deflateRaw;
  exports.gzip = gzip;
});

// node_modules/pako/lib/zlib/inffast.js
var require_inffast = __commonJS((exports, module) => {
  var BAD = 30;
  var TYPE = 12;
  module.exports = function inflate_fast(strm, start) {
    var state;
    var _in;
    var last;
    var _out;
    var beg;
    var end;
    var dmax;
    var wsize;
    var whave;
    var wnext;
    var s_window;
    var hold;
    var bits;
    var lcode;
    var dcode;
    var lmask;
    var dmask;
    var here;
    var op;
    var len;
    var dist;
    var from;
    var from_source;
    var input, output;
    state = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state.dmax;
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (;; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output[_out++] = here & 65535;
            } else if (op & 16) {
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (;; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
                      if (op > whave) {
                        if (state.sane) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output[_out++] = from_source[from++];
                        if (len > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output[_out++] = output[from++];
                        if (len > 1) {
                          output[_out++] = output[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state.mode = BAD;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state.mode = TYPE;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  };
});

// node_modules/pako/lib/zlib/inftrees.js
var require_inftrees = __commonJS((exports, module) => {
  var utils = require_common();
  var MAXBITS = 15;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var lbase = [
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ];
  var lext = [
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ];
  var dbase = [
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ];
  var dext = [
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
    var bits = opts.bits;
    var len = 0;
    var sym = 0;
    var min = 0, max = 0;
    var root = 0;
    var curr = 0;
    var drop = 0;
    var left = 0;
    var used = 0;
    var huff = 0;
    var incr;
    var fill;
    var low;
    var mask;
    var next;
    var base = null;
    var base_index = 0;
    var end;
    var count = new utils.Buf16(MAXBITS + 1);
    var offs = new utils.Buf16(MAXBITS + 1);
    var extra = null;
    var extra_index = 0;
    var here_bits, here_op, here_val;
    for (len = 0;len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0;sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max = MAXBITS;max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min = 1;min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }
    left = 1;
    for (len = 1;len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type === CODES || max !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1;len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0;sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type === CODES) {
      base = extra = work;
      end = 19;
    } else if (type === LENS) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      base = dbase;
      extra = dext;
      end = -1;
    }
    huff = 0;
    sym = 0;
    len = min;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask = used - 1;
    if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
      return 1;
    }
    for (;; ) {
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
          return 1;
        }
        low = huff & mask;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
});

// node_modules/pako/lib/zlib/inflate.js
var require_inflate = __commonJS((exports) => {
  var utils = require_common();
  var adler32 = require_adler32();
  var crc32 = require_crc322();
  var inflate_fast = require_inffast();
  var inflate_table = require_inftrees();
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_TREES = 6;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_NEED_DICT = 2;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR = -5;
  var Z_DEFLATED = 8;
  var HEAD = 1;
  var FLAGS = 2;
  var TIME = 3;
  var OS = 4;
  var EXLEN = 5;
  var EXTRA = 6;
  var NAME = 7;
  var COMMENT = 8;
  var HCRC = 9;
  var DICTID = 10;
  var DICT = 11;
  var TYPE = 12;
  var TYPEDO = 13;
  var STORED = 14;
  var COPY_ = 15;
  var COPY = 16;
  var TABLE = 17;
  var LENLENS = 18;
  var CODELENS = 19;
  var LEN_ = 20;
  var LEN = 21;
  var LENEXT = 22;
  var DIST = 23;
  var DISTEXT = 24;
  var MATCH = 25;
  var LIT = 26;
  var CHECK = 27;
  var LENGTH = 28;
  var DONE = 29;
  var BAD = 30;
  var MEM = 31;
  var SYNC = 32;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  function zswap32(q) {
    return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
  }
  function InflateState() {
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new utils.Buf16(320);
    this.work = new utils.Buf16(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  function inflateResetKeep(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = "";
    if (state.wrap) {
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null;
    state.hold = 0;
    state.bits = 0;
    state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
    state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
    state.sane = 1;
    state.back = -1;
    return Z_OK;
  }
  function inflateReset(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  }
  function inflateReset2(strm, windowBits) {
    var wrap;
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  }
  function inflateInit2(strm, windowBits) {
    var ret;
    var state;
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    state = new InflateState;
    strm.state = state;
    state.window = null;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK) {
      strm.state = null;
    }
    return ret;
  }
  function inflateInit(strm) {
    return inflateInit2(strm, DEF_WBITS);
  }
  var virgin = true;
  var lenfix;
  var distfix;
  function fixedtables(state) {
    if (virgin) {
      var sym;
      lenfix = new utils.Buf32(512);
      distfix = new utils.Buf32(32);
      sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }
      inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }
      inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
      virgin = false;
    }
    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  }
  function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new utils.Buf8(state.wsize);
    }
    if (copy >= state.wsize) {
      utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      utils.arraySet(state.window, src, end - copy, dist, state.wnext);
      copy -= dist;
      if (copy) {
        utils.arraySet(state.window, src, end - copy, copy, 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  }
  function inflate(strm, flush) {
    var state;
    var input, output;
    var next;
    var put;
    var have, left;
    var hold;
    var bits;
    var _in, _out;
    var copy;
    var from;
    var from_source;
    var here = 0;
    var here_bits, here_op, here_val;
    var last_bits, last_op, last_val;
    var len;
    var ret;
    var hbuf = new utils.Buf8(4);
    var opts;
    var n;
    var order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    }
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    _in = have;
    _out = left;
    ret = Z_OK;
    inf_leave:
      for (;; ) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 2 && hold === 35615) {
              state.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state.mode = FLAGS;
              break;
            }
            state.flags = 0;
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len = (hold & 15) + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            } else if (len > state.wbits) {
              strm.msg = "invalid window size";
              state.mode = BAD;
              break;
            }
            state.dmax = 1 << len;
            strm.adler = state.check = 1;
            state.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.flags = hold;
            if ((state.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            if (state.flags & 57344) {
              strm.msg = "unknown header flags set";
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = hold >> 8 & 1;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.time = hold;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state.check = crc32(state.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.xflags = hold & 255;
              state.head.os = hold >> 8;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = EXLEN;
          case EXLEN:
            if (state.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state.head) {
              state.head.extra = null;
            }
            state.mode = EXTRA;
          case EXTRA:
            if (state.flags & 1024) {
              copy = state.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    state.head.extra = new Array(state.head.extra_len);
                  }
                  utils.arraySet(state.head.extra, input, next, copy, len);
                }
                if (state.flags & 512) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) {
                break inf_leave;
              }
            }
            state.length = 0;
            state.mode = NAME;
          case NAME:
            if (state.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
          case COMMENT:
            if (state.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
          case HCRC:
            if (state.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.check & 65535)) {
                strm.msg = "header crc mismatch";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state.head) {
              state.head.hcrc = state.flags >> 9 & 1;
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state.mode = DICT;
          case DICT:
            if (state.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              return Z_NEED_DICT;
            }
            strm.adler = state.check = 1;
            state.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state.mode = STORED;
                break;
              case 1:
                fixedtables(state);
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state.mode = BAD;
              break;
            }
            state.length = hold & 65535;
            hold = 0;
            bits = 0;
            state.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state.mode = COPY;
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              utils.arraySet(output, input, next, copy, put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            state.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = LENLENS;
          case LENLENS:
            while (state.have < state.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.lens[order[state.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            state.lencode = state.lendyn;
            state.lenbits = 7;
            opts = { bits: state.lenbits };
            ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = CODELENS;
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (;; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state.lens[state.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }
            if (state.mode === BAD) {
              break;
            }
            if (state.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state.mode = BAD;
              break;
            }
            state.lenbits = 9;
            opts = { bits: state.lenbits };
            ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state.mode = BAD;
              break;
            }
            state.distbits = 6;
            state.distcode = state.distdyn;
            opts = { bits: state.distbits };
            ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            state.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state.mode = BAD;
              break;
            }
            state.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              inflate_fast(strm, _out);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (;; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;; ) {
                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
          case LENEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            state.was = state.length;
            state.mode = DIST;
          case DIST:
            for (;; ) {
              here = state.distcode[hold & (1 << state.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;; ) {
                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = here_op & 15;
            state.mode = DISTEXT;
          case DISTEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.offset += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            if (state.offset > state.dmax) {
              strm.msg = "invalid distance too far back";
              state.mode = BAD;
              break;
            }
            state.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy = _out - left;
            if (state.offset > copy) {
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              } else {
                from = state.wnext - copy;
              }
              if (copy > state.length) {
                copy = state.length;
              }
              from_source = state.window;
            } else {
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) {
              state.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if (_out) {
                strm.adler = state.check = state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
              }
              _out = left;
              if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = "incorrect data check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = LENGTH;
          case LENGTH:
            if (state.wrap && state.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = DONE;
          case DONE:
            ret = Z_STREAM_END;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR;
          case SYNC:
          default:
            return Z_STREAM_ERROR;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
        state.mode = MEM;
        return Z_MEM_ERROR;
      }
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap && _out) {
      strm.adler = state.check = state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  }
  function inflateEnd(strm) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    var state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK;
  }
  function inflateGetHeader(strm, head) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if ((state.wrap & 2) === 0) {
      return Z_STREAM_ERROR;
    }
    state.head = head;
    head.done = false;
    return Z_OK;
  }
  function inflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var state;
    var dictid;
    var ret;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR;
    }
    if (state.mode === DICT) {
      dictid = 1;
      dictid = adler32(dictid, dictionary, dictLength, 0);
      if (dictid !== state.check) {
        return Z_DATA_ERROR;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
    state.havedict = 1;
    return Z_OK;
  }
  exports.inflateReset = inflateReset;
  exports.inflateReset2 = inflateReset2;
  exports.inflateResetKeep = inflateResetKeep;
  exports.inflateInit = inflateInit;
  exports.inflateInit2 = inflateInit2;
  exports.inflate = inflate;
  exports.inflateEnd = inflateEnd;
  exports.inflateGetHeader = inflateGetHeader;
  exports.inflateSetDictionary = inflateSetDictionary;
  exports.inflateInfo = "pako inflate (from Nodeca project)";
});

// node_modules/pako/lib/zlib/constants.js
var require_constants = __commonJS((exports, module) => {
  module.exports = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  };
});

// node_modules/pako/lib/zlib/gzheader.js
var require_gzheader = __commonJS((exports, module) => {
  function GZheader() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  module.exports = GZheader;
});

// node_modules/pako/lib/inflate.js
var require_inflate2 = __commonJS((exports) => {
  var zlib_inflate = require_inflate();
  var utils = require_common();
  var strings = require_strings();
  var c = require_constants();
  var msg = require_messages();
  var ZStream = require_zstream();
  var GZheader = require_gzheader();
  var toString = Object.prototype.toString;
  function Inflate(options) {
    if (!(this instanceof Inflate))
      return new Inflate(options);
    this.options = utils.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream;
    this.strm.avail_out = 0;
    var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
    if (status !== c.Z_OK) {
      throw new Error(msg[status]);
    }
    this.header = new GZheader;
    zlib_inflate.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
      }
    }
  }
  Inflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var dictionary = this.options.dictionary;
    var status, _mode;
    var next_out_utf8, tail, utf8str;
    var allowBufError = false;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings.binstring2buf(data);
    } else if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
      if (status === c.Z_NEED_DICT && dictionary) {
        status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
      }
      if (status === c.Z_BUF_ERROR && allowBufError === true) {
        status = c.Z_OK;
        allowBufError = false;
      }
      if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
          if (this.options.to === "string") {
            next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            tail = strm.next_out - next_out_utf8;
            utf8str = strings.buf2string(strm.output, next_out_utf8);
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail) {
              utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
            }
            this.onData(utf8str);
          } else {
            this.onData(utils.shrinkBuf(strm.output, strm.next_out));
          }
        }
      }
      if (strm.avail_in === 0 && strm.avail_out === 0) {
        allowBufError = true;
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
    if (status === c.Z_STREAM_END) {
      _mode = c.Z_FINISH;
    }
    if (_mode === c.Z_FINISH) {
      status = zlib_inflate.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === c.Z_OK;
    }
    if (_mode === c.Z_SYNC_FLUSH) {
      this.onEnd(c.Z_OK);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Inflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Inflate.prototype.onEnd = function(status) {
    if (status === c.Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function inflate(input, options) {
    var inflator = new Inflate(options);
    inflator.push(input, true);
    if (inflator.err) {
      throw inflator.msg || msg[inflator.err];
    }
    return inflator.result;
  }
  function inflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return inflate(input, options);
  }
  exports.Inflate = Inflate;
  exports.inflate = inflate;
  exports.inflateRaw = inflateRaw;
  exports.ungzip = inflate;
});

// node_modules/pako/index.js
var require_pako = __commonJS((exports, module) => {
  var assign = require_common().assign;
  var deflate = require_deflate2();
  var inflate = require_inflate2();
  var constants = require_constants();
  var pako = {};
  assign(pako, deflate, inflate, constants);
  module.exports = pako;
});

// node_modules/pify/index.js
var require_pify = __commonJS((exports, module) => {
  var processFn = (fn, options) => function(...args) {
    const P = options.promiseModule;
    return new P((resolve, reject) => {
      if (options.multiArgs) {
        args.push((...result) => {
          if (options.errorFirst) {
            if (result[0]) {
              reject(result);
            } else {
              result.shift();
              resolve(result);
            }
          } else {
            resolve(result);
          }
        });
      } else if (options.errorFirst) {
        args.push((error3, result) => {
          if (error3) {
            reject(error3);
          } else {
            resolve(result);
          }
        });
      } else {
        args.push(resolve);
      }
      fn.apply(this, args);
    });
  };
  module.exports = (input, options) => {
    options = Object.assign({
      exclude: [/.+(Sync|Stream)$/],
      errorFirst: true,
      promiseModule: Promise
    }, options);
    const objType = typeof input;
    if (!(input !== null && (objType === "object" || objType === "function"))) {
      throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objType}\``);
    }
    const filter = (key) => {
      const match = (pattern) => typeof pattern === "string" ? key === pattern : pattern.test(key);
      return options.include ? options.include.some(match) : !options.exclude.some(match);
    };
    let ret;
    if (objType === "function") {
      ret = function(...args) {
        return options.excludeMain ? input(...args) : processFn(input, options).apply(this, args);
      };
    } else {
      ret = Object.create(Object.getPrototypeOf(input));
    }
    for (const key in input) {
      const property = input[key];
      ret[key] = typeof property === "function" && filter(key) ? processFn(property, options) : property;
    }
    return ret;
  };
});

// node_modules/ignore/index.js
var require_ignore = __commonJS((exports, module) => {
  function makeArray(subject) {
    return Array.isArray(subject) ? subject : [subject];
  }
  var EMPTY = "";
  var SPACE = " ";
  var ESCAPE = "\\";
  var REGEX_TEST_BLANK_LINE = /^\s+$/;
  var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
  var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
  var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
  var REGEX_SPLITALL_CRLF = /\r?\n/g;
  var REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
  var SLASH = "/";
  var TMP_KEY_IGNORE = "node-ignore";
  if (typeof Symbol !== "undefined") {
    TMP_KEY_IGNORE = Symbol.for("node-ignore");
  }
  var KEY_IGNORE = TMP_KEY_IGNORE;
  var define2 = (object, key, value) => Object.defineProperty(object, key, { value });
  var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
  var RETURN_FALSE = () => false;
  var sanitizeRange = (range) => range.replace(REGEX_REGEXP_RANGE, (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY);
  var cleanRangeBackSlash = (slashes) => {
    const { length } = slashes;
    return slashes.slice(0, length - length % 2);
  };
  var REPLACERS = [
    [
      /^\uFEFF/,
      () => EMPTY
    ],
    [
      /((?:\\\\)*?)(\\?\s+)$/,
      (_, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? SPACE : EMPTY)
    ],
    [
      /(\\+?)\s/g,
      (_, m1) => {
        const { length } = m1;
        return m1.slice(0, length - length % 2) + SPACE;
      }
    ],
    [
      /[\\$.|*+(){^]/g,
      (match) => `\\${match}`
    ],
    [
      /(?!\\)\?/g,
      () => "[^/]"
    ],
    [
      /^\//,
      () => "^"
    ],
    [
      /\//g,
      () => "\\/"
    ],
    [
      /^\^*\\\*\\\*\\\//,
      () => "^(?:.*\\/)?"
    ],
    [
      /^(?=[^^])/,
      function startingReplacer() {
        return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
      }
    ],
    [
      /\\\/\\\*\\\*(?=\\\/|$)/g,
      (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
    ],
    [
      /(^|[^\\]+)(\\\*)+(?=.+)/g,
      (_, p1, p2) => {
        const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
        return p1 + unescaped;
      }
    ],
    [
      /\\\\\\(?=[$.|*+(){^])/g,
      () => ESCAPE
    ],
    [
      /\\\\/g,
      () => ESCAPE
    ],
    [
      /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
      (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
    ],
    [
      /(?:[^*])$/,
      (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
    ],
    [
      /(\^|\\\/)?\\\*$/,
      (_, p1) => {
        const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
        return `${prefix}(?=$|\\/$)`;
      }
    ]
  ];
  var regexCache2 = Object.create(null);
  var makeRegex = (pattern, ignoreCase) => {
    let source = regexCache2[pattern];
    if (!source) {
      source = REPLACERS.reduce((prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern)), pattern);
      regexCache2[pattern] = source;
    }
    return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
  };
  var isString = (subject) => typeof subject === "string";
  var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
  var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);

  class IgnoreRule {
    constructor(origin, pattern, negative, regex) {
      this.origin = origin;
      this.pattern = pattern;
      this.negative = negative;
      this.regex = regex;
    }
  }
  var createRule = (pattern, ignoreCase) => {
    const origin = pattern;
    let negative = false;
    if (pattern.indexOf("!") === 0) {
      negative = true;
      pattern = pattern.substr(1);
    }
    pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
    const regex = makeRegex(pattern, ignoreCase);
    return new IgnoreRule(origin, pattern, negative, regex);
  };
  var throwError = (message, Ctor) => {
    throw new Ctor(message);
  };
  var checkPath = (path, originalPath, doThrow) => {
    if (!isString(path)) {
      return doThrow(`path must be a string, but got \`${originalPath}\``, TypeError);
    }
    if (!path) {
      return doThrow(`path must not be empty`, TypeError);
    }
    if (checkPath.isNotRelative(path)) {
      const r = "`path.relative()`d";
      return doThrow(`path should be a ${r} string, but got "${originalPath}"`, RangeError);
    }
    return true;
  };
  var isNotRelative = (path) => REGEX_TEST_INVALID_PATH.test(path);
  checkPath.isNotRelative = isNotRelative;
  checkPath.convert = (p) => p;

  class Ignore {
    constructor({
      ignorecase = true,
      ignoreCase = ignorecase,
      allowRelativePaths = false
    } = {}) {
      define2(this, KEY_IGNORE, true);
      this._rules = [];
      this._ignoreCase = ignoreCase;
      this._allowRelativePaths = allowRelativePaths;
      this._initCache();
    }
    _initCache() {
      this._ignoreCache = Object.create(null);
      this._testCache = Object.create(null);
    }
    _addPattern(pattern) {
      if (pattern && pattern[KEY_IGNORE]) {
        this._rules = this._rules.concat(pattern._rules);
        this._added = true;
        return;
      }
      if (checkPattern(pattern)) {
        const rule = createRule(pattern, this._ignoreCase);
        this._added = true;
        this._rules.push(rule);
      }
    }
    add(pattern) {
      this._added = false;
      makeArray(isString(pattern) ? splitPattern(pattern) : pattern).forEach(this._addPattern, this);
      if (this._added) {
        this._initCache();
      }
      return this;
    }
    addPattern(pattern) {
      return this.add(pattern);
    }
    _testOne(path, checkUnignored) {
      let ignored = false;
      let unignored = false;
      this._rules.forEach((rule) => {
        const { negative } = rule;
        if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
          return;
        }
        const matched = rule.regex.test(path);
        if (matched) {
          ignored = !negative;
          unignored = negative;
        }
      });
      return {
        ignored,
        unignored
      };
    }
    _test(originalPath, cache, checkUnignored, slices) {
      const path = originalPath && checkPath.convert(originalPath);
      checkPath(path, originalPath, this._allowRelativePaths ? RETURN_FALSE : throwError);
      return this._t(path, cache, checkUnignored, slices);
    }
    _t(path, cache, checkUnignored, slices) {
      if (path in cache) {
        return cache[path];
      }
      if (!slices) {
        slices = path.split(SLASH);
      }
      slices.pop();
      if (!slices.length) {
        return cache[path] = this._testOne(path, checkUnignored);
      }
      const parent = this._t(slices.join(SLASH) + SLASH, cache, checkUnignored, slices);
      return cache[path] = parent.ignored ? parent : this._testOne(path, checkUnignored);
    }
    ignores(path) {
      return this._test(path, this._ignoreCache, false).ignored;
    }
    createFilter() {
      return (path) => !this.ignores(path);
    }
    filter(paths) {
      return makeArray(paths).filter(this.createFilter());
    }
    test(path) {
      return this._test(path, this._testCache, true);
    }
  }
  var factory = (options) => new Ignore(options);
  var isPathValid = (path) => checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
  factory.isPathValid = isPathValid;
  factory.default = factory;
  module.exports = factory;
  if (typeof process !== "undefined" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")) {
    const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
    checkPath.convert = makePosix;
    const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
    checkPath.isNotRelative = (path) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
  }
});

// node_modules/clean-git-ref/lib/index.js
var require_lib2 = __commonJS((exports, module) => {
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function replaceAll(str, search, replacement) {
    search = search instanceof RegExp ? search : new RegExp(escapeRegExp(search), "g");
    return str.replace(search, replacement);
  }
  var CleanGitRef = {
    clean: function clean(value) {
      if (typeof value !== "string") {
        throw new Error("Expected a string, received: " + value);
      }
      value = replaceAll(value, "./", "/");
      value = replaceAll(value, "..", ".");
      value = replaceAll(value, " ", "-");
      value = replaceAll(value, /^[~^:?*\\\-]/g, "");
      value = replaceAll(value, /[~^:?*\\]/g, "-");
      value = replaceAll(value, /[~^:?*\\\-]$/g, "");
      value = replaceAll(value, "@{", "-");
      value = replaceAll(value, /\.$/g, "");
      value = replaceAll(value, /\/$/g, "");
      value = replaceAll(value, /\.lock$/g, "");
      return value;
    }
  };
  module.exports = CleanGitRef;
});

// node_modules/diff3/onp.js
var require_onp = __commonJS((exports, module) => {
  module.exports = function(a_, b_) {
    var a = a_, b = b_, m = a.length, n = b.length, reverse = false, ed = null, offset = m + 1, path = [], pathposi = [], ses = [], lcs = "", SES_DELETE = -1, SES_COMMON = 0, SES_ADD = 1;
    var tmp1, tmp2;
    var init = function() {
      if (m >= n) {
        tmp1 = a;
        tmp2 = m;
        a = b;
        b = tmp1;
        m = n;
        n = tmp2;
        reverse = true;
        offset = m + 1;
      }
    };
    var P = function(x, y, k) {
      return {
        x,
        y,
        k
      };
    };
    var seselem = function(elem, t) {
      return {
        elem,
        t
      };
    };
    var snake = function(k, p, pp) {
      var r, x, y;
      if (p > pp) {
        r = path[k - 1 + offset];
      } else {
        r = path[k + 1 + offset];
      }
      y = Math.max(p, pp);
      x = y - k;
      while (x < m && y < n && a[x] === b[y]) {
        ++x;
        ++y;
      }
      path[k + offset] = pathposi.length;
      pathposi[pathposi.length] = new P(x, y, r);
      return y;
    };
    var recordseq = function(epc) {
      var x_idx, y_idx, px_idx, py_idx, i;
      x_idx = y_idx = 1;
      px_idx = py_idx = 0;
      for (i = epc.length - 1;i >= 0; --i) {
        while (px_idx < epc[i].x || py_idx < epc[i].y) {
          if (epc[i].y - epc[i].x > py_idx - px_idx) {
            if (reverse) {
              ses[ses.length] = new seselem(b[py_idx], SES_DELETE);
            } else {
              ses[ses.length] = new seselem(b[py_idx], SES_ADD);
            }
            ++y_idx;
            ++py_idx;
          } else if (epc[i].y - epc[i].x < py_idx - px_idx) {
            if (reverse) {
              ses[ses.length] = new seselem(a[px_idx], SES_ADD);
            } else {
              ses[ses.length] = new seselem(a[px_idx], SES_DELETE);
            }
            ++x_idx;
            ++px_idx;
          } else {
            ses[ses.length] = new seselem(a[px_idx], SES_COMMON);
            lcs += a[px_idx];
            ++x_idx;
            ++y_idx;
            ++px_idx;
            ++py_idx;
          }
        }
      }
    };
    init();
    return {
      SES_DELETE: -1,
      SES_COMMON: 0,
      SES_ADD: 1,
      editdistance: function() {
        return ed;
      },
      getlcs: function() {
        return lcs;
      },
      getses: function() {
        return ses;
      },
      compose: function() {
        var delta, size, fp, p, r, epc, i, k;
        delta = n - m;
        size = m + n + 3;
        fp = {};
        for (i = 0;i < size; ++i) {
          fp[i] = -1;
          path[i] = -1;
        }
        p = -1;
        do {
          ++p;
          for (k = -p;k <= delta - 1; ++k) {
            fp[k + offset] = snake(k, fp[k - 1 + offset] + 1, fp[k + 1 + offset]);
          }
          for (k = delta + p;k >= delta + 1; --k) {
            fp[k + offset] = snake(k, fp[k - 1 + offset] + 1, fp[k + 1 + offset]);
          }
          fp[delta + offset] = snake(delta, fp[delta - 1 + offset] + 1, fp[delta + 1 + offset]);
        } while (fp[delta + offset] !== n);
        ed = delta + 2 * p;
        r = path[delta + offset];
        epc = [];
        while (r !== -1) {
          epc[epc.length] = new P(pathposi[r].x, pathposi[r].y, null);
          r = pathposi[r].k;
        }
        recordseq(epc);
      }
    };
  };
});

// node_modules/diff3/diff3.js
var require_diff3 = __commonJS((exports, module) => {
  var onp = require_onp();
  function longestCommonSubsequence(file1, file2) {
    var diff = new onp(file1, file2);
    diff.compose();
    var ses = diff.getses();
    var root;
    var prev;
    var file1RevIdx = file1.length - 1, file2RevIdx = file2.length - 1;
    for (var i = ses.length - 1;i >= 0; --i) {
      if (ses[i].t === diff.SES_COMMON) {
        if (prev) {
          prev.chain = {
            file1index: file1RevIdx,
            file2index: file2RevIdx,
            chain: null
          };
          prev = prev.chain;
        } else {
          root = {
            file1index: file1RevIdx,
            file2index: file2RevIdx,
            chain: null
          };
          prev = root;
        }
        file1RevIdx--;
        file2RevIdx--;
      } else if (ses[i].t === diff.SES_DELETE) {
        file1RevIdx--;
      } else if (ses[i].t === diff.SES_ADD) {
        file2RevIdx--;
      }
    }
    var tail = {
      file1index: -1,
      file2index: -1,
      chain: null
    };
    if (!prev) {
      return tail;
    }
    prev.chain = tail;
    return root;
  }
  function diffIndices(file1, file2) {
    var result = [];
    var tail1 = file1.length;
    var tail2 = file2.length;
    for (var candidate = longestCommonSubsequence(file1, file2);candidate !== null; candidate = candidate.chain) {
      var mismatchLength1 = tail1 - candidate.file1index - 1;
      var mismatchLength2 = tail2 - candidate.file2index - 1;
      tail1 = candidate.file1index;
      tail2 = candidate.file2index;
      if (mismatchLength1 || mismatchLength2) {
        result.push({
          file1: [tail1 + 1, mismatchLength1],
          file2: [tail2 + 1, mismatchLength2]
        });
      }
    }
    result.reverse();
    return result;
  }
  function diff3MergeIndices(a, o, b) {
    var i;
    var m1 = diffIndices(o, a);
    var m2 = diffIndices(o, b);
    var hunks = [];
    function addHunk(h, side2) {
      hunks.push([h.file1[0], side2, h.file1[1], h.file2[0], h.file2[1]]);
    }
    for (i = 0;i < m1.length; i++) {
      addHunk(m1[i], 0);
    }
    for (i = 0;i < m2.length; i++) {
      addHunk(m2[i], 2);
    }
    hunks.sort(function(x, y) {
      return x[0] - y[0];
    });
    var result = [];
    var commonOffset = 0;
    function copyCommon(targetOffset) {
      if (targetOffset > commonOffset) {
        result.push([1, commonOffset, targetOffset - commonOffset]);
        commonOffset = targetOffset;
      }
    }
    for (var hunkIndex = 0;hunkIndex < hunks.length; hunkIndex++) {
      var firstHunkIndex = hunkIndex;
      var hunk = hunks[hunkIndex];
      var regionLhs = hunk[0];
      var regionRhs = regionLhs + hunk[2];
      while (hunkIndex < hunks.length - 1) {
        var maybeOverlapping = hunks[hunkIndex + 1];
        var maybeLhs = maybeOverlapping[0];
        if (maybeLhs > regionRhs)
          break;
        regionRhs = Math.max(regionRhs, maybeLhs + maybeOverlapping[2]);
        hunkIndex++;
      }
      copyCommon(regionLhs);
      if (firstHunkIndex == hunkIndex) {
        if (hunk[4] > 0) {
          result.push([hunk[1], hunk[3], hunk[4]]);
        }
      } else {
        var regions = {
          0: [a.length, -1, o.length, -1],
          2: [b.length, -1, o.length, -1]
        };
        for (i = firstHunkIndex;i <= hunkIndex; i++) {
          hunk = hunks[i];
          var side = hunk[1];
          var r = regions[side];
          var oLhs = hunk[0];
          var oRhs = oLhs + hunk[2];
          var abLhs = hunk[3];
          var abRhs = abLhs + hunk[4];
          r[0] = Math.min(abLhs, r[0]);
          r[1] = Math.max(abRhs, r[1]);
          r[2] = Math.min(oLhs, r[2]);
          r[3] = Math.max(oRhs, r[3]);
        }
        var aLhs = regions[0][0] + (regionLhs - regions[0][2]);
        var aRhs = regions[0][1] + (regionRhs - regions[0][3]);
        var bLhs = regions[2][0] + (regionLhs - regions[2][2]);
        var bRhs = regions[2][1] + (regionRhs - regions[2][3]);
        result.push([
          -1,
          aLhs,
          aRhs - aLhs,
          regionLhs,
          regionRhs - regionLhs,
          bLhs,
          bRhs - bLhs
        ]);
      }
      commonOffset = regionRhs;
    }
    copyCommon(o.length);
    return result;
  }
  function diff3Merge(a, o, b) {
    var result = [];
    var files = [a, o, b];
    var indices = diff3MergeIndices(a, o, b);
    var okLines = [];
    function flushOk() {
      if (okLines.length) {
        result.push({
          ok: okLines
        });
      }
      okLines = [];
    }
    function pushOk(xs) {
      for (var j = 0;j < xs.length; j++) {
        okLines.push(xs[j]);
      }
    }
    function isTrueConflict(rec) {
      if (rec[2] != rec[6])
        return true;
      var aoff = rec[1];
      var boff = rec[5];
      for (var j = 0;j < rec[2]; j++) {
        if (a[j + aoff] != b[j + boff])
          return true;
      }
      return false;
    }
    for (var i = 0;i < indices.length; i++) {
      var x = indices[i];
      var side = x[0];
      if (side == -1) {
        if (!isTrueConflict(x)) {
          pushOk(files[0].slice(x[1], x[1] + x[2]));
        } else {
          flushOk();
          result.push({
            conflict: {
              a: a.slice(x[1], x[1] + x[2]),
              aIndex: x[1],
              o: o.slice(x[3], x[3] + x[4]),
              oIndex: x[3],
              b: b.slice(x[5], x[5] + x[6]),
              bIndex: x[5]
            }
          });
        }
      } else {
        pushOk(files[side].slice(x[1], x[1] + x[2]));
      }
    }
    flushOk();
    return result;
  }
  module.exports = diff3Merge;
});

// node_modules/isomorphic-git/index.cjs
var require_isomorphic_git = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var AsyncLock = _interopDefault(require_lib());
  var Hash = _interopDefault(require_sha1());
  var crc32 = _interopDefault(require_crc32());
  var pako = _interopDefault(require_pako());
  var crypto$1 = __require("crypto");
  var pify = _interopDefault(require_pify());
  var ignore = _interopDefault(require_ignore());
  var cleanGitRef = _interopDefault(require_lib2());
  var diff3Merge = _interopDefault(require_diff3());

  class BaseError extends Error {
    constructor(message) {
      super(message);
      this.caller = "";
    }
    toJSON() {
      return {
        code: this.code,
        data: this.data,
        caller: this.caller,
        message: this.message,
        stack: this.stack
      };
    }
    fromJSON(json) {
      const e = new BaseError(json.message);
      e.code = json.code;
      e.data = json.data;
      e.caller = json.caller;
      e.stack = json.stack;
      return e;
    }
    get isIsomorphicGitError() {
      return true;
    }
  }

  class UnmergedPathsError extends BaseError {
    constructor(filepaths) {
      super(`Modifying the index is not possible because you have unmerged files: ${filepaths.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`);
      this.code = this.name = UnmergedPathsError.code;
      this.data = { filepaths };
    }
  }
  UnmergedPathsError.code = "UnmergedPathsError";

  class InternalError extends BaseError {
    constructor(message) {
      super(`An internal error caused this command to fail.

If you're using an application that depends on isomorphic-git, please report this error to that application's developers.

If you're a developer and you believe this is a bug in isomorphic-git, please file an issue at https://github.com/isomorphic-git/isomorphic-git/issues with a minimal reproduction, version and environment details, and this error message: ${message}`);
      this.code = this.name = InternalError.code;
      this.data = { message };
    }
  }
  InternalError.code = "InternalError";

  class UnsafeFilepathError extends BaseError {
    constructor(filepath) {
      super(`The filepath "${filepath}" contains unsafe character sequences`);
      this.code = this.name = UnsafeFilepathError.code;
      this.data = { filepath };
    }
  }
  UnsafeFilepathError.code = "UnsafeFilepathError";

  class BufferCursor {
    constructor(buffer) {
      this.buffer = buffer;
      this._start = 0;
    }
    eof() {
      return this._start >= this.buffer.length;
    }
    tell() {
      return this._start;
    }
    seek(n) {
      this._start = n;
    }
    slice(n) {
      const r = this.buffer.slice(this._start, this._start + n);
      this._start += n;
      return r;
    }
    toString(enc, length) {
      const r = this.buffer.toString(enc, this._start, this._start + length);
      this._start += length;
      return r;
    }
    write(value, length, enc) {
      const r = this.buffer.write(value, this._start, length, enc);
      this._start += length;
      return r;
    }
    copy(source, start, end) {
      const r = source.copy(this.buffer, this._start, start, end);
      this._start += r;
      return r;
    }
    readUInt8() {
      const r = this.buffer.readUInt8(this._start);
      this._start += 1;
      return r;
    }
    writeUInt8(value) {
      const r = this.buffer.writeUInt8(value, this._start);
      this._start += 1;
      return r;
    }
    readUInt16BE() {
      const r = this.buffer.readUInt16BE(this._start);
      this._start += 2;
      return r;
    }
    writeUInt16BE(value) {
      const r = this.buffer.writeUInt16BE(value, this._start);
      this._start += 2;
      return r;
    }
    readUInt32BE() {
      const r = this.buffer.readUInt32BE(this._start);
      this._start += 4;
      return r;
    }
    writeUInt32BE(value) {
      const r = this.buffer.writeUInt32BE(value, this._start);
      this._start += 4;
      return r;
    }
  }
  function compareStrings(a, b) {
    return -(a < b) || +(a > b);
  }
  function comparePath(a, b) {
    return compareStrings(a.path, b.path);
  }
  function normalizeMode(mode) {
    let type = mode > 0 ? mode >> 12 : 0;
    if (type !== 4 && type !== 8 && type !== 10 && type !== 14) {
      type = 8;
    }
    let permissions = mode & 511;
    if (permissions & 73) {
      permissions = 493;
    } else {
      permissions = 420;
    }
    if (type !== 8)
      permissions = 0;
    return (type << 12) + permissions;
  }
  var MAX_UINT32 = 2 ** 32;
  function SecondsNanoseconds(givenSeconds, givenNanoseconds, milliseconds, date) {
    if (givenSeconds !== undefined && givenNanoseconds !== undefined) {
      return [givenSeconds, givenNanoseconds];
    }
    if (milliseconds === undefined) {
      milliseconds = date.valueOf();
    }
    const seconds = Math.floor(milliseconds / 1000);
    const nanoseconds = (milliseconds - seconds * 1000) * 1e6;
    return [seconds, nanoseconds];
  }
  function normalizeStats(e) {
    const [ctimeSeconds, ctimeNanoseconds] = SecondsNanoseconds(e.ctimeSeconds, e.ctimeNanoseconds, e.ctimeMs, e.ctime);
    const [mtimeSeconds, mtimeNanoseconds] = SecondsNanoseconds(e.mtimeSeconds, e.mtimeNanoseconds, e.mtimeMs, e.mtime);
    return {
      ctimeSeconds: ctimeSeconds % MAX_UINT32,
      ctimeNanoseconds: ctimeNanoseconds % MAX_UINT32,
      mtimeSeconds: mtimeSeconds % MAX_UINT32,
      mtimeNanoseconds: mtimeNanoseconds % MAX_UINT32,
      dev: e.dev % MAX_UINT32,
      ino: e.ino % MAX_UINT32,
      mode: normalizeMode(e.mode % MAX_UINT32),
      uid: e.uid % MAX_UINT32,
      gid: e.gid % MAX_UINT32,
      size: e.size > -1 ? e.size % MAX_UINT32 : 0
    };
  }
  function toHex(buffer) {
    let hex2 = "";
    for (const byte of new Uint8Array(buffer)) {
      if (byte < 16)
        hex2 += "0";
      hex2 += byte.toString(16);
    }
    return hex2;
  }
  var supportsSubtleSHA1 = null;
  async function shasum(buffer) {
    if (supportsSubtleSHA1 === null) {
      supportsSubtleSHA1 = await testSubtleSHA1();
    }
    return supportsSubtleSHA1 ? subtleSHA1(buffer) : shasumSync(buffer);
  }
  function shasumSync(buffer) {
    return new Hash().update(buffer).digest("hex");
  }
  async function subtleSHA1(buffer) {
    const hash = await crypto.subtle.digest("SHA-1", buffer);
    return toHex(hash);
  }
  async function testSubtleSHA1() {
    try {
      const hash = await subtleSHA1(new Uint8Array([]));
      return hash === "da39a3ee5e6b4b0d3255bfef95601890afd80709";
    } catch (_) {}
    return false;
  }
  function parseCacheEntryFlags(bits) {
    return {
      assumeValid: Boolean(bits & 32768),
      extended: Boolean(bits & 16384),
      stage: (bits & 12288) >> 12,
      nameLength: bits & 4095
    };
  }
  function renderCacheEntryFlags(entry) {
    const flags = entry.flags;
    flags.extended = false;
    flags.nameLength = Math.min(Buffer.from(entry.path).length, 4095);
    return (flags.assumeValid ? 32768 : 0) + (flags.extended ? 16384 : 0) + ((flags.stage & 3) << 12) + (flags.nameLength & 4095);
  }

  class GitIndex {
    constructor(entries, unmergedPaths) {
      this._dirty = false;
      this._unmergedPaths = unmergedPaths || new Set;
      this._entries = entries || new Map;
    }
    _addEntry(entry) {
      if (entry.flags.stage === 0) {
        entry.stages = [entry];
        this._entries.set(entry.path, entry);
        this._unmergedPaths.delete(entry.path);
      } else {
        let existingEntry = this._entries.get(entry.path);
        if (!existingEntry) {
          this._entries.set(entry.path, entry);
          existingEntry = entry;
        }
        existingEntry.stages[entry.flags.stage] = entry;
        this._unmergedPaths.add(entry.path);
      }
    }
    static async from(buffer) {
      if (Buffer.isBuffer(buffer)) {
        return GitIndex.fromBuffer(buffer);
      } else if (buffer === null) {
        return new GitIndex(null);
      } else {
        throw new InternalError("invalid type passed to GitIndex.from");
      }
    }
    static async fromBuffer(buffer) {
      if (buffer.length === 0) {
        throw new InternalError("Index file is empty (.git/index)");
      }
      const index2 = new GitIndex;
      const reader = new BufferCursor(buffer);
      const magic = reader.toString("utf8", 4);
      if (magic !== "DIRC") {
        throw new InternalError(`Invalid dircache magic file number: ${magic}`);
      }
      const shaComputed = await shasum(buffer.slice(0, -20));
      const shaClaimed = buffer.slice(-20).toString("hex");
      if (shaClaimed !== shaComputed) {
        throw new InternalError(`Invalid checksum in GitIndex buffer: expected ${shaClaimed} but saw ${shaComputed}`);
      }
      const version2 = reader.readUInt32BE();
      if (version2 !== 2) {
        throw new InternalError(`Unsupported dircache version: ${version2}`);
      }
      const numEntries = reader.readUInt32BE();
      let i = 0;
      while (!reader.eof() && i < numEntries) {
        const entry = {};
        entry.ctimeSeconds = reader.readUInt32BE();
        entry.ctimeNanoseconds = reader.readUInt32BE();
        entry.mtimeSeconds = reader.readUInt32BE();
        entry.mtimeNanoseconds = reader.readUInt32BE();
        entry.dev = reader.readUInt32BE();
        entry.ino = reader.readUInt32BE();
        entry.mode = reader.readUInt32BE();
        entry.uid = reader.readUInt32BE();
        entry.gid = reader.readUInt32BE();
        entry.size = reader.readUInt32BE();
        entry.oid = reader.slice(20).toString("hex");
        const flags = reader.readUInt16BE();
        entry.flags = parseCacheEntryFlags(flags);
        const pathlength = buffer.indexOf(0, reader.tell() + 1) - reader.tell();
        if (pathlength < 1) {
          throw new InternalError(`Got a path length of: ${pathlength}`);
        }
        entry.path = reader.toString("utf8", pathlength);
        if (entry.path.includes("..\\") || entry.path.includes("../")) {
          throw new UnsafeFilepathError(entry.path);
        }
        let padding = 8 - (reader.tell() - 12) % 8;
        if (padding === 0)
          padding = 8;
        while (padding--) {
          const tmp = reader.readUInt8();
          if (tmp !== 0) {
            throw new InternalError(`Expected 1-8 null characters but got '${tmp}' after ${entry.path}`);
          } else if (reader.eof()) {
            throw new InternalError("Unexpected end of file");
          }
        }
        entry.stages = [];
        index2._addEntry(entry);
        i++;
      }
      return index2;
    }
    get unmergedPaths() {
      return [...this._unmergedPaths];
    }
    get entries() {
      return [...this._entries.values()].sort(comparePath);
    }
    get entriesMap() {
      return this._entries;
    }
    get entriesFlat() {
      return [...this.entries].flatMap((entry) => {
        return entry.stages.length > 1 ? entry.stages.filter((x) => x) : entry;
      });
    }
    *[Symbol.iterator]() {
      for (const entry of this.entries) {
        yield entry;
      }
    }
    insert({ filepath, stats, oid, stage = 0 }) {
      if (!stats) {
        stats = {
          ctimeSeconds: 0,
          ctimeNanoseconds: 0,
          mtimeSeconds: 0,
          mtimeNanoseconds: 0,
          dev: 0,
          ino: 0,
          mode: 0,
          uid: 0,
          gid: 0,
          size: 0
        };
      }
      stats = normalizeStats(stats);
      const bfilepath = Buffer.from(filepath);
      const entry = {
        ctimeSeconds: stats.ctimeSeconds,
        ctimeNanoseconds: stats.ctimeNanoseconds,
        mtimeSeconds: stats.mtimeSeconds,
        mtimeNanoseconds: stats.mtimeNanoseconds,
        dev: stats.dev,
        ino: stats.ino,
        mode: stats.mode || 33188,
        uid: stats.uid,
        gid: stats.gid,
        size: stats.size,
        path: filepath,
        oid,
        flags: {
          assumeValid: false,
          extended: false,
          stage,
          nameLength: bfilepath.length < 4095 ? bfilepath.length : 4095
        },
        stages: []
      };
      this._addEntry(entry);
      this._dirty = true;
    }
    delete({ filepath }) {
      if (this._entries.has(filepath)) {
        this._entries.delete(filepath);
      } else {
        for (const key of this._entries.keys()) {
          if (key.startsWith(filepath + "/")) {
            this._entries.delete(key);
          }
        }
      }
      if (this._unmergedPaths.has(filepath)) {
        this._unmergedPaths.delete(filepath);
      }
      this._dirty = true;
    }
    clear() {
      this._entries.clear();
      this._dirty = true;
    }
    has({ filepath }) {
      return this._entries.has(filepath);
    }
    render() {
      return this.entries.map((entry) => `${entry.mode.toString(8)} ${entry.oid}    ${entry.path}`).join(`
`);
    }
    static async _entryToBuffer(entry) {
      const bpath = Buffer.from(entry.path);
      const length = Math.ceil((62 + bpath.length + 1) / 8) * 8;
      const written = Buffer.alloc(length);
      const writer = new BufferCursor(written);
      const stat = normalizeStats(entry);
      writer.writeUInt32BE(stat.ctimeSeconds);
      writer.writeUInt32BE(stat.ctimeNanoseconds);
      writer.writeUInt32BE(stat.mtimeSeconds);
      writer.writeUInt32BE(stat.mtimeNanoseconds);
      writer.writeUInt32BE(stat.dev);
      writer.writeUInt32BE(stat.ino);
      writer.writeUInt32BE(stat.mode);
      writer.writeUInt32BE(stat.uid);
      writer.writeUInt32BE(stat.gid);
      writer.writeUInt32BE(stat.size);
      writer.write(entry.oid, 20, "hex");
      writer.writeUInt16BE(renderCacheEntryFlags(entry));
      writer.write(entry.path, bpath.length, "utf8");
      return written;
    }
    async toObject() {
      const header = Buffer.alloc(12);
      const writer = new BufferCursor(header);
      writer.write("DIRC", 4, "utf8");
      writer.writeUInt32BE(2);
      writer.writeUInt32BE(this.entriesFlat.length);
      let entryBuffers = [];
      for (const entry of this.entries) {
        entryBuffers.push(GitIndex._entryToBuffer(entry));
        if (entry.stages.length > 1) {
          for (const stage of entry.stages) {
            if (stage && stage !== entry) {
              entryBuffers.push(GitIndex._entryToBuffer(stage));
            }
          }
        }
      }
      entryBuffers = await Promise.all(entryBuffers);
      const body = Buffer.concat(entryBuffers);
      const main = Buffer.concat([header, body]);
      const sum = await shasum(main);
      return Buffer.concat([main, Buffer.from(sum, "hex")]);
    }
  }
  function compareStats(entry, stats, filemode = true, trustino = true) {
    const e = normalizeStats(entry);
    const s = normalizeStats(stats);
    const staleness = filemode && e.mode !== s.mode || e.mtimeSeconds !== s.mtimeSeconds || e.ctimeSeconds !== s.ctimeSeconds || e.uid !== s.uid || e.gid !== s.gid || trustino && e.ino !== s.ino || e.size !== s.size;
    return staleness;
  }
  var lock = null;
  var IndexCache = Symbol("IndexCache");
  function createCache() {
    return {
      map: new Map,
      stats: new Map
    };
  }
  async function updateCachedIndexFile(fs, filepath, cache) {
    const [stat, rawIndexFile] = await Promise.all([
      fs.lstat(filepath),
      fs.read(filepath)
    ]);
    const index2 = await GitIndex.from(rawIndexFile);
    cache.map.set(filepath, index2);
    cache.stats.set(filepath, stat);
  }
  async function isIndexStale(fs, filepath, cache) {
    const savedStats = cache.stats.get(filepath);
    if (savedStats === undefined)
      return true;
    if (savedStats === null)
      return false;
    const currStats = await fs.lstat(filepath);
    if (currStats === null)
      return false;
    return compareStats(savedStats, currStats);
  }

  class GitIndexManager {
    static async acquire({ fs, gitdir, cache, allowUnmerged = true }, closure) {
      if (!cache[IndexCache]) {
        cache[IndexCache] = createCache();
      }
      const filepath = `${gitdir}/index`;
      if (lock === null)
        lock = new AsyncLock({ maxPending: Infinity });
      let result;
      let unmergedPaths = [];
      await lock.acquire(filepath, async () => {
        const theIndexCache = cache[IndexCache];
        if (await isIndexStale(fs, filepath, theIndexCache)) {
          await updateCachedIndexFile(fs, filepath, theIndexCache);
        }
        const index2 = theIndexCache.map.get(filepath);
        unmergedPaths = index2.unmergedPaths;
        if (unmergedPaths.length && !allowUnmerged)
          throw new UnmergedPathsError(unmergedPaths);
        result = await closure(index2);
        if (index2._dirty) {
          const buffer = await index2.toObject();
          await fs.write(filepath, buffer);
          theIndexCache.stats.set(filepath, await fs.lstat(filepath));
          index2._dirty = false;
        }
      });
      return result;
    }
  }
  function basename(path) {
    const last = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
    if (last > -1) {
      path = path.slice(last + 1);
    }
    return path;
  }
  function dirname(path) {
    const last = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
    if (last === -1)
      return ".";
    if (last === 0)
      return "/";
    return path.slice(0, last);
  }
  function flatFileListToDirectoryStructure(files) {
    const inodes = new Map;
    const mkdir = function(name) {
      if (!inodes.has(name)) {
        const dir = {
          type: "tree",
          fullpath: name,
          basename: basename(name),
          metadata: {},
          children: []
        };
        inodes.set(name, dir);
        dir.parent = mkdir(dirname(name));
        if (dir.parent && dir.parent !== dir)
          dir.parent.children.push(dir);
      }
      return inodes.get(name);
    };
    const mkfile = function(name, metadata) {
      if (!inodes.has(name)) {
        const file = {
          type: "blob",
          fullpath: name,
          basename: basename(name),
          metadata,
          parent: mkdir(dirname(name)),
          children: []
        };
        if (file.parent)
          file.parent.children.push(file);
        inodes.set(name, file);
      }
      return inodes.get(name);
    };
    mkdir(".");
    for (const file of files) {
      mkfile(file.path, file);
    }
    return inodes;
  }
  function mode2type(mode) {
    switch (mode) {
      case 16384:
        return "tree";
      case 33188:
        return "blob";
      case 33261:
        return "blob";
      case 40960:
        return "blob";
      case 57344:
        return "commit";
    }
    throw new InternalError(`Unexpected GitTree entry mode: ${mode.toString(8)}`);
  }

  class GitWalkerIndex {
    constructor({ fs, gitdir, cache }) {
      this.treePromise = GitIndexManager.acquire({ fs, gitdir, cache }, async function(index2) {
        return flatFileListToDirectoryStructure(index2.entries);
      });
      const walker = this;
      this.ConstructEntry = class StageEntry {
        constructor(fullpath) {
          this._fullpath = fullpath;
          this._type = false;
          this._mode = false;
          this._stat = false;
          this._oid = false;
        }
        async type() {
          return walker.type(this);
        }
        async mode() {
          return walker.mode(this);
        }
        async stat() {
          return walker.stat(this);
        }
        async content() {
          return walker.content(this);
        }
        async oid() {
          return walker.oid(this);
        }
      };
    }
    async readdir(entry) {
      const filepath = entry._fullpath;
      const tree = await this.treePromise;
      const inode = tree.get(filepath);
      if (!inode)
        return null;
      if (inode.type === "blob")
        return null;
      if (inode.type !== "tree") {
        throw new Error(`ENOTDIR: not a directory, scandir '${filepath}'`);
      }
      const names = inode.children.map((inode2) => inode2.fullpath);
      names.sort(compareStrings);
      return names;
    }
    async type(entry) {
      if (entry._type === false) {
        await entry.stat();
      }
      return entry._type;
    }
    async mode(entry) {
      if (entry._mode === false) {
        await entry.stat();
      }
      return entry._mode;
    }
    async stat(entry) {
      if (entry._stat === false) {
        const tree = await this.treePromise;
        const inode = tree.get(entry._fullpath);
        if (!inode) {
          throw new Error(`ENOENT: no such file or directory, lstat '${entry._fullpath}'`);
        }
        const stats = inode.type === "tree" ? {} : normalizeStats(inode.metadata);
        entry._type = inode.type === "tree" ? "tree" : mode2type(stats.mode);
        entry._mode = stats.mode;
        if (inode.type === "tree") {
          entry._stat = undefined;
        } else {
          entry._stat = stats;
        }
      }
      return entry._stat;
    }
    async content(_entry) {}
    async oid(entry) {
      if (entry._oid === false) {
        const tree = await this.treePromise;
        const inode = tree.get(entry._fullpath);
        entry._oid = inode.metadata.oid;
      }
      return entry._oid;
    }
  }
  var GitWalkSymbol = Symbol("GitWalkSymbol");
  function STAGE() {
    const o = Object.create(null);
    Object.defineProperty(o, GitWalkSymbol, {
      value: function({ fs, gitdir, cache }) {
        return new GitWalkerIndex({ fs, gitdir, cache });
      }
    });
    Object.freeze(o);
    return o;
  }

  class NotFoundError extends BaseError {
    constructor(what) {
      super(`Could not find ${what}.`);
      this.code = this.name = NotFoundError.code;
      this.data = { what };
    }
  }
  NotFoundError.code = "NotFoundError";

  class ObjectTypeError extends BaseError {
    constructor(oid, actual, expected, filepath) {
      super(`Object ${oid} ${filepath ? `at ${filepath}` : ""}was anticipated to be a ${expected} but it is a ${actual}.`);
      this.code = this.name = ObjectTypeError.code;
      this.data = { oid, actual, expected, filepath };
    }
  }
  ObjectTypeError.code = "ObjectTypeError";

  class InvalidOidError extends BaseError {
    constructor(value) {
      super(`Expected a 40-char hex object id but saw "${value}".`);
      this.code = this.name = InvalidOidError.code;
      this.data = { value };
    }
  }
  InvalidOidError.code = "InvalidOidError";

  class NoRefspecError extends BaseError {
    constructor(remote) {
      super(`Could not find a fetch refspec for remote "${remote}". Make sure the config file has an entry like the following:
[remote "${remote}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`);
      this.code = this.name = NoRefspecError.code;
      this.data = { remote };
    }
  }
  NoRefspecError.code = "NoRefspecError";

  class GitPackedRefs {
    constructor(text) {
      this.refs = new Map;
      this.parsedConfig = [];
      if (text) {
        let key = null;
        this.parsedConfig = text.trim().split(`
`).map((line) => {
          if (/^\s*#/.test(line)) {
            return { line, comment: true };
          }
          const i = line.indexOf(" ");
          if (line.startsWith("^")) {
            const value = line.slice(1);
            this.refs.set(key + "^{}", value);
            return { line, ref: key, peeled: value };
          } else {
            const value = line.slice(0, i);
            key = line.slice(i + 1);
            this.refs.set(key, value);
            return { line, ref: key, oid: value };
          }
        });
      }
      return this;
    }
    static from(text) {
      return new GitPackedRefs(text);
    }
    delete(ref) {
      this.parsedConfig = this.parsedConfig.filter((entry) => entry.ref !== ref);
      this.refs.delete(ref);
    }
    toString() {
      return this.parsedConfig.map(({ line }) => line).join(`
`) + `
`;
    }
  }

  class GitRefSpec {
    constructor({ remotePath, localPath, force, matchPrefix }) {
      Object.assign(this, {
        remotePath,
        localPath,
        force,
        matchPrefix
      });
    }
    static from(refspec) {
      const [forceMatch, remotePath, remoteGlobMatch, localPath, localGlobMatch] = refspec.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1);
      const force = forceMatch === "+";
      const remoteIsGlob = remoteGlobMatch === "*";
      const localIsGlob = localGlobMatch === "*";
      if (remoteIsGlob !== localIsGlob) {
        throw new InternalError("Invalid refspec");
      }
      return new GitRefSpec({
        remotePath,
        localPath,
        force,
        matchPrefix: remoteIsGlob
      });
    }
    translate(remoteBranch) {
      if (this.matchPrefix) {
        if (remoteBranch.startsWith(this.remotePath)) {
          return this.localPath + remoteBranch.replace(this.remotePath, "");
        }
      } else {
        if (remoteBranch === this.remotePath)
          return this.localPath;
      }
      return null;
    }
    reverseTranslate(localBranch) {
      if (this.matchPrefix) {
        if (localBranch.startsWith(this.localPath)) {
          return this.remotePath + localBranch.replace(this.localPath, "");
        }
      } else {
        if (localBranch === this.localPath)
          return this.remotePath;
      }
      return null;
    }
  }

  class GitRefSpecSet {
    constructor(rules = []) {
      this.rules = rules;
    }
    static from(refspecs) {
      const rules = [];
      for (const refspec of refspecs) {
        rules.push(GitRefSpec.from(refspec));
      }
      return new GitRefSpecSet(rules);
    }
    add(refspec) {
      const rule = GitRefSpec.from(refspec);
      this.rules.push(rule);
    }
    translate(remoteRefs) {
      const result = [];
      for (const rule of this.rules) {
        for (const remoteRef of remoteRefs) {
          const localRef = rule.translate(remoteRef);
          if (localRef) {
            result.push([remoteRef, localRef]);
          }
        }
      }
      return result;
    }
    translateOne(remoteRef) {
      let result = null;
      for (const rule of this.rules) {
        const localRef = rule.translate(remoteRef);
        if (localRef) {
          result = localRef;
        }
      }
      return result;
    }
    localNamespaces() {
      return this.rules.filter((rule) => rule.matchPrefix).map((rule) => rule.localPath.replace(/\/$/, ""));
    }
  }
  function compareRefNames(a, b) {
    const _a = a.replace(/\^\{\}$/, "");
    const _b = b.replace(/\^\{\}$/, "");
    const tmp = -(_a < _b) || +(_a > _b);
    if (tmp === 0) {
      return a.endsWith("^{}") ? 1 : -1;
    }
    return tmp;
  }
  /*!
   * This code for `path.join` is directly copied from @zenfs/core/path for bundle size improvements.
   * SPDX-License-Identifier: LGPL-3.0-or-later
   * Copyright (c) James Prevett and other ZenFS contributors.
   */
  function normalizeString(path, aar) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let char = "\x00";
    for (let i = 0;i <= path.length; ++i) {
      if (i < path.length)
        char = path[i];
      else if (char === "/")
        break;
      else
        char = "/";
      if (char === "/") {
        if (lastSlash === i - 1 || dots === 1) {} else if (dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.at(-1) !== "." || res.at(-2) !== ".") {
            if (res.length > 2) {
              const lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            } else if (res.length !== 0) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (aar) {
            res += res.length > 0 ? "/.." : "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0)
            res += "/" + path.slice(lastSlash + 1, i);
          else
            res = path.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (char === "." && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function normalize(path) {
    if (!path.length)
      return ".";
    const isAbsolute2 = path[0] === "/";
    const trailingSeparator = path.at(-1) === "/";
    path = normalizeString(path, !isAbsolute2);
    if (!path.length) {
      if (isAbsolute2)
        return "/";
      return trailingSeparator ? "./" : ".";
    }
    if (trailingSeparator)
      path += "/";
    return isAbsolute2 ? `/${path}` : path;
  }
  function join(...args) {
    if (args.length === 0)
      return ".";
    let joined;
    for (let i = 0;i < args.length; ++i) {
      const arg = args[i];
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += "/" + arg;
      }
    }
    if (joined === undefined)
      return ".";
    return normalize(joined);
  }
  var num = (val) => {
    if (typeof val === "number") {
      return val;
    }
    val = val.toLowerCase();
    let n = parseInt(val);
    if (val.endsWith("k"))
      n *= 1024;
    if (val.endsWith("m"))
      n *= 1024 * 1024;
    if (val.endsWith("g"))
      n *= 1024 * 1024 * 1024;
    return n;
  };
  var bool = (val) => {
    if (typeof val === "boolean") {
      return val;
    }
    val = val.trim().toLowerCase();
    if (val === "true" || val === "yes" || val === "on")
      return true;
    if (val === "false" || val === "no" || val === "off")
      return false;
    throw Error(`Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${val}`);
  };
  var schema = {
    core: {
      filemode: bool,
      bare: bool,
      logallrefupdates: bool,
      symlinks: bool,
      ignorecase: bool,
      bigFileThreshold: num
    }
  };
  var SECTION_LINE_REGEX = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/;
  var SECTION_REGEX = /^[A-Za-z0-9-.]+$/;
  var VARIABLE_LINE_REGEX = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/;
  var VARIABLE_NAME_REGEX = /^[A-Za-z][A-Za-z-]*$/;
  var VARIABLE_VALUE_COMMENT_REGEX = /^(.*?)( *[#;].*)$/;
  var extractSectionLine = (line) => {
    const matches = SECTION_LINE_REGEX.exec(line);
    if (matches != null) {
      const [section, subsection] = matches.slice(1);
      return [section, subsection];
    }
    return null;
  };
  var extractVariableLine = (line) => {
    const matches = VARIABLE_LINE_REGEX.exec(line);
    if (matches != null) {
      const [name, rawValue = "true"] = matches.slice(1);
      const valueWithoutComments = removeComments(rawValue);
      const valueWithoutQuotes = removeQuotes(valueWithoutComments);
      return [name, valueWithoutQuotes];
    }
    return null;
  };
  var removeComments = (rawValue) => {
    const commentMatches = VARIABLE_VALUE_COMMENT_REGEX.exec(rawValue);
    if (commentMatches == null) {
      return rawValue;
    }
    const [valueWithoutComment, comment] = commentMatches.slice(1);
    if (hasOddNumberOfQuotes(valueWithoutComment) && hasOddNumberOfQuotes(comment)) {
      return `${valueWithoutComment}${comment}`;
    }
    return valueWithoutComment;
  };
  var hasOddNumberOfQuotes = (text) => {
    const numberOfQuotes = (text.match(/(?:^|[^\\])"/g) || []).length;
    return numberOfQuotes % 2 !== 0;
  };
  var removeQuotes = (text) => {
    return text.split("").reduce((newText, c, idx, text2) => {
      const isQuote = c === '"' && text2[idx - 1] !== "\\";
      const isEscapeForQuote = c === "\\" && text2[idx + 1] === '"';
      if (isQuote || isEscapeForQuote) {
        return newText;
      }
      return newText + c;
    }, "");
  };
  var lower = (text) => {
    return text != null ? text.toLowerCase() : null;
  };
  var getPath = (section, subsection, name) => {
    return [lower(section), subsection, lower(name)].filter((a) => a != null).join(".");
  };
  var normalizePath = (path) => {
    const pathSegments = path.split(".");
    const section = pathSegments.shift();
    const name = pathSegments.pop();
    const subsection = pathSegments.length ? pathSegments.join(".") : undefined;
    return {
      section,
      subsection,
      name,
      path: getPath(section, subsection, name),
      sectionPath: getPath(section, subsection, null),
      isSection: !!section
    };
  };
  var findLastIndex = (array, callback) => {
    return array.reduce((lastIndex, item, index2) => {
      return callback(item) ? index2 : lastIndex;
    }, -1);
  };

  class GitConfig {
    constructor(text) {
      let section = null;
      let subsection = null;
      this.parsedConfig = text ? text.split(`
`).map((line) => {
        let name = null;
        let value = null;
        const trimmedLine = line.trim();
        const extractedSection = extractSectionLine(trimmedLine);
        const isSection = extractedSection != null;
        if (isSection) {
          [section, subsection] = extractedSection;
        } else {
          const extractedVariable = extractVariableLine(trimmedLine);
          const isVariable = extractedVariable != null;
          if (isVariable) {
            [name, value] = extractedVariable;
          }
        }
        const path = getPath(section, subsection, name);
        return { line, isSection, section, subsection, name, value, path };
      }) : [];
    }
    static from(text) {
      return new GitConfig(text);
    }
    async get(path, getall = false) {
      const normalizedPath = normalizePath(path).path;
      const allValues = this.parsedConfig.filter((config2) => config2.path === normalizedPath).map(({ section, name, value }) => {
        const fn = schema[section] && schema[section][name];
        return fn ? fn(value) : value;
      });
      return getall ? allValues : allValues.pop();
    }
    async getall(path) {
      return this.get(path, true);
    }
    async getSubsections(section) {
      return this.parsedConfig.filter((config2) => config2.isSection && config2.section === section).map((config2) => config2.subsection);
    }
    async deleteSection(section, subsection) {
      this.parsedConfig = this.parsedConfig.filter((config2) => !(config2.section === section && config2.subsection === subsection));
    }
    async append(path, value) {
      return this.set(path, value, true);
    }
    async set(path, value, append = false) {
      const {
        section,
        subsection,
        name,
        path: normalizedPath,
        sectionPath,
        isSection
      } = normalizePath(path);
      const configIndex = findLastIndex(this.parsedConfig, (config2) => config2.path === normalizedPath);
      if (value == null) {
        if (configIndex !== -1) {
          this.parsedConfig.splice(configIndex, 1);
        }
      } else {
        if (configIndex !== -1) {
          const config2 = this.parsedConfig[configIndex];
          const modifiedConfig = Object.assign({}, config2, {
            name,
            value,
            modified: true
          });
          if (append) {
            this.parsedConfig.splice(configIndex + 1, 0, modifiedConfig);
          } else {
            this.parsedConfig[configIndex] = modifiedConfig;
          }
        } else {
          const sectionIndex = this.parsedConfig.findIndex((config2) => config2.path === sectionPath);
          const newConfig = {
            section,
            subsection,
            name,
            value,
            modified: true,
            path: normalizedPath
          };
          if (SECTION_REGEX.test(section) && VARIABLE_NAME_REGEX.test(name)) {
            if (sectionIndex >= 0) {
              this.parsedConfig.splice(sectionIndex + 1, 0, newConfig);
            } else {
              const newSection = {
                isSection,
                section,
                subsection,
                modified: true,
                path: sectionPath
              };
              this.parsedConfig.push(newSection, newConfig);
            }
          }
        }
      }
    }
    toString() {
      return this.parsedConfig.map(({ line, section, subsection, name, value, modified: modified2 = false }) => {
        if (!modified2) {
          return line;
        }
        if (name != null && value != null) {
          if (typeof value === "string" && /[#;]/.test(value)) {
            return `	${name} = "${value}"`;
          }
          return `	${name} = ${value}`;
        }
        if (subsection != null) {
          return `[${section} "${subsection}"]`;
        }
        return `[${section}]`;
      }).join(`
`);
    }
  }

  class GitConfigManager {
    static async get({ fs, gitdir }) {
      const text = await fs.read(`${gitdir}/config`, { encoding: "utf8" });
      return GitConfig.from(text);
    }
    static async save({ fs, gitdir, config: config2 }) {
      await fs.write(`${gitdir}/config`, config2.toString(), {
        encoding: "utf8"
      });
    }
  }
  var refpaths = (ref) => [
    `${ref}`,
    `refs/${ref}`,
    `refs/tags/${ref}`,
    `refs/heads/${ref}`,
    `refs/remotes/${ref}`,
    `refs/remotes/${ref}/HEAD`
  ];
  var GIT_FILES = ["config", "description", "index", "shallow", "commondir"];
  var lock$1;
  async function acquireLock(ref, callback) {
    if (lock$1 === undefined)
      lock$1 = new AsyncLock;
    return lock$1.acquire(ref, callback);
  }

  class GitRefManager {
    static async updateRemoteRefs({
      fs,
      gitdir,
      remote,
      refs,
      symrefs,
      tags,
      refspecs = undefined,
      prune = false,
      pruneTags = false
    }) {
      for (const value of refs.values()) {
        if (!value.match(/[0-9a-f]{40}/)) {
          throw new InvalidOidError(value);
        }
      }
      const config2 = await GitConfigManager.get({ fs, gitdir });
      if (!refspecs) {
        refspecs = await config2.getall(`remote.${remote}.fetch`);
        if (refspecs.length === 0) {
          throw new NoRefspecError(remote);
        }
        refspecs.unshift(`+HEAD:refs/remotes/${remote}/HEAD`);
      }
      const refspec = GitRefSpecSet.from(refspecs);
      const actualRefsToWrite = new Map;
      if (pruneTags) {
        const tags2 = await GitRefManager.listRefs({
          fs,
          gitdir,
          filepath: "refs/tags"
        });
        await GitRefManager.deleteRefs({
          fs,
          gitdir,
          refs: tags2.map((tag2) => `refs/tags/${tag2}`)
        });
      }
      if (tags) {
        for (const serverRef of refs.keys()) {
          if (serverRef.startsWith("refs/tags") && !serverRef.endsWith("^{}")) {
            if (!await GitRefManager.exists({ fs, gitdir, ref: serverRef })) {
              const oid = refs.get(serverRef);
              actualRefsToWrite.set(serverRef, oid);
            }
          }
        }
      }
      const refTranslations = refspec.translate([...refs.keys()]);
      for (const [serverRef, translatedRef] of refTranslations) {
        const value = refs.get(serverRef);
        actualRefsToWrite.set(translatedRef, value);
      }
      const symrefTranslations = refspec.translate([...symrefs.keys()]);
      for (const [serverRef, translatedRef] of symrefTranslations) {
        const value = symrefs.get(serverRef);
        const symtarget = refspec.translateOne(value);
        if (symtarget) {
          actualRefsToWrite.set(translatedRef, `ref: ${symtarget}`);
        }
      }
      const pruned = [];
      if (prune) {
        for (const filepath of refspec.localNamespaces()) {
          const refs2 = (await GitRefManager.listRefs({
            fs,
            gitdir,
            filepath
          })).map((file) => `${filepath}/${file}`);
          for (const ref of refs2) {
            if (!actualRefsToWrite.has(ref)) {
              pruned.push(ref);
            }
          }
        }
        if (pruned.length > 0) {
          await GitRefManager.deleteRefs({ fs, gitdir, refs: pruned });
        }
      }
      for (const [key, value] of actualRefsToWrite) {
        await acquireLock(key, async () => fs.write(join(gitdir, key), `${value.trim()}
`, "utf8"));
      }
      return { pruned };
    }
    static async writeRef({ fs, gitdir, ref, value }) {
      if (!value.match(/[0-9a-f]{40}/)) {
        throw new InvalidOidError(value);
      }
      await acquireLock(ref, async () => fs.write(join(gitdir, ref), `${value.trim()}
`, "utf8"));
    }
    static async writeSymbolicRef({ fs, gitdir, ref, value }) {
      await acquireLock(ref, async () => fs.write(join(gitdir, ref), "ref: " + `${value.trim()}
`, "utf8"));
    }
    static async deleteRef({ fs, gitdir, ref }) {
      return GitRefManager.deleteRefs({ fs, gitdir, refs: [ref] });
    }
    static async deleteRefs({ fs, gitdir, refs }) {
      await Promise.all(refs.map((ref) => fs.rm(join(gitdir, ref))));
      let text = await acquireLock("packed-refs", async () => fs.read(`${gitdir}/packed-refs`, { encoding: "utf8" }));
      const packed = GitPackedRefs.from(text);
      const beforeSize = packed.refs.size;
      for (const ref of refs) {
        if (packed.refs.has(ref)) {
          packed.delete(ref);
        }
      }
      if (packed.refs.size < beforeSize) {
        text = packed.toString();
        await acquireLock("packed-refs", async () => fs.write(`${gitdir}/packed-refs`, text, { encoding: "utf8" }));
      }
    }
    static async resolve({ fs, gitdir, ref, depth = undefined }) {
      if (depth !== undefined) {
        depth--;
        if (depth === -1) {
          return ref;
        }
      }
      if (ref.startsWith("ref: ")) {
        ref = ref.slice("ref: ".length);
        return GitRefManager.resolve({ fs, gitdir, ref, depth });
      }
      if (ref.length === 40 && /[0-9a-f]{40}/.test(ref)) {
        return ref;
      }
      const packedMap = await GitRefManager.packedRefs({ fs, gitdir });
      const allpaths = refpaths(ref).filter((p) => !GIT_FILES.includes(p));
      for (const ref2 of allpaths) {
        const sha = await acquireLock(ref2, async () => await fs.read(`${gitdir}/${ref2}`, { encoding: "utf8" }) || packedMap.get(ref2));
        if (sha) {
          return GitRefManager.resolve({ fs, gitdir, ref: sha.trim(), depth });
        }
      }
      throw new NotFoundError(ref);
    }
    static async exists({ fs, gitdir, ref }) {
      try {
        await GitRefManager.expand({ fs, gitdir, ref });
        return true;
      } catch (err) {
        return false;
      }
    }
    static async expand({ fs, gitdir, ref }) {
      if (ref.length === 40 && /[0-9a-f]{40}/.test(ref)) {
        return ref;
      }
      const packedMap = await GitRefManager.packedRefs({ fs, gitdir });
      const allpaths = refpaths(ref);
      for (const ref2 of allpaths) {
        const refExists = await acquireLock(ref2, async () => fs.exists(`${gitdir}/${ref2}`));
        if (refExists)
          return ref2;
        if (packedMap.has(ref2))
          return ref2;
      }
      throw new NotFoundError(ref);
    }
    static async expandAgainstMap({ ref, map }) {
      const allpaths = refpaths(ref);
      for (const ref2 of allpaths) {
        if (await map.has(ref2))
          return ref2;
      }
      throw new NotFoundError(ref);
    }
    static resolveAgainstMap({ ref, fullref = ref, depth = undefined, map }) {
      if (depth !== undefined) {
        depth--;
        if (depth === -1) {
          return { fullref, oid: ref };
        }
      }
      if (ref.startsWith("ref: ")) {
        ref = ref.slice("ref: ".length);
        return GitRefManager.resolveAgainstMap({ ref, fullref, depth, map });
      }
      if (ref.length === 40 && /[0-9a-f]{40}/.test(ref)) {
        return { fullref, oid: ref };
      }
      const allpaths = refpaths(ref);
      for (const ref2 of allpaths) {
        const sha = map.get(ref2);
        if (sha) {
          return GitRefManager.resolveAgainstMap({
            ref: sha.trim(),
            fullref: ref2,
            depth,
            map
          });
        }
      }
      throw new NotFoundError(ref);
    }
    static async packedRefs({ fs, gitdir }) {
      const text = await acquireLock("packed-refs", async () => fs.read(`${gitdir}/packed-refs`, { encoding: "utf8" }));
      const packed = GitPackedRefs.from(text);
      return packed.refs;
    }
    static async listRefs({ fs, gitdir, filepath }) {
      const packedMap = GitRefManager.packedRefs({ fs, gitdir });
      let files = null;
      try {
        files = await fs.readdirDeep(`${gitdir}/${filepath}`);
        files = files.map((x) => x.replace(`${gitdir}/${filepath}/`, ""));
      } catch (err) {
        files = [];
      }
      for (let key of (await packedMap).keys()) {
        if (key.startsWith(filepath)) {
          key = key.replace(filepath + "/", "");
          if (!files.includes(key)) {
            files.push(key);
          }
        }
      }
      files.sort(compareRefNames);
      return files;
    }
    static async listBranches({ fs, gitdir, remote }) {
      if (remote) {
        return GitRefManager.listRefs({
          fs,
          gitdir,
          filepath: `refs/remotes/${remote}`
        });
      } else {
        return GitRefManager.listRefs({ fs, gitdir, filepath: `refs/heads` });
      }
    }
    static async listTags({ fs, gitdir }) {
      const tags = await GitRefManager.listRefs({
        fs,
        gitdir,
        filepath: `refs/tags`
      });
      return tags.filter((x) => !x.endsWith("^{}"));
    }
  }
  function compareTreeEntryPath(a, b) {
    return compareStrings(appendSlashIfDir(a), appendSlashIfDir(b));
  }
  function appendSlashIfDir(entry) {
    return entry.mode === "040000" ? entry.path + "/" : entry.path;
  }
  function mode2type$1(mode) {
    switch (mode) {
      case "040000":
        return "tree";
      case "100644":
        return "blob";
      case "100755":
        return "blob";
      case "120000":
        return "blob";
      case "160000":
        return "commit";
    }
    throw new InternalError(`Unexpected GitTree entry mode: ${mode}`);
  }
  function parseBuffer(buffer) {
    const _entries = [];
    let cursor2 = 0;
    while (cursor2 < buffer.length) {
      const space = buffer.indexOf(32, cursor2);
      if (space === -1) {
        throw new InternalError(`GitTree: Error parsing buffer at byte location ${cursor2}: Could not find the next space character.`);
      }
      const nullchar = buffer.indexOf(0, cursor2);
      if (nullchar === -1) {
        throw new InternalError(`GitTree: Error parsing buffer at byte location ${cursor2}: Could not find the next null character.`);
      }
      let mode = buffer.slice(cursor2, space).toString("utf8");
      if (mode === "40000")
        mode = "040000";
      const type = mode2type$1(mode);
      const path = buffer.slice(space + 1, nullchar).toString("utf8");
      if (path.includes("\\") || path.includes("/")) {
        throw new UnsafeFilepathError(path);
      }
      const oid = buffer.slice(nullchar + 1, nullchar + 21).toString("hex");
      cursor2 = nullchar + 21;
      _entries.push({ mode, path, oid, type });
    }
    return _entries;
  }
  function limitModeToAllowed(mode) {
    if (typeof mode === "number") {
      mode = mode.toString(8);
    }
    if (mode.match(/^0?4.*/))
      return "040000";
    if (mode.match(/^1006.*/))
      return "100644";
    if (mode.match(/^1007.*/))
      return "100755";
    if (mode.match(/^120.*/))
      return "120000";
    if (mode.match(/^160.*/))
      return "160000";
    throw new InternalError(`Could not understand file mode: ${mode}`);
  }
  function nudgeIntoShape(entry) {
    if (!entry.oid && entry.sha) {
      entry.oid = entry.sha;
    }
    entry.mode = limitModeToAllowed(entry.mode);
    if (!entry.type) {
      entry.type = mode2type$1(entry.mode);
    }
    return entry;
  }

  class GitTree {
    constructor(entries) {
      if (Buffer.isBuffer(entries)) {
        this._entries = parseBuffer(entries);
      } else if (Array.isArray(entries)) {
        this._entries = entries.map(nudgeIntoShape);
      } else {
        throw new InternalError("invalid type passed to GitTree constructor");
      }
      this._entries.sort(comparePath);
    }
    static from(tree) {
      return new GitTree(tree);
    }
    render() {
      return this._entries.map((entry) => `${entry.mode} ${entry.type} ${entry.oid}    ${entry.path}`).join(`
`);
    }
    toObject() {
      const entries = [...this._entries];
      entries.sort(compareTreeEntryPath);
      return Buffer.concat(entries.map((entry) => {
        const mode = Buffer.from(entry.mode.replace(/^0/, ""));
        const space = Buffer.from(" ");
        const path = Buffer.from(entry.path, "utf8");
        const nullchar = Buffer.from([0]);
        const oid = Buffer.from(entry.oid, "hex");
        return Buffer.concat([mode, space, path, nullchar, oid]);
      }));
    }
    entries() {
      return this._entries;
    }
    *[Symbol.iterator]() {
      for (const entry of this._entries) {
        yield entry;
      }
    }
  }

  class GitObject {
    static wrap({ type, object }) {
      const header = `${type} ${object.length}\x00`;
      const headerLen = header.length;
      const totalLength = headerLen + object.length;
      const wrappedObject = new Uint8Array(totalLength);
      for (let i = 0;i < headerLen; i++) {
        wrappedObject[i] = header.charCodeAt(i);
      }
      wrappedObject.set(object, headerLen);
      return wrappedObject;
    }
    static unwrap(buffer) {
      const s = buffer.indexOf(32);
      const i = buffer.indexOf(0);
      const type = buffer.slice(0, s).toString("utf8");
      const length = buffer.slice(s + 1, i).toString("utf8");
      const actualLength = buffer.length - (i + 1);
      if (parseInt(length) !== actualLength) {
        throw new InternalError(`Length mismatch: expected ${length} bytes but got ${actualLength} instead.`);
      }
      return {
        type,
        object: Buffer.from(buffer.slice(i + 1))
      };
    }
  }
  async function readObjectLoose({ fs, gitdir, oid }) {
    const source = `objects/${oid.slice(0, 2)}/${oid.slice(2)}`;
    const file = await fs.read(`${gitdir}/${source}`);
    if (!file) {
      return null;
    }
    return { object: file, format: "deflated", source };
  }
  function applyDelta(delta, source) {
    const reader = new BufferCursor(delta);
    const sourceSize = readVarIntLE(reader);
    if (sourceSize !== source.byteLength) {
      throw new InternalError(`applyDelta expected source buffer to be ${sourceSize} bytes but the provided buffer was ${source.length} bytes`);
    }
    const targetSize = readVarIntLE(reader);
    let target;
    const firstOp = readOp(reader, source);
    if (firstOp.byteLength === targetSize) {
      target = firstOp;
    } else {
      target = Buffer.alloc(targetSize);
      const writer = new BufferCursor(target);
      writer.copy(firstOp);
      while (!reader.eof()) {
        writer.copy(readOp(reader, source));
      }
      const tell = writer.tell();
      if (targetSize !== tell) {
        throw new InternalError(`applyDelta expected target buffer to be ${targetSize} bytes but the resulting buffer was ${tell} bytes`);
      }
    }
    return target;
  }
  function readVarIntLE(reader) {
    let result = 0;
    let shift = 0;
    let byte = null;
    do {
      byte = reader.readUInt8();
      result |= (byte & 127) << shift;
      shift += 7;
    } while (byte & 128);
    return result;
  }
  function readCompactLE(reader, flags, size) {
    let result = 0;
    let shift = 0;
    while (size--) {
      if (flags & 1) {
        result |= reader.readUInt8() << shift;
      }
      flags >>= 1;
      shift += 8;
    }
    return result;
  }
  function readOp(reader, source) {
    const byte = reader.readUInt8();
    const COPY = 128;
    const OFFS = 15;
    const SIZE = 112;
    if (byte & COPY) {
      const offset = readCompactLE(reader, byte & OFFS, 4);
      let size = readCompactLE(reader, (byte & SIZE) >> 4, 3);
      if (size === 0)
        size = 65536;
      return source.slice(offset, offset + size);
    } else {
      return reader.slice(byte);
    }
  }
  function fromValue(value) {
    let queue = [value];
    return {
      next() {
        return Promise.resolve({ done: queue.length === 0, value: queue.pop() });
      },
      return() {
        queue = [];
        return {};
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  function getIterator(iterable) {
    if (iterable[Symbol.asyncIterator]) {
      return iterable[Symbol.asyncIterator]();
    }
    if (iterable[Symbol.iterator]) {
      return iterable[Symbol.iterator]();
    }
    if (iterable.next) {
      return iterable;
    }
    return fromValue(iterable);
  }

  class StreamReader {
    constructor(stream) {
      if (typeof Buffer === "undefined") {
        throw new Error("Missing Buffer dependency");
      }
      this.stream = getIterator(stream);
      this.buffer = null;
      this.cursor = 0;
      this.undoCursor = 0;
      this.started = false;
      this._ended = false;
      this._discardedBytes = 0;
    }
    eof() {
      return this._ended && this.cursor === this.buffer.length;
    }
    tell() {
      return this._discardedBytes + this.cursor;
    }
    async byte() {
      if (this.eof())
        return;
      if (!this.started)
        await this._init();
      if (this.cursor === this.buffer.length) {
        await this._loadnext();
        if (this._ended)
          return;
      }
      this._moveCursor(1);
      return this.buffer[this.undoCursor];
    }
    async chunk() {
      if (this.eof())
        return;
      if (!this.started)
        await this._init();
      if (this.cursor === this.buffer.length) {
        await this._loadnext();
        if (this._ended)
          return;
      }
      this._moveCursor(this.buffer.length);
      return this.buffer.slice(this.undoCursor, this.cursor);
    }
    async read(n) {
      if (this.eof())
        return;
      if (!this.started)
        await this._init();
      if (this.cursor + n > this.buffer.length) {
        this._trim();
        await this._accumulate(n);
      }
      this._moveCursor(n);
      return this.buffer.slice(this.undoCursor, this.cursor);
    }
    async skip(n) {
      if (this.eof())
        return;
      if (!this.started)
        await this._init();
      if (this.cursor + n > this.buffer.length) {
        this._trim();
        await this._accumulate(n);
      }
      this._moveCursor(n);
    }
    async undo() {
      this.cursor = this.undoCursor;
    }
    async _next() {
      this.started = true;
      let { done, value } = await this.stream.next();
      if (done) {
        this._ended = true;
        if (!value)
          return Buffer.alloc(0);
      }
      if (value) {
        value = Buffer.from(value);
      }
      return value;
    }
    _trim() {
      this.buffer = this.buffer.slice(this.undoCursor);
      this.cursor -= this.undoCursor;
      this._discardedBytes += this.undoCursor;
      this.undoCursor = 0;
    }
    _moveCursor(n) {
      this.undoCursor = this.cursor;
      this.cursor += n;
      if (this.cursor > this.buffer.length) {
        this.cursor = this.buffer.length;
      }
    }
    async _accumulate(n) {
      if (this._ended)
        return;
      const buffers = [this.buffer];
      while (this.cursor + n > lengthBuffers(buffers)) {
        const nextbuffer = await this._next();
        if (this._ended)
          break;
        buffers.push(nextbuffer);
      }
      this.buffer = Buffer.concat(buffers);
    }
    async _loadnext() {
      this._discardedBytes += this.buffer.length;
      this.undoCursor = 0;
      this.cursor = 0;
      this.buffer = await this._next();
    }
    async _init() {
      this.buffer = await this._next();
    }
  }
  function lengthBuffers(buffers) {
    return buffers.reduce((acc, buffer) => acc + buffer.length, 0);
  }
  async function listpack(stream, onData) {
    const reader = new StreamReader(stream);
    let PACK = await reader.read(4);
    PACK = PACK.toString("utf8");
    if (PACK !== "PACK") {
      throw new InternalError(`Invalid PACK header '${PACK}'`);
    }
    let version2 = await reader.read(4);
    version2 = version2.readUInt32BE(0);
    if (version2 !== 2) {
      throw new InternalError(`Invalid packfile version: ${version2}`);
    }
    let numObjects = await reader.read(4);
    numObjects = numObjects.readUInt32BE(0);
    if (numObjects < 1)
      return;
    while (!reader.eof() && numObjects--) {
      const offset = reader.tell();
      const { type, length, ofs, reference } = await parseHeader(reader);
      const inflator = new pako.Inflate;
      while (!inflator.result) {
        const chunk = await reader.chunk();
        if (!chunk)
          break;
        inflator.push(chunk, false);
        if (inflator.err) {
          throw new InternalError(`Pako error: ${inflator.msg}`);
        }
        if (inflator.result) {
          if (inflator.result.length !== length) {
            throw new InternalError(`Inflated object size is different from that stated in packfile.`);
          }
          await reader.undo();
          await reader.read(chunk.length - inflator.strm.avail_in);
          const end = reader.tell();
          await onData({
            data: inflator.result,
            type,
            num: numObjects,
            offset,
            end,
            reference,
            ofs
          });
        }
      }
    }
  }
  async function parseHeader(reader) {
    let byte = await reader.byte();
    const type = byte >> 4 & 7;
    let length = byte & 15;
    if (byte & 128) {
      let shift = 4;
      do {
        byte = await reader.byte();
        length |= (byte & 127) << shift;
        shift += 7;
      } while (byte & 128);
    }
    let ofs;
    let reference;
    if (type === 6) {
      let shift = 0;
      ofs = 0;
      const bytes = [];
      do {
        byte = await reader.byte();
        ofs |= (byte & 127) << shift;
        shift += 7;
        bytes.push(byte);
      } while (byte & 128);
      reference = Buffer.from(bytes);
    }
    if (type === 7) {
      const buf = await reader.read(20);
      reference = buf;
    }
    return { type, length, ofs, reference };
  }
  var supportsDecompressionStream = false;
  async function inflate(buffer) {
    if (supportsDecompressionStream === null) {
      supportsDecompressionStream = testDecompressionStream();
    }
    return supportsDecompressionStream ? browserInflate(buffer) : pako.inflate(buffer);
  }
  async function browserInflate(buffer) {
    const ds = new DecompressionStream("deflate");
    const d = new Blob([buffer]).stream().pipeThrough(ds);
    return new Uint8Array(await new Response(d).arrayBuffer());
  }
  function testDecompressionStream() {
    try {
      const ds = new DecompressionStream("deflate");
      if (ds)
        return true;
    } catch (_) {}
    return false;
  }
  function decodeVarInt(reader) {
    const bytes = [];
    let byte = 0;
    let multibyte = 0;
    do {
      byte = reader.readUInt8();
      const lastSeven = byte & 127;
      bytes.push(lastSeven);
      multibyte = byte & 128;
    } while (multibyte);
    return bytes.reduce((a, b) => a + 1 << 7 | b, -1);
  }
  function otherVarIntDecode(reader, startWith) {
    let result = startWith;
    let shift = 4;
    let byte = null;
    do {
      byte = reader.readUInt8();
      result |= (byte & 127) << shift;
      shift += 7;
    } while (byte & 128);
    return result;
  }

  class GitPackIndex {
    constructor(stuff) {
      Object.assign(this, stuff);
      this.offsetCache = {};
    }
    static async fromIdx({ idx, getExternalRefDelta }) {
      const reader = new BufferCursor(idx);
      const magic = reader.slice(4).toString("hex");
      if (magic !== "ff744f63") {
        return;
      }
      const version2 = reader.readUInt32BE();
      if (version2 !== 2) {
        throw new InternalError(`Unable to read version ${version2} packfile IDX. (Only version 2 supported)`);
      }
      if (idx.byteLength > 2048 * 1024 * 1024) {
        throw new InternalError(`To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size.`);
      }
      reader.seek(reader.tell() + 4 * 255);
      const size = reader.readUInt32BE();
      const hashes = [];
      for (let i = 0;i < size; i++) {
        const hash = reader.slice(20).toString("hex");
        hashes[i] = hash;
      }
      reader.seek(reader.tell() + 4 * size);
      const offsets = new Map;
      for (let i = 0;i < size; i++) {
        offsets.set(hashes[i], reader.readUInt32BE());
      }
      const packfileSha = reader.slice(20).toString("hex");
      return new GitPackIndex({
        hashes,
        crcs: {},
        offsets,
        packfileSha,
        getExternalRefDelta
      });
    }
    static async fromPack({ pack, getExternalRefDelta, onProgress }) {
      const listpackTypes = {
        1: "commit",
        2: "tree",
        3: "blob",
        4: "tag",
        6: "ofs-delta",
        7: "ref-delta"
      };
      const offsetToObject = {};
      const packfileSha = pack.slice(-20).toString("hex");
      const hashes = [];
      const crcs = {};
      const offsets = new Map;
      let totalObjectCount = null;
      let lastPercent = null;
      await listpack([pack], async ({ data, type, reference, offset, num: num2 }) => {
        if (totalObjectCount === null)
          totalObjectCount = num2;
        const percent = Math.floor((totalObjectCount - num2) * 100 / totalObjectCount);
        if (percent !== lastPercent) {
          if (onProgress) {
            await onProgress({
              phase: "Receiving objects",
              loaded: totalObjectCount - num2,
              total: totalObjectCount
            });
          }
        }
        lastPercent = percent;
        type = listpackTypes[type];
        if (["commit", "tree", "blob", "tag"].includes(type)) {
          offsetToObject[offset] = {
            type,
            offset
          };
        } else if (type === "ofs-delta") {
          offsetToObject[offset] = {
            type,
            offset
          };
        } else if (type === "ref-delta") {
          offsetToObject[offset] = {
            type,
            offset
          };
        }
      });
      const offsetArray = Object.keys(offsetToObject).map(Number);
      for (const [i, start] of offsetArray.entries()) {
        const end = i + 1 === offsetArray.length ? pack.byteLength - 20 : offsetArray[i + 1];
        const o = offsetToObject[start];
        const crc = crc32.buf(pack.slice(start, end)) >>> 0;
        o.end = end;
        o.crc = crc;
      }
      const p = new GitPackIndex({
        pack: Promise.resolve(pack),
        packfileSha,
        crcs,
        hashes,
        offsets,
        getExternalRefDelta
      });
      lastPercent = null;
      let count = 0;
      const objectsByDepth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let offset in offsetToObject) {
        offset = Number(offset);
        const percent = Math.floor(count * 100 / totalObjectCount);
        if (percent !== lastPercent) {
          if (onProgress) {
            await onProgress({
              phase: "Resolving deltas",
              loaded: count,
              total: totalObjectCount
            });
          }
        }
        count++;
        lastPercent = percent;
        const o = offsetToObject[offset];
        if (o.oid)
          continue;
        try {
          p.readDepth = 0;
          p.externalReadDepth = 0;
          const { type, object } = await p.readSlice({ start: offset });
          objectsByDepth[p.readDepth] += 1;
          const oid = await shasum(GitObject.wrap({ type, object }));
          o.oid = oid;
          hashes.push(oid);
          offsets.set(oid, offset);
          crcs[oid] = o.crc;
        } catch (err) {
          continue;
        }
      }
      hashes.sort();
      return p;
    }
    async toBuffer() {
      const buffers = [];
      const write = (str, encoding) => {
        buffers.push(Buffer.from(str, encoding));
      };
      write("ff744f63", "hex");
      write("00000002", "hex");
      const fanoutBuffer = new BufferCursor(Buffer.alloc(256 * 4));
      for (let i = 0;i < 256; i++) {
        let count = 0;
        for (const hash of this.hashes) {
          if (parseInt(hash.slice(0, 2), 16) <= i)
            count++;
        }
        fanoutBuffer.writeUInt32BE(count);
      }
      buffers.push(fanoutBuffer.buffer);
      for (const hash of this.hashes) {
        write(hash, "hex");
      }
      const crcsBuffer = new BufferCursor(Buffer.alloc(this.hashes.length * 4));
      for (const hash of this.hashes) {
        crcsBuffer.writeUInt32BE(this.crcs[hash]);
      }
      buffers.push(crcsBuffer.buffer);
      const offsetsBuffer = new BufferCursor(Buffer.alloc(this.hashes.length * 4));
      for (const hash of this.hashes) {
        offsetsBuffer.writeUInt32BE(this.offsets.get(hash));
      }
      buffers.push(offsetsBuffer.buffer);
      write(this.packfileSha, "hex");
      const totalBuffer = Buffer.concat(buffers);
      const sha = await shasum(totalBuffer);
      const shaBuffer = Buffer.alloc(20);
      shaBuffer.write(sha, "hex");
      return Buffer.concat([totalBuffer, shaBuffer]);
    }
    async load({ pack }) {
      this.pack = pack;
    }
    async unload() {
      this.pack = null;
    }
    async read({ oid }) {
      if (!this.offsets.get(oid)) {
        if (this.getExternalRefDelta) {
          this.externalReadDepth++;
          return this.getExternalRefDelta(oid);
        } else {
          throw new InternalError(`Could not read object ${oid} from packfile`);
        }
      }
      const start = this.offsets.get(oid);
      return this.readSlice({ start });
    }
    async readSlice({ start }) {
      if (this.offsetCache[start]) {
        return Object.assign({}, this.offsetCache[start]);
      }
      this.readDepth++;
      const types2 = {
        16: "commit",
        32: "tree",
        48: "blob",
        64: "tag",
        96: "ofs_delta",
        112: "ref_delta"
      };
      const pack = await this.pack;
      if (!pack) {
        throw new InternalError("Could not read packfile data. The packfile may be missing, corrupted, or too large to read into memory.");
      }
      const raw = pack.slice(start);
      const reader = new BufferCursor(raw);
      const byte = reader.readUInt8();
      const btype = byte & 112;
      let type = types2[btype];
      if (type === undefined) {
        throw new InternalError("Unrecognized type: 0b" + btype.toString(2));
      }
      const lastFour = byte & 15;
      let length = lastFour;
      const multibyte = byte & 128;
      if (multibyte) {
        length = otherVarIntDecode(reader, lastFour);
      }
      let base = null;
      let object = null;
      if (type === "ofs_delta") {
        const offset = decodeVarInt(reader);
        const baseOffset = start - offset;
        ({ object: base, type } = await this.readSlice({ start: baseOffset }));
      }
      if (type === "ref_delta") {
        const oid = reader.slice(20).toString("hex");
        ({ object: base, type } = await this.read({ oid }));
      }
      const buffer = raw.slice(reader.tell());
      object = Buffer.from(await inflate(buffer));
      if (object.byteLength !== length) {
        throw new InternalError(`Packfile told us object would have length ${length} but it had length ${object.byteLength}`);
      }
      if (base) {
        object = Buffer.from(applyDelta(object, base));
      }
      if (this.readDepth > 3) {
        this.offsetCache[start] = { type, object };
      }
      return { type, format: "content", object };
    }
  }
  var PackfileCache = Symbol("PackfileCache");
  async function loadPackIndex({
    fs,
    filename,
    getExternalRefDelta,
    emitter,
    emitterPrefix
  }) {
    const idx = await fs.read(filename);
    return GitPackIndex.fromIdx({ idx, getExternalRefDelta });
  }
  function readPackIndex({
    fs,
    cache,
    filename,
    getExternalRefDelta,
    emitter,
    emitterPrefix
  }) {
    if (!cache[PackfileCache])
      cache[PackfileCache] = new Map;
    let p = cache[PackfileCache].get(filename);
    if (!p) {
      p = loadPackIndex({
        fs,
        filename,
        getExternalRefDelta,
        emitter,
        emitterPrefix
      });
      cache[PackfileCache].set(filename, p);
    }
    return p;
  }
  var SHA1_CHUNK_SIZE = 8 * 1024 * 1024;
  async function shasumRange(buffer, { start = 0, end = buffer.length } = {}) {
    const hash = crypto$1.createHash("sha1");
    for (let i = start;i < end; i += SHA1_CHUNK_SIZE) {
      hash.update(buffer.subarray(i, Math.min(i + SHA1_CHUNK_SIZE, end)));
    }
    return hash.digest("hex");
  }
  async function readObjectPacked({
    fs,
    cache,
    gitdir,
    oid,
    format = "content",
    getExternalRefDelta
  }) {
    let list = await fs.readdir(join(gitdir, "objects/pack"));
    list = list.filter((x) => x.endsWith(".idx"));
    for (const filename of list) {
      const indexFile = `${gitdir}/objects/pack/${filename}`;
      const p = await readPackIndex({
        fs,
        cache,
        filename: indexFile,
        getExternalRefDelta
      });
      if (p.error)
        throw new InternalError(p.error);
      if (p.offsets.has(oid)) {
        const packFile = indexFile.replace(/idx$/, "pack");
        if (!p.pack) {
          p.pack = fs.read(packFile);
        }
        const pack = await p.pack;
        if (!pack) {
          p.pack = null;
          throw new InternalError(`Could not read packfile at ${packFile}. The file may be missing, corrupted, or too large to read into memory.`);
        }
        if (!p._checksumVerified) {
          const expectedShaFromIndex = p.packfileSha;
          const packTrailer = pack.subarray(-20);
          const packTrailerSha = Array.from(packTrailer).map((b) => b.toString(16).padStart(2, "0")).join("");
          if (packTrailerSha !== expectedShaFromIndex) {
            throw new InternalError(`Packfile trailer mismatch: expected ${expectedShaFromIndex}, got ${packTrailerSha}. The packfile may be corrupted.`);
          }
          const actualPayloadSha = await shasumRange(pack, {
            start: 0,
            end: pack.length - 20
          });
          if (actualPayloadSha !== expectedShaFromIndex) {
            throw new InternalError(`Packfile payload corrupted: calculated ${actualPayloadSha} but expected ${expectedShaFromIndex}. The packfile may have been tampered with.`);
          }
          p._checksumVerified = true;
        }
        const result = await p.read({ oid, getExternalRefDelta });
        result.format = "content";
        result.source = `objects/pack/${filename.replace(/idx$/, "pack")}`;
        return result;
      }
    }
    return null;
  }
  async function _readObject({
    fs,
    cache,
    gitdir,
    oid,
    format = "content"
  }) {
    const getExternalRefDelta = (oid2) => _readObject({ fs, cache, gitdir, oid: oid2 });
    let result;
    if (oid === "4b825dc642cb6eb9a060e54bf8d69288fbee4904") {
      result = { format: "wrapped", object: Buffer.from(`tree 0\x00`) };
    }
    if (!result) {
      result = await readObjectLoose({ fs, gitdir, oid });
    }
    if (!result) {
      result = await readObjectPacked({
        fs,
        cache,
        gitdir,
        oid,
        getExternalRefDelta
      });
      if (!result) {
        throw new NotFoundError(oid);
      }
      return result;
    }
    if (format === "deflated") {
      return result;
    }
    if (result.format === "deflated") {
      result.object = Buffer.from(await inflate(result.object));
      result.format = "wrapped";
    }
    if (format === "wrapped") {
      return result;
    }
    const sha = await shasum(result.object);
    if (sha !== oid) {
      throw new InternalError(`SHA check failed! Expected ${oid}, computed ${sha}`);
    }
    const { object, type } = GitObject.unwrap(result.object);
    result.type = type;
    result.object = object;
    result.format = "content";
    if (format === "content") {
      return result;
    }
    throw new InternalError(`invalid requested format "${format}"`);
  }

  class AlreadyExistsError extends BaseError {
    constructor(noun, where, canForce = true) {
      super(`Failed to create ${noun} at ${where} because it already exists.${canForce ? ` (Hint: use 'force: true' parameter to overwrite existing ${noun}.)` : ""}`);
      this.code = this.name = AlreadyExistsError.code;
      this.data = { noun, where, canForce };
    }
  }
  AlreadyExistsError.code = "AlreadyExistsError";

  class AmbiguousError extends BaseError {
    constructor(nouns, short, matches) {
      super(`Found multiple ${nouns} matching "${short}" (${matches.join(", ")}). Use a longer abbreviation length to disambiguate them.`);
      this.code = this.name = AmbiguousError.code;
      this.data = { nouns, short, matches };
    }
  }
  AmbiguousError.code = "AmbiguousError";

  class CheckoutConflictError extends BaseError {
    constructor(filepaths) {
      super(`Your local changes to the following files would be overwritten by checkout: ${filepaths.join(", ")}`);
      this.code = this.name = CheckoutConflictError.code;
      this.data = { filepaths };
    }
  }
  CheckoutConflictError.code = "CheckoutConflictError";

  class CherryPickMergeCommitError extends BaseError {
    constructor(oid, parentCount) {
      super(`Cannot cherry-pick merge commit ${oid}. ` + `Merge commits have ${parentCount} parents and require specifying which parent to use as the base.`);
      this.code = this.name = CherryPickMergeCommitError.code;
      this.data = { oid, parentCount };
    }
  }
  CherryPickMergeCommitError.code = "CherryPickMergeCommitError";

  class CherryPickRootCommitError extends BaseError {
    constructor(oid) {
      super(`Cannot cherry-pick root commit ${oid}. Root commits have no parents.`);
      this.code = this.name = CherryPickRootCommitError.code;
      this.data = { oid };
    }
  }
  CherryPickRootCommitError.code = "CherryPickRootCommitError";

  class CommitNotFetchedError extends BaseError {
    constructor(ref, oid) {
      super(`Failed to checkout "${ref}" because commit ${oid} is not available locally. Do a git fetch to make the branch available locally.`);
      this.code = this.name = CommitNotFetchedError.code;
      this.data = { ref, oid };
    }
  }
  CommitNotFetchedError.code = "CommitNotFetchedError";

  class EmptyServerResponseError extends BaseError {
    constructor() {
      super(`Empty response from git server.`);
      this.code = this.name = EmptyServerResponseError.code;
      this.data = {};
    }
  }
  EmptyServerResponseError.code = "EmptyServerResponseError";

  class FastForwardError extends BaseError {
    constructor() {
      super(`A simple fast-forward merge was not possible.`);
      this.code = this.name = FastForwardError.code;
      this.data = {};
    }
  }
  FastForwardError.code = "FastForwardError";

  class GitPushError extends BaseError {
    constructor(prettyDetails, result) {
      super(`One or more branches were not updated: ${prettyDetails}`);
      this.code = this.name = GitPushError.code;
      this.data = { prettyDetails, result };
    }
  }
  GitPushError.code = "GitPushError";

  class HttpError extends BaseError {
    constructor(statusCode, statusMessage, response) {
      super(`HTTP Error: ${statusCode} ${statusMessage}`);
      this.code = this.name = HttpError.code;
      this.data = { statusCode, statusMessage, response };
    }
  }
  HttpError.code = "HttpError";

  class InvalidFilepathError extends BaseError {
    constructor(reason) {
      let message = "invalid filepath";
      if (reason === "leading-slash" || reason === "trailing-slash") {
        message = `"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.`;
      } else if (reason === "directory") {
        message = `"filepath" should not be a directory.`;
      }
      super(message);
      this.code = this.name = InvalidFilepathError.code;
      this.data = { reason };
    }
  }
  InvalidFilepathError.code = "InvalidFilepathError";

  class InvalidRefNameError extends BaseError {
    constructor(ref, suggestion) {
      super(`"${ref}" would be an invalid git reference. (Hint: a valid alternative would be "${suggestion}".)`);
      this.code = this.name = InvalidRefNameError.code;
      this.data = { ref, suggestion };
    }
  }
  InvalidRefNameError.code = "InvalidRefNameError";

  class MaxDepthError extends BaseError {
    constructor(depth) {
      super(`Maximum search depth of ${depth} exceeded.`);
      this.code = this.name = MaxDepthError.code;
      this.data = { depth };
    }
  }
  MaxDepthError.code = "MaxDepthError";

  class MergeNotSupportedError extends BaseError {
    constructor() {
      super(`Merges with conflicts are not supported yet.`);
      this.code = this.name = MergeNotSupportedError.code;
      this.data = {};
    }
  }
  MergeNotSupportedError.code = "MergeNotSupportedError";

  class MergeConflictError extends BaseError {
    constructor(filepaths, bothModified, deleteByUs, deleteByTheirs) {
      super(`Automatic merge failed with one or more merge conflicts in the following files: ${filepaths.toString()}. Fix conflicts then commit the result.`);
      this.code = this.name = MergeConflictError.code;
      this.data = { filepaths, bothModified, deleteByUs, deleteByTheirs };
    }
  }
  MergeConflictError.code = "MergeConflictError";

  class MissingNameError extends BaseError {
    constructor(role) {
      super(`No name was provided for ${role} in the argument or in the .git/config file.`);
      this.code = this.name = MissingNameError.code;
      this.data = { role };
    }
  }
  MissingNameError.code = "MissingNameError";

  class MissingParameterError extends BaseError {
    constructor(parameter) {
      super(`The function requires a "${parameter}" parameter but none was provided.`);
      this.code = this.name = MissingParameterError.code;
      this.data = { parameter };
    }
  }
  MissingParameterError.code = "MissingParameterError";

  class MultipleGitError extends BaseError {
    constructor(errors) {
      super(`There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more`);
      this.code = this.name = MultipleGitError.code;
      this.data = { errors };
      this.errors = errors;
    }
  }
  MultipleGitError.code = "MultipleGitError";

  class ParseError2 extends BaseError {
    constructor(expected, actual) {
      super(`Expected "${expected}" but received "${actual}".`);
      this.code = this.name = ParseError2.code;
      this.data = { expected, actual };
    }
  }
  ParseError2.code = "ParseError";

  class PushRejectedError extends BaseError {
    constructor(reason) {
      let message = "";
      if (reason === "not-fast-forward") {
        message = " because it was not a simple fast-forward";
      } else if (reason === "tag-exists") {
        message = " because tag already exists";
      }
      super(`Push rejected${message}. Use "force: true" to override.`);
      this.code = this.name = PushRejectedError.code;
      this.data = { reason };
    }
  }
  PushRejectedError.code = "PushRejectedError";

  class RemoteCapabilityError extends BaseError {
    constructor(capability, parameter) {
      super(`Remote does not support the "${capability}" so the "${parameter}" parameter cannot be used.`);
      this.code = this.name = RemoteCapabilityError.code;
      this.data = { capability, parameter };
    }
  }
  RemoteCapabilityError.code = "RemoteCapabilityError";

  class SmartHttpError extends BaseError {
    constructor(preview, response) {
      super(`Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${preview}`);
      this.code = this.name = SmartHttpError.code;
      this.data = { preview, response };
    }
  }
  SmartHttpError.code = "SmartHttpError";

  class UnknownTransportError extends BaseError {
    constructor(url, transport, suggestion) {
      super(`Git remote "${url}" uses an unrecognized transport protocol: "${transport}"`);
      this.code = this.name = UnknownTransportError.code;
      this.data = { url, transport, suggestion };
    }
  }
  UnknownTransportError.code = "UnknownTransportError";

  class UrlParseError extends BaseError {
    constructor(url) {
      super(`Cannot parse remote URL: "${url}"`);
      this.code = this.name = UrlParseError.code;
      this.data = { url };
    }
  }
  UrlParseError.code = "UrlParseError";

  class UserCanceledError extends BaseError {
    constructor() {
      super(`The operation was canceled.`);
      this.code = this.name = UserCanceledError.code;
      this.data = {};
    }
  }
  UserCanceledError.code = "UserCanceledError";

  class IndexResetError extends BaseError {
    constructor(filepath) {
      super(`Could not merge index: Entry for '${filepath}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`);
      this.code = this.name = IndexResetError.code;
      this.data = { filepath };
    }
  }
  IndexResetError.code = "IndexResetError";

  class NoCommitError extends BaseError {
    constructor(ref) {
      super(`"${ref}" does not point to any commit. You're maybe working on a repository with no commits yet. `);
      this.code = this.name = NoCommitError.code;
      this.data = { ref };
    }
  }
  NoCommitError.code = "NoCommitError";
  var Errors = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    AlreadyExistsError,
    AmbiguousError,
    CheckoutConflictError,
    CherryPickMergeCommitError,
    CherryPickRootCommitError,
    CommitNotFetchedError,
    EmptyServerResponseError,
    FastForwardError,
    GitPushError,
    HttpError,
    InternalError,
    InvalidFilepathError,
    InvalidOidError,
    InvalidRefNameError,
    MaxDepthError,
    MergeNotSupportedError,
    MergeConflictError,
    MissingNameError,
    MissingParameterError,
    MultipleGitError,
    NoRefspecError,
    NotFoundError,
    ObjectTypeError,
    ParseError: ParseError2,
    PushRejectedError,
    RemoteCapabilityError,
    SmartHttpError,
    UnknownTransportError,
    UnsafeFilepathError,
    UrlParseError,
    UserCanceledError,
    UnmergedPathsError,
    IndexResetError,
    NoCommitError
  });
  function formatAuthor({ name, email, timestamp, timezoneOffset }) {
    timezoneOffset = formatTimezoneOffset(timezoneOffset);
    return `${name} <${email}> ${timestamp} ${timezoneOffset}`;
  }
  function formatTimezoneOffset(minutes) {
    const sign = simpleSign(negateExceptForZero(minutes));
    minutes = Math.abs(minutes);
    const hours = Math.floor(minutes / 60);
    minutes -= hours * 60;
    let strHours = String(hours);
    let strMinutes = String(minutes);
    if (strHours.length < 2)
      strHours = "0" + strHours;
    if (strMinutes.length < 2)
      strMinutes = "0" + strMinutes;
    return (sign === -1 ? "-" : "+") + strHours + strMinutes;
  }
  function simpleSign(n) {
    return Math.sign(n) || (Object.is(n, -0) ? -1 : 1);
  }
  function negateExceptForZero(n) {
    return n === 0 ? n : -n;
  }
  function normalizeNewlines(str) {
    str = str.replace(/\r/g, "");
    str = str.replace(/^\n+/, "");
    str = str.replace(/\n+$/, "") + `
`;
    return str;
  }
  function parseAuthor(author) {
    const [, name, email, timestamp, offset] = author.match(/^(.*) <(.*)> (.*) (.*)$/);
    return {
      name,
      email,
      timestamp: Number(timestamp),
      timezoneOffset: parseTimezoneOffset(offset)
    };
  }
  function parseTimezoneOffset(offset) {
    let [, sign, hours, minutes] = offset.match(/(\+|-)(\d\d)(\d\d)/);
    minutes = (sign === "+" ? 1 : -1) * (Number(hours) * 60 + Number(minutes));
    return negateExceptForZero$1(minutes);
  }
  function negateExceptForZero$1(n) {
    return n === 0 ? n : -n;
  }

  class GitAnnotatedTag {
    constructor(tag2) {
      if (typeof tag2 === "string") {
        this._tag = tag2;
      } else if (Buffer.isBuffer(tag2)) {
        this._tag = tag2.toString("utf8");
      } else if (typeof tag2 === "object") {
        this._tag = GitAnnotatedTag.render(tag2);
      } else {
        throw new InternalError("invalid type passed to GitAnnotatedTag constructor");
      }
    }
    static from(tag2) {
      return new GitAnnotatedTag(tag2);
    }
    static render(obj) {
      return `object ${obj.object}
type ${obj.type}
tag ${obj.tag}
tagger ${formatAuthor(obj.tagger)}

${obj.message}
${obj.gpgsig ? obj.gpgsig : ""}`;
    }
    justHeaders() {
      return this._tag.slice(0, this._tag.indexOf(`

`));
    }
    message() {
      const tag2 = this.withoutSignature();
      return tag2.slice(tag2.indexOf(`

`) + 2);
    }
    parse() {
      return Object.assign(this.headers(), {
        message: this.message(),
        gpgsig: this.gpgsig()
      });
    }
    render() {
      return this._tag;
    }
    headers() {
      const headers = this.justHeaders().split(`
`);
      const hs = [];
      for (const h of headers) {
        if (h[0] === " ") {
          hs[hs.length - 1] += `
` + h.slice(1);
        } else {
          hs.push(h);
        }
      }
      const obj = {};
      for (const h of hs) {
        const key = h.slice(0, h.indexOf(" "));
        const value = h.slice(h.indexOf(" ") + 1);
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          obj[key] = value;
        }
      }
      if (obj.tagger) {
        obj.tagger = parseAuthor(obj.tagger);
      }
      if (obj.committer) {
        obj.committer = parseAuthor(obj.committer);
      }
      return obj;
    }
    withoutSignature() {
      const tag2 = normalizeNewlines(this._tag);
      if (tag2.indexOf(`
-----BEGIN PGP SIGNATURE-----`) === -1)
        return tag2;
      return tag2.slice(0, tag2.lastIndexOf(`
-----BEGIN PGP SIGNATURE-----`));
    }
    gpgsig() {
      if (this._tag.indexOf(`
-----BEGIN PGP SIGNATURE-----`) === -1)
        return;
      const signature = this._tag.slice(this._tag.indexOf("-----BEGIN PGP SIGNATURE-----"), this._tag.indexOf("-----END PGP SIGNATURE-----") + "-----END PGP SIGNATURE-----".length);
      return normalizeNewlines(signature);
    }
    payload() {
      return this.withoutSignature() + `
`;
    }
    toObject() {
      return Buffer.from(this._tag, "utf8");
    }
    static async sign(tag2, sign, secretKey) {
      const payload = tag2.payload();
      let { signature } = await sign({ payload, secretKey });
      signature = normalizeNewlines(signature);
      const signedTag = payload + signature;
      return GitAnnotatedTag.from(signedTag);
    }
  }
  function indent(str) {
    return str.trim().split(`
`).map((x) => " " + x).join(`
`) + `
`;
  }
  function outdent(str) {
    return str.split(`
`).map((x) => x.replace(/^ /, "")).join(`
`);
  }

  class GitCommit {
    constructor(commit2) {
      if (typeof commit2 === "string") {
        this._commit = commit2;
      } else if (Buffer.isBuffer(commit2)) {
        this._commit = commit2.toString("utf8");
      } else if (typeof commit2 === "object") {
        this._commit = GitCommit.render(commit2);
      } else {
        throw new InternalError("invalid type passed to GitCommit constructor");
      }
    }
    static fromPayloadSignature({ payload, signature }) {
      const headers = GitCommit.justHeaders(payload);
      const message = GitCommit.justMessage(payload);
      const commit2 = normalizeNewlines(headers + `
gpgsig` + indent(signature) + `
` + message);
      return new GitCommit(commit2);
    }
    static from(commit2) {
      return new GitCommit(commit2);
    }
    toObject() {
      return Buffer.from(this._commit, "utf8");
    }
    headers() {
      return this.parseHeaders();
    }
    message() {
      return GitCommit.justMessage(this._commit);
    }
    parse() {
      return Object.assign({ message: this.message() }, this.headers());
    }
    static justMessage(commit2) {
      return normalizeNewlines(commit2.slice(commit2.indexOf(`

`) + 2));
    }
    static justHeaders(commit2) {
      return commit2.slice(0, commit2.indexOf(`

`));
    }
    parseHeaders() {
      const headers = GitCommit.justHeaders(this._commit).split(`
`);
      const hs = [];
      for (const h of headers) {
        if (h[0] === " ") {
          hs[hs.length - 1] += `
` + h.slice(1);
        } else {
          hs.push(h);
        }
      }
      const obj = {
        parent: []
      };
      for (const h of hs) {
        const key = h.slice(0, h.indexOf(" "));
        const value = h.slice(h.indexOf(" ") + 1);
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          obj[key] = value;
        }
      }
      if (obj.author) {
        obj.author = parseAuthor(obj.author);
      }
      if (obj.committer) {
        obj.committer = parseAuthor(obj.committer);
      }
      return obj;
    }
    static renderHeaders(obj) {
      let headers = "";
      if (obj.tree) {
        headers += `tree ${obj.tree}
`;
      } else {
        headers += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`;
      }
      if (obj.parent) {
        if (obj.parent.length === undefined) {
          throw new InternalError(`commit 'parent' property should be an array`);
        }
        for (const p of obj.parent) {
          headers += `parent ${p}
`;
        }
      }
      const author = obj.author;
      headers += `author ${formatAuthor(author)}
`;
      const committer = obj.committer || obj.author;
      headers += `committer ${formatAuthor(committer)}
`;
      if (obj.gpgsig) {
        headers += "gpgsig" + indent(obj.gpgsig);
      }
      return headers;
    }
    static render(obj) {
      return GitCommit.renderHeaders(obj) + `
` + normalizeNewlines(obj.message);
    }
    render() {
      return this._commit;
    }
    withoutSignature() {
      const commit2 = normalizeNewlines(this._commit);
      if (commit2.indexOf(`
gpgsig`) === -1)
        return commit2;
      const headers = commit2.slice(0, commit2.indexOf(`
gpgsig`));
      const message = commit2.slice(commit2.indexOf(`-----END PGP SIGNATURE-----
`) + `-----END PGP SIGNATURE-----
`.length);
      return normalizeNewlines(headers + `
` + message);
    }
    isolateSignature() {
      const signature = this._commit.slice(this._commit.indexOf("-----BEGIN PGP SIGNATURE-----"), this._commit.indexOf("-----END PGP SIGNATURE-----") + "-----END PGP SIGNATURE-----".length);
      return outdent(signature);
    }
    static async sign(commit2, sign, secretKey) {
      const payload = commit2.withoutSignature();
      const message = GitCommit.justMessage(commit2._commit);
      let { signature } = await sign({ payload, secretKey });
      signature = normalizeNewlines(signature);
      const headers = GitCommit.justHeaders(commit2._commit);
      const signedCommit = headers + `
` + "gpgsig" + indent(signature) + `
` + message;
      return GitCommit.from(signedCommit);
    }
  }
  async function resolveTree({ fs, cache, gitdir, oid }) {
    if (oid === "4b825dc642cb6eb9a060e54bf8d69288fbee4904") {
      return { tree: GitTree.from([]), oid };
    }
    const { type, object } = await _readObject({ fs, cache, gitdir, oid });
    if (type === "tag") {
      oid = GitAnnotatedTag.from(object).parse().object;
      return resolveTree({ fs, cache, gitdir, oid });
    }
    if (type === "commit") {
      oid = GitCommit.from(object).parse().tree;
      return resolveTree({ fs, cache, gitdir, oid });
    }
    if (type !== "tree") {
      throw new ObjectTypeError(oid, type, "tree");
    }
    return { tree: GitTree.from(object), oid };
  }

  class GitWalkerRepo {
    constructor({ fs, gitdir, ref, cache }) {
      this.fs = fs;
      this.cache = cache;
      this.gitdir = gitdir;
      this.mapPromise = (async () => {
        const map = new Map;
        let oid;
        try {
          oid = await GitRefManager.resolve({ fs, gitdir, ref });
        } catch (e) {
          if (e instanceof NotFoundError) {
            oid = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";
          }
        }
        const tree = await resolveTree({ fs, cache: this.cache, gitdir, oid });
        tree.type = "tree";
        tree.mode = "40000";
        map.set(".", tree);
        return map;
      })();
      const walker = this;
      this.ConstructEntry = class TreeEntry {
        constructor(fullpath) {
          this._fullpath = fullpath;
          this._type = false;
          this._mode = false;
          this._stat = false;
          this._content = false;
          this._oid = false;
        }
        async type() {
          return walker.type(this);
        }
        async mode() {
          return walker.mode(this);
        }
        async stat() {
          return walker.stat(this);
        }
        async content() {
          return walker.content(this);
        }
        async oid() {
          return walker.oid(this);
        }
      };
    }
    async readdir(entry) {
      const filepath = entry._fullpath;
      const { fs, cache, gitdir } = this;
      const map = await this.mapPromise;
      const obj = map.get(filepath);
      if (!obj)
        throw new Error(`No obj for ${filepath}`);
      const oid = obj.oid;
      if (!oid)
        throw new Error(`No oid for obj ${JSON.stringify(obj)}`);
      if (obj.type !== "tree") {
        return null;
      }
      const { type, object } = await _readObject({ fs, cache, gitdir, oid });
      if (type !== obj.type) {
        throw new ObjectTypeError(oid, type, obj.type);
      }
      const tree = GitTree.from(object);
      for (const entry2 of tree) {
        map.set(join(filepath, entry2.path), entry2);
      }
      return tree.entries().map((entry2) => join(filepath, entry2.path));
    }
    async type(entry) {
      if (entry._type === false) {
        const map = await this.mapPromise;
        const { type } = map.get(entry._fullpath);
        entry._type = type;
      }
      return entry._type;
    }
    async mode(entry) {
      if (entry._mode === false) {
        const map = await this.mapPromise;
        const { mode } = map.get(entry._fullpath);
        entry._mode = normalizeMode(parseInt(mode, 8));
      }
      return entry._mode;
    }
    async stat(_entry) {}
    async content(entry) {
      if (entry._content === false) {
        const map = await this.mapPromise;
        const { fs, cache, gitdir } = this;
        const obj = map.get(entry._fullpath);
        const oid = obj.oid;
        const { type, object } = await _readObject({ fs, cache, gitdir, oid });
        if (type !== "blob") {
          entry._content = undefined;
        } else {
          entry._content = new Uint8Array(object);
        }
      }
      return entry._content;
    }
    async oid(entry) {
      if (entry._oid === false) {
        const map = await this.mapPromise;
        const obj = map.get(entry._fullpath);
        entry._oid = obj.oid;
      }
      return entry._oid;
    }
  }
  function TREE({ ref = "HEAD" } = {}) {
    const o = Object.create(null);
    Object.defineProperty(o, GitWalkSymbol, {
      value: function({ fs, gitdir, cache }) {
        return new GitWalkerRepo({ fs, gitdir, ref, cache });
      }
    });
    Object.freeze(o);
    return o;
  }

  class GitWalkerFs {
    constructor({ fs, dir, gitdir, cache, refresh = true }) {
      this.fs = fs;
      this.cache = cache;
      this.dir = dir;
      this.gitdir = gitdir;
      this.refresh = refresh;
      this.config = null;
      const walker = this;
      this.ConstructEntry = class WorkdirEntry {
        constructor(fullpath) {
          this._fullpath = fullpath;
          this._type = false;
          this._mode = false;
          this._stat = false;
          this._content = false;
          this._oid = false;
        }
        async type() {
          return walker.type(this);
        }
        async mode() {
          return walker.mode(this);
        }
        async stat() {
          return walker.stat(this);
        }
        async content() {
          return walker.content(this);
        }
        async oid() {
          return walker.oid(this);
        }
      };
    }
    async readdir(entry) {
      const filepath = entry._fullpath;
      const { fs, dir } = this;
      const names = await fs.readdir(join(dir, filepath));
      if (names === null)
        return null;
      return names.map((name) => join(filepath, name));
    }
    async type(entry) {
      if (entry._type === false) {
        await entry.stat();
      }
      return entry._type;
    }
    async mode(entry) {
      if (entry._mode === false) {
        await entry.stat();
      }
      return entry._mode;
    }
    async stat(entry) {
      if (entry._stat === false) {
        const { fs, dir } = this;
        let stat = await fs.lstat(`${dir}/${entry._fullpath}`);
        if (!stat) {
          throw new Error(`ENOENT: no such file or directory, lstat '${entry._fullpath}'`);
        }
        let type = stat.isDirectory() ? "tree" : "blob";
        if (type === "blob" && !stat.isFile() && !stat.isSymbolicLink()) {
          type = "special";
        }
        entry._type = type;
        stat = normalizeStats(stat);
        entry._mode = stat.mode;
        if (stat.size === -1 && entry._actualSize) {
          stat.size = entry._actualSize;
        }
        entry._stat = stat;
      }
      return entry._stat;
    }
    async content(entry) {
      if (entry._content === false) {
        const { fs, dir, gitdir } = this;
        if (await entry.type() === "tree") {
          entry._content = undefined;
        } else {
          let content;
          if (await entry.mode() >> 12 === 10) {
            content = await fs.readlink(`${dir}/${entry._fullpath}`);
          } else {
            const config2 = await this._getGitConfig(fs, gitdir);
            const autocrlf = await config2.get("core.autocrlf");
            content = await fs.read(`${dir}/${entry._fullpath}`, { autocrlf });
          }
          entry._actualSize = content.length;
          if (entry._stat && entry._stat.size === -1) {
            entry._stat.size = entry._actualSize;
          }
          entry._content = new Uint8Array(content);
        }
      }
      return entry._content;
    }
    async oid(entry) {
      if (entry._oid === false) {
        const self = this;
        const { fs, gitdir, cache } = this;
        let oid;
        await GitIndexManager.acquire({ fs, gitdir, cache }, async function(index2) {
          const stage = index2.entriesMap.get(entry._fullpath);
          const stats = await entry.stat();
          const config2 = await self._getGitConfig(fs, gitdir);
          const filemode = await config2.get("core.filemode");
          const trustino = typeof process !== "undefined" ? !(process.platform === "win32") : true;
          if (!stage || compareStats(stats, stage, filemode, trustino)) {
            const content = await entry.content();
            if (content === undefined) {
              oid = undefined;
            } else {
              oid = await shasum(GitObject.wrap({ type: "blob", object: content }));
              if (self.refresh && stage && oid === stage.oid && (!filemode || stats.mode === stage.mode) && compareStats(stats, stage, filemode, trustino)) {
                index2.insert({
                  filepath: entry._fullpath,
                  stats,
                  oid
                });
              }
            }
          } else {
            oid = stage.oid;
          }
        });
        entry._oid = oid;
      }
      return entry._oid;
    }
    async _getGitConfig(fs, gitdir) {
      if (this.config) {
        return this.config;
      }
      this.config = await GitConfigManager.get({ fs, gitdir });
      return this.config;
    }
  }
  function WORKDIR({ refresh = true } = {}) {
    const o = Object.create(null);
    Object.defineProperty(o, GitWalkSymbol, {
      value: function({ fs, dir, gitdir, cache }) {
        return new GitWalkerFs({ fs, dir, gitdir, cache, refresh });
      }
    });
    Object.freeze(o);
    return o;
  }
  function arrayRange(start, end) {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  }
  var flat = typeof Array.prototype.flat === "undefined" ? (entries) => entries.reduce((acc, x) => acc.concat(x), []) : (entries) => entries.flat();

  class RunningMinimum {
    constructor() {
      this.value = null;
    }
    consider(value) {
      if (value === null || value === undefined)
        return;
      if (this.value === null) {
        this.value = value;
      } else if (value < this.value) {
        this.value = value;
      }
    }
    reset() {
      this.value = null;
    }
  }
  function* unionOfIterators(sets) {
    const min = new RunningMinimum;
    let minimum;
    const heads = [];
    const numsets = sets.length;
    for (let i = 0;i < numsets; i++) {
      heads[i] = sets[i].next().value;
      if (heads[i] !== undefined) {
        min.consider(heads[i]);
      }
    }
    if (min.value === null)
      return;
    while (true) {
      const result = [];
      minimum = min.value;
      min.reset();
      for (let i = 0;i < numsets; i++) {
        if (heads[i] !== undefined && heads[i] === minimum) {
          result[i] = heads[i];
          heads[i] = sets[i].next().value;
        } else {
          result[i] = null;
        }
        if (heads[i] !== undefined) {
          min.consider(heads[i]);
        }
      }
      yield result;
      if (min.value === null)
        return;
    }
  }
  async function _walk({
    fs,
    cache,
    dir,
    gitdir,
    trees,
    map = async (_, entry) => entry,
    reduce = async (parent, children) => {
      const flatten = flat(children);
      if (parent !== undefined)
        flatten.unshift(parent);
      return flatten;
    },
    iterate = (walk2, children) => Promise.all([...children].map(walk2))
  }) {
    const walkers = trees.map((proxy) => proxy[GitWalkSymbol]({ fs, dir, gitdir, cache }));
    const root = new Array(walkers.length).fill(".");
    const range = arrayRange(0, walkers.length);
    const unionWalkerFromReaddir = async (entries) => {
      range.forEach((i) => {
        const entry = entries[i];
        entries[i] = entry && new walkers[i].ConstructEntry(entry);
      });
      const subdirs = await Promise.all(range.map((i) => {
        const entry = entries[i];
        return entry ? walkers[i].readdir(entry) : [];
      }));
      const iterators = subdirs.map((array) => {
        return (array === null ? [] : array)[Symbol.iterator]();
      });
      return {
        entries,
        children: unionOfIterators(iterators)
      };
    };
    const walk2 = async (root2) => {
      const { entries, children } = await unionWalkerFromReaddir(root2);
      const fullpath = entries.find((entry) => entry && entry._fullpath)._fullpath;
      const parent = await map(fullpath, entries);
      if (parent !== null) {
        let walkedChildren = await iterate(walk2, children);
        walkedChildren = walkedChildren.filter((x) => x !== undefined);
        return reduce(parent, walkedChildren);
      }
    };
    return walk2(root);
  }
  async function rmRecursive(fs, filepath) {
    const entries = await fs.readdir(filepath);
    if (entries == null) {
      await fs.rm(filepath);
    } else if (entries.length) {
      await Promise.all(entries.map((entry) => {
        const subpath = join(filepath, entry);
        return fs.lstat(subpath).then((stat) => {
          if (!stat)
            return;
          return stat.isDirectory() ? rmRecursive(fs, subpath) : fs.rm(subpath);
        });
      })).then(() => fs.rmdir(filepath));
    } else {
      await fs.rmdir(filepath);
    }
  }
  function isPromiseLike(obj) {
    return isObject(obj) && isFunction(obj.then) && isFunction(obj.catch);
  }
  function isObject(obj) {
    return obj && typeof obj === "object";
  }
  function isFunction(obj) {
    return typeof obj === "function";
  }
  function isPromiseFs(fs) {
    const test = (targetFs) => {
      try {
        return targetFs.readFile().catch((e) => e);
      } catch (e) {
        return e;
      }
    };
    return isPromiseLike(test(fs));
  }
  var commands = [
    "readFile",
    "writeFile",
    "mkdir",
    "rmdir",
    "unlink",
    "stat",
    "lstat",
    "readdir",
    "readlink",
    "symlink"
  ];
  function bindFs(target, fs) {
    if (isPromiseFs(fs)) {
      for (const command of commands) {
        target[`_${command}`] = fs[command].bind(fs);
      }
    } else {
      for (const command of commands) {
        target[`_${command}`] = pify(fs[command].bind(fs));
      }
    }
    if (isPromiseFs(fs)) {
      if (fs.cp)
        target._cp = fs.cp.bind(fs);
      if (fs.rm)
        target._rm = fs.rm.bind(fs);
      else if (fs.rmdir.length > 1)
        target._rm = fs.rmdir.bind(fs);
      else
        target._rm = rmRecursive.bind(null, target);
    } else {
      if (fs.cp)
        target._cp = pify(fs.cp.bind(fs));
      if (fs.rm)
        target._rm = pify(fs.rm.bind(fs));
      else if (fs.rmdir.length > 2)
        target._rm = pify(fs.rmdir.bind(fs));
      else
        target._rm = rmRecursive.bind(null, target);
    }
  }

  class FileSystem {
    constructor(fs) {
      if (typeof fs._original_unwrapped_fs !== "undefined")
        return fs;
      const promises = Object.getOwnPropertyDescriptor(fs, "promises");
      if (promises && promises.enumerable) {
        bindFs(this, fs.promises);
      } else {
        bindFs(this, fs);
      }
      this._original_unwrapped_fs = fs;
    }
    async exists(filepath, options = {}) {
      try {
        await this._stat(filepath);
        return true;
      } catch (err) {
        if (err.code === "ENOENT" || err.code === "ENOTDIR" || (err.code || "").includes("ENS")) {
          return false;
        } else {
          console.log('Unhandled error in "FileSystem.exists()" function', err);
          throw err;
        }
      }
    }
    async read(filepath, options = {}) {
      try {
        let buffer = await this._readFile(filepath, options);
        if (options.autocrlf === "true") {
          try {
            buffer = new TextDecoder("utf8", { fatal: true }).decode(buffer);
            buffer = buffer.replace(/\r\n/g, `
`);
            buffer = new TextEncoder().encode(buffer);
          } catch (error3) {}
        }
        if (typeof buffer !== "string") {
          buffer = Buffer.from(buffer);
        }
        return buffer;
      } catch (err) {
        return null;
      }
    }
    async write(filepath, contents, options = {}) {
      try {
        await this._writeFile(filepath, contents, options);
      } catch (err) {
        await this.mkdir(dirname(filepath));
        await this._writeFile(filepath, contents, options);
      }
    }
    async mkdir(filepath, _selfCall = false) {
      try {
        await this._mkdir(filepath);
      } catch (err) {
        if (err === null)
          return;
        if (err.code === "EEXIST")
          return;
        if (_selfCall)
          throw err;
        if (err.code === "ENOENT") {
          const parent = dirname(filepath);
          if (parent === "." || parent === "/" || parent === filepath)
            throw err;
          await this.mkdir(parent);
          await this.mkdir(filepath, true);
        }
      }
    }
    async rm(filepath) {
      try {
        await this._unlink(filepath);
      } catch (err) {
        if (err.code !== "ENOENT")
          throw err;
      }
    }
    async rmdir(filepath, opts) {
      try {
        if (opts && opts.recursive) {
          await this._rm(filepath, opts);
        } else {
          await this._rmdir(filepath);
        }
      } catch (err) {
        if (err.code !== "ENOENT")
          throw err;
      }
    }
    async readdir(filepath) {
      try {
        const names = await this._readdir(filepath);
        names.sort(compareStrings);
        return names;
      } catch (err) {
        if (err.code === "ENOTDIR")
          return null;
        return [];
      }
    }
    async readdirDeep(dir) {
      const subdirs = await this._readdir(dir);
      const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = dir + "/" + subdir;
        return (await this._stat(res)).isDirectory() ? this.readdirDeep(res) : res;
      }));
      return files.reduce((a, f) => a.concat(f), []);
    }
    async lstat(filename) {
      try {
        const stats = await this._lstat(filename);
        return stats;
      } catch (err) {
        if (err.code === "ENOENT" || (err.code || "").includes("ENS")) {
          return null;
        }
        throw err;
      }
    }
    async readlink(filename, opts = { encoding: "buffer" }) {
      try {
        const link = await this._readlink(filename, opts);
        return Buffer.isBuffer(link) ? link : Buffer.from(link);
      } catch (err) {
        if (err.code === "ENOENT" || (err.code || "").includes("ENS")) {
          return null;
        }
        throw err;
      }
    }
    async writelink(filename, buffer) {
      return this._symlink(buffer.toString("utf8"), filename);
    }
  }
  function assertParameter(name, value) {
    if (value === undefined) {
      throw new MissingParameterError(name);
    }
  }
  function isAbsolute(filepath) {
    return filepath.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(filepath);
  }
  async function discoverGitdir({ fsp, dotgit }) {
    assertParameter("fsp", fsp);
    assertParameter("dotgit", dotgit);
    const dotgitStat = await fsp._stat(dotgit).catch(() => ({ isFile: () => false, isDirectory: () => false }));
    if (dotgitStat.isDirectory()) {
      return dotgit;
    } else if (dotgitStat.isFile()) {
      return fsp._readFile(dotgit, "utf8").then((contents) => contents.trimRight().substr(8)).then((submoduleGitdir) => {
        if (isAbsolute(submoduleGitdir)) {
          return submoduleGitdir;
        }
        const gitdir = join(dirname(dotgit), submoduleGitdir);
        return gitdir;
      });
    } else {
      return dotgit;
    }
  }
  async function modified(entry, base) {
    if (!entry && !base)
      return false;
    if (entry && !base)
      return true;
    if (!entry && base)
      return true;
    if (await entry.type() === "tree" && await base.type() === "tree") {
      return false;
    }
    if (await entry.type() === await base.type() && await entry.mode() === await base.mode() && await entry.oid() === await base.oid()) {
      return false;
    }
    return true;
  }
  async function abortMerge({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    commit: commit2 = "HEAD",
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("dir", dir);
      assertParameter("gitdir", gitdir);
      const fs = new FileSystem(_fs);
      const trees = [TREE({ ref: commit2 }), WORKDIR(), STAGE()];
      let unmergedPaths = [];
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      await GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async function(index2) {
        unmergedPaths = index2.unmergedPaths;
      });
      const results = await _walk({
        fs,
        cache,
        dir,
        gitdir: updatedGitdir,
        trees,
        map: async function(path, [head, workdir, index2]) {
          const staged = !await modified(workdir, index2);
          const unmerged = unmergedPaths.includes(path);
          const unmodified = !await modified(index2, head);
          if (staged || unmerged) {
            return head ? {
              path,
              mode: await head.mode(),
              oid: await head.oid(),
              type: await head.type(),
              content: await head.content()
            } : undefined;
          }
          if (unmodified)
            return false;
          else
            throw new IndexResetError(path);
        }
      });
      await GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async function(index2) {
        for (const entry of results) {
          if (entry === false)
            continue;
          if (!entry) {
            await fs.rmdir(`${dir}/${entry.path}`, { recursive: true });
            index2.delete({ filepath: entry.path });
            continue;
          }
          if (entry.type === "blob") {
            const content = new TextDecoder().decode(entry.content);
            await fs.write(`${dir}/${entry.path}`, content, {
              mode: entry.mode
            });
            index2.insert({
              filepath: entry.path,
              oid: entry.oid,
              stage: 0
            });
          }
        }
      });
    } catch (err) {
      err.caller = "git.abortMerge";
      throw err;
    }
  }

  class GitIgnoreManager {
    static async isIgnored({ fs, dir, gitdir = join(dir, ".git"), filepath }) {
      if (basename(filepath) === ".git")
        return true;
      if (filepath === ".")
        return false;
      let excludes = "";
      const excludesFile = join(gitdir, "info", "exclude");
      if (await fs.exists(excludesFile)) {
        excludes = await fs.read(excludesFile, "utf8");
      }
      const pairs = [
        {
          gitignore: join(dir, ".gitignore"),
          filepath
        }
      ];
      const pieces = filepath.split("/").filter(Boolean);
      for (let i = 1;i < pieces.length; i++) {
        const folder = pieces.slice(0, i).join("/");
        const file = pieces.slice(i).join("/");
        pairs.push({
          gitignore: join(dir, folder, ".gitignore"),
          filepath: file
        });
      }
      let ignoredStatus = false;
      for (const p of pairs) {
        let file;
        try {
          file = await fs.read(p.gitignore, "utf8");
        } catch (err) {
          if (err.code === "NOENT")
            continue;
        }
        const ign = ignore().add(excludes);
        ign.add(file);
        const parentdir = dirname(p.filepath);
        if (parentdir !== "." && ign.ignores(parentdir))
          return true;
        if (ignoredStatus) {
          ignoredStatus = !ign.test(p.filepath).unignored;
        } else {
          ignoredStatus = ign.test(p.filepath).ignored;
        }
      }
      return ignoredStatus;
    }
  }
  async function writeObjectLoose({ fs, gitdir, object, format, oid }) {
    if (format !== "deflated") {
      throw new InternalError("GitObjectStoreLoose expects objects to write to be in deflated format");
    }
    const source = `objects/${oid.slice(0, 2)}/${oid.slice(2)}`;
    const filepath = `${gitdir}/${source}`;
    if (!await fs.exists(filepath))
      await fs.write(filepath, object);
  }
  var supportsCompressionStream = null;
  async function deflate(buffer) {
    if (supportsCompressionStream === null) {
      supportsCompressionStream = testCompressionStream();
    }
    return supportsCompressionStream ? browserDeflate(buffer) : pako.deflate(buffer);
  }
  async function browserDeflate(buffer) {
    const cs = new CompressionStream("deflate");
    const c = new Blob([buffer]).stream().pipeThrough(cs);
    return new Uint8Array(await new Response(c).arrayBuffer());
  }
  function testCompressionStream() {
    try {
      const cs = new CompressionStream("deflate");
      cs.writable.close();
      const stream = new Blob([]).stream();
      stream.cancel();
      return true;
    } catch (_) {
      return false;
    }
  }
  async function _writeObject({
    fs,
    gitdir,
    type,
    object,
    format = "content",
    oid = undefined,
    dryRun = false
  }) {
    if (format !== "deflated") {
      if (format !== "wrapped") {
        object = GitObject.wrap({ type, object });
      }
      oid = await shasum(object);
      object = Buffer.from(await deflate(object));
    }
    if (!dryRun) {
      await writeObjectLoose({ fs, gitdir, object, format: "deflated", oid });
    }
    return oid;
  }
  function posixifyPathBuffer(buffer) {
    let idx;
    while (~(idx = buffer.indexOf(92)))
      buffer[idx] = 47;
    return buffer;
  }
  async function add({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    filepath,
    cache = {},
    force = false,
    parallel = true
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("dir", dir);
      assertParameter("gitdir", gitdir);
      assertParameter("filepath", filepath);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      await GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async (index2) => {
        const config2 = await GitConfigManager.get({ fs, gitdir: updatedGitdir });
        const autocrlf = await config2.get("core.autocrlf");
        return addToIndex({
          dir,
          gitdir: updatedGitdir,
          fs,
          filepath,
          index: index2,
          force,
          parallel,
          autocrlf
        });
      });
    } catch (err) {
      err.caller = "git.add";
      throw err;
    }
  }
  async function addToIndex({
    dir,
    gitdir,
    fs,
    filepath,
    index: index2,
    force,
    parallel,
    autocrlf
  }) {
    filepath = Array.isArray(filepath) ? filepath : [filepath];
    const promises = filepath.map(async (currentFilepath) => {
      if (!force) {
        const ignored = await GitIgnoreManager.isIgnored({
          fs,
          dir,
          gitdir,
          filepath: currentFilepath
        });
        if (ignored)
          return;
      }
      const stats = await fs.lstat(join(dir, currentFilepath));
      if (!stats)
        throw new NotFoundError(currentFilepath);
      if (stats.isDirectory()) {
        const children = await fs.readdir(join(dir, currentFilepath));
        if (parallel) {
          const promises2 = children.map((child) => addToIndex({
            dir,
            gitdir,
            fs,
            filepath: [join(currentFilepath, child)],
            index: index2,
            force,
            parallel,
            autocrlf
          }));
          await Promise.all(promises2);
        } else {
          for (const child of children) {
            await addToIndex({
              dir,
              gitdir,
              fs,
              filepath: [join(currentFilepath, child)],
              index: index2,
              force,
              parallel,
              autocrlf
            });
          }
        }
      } else {
        const object = stats.isSymbolicLink() ? await fs.readlink(join(dir, currentFilepath)).then(posixifyPathBuffer) : await fs.read(join(dir, currentFilepath), { autocrlf });
        if (object === null)
          throw new NotFoundError(currentFilepath);
        const oid = await _writeObject({ fs, gitdir, type: "blob", object });
        index2.insert({ filepath: currentFilepath, stats, oid });
      }
    });
    const settledPromises = await Promise.allSettled(promises);
    const rejectedPromises = settledPromises.filter((settle) => settle.status === "rejected").map((settle) => settle.reason);
    if (rejectedPromises.length > 1) {
      throw new MultipleGitError(rejectedPromises);
    }
    if (rejectedPromises.length === 1) {
      throw rejectedPromises[0];
    }
    const fulfilledPromises = settledPromises.filter((settle) => settle.status === "fulfilled" && settle.value).map((settle) => settle.value);
    return fulfilledPromises;
  }
  async function _getConfig({ fs, gitdir, path }) {
    const config2 = await GitConfigManager.get({ fs, gitdir });
    return config2.get(path);
  }
  function assignDefined(target, ...sources) {
    for (const source of sources) {
      if (source) {
        for (const key of Object.keys(source)) {
          const val = source[key];
          if (val !== undefined) {
            target[key] = val;
          }
        }
      }
    }
    return target;
  }
  async function normalizeAuthorObject({ fs, gitdir, author, commit: commit2 }) {
    const timestamp = Math.floor(Date.now() / 1000);
    const defaultAuthor = {
      name: await _getConfig({ fs, gitdir, path: "user.name" }),
      email: await _getConfig({ fs, gitdir, path: "user.email" }) || "",
      timestamp,
      timezoneOffset: new Date(timestamp * 1000).getTimezoneOffset()
    };
    const normalizedAuthor = assignDefined({}, defaultAuthor, commit2 ? commit2.author : undefined, author);
    if (normalizedAuthor.name === undefined) {
      return;
    }
    return normalizedAuthor;
  }
  async function normalizeCommitterObject({
    fs,
    gitdir,
    author,
    committer,
    commit: commit2
  }) {
    const timestamp = Math.floor(Date.now() / 1000);
    const defaultCommitter = {
      name: await _getConfig({ fs, gitdir, path: "user.name" }),
      email: await _getConfig({ fs, gitdir, path: "user.email" }) || "",
      timestamp,
      timezoneOffset: new Date(timestamp * 1000).getTimezoneOffset()
    };
    const normalizedCommitter = assignDefined({}, defaultCommitter, commit2 ? commit2.committer : undefined, author, committer);
    if (normalizedCommitter.name === undefined) {
      return;
    }
    return normalizedCommitter;
  }
  async function resolveCommit({ fs, cache, gitdir, oid }) {
    const { type, object } = await _readObject({ fs, cache, gitdir, oid });
    if (type === "tag") {
      oid = GitAnnotatedTag.from(object).parse().object;
      return resolveCommit({ fs, cache, gitdir, oid });
    }
    if (type !== "commit") {
      throw new ObjectTypeError(oid, type, "commit");
    }
    return { commit: GitCommit.from(object), oid };
  }
  async function _readCommit({ fs, cache, gitdir, oid }) {
    const { commit: commit2, oid: commitOid } = await resolveCommit({
      fs,
      cache,
      gitdir,
      oid
    });
    const result = {
      oid: commitOid,
      commit: commit2.parse(),
      payload: commit2.withoutSignature()
    };
    return result;
  }
  async function _commit({
    fs,
    cache,
    onSign,
    gitdir,
    message,
    author: _author,
    committer: _committer,
    signingKey,
    amend = false,
    dryRun = false,
    noUpdateBranch = false,
    ref,
    parent,
    tree
  }) {
    let initialCommit = false;
    let detachedHead = false;
    if (!ref) {
      const headContent = await fs.read(`${gitdir}/HEAD`, { encoding: "utf8" });
      detachedHead = !headContent.startsWith("ref:");
      ref = await GitRefManager.resolve({
        fs,
        gitdir,
        ref: "HEAD",
        depth: 2
      });
    }
    let refOid, refCommit;
    try {
      refOid = await GitRefManager.resolve({
        fs,
        gitdir,
        ref
      });
      refCommit = await _readCommit({ fs, gitdir, oid: refOid, cache: {} });
    } catch {
      initialCommit = true;
    }
    if (amend && initialCommit) {
      throw new NoCommitError(ref);
    }
    const author = !amend ? await normalizeAuthorObject({ fs, gitdir, author: _author }) : await normalizeAuthorObject({
      fs,
      gitdir,
      author: _author,
      commit: refCommit.commit
    });
    if (!author)
      throw new MissingNameError("author");
    const committer = !amend ? await normalizeCommitterObject({
      fs,
      gitdir,
      author,
      committer: _committer
    }) : await normalizeCommitterObject({
      fs,
      gitdir,
      author,
      committer: _committer,
      commit: refCommit.commit
    });
    if (!committer)
      throw new MissingNameError("committer");
    return GitIndexManager.acquire({ fs, gitdir, cache, allowUnmerged: false }, async function(index2) {
      const inodes = flatFileListToDirectoryStructure(index2.entries);
      const inode = inodes.get(".");
      if (!tree) {
        tree = await constructTree({ fs, gitdir, inode, dryRun });
      }
      if (!parent) {
        if (!amend) {
          parent = refOid ? [refOid] : [];
        } else {
          parent = refCommit.commit.parent;
        }
      } else {
        parent = await Promise.all(parent.map((p) => {
          return GitRefManager.resolve({ fs, gitdir, ref: p });
        }));
      }
      if (!message) {
        if (!amend) {
          throw new MissingParameterError("message");
        } else {
          message = refCommit.commit.message;
        }
      }
      let comm = GitCommit.from({
        tree,
        parent,
        author,
        committer,
        message
      });
      if (signingKey) {
        comm = await GitCommit.sign(comm, onSign, signingKey);
      }
      const oid = await _writeObject({
        fs,
        gitdir,
        type: "commit",
        object: comm.toObject(),
        dryRun
      });
      if (!noUpdateBranch && !dryRun) {
        await GitRefManager.writeRef({
          fs,
          gitdir,
          ref: detachedHead ? "HEAD" : ref,
          value: oid
        });
      }
      return oid;
    });
  }
  async function constructTree({ fs, gitdir, inode, dryRun }) {
    const children = inode.children;
    for (const inode2 of children) {
      if (inode2.type === "tree") {
        inode2.metadata.mode = "040000";
        inode2.metadata.oid = await constructTree({ fs, gitdir, inode: inode2, dryRun });
      }
    }
    const entries = children.map((inode2) => ({
      mode: inode2.metadata.mode,
      path: inode2.basename,
      oid: inode2.metadata.oid,
      type: inode2.type
    }));
    const tree = GitTree.from(entries);
    const oid = await _writeObject({
      fs,
      gitdir,
      type: "tree",
      object: tree.toObject(),
      dryRun
    });
    return oid;
  }
  async function resolveFilepath({ fs, cache, gitdir, oid, filepath }) {
    if (filepath.startsWith("/")) {
      throw new InvalidFilepathError("leading-slash");
    } else if (filepath.endsWith("/")) {
      throw new InvalidFilepathError("trailing-slash");
    }
    const _oid = oid;
    const result = await resolveTree({ fs, cache, gitdir, oid });
    const tree = result.tree;
    if (filepath === "") {
      oid = result.oid;
    } else {
      const pathArray = filepath.split("/");
      oid = await _resolveFilepath({
        fs,
        cache,
        gitdir,
        tree,
        pathArray,
        oid: _oid,
        filepath
      });
    }
    return oid;
  }
  async function _resolveFilepath({
    fs,
    cache,
    gitdir,
    tree,
    pathArray,
    oid,
    filepath
  }) {
    const name = pathArray.shift();
    for (const entry of tree) {
      if (entry.path === name) {
        if (pathArray.length === 0) {
          return entry.oid;
        } else {
          const { type, object } = await _readObject({
            fs,
            cache,
            gitdir,
            oid: entry.oid
          });
          if (type !== "tree") {
            throw new ObjectTypeError(oid, type, "tree", filepath);
          }
          tree = GitTree.from(object);
          return _resolveFilepath({
            fs,
            cache,
            gitdir,
            tree,
            pathArray,
            oid,
            filepath
          });
        }
      }
    }
    throw new NotFoundError(`file or directory found at "${oid}:${filepath}"`);
  }
  async function _readTree({
    fs,
    cache,
    gitdir,
    oid,
    filepath = undefined
  }) {
    if (filepath !== undefined) {
      oid = await resolveFilepath({ fs, cache, gitdir, oid, filepath });
    }
    const { tree, oid: treeOid } = await resolveTree({ fs, cache, gitdir, oid });
    const result = {
      oid: treeOid,
      tree: tree.entries()
    };
    return result;
  }
  async function _writeTree({ fs, gitdir, tree }) {
    const object = GitTree.from(tree).toObject();
    const oid = await _writeObject({
      fs,
      gitdir,
      type: "tree",
      object,
      format: "content"
    });
    return oid;
  }
  async function _addNote({
    fs,
    cache,
    onSign,
    gitdir,
    ref,
    oid,
    note,
    force,
    author,
    committer,
    signingKey
  }) {
    let parent;
    try {
      parent = await GitRefManager.resolve({ gitdir, fs, ref });
    } catch (err) {
      if (!(err instanceof NotFoundError)) {
        throw err;
      }
    }
    const result = await _readTree({
      fs,
      cache,
      gitdir,
      oid: parent || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
    });
    let tree = result.tree;
    if (force) {
      tree = tree.filter((entry) => entry.path !== oid);
    } else {
      for (const entry of tree) {
        if (entry.path === oid) {
          throw new AlreadyExistsError("note", oid);
        }
      }
    }
    if (typeof note === "string") {
      note = Buffer.from(note, "utf8");
    }
    const noteOid = await _writeObject({
      fs,
      gitdir,
      type: "blob",
      object: note,
      format: "content"
    });
    tree.push({ mode: "100644", path: oid, oid: noteOid, type: "blob" });
    const treeOid = await _writeTree({
      fs,
      gitdir,
      tree
    });
    const commitOid = await _commit({
      fs,
      cache,
      onSign,
      gitdir,
      ref,
      tree: treeOid,
      parent: parent && [parent],
      message: `Note added by 'isomorphic-git addNote'
`,
      author,
      committer,
      signingKey
    });
    return commitOid;
  }
  async function addNote({
    fs: _fs,
    onSign,
    dir,
    gitdir = join(dir, ".git"),
    ref = "refs/notes/commits",
    oid,
    note,
    force,
    author: _author,
    committer: _committer,
    signingKey,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      assertParameter("note", note);
      if (signingKey) {
        assertParameter("onSign", onSign);
      }
      const fs = new FileSystem(_fs);
      const author = await normalizeAuthorObject({ fs, gitdir, author: _author });
      if (!author)
        throw new MissingNameError("author");
      const committer = await normalizeCommitterObject({
        fs,
        gitdir,
        author,
        committer: _committer
      });
      if (!committer)
        throw new MissingNameError("committer");
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      return await _addNote({
        fs,
        cache,
        onSign,
        gitdir: updatedGitdir,
        ref,
        oid,
        note,
        force,
        author,
        committer,
        signingKey
      });
    } catch (err) {
      err.caller = "git.addNote";
      throw err;
    }
  }
  var bad = /(^|[/.])([/.]|$)|^@$|@{|[\x00-\x20\x7f~^:?*[\\]|\.lock(\/|$)/;
  function isValidRef(name, onelevel) {
    if (typeof name !== "string")
      throw new TypeError("Reference name must be a string");
    return !bad.test(name) && (!!onelevel || name.includes("/"));
  }
  async function _addRemote({ fs, gitdir, remote, url, force }) {
    if (!isValidRef(remote, true)) {
      throw new InvalidRefNameError(remote, cleanGitRef.clean(remote));
    }
    const config2 = await GitConfigManager.get({ fs, gitdir });
    if (!force) {
      const remoteNames = await config2.getSubsections("remote");
      if (remoteNames.includes(remote)) {
        if (url !== await config2.get(`remote.${remote}.url`)) {
          throw new AlreadyExistsError("remote", remote);
        }
      }
    }
    await config2.set(`remote.${remote}.url`, url);
    await config2.set(`remote.${remote}.fetch`, `+refs/heads/*:refs/remotes/${remote}/*`);
    await GitConfigManager.save({ fs, gitdir, config: config2 });
  }
  async function addRemote({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    remote,
    url,
    force = false
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("remote", remote);
      assertParameter("url", url);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _addRemote({
        fs: fsp,
        gitdir: updatedGitdir,
        remote,
        url,
        force
      });
    } catch (err) {
      err.caller = "git.addRemote";
      throw err;
    }
  }
  async function _annotatedTag({
    fs,
    cache,
    onSign,
    gitdir,
    ref,
    tagger,
    message = ref,
    gpgsig,
    object,
    signingKey,
    force = false
  }) {
    ref = ref.startsWith("refs/tags/") ? ref : `refs/tags/${ref}`;
    if (!force && await GitRefManager.exists({ fs, gitdir, ref })) {
      throw new AlreadyExistsError("tag", ref);
    }
    const oid = await GitRefManager.resolve({
      fs,
      gitdir,
      ref: object || "HEAD"
    });
    const { type } = await _readObject({ fs, cache, gitdir, oid });
    let tagObject = GitAnnotatedTag.from({
      object: oid,
      type,
      tag: ref.replace("refs/tags/", ""),
      tagger,
      message,
      gpgsig
    });
    if (signingKey) {
      tagObject = await GitAnnotatedTag.sign(tagObject, onSign, signingKey);
    }
    const value = await _writeObject({
      fs,
      gitdir,
      type: "tag",
      object: tagObject.toObject()
    });
    await GitRefManager.writeRef({ fs, gitdir, ref, value });
  }
  async function annotatedTag({
    fs: _fs,
    onSign,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    tagger: _tagger,
    message = ref,
    gpgsig,
    object,
    signingKey,
    force = false,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      if (signingKey) {
        assertParameter("onSign", onSign);
      }
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const tagger = await normalizeAuthorObject({
        fs,
        gitdir: updatedGitdir,
        author: _tagger
      });
      if (!tagger)
        throw new MissingNameError("tagger");
      return await _annotatedTag({
        fs,
        cache,
        onSign,
        gitdir: updatedGitdir,
        ref,
        tagger,
        message,
        gpgsig,
        object,
        signingKey,
        force
      });
    } catch (err) {
      err.caller = "git.annotatedTag";
      throw err;
    }
  }
  async function _branch({
    fs,
    gitdir,
    ref,
    object,
    checkout: checkout2 = false,
    force = false
  }) {
    if (!isValidRef(ref, true)) {
      throw new InvalidRefNameError(ref, cleanGitRef.clean(ref));
    }
    const fullref = `refs/heads/${ref}`;
    if (!force) {
      const exist = await GitRefManager.exists({ fs, gitdir, ref: fullref });
      if (exist) {
        throw new AlreadyExistsError("branch", ref, false);
      }
    }
    let oid;
    try {
      oid = await GitRefManager.resolve({ fs, gitdir, ref: object || "HEAD" });
    } catch (e) {}
    if (oid) {
      await GitRefManager.writeRef({ fs, gitdir, ref: fullref, value: oid });
    }
    if (checkout2) {
      await GitRefManager.writeSymbolicRef({
        fs,
        gitdir,
        ref: "HEAD",
        value: fullref
      });
    }
  }
  async function branch({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    object,
    checkout: checkout2 = false,
    force = false
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _branch({
        fs: fsp,
        gitdir: updatedGitdir,
        ref,
        object,
        checkout: checkout2,
        force
      });
    } catch (err) {
      err.caller = "git.branch";
      throw err;
    }
  }
  var worthWalking = (filepath, root) => {
    if (filepath === "." || root == null || root.length === 0 || root === ".") {
      return true;
    }
    if (root.length >= filepath.length) {
      return root.startsWith(filepath);
    } else {
      return filepath.startsWith(root);
    }
  };
  async function _checkout({
    fs,
    cache,
    onProgress,
    onPostCheckout,
    dir,
    gitdir,
    remote,
    ref,
    filepaths,
    noCheckout,
    noUpdateHead,
    dryRun,
    force,
    track = true,
    nonBlocking = false,
    batchSize = 100
  }) {
    let oldOid;
    if (onPostCheckout) {
      try {
        oldOid = await GitRefManager.resolve({ fs, gitdir, ref: "HEAD" });
      } catch (err) {
        oldOid = "0000000000000000000000000000000000000000";
      }
    }
    let oid;
    try {
      oid = await GitRefManager.resolve({ fs, gitdir, ref });
    } catch (err) {
      if (ref === "HEAD")
        throw err;
      const remoteRef = `${remote}/${ref}`;
      oid = await GitRefManager.resolve({
        fs,
        gitdir,
        ref: remoteRef
      });
      if (track) {
        const config2 = await GitConfigManager.get({ fs, gitdir });
        await config2.set(`branch.${ref}.remote`, remote);
        await config2.set(`branch.${ref}.merge`, `refs/heads/${ref}`);
        await GitConfigManager.save({ fs, gitdir, config: config2 });
      }
      await GitRefManager.writeRef({
        fs,
        gitdir,
        ref: `refs/heads/${ref}`,
        value: oid
      });
    }
    if (!noCheckout) {
      let ops;
      try {
        ops = await analyze({
          fs,
          cache,
          onProgress,
          dir,
          gitdir,
          ref,
          force,
          filepaths
        });
      } catch (err) {
        if (err instanceof NotFoundError && err.data.what === oid) {
          throw new CommitNotFetchedError(ref, oid);
        } else {
          throw err;
        }
      }
      const conflicts = ops.filter(([method]) => method === "conflict").map(([method, fullpath]) => fullpath);
      if (conflicts.length > 0) {
        throw new CheckoutConflictError(conflicts);
      }
      const errors = ops.filter(([method]) => method === "error").map(([method, fullpath]) => fullpath);
      if (errors.length > 0) {
        throw new InternalError(errors.join(", "));
      }
      if (dryRun) {
        if (onPostCheckout) {
          await onPostCheckout({
            previousHead: oldOid,
            newHead: oid,
            type: filepaths != null && filepaths.length > 0 ? "file" : "branch"
          });
        }
        return;
      }
      let count = 0;
      const total = ops.length;
      await GitIndexManager.acquire({ fs, gitdir, cache }, async function(index2) {
        await Promise.all(ops.filter(([method]) => method === "delete" || method === "delete-index").map(async function([method, fullpath]) {
          const filepath = `${dir}/${fullpath}`;
          if (method === "delete") {
            await fs.rm(filepath);
          }
          index2.delete({ filepath: fullpath });
          if (onProgress) {
            await onProgress({
              phase: "Updating workdir",
              loaded: ++count,
              total
            });
          }
        }));
      });
      await GitIndexManager.acquire({ fs, gitdir, cache }, async function(index2) {
        for (const [method, fullpath] of ops) {
          if (method === "rmdir" || method === "rmdir-index") {
            const filepath = `${dir}/${fullpath}`;
            try {
              if (method === "rmdir") {
                await fs.rmdir(filepath);
              }
              index2.delete({ filepath: fullpath });
              if (onProgress) {
                await onProgress({
                  phase: "Updating workdir",
                  loaded: ++count,
                  total
                });
              }
            } catch (e) {
              if (e.code === "ENOTEMPTY") {
                console.log(`Did not delete ${fullpath} because directory is not empty`);
              } else {
                throw e;
              }
            }
          }
        }
      });
      await Promise.all(ops.filter(([method]) => method === "mkdir" || method === "mkdir-index").map(async function([_, fullpath]) {
        const filepath = `${dir}/${fullpath}`;
        await fs.mkdir(filepath);
        if (onProgress) {
          await onProgress({
            phase: "Updating workdir",
            loaded: ++count,
            total
          });
        }
      }));
      if (nonBlocking) {
        const eligibleOps = ops.filter(([method]) => method === "create" || method === "create-index" || method === "update" || method === "mkdir-index");
        const updateWorkingDirResults = await batchAllSettled("Update Working Dir", eligibleOps.map(([method, fullpath, oid2, mode, chmod]) => () => updateWorkingDir({ fs, cache, gitdir, dir }, [
          method,
          fullpath,
          oid2,
          mode,
          chmod
        ])), onProgress, batchSize);
        await GitIndexManager.acquire({ fs, gitdir, cache, allowUnmerged: true }, async function(index2) {
          await batchAllSettled("Update Index", updateWorkingDirResults.map(([fullpath, oid2, stats]) => () => updateIndex({ index: index2, fullpath, oid: oid2, stats })), onProgress, batchSize);
        });
      } else {
        await GitIndexManager.acquire({ fs, gitdir, cache, allowUnmerged: true }, async function(index2) {
          const settled = await Promise.allSettled(ops.filter(([method]) => method === "create" || method === "create-index" || method === "update" || method === "mkdir-index").map(async function([method, fullpath, oid2, mode, chmod]) {
            const filepath = `${dir}/${fullpath}`;
            if (method !== "create-index" && method !== "mkdir-index") {
              const { object } = await _readObject({
                fs,
                cache,
                gitdir,
                oid: oid2
              });
              if (chmod) {
                await fs.rm(filepath);
              }
              if (mode === 33188) {
                await fs.write(filepath, object);
              } else if (mode === 33261) {
                await fs.write(filepath, object, { mode: 511 });
              } else if (mode === 40960) {
                await fs.writelink(filepath, object);
              } else {
                throw new InternalError(`Invalid mode 0o${mode.toString(8)} detected in blob ${oid2}`);
              }
            }
            const stats = await fs.lstat(filepath);
            if (mode === 33261) {
              stats.mode = 493;
            }
            if (method === "mkdir-index") {
              stats.mode = 57344;
            }
            index2.insert({
              filepath: fullpath,
              stats,
              oid: oid2
            });
            if (onProgress) {
              await onProgress({
                phase: "Updating workdir",
                loaded: ++count,
                total
              });
            }
          }));
          const rejections = [];
          for (const result of settled) {
            if (result.status === "rejected") {
              rejections.push(result.reason);
              console.error("[isomorphic-git checkout] task rejected:", result.reason?.stack ?? result.reason);
            }
          }
          if (rejections.length > 0) {
            throw new MultipleGitError(rejections);
          }
        });
      }
      if (onPostCheckout) {
        await onPostCheckout({
          previousHead: oldOid,
          newHead: oid,
          type: filepaths != null && filepaths.length > 0 ? "file" : "branch"
        });
      }
    }
    if (!noUpdateHead) {
      const fullRef = await GitRefManager.expand({ fs, gitdir, ref });
      if (fullRef.startsWith("refs/heads")) {
        await GitRefManager.writeSymbolicRef({
          fs,
          gitdir,
          ref: "HEAD",
          value: fullRef
        });
      } else {
        await GitRefManager.writeRef({ fs, gitdir, ref: "HEAD", value: oid });
      }
    }
  }
  async function analyze({
    fs,
    cache,
    onProgress,
    dir,
    gitdir,
    ref,
    force,
    filepaths
  }) {
    let count = 0;
    return _walk({
      fs,
      cache,
      dir,
      gitdir,
      trees: [TREE({ ref }), WORKDIR(), STAGE()],
      map: async function(fullpath, [commit2, workdir, stage]) {
        if (fullpath === ".")
          return;
        if (filepaths && !filepaths.some((base) => worthWalking(fullpath, base))) {
          return null;
        }
        if (onProgress) {
          await onProgress({ phase: "Analyzing workdir", loaded: ++count });
        }
        const key = [!!stage, !!commit2, !!workdir].map(Number).join("");
        switch (key) {
          case "000":
            return;
          case "001":
            if (force && filepaths && filepaths.includes(fullpath)) {
              return ["delete", fullpath];
            }
            return;
          case "010": {
            switch (await commit2.type()) {
              case "tree": {
                return ["mkdir", fullpath];
              }
              case "blob": {
                return [
                  "create",
                  fullpath,
                  await commit2.oid(),
                  await commit2.mode()
                ];
              }
              case "commit": {
                return [
                  "mkdir-index",
                  fullpath,
                  await commit2.oid(),
                  await commit2.mode()
                ];
              }
              default: {
                return [
                  "error",
                  `new entry Unhandled type ${await commit2.type()}`
                ];
              }
            }
          }
          case "011": {
            switch (`${await commit2.type()}-${await workdir.type()}`) {
              case "tree-tree": {
                return;
              }
              case "tree-blob":
              case "blob-tree": {
                return ["conflict", fullpath];
              }
              case "blob-blob": {
                if (await commit2.oid() !== await workdir.oid()) {
                  if (force) {
                    return [
                      "update",
                      fullpath,
                      await commit2.oid(),
                      await commit2.mode(),
                      await commit2.mode() !== await workdir.mode()
                    ];
                  } else {
                    return ["conflict", fullpath];
                  }
                } else {
                  if (await commit2.mode() !== await workdir.mode()) {
                    if (force) {
                      return [
                        "update",
                        fullpath,
                        await commit2.oid(),
                        await commit2.mode(),
                        true
                      ];
                    } else {
                      return ["conflict", fullpath];
                    }
                  } else {
                    return [
                      "create-index",
                      fullpath,
                      await commit2.oid(),
                      await commit2.mode()
                    ];
                  }
                }
              }
              case "commit-tree": {
                return;
              }
              case "commit-blob": {
                return ["conflict", fullpath];
              }
              default: {
                return ["error", `new entry Unhandled type ${commit2.type}`];
              }
            }
          }
          case "100": {
            return ["delete-index", fullpath];
          }
          case "101": {
            switch (await stage.type()) {
              case "tree": {
                return ["rmdir-index", fullpath];
              }
              case "blob": {
                if (await stage.oid() !== await workdir.oid()) {
                  if (force) {
                    return ["delete", fullpath];
                  } else {
                    return ["conflict", fullpath];
                  }
                } else {
                  return ["delete", fullpath];
                }
              }
              case "commit": {
                return ["rmdir-index", fullpath];
              }
              default: {
                return [
                  "error",
                  `delete entry Unhandled type ${await stage.type()}`
                ];
              }
            }
          }
          case "110":
          case "111": {
            switch (`${await stage.type()}-${await commit2.type()}`) {
              case "tree-tree": {
                return;
              }
              case "blob-blob": {
                if (await stage.oid() === await commit2.oid() && await stage.mode() === await commit2.mode() && !force) {
                  return;
                }
                if (workdir) {
                  if (await workdir.oid() !== await stage.oid() && await workdir.oid() !== await commit2.oid()) {
                    if (force) {
                      return [
                        "update",
                        fullpath,
                        await commit2.oid(),
                        await commit2.mode(),
                        await commit2.mode() !== await workdir.mode()
                      ];
                    } else {
                      return ["conflict", fullpath];
                    }
                  }
                } else if (force) {
                  return [
                    "update",
                    fullpath,
                    await commit2.oid(),
                    await commit2.mode(),
                    await commit2.mode() !== await stage.mode()
                  ];
                }
                if (await commit2.mode() !== await stage.mode()) {
                  return [
                    "update",
                    fullpath,
                    await commit2.oid(),
                    await commit2.mode(),
                    true
                  ];
                }
                if (await commit2.oid() !== await stage.oid()) {
                  return [
                    "update",
                    fullpath,
                    await commit2.oid(),
                    await commit2.mode(),
                    false
                  ];
                } else {
                  return;
                }
              }
              case "tree-blob": {
                return ["update-dir-to-blob", fullpath, await commit2.oid()];
              }
              case "blob-tree": {
                return ["update-blob-to-tree", fullpath];
              }
              case "commit-commit": {
                return [
                  "mkdir-index",
                  fullpath,
                  await commit2.oid(),
                  await commit2.mode()
                ];
              }
              default: {
                return [
                  "error",
                  `update entry Unhandled type ${await stage.type()}-${await commit2.type()}`
                ];
              }
            }
          }
        }
      },
      reduce: async function(parent, children) {
        children = flat(children);
        if (!parent) {
          return children;
        } else if (parent && parent[0] === "rmdir") {
          children.push(parent);
          return children;
        } else {
          children.unshift(parent);
          return children;
        }
      }
    });
  }
  async function updateIndex({ index: index2, fullpath, stats, oid }) {
    try {
      index2.insert({
        filepath: fullpath,
        stats,
        oid
      });
    } catch (e) {
      console.warn(`Error inserting ${fullpath} into index:`, e);
    }
  }
  async function updateWorkingDir({ fs, cache, gitdir, dir }, [method, fullpath, oid, mode, chmod]) {
    const filepath = `${dir}/${fullpath}`;
    if (method !== "create-index" && method !== "mkdir-index") {
      const { object } = await _readObject({ fs, cache, gitdir, oid });
      if (chmod) {
        await fs.rm(filepath);
      }
      if (mode === 33188) {
        await fs.write(filepath, object);
      } else if (mode === 33261) {
        await fs.write(filepath, object, { mode: 511 });
      } else if (mode === 40960) {
        await fs.writelink(filepath, object);
      } else {
        throw new InternalError(`Invalid mode 0o${mode.toString(8)} detected in blob ${oid}`);
      }
    }
    const stats = await fs.lstat(filepath);
    if (mode === 33261) {
      stats.mode = 493;
    }
    if (method === "mkdir-index") {
      stats.mode = 57344;
    }
    return [fullpath, oid, stats];
  }
  async function batchAllSettled(operationName, tasks, onProgress, batchSize) {
    const results = [];
    const rejections = [];
    for (let i = 0;i < tasks.length; i += batchSize) {
      const batch = tasks.slice(i, i + batchSize).map((task) => task());
      const batchResults = await Promise.allSettled(batch);
      batchResults.forEach((result) => {
        if (result.status === "fulfilled") {
          results.push(result.value);
        } else {
          rejections.push(result.reason);
          console.error(`[isomorphic-git ${operationName}] task rejected:`, result.reason?.stack ?? result.reason);
        }
      });
      if (onProgress) {
        await onProgress({
          phase: "Updating workdir",
          loaded: i + batch.length,
          total: tasks.length
        });
      }
    }
    if (rejections.length > 0) {
      throw new MultipleGitError(rejections);
    }
    return results;
  }
  async function checkout({
    fs,
    onProgress,
    onPostCheckout,
    dir,
    gitdir = join(dir, ".git"),
    remote = "origin",
    ref: _ref,
    filepaths,
    noCheckout = false,
    noUpdateHead = _ref === undefined,
    dryRun = false,
    force = false,
    track = true,
    cache = {},
    nonBlocking = false,
    batchSize = 100
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("dir", dir);
      assertParameter("gitdir", gitdir);
      const ref = _ref || "HEAD";
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _checkout({
        fs: fsp,
        cache,
        onProgress,
        onPostCheckout,
        dir,
        gitdir: updatedGitdir,
        remote,
        ref,
        filepaths,
        noCheckout,
        noUpdateHead,
        dryRun,
        force,
        track,
        nonBlocking,
        batchSize
      });
    } catch (err) {
      err.caller = "git.checkout";
      throw err;
    }
  }
  var LINEBREAKS = /^.*(\r?\n|$)/gm;
  function mergeFile({ branches, contents }) {
    const ourName = branches[1];
    const theirName = branches[2];
    const baseContent = contents[0];
    const ourContent = contents[1];
    const theirContent = contents[2];
    const ours = ourContent.match(LINEBREAKS);
    const base = baseContent.match(LINEBREAKS);
    const theirs = theirContent.match(LINEBREAKS);
    const result = diff3Merge(ours, base, theirs);
    const markerSize = 7;
    let mergedText = "";
    let cleanMerge = true;
    for (const item of result) {
      if (item.ok) {
        mergedText += item.ok.join("");
      }
      if (item.conflict) {
        cleanMerge = false;
        mergedText += `${"<".repeat(markerSize)} ${ourName}
`;
        mergedText += item.conflict.a.join("");
        mergedText += `${"=".repeat(markerSize)}
`;
        mergedText += item.conflict.b.join("");
        mergedText += `${">".repeat(markerSize)} ${theirName}
`;
      }
    }
    return { cleanMerge, mergedText };
  }
  async function mergeTree({
    fs,
    cache,
    dir,
    gitdir = join(dir, ".git"),
    index: index2,
    ourOid,
    baseOid,
    theirOid,
    ourName = "ours",
    baseName = "base",
    theirName = "theirs",
    dryRun = false,
    abortOnConflict = true,
    mergeDriver
  }) {
    const ourTree = TREE({ ref: ourOid });
    const baseTree = TREE({ ref: baseOid });
    const theirTree = TREE({ ref: theirOid });
    const unmergedFiles = [];
    const bothModified = [];
    const deleteByUs = [];
    const deleteByTheirs = [];
    const results = await _walk({
      fs,
      cache,
      dir,
      gitdir,
      trees: [ourTree, baseTree, theirTree],
      map: async function(filepath, [ours, base, theirs]) {
        const path = basename(filepath);
        const ourChange = await modified(ours, base);
        const theirChange = await modified(theirs, base);
        switch (`${ourChange}-${theirChange}`) {
          case "false-false": {
            return {
              mode: await base.mode(),
              path,
              oid: await base.oid(),
              type: await base.type()
            };
          }
          case "false-true": {
            if (!theirs && await ours.type() === "tree") {
              return {
                mode: await ours.mode(),
                path,
                oid: await ours.oid(),
                type: await ours.type()
              };
            }
            return theirs ? {
              mode: await theirs.mode(),
              path,
              oid: await theirs.oid(),
              type: await theirs.type()
            } : undefined;
          }
          case "true-false": {
            if (!ours && await theirs.type() === "tree") {
              return {
                mode: await theirs.mode(),
                path,
                oid: await theirs.oid(),
                type: await theirs.type()
              };
            }
            return ours ? {
              mode: await ours.mode(),
              path,
              oid: await ours.oid(),
              type: await ours.type()
            } : undefined;
          }
          case "true-true": {
            if (ours && theirs && await ours.type() === "tree" && await theirs.type() === "tree") {
              return {
                mode: await ours.mode(),
                path,
                oid: await ours.oid(),
                type: "tree"
              };
            }
            if (ours && theirs && await ours.type() === "blob" && await theirs.type() === "blob") {
              return mergeBlobs({
                fs,
                gitdir,
                path,
                ours,
                base,
                theirs,
                ourName,
                baseName,
                theirName,
                mergeDriver
              }).then(async (r) => {
                if (!r.cleanMerge) {
                  unmergedFiles.push(filepath);
                  bothModified.push(filepath);
                  if (!abortOnConflict) {
                    let baseOid2 = "";
                    if (base && await base.type() === "blob") {
                      baseOid2 = await base.oid();
                    }
                    const ourOid2 = await ours.oid();
                    const theirOid2 = await theirs.oid();
                    index2.delete({ filepath });
                    if (baseOid2) {
                      index2.insert({ filepath, oid: baseOid2, stage: 1 });
                    }
                    index2.insert({ filepath, oid: ourOid2, stage: 2 });
                    index2.insert({ filepath, oid: theirOid2, stage: 3 });
                  }
                } else if (!abortOnConflict) {
                  index2.insert({ filepath, oid: r.mergeResult.oid, stage: 0 });
                }
                return r.mergeResult;
              });
            }
            if (base && !ours && theirs && await base.type() === "blob" && await theirs.type() === "blob") {
              unmergedFiles.push(filepath);
              deleteByUs.push(filepath);
              if (!abortOnConflict) {
                const baseOid2 = await base.oid();
                const theirOid2 = await theirs.oid();
                index2.delete({ filepath });
                index2.insert({ filepath, oid: baseOid2, stage: 1 });
                index2.insert({ filepath, oid: theirOid2, stage: 3 });
              }
              return {
                mode: await theirs.mode(),
                oid: await theirs.oid(),
                type: "blob",
                path
              };
            }
            if (base && ours && !theirs && await base.type() === "blob" && await ours.type() === "blob") {
              unmergedFiles.push(filepath);
              deleteByTheirs.push(filepath);
              if (!abortOnConflict) {
                const baseOid2 = await base.oid();
                const ourOid2 = await ours.oid();
                index2.delete({ filepath });
                index2.insert({ filepath, oid: baseOid2, stage: 1 });
                index2.insert({ filepath, oid: ourOid2, stage: 2 });
              }
              return {
                mode: await ours.mode(),
                oid: await ours.oid(),
                type: "blob",
                path
              };
            }
            if (base && !ours && !theirs && (await base.type() === "blob" || await base.type() === "tree")) {
              return;
            }
            throw new MergeNotSupportedError;
          }
        }
      },
      reduce: unmergedFiles.length !== 0 && (!dir || abortOnConflict) ? undefined : async (parent, children) => {
        const entries = children.filter(Boolean);
        if (!parent)
          return;
        if (parent && parent.type === "tree" && entries.length === 0 && parent.path !== ".")
          return;
        if (entries.length > 0 || parent.path === "." && entries.length === 0) {
          const tree = new GitTree(entries);
          const object = tree.toObject();
          const oid = await _writeObject({
            fs,
            gitdir,
            type: "tree",
            object,
            dryRun
          });
          parent.oid = oid;
        }
        return parent;
      }
    });
    if (unmergedFiles.length !== 0) {
      if (dir && !abortOnConflict) {
        await _walk({
          fs,
          cache,
          dir,
          gitdir,
          trees: [TREE({ ref: results.oid })],
          map: async function(filepath, [entry]) {
            const path = `${dir}/${filepath}`;
            if (await entry.type() === "blob") {
              const mode = await entry.mode();
              const content = new TextDecoder().decode(await entry.content());
              await fs.write(path, content, { mode });
            }
            return true;
          }
        });
      }
      return new MergeConflictError(unmergedFiles, bothModified, deleteByUs, deleteByTheirs);
    }
    return results.oid;
  }
  async function mergeBlobs({
    fs,
    gitdir,
    path,
    ours,
    base,
    theirs,
    ourName,
    theirName,
    baseName,
    dryRun,
    mergeDriver = mergeFile
  }) {
    const type = "blob";
    let baseMode = "100755";
    let baseOid = "";
    let baseContent = "";
    if (base && await base.type() === "blob") {
      baseMode = await base.mode();
      baseOid = await base.oid();
      baseContent = Buffer.from(await base.content()).toString("utf8");
    }
    const mode = baseMode === await ours.mode() ? await theirs.mode() : await ours.mode();
    if (await ours.oid() === await theirs.oid()) {
      return {
        cleanMerge: true,
        mergeResult: { mode, path, oid: await ours.oid(), type }
      };
    }
    if (await ours.oid() === baseOid) {
      return {
        cleanMerge: true,
        mergeResult: { mode, path, oid: await theirs.oid(), type }
      };
    }
    if (await theirs.oid() === baseOid) {
      return {
        cleanMerge: true,
        mergeResult: { mode, path, oid: await ours.oid(), type }
      };
    }
    const ourContent = Buffer.from(await ours.content()).toString("utf8");
    const theirContent = Buffer.from(await theirs.content()).toString("utf8");
    const { mergedText, cleanMerge } = await mergeDriver({
      branches: [baseName, ourName, theirName],
      contents: [baseContent, ourContent, theirContent],
      path
    });
    const oid = await _writeObject({
      fs,
      gitdir,
      type: "blob",
      object: Buffer.from(mergedText, "utf8"),
      dryRun
    });
    return { cleanMerge, mergeResult: { mode, path, oid, type } };
  }
  var _TreeMap = {
    stage: STAGE,
    workdir: WORKDIR
  };
  var lock$2;
  async function acquireLock$1(ref, callback) {
    if (lock$2 === undefined)
      lock$2 = new AsyncLock;
    return lock$2.acquire(ref, callback);
  }
  async function checkAndWriteBlob(fs, gitdir, dir, filepath, oid = null) {
    const currentFilepath = join(dir, filepath);
    const stats = await fs.lstat(currentFilepath);
    if (!stats)
      throw new NotFoundError(currentFilepath);
    if (stats.isDirectory())
      throw new InternalError(`${currentFilepath}: file expected, but found directory`);
    const objContent = oid ? await readObjectLoose({ fs, gitdir, oid }) : undefined;
    let retOid = objContent ? oid : undefined;
    if (!objContent) {
      await acquireLock$1({ fs, gitdir, currentFilepath }, async () => {
        const object = stats.isSymbolicLink() ? await fs.readlink(currentFilepath).then(posixifyPathBuffer) : await fs.read(currentFilepath);
        if (object === null)
          throw new NotFoundError(currentFilepath);
        retOid = await _writeObject({ fs, gitdir, type: "blob", object });
      });
    }
    return retOid;
  }
  async function processTreeEntries({ fs, dir, gitdir, entries }) {
    async function processTreeEntry(entry) {
      if (entry.type === "tree") {
        if (!entry.oid) {
          const children = await Promise.all(entry.children.map(processTreeEntry));
          entry.oid = await _writeTree({
            fs,
            gitdir,
            tree: children
          });
          entry.mode = 16384;
        }
      } else if (entry.type === "blob") {
        entry.oid = await checkAndWriteBlob(fs, gitdir, dir, entry.path, entry.oid);
        entry.mode = 33188;
      }
      entry.path = entry.path.split("/").pop();
      return entry;
    }
    return Promise.all(entries.map(processTreeEntry));
  }
  async function writeTreeChanges({
    fs,
    dir,
    gitdir,
    treePair
  }) {
    const isStage = treePair[1] === "stage";
    const trees = treePair.map((t) => typeof t === "string" ? _TreeMap[t]() : t);
    const changedEntries = [];
    const map = async (filepath, [head, stage]) => {
      if (filepath === "." || await GitIgnoreManager.isIgnored({ fs, dir, gitdir, filepath })) {
        return;
      }
      if (stage) {
        if (!head || await head.oid() !== await stage.oid() && await stage.oid() !== undefined) {
          changedEntries.push([head, stage]);
        }
        return {
          mode: await stage.mode(),
          path: filepath,
          oid: await stage.oid(),
          type: await stage.type()
        };
      }
    };
    const reduce = async (parent, children) => {
      children = children.filter(Boolean);
      if (!parent) {
        return children.length > 0 ? children : undefined;
      } else {
        parent.children = children;
        return parent;
      }
    };
    const iterate = async (walk2, children) => {
      const filtered = [];
      for (const child of children) {
        const [head, stage] = child;
        if (isStage) {
          if (stage) {
            if (await fs.exists(`${dir}/${stage.toString()}`)) {
              filtered.push(child);
            } else {
              changedEntries.push([null, stage]);
            }
          }
        } else if (head) {
          if (!stage) {
            changedEntries.push([head, null]);
          } else {
            filtered.push(child);
          }
        }
      }
      return filtered.length ? Promise.all(filtered.map(walk2)) : [];
    };
    const entries = await _walk({
      fs,
      cache: {},
      dir,
      gitdir,
      trees,
      map,
      reduce,
      iterate
    });
    if (changedEntries.length === 0 || entries.length === 0) {
      return null;
    }
    const processedEntries = await processTreeEntries({
      fs,
      dir,
      gitdir,
      entries
    });
    const treeEntries = processedEntries.filter(Boolean).map((entry) => ({
      mode: entry.mode,
      path: entry.path,
      oid: entry.oid,
      type: entry.type
    }));
    return _writeTree({ fs, gitdir, tree: treeEntries });
  }
  async function applyTreeChanges({
    fs,
    dir,
    gitdir,
    stashCommit,
    parentCommit,
    wasStaged
  }) {
    const dirRemoved = [];
    const stageUpdated = [];
    const ops = await _walk({
      fs,
      cache: {},
      dir,
      gitdir,
      trees: [TREE({ ref: parentCommit }), TREE({ ref: stashCommit })],
      map: async (filepath, [parent, stash2]) => {
        if (filepath === "." || await GitIgnoreManager.isIgnored({ fs, dir, gitdir, filepath })) {
          return;
        }
        const type = stash2 ? await stash2.type() : await parent.type();
        if (type !== "tree" && type !== "blob") {
          return;
        }
        if (!stash2 && parent) {
          const method = type === "tree" ? "rmdir" : "rm";
          if (type === "tree")
            dirRemoved.push(filepath);
          if (type === "blob" && wasStaged)
            stageUpdated.push({ filepath, oid: await parent.oid() });
          return { method, filepath };
        }
        const oid = await stash2.oid();
        if (!parent || await parent.oid() !== oid) {
          if (type === "tree") {
            return { method: "mkdir", filepath };
          } else {
            if (wasStaged)
              stageUpdated.push({
                filepath,
                oid,
                stats: await fs.lstat(join(dir, filepath))
              });
            return {
              method: "write",
              filepath,
              oid
            };
          }
        }
      }
    });
    await acquireLock$1({ fs, gitdir, dirRemoved, ops }, async () => {
      for (const op of ops) {
        const currentFilepath = join(dir, op.filepath);
        switch (op.method) {
          case "rmdir":
            await fs.rmdir(currentFilepath);
            break;
          case "mkdir":
            await fs.mkdir(currentFilepath);
            break;
          case "rm":
            await fs.rm(currentFilepath);
            break;
          case "write":
            if (!dirRemoved.some((removedDir) => currentFilepath.startsWith(removedDir))) {
              const { object } = await _readObject({
                fs,
                cache: {},
                gitdir,
                oid: op.oid
              });
              if (await fs.exists(currentFilepath)) {
                await fs.rm(currentFilepath);
              }
              await fs.write(currentFilepath, object);
            }
            break;
        }
      }
    });
    await GitIndexManager.acquire({ fs, gitdir, cache: {} }, async (index2) => {
      stageUpdated.forEach(({ filepath, stats, oid }) => {
        index2.insert({ filepath, stats, oid });
      });
    });
  }
  async function _cherryPick({
    fs,
    cache,
    dir,
    gitdir,
    oid,
    dryRun = false,
    noUpdateBranch = false,
    abortOnConflict = true,
    committer,
    mergeDriver
  }) {
    const { commit: cherryCommit, oid: cherryOid } = await _readCommit({
      fs,
      cache,
      gitdir,
      oid
    });
    if (cherryCommit.parent.length > 1) {
      throw new CherryPickMergeCommitError(cherryOid, cherryCommit.parent.length);
    }
    if (cherryCommit.parent.length === 0) {
      throw new CherryPickRootCommitError(cherryOid);
    }
    const currentOid = await GitRefManager.resolve({
      fs,
      gitdir,
      ref: "HEAD"
    });
    const { commit: currentCommit } = await _readCommit({
      fs,
      cache,
      gitdir,
      oid: currentOid
    });
    const cherryParentOid = cherryCommit.parent[0];
    const { commit: cherryParent } = await _readCommit({
      fs,
      cache,
      gitdir,
      oid: cherryParentOid
    });
    const mergedTreeOid = await GitIndexManager.acquire({ fs, gitdir, cache, allowUnmerged: false }, async (index2) => {
      return mergeTree({
        fs,
        cache,
        dir,
        gitdir,
        index: index2,
        ourOid: currentCommit.tree,
        baseOid: cherryParent.tree,
        theirOid: cherryCommit.tree,
        ourName: "HEAD",
        baseName: `parent of ${cherryOid.slice(0, 7)}`,
        theirName: cherryOid.slice(0, 7),
        dryRun,
        abortOnConflict,
        mergeDriver
      });
    });
    if (mergedTreeOid instanceof MergeConflictError) {
      throw mergedTreeOid;
    }
    const newOid = await _commit({
      fs,
      cache,
      gitdir,
      message: cherryCommit.message,
      tree: mergedTreeOid,
      parent: [currentOid],
      author: cherryCommit.author,
      committer,
      dryRun,
      noUpdateBranch
    });
    if (dir && !dryRun && !noUpdateBranch) {
      await applyTreeChanges({
        fs,
        dir,
        gitdir,
        stashCommit: newOid,
        parentCommit: currentOid,
        wasStaged: true
      });
    }
    return newOid;
  }
  async function cherryPick({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    cache = {},
    committer,
    dryRun = false,
    noUpdateBranch = false,
    abortOnConflict = true,
    mergeDriver
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const { commit: cherryCommit } = await _readCommit({
        fs,
        cache,
        gitdir: updatedGitdir,
        oid
      });
      if (cherryCommit.parent && cherryCommit.parent.length > 1) {
        return await _cherryPick({
          fs,
          cache,
          dir,
          gitdir: updatedGitdir,
          oid,
          dryRun,
          noUpdateBranch,
          abortOnConflict,
          committer: undefined,
          mergeDriver
        });
      }
      const normalizedCommitter = await normalizeCommitterObject({
        fs,
        gitdir: updatedGitdir,
        committer
      });
      if (!normalizedCommitter) {
        throw new MissingNameError("committer");
      }
      return await _cherryPick({
        fs,
        cache,
        dir,
        gitdir: updatedGitdir,
        oid,
        dryRun,
        noUpdateBranch,
        abortOnConflict,
        committer: normalizedCommitter,
        mergeDriver
      });
    } catch (err) {
      err.caller = "git.cherryPick";
      throw err;
    }
  }
  var abbreviateRx = /^refs\/(heads\/|tags\/|remotes\/)?(.*)/;
  function abbreviateRef(ref) {
    const match = abbreviateRx.exec(ref);
    if (match) {
      if (match[1] === "remotes/" && ref.endsWith("/HEAD")) {
        return match[2].slice(0, -5);
      } else {
        return match[2];
      }
    }
    return ref;
  }
  async function _currentBranch({
    fs,
    gitdir,
    fullname = false,
    test = false
  }) {
    const ref = await GitRefManager.resolve({
      fs,
      gitdir,
      ref: "HEAD",
      depth: 2
    });
    if (test) {
      try {
        await GitRefManager.resolve({ fs, gitdir, ref });
      } catch (_) {
        return;
      }
    }
    if (!ref.startsWith("refs/"))
      return;
    return fullname ? ref : abbreviateRef(ref);
  }
  function translateSSHtoHTTP(url) {
    url = url.replace(/^git@([^:]+):/, "https://$1/");
    url = url.replace(/^ssh:\/\//, "https://");
    return url;
  }
  function calculateBasicAuthHeader({ username = "", password = "" }) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
  }
  async function forAwait(iterable, cb) {
    const iter = getIterator(iterable);
    while (true) {
      const { value, done } = await iter.next();
      if (value)
        await cb(value);
      if (done)
        break;
    }
    if (iter.return)
      iter.return();
  }
  async function collect(iterable) {
    let size = 0;
    const buffers = [];
    await forAwait(iterable, (value) => {
      buffers.push(value);
      size += value.byteLength;
    });
    const result = new Uint8Array(size);
    let nextIndex = 0;
    for (const buffer of buffers) {
      result.set(buffer, nextIndex);
      nextIndex += buffer.byteLength;
    }
    return result;
  }
  function extractAuthFromUrl(url) {
    let userpass = url.match(/^https?:\/\/([^/]+)@/);
    if (userpass == null)
      return { url, auth: {} };
    userpass = userpass[1];
    const [username, password] = userpass.split(":");
    url = url.replace(`${userpass}@`, "");
    return { url, auth: { username, password } };
  }
  function padHex(b, n) {
    const s = n.toString(16);
    return "0".repeat(b - s.length) + s;
  }

  class GitPktLine {
    static flush() {
      return Buffer.from("0000", "utf8");
    }
    static delim() {
      return Buffer.from("0001", "utf8");
    }
    static encode(line) {
      if (typeof line === "string") {
        line = Buffer.from(line);
      }
      const length = line.length + 4;
      const hexlength = padHex(4, length);
      return Buffer.concat([Buffer.from(hexlength, "utf8"), line]);
    }
    static streamReader(stream) {
      const reader = new StreamReader(stream);
      return async function read() {
        try {
          let length = await reader.read(4);
          if (length == null)
            return true;
          length = parseInt(length.toString("utf8"), 16);
          if (length === 0)
            return null;
          if (length === 1)
            return null;
          const buffer = await reader.read(length - 4);
          if (buffer == null)
            return true;
          return buffer;
        } catch (err) {
          stream.error = err;
          return true;
        }
      };
    }
  }
  async function parseCapabilitiesV2(read) {
    const capabilities2 = {};
    let line;
    while (true) {
      line = await read();
      if (line === true)
        break;
      if (line === null)
        continue;
      line = line.toString("utf8").replace(/\n$/, "");
      const i = line.indexOf("=");
      if (i > -1) {
        const key = line.slice(0, i);
        const value = line.slice(i + 1);
        capabilities2[key] = value;
      } else {
        capabilities2[line] = true;
      }
    }
    return { protocolVersion: 2, capabilities2 };
  }
  async function parseRefsAdResponse(stream, { service }) {
    const capabilities = new Set;
    const refs = new Map;
    const symrefs = new Map;
    const read = GitPktLine.streamReader(stream);
    let lineOne = await read();
    while (lineOne === null)
      lineOne = await read();
    if (lineOne === true)
      throw new EmptyServerResponseError;
    if (lineOne.includes("version 2")) {
      return parseCapabilitiesV2(read);
    }
    if (lineOne.toString("utf8").replace(/\n$/, "") !== `# service=${service}`) {
      throw new ParseError2(`# service=${service}\\n`, lineOne.toString("utf8"));
    }
    let lineTwo = await read();
    while (lineTwo === null)
      lineTwo = await read();
    if (lineTwo === true)
      return { capabilities, refs, symrefs };
    lineTwo = lineTwo.toString("utf8");
    if (lineTwo.includes("version 2")) {
      return parseCapabilitiesV2(read);
    }
    const [firstRef, capabilitiesLine] = splitAndAssert(lineTwo, "\x00", "\\x00");
    capabilitiesLine.split(" ").map((x) => capabilities.add(x));
    if (firstRef !== "0000000000000000000000000000000000000000 capabilities^{}") {
      const [ref, name] = splitAndAssert(firstRef, " ", " ");
      refs.set(name, ref);
      while (true) {
        const line = await read();
        if (line === true)
          break;
        if (line !== null) {
          const [ref2, name2] = splitAndAssert(line.toString("utf8"), " ", " ");
          refs.set(name2, ref2);
        }
      }
    }
    for (const cap of capabilities) {
      if (cap.startsWith("symref=")) {
        const m = cap.match(/symref=([^:]+):(.*)/);
        if (m.length === 3) {
          symrefs.set(m[1], m[2]);
        }
      }
    }
    return { protocolVersion: 1, capabilities, refs, symrefs };
  }
  function splitAndAssert(line, sep, expected) {
    const split = line.trim().split(sep);
    if (split.length !== 2) {
      throw new ParseError2(`Two strings separated by '${expected}'`, line.toString("utf8"));
    }
    return split;
  }
  var corsProxify = (corsProxy, url) => corsProxy.endsWith("?") ? `${corsProxy}${url}` : `${corsProxy}/${url.replace(/^https?:\/\//, "")}`;
  var updateHeaders = (headers, auth) => {
    if (auth.username || auth.password) {
      headers.Authorization = calculateBasicAuthHeader(auth);
    }
    if (auth.headers) {
      Object.assign(headers, auth.headers);
    }
  };
  var stringifyBody = async (res) => {
    try {
      const data = Buffer.from(await collect(res.body));
      const response = data.toString("utf8");
      const preview = response.length < 256 ? response : response.slice(0, 256) + "...";
      return { preview, response, data };
    } catch (e) {
      return {};
    }
  };

  class GitRemoteHTTP {
    static async capabilities() {
      return ["discover", "connect"];
    }
    static async discover({
      http,
      onProgress,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      corsProxy,
      service,
      url: _origUrl,
      headers,
      protocolVersion
    }) {
      let { url, auth } = extractAuthFromUrl(_origUrl);
      const proxifiedURL = corsProxy ? corsProxify(corsProxy, url) : url;
      if (auth.username || auth.password) {
        headers.Authorization = calculateBasicAuthHeader(auth);
      }
      if (protocolVersion === 2) {
        headers["Git-Protocol"] = "version=2";
      }
      let res;
      let tryAgain;
      let providedAuthBefore = false;
      do {
        res = await http.request({
          onProgress,
          method: "GET",
          url: `${proxifiedURL}/info/refs?service=${service}`,
          headers
        });
        tryAgain = false;
        if (res.statusCode === 401 || res.statusCode === 203) {
          const getAuth = providedAuthBefore ? onAuthFailure : onAuth;
          if (getAuth) {
            auth = await getAuth(url, {
              ...auth,
              headers: { ...headers }
            });
            if (auth && auth.cancel) {
              throw new UserCanceledError;
            } else if (auth) {
              updateHeaders(headers, auth);
              providedAuthBefore = true;
              tryAgain = true;
            }
          }
        } else if (res.statusCode === 200 && providedAuthBefore && onAuthSuccess) {
          await onAuthSuccess(url, auth);
        }
      } while (tryAgain);
      if (res.statusCode !== 200) {
        const { response } = await stringifyBody(res);
        throw new HttpError(res.statusCode, res.statusMessage, response);
      }
      if (res.headers["content-type"] === `application/x-${service}-advertisement`) {
        const remoteHTTP = await parseRefsAdResponse(res.body, { service });
        remoteHTTP.auth = auth;
        return remoteHTTP;
      } else {
        const { preview, response, data } = await stringifyBody(res);
        try {
          const remoteHTTP = await parseRefsAdResponse([data], { service });
          remoteHTTP.auth = auth;
          return remoteHTTP;
        } catch (e) {
          throw new SmartHttpError(preview, response);
        }
      }
    }
    static async connect({
      http,
      onProgress,
      corsProxy,
      service,
      url,
      auth,
      body,
      headers
    }) {
      const urlAuth = extractAuthFromUrl(url);
      if (urlAuth)
        url = urlAuth.url;
      if (corsProxy)
        url = corsProxify(corsProxy, url);
      headers["content-type"] = `application/x-${service}-request`;
      headers.accept = `application/x-${service}-result`;
      updateHeaders(headers, auth);
      const res = await http.request({
        onProgress,
        method: "POST",
        url: `${url}/${service}`,
        body,
        headers
      });
      if (res.statusCode !== 200) {
        const { response } = stringifyBody(res);
        throw new HttpError(res.statusCode, res.statusMessage, response);
      }
      return res;
    }
  }

  class GitRemoteManager {
    static getRemoteHelperFor({ url }) {
      const remoteHelpers = new Map;
      remoteHelpers.set("http", GitRemoteHTTP);
      remoteHelpers.set("https", GitRemoteHTTP);
      const parts = parseRemoteUrl({ url });
      if (!parts) {
        throw new UrlParseError(url);
      }
      if (remoteHelpers.has(parts.transport)) {
        return remoteHelpers.get(parts.transport);
      }
      throw new UnknownTransportError(url, parts.transport, parts.transport === "ssh" ? translateSSHtoHTTP(url) : undefined);
    }
  }
  function parseRemoteUrl({ url }) {
    if (url.startsWith("git@")) {
      return {
        transport: "ssh",
        address: url
      };
    }
    const matches = url.match(/(\w+)(:\/\/|::)(.*)/);
    if (matches === null)
      return;
    if (matches[2] === "://") {
      return {
        transport: matches[1],
        address: matches[0]
      };
    }
    if (matches[2] === "::") {
      return {
        transport: matches[1],
        address: matches[3]
      };
    }
  }
  var lock$3 = null;

  class GitShallowManager {
    static async read({ fs, gitdir }) {
      if (lock$3 === null)
        lock$3 = new AsyncLock;
      const filepath = join(gitdir, "shallow");
      const oids = new Set;
      await lock$3.acquire(filepath, async function() {
        const text = await fs.read(filepath, { encoding: "utf8" });
        if (text === null)
          return oids;
        if (text.trim() === "")
          return oids;
        text.trim().split(`
`).map((oid) => oids.add(oid));
      });
      return oids;
    }
    static async write({ fs, gitdir, oids }) {
      if (lock$3 === null)
        lock$3 = new AsyncLock;
      const filepath = join(gitdir, "shallow");
      if (oids.size > 0) {
        const text = [...oids].join(`
`) + `
`;
        await lock$3.acquire(filepath, async function() {
          await fs.write(filepath, text, {
            encoding: "utf8"
          });
        });
      } else {
        await lock$3.acquire(filepath, async function() {
          await fs.rm(filepath);
        });
      }
    }
  }
  async function hasObjectLoose({ fs, gitdir, oid }) {
    const source = `objects/${oid.slice(0, 2)}/${oid.slice(2)}`;
    return fs.exists(`${gitdir}/${source}`);
  }
  async function hasObjectPacked({
    fs,
    cache,
    gitdir,
    oid,
    getExternalRefDelta
  }) {
    let list = await fs.readdir(join(gitdir, "objects/pack"));
    list = list.filter((x) => x.endsWith(".idx"));
    for (const filename of list) {
      const indexFile = `${gitdir}/objects/pack/${filename}`;
      const p = await readPackIndex({
        fs,
        cache,
        filename: indexFile,
        getExternalRefDelta
      });
      if (p.error)
        throw new InternalError(p.error);
      if (p.offsets.has(oid)) {
        return true;
      }
    }
    return false;
  }
  async function hasObject({
    fs,
    cache,
    gitdir,
    oid,
    format = "content"
  }) {
    const getExternalRefDelta = (oid2) => _readObject({ fs, cache, gitdir, oid: oid2 });
    let result = await hasObjectLoose({ fs, gitdir, oid });
    if (!result) {
      result = await hasObjectPacked({
        fs,
        cache,
        gitdir,
        oid,
        getExternalRefDelta
      });
    }
    return result;
  }
  function emptyPackfile(pack) {
    const pheader = "5041434b";
    const version2 = "00000002";
    const obCount = "00000000";
    const header = pheader + version2 + obCount;
    return pack.slice(0, 12).toString("hex") === header;
  }
  function filterCapabilities(server, client) {
    const serverNames = server.map((cap) => cap.split("=", 1)[0]);
    return client.filter((cap) => {
      const name = cap.split("=", 1)[0];
      return serverNames.includes(name);
    });
  }
  var pkg = {
    name: "isomorphic-git",
    version: "1.38.3",
    agent: "git/isomorphic-git@1.38.3"
  };

  class FIFO {
    constructor() {
      this._queue = [];
    }
    write(chunk) {
      if (this._ended) {
        throw Error("You cannot write to a FIFO that has already been ended!");
      }
      if (this._waiting) {
        const resolve = this._waiting;
        this._waiting = null;
        resolve({ value: chunk });
      } else {
        this._queue.push(chunk);
      }
    }
    end() {
      this._ended = true;
      if (this._waiting) {
        const resolve = this._waiting;
        this._waiting = null;
        resolve({ done: true });
      }
    }
    destroy(err) {
      this.error = err;
      this.end();
    }
    async next() {
      if (this._queue.length > 0) {
        return { value: this._queue.shift() };
      }
      if (this._ended) {
        return { done: true };
      }
      if (this._waiting) {
        throw Error("You cannot call read until the previous call to read has returned!");
      }
      return new Promise((resolve) => {
        this._waiting = resolve;
      });
    }
  }
  function findSplit(str) {
    const r = str.indexOf("\r");
    const n = str.indexOf(`
`);
    if (r === -1 && n === -1)
      return -1;
    if (r === -1)
      return n + 1;
    if (n === -1)
      return r + 1;
    if (n === r + 1)
      return n + 1;
    return Math.min(r, n) + 1;
  }
  function splitLines2(input) {
    const output = new FIFO;
    let tmp = "";
    (async () => {
      await forAwait(input, (chunk) => {
        chunk = chunk.toString("utf8");
        tmp += chunk;
        while (true) {
          const i = findSplit(tmp);
          if (i === -1)
            break;
          output.write(tmp.slice(0, i));
          tmp = tmp.slice(i);
        }
      });
      if (tmp.length > 0) {
        output.write(tmp);
      }
      output.end();
    })();
    return output;
  }

  class GitSideBand {
    static demux(input) {
      const read = GitPktLine.streamReader(input);
      const packetlines = new FIFO;
      const packfile = new FIFO;
      const progress = new FIFO;
      const nextBit = async function() {
        const line = await read();
        if (line === null)
          return nextBit();
        if (line === true) {
          packetlines.end();
          progress.end();
          input.error ? packfile.destroy(input.error) : packfile.end();
          return;
        }
        switch (line[0]) {
          case 1: {
            packfile.write(line.slice(1));
            break;
          }
          case 2: {
            progress.write(line.slice(1));
            break;
          }
          case 3: {
            const error3 = line.slice(1);
            progress.write(error3);
            packetlines.end();
            progress.end();
            packfile.destroy(new Error(error3.toString("utf8")));
            return;
          }
          default: {
            packetlines.write(line);
          }
        }
        nextBit();
      };
      nextBit();
      return {
        packetlines,
        packfile,
        progress
      };
    }
  }
  async function parseUploadPackResponse(stream) {
    const { packetlines, packfile, progress } = GitSideBand.demux(stream);
    const shallows = [];
    const unshallows = [];
    const acks = [];
    let nak = false;
    let done = false;
    return new Promise((resolve, reject) => {
      forAwait(packetlines, (data) => {
        const line = data.toString("utf8").trim();
        if (line.startsWith("shallow")) {
          const oid = line.slice(-41).trim();
          if (oid.length !== 40) {
            reject(new InvalidOidError(oid));
          }
          shallows.push(oid);
        } else if (line.startsWith("unshallow")) {
          const oid = line.slice(-41).trim();
          if (oid.length !== 40) {
            reject(new InvalidOidError(oid));
          }
          unshallows.push(oid);
        } else if (line.startsWith("ACK")) {
          const [, oid, status2] = line.split(" ");
          acks.push({ oid, status: status2 });
          if (!status2)
            done = true;
        } else if (line.startsWith("NAK")) {
          nak = true;
          done = true;
        } else {
          done = true;
          nak = true;
        }
        if (done) {
          stream.error ? reject(stream.error) : resolve({ shallows, unshallows, acks, nak, packfile, progress });
        }
      }).finally(() => {
        if (!done) {
          stream.error ? reject(stream.error) : resolve({ shallows, unshallows, acks, nak, packfile, progress });
        }
      });
    });
  }
  function writeUploadPackRequest({
    capabilities = [],
    wants = [],
    haves = [],
    shallows = [],
    depth = null,
    since = null,
    exclude = []
  }) {
    const packstream = [];
    wants = [...new Set(wants)];
    let firstLineCapabilities = ` ${capabilities.join(" ")}`;
    for (const oid of wants) {
      packstream.push(GitPktLine.encode(`want ${oid}${firstLineCapabilities}
`));
      firstLineCapabilities = "";
    }
    for (const oid of shallows) {
      packstream.push(GitPktLine.encode(`shallow ${oid}
`));
    }
    if (depth !== null) {
      packstream.push(GitPktLine.encode(`deepen ${depth}
`));
    }
    if (since !== null) {
      packstream.push(GitPktLine.encode(`deepen-since ${Math.floor(since.valueOf() / 1000)}
`));
    }
    for (const oid of exclude) {
      packstream.push(GitPktLine.encode(`deepen-not ${oid}
`));
    }
    packstream.push(GitPktLine.flush());
    for (const oid of haves) {
      packstream.push(GitPktLine.encode(`have ${oid}
`));
    }
    packstream.push(GitPktLine.encode(`done
`));
    return packstream;
  }
  async function _fetch({
    fs,
    cache,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    gitdir,
    ref: _ref,
    remoteRef: _remoteRef,
    remote: _remote,
    url: _url,
    corsProxy,
    depth = null,
    since = null,
    exclude = [],
    relative = false,
    tags = false,
    singleBranch = false,
    headers = {},
    prune = false,
    pruneTags = false
  }) {
    const ref = _ref || await _currentBranch({ fs, gitdir, test: true });
    const config2 = await GitConfigManager.get({ fs, gitdir });
    const remote = _remote || ref && await config2.get(`branch.${ref}.remote`) || "origin";
    const url = _url || await config2.get(`remote.${remote}.url`);
    if (typeof url === "undefined") {
      throw new MissingParameterError("remote OR url");
    }
    const remoteRef = _remoteRef || ref && await config2.get(`branch.${ref}.merge`) || _ref || "HEAD";
    if (corsProxy === undefined) {
      corsProxy = await config2.get("http.corsProxy");
    }
    const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
    const remoteHTTP = await GitRemoteHTTP2.discover({
      http,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      corsProxy,
      service: "git-upload-pack",
      url,
      headers,
      protocolVersion: 1
    });
    const auth = remoteHTTP.auth;
    const remoteRefs = remoteHTTP.refs;
    if (remoteRefs.size === 0) {
      return {
        defaultBranch: null,
        fetchHead: null,
        fetchHeadDescription: null
      };
    }
    if (depth !== null && !remoteHTTP.capabilities.has("shallow")) {
      throw new RemoteCapabilityError("shallow", "depth");
    }
    if (since !== null && !remoteHTTP.capabilities.has("deepen-since")) {
      throw new RemoteCapabilityError("deepen-since", "since");
    }
    if (exclude.length > 0 && !remoteHTTP.capabilities.has("deepen-not")) {
      throw new RemoteCapabilityError("deepen-not", "exclude");
    }
    if (relative === true && !remoteHTTP.capabilities.has("deepen-relative")) {
      throw new RemoteCapabilityError("deepen-relative", "relative");
    }
    const { oid, fullref } = GitRefManager.resolveAgainstMap({
      ref: remoteRef,
      map: remoteRefs
    });
    for (const remoteRef2 of remoteRefs.keys()) {
      if (remoteRef2 === fullref || remoteRef2 === "HEAD" || remoteRef2.startsWith("refs/heads/") || tags && remoteRef2.startsWith("refs/tags/")) {
        continue;
      }
      remoteRefs.delete(remoteRef2);
    }
    const capabilities = filterCapabilities([...remoteHTTP.capabilities], [
      "multi_ack_detailed",
      "no-done",
      "side-band-64k",
      "ofs-delta",
      `agent=${pkg.agent}`
    ]);
    if (relative)
      capabilities.push("deepen-relative");
    const wants = singleBranch ? [oid] : remoteRefs.values();
    const haveRefs = singleBranch ? [ref] : await GitRefManager.listRefs({
      fs,
      gitdir,
      filepath: `refs`
    });
    let haves = [];
    for (let ref2 of haveRefs) {
      try {
        ref2 = await GitRefManager.expand({ fs, gitdir, ref: ref2 });
        const oid2 = await GitRefManager.resolve({ fs, gitdir, ref: ref2 });
        if (await hasObject({ fs, cache, gitdir, oid: oid2 })) {
          haves.push(oid2);
        }
      } catch (err) {}
    }
    haves = [...new Set(haves)];
    const oids = await GitShallowManager.read({ fs, gitdir });
    const shallows = remoteHTTP.capabilities.has("shallow") ? [...oids] : [];
    const packstream = writeUploadPackRequest({
      capabilities,
      wants,
      haves,
      shallows,
      depth,
      since,
      exclude
    });
    const packbuffer = Buffer.from(await collect(packstream));
    const raw = await GitRemoteHTTP2.connect({
      http,
      onProgress,
      corsProxy,
      service: "git-upload-pack",
      url,
      auth,
      body: [packbuffer],
      headers
    });
    const response = await parseUploadPackResponse(raw.body);
    if (raw.headers) {
      response.headers = raw.headers;
    }
    for (const oid2 of response.shallows) {
      if (!oids.has(oid2)) {
        try {
          const { object } = await _readObject({ fs, cache, gitdir, oid: oid2 });
          const commit2 = new GitCommit(object);
          const hasParents = await Promise.all(commit2.headers().parent.map((oid3) => hasObject({ fs, cache, gitdir, oid: oid3 })));
          const haveAllParents = hasParents.length === 0 || hasParents.every((has) => has);
          if (!haveAllParents) {
            oids.add(oid2);
          }
        } catch (err) {
          oids.add(oid2);
        }
      }
    }
    for (const oid2 of response.unshallows) {
      oids.delete(oid2);
    }
    await GitShallowManager.write({ fs, gitdir, oids });
    if (singleBranch) {
      const refs = new Map([[fullref, oid]]);
      const symrefs = new Map;
      let bail = 10;
      let key = fullref;
      while (bail--) {
        const value = remoteHTTP.symrefs.get(key);
        if (value === undefined)
          break;
        symrefs.set(key, value);
        key = value;
      }
      const realRef = remoteRefs.get(key);
      if (realRef) {
        refs.set(key, realRef);
      }
      const { pruned } = await GitRefManager.updateRemoteRefs({
        fs,
        gitdir,
        remote,
        refs,
        symrefs,
        tags,
        prune
      });
      if (prune) {
        response.pruned = pruned;
      }
    } else {
      const { pruned } = await GitRefManager.updateRemoteRefs({
        fs,
        gitdir,
        remote,
        refs: remoteRefs,
        symrefs: remoteHTTP.symrefs,
        tags,
        prune,
        pruneTags
      });
      if (prune) {
        response.pruned = pruned;
      }
    }
    response.HEAD = remoteHTTP.symrefs.get("HEAD");
    if (response.HEAD === undefined) {
      const { oid: oid2 } = GitRefManager.resolveAgainstMap({
        ref: "HEAD",
        map: remoteRefs
      });
      for (const [key, value] of remoteRefs.entries()) {
        if (key !== "HEAD" && value === oid2) {
          response.HEAD = key;
          break;
        }
      }
    }
    const noun = fullref.startsWith("refs/tags") ? "tag" : "branch";
    response.FETCH_HEAD = {
      oid,
      description: `${noun} '${abbreviateRef(fullref)}' of ${url}`
    };
    if (onProgress || onMessage) {
      const lines2 = splitLines2(response.progress);
      forAwait(lines2, async (line) => {
        if (onMessage)
          await onMessage(line);
        if (onProgress) {
          const matches = line.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
          if (matches) {
            await onProgress({
              phase: matches[1].trim(),
              loaded: parseInt(matches[2], 10),
              total: parseInt(matches[3], 10)
            });
          }
        }
      });
    }
    const packfile = Buffer.from(await collect(response.packfile));
    if (raw.body.error)
      throw raw.body.error;
    const packfileSha = packfile.slice(-20).toString("hex");
    const res = {
      defaultBranch: response.HEAD,
      fetchHead: response.FETCH_HEAD.oid,
      fetchHeadDescription: response.FETCH_HEAD.description
    };
    if (response.headers) {
      res.headers = response.headers;
    }
    if (prune) {
      res.pruned = response.pruned;
    }
    if (packfileSha !== "" && !emptyPackfile(packfile)) {
      res.packfile = `objects/pack/pack-${packfileSha}.pack`;
      const fullpath = join(gitdir, res.packfile);
      await fs.write(fullpath, packfile);
      const getExternalRefDelta = (oid2) => _readObject({ fs, cache, gitdir, oid: oid2 });
      const idx = await GitPackIndex.fromPack({
        pack: packfile,
        getExternalRefDelta,
        onProgress
      });
      await fs.write(fullpath.replace(/\.pack$/, ".idx"), await idx.toBuffer());
    }
    return res;
  }
  async function _init({
    fs,
    bare = false,
    dir,
    gitdir = bare ? dir : join(dir, ".git"),
    defaultBranch = "master"
  }) {
    if (await fs.exists(gitdir + "/config"))
      return;
    let folders = [
      "hooks",
      "info",
      "objects/info",
      "objects/pack",
      "refs/heads",
      "refs/tags"
    ];
    folders = folders.map((dir2) => gitdir + "/" + dir2);
    for (const folder of folders) {
      await fs.mkdir(folder);
    }
    await fs.write(gitdir + "/config", `[core]
` + `	repositoryformatversion = 0
` + `	filemode = false
` + `	bare = ${bare}
` + (bare ? "" : `	logallrefupdates = true
`) + `	symlinks = false
` + `	ignorecase = true
`);
    await fs.write(gitdir + "/HEAD", `ref: refs/heads/${defaultBranch}
`);
  }
  async function _clone({
    fs,
    cache,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    onPostCheckout,
    dir,
    gitdir,
    url,
    corsProxy,
    ref,
    remote,
    depth,
    since,
    exclude,
    relative,
    singleBranch,
    noCheckout,
    noTags,
    headers,
    nonBlocking,
    batchSize = 100
  }) {
    try {
      await _init({ fs, gitdir });
      await _addRemote({ fs, gitdir, remote, url, force: false });
      if (corsProxy) {
        const config2 = await GitConfigManager.get({ fs, gitdir });
        await config2.set(`http.corsProxy`, corsProxy);
        await GitConfigManager.save({ fs, gitdir, config: config2 });
      }
      const { defaultBranch, fetchHead } = await _fetch({
        fs,
        cache,
        http,
        onProgress,
        onMessage,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        gitdir,
        ref,
        remote,
        corsProxy,
        depth,
        since,
        exclude,
        relative,
        singleBranch,
        headers,
        tags: !noTags
      });
      if (fetchHead === null)
        return;
      ref = ref || defaultBranch;
      ref = ref.replace("refs/heads/", "");
      await _checkout({
        fs,
        cache,
        onProgress,
        onPostCheckout,
        dir,
        gitdir,
        ref,
        remote,
        noCheckout,
        nonBlocking,
        batchSize
      });
    } catch (err) {
      await fs.rmdir(gitdir, { recursive: true, maxRetries: 10 }).catch(() => {
        return;
      });
      throw err;
    }
  }
  async function clone({
    fs,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    onPostCheckout,
    dir,
    gitdir = join(dir, ".git"),
    url,
    corsProxy = undefined,
    ref = undefined,
    remote = "origin",
    depth = undefined,
    since = undefined,
    exclude = [],
    relative = false,
    singleBranch = false,
    noCheckout = false,
    noTags = false,
    headers = {},
    cache = {},
    nonBlocking = false,
    batchSize = 100
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("http", http);
      assertParameter("gitdir", gitdir);
      if (!noCheckout) {
        assertParameter("dir", dir);
      }
      assertParameter("url", url);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _clone({
        fs: fsp,
        cache,
        http,
        onProgress,
        onMessage,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        onPostCheckout,
        dir,
        gitdir: updatedGitdir,
        url,
        corsProxy,
        ref,
        remote,
        depth,
        since,
        exclude,
        relative,
        singleBranch,
        noCheckout,
        noTags,
        headers,
        nonBlocking,
        batchSize
      });
    } catch (err) {
      err.caller = "git.clone";
      throw err;
    }
  }
  async function commit({
    fs: _fs,
    onSign,
    dir,
    gitdir = join(dir, ".git"),
    message,
    author,
    committer,
    signingKey,
    amend = false,
    dryRun = false,
    noUpdateBranch = false,
    ref,
    parent,
    tree,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      if (!amend) {
        assertParameter("message", message);
      }
      if (signingKey) {
        assertParameter("onSign", onSign);
      }
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      return await _commit({
        fs,
        cache,
        onSign,
        gitdir: updatedGitdir,
        message,
        author,
        committer,
        signingKey,
        amend,
        dryRun,
        noUpdateBranch,
        ref,
        parent,
        tree
      });
    } catch (err) {
      err.caller = "git.commit";
      throw err;
    }
  }
  async function currentBranch({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    fullname = false,
    test = false
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _currentBranch({
        fs: fsp,
        gitdir: updatedGitdir,
        fullname,
        test
      });
    } catch (err) {
      err.caller = "git.currentBranch";
      throw err;
    }
  }
  async function _deleteBranch({ fs, gitdir, ref }) {
    ref = ref.startsWith("refs/heads/") ? ref : `refs/heads/${ref}`;
    const exist = await GitRefManager.exists({ fs, gitdir, ref });
    if (!exist) {
      throw new NotFoundError(ref);
    }
    const fullRef = await GitRefManager.expand({ fs, gitdir, ref });
    const currentRef = await _currentBranch({ fs, gitdir, fullname: true });
    if (fullRef === currentRef) {
      const value = await GitRefManager.resolve({ fs, gitdir, ref: fullRef });
      await GitRefManager.writeRef({ fs, gitdir, ref: "HEAD", value });
    }
    await GitRefManager.deleteRef({ fs, gitdir, ref: fullRef });
    const abbrevRef = abbreviateRef(ref);
    const config2 = await GitConfigManager.get({ fs, gitdir });
    await config2.deleteSection("branch", abbrevRef);
    await GitConfigManager.save({ fs, gitdir, config: config2 });
  }
  async function deleteBranch({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    ref
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _deleteBranch({
        fs: fsp,
        gitdir: updatedGitdir,
        ref
      });
    } catch (err) {
      err.caller = "git.deleteBranch";
      throw err;
    }
  }
  async function deleteRef({ fs, dir, gitdir = join(dir, ".git"), ref }) {
    try {
      assertParameter("fs", fs);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      await GitRefManager.deleteRef({ fs: fsp, gitdir: updatedGitdir, ref });
    } catch (err) {
      err.caller = "git.deleteRef";
      throw err;
    }
  }
  async function _deleteRemote({ fs, gitdir, remote }) {
    const config2 = await GitConfigManager.get({ fs, gitdir });
    await config2.deleteSection("remote", remote);
    await GitConfigManager.save({ fs, gitdir, config: config2 });
  }
  async function deleteRemote({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    remote
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("remote", remote);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _deleteRemote({
        fs: fsp,
        gitdir: updatedGitdir,
        remote
      });
    } catch (err) {
      err.caller = "git.deleteRemote";
      throw err;
    }
  }
  async function _deleteTag({ fs, gitdir, ref }) {
    ref = ref.startsWith("refs/tags/") ? ref : `refs/tags/${ref}`;
    await GitRefManager.deleteRef({ fs, gitdir, ref });
  }
  async function deleteTag({ fs, dir, gitdir = join(dir, ".git"), ref }) {
    try {
      assertParameter("fs", fs);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _deleteTag({
        fs: fsp,
        gitdir: updatedGitdir,
        ref
      });
    } catch (err) {
      err.caller = "git.deleteTag";
      throw err;
    }
  }
  async function expandOidLoose({ fs, gitdir, oid: short }) {
    const prefix = short.slice(0, 2);
    const objectsSuffixes = await fs.readdir(`${gitdir}/objects/${prefix}`);
    return objectsSuffixes.map((suffix) => `${prefix}${suffix}`).filter((_oid) => _oid.startsWith(short));
  }
  async function expandOidPacked({
    fs,
    cache,
    gitdir,
    oid: short,
    getExternalRefDelta
  }) {
    const results = [];
    let list = await fs.readdir(join(gitdir, "objects/pack"));
    list = list.filter((x) => x.endsWith(".idx"));
    for (const filename of list) {
      const indexFile = `${gitdir}/objects/pack/${filename}`;
      const p = await readPackIndex({
        fs,
        cache,
        filename: indexFile,
        getExternalRefDelta
      });
      if (p.error)
        throw new InternalError(p.error);
      for (const oid of p.offsets.keys()) {
        if (oid.startsWith(short))
          results.push(oid);
      }
    }
    return results;
  }
  async function _expandOid({ fs, cache, gitdir, oid: short }) {
    const getExternalRefDelta = (oid) => _readObject({ fs, cache, gitdir, oid });
    const results = await expandOidLoose({ fs, gitdir, oid: short });
    const packedOids = await expandOidPacked({
      fs,
      cache,
      gitdir,
      oid: short,
      getExternalRefDelta
    });
    for (const packedOid of packedOids) {
      if (results.indexOf(packedOid) === -1) {
        results.push(packedOid);
      }
    }
    if (results.length === 1) {
      return results[0];
    }
    if (results.length > 1) {
      throw new AmbiguousError("oids", short, results);
    }
    throw new NotFoundError(`an object matching "${short}"`);
  }
  async function expandOid({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _expandOid({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oid
      });
    } catch (err) {
      err.caller = "git.expandOid";
      throw err;
    }
  }
  async function expandRef({ fs, dir, gitdir = join(dir, ".git"), ref }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await GitRefManager.expand({
        fs: fsp,
        gitdir: updatedGitdir,
        ref
      });
    } catch (err) {
      err.caller = "git.expandRef";
      throw err;
    }
  }
  async function _findMergeBase({ fs, cache, gitdir, oids }) {
    const visits = {};
    const passes = oids.length;
    let heads = oids.map((oid, index2) => ({ index: index2, oid }));
    while (heads.length) {
      const result = new Set;
      for (const { oid, index: index2 } of heads) {
        if (!visits[oid])
          visits[oid] = new Set;
        visits[oid].add(index2);
        if (visits[oid].size === passes) {
          result.add(oid);
        }
      }
      if (result.size > 0) {
        return [...result];
      }
      const newheads = new Map;
      for (const { oid, index: index2 } of heads) {
        try {
          const { object } = await _readObject({ fs, cache, gitdir, oid });
          const commit2 = GitCommit.from(object);
          const { parent } = commit2.parseHeaders();
          for (const oid2 of parent) {
            if (!visits[oid2] || !visits[oid2].has(index2)) {
              newheads.set(oid2 + ":" + index2, { oid: oid2, index: index2 });
            }
          }
        } catch (err) {}
      }
      heads = Array.from(newheads.values());
    }
    return [];
  }
  async function _merge({
    fs,
    cache,
    dir,
    gitdir,
    ours,
    theirs,
    fastForward: fastForward2 = true,
    fastForwardOnly = false,
    dryRun = false,
    noUpdateBranch = false,
    abortOnConflict = true,
    message,
    author,
    committer,
    signingKey,
    onSign,
    mergeDriver,
    allowUnrelatedHistories = false
  }) {
    if (ours === undefined) {
      ours = await _currentBranch({ fs, gitdir, fullname: true });
    }
    ours = await GitRefManager.expand({
      fs,
      gitdir,
      ref: ours
    });
    theirs = await GitRefManager.expand({
      fs,
      gitdir,
      ref: theirs
    });
    const ourOid = await GitRefManager.resolve({
      fs,
      gitdir,
      ref: ours
    });
    const theirOid = await GitRefManager.resolve({
      fs,
      gitdir,
      ref: theirs
    });
    const baseOids = await _findMergeBase({
      fs,
      cache,
      gitdir,
      oids: [ourOid, theirOid]
    });
    if (baseOids.length !== 1) {
      if (baseOids.length === 0 && allowUnrelatedHistories) {
        baseOids.push("4b825dc642cb6eb9a060e54bf8d69288fbee4904");
      } else {
        throw new MergeNotSupportedError;
      }
    }
    const baseOid = baseOids[0];
    if (baseOid === theirOid) {
      return {
        oid: ourOid,
        alreadyMerged: true
      };
    }
    if (fastForward2 && baseOid === ourOid) {
      if (!dryRun && !noUpdateBranch) {
        await GitRefManager.writeRef({ fs, gitdir, ref: ours, value: theirOid });
      }
      return {
        oid: theirOid,
        fastForward: true
      };
    } else {
      if (fastForwardOnly) {
        throw new FastForwardError;
      }
      const tree = await GitIndexManager.acquire({ fs, gitdir, cache, allowUnmerged: false }, async (index2) => {
        return mergeTree({
          fs,
          cache,
          dir,
          gitdir,
          index: index2,
          ourOid,
          theirOid,
          baseOid,
          ourName: abbreviateRef(ours),
          baseName: "base",
          theirName: abbreviateRef(theirs),
          dryRun,
          abortOnConflict,
          mergeDriver
        });
      });
      if (tree instanceof MergeConflictError)
        throw tree;
      if (!message) {
        message = `Merge branch '${abbreviateRef(theirs)}' into ${abbreviateRef(ours)}`;
      }
      const oid = await _commit({
        fs,
        cache,
        gitdir,
        message,
        ref: ours,
        tree,
        parent: [ourOid, theirOid],
        author,
        committer,
        signingKey,
        onSign,
        dryRun,
        noUpdateBranch
      });
      return {
        oid,
        tree,
        mergeCommit: true
      };
    }
  }
  async function _pull({
    fs,
    cache,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    dir,
    gitdir,
    ref,
    url,
    remote,
    remoteRef,
    prune,
    pruneTags,
    fastForward: fastForward2,
    fastForwardOnly,
    corsProxy,
    singleBranch,
    headers,
    author,
    committer,
    signingKey
  }) {
    try {
      if (!ref) {
        const head = await _currentBranch({ fs, gitdir });
        if (!head) {
          throw new MissingParameterError("ref");
        }
        ref = head;
      }
      const { fetchHead, fetchHeadDescription } = await _fetch({
        fs,
        cache,
        http,
        onProgress,
        onMessage,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        gitdir,
        corsProxy,
        ref,
        url,
        remote,
        remoteRef,
        singleBranch,
        headers,
        prune,
        pruneTags
      });
      await _merge({
        fs,
        cache,
        gitdir,
        ours: ref,
        theirs: fetchHead,
        fastForward: fastForward2,
        fastForwardOnly,
        message: `Merge ${fetchHeadDescription}`,
        author,
        committer,
        signingKey,
        dryRun: false,
        noUpdateBranch: false
      });
      await _checkout({
        fs,
        cache,
        onProgress,
        dir,
        gitdir,
        ref,
        remote,
        noCheckout: false
      });
    } catch (err) {
      err.caller = "git.pull";
      throw err;
    }
  }
  async function fastForward({
    fs,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    url,
    remote,
    remoteRef,
    corsProxy,
    singleBranch,
    headers = {},
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("http", http);
      assertParameter("gitdir", gitdir);
      const thisWillNotBeUsed = {
        name: "",
        email: "",
        timestamp: Date.now(),
        timezoneOffset: 0
      };
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _pull({
        fs: fsp,
        cache,
        http,
        onProgress,
        onMessage,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        dir,
        gitdir: updatedGitdir,
        ref,
        url,
        remote,
        remoteRef,
        fastForwardOnly: true,
        corsProxy,
        singleBranch,
        headers,
        author: thisWillNotBeUsed,
        committer: thisWillNotBeUsed
      });
    } catch (err) {
      err.caller = "git.fastForward";
      throw err;
    }
  }
  async function fetch({
    fs,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    remote,
    remoteRef,
    url,
    corsProxy,
    depth = null,
    since = null,
    exclude = [],
    relative = false,
    tags = false,
    singleBranch = false,
    headers = {},
    prune = false,
    pruneTags = false,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("http", http);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _fetch({
        fs: fsp,
        cache,
        http,
        onProgress,
        onMessage,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        gitdir: updatedGitdir,
        ref,
        remote,
        remoteRef,
        url,
        corsProxy,
        depth,
        since,
        exclude,
        relative,
        tags,
        singleBranch,
        headers,
        prune,
        pruneTags
      });
    } catch (err) {
      err.caller = "git.fetch";
      throw err;
    }
  }
  async function findMergeBase({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oids,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oids", oids);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _findMergeBase({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oids
      });
    } catch (err) {
      err.caller = "git.findMergeBase";
      throw err;
    }
  }
  async function _findRoot({ fs, filepath }) {
    if (await fs.exists(join(filepath, ".git"))) {
      return filepath;
    } else {
      const parent = dirname(filepath);
      if (parent === filepath) {
        throw new NotFoundError(`git root for ${filepath}`);
      }
      return _findRoot({ fs, filepath: parent });
    }
  }
  async function findRoot({ fs, filepath }) {
    try {
      assertParameter("fs", fs);
      assertParameter("filepath", filepath);
      return await _findRoot({ fs: new FileSystem(fs), filepath });
    } catch (err) {
      err.caller = "git.findRoot";
      throw err;
    }
  }
  async function getConfig({ fs, dir, gitdir = join(dir, ".git"), path }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("path", path);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _getConfig({
        fs: fsp,
        gitdir: updatedGitdir,
        path
      });
    } catch (err) {
      err.caller = "git.getConfig";
      throw err;
    }
  }
  async function _getConfigAll({ fs, gitdir, path }) {
    const config2 = await GitConfigManager.get({ fs, gitdir });
    return config2.getall(path);
  }
  async function getConfigAll({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    path
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("path", path);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _getConfigAll({
        fs: fsp,
        gitdir: updatedGitdir,
        path
      });
    } catch (err) {
      err.caller = "git.getConfigAll";
      throw err;
    }
  }
  async function getRemoteInfo({
    http,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    corsProxy,
    url,
    headers = {},
    forPush = false
  }) {
    try {
      assertParameter("http", http);
      assertParameter("url", url);
      const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
      const remote = await GitRemoteHTTP2.discover({
        http,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        corsProxy,
        service: forPush ? "git-receive-pack" : "git-upload-pack",
        url,
        headers,
        protocolVersion: 1
      });
      const result = {
        capabilities: [...remote.capabilities]
      };
      for (const [ref, oid] of remote.refs) {
        const parts = ref.split("/");
        const last = parts.pop();
        let o = result;
        for (const part of parts) {
          o[part] = o[part] || {};
          o = o[part];
        }
        o[last] = oid;
      }
      for (const [symref, ref] of remote.symrefs) {
        const parts = symref.split("/");
        const last = parts.pop();
        let o = result;
        for (const part of parts) {
          o[part] = o[part] || {};
          o = o[part];
        }
        o[last] = ref;
      }
      return result;
    } catch (err) {
      err.caller = "git.getRemoteInfo";
      throw err;
    }
  }
  function formatInfoRefs(remote, prefix, symrefs, peelTags) {
    const refs = [];
    for (const [key, value] of remote.refs) {
      if (prefix && !key.startsWith(prefix))
        continue;
      if (key.endsWith("^{}")) {
        if (peelTags) {
          const _key = key.replace("^{}", "");
          const last = refs[refs.length - 1];
          const r = last.ref === _key ? last : refs.find((x) => x.ref === _key);
          if (r === undefined) {
            throw new Error("I did not expect this to happen");
          }
          r.peeled = value;
        }
        continue;
      }
      const ref = { ref: key, oid: value };
      if (symrefs) {
        if (remote.symrefs.has(key)) {
          ref.target = remote.symrefs.get(key);
        }
      }
      refs.push(ref);
    }
    return refs;
  }
  async function getRemoteInfo2({
    http,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    corsProxy,
    url,
    headers = {},
    forPush = false,
    protocolVersion = 2
  }) {
    try {
      assertParameter("http", http);
      assertParameter("url", url);
      const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
      const remote = await GitRemoteHTTP2.discover({
        http,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        corsProxy,
        service: forPush ? "git-receive-pack" : "git-upload-pack",
        url,
        headers,
        protocolVersion
      });
      if (remote.protocolVersion === 2) {
        return {
          protocolVersion: remote.protocolVersion,
          capabilities: remote.capabilities2
        };
      }
      const capabilities = {};
      for (const cap of remote.capabilities) {
        const [key, value] = cap.split("=");
        if (value) {
          capabilities[key] = value;
        } else {
          capabilities[key] = true;
        }
      }
      return {
        protocolVersion: 1,
        capabilities,
        refs: formatInfoRefs(remote, undefined, true, true)
      };
    } catch (err) {
      err.caller = "git.getRemoteInfo2";
      throw err;
    }
  }
  async function hashObject({
    type,
    object,
    format = "content",
    oid = undefined
  }) {
    if (format !== "deflated") {
      if (format !== "wrapped") {
        object = GitObject.wrap({ type, object });
      }
      oid = await shasum(object);
    }
    return { oid, object };
  }
  async function hashBlob({ object }) {
    try {
      assertParameter("object", object);
      if (typeof object === "string") {
        object = Buffer.from(object, "utf8");
      } else if (!(object instanceof Uint8Array)) {
        object = new Uint8Array(object);
      }
      const type = "blob";
      const { oid, object: _object } = await hashObject({
        type,
        format: "content",
        object
      });
      return { oid, type, object: _object, format: "wrapped" };
    } catch (err) {
      err.caller = "git.hashBlob";
      throw err;
    }
  }
  async function _indexPack({
    fs,
    cache,
    onProgress,
    dir,
    gitdir,
    filepath
  }) {
    try {
      filepath = join(dir, filepath);
      const pack = await fs.read(filepath);
      const getExternalRefDelta = (oid) => _readObject({ fs, cache, gitdir, oid });
      const idx = await GitPackIndex.fromPack({
        pack,
        getExternalRefDelta,
        onProgress
      });
      await fs.write(filepath.replace(/\.pack$/, ".idx"), await idx.toBuffer());
      return {
        oids: [...idx.hashes]
      };
    } catch (err) {
      err.caller = "git.indexPack";
      throw err;
    }
  }
  async function indexPack({
    fs,
    onProgress,
    dir,
    gitdir = join(dir, ".git"),
    filepath,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("dir", dir);
      assertParameter("gitdir", dir);
      assertParameter("filepath", filepath);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _indexPack({
        fs: fsp,
        cache,
        onProgress,
        dir,
        gitdir: updatedGitdir,
        filepath
      });
    } catch (err) {
      err.caller = "git.indexPack";
      throw err;
    }
  }
  async function init({
    fs,
    bare = false,
    dir,
    gitdir = bare ? dir : join(dir, ".git"),
    defaultBranch = "master"
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      if (!bare) {
        assertParameter("dir", dir);
      }
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _init({
        fs: fsp,
        bare,
        dir,
        gitdir: updatedGitdir,
        defaultBranch
      });
    } catch (err) {
      err.caller = "git.init";
      throw err;
    }
  }
  async function _isDescendent({
    fs,
    cache,
    gitdir,
    oid,
    ancestor,
    depth
  }) {
    const shallows = await GitShallowManager.read({ fs, gitdir });
    if (!oid) {
      throw new MissingParameterError("oid");
    }
    if (!ancestor) {
      throw new MissingParameterError("ancestor");
    }
    if (oid === ancestor)
      return false;
    const queue = [oid];
    const visited = new Set;
    let searchdepth = 0;
    while (queue.length) {
      if (searchdepth++ === depth) {
        throw new MaxDepthError(depth);
      }
      const oid2 = queue.shift();
      const { type, object } = await _readObject({
        fs,
        cache,
        gitdir,
        oid: oid2
      });
      if (type !== "commit") {
        throw new ObjectTypeError(oid2, type, "commit");
      }
      const commit2 = GitCommit.from(object).parse();
      for (const parent of commit2.parent) {
        if (parent === ancestor)
          return true;
      }
      if (!shallows.has(oid2)) {
        for (const parent of commit2.parent) {
          if (!visited.has(parent)) {
            queue.push(parent);
            visited.add(parent);
          }
        }
      }
    }
    return false;
  }
  async function isDescendent({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    ancestor,
    depth = -1,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      assertParameter("ancestor", ancestor);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _isDescendent({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oid,
        ancestor,
        depth
      });
    } catch (err) {
      err.caller = "git.isDescendent";
      throw err;
    }
  }
  async function isIgnored({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    filepath
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("dir", dir);
      assertParameter("gitdir", gitdir);
      assertParameter("filepath", filepath);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return GitIgnoreManager.isIgnored({
        fs: fsp,
        dir,
        gitdir: updatedGitdir,
        filepath
      });
    } catch (err) {
      err.caller = "git.isIgnored";
      throw err;
    }
  }
  async function listBranches({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    remote
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return GitRefManager.listBranches({
        fs: fsp,
        gitdir: updatedGitdir,
        remote
      });
    } catch (err) {
      err.caller = "git.listBranches";
      throw err;
    }
  }
  async function _listFiles({ fs, gitdir, ref, cache }) {
    if (ref) {
      const oid = await GitRefManager.resolve({ gitdir, fs, ref });
      const filenames = [];
      await accumulateFilesFromOid({
        fs,
        cache,
        gitdir,
        oid,
        filenames,
        prefix: ""
      });
      return filenames;
    } else {
      return GitIndexManager.acquire({ fs, gitdir, cache }, async function(index2) {
        return index2.entries.map((x) => x.path);
      });
    }
  }
  async function accumulateFilesFromOid({
    fs,
    cache,
    gitdir,
    oid,
    filenames,
    prefix
  }) {
    const { tree } = await _readTree({ fs, cache, gitdir, oid });
    for (const entry of tree) {
      if (entry.type === "tree") {
        await accumulateFilesFromOid({
          fs,
          cache,
          gitdir,
          oid: entry.oid,
          filenames,
          prefix: join(prefix, entry.path)
        });
      } else {
        filenames.push(join(prefix, entry.path));
      }
    }
  }
  async function listFiles({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _listFiles({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        ref
      });
    } catch (err) {
      err.caller = "git.listFiles";
      throw err;
    }
  }
  async function _listNotes({ fs, cache, gitdir, ref }) {
    let parent;
    try {
      parent = await GitRefManager.resolve({ gitdir, fs, ref });
    } catch (err) {
      if (err instanceof NotFoundError) {
        return [];
      }
    }
    const result = await _readTree({
      fs,
      cache,
      gitdir,
      oid: parent
    });
    const notes = result.tree.map((entry) => ({
      target: entry.path,
      note: entry.oid
    }));
    return notes;
  }
  async function listNotes({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    ref = "refs/notes/commits",
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _listNotes({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        ref
      });
    } catch (err) {
      err.caller = "git.listNotes";
      throw err;
    }
  }
  async function listRefs({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    filepath
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return GitRefManager.listRefs({ fs: fsp, gitdir: updatedGitdir, filepath });
    } catch (err) {
      err.caller = "git.listRefs";
      throw err;
    }
  }
  async function _listRemotes({ fs, gitdir }) {
    const config2 = await GitConfigManager.get({ fs, gitdir });
    const remoteNames = await config2.getSubsections("remote");
    const remotes = Promise.all(remoteNames.map(async (remote) => {
      const url = await config2.get(`remote.${remote}.url`);
      return { remote, url };
    }));
    return remotes;
  }
  async function listRemotes({ fs, dir, gitdir = join(dir, ".git") }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _listRemotes({
        fs: fsp,
        gitdir: updatedGitdir
      });
    } catch (err) {
      err.caller = "git.listRemotes";
      throw err;
    }
  }
  async function parseListRefsResponse(stream) {
    const read = GitPktLine.streamReader(stream);
    const refs = [];
    let line;
    while (true) {
      line = await read();
      if (line === true)
        break;
      if (line === null)
        continue;
      line = line.toString("utf8").replace(/\n$/, "");
      const [oid, ref, ...attrs] = line.split(" ");
      const r = { ref, oid };
      for (const attr of attrs) {
        const [name, value] = attr.split(":");
        if (name === "symref-target") {
          r.target = value;
        } else if (name === "peeled") {
          r.peeled = value;
        }
      }
      refs.push(r);
    }
    return refs;
  }
  async function writeListRefsRequest({ prefix, symrefs, peelTags }) {
    const packstream = [];
    packstream.push(GitPktLine.encode(`command=ls-refs
`));
    packstream.push(GitPktLine.encode(`agent=${pkg.agent}
`));
    if (peelTags || symrefs || prefix) {
      packstream.push(GitPktLine.delim());
    }
    if (peelTags)
      packstream.push(GitPktLine.encode("peel"));
    if (symrefs)
      packstream.push(GitPktLine.encode("symrefs"));
    if (prefix)
      packstream.push(GitPktLine.encode(`ref-prefix ${prefix}`));
    packstream.push(GitPktLine.flush());
    return packstream;
  }
  async function listServerRefs({
    http,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    corsProxy,
    url,
    headers = {},
    forPush = false,
    protocolVersion = 2,
    prefix,
    symrefs,
    peelTags
  }) {
    try {
      assertParameter("http", http);
      assertParameter("url", url);
      const remote = await GitRemoteHTTP.discover({
        http,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        corsProxy,
        service: forPush ? "git-receive-pack" : "git-upload-pack",
        url,
        headers,
        protocolVersion
      });
      if (remote.protocolVersion === 1) {
        return formatInfoRefs(remote, prefix, symrefs, peelTags);
      }
      const body = await writeListRefsRequest({ prefix, symrefs, peelTags });
      const res = await GitRemoteHTTP.connect({
        http,
        auth: remote.auth,
        headers,
        corsProxy,
        service: forPush ? "git-receive-pack" : "git-upload-pack",
        url,
        body
      });
      return parseListRefsResponse(res.body);
    } catch (err) {
      err.caller = "git.listServerRefs";
      throw err;
    }
  }
  async function listTags({ fs, dir, gitdir = join(dir, ".git") }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return GitRefManager.listTags({ fs: fsp, gitdir: updatedGitdir });
    } catch (err) {
      err.caller = "git.listTags";
      throw err;
    }
  }
  function compareAge(a, b) {
    return a.committer.timestamp - b.committer.timestamp;
  }
  var EMPTY_OID = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
  async function resolveFileIdInTree({ fs, cache, gitdir, oid, fileId }) {
    if (fileId === EMPTY_OID)
      return;
    const _oid = oid;
    let filepath;
    const result = await resolveTree({ fs, cache, gitdir, oid });
    const tree = result.tree;
    if (fileId === result.oid) {
      filepath = result.path;
    } else {
      filepath = await _resolveFileId({
        fs,
        cache,
        gitdir,
        tree,
        fileId,
        oid: _oid
      });
      if (Array.isArray(filepath)) {
        if (filepath.length === 0)
          filepath = undefined;
        else if (filepath.length === 1)
          filepath = filepath[0];
      }
    }
    return filepath;
  }
  async function _resolveFileId({
    fs,
    cache,
    gitdir,
    tree,
    fileId,
    oid,
    filepaths = [],
    parentPath = ""
  }) {
    const walks = tree.entries().map(function(entry) {
      let result;
      if (entry.oid === fileId) {
        result = join(parentPath, entry.path);
        filepaths.push(result);
      } else if (entry.type === "tree") {
        result = _readObject({
          fs,
          cache,
          gitdir,
          oid: entry.oid
        }).then(function({ object }) {
          return _resolveFileId({
            fs,
            cache,
            gitdir,
            tree: GitTree.from(object),
            fileId,
            oid,
            filepaths,
            parentPath: join(parentPath, entry.path)
          });
        });
      }
      return result;
    });
    await Promise.all(walks);
    return filepaths;
  }
  async function _log({
    fs,
    cache,
    gitdir,
    filepath,
    ref,
    depth,
    since,
    force,
    follow
  }) {
    const sinceTimestamp = typeof since === "undefined" ? undefined : Math.floor(since.valueOf() / 1000);
    const commits = [];
    const shallowCommits = await GitShallowManager.read({ fs, gitdir });
    const oid = await GitRefManager.resolve({ fs, gitdir, ref });
    const tips = [await _readCommit({ fs, cache, gitdir, oid })];
    let lastFileOid;
    let lastCommit;
    let isOk;
    function endCommit(commit2) {
      if (isOk && filepath)
        commits.push(commit2);
    }
    while (tips.length > 0) {
      const commit2 = tips.pop();
      if (sinceTimestamp !== undefined && commit2.commit.committer.timestamp <= sinceTimestamp) {
        break;
      }
      if (filepath) {
        let vFileOid;
        try {
          vFileOid = await resolveFilepath({
            fs,
            cache,
            gitdir,
            oid: commit2.commit.tree,
            filepath
          });
          if (lastCommit && lastFileOid !== vFileOid) {
            commits.push(lastCommit);
          }
          lastFileOid = vFileOid;
          lastCommit = commit2;
          isOk = true;
        } catch (e) {
          if (e instanceof NotFoundError) {
            let found = follow && lastFileOid;
            if (found) {
              found = await resolveFileIdInTree({
                fs,
                cache,
                gitdir,
                oid: commit2.commit.tree,
                fileId: lastFileOid
              });
              if (found) {
                if (Array.isArray(found)) {
                  if (lastCommit) {
                    const lastFound = await resolveFileIdInTree({
                      fs,
                      cache,
                      gitdir,
                      oid: lastCommit.commit.tree,
                      fileId: lastFileOid
                    });
                    if (Array.isArray(lastFound)) {
                      found = found.filter((p) => lastFound.indexOf(p) === -1);
                      if (found.length === 1) {
                        found = found[0];
                        filepath = found;
                        if (lastCommit)
                          commits.push(lastCommit);
                      } else {
                        found = false;
                        if (lastCommit)
                          commits.push(lastCommit);
                        break;
                      }
                    }
                  }
                } else {
                  filepath = found;
                  if (lastCommit)
                    commits.push(lastCommit);
                }
              }
            }
            if (!found) {
              if (isOk && lastFileOid) {
                commits.push(lastCommit);
                if (!force)
                  break;
              }
              if (!force && !follow)
                throw e;
            }
            lastCommit = commit2;
            isOk = false;
          } else
            throw e;
        }
      } else {
        commits.push(commit2);
      }
      if (depth !== undefined && commits.length === depth) {
        endCommit(commit2);
        break;
      }
      if (!shallowCommits.has(commit2.oid)) {
        for (const oid2 of commit2.commit.parent) {
          const commit3 = await _readCommit({ fs, cache, gitdir, oid: oid2 });
          if (!tips.map((commit4) => commit4.oid).includes(commit3.oid)) {
            tips.push(commit3);
          }
        }
      }
      if (tips.length === 0) {
        endCommit(commit2);
      }
      tips.sort((a, b) => compareAge(a.commit, b.commit));
    }
    return commits;
  }
  async function log({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    filepath,
    ref = "HEAD",
    depth,
    since,
    force,
    follow,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _log({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        filepath,
        ref,
        depth,
        since,
        force,
        follow
      });
    } catch (err) {
      err.caller = "git.log";
      throw err;
    }
  }
  async function merge({
    fs: _fs,
    onSign,
    dir,
    gitdir = join(dir, ".git"),
    ours,
    theirs,
    fastForward: fastForward2 = true,
    fastForwardOnly = false,
    dryRun = false,
    noUpdateBranch = false,
    abortOnConflict = true,
    message,
    author: _author,
    committer: _committer,
    signingKey,
    cache = {},
    mergeDriver,
    allowUnrelatedHistories = false
  }) {
    try {
      assertParameter("fs", _fs);
      if (signingKey) {
        assertParameter("onSign", onSign);
      }
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const author = await normalizeAuthorObject({
        fs,
        gitdir: updatedGitdir,
        author: _author
      });
      if (!author && (!fastForwardOnly || !fastForward2)) {
        throw new MissingNameError("author");
      }
      const committer = await normalizeCommitterObject({
        fs,
        gitdir: updatedGitdir,
        author,
        committer: _committer
      });
      if (!committer && (!fastForwardOnly || !fastForward2)) {
        throw new MissingNameError("committer");
      }
      return await _merge({
        fs,
        cache,
        dir,
        gitdir: updatedGitdir,
        ours,
        theirs,
        fastForward: fastForward2,
        fastForwardOnly,
        dryRun,
        noUpdateBranch,
        abortOnConflict,
        message,
        author,
        committer,
        signingKey,
        onSign,
        mergeDriver,
        allowUnrelatedHistories
      });
    } catch (err) {
      err.caller = "git.merge";
      throw err;
    }
  }
  var types = {
    commit: 16,
    tree: 32,
    blob: 48,
    tag: 64,
    ofs_delta: 96,
    ref_delta: 112
  };
  async function _pack({
    fs,
    cache,
    dir,
    gitdir = join(dir, ".git"),
    oids
  }) {
    const hash = new Hash;
    const outputStream = [];
    function write(chunk, enc) {
      const buff = Buffer.from(chunk, enc);
      outputStream.push(buff);
      hash.update(buff);
    }
    async function writeObject2({ stype, object }) {
      const type = types[stype];
      let length = object.length;
      let multibyte = length > 15 ? 128 : 0;
      const lastFour = length & 15;
      length = length >>> 4;
      let byte = (multibyte | type | lastFour).toString(16);
      write(byte, "hex");
      while (multibyte) {
        multibyte = length > 127 ? 128 : 0;
        byte = multibyte | length & 127;
        write(padHex(2, byte), "hex");
        length = length >>> 7;
      }
      write(Buffer.from(await deflate(object)));
    }
    write("PACK");
    write("00000002", "hex");
    write(padHex(8, oids.length), "hex");
    for (const oid of oids) {
      const { type, object } = await _readObject({ fs, cache, gitdir, oid });
      await writeObject2({ write, object, stype: type });
    }
    const digest = hash.digest();
    outputStream.push(digest);
    return outputStream;
  }
  async function _packObjects({ fs, cache, gitdir, oids, write }) {
    const buffers = await _pack({ fs, cache, gitdir, oids });
    const packfile = Buffer.from(await collect(buffers));
    const packfileSha = packfile.slice(-20).toString("hex");
    const filename = `pack-${packfileSha}.pack`;
    if (write) {
      await fs.write(join(gitdir, `objects/pack/${filename}`), packfile);
      return { filename };
    }
    return {
      filename,
      packfile: new Uint8Array(packfile)
    };
  }
  async function packObjects({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oids,
    write = false,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oids", oids);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _packObjects({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oids,
        write
      });
    } catch (err) {
      err.caller = "git.packObjects";
      throw err;
    }
  }
  async function pull({
    fs: _fs,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    url,
    remote,
    remoteRef,
    prune = false,
    pruneTags = false,
    fastForward: fastForward2 = true,
    fastForwardOnly = false,
    corsProxy,
    singleBranch,
    headers = {},
    author: _author,
    committer: _committer,
    signingKey,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const author = await normalizeAuthorObject({
        fs,
        gitdir: updatedGitdir,
        author: _author
      });
      if (!author)
        throw new MissingNameError("author");
      const committer = await normalizeCommitterObject({
        fs,
        gitdir: updatedGitdir,
        author,
        committer: _committer
      });
      if (!committer)
        throw new MissingNameError("committer");
      return await _pull({
        fs,
        cache,
        http,
        onProgress,
        onMessage,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        dir,
        gitdir: updatedGitdir,
        ref,
        url,
        remote,
        remoteRef,
        fastForward: fastForward2,
        fastForwardOnly,
        corsProxy,
        singleBranch,
        headers,
        author,
        committer,
        signingKey,
        prune,
        pruneTags
      });
    } catch (err) {
      err.caller = "git.pull";
      throw err;
    }
  }
  async function listCommitsAndTags({
    fs,
    cache,
    dir,
    gitdir = join(dir, ".git"),
    start,
    finish
  }) {
    const shallows = await GitShallowManager.read({ fs, gitdir });
    const startingSet = new Set;
    const finishingSet = new Set;
    for (const ref of start) {
      startingSet.add(await GitRefManager.resolve({ fs, gitdir, ref }));
    }
    for (const ref of finish) {
      try {
        const oid = await GitRefManager.resolve({ fs, gitdir, ref });
        finishingSet.add(oid);
      } catch (err) {}
    }
    const visited = new Set;
    async function walk2(oid) {
      visited.add(oid);
      const { type, object } = await _readObject({ fs, cache, gitdir, oid });
      if (type === "tag") {
        const tag2 = GitAnnotatedTag.from(object);
        const commit2 = tag2.headers().object;
        return walk2(commit2);
      }
      if (type !== "commit") {
        throw new ObjectTypeError(oid, type, "commit");
      }
      if (!shallows.has(oid)) {
        const commit2 = GitCommit.from(object);
        const parents = commit2.headers().parent;
        for (oid of parents) {
          if (!finishingSet.has(oid) && !visited.has(oid)) {
            await walk2(oid);
          }
        }
      }
    }
    for (const oid of startingSet) {
      await walk2(oid);
    }
    return visited;
  }
  async function listObjects({
    fs,
    cache,
    dir,
    gitdir = join(dir, ".git"),
    oids
  }) {
    const visited = new Set;
    async function walk2(oid) {
      if (visited.has(oid))
        return;
      visited.add(oid);
      const { type, object } = await _readObject({ fs, cache, gitdir, oid });
      if (type === "tag") {
        const tag2 = GitAnnotatedTag.from(object);
        const obj = tag2.headers().object;
        await walk2(obj);
      } else if (type === "commit") {
        const commit2 = GitCommit.from(object);
        const tree = commit2.headers().tree;
        await walk2(tree);
      } else if (type === "tree") {
        const tree = GitTree.from(object);
        for (const entry of tree) {
          if (entry.type === "blob") {
            visited.add(entry.oid);
          }
          if (entry.type === "tree") {
            await walk2(entry.oid);
          }
        }
      }
    }
    for (const oid of oids) {
      await walk2(oid);
    }
    return visited;
  }
  async function parseReceivePackResponse(packfile) {
    const result = {};
    let response = "";
    const read = GitPktLine.streamReader(packfile);
    let line = await read();
    while (line !== true) {
      if (line !== null)
        response += line.toString("utf8") + `
`;
      line = await read();
    }
    const lines2 = response.toString("utf8").split(`
`);
    line = lines2.shift();
    if (!line.startsWith("unpack ")) {
      throw new ParseError2('unpack ok" or "unpack [error message]', line);
    }
    result.ok = line === "unpack ok";
    if (!result.ok) {
      result.error = line.slice("unpack ".length);
    }
    result.refs = {};
    for (const line2 of lines2) {
      if (line2.trim() === "")
        continue;
      const status2 = line2.slice(0, 2);
      const refAndMessage = line2.slice(3);
      let space = refAndMessage.indexOf(" ");
      if (space === -1)
        space = refAndMessage.length;
      const ref = refAndMessage.slice(0, space);
      const error3 = refAndMessage.slice(space + 1);
      result.refs[ref] = {
        ok: status2 === "ok",
        error: error3
      };
    }
    return result;
  }
  async function writeReceivePackRequest({
    capabilities = [],
    triplets = []
  }) {
    const packstream = [];
    let capsFirstLine = `\x00 ${capabilities.join(" ")}`;
    for (const trip of triplets) {
      packstream.push(GitPktLine.encode(`${trip.oldoid} ${trip.oid} ${trip.fullRef}${capsFirstLine}
`));
      capsFirstLine = "";
    }
    packstream.push(GitPktLine.flush());
    return packstream;
  }
  async function _push({
    fs,
    cache,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    onPrePush,
    gitdir,
    ref: _ref,
    remoteRef: _remoteRef,
    remote,
    url: _url,
    force = false,
    delete: _delete = false,
    corsProxy,
    headers = {}
  }) {
    const ref = _ref || await _currentBranch({ fs, gitdir });
    if (typeof ref === "undefined") {
      throw new MissingParameterError("ref");
    }
    const config2 = await GitConfigManager.get({ fs, gitdir });
    remote = remote || await config2.get(`branch.${ref}.pushRemote`) || await config2.get("remote.pushDefault") || await config2.get(`branch.${ref}.remote`) || "origin";
    const url = _url || await config2.get(`remote.${remote}.pushurl`) || await config2.get(`remote.${remote}.url`);
    if (typeof url === "undefined") {
      throw new MissingParameterError("remote OR url");
    }
    const remoteRef = _remoteRef || await config2.get(`branch.${ref}.merge`);
    if (typeof url === "undefined") {
      throw new MissingParameterError("remoteRef");
    }
    if (corsProxy === undefined) {
      corsProxy = await config2.get("http.corsProxy");
    }
    const fullRef = await GitRefManager.expand({ fs, gitdir, ref });
    const oid = _delete ? "0000000000000000000000000000000000000000" : await GitRefManager.resolve({ fs, gitdir, ref: fullRef });
    const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
    const httpRemote = await GitRemoteHTTP2.discover({
      http,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      corsProxy,
      service: "git-receive-pack",
      url,
      headers,
      protocolVersion: 1
    });
    const auth = httpRemote.auth;
    let fullRemoteRef;
    if (!remoteRef) {
      fullRemoteRef = fullRef;
    } else {
      try {
        fullRemoteRef = await GitRefManager.expandAgainstMap({
          ref: remoteRef,
          map: httpRemote.refs
        });
      } catch (err) {
        if (err instanceof NotFoundError) {
          fullRemoteRef = remoteRef.startsWith("refs/") ? remoteRef : `refs/heads/${remoteRef}`;
        } else {
          throw err;
        }
      }
    }
    const oldoid = httpRemote.refs.get(fullRemoteRef) || "0000000000000000000000000000000000000000";
    if (onPrePush) {
      const hookCancel = await onPrePush({
        remote,
        url,
        localRef: { ref: _delete ? "(delete)" : fullRef, oid },
        remoteRef: { ref: fullRemoteRef, oid: oldoid }
      });
      if (!hookCancel)
        throw new UserCanceledError;
    }
    const thinPack = !httpRemote.capabilities.has("no-thin");
    let objects = new Set;
    if (!_delete) {
      const finish = [...httpRemote.refs.values()];
      let skipObjects = new Set;
      if (oldoid !== "0000000000000000000000000000000000000000") {
        const mergebase = await _findMergeBase({
          fs,
          cache,
          gitdir,
          oids: [oid, oldoid]
        });
        for (const oid2 of mergebase)
          finish.push(oid2);
        if (thinPack) {
          skipObjects = await listObjects({ fs, cache, gitdir, oids: mergebase });
        }
      }
      if (!finish.includes(oid)) {
        const commits = await listCommitsAndTags({
          fs,
          cache,
          gitdir,
          start: [oid],
          finish
        });
        objects = await listObjects({ fs, cache, gitdir, oids: commits });
      }
      if (thinPack) {
        try {
          const ref2 = await GitRefManager.resolve({
            fs,
            gitdir,
            ref: `refs/remotes/${remote}/HEAD`,
            depth: 2
          });
          const { oid: oid2 } = await GitRefManager.resolveAgainstMap({
            ref: ref2.replace(`refs/remotes/${remote}/`, ""),
            fullref: ref2,
            map: httpRemote.refs
          });
          const oids = [oid2];
          for (const oid3 of await listObjects({ fs, cache, gitdir, oids })) {
            skipObjects.add(oid3);
          }
        } catch (e) {}
        for (const oid2 of skipObjects) {
          objects.delete(oid2);
        }
      }
      if (oid === oldoid)
        force = true;
      if (!force) {
        if (fullRef.startsWith("refs/tags") && oldoid !== "0000000000000000000000000000000000000000") {
          throw new PushRejectedError("tag-exists");
        }
        if (oid !== "0000000000000000000000000000000000000000" && oldoid !== "0000000000000000000000000000000000000000" && !await _isDescendent({
          fs,
          cache,
          gitdir,
          oid,
          ancestor: oldoid,
          depth: -1
        })) {
          throw new PushRejectedError("not-fast-forward");
        }
      }
    }
    const capabilities = filterCapabilities([...httpRemote.capabilities], ["report-status", "side-band-64k", `agent=${pkg.agent}`]);
    const packstream1 = await writeReceivePackRequest({
      capabilities,
      triplets: [{ oldoid, oid, fullRef: fullRemoteRef }]
    });
    const packstream2 = _delete ? [] : await _pack({
      fs,
      cache,
      gitdir,
      oids: [...objects]
    });
    const res = await GitRemoteHTTP2.connect({
      http,
      onProgress,
      corsProxy,
      service: "git-receive-pack",
      url,
      auth,
      headers,
      body: [...packstream1, ...packstream2]
    });
    const { packfile, progress } = await GitSideBand.demux(res.body);
    if (onMessage) {
      const lines2 = splitLines2(progress);
      forAwait(lines2, async (line) => {
        await onMessage(line);
      });
    }
    const result = await parseReceivePackResponse(packfile);
    if (res.headers) {
      result.headers = res.headers;
    }
    if (remote && result.ok && result.refs[fullRemoteRef].ok && !fullRef.startsWith("refs/tags")) {
      const ref2 = `refs/remotes/${remote}/${fullRemoteRef.replace("refs/heads", "")}`;
      if (_delete) {
        await GitRefManager.deleteRef({ fs, gitdir, ref: ref2 });
      } else {
        await GitRefManager.writeRef({ fs, gitdir, ref: ref2, value: oid });
      }
    }
    if (result.ok && Object.values(result.refs).every((result2) => result2.ok)) {
      return result;
    } else {
      const prettyDetails = Object.entries(result.refs).filter(([k, v]) => !v.ok).map(([k, v]) => `
  - ${k}: ${v.error}`).join("");
      throw new GitPushError(prettyDetails, result);
    }
  }
  async function push({
    fs,
    http,
    onProgress,
    onMessage,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    onPrePush,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    remoteRef,
    remote = "origin",
    url,
    force = false,
    delete: _delete = false,
    corsProxy,
    headers = {},
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("http", http);
      assertParameter("gitdir", gitdir);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _push({
        fs: fsp,
        cache,
        http,
        onProgress,
        onMessage,
        onAuth,
        onAuthSuccess,
        onAuthFailure,
        onPrePush,
        gitdir: updatedGitdir,
        ref,
        remoteRef,
        remote,
        url,
        force,
        delete: _delete,
        corsProxy,
        headers
      });
    } catch (err) {
      err.caller = "git.push";
      throw err;
    }
  }
  async function resolveBlob({ fs, cache, gitdir, oid }) {
    const { type, object } = await _readObject({ fs, cache, gitdir, oid });
    if (type === "tag") {
      oid = GitAnnotatedTag.from(object).parse().object;
      return resolveBlob({ fs, cache, gitdir, oid });
    }
    if (type !== "blob") {
      throw new ObjectTypeError(oid, type, "blob");
    }
    return { oid, blob: new Uint8Array(object) };
  }
  async function _readBlob({
    fs,
    cache,
    gitdir,
    oid,
    filepath = undefined
  }) {
    if (filepath !== undefined) {
      oid = await resolveFilepath({ fs, cache, gitdir, oid, filepath });
    }
    const blob = await resolveBlob({
      fs,
      cache,
      gitdir,
      oid
    });
    return blob;
  }
  async function readBlob({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    filepath,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _readBlob({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oid,
        filepath
      });
    } catch (err) {
      err.caller = "git.readBlob";
      throw err;
    }
  }
  async function readCommit({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _readCommit({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oid
      });
    } catch (err) {
      err.caller = "git.readCommit";
      throw err;
    }
  }
  async function _readNote({
    fs,
    cache,
    gitdir,
    ref = "refs/notes/commits",
    oid
  }) {
    const parent = await GitRefManager.resolve({ gitdir, fs, ref });
    const { blob } = await _readBlob({
      fs,
      cache,
      gitdir,
      oid: parent,
      filepath: oid
    });
    return blob;
  }
  async function readNote({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    ref = "refs/notes/commits",
    oid,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      assertParameter("oid", oid);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _readNote({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        ref,
        oid
      });
    } catch (err) {
      err.caller = "git.readNote";
      throw err;
    }
  }
  async function readObject({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    format = "parsed",
    filepath = undefined,
    encoding = undefined,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      if (filepath !== undefined) {
        oid = await resolveFilepath({
          fs,
          cache,
          gitdir: updatedGitdir,
          oid,
          filepath
        });
      }
      const _format = format === "parsed" ? "content" : format;
      const result = await _readObject({
        fs,
        cache,
        gitdir: updatedGitdir,
        oid,
        format: _format
      });
      result.oid = oid;
      if (format === "parsed") {
        result.format = "parsed";
        switch (result.type) {
          case "commit":
            result.object = GitCommit.from(result.object).parse();
            break;
          case "tree":
            result.object = GitTree.from(result.object).entries();
            break;
          case "blob":
            if (encoding) {
              result.object = result.object.toString(encoding);
            } else {
              result.object = new Uint8Array(result.object);
              result.format = "content";
            }
            break;
          case "tag":
            result.object = GitAnnotatedTag.from(result.object).parse();
            break;
          default:
            throw new ObjectTypeError(result.oid, result.type, "blob|commit|tag|tree");
        }
      } else if (result.format === "deflated" || result.format === "wrapped") {
        result.type = result.format;
      }
      return result;
    } catch (err) {
      err.caller = "git.readObject";
      throw err;
    }
  }
  async function _readTag({ fs, cache, gitdir, oid }) {
    const { type, object } = await _readObject({
      fs,
      cache,
      gitdir,
      oid,
      format: "content"
    });
    if (type !== "tag") {
      throw new ObjectTypeError(oid, type, "tag");
    }
    const tag2 = GitAnnotatedTag.from(object);
    const result = {
      oid,
      tag: tag2.parse(),
      payload: tag2.payload()
    };
    return result;
  }
  async function readTag({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _readTag({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oid
      });
    } catch (err) {
      err.caller = "git.readTag";
      throw err;
    }
  }
  async function readTree({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    oid,
    filepath = undefined,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _readTree({
        fs: fsp,
        cache,
        gitdir: updatedGitdir,
        oid,
        filepath
      });
    } catch (err) {
      err.caller = "git.readTree";
      throw err;
    }
  }
  async function remove({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    filepath,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("filepath", filepath);
      const fsp = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      await GitIndexManager.acquire({ fs: fsp, gitdir: updatedGitdir, cache }, async function(index2) {
        index2.delete({ filepath });
      });
    } catch (err) {
      err.caller = "git.remove";
      throw err;
    }
  }
  async function _removeNote({
    fs,
    cache,
    onSign,
    gitdir,
    ref = "refs/notes/commits",
    oid,
    author,
    committer,
    signingKey
  }) {
    let parent;
    try {
      parent = await GitRefManager.resolve({ gitdir, fs, ref });
    } catch (err) {
      if (!(err instanceof NotFoundError)) {
        throw err;
      }
    }
    const result = await _readTree({
      fs,
      cache,
      gitdir,
      oid: parent || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
    });
    let tree = result.tree;
    tree = tree.filter((entry) => entry.path !== oid);
    const treeOid = await _writeTree({
      fs,
      gitdir,
      tree
    });
    const commitOid = await _commit({
      fs,
      cache,
      onSign,
      gitdir,
      ref,
      tree: treeOid,
      parent: parent && [parent],
      message: `Note removed by 'isomorphic-git removeNote'
`,
      author,
      committer,
      signingKey
    });
    return commitOid;
  }
  async function removeNote({
    fs: _fs,
    onSign,
    dir,
    gitdir = join(dir, ".git"),
    ref = "refs/notes/commits",
    oid,
    author: _author,
    committer: _committer,
    signingKey,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("oid", oid);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const author = await normalizeAuthorObject({
        fs,
        gitdir: updatedGitdir,
        author: _author
      });
      if (!author)
        throw new MissingNameError("author");
      const committer = await normalizeCommitterObject({
        fs,
        gitdir: updatedGitdir,
        author,
        committer: _committer
      });
      if (!committer)
        throw new MissingNameError("committer");
      return await _removeNote({
        fs,
        cache,
        onSign,
        gitdir: updatedGitdir,
        ref,
        oid,
        author,
        committer,
        signingKey
      });
    } catch (err) {
      err.caller = "git.removeNote";
      throw err;
    }
  }
  async function _renameBranch({
    fs,
    gitdir,
    oldref,
    ref,
    checkout: checkout2 = false
  }) {
    if (!isValidRef(ref, true)) {
      throw new InvalidRefNameError(ref, cleanGitRef.clean(ref));
    }
    if (!isValidRef(oldref, true)) {
      throw new InvalidRefNameError(oldref, cleanGitRef.clean(oldref));
    }
    const fulloldref = `refs/heads/${oldref}`;
    const fullnewref = `refs/heads/${ref}`;
    const newexist = await GitRefManager.exists({ fs, gitdir, ref: fullnewref });
    if (newexist) {
      throw new AlreadyExistsError("branch", ref, false);
    }
    const value = await GitRefManager.resolve({
      fs,
      gitdir,
      ref: fulloldref,
      depth: 1
    });
    await GitRefManager.writeRef({ fs, gitdir, ref: fullnewref, value });
    await GitRefManager.deleteRef({ fs, gitdir, ref: fulloldref });
    const fullCurrentBranchRef = await _currentBranch({
      fs,
      gitdir,
      fullname: true
    });
    const isCurrentBranch = fullCurrentBranchRef === fulloldref;
    if (checkout2 || isCurrentBranch) {
      await GitRefManager.writeSymbolicRef({
        fs,
        gitdir,
        ref: "HEAD",
        value: fullnewref
      });
    }
  }
  async function renameBranch({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    oldref,
    checkout: checkout2 = false
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      assertParameter("oldref", oldref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _renameBranch({
        fs: fsp,
        gitdir: updatedGitdir,
        ref,
        oldref,
        checkout: checkout2
      });
    } catch (err) {
      err.caller = "git.renameBranch";
      throw err;
    }
  }
  async function hashObject$1({ gitdir, type, object }) {
    return shasum(GitObject.wrap({ type, object }));
  }
  async function resetIndex({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    filepath,
    ref,
    cache = {}
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("filepath", filepath);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      let oid;
      let workdirOid;
      try {
        oid = await GitRefManager.resolve({
          fs,
          gitdir: updatedGitdir,
          ref: ref || "HEAD"
        });
      } catch (e) {
        if (ref) {
          throw e;
        }
      }
      if (oid) {
        try {
          oid = await resolveFilepath({
            fs,
            cache,
            gitdir: updatedGitdir,
            oid,
            filepath
          });
        } catch (e) {
          oid = null;
        }
      }
      let stats = {
        ctime: new Date(0),
        mtime: new Date(0),
        dev: 0,
        ino: 0,
        mode: 0,
        uid: 0,
        gid: 0,
        size: 0
      };
      const object = dir && await fs.read(join(dir, filepath));
      if (object) {
        workdirOid = await hashObject$1({
          gitdir: updatedGitdir,
          type: "blob",
          object
        });
        if (oid === workdirOid) {
          stats = await fs.lstat(join(dir, filepath));
        }
      }
      await GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async function(index2) {
        index2.delete({ filepath });
        if (oid) {
          index2.insert({ filepath, stats, oid });
        }
      });
    } catch (err) {
      err.caller = "git.reset";
      throw err;
    }
  }
  async function resolveRef({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    depth
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      const oid = await GitRefManager.resolve({
        fs: fsp,
        gitdir: updatedGitdir,
        ref,
        depth
      });
      return oid;
    } catch (err) {
      err.caller = "git.resolveRef";
      throw err;
    }
  }
  async function setConfig({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    path,
    value,
    append = false
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("path", path);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const config2 = await GitConfigManager.get({ fs, gitdir: updatedGitdir });
      if (append) {
        await config2.append(path, value);
      } else {
        await config2.set(path, value);
      }
      await GitConfigManager.save({ fs, gitdir: updatedGitdir, config: config2 });
    } catch (err) {
      err.caller = "git.setConfig";
      throw err;
    }
  }
  async function _writeCommit({ fs, gitdir, commit: commit2 }) {
    const object = GitCommit.from(commit2).toObject();
    const oid = await _writeObject({
      fs,
      gitdir,
      type: "commit",
      object,
      format: "content"
    });
    return oid;
  }

  class GitRefStash {
    static get timezoneOffsetForRefLogEntry() {
      const offsetMinutes = new Date().getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
      const offsetMinutesFormatted = Math.abs(offsetMinutes % 60).toString().padStart(2, "0");
      const sign = offsetMinutes > 0 ? "-" : "+";
      return `${sign}${offsetHours.toString().padStart(2, "0")}${offsetMinutesFormatted}`;
    }
    static createStashReflogEntry(author, stashCommit, message) {
      const nameNoSpace = author.name.replace(/\s/g, "");
      const z40 = "0000000000000000000000000000000000000000";
      const timestamp = Math.floor(Date.now() / 1000);
      const timezoneOffset = GitRefStash.timezoneOffsetForRefLogEntry;
      return `${z40} ${stashCommit} ${nameNoSpace} ${author.email} ${timestamp} ${timezoneOffset}	${message}
`;
    }
    static getStashReflogEntry(reflogString, parsed = false) {
      const reflogLines = reflogString.split(`
`);
      const entries = reflogLines.filter((l) => l).reverse().map((line, idx) => parsed ? `stash@{${idx}}: ${line.split("\t")[1]}` : line);
      return entries;
    }
  }

  class GitStashManager {
    constructor({ fs, dir, gitdir = join(dir, ".git") }) {
      Object.assign(this, {
        fs,
        dir,
        gitdir,
        _author: null
      });
    }
    static get refStash() {
      return "refs/stash";
    }
    static get refLogsStash() {
      return "logs/refs/stash";
    }
    get refStashPath() {
      return join(this.gitdir, GitStashManager.refStash);
    }
    get refLogsStashPath() {
      return join(this.gitdir, GitStashManager.refLogsStash);
    }
    async getAuthor() {
      if (!this._author) {
        this._author = await normalizeAuthorObject({
          fs: this.fs,
          gitdir: this.gitdir,
          author: {}
        });
        if (!this._author)
          throw new MissingNameError("author");
      }
      return this._author;
    }
    async getStashSHA(refIdx, stashEntries) {
      if (!await this.fs.exists(this.refStashPath)) {
        return null;
      }
      const entries = stashEntries || await this.readStashReflogs({ parsed: false });
      return entries[refIdx].split(" ")[1];
    }
    async writeStashCommit({ message, tree, parent }) {
      return _writeCommit({
        fs: this.fs,
        gitdir: this.gitdir,
        commit: {
          message,
          tree,
          parent,
          author: await this.getAuthor(),
          committer: await this.getAuthor()
        }
      });
    }
    async readStashCommit(refIdx) {
      const stashEntries = await this.readStashReflogs({ parsed: false });
      if (refIdx !== 0) {
        if (refIdx < 0 || refIdx > stashEntries.length - 1) {
          throw new InvalidRefNameError(`stash@${refIdx}`, "number that is in range of [0, num of stash pushed]");
        }
      }
      const stashSHA = await this.getStashSHA(refIdx, stashEntries);
      if (!stashSHA) {
        return {};
      }
      return _readCommit({
        fs: this.fs,
        cache: {},
        gitdir: this.gitdir,
        oid: stashSHA
      });
    }
    async writeStashRef(stashCommit) {
      return GitRefManager.writeRef({
        fs: this.fs,
        gitdir: this.gitdir,
        ref: GitStashManager.refStash,
        value: stashCommit
      });
    }
    async writeStashReflogEntry({ stashCommit, message }) {
      const author = await this.getAuthor();
      const entry = GitRefStash.createStashReflogEntry(author, stashCommit, message);
      const filepath = this.refLogsStashPath;
      await acquireLock$1({ filepath, entry }, async () => {
        const appendTo = await this.fs.exists(filepath) ? await this.fs.read(filepath, "utf8") : "";
        await this.fs.write(filepath, appendTo + entry, "utf8");
      });
    }
    async readStashReflogs({ parsed = false }) {
      if (!await this.fs.exists(this.refLogsStashPath)) {
        return [];
      }
      const reflogString = await this.fs.read(this.refLogsStashPath, "utf8");
      return GitRefStash.getStashReflogEntry(reflogString, parsed);
    }
  }
  async function _createStashCommit({ fs, dir, gitdir, message = "" }) {
    const stashMgr = new GitStashManager({ fs, dir, gitdir });
    await stashMgr.getAuthor();
    const branch2 = await _currentBranch({
      fs,
      gitdir,
      fullname: false
    });
    const headCommit = await GitRefManager.resolve({
      fs,
      gitdir,
      ref: "HEAD"
    });
    const headCommitObj = await readCommit({ fs, dir, gitdir, oid: headCommit });
    const headMsg = headCommitObj.commit.message;
    const stashCommitParents = [headCommit];
    let stashCommitTree = null;
    let workDirCompareBase = TREE({ ref: "HEAD" });
    const indexTree = await writeTreeChanges({
      fs,
      dir,
      gitdir,
      treePair: [TREE({ ref: "HEAD" }), "stage"]
    });
    if (indexTree) {
      const stashCommitOne = await stashMgr.writeStashCommit({
        message: `stash-Index: WIP on ${branch2} - ${new Date().toISOString()}`,
        tree: indexTree,
        parent: stashCommitParents
      });
      stashCommitParents.push(stashCommitOne);
      stashCommitTree = indexTree;
      workDirCompareBase = STAGE();
    }
    const workingTree = await writeTreeChanges({
      fs,
      dir,
      gitdir,
      treePair: [workDirCompareBase, "workdir"]
    });
    if (workingTree) {
      const workingHeadCommit = await stashMgr.writeStashCommit({
        message: `stash-WorkDir: WIP on ${branch2} - ${new Date().toISOString()}`,
        tree: workingTree,
        parent: [stashCommitParents[stashCommitParents.length - 1]]
      });
      stashCommitParents.push(workingHeadCommit);
      stashCommitTree = workingTree;
    }
    if (!stashCommitTree || !indexTree && !workingTree) {
      throw new NotFoundError("changes, nothing to stash");
    }
    const stashMsg = (message.trim() || `WIP on ${branch2}`) + `: ${headCommit.substring(0, 7)} ${headMsg}`;
    const stashCommit = await stashMgr.writeStashCommit({
      message: stashMsg,
      tree: stashCommitTree,
      parent: stashCommitParents
    });
    return { stashCommit, stashMsg, branch: branch2, stashMgr };
  }
  async function _stashPush({ fs, dir, gitdir, message = "" }) {
    const { stashCommit, stashMsg, branch: branch2, stashMgr } = await _createStashCommit({
      fs,
      dir,
      gitdir,
      message
    });
    await stashMgr.writeStashRef(stashCommit);
    await stashMgr.writeStashReflogEntry({
      stashCommit,
      message: stashMsg
    });
    await checkout({
      fs,
      dir,
      gitdir,
      ref: branch2,
      track: false,
      force: true
    });
    return stashCommit;
  }
  async function _stashCreate({ fs, dir, gitdir, message = "" }) {
    const { stashCommit } = await _createStashCommit({
      fs,
      dir,
      gitdir,
      message
    });
    return stashCommit;
  }
  async function _stashApply({ fs, dir, gitdir, refIdx = 0 }) {
    const stashMgr = new GitStashManager({ fs, dir, gitdir });
    const stashCommit = await stashMgr.readStashCommit(refIdx);
    const { parent: stashParents = null } = stashCommit.commit ? stashCommit.commit : {};
    if (!stashParents || !Array.isArray(stashParents)) {
      return;
    }
    for (let i = 0;i < stashParents.length - 1; i++) {
      const applyingCommit = await _readCommit({
        fs,
        cache: {},
        gitdir,
        oid: stashParents[i + 1]
      });
      const wasStaged = applyingCommit.commit.message.startsWith("stash-Index");
      await applyTreeChanges({
        fs,
        dir,
        gitdir,
        stashCommit: stashParents[i + 1],
        parentCommit: stashParents[i],
        wasStaged
      });
    }
  }
  async function _stashDrop({ fs, dir, gitdir, refIdx = 0 }) {
    const stashMgr = new GitStashManager({ fs, dir, gitdir });
    const stashCommit = await stashMgr.readStashCommit(refIdx);
    if (!stashCommit.commit) {
      return;
    }
    const stashRefPath = stashMgr.refStashPath;
    await acquireLock$1(stashRefPath, async () => {
      if (await fs.exists(stashRefPath)) {
        await fs.rm(stashRefPath);
      }
    });
    const reflogEntries = await stashMgr.readStashReflogs({ parsed: false });
    if (!reflogEntries.length) {
      return;
    }
    reflogEntries.splice(refIdx, 1);
    const stashReflogPath = stashMgr.refLogsStashPath;
    await acquireLock$1({ reflogEntries, stashReflogPath, stashMgr }, async () => {
      if (reflogEntries.length) {
        await fs.write(stashReflogPath, reflogEntries.reverse().join(`
`) + `
`, "utf8");
        const lastStashCommit = reflogEntries[reflogEntries.length - 1].split(" ")[1];
        await stashMgr.writeStashRef(lastStashCommit);
      } else {
        await fs.rm(stashReflogPath);
      }
    });
  }
  async function _stashList({ fs, dir, gitdir }) {
    const stashMgr = new GitStashManager({ fs, dir, gitdir });
    return stashMgr.readStashReflogs({ parsed: true });
  }
  async function _stashClear({ fs, dir, gitdir }) {
    const stashMgr = new GitStashManager({ fs, dir, gitdir });
    const stashRefPath = [stashMgr.refStashPath, stashMgr.refLogsStashPath];
    await acquireLock$1(stashRefPath, async () => {
      await Promise.all(stashRefPath.map(async (path) => {
        if (await fs.exists(path)) {
          return fs.rm(path);
        }
      }));
    });
  }
  async function _stashPop({ fs, dir, gitdir, refIdx = 0 }) {
    await _stashApply({ fs, dir, gitdir, refIdx });
    await _stashDrop({ fs, dir, gitdir, refIdx });
  }
  async function stash({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    op = "push",
    message = "",
    refIdx = 0
  }) {
    assertParameter("fs", fs);
    assertParameter("dir", dir);
    assertParameter("gitdir", gitdir);
    assertParameter("op", op);
    const stashMap = {
      push: _stashPush,
      apply: _stashApply,
      drop: _stashDrop,
      list: _stashList,
      clear: _stashClear,
      pop: _stashPop,
      create: _stashCreate
    };
    const opsNeedRefIdx = ["apply", "drop", "pop"];
    try {
      const _fs = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp: _fs, dotgit: gitdir });
      const folders = ["refs", "logs", "logs/refs"];
      folders.map((f) => join(updatedGitdir, f)).forEach(async (folder) => {
        if (!await _fs.exists(folder)) {
          await _fs.mkdir(folder);
        }
      });
      const opFunc = stashMap[op];
      if (opFunc) {
        if (opsNeedRefIdx.includes(op) && refIdx < 0) {
          throw new InvalidRefNameError(`stash@${refIdx}`, "number that is in range of [0, num of stash pushed]");
        }
        return await opFunc({
          fs: _fs,
          dir,
          gitdir: updatedGitdir,
          message,
          refIdx
        });
      }
      throw new Error(`To be implemented: ${op}`);
    } catch (err) {
      err.caller = "git.stash";
      throw err;
    }
  }
  async function status({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    filepath,
    cache = {},
    refresh = true
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("filepath", filepath);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const ignored = await GitIgnoreManager.isIgnored({
        fs,
        gitdir: updatedGitdir,
        dir,
        filepath
      });
      if (ignored) {
        return "ignored";
      }
      const headTree = await getHeadTree({ fs, cache, gitdir: updatedGitdir });
      const treeOid = await getOidAtPath({
        fs,
        cache,
        gitdir: updatedGitdir,
        tree: headTree,
        path: filepath
      });
      const indexEntry = await GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async function(index2) {
        for (const entry of index2) {
          if (entry.path === filepath)
            return entry;
        }
        return null;
      });
      const stats = await fs.lstat(join(dir, filepath));
      const H = treeOid !== null;
      const I = indexEntry !== null;
      const W = stats !== null;
      const getWorkdirOid = async () => {
        if (I && !compareStats(indexEntry, stats)) {
          return indexEntry.oid;
        } else {
          const object = await fs.read(join(dir, filepath));
          const workdirOid = await hashObject$1({
            gitdir: updatedGitdir,
            type: "blob",
            object
          });
          if (refresh && I && indexEntry.oid === workdirOid) {
            if (stats.size !== -1) {
              GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async function(index2) {
                index2.insert({ filepath, stats, oid: workdirOid });
              });
            }
          }
          return workdirOid;
        }
      };
      if (!H && !W && !I)
        return "absent";
      if (!H && !W && I)
        return "*absent";
      if (!H && W && !I)
        return "*added";
      if (!H && W && I) {
        const workdirOid = await getWorkdirOid();
        return workdirOid === indexEntry.oid ? "added" : "*added";
      }
      if (H && !W && !I)
        return "deleted";
      if (H && !W && I) {
        return treeOid === indexEntry.oid ? "*deleted" : "*deleted";
      }
      if (H && W && !I) {
        const workdirOid = await getWorkdirOid();
        return workdirOid === treeOid ? "*undeleted" : "*undeletemodified";
      }
      if (H && W && I) {
        const workdirOid = await getWorkdirOid();
        if (workdirOid === treeOid) {
          return workdirOid === indexEntry.oid ? "unmodified" : "*unmodified";
        } else {
          return workdirOid === indexEntry.oid ? "modified" : "*modified";
        }
      }
    } catch (err) {
      err.caller = "git.status";
      throw err;
    }
  }
  async function getOidAtPath({ fs, cache, gitdir: updatedGitdir, tree, path }) {
    if (typeof path === "string")
      path = path.split("/");
    const dirname2 = path.shift();
    for (const entry of tree) {
      if (entry.path === dirname2) {
        if (path.length === 0) {
          return entry.oid;
        }
        const { type, object } = await _readObject({
          fs,
          cache,
          gitdir: updatedGitdir,
          oid: entry.oid
        });
        if (type === "tree") {
          const tree2 = GitTree.from(object);
          return getOidAtPath({ fs, cache, gitdir: updatedGitdir, tree: tree2, path });
        }
        if (type === "blob") {
          throw new ObjectTypeError(entry.oid, type, "blob", path.join("/"));
        }
      }
    }
    return null;
  }
  async function getHeadTree({ fs, cache, gitdir: updatedGitdir }) {
    let oid;
    try {
      oid = await GitRefManager.resolve({
        fs,
        gitdir: updatedGitdir,
        ref: "HEAD"
      });
    } catch (e) {
      if (e instanceof NotFoundError) {
        return [];
      }
    }
    const { tree } = await _readTree({ fs, cache, gitdir: updatedGitdir, oid });
    return tree;
  }
  async function statusMatrix({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    ref = "HEAD",
    filepaths = ["."],
    filter,
    cache = {},
    ignored: shouldIgnore = false,
    refresh = true
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      return await _walk({
        fs,
        cache,
        dir,
        gitdir: updatedGitdir,
        trees: [TREE({ ref }), WORKDIR({ refresh }), STAGE()],
        map: async function(filepath, [head, workdir, stage]) {
          if (!head && !stage && workdir) {
            if (!shouldIgnore) {
              const isIgnored2 = await GitIgnoreManager.isIgnored({
                fs,
                dir,
                filepath
              });
              if (isIgnored2) {
                return null;
              }
            }
          }
          if (!filepaths.some((base) => worthWalking(filepath, base))) {
            return null;
          }
          if (filter) {
            if (!filter(filepath))
              return;
          }
          const [headType, workdirType, stageType] = await Promise.all([
            head && head.type(),
            workdir && workdir.type(),
            stage && stage.type()
          ]);
          const isBlob = [headType, workdirType, stageType].includes("blob");
          if ((headType === "tree" || headType === "special") && !isBlob)
            return;
          if (headType === "commit")
            return null;
          if ((workdirType === "tree" || workdirType === "special") && !isBlob)
            return;
          if (stageType === "commit")
            return null;
          if ((stageType === "tree" || stageType === "special") && !isBlob)
            return;
          const headOid = headType === "blob" ? await head.oid() : undefined;
          const stageOid = stageType === "blob" ? await stage.oid() : undefined;
          let workdirOid;
          if (headType !== "blob" && workdirType === "blob" && stageType !== "blob") {
            workdirOid = "42";
          } else if (workdirType === "blob") {
            workdirOid = await workdir.oid();
          }
          const entry = [undefined, headOid, workdirOid, stageOid];
          const result = entry.map((value) => entry.indexOf(value));
          result.shift();
          return [filepath, ...result];
        }
      });
    } catch (err) {
      err.caller = "git.statusMatrix";
      throw err;
    }
  }
  async function tag({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    object,
    force = false
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      const fs = new FileSystem(_fs);
      if (ref === undefined) {
        throw new MissingParameterError("ref");
      }
      ref = ref.startsWith("refs/tags/") ? ref : `refs/tags/${ref}`;
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      const value = await GitRefManager.resolve({
        fs,
        gitdir: updatedGitdir,
        ref: object || "HEAD"
      });
      if (!force && await GitRefManager.exists({ fs, gitdir: updatedGitdir, ref })) {
        throw new AlreadyExistsError("tag", ref);
      }
      await GitRefManager.writeRef({ fs, gitdir: updatedGitdir, ref, value });
    } catch (err) {
      err.caller = "git.tag";
      throw err;
    }
  }
  async function updateIndex$1({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    cache = {},
    filepath,
    oid,
    mode,
    add: add2,
    remove: remove2,
    force
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("filepath", filepath);
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      if (remove2) {
        return await GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async function(index2) {
          if (!force) {
            const fileStats2 = await fs.lstat(join(dir, filepath));
            if (fileStats2) {
              if (fileStats2.isDirectory()) {
                throw new InvalidFilepathError("directory");
              }
              return;
            }
          }
          if (index2.has({ filepath })) {
            index2.delete({
              filepath
            });
          }
        });
      }
      let fileStats;
      if (!oid) {
        fileStats = await fs.lstat(join(dir, filepath));
        if (!fileStats) {
          throw new NotFoundError(`file at "${filepath}" on disk and "remove" not set`);
        }
        if (fileStats.isDirectory()) {
          throw new InvalidFilepathError("directory");
        }
      }
      return await GitIndexManager.acquire({ fs, gitdir: updatedGitdir, cache }, async function(index2) {
        if (!add2 && !index2.has({ filepath })) {
          throw new NotFoundError(`file at "${filepath}" in index and "add" not set`);
        }
        let stats;
        if (!oid) {
          stats = fileStats;
          const object = stats.isSymbolicLink() ? await fs.readlink(join(dir, filepath)) : await fs.read(join(dir, filepath));
          oid = await _writeObject({
            fs,
            gitdir: updatedGitdir,
            type: "blob",
            format: "content",
            object
          });
        } else {
          stats = {
            ctime: new Date(0),
            mtime: new Date(0),
            dev: 0,
            ino: 0,
            mode,
            uid: 0,
            gid: 0,
            size: 0
          };
        }
        index2.insert({
          filepath,
          oid,
          stats
        });
        return oid;
      });
    } catch (err) {
      err.caller = "git.updateIndex";
      throw err;
    }
  }
  function version() {
    try {
      return pkg.version;
    } catch (err) {
      err.caller = "git.version";
      throw err;
    }
  }
  async function walk({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    trees,
    map,
    reduce,
    iterate,
    cache = {}
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("trees", trees);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _walk({
        fs: fsp,
        cache,
        dir,
        gitdir: updatedGitdir,
        trees,
        map,
        reduce,
        iterate
      });
    } catch (err) {
      err.caller = "git.walk";
      throw err;
    }
  }
  async function writeBlob({ fs, dir, gitdir = join(dir, ".git"), blob }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("blob", blob);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _writeObject({
        fs: fsp,
        gitdir: updatedGitdir,
        type: "blob",
        object: blob,
        format: "content"
      });
    } catch (err) {
      err.caller = "git.writeBlob";
      throw err;
    }
  }
  async function writeCommit({
    fs,
    dir,
    gitdir = join(dir, ".git"),
    commit: commit2
  }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("commit", commit2);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _writeCommit({
        fs: fsp,
        gitdir: updatedGitdir,
        commit: commit2
      });
    } catch (err) {
      err.caller = "git.writeCommit";
      throw err;
    }
  }
  async function writeObject({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    type,
    object,
    format = "parsed",
    oid,
    encoding = undefined
  }) {
    try {
      const fs = new FileSystem(_fs);
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      if (format === "parsed") {
        switch (type) {
          case "commit":
            object = GitCommit.from(object).toObject();
            break;
          case "tree":
            object = GitTree.from(object).toObject();
            break;
          case "blob":
            object = Buffer.from(object, encoding);
            break;
          case "tag":
            object = GitAnnotatedTag.from(object).toObject();
            break;
          default:
            throw new ObjectTypeError(oid || "", type, "blob|commit|tag|tree");
        }
        format = "content";
      }
      oid = await _writeObject({
        fs,
        gitdir: updatedGitdir,
        type,
        object,
        oid,
        format
      });
      return oid;
    } catch (err) {
      err.caller = "git.writeObject";
      throw err;
    }
  }
  async function writeRef({
    fs: _fs,
    dir,
    gitdir = join(dir, ".git"),
    ref,
    value,
    force = false,
    symbolic = false
  }) {
    try {
      assertParameter("fs", _fs);
      assertParameter("gitdir", gitdir);
      assertParameter("ref", ref);
      assertParameter("value", value);
      const fs = new FileSystem(_fs);
      if (!isValidRef(ref, true)) {
        throw new InvalidRefNameError(ref, cleanGitRef.clean(ref));
      }
      const updatedGitdir = await discoverGitdir({ fsp: fs, dotgit: gitdir });
      if (!force && await GitRefManager.exists({ fs, gitdir: updatedGitdir, ref })) {
        throw new AlreadyExistsError("ref", ref);
      }
      if (symbolic) {
        await GitRefManager.writeSymbolicRef({
          fs,
          gitdir: updatedGitdir,
          ref,
          value
        });
      } else {
        value = await GitRefManager.resolve({
          fs,
          gitdir: updatedGitdir,
          ref: value
        });
        await GitRefManager.writeRef({
          fs,
          gitdir: updatedGitdir,
          ref,
          value
        });
      }
    } catch (err) {
      err.caller = "git.writeRef";
      throw err;
    }
  }
  async function _writeTag({ fs, gitdir, tag: tag2 }) {
    const object = GitAnnotatedTag.from(tag2).toObject();
    const oid = await _writeObject({
      fs,
      gitdir,
      type: "tag",
      object,
      format: "content"
    });
    return oid;
  }
  async function writeTag({ fs, dir, gitdir = join(dir, ".git"), tag: tag2 }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("tag", tag2);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _writeTag({
        fs: fsp,
        gitdir: updatedGitdir,
        tag: tag2
      });
    } catch (err) {
      err.caller = "git.writeTag";
      throw err;
    }
  }
  async function writeTree({ fs, dir, gitdir = join(dir, ".git"), tree }) {
    try {
      assertParameter("fs", fs);
      assertParameter("gitdir", gitdir);
      assertParameter("tree", tree);
      const fsp = new FileSystem(fs);
      const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
      return await _writeTree({
        fs: fsp,
        gitdir: updatedGitdir,
        tree
      });
    } catch (err) {
      err.caller = "git.writeTree";
      throw err;
    }
  }
  var index = {
    Errors,
    STAGE,
    TREE,
    WORKDIR,
    add,
    abortMerge,
    addNote,
    addRemote,
    annotatedTag,
    branch,
    cherryPick,
    checkout,
    clone,
    commit,
    getConfig,
    getConfigAll,
    setConfig,
    currentBranch,
    deleteBranch,
    deleteRef,
    deleteRemote,
    deleteTag,
    expandOid,
    expandRef,
    fastForward,
    fetch,
    findMergeBase,
    findRoot,
    getRemoteInfo,
    getRemoteInfo2,
    hashBlob,
    indexPack,
    init,
    isDescendent,
    isIgnored,
    listBranches,
    listFiles,
    listNotes,
    listRefs,
    listRemotes,
    listServerRefs,
    listTags,
    log,
    merge,
    packObjects,
    pull,
    push,
    readBlob,
    readCommit,
    readNote,
    readObject,
    readTag,
    readTree,
    remove,
    removeNote,
    renameBranch,
    resetIndex,
    updateIndex: updateIndex$1,
    resolveRef,
    status,
    statusMatrix,
    tag,
    version,
    walk,
    writeBlob,
    writeCommit,
    writeObject,
    writeRef,
    writeTag,
    writeTree,
    stash
  };
  exports.Errors = Errors;
  exports.STAGE = STAGE;
  exports.TREE = TREE;
  exports.WORKDIR = WORKDIR;
  exports.abortMerge = abortMerge;
  exports.add = add;
  exports.addNote = addNote;
  exports.addRemote = addRemote;
  exports.annotatedTag = annotatedTag;
  exports.branch = branch;
  exports.checkout = checkout;
  exports.cherryPick = cherryPick;
  exports.clone = clone;
  exports.commit = commit;
  exports.currentBranch = currentBranch;
  exports.default = index;
  exports.deleteBranch = deleteBranch;
  exports.deleteRef = deleteRef;
  exports.deleteRemote = deleteRemote;
  exports.deleteTag = deleteTag;
  exports.expandOid = expandOid;
  exports.expandRef = expandRef;
  exports.fastForward = fastForward;
  exports.fetch = fetch;
  exports.findMergeBase = findMergeBase;
  exports.findRoot = findRoot;
  exports.getConfig = getConfig;
  exports.getConfigAll = getConfigAll;
  exports.getRemoteInfo = getRemoteInfo;
  exports.getRemoteInfo2 = getRemoteInfo2;
  exports.hashBlob = hashBlob;
  exports.indexPack = indexPack;
  exports.init = init;
  exports.isDescendent = isDescendent;
  exports.isIgnored = isIgnored;
  exports.listBranches = listBranches;
  exports.listFiles = listFiles;
  exports.listNotes = listNotes;
  exports.listRefs = listRefs;
  exports.listRemotes = listRemotes;
  exports.listServerRefs = listServerRefs;
  exports.listTags = listTags;
  exports.log = log;
  exports.merge = merge;
  exports.packObjects = packObjects;
  exports.pull = pull;
  exports.push = push;
  exports.readBlob = readBlob;
  exports.readCommit = readCommit;
  exports.readNote = readNote;
  exports.readObject = readObject;
  exports.readTag = readTag;
  exports.readTree = readTree;
  exports.remove = remove;
  exports.removeNote = removeNote;
  exports.renameBranch = renameBranch;
  exports.resetIndex = resetIndex;
  exports.resolveRef = resolveRef;
  exports.setConfig = setConfig;
  exports.stash = stash;
  exports.status = status;
  exports.statusMatrix = statusMatrix;
  exports.tag = tag;
  exports.updateIndex = updateIndex$1;
  exports.version = version;
  exports.walk = walk;
  exports.writeBlob = writeBlob;
  exports.writeCommit = writeCommit;
  exports.writeObject = writeObject;
  exports.writeRef = writeRef;
  exports.writeTag = writeTag;
  exports.writeTree = writeTree;
});

// src/cmd/parse-worker.ts
import { readFile as readFile2 } from "fs/promises";
import path from "path";
import { parentPort, workerData } from "worker_threads";

// src/api/api.ts
import { gzipSync } from "zlib";

// src/config/config.ts
class Cfg {
  name;
  source;
  start;
  concurrency;
  noMemo;
  noPruneMemosOnCut;
  perLineMemos;
  trace;
  colorize;
  grammar;
  noLeftRecursion;
  ignoreCase;
  nameChars;
  nameGuard;
  whitespace;
  comments;
  eolComments;
  keywords;
  parseInfo;
  heart;
  semantics;
  merge(other) {
    const c = new Cfg;
    c.name = other.name !== undefined ? other.name : this.name;
    c.source = other.source !== undefined ? other.source : this.source;
    c.start = other.start !== undefined ? other.start : this.start;
    c.concurrency = other.concurrency !== undefined ? other.concurrency : this.concurrency;
    c.noMemo = other.noMemo !== undefined ? other.noMemo : this.noMemo;
    c.noPruneMemosOnCut = other.noPruneMemosOnCut !== undefined ? other.noPruneMemosOnCut : this.noPruneMemosOnCut;
    c.perLineMemos = other.perLineMemos !== undefined ? other.perLineMemos : this.perLineMemos;
    c.trace = other.trace !== undefined ? other.trace : this.trace;
    c.colorize = other.colorize !== undefined ? other.colorize : this.colorize;
    c.grammar = other.grammar !== undefined ? other.grammar : this.grammar;
    c.noLeftRecursion = other.noLeftRecursion !== undefined ? other.noLeftRecursion : this.noLeftRecursion;
    c.ignoreCase = other.ignoreCase !== undefined ? other.ignoreCase : this.ignoreCase;
    c.nameChars = other.nameChars !== undefined ? other.nameChars : this.nameChars;
    c.whitespace = other.whitespace !== undefined ? other.whitespace : this.whitespace;
    c.comments = other.comments !== undefined ? other.comments : this.comments;
    c.eolComments = other.eolComments !== undefined ? other.eolComments : this.eolComments;
    c.keywords = other.keywords !== undefined ? other.keywords : this.keywords ? [...this.keywords] : [];
    c.parseInfo = other.parseInfo !== undefined ? other.parseInfo : this.parseInfo;
    c.semantics = other.semantics !== undefined ? other.semantics : this.semantics;
    c.heart = other.heart !== undefined ? other.heart : this.heart;
    if (other.grammar)
      c.name = c.grammar;
    if (c.ignoreCase && c.keywords.length > 0) {
      c.keywords = c.keywords.map((kw) => kw.toUpperCase());
    }
    if (c.noMemo)
      c.noLeftRecursion = true;
    if (c.nameChars)
      c.nameGuard = true;
    if (other.nameGuard !== undefined)
      c.nameGuard = other.nameGuard;
    return c;
  }
}
function defaultCfg() {
  const c = new Cfg;
  c.noMemo = false;
  c.noPruneMemosOnCut = false;
  c.perLineMemos = 8;
  c.trace = false;
  c.colorize = false;
  c.noLeftRecursion = false;
  c.ignoreCase = false;
  c.nameGuard = null;
  c.keywords = [];
  c.parseInfo = false;
  return c;
}
// src/config/globals.ts
var marker = "marker";
// src/util/heartbeat.ts
class DeadHeart {
  heartbeat(_mark, _total) {}
}

// src/error/error.ts
class TSemekwesError extends Error {
  get __isTSemekwesError() {
    return true;
  }
  constructor(message, options) {
    super(message, options);
    this.name = "TSemekwesError";
  }
  static isTSemekwesError(error) {
    return error instanceof TSemekwesError || !!error && error.__isTSemekwesError === true;
  }
}
// src/context/memento.ts
var import_picocolors = __toESM(require_picocolors(), 1);
var import_sprintf_js = __toESM(require_sprintf(), 1);

class Memento extends Error {
  start;
  msg;
  cursor;
  colorize;
  err;
  mark;
  callStack;
  constructor(start, msg, cursor, callStack, colorize, err) {
    super(msg);
    this.start = start;
    this.msg = msg;
    this.cursor = cursor;
    this.colorize = colorize;
    this.err = err;
    this.mark = cursor.mark();
    this.callStack = [...callStack];
    Object.setPrototypeOf(this, Memento.prototype);
  }
  toString() {
    return this.render();
  }
  inputSource() {
    return this.cursor.inputSource();
  }
  error() {
    return this.render();
  }
  render() {
    const pc = import_picocolors.default.createColors(!!this.colorize);
    const [line, col] = this.cursor.posAt(this.mark);
    const source = this.inputSource();
    const src = source !== "" ? source : "<unknown>";
    let result = "";
    result += `${pc.redBright(`
error:`)} ${this.msg}
`;
    result += `${pc.blueBright(`   --> `)}${pc.whiteBright(`${src} `)}[${line}:${col}]
`;
    result += pc.blueBright(`      |
`);
    const startLine0 = Math.max(0, line - 5);
    const lines = this.cursor.linesAt(startLine0, line);
    for (let i = 0;i < lines.length; i++) {
      const ln = startLine0 + i + 1;
      const disp = lines[i].replace(/\t/g, "  ").replace(/[\r\n]$/, "");
      result += `${pc.blueBright(import_sprintf_js.sprintf("%5d", ln))} ${pc.blueBright(`|`)} ${pc.white(disp)}
`;
    }
    const pad = " ".repeat(Math.max(0, col - 1));
    result += `${pc.blueBright(`      |`)} ${pad}${pc.redBright(`^ ${this.msg}
`)}`;
    if (this.callStack.length > 0) {
      result += `
`;
      for (let i = this.callStack.length - 1;i >= 0; i--) {
        result += pc.dim(` \u2191 ${this.callStack[i]}
`);
      }
    }
    return result;
  }
}

// src/context/error.ts
class ParseError extends TSemekwesError {
  get __isParseError() {
    return true;
  }
  constructor(message, options) {
    super(message, options);
    this.name = "ParseError";
  }
  static isParseError(error2) {
    return error2 instanceof ParseError || !!error2 && error2.__isParseError === true;
  }
}

class BottomError extends ParseError {
  get __isBottomError() {
    return true;
  }
  constructor(options) {
    super("BOTTOM", options);
    this.name = "BottomError";
  }
  static isBottomError(error2) {
    return error2 instanceof BottomError || !!error2 && error2.__isBottomError === true;
  }
}
var BOTTOM = new BottomError;

class ParseFailure extends ParseError {
  start;
  cause;
  get __isParseFailure() {
    return true;
  }
  memento;
  constructor(ctx, start, cause) {
    const memento = new Memento(start, cause.message, ctx.cursor(), ctx.callStack(), ctx.cfg().colorize, cause);
    super(memento.render(), { cause: memento });
    this.start = start;
    this.cause = cause;
    this.name = "ParseFailure";
    this.memento = memento;
    Object.setPrototypeOf(this, ParseFailure.prototype);
  }
  toString() {
    return this.memento.render();
  }
  get mark() {
    return this.memento.mark;
  }
  static isParseFailure(error2) {
    return error2 instanceof ParseFailure || !!error2 && error2.__isParseFailure === true;
  }
}
function isBottomError(error2) {
  return BottomError.isBottomError(error2);
}
function isParseFailure(error2) {
  return ParseFailure.isParseFailure(error2);
}
function isParseError(error2) {
  return ParseError.isParseError(error2);
}

// src/context/memo.ts
function isBottomEntry(memo) {
  return isParseError(memo.value);
}
function pruneMemoCache(cache, cutPoint) {
  for (const [keyStr, memo] of cache) {
    const mark = parseInt(keyStr.split(":")[0], 10);
    if (mark < cutPoint && !isBottomEntry(memo)) {
      cache.delete(keyStr);
    }
  }
}

// src/context/core.ts
function newCtx(cursor, cfg) {
  return new CoreCtx(cursor, cfg);
}

class CoreCtx {
  _cursor;
  _callStack = [];
  cutStack = [false];
  recursionKey = null;
  recursionDepth = 0;
  lookaheadDepth = 0;
  lastCutMark = 0;
  furthest = null;
  _cfg;
  memoCache = new Map;
  _tracer = new NullTracer;
  keywords = new Set;
  _heart = new DeadHeart;
  _lastHeartbeat = 0;
  constructor(cursor, cfg) {
    this._cursor = cursor;
    this._cfg = cfg ? defaultCfg().merge(cfg) : defaultCfg();
    this._cursor.configure(this._cfg);
  }
  cfg() {
    return this._cfg;
  }
  configure(cfg) {
    this._cfg = this._cfg.merge(cfg);
    this._cursor.configure(cfg);
    this.setKeywords(cfg.keywords ?? []);
    if (cfg.trace) {
      this._tracer = new ConsoleTracer;
    } else {
      this._tracer = new NullTracer;
    }
    if (cfg.heart) {
      this._heart = cfg.heart;
    }
  }
  setKeywords(kws) {
    this.keywords = new Set(kws);
  }
  cursor() {
    return this._cursor;
  }
  callStack() {
    return [...this._callStack];
  }
  tracer() {
    return this._tracer;
  }
  mark() {
    return this._cursor.mark();
  }
  reset(mark) {
    this._cursor.reset(mark);
  }
  atEnd() {
    return this._cursor.atEnd();
  }
  peek() {
    return this._cursor.peek();
  }
  matchDot() {
    const mark = this._cursor.mark();
    const [ch, ok] = this._cursor.next();
    if (!ok) {
      throw this.failure(mark, new ParseError("expected any character"));
    }
    return [ch, true];
  }
  nextToken() {
    this._cursor.nextToken();
    this.heartbeat();
  }
  matchToken(token) {
    this.nextToken();
    const start = this.mark();
    const [slice, ok] = this._cursor.matchToken(token);
    if (ok) {
      this._tracer.traceMatch(this, token, slice);
      return slice;
    }
    this.reset(start);
    this._tracer.traceNoMatch(this, "", token);
    throw this.failure(start, new ParseError(`expected: "${token}"`));
  }
  matchPattern(pattern) {
    let view = pattern;
    view = `${view.slice(0, 16)}...`.slice(0, view.length);
    const mark = this._cursor.mark();
    const [slice, ok] = this._cursor.matchPattern(pattern);
    if (ok) {
      this._tracer.traceMatch(this, view, slice);
      return slice;
    }
    this._tracer.traceNoMatch(this, view, slice);
    const p = this._cursor.getPattern(pattern);
    throw this.failure(mark, new ParseError(`expected pattern ${p}`));
  }
  matchVoid() {
    this.nextToken();
  }
  inLookahead() {
    return this.lookaheadDepth > 0;
  }
  enterLookahead() {
    this.lookaheadDepth++;
  }
  leaveLookahead() {
    this.lookaheadDepth--;
  }
  matchFail() {
    throw this.failure(this._cursor.mark(), new ParseError("fail"));
  }
  eof() {
    return this._cursor.atEnd();
  }
  matchEOF() {
    const mark = this._cursor.mark();
    this.nextToken();
    if (!this._cursor.atEnd()) {
      this.reset(mark);
      throw this.failure(mark, new ParseError("expected end of text"));
    }
    return null;
  }
  matchEOL() {
    const mark = this._cursor.mark();
    if (!this._cursor.matchEOL()) {
      this.reset(mark);
      throw this.failure(mark, new ParseError("expected end of line"));
    }
    return null;
  }
  matchName() {
    const start = this.mark();
    this.nextToken();
    const slice = this._cursor.matchName();
    if (slice === null) {
      this.reset(start);
      this._tracer.traceNoMatch(this, "@name", "");
      throw this.failure(start, new ParseError("expected @name"));
    }
    this._tracer.traceMatch(this, "@name", slice);
    return slice;
  }
  matchInt() {
    const start = this.mark();
    this.nextToken();
    const slice = this._cursor.matchInt();
    if (slice === null) {
      this.reset(start);
      this._tracer.traceNoMatch(this, "@int", "");
      throw this.failure(start, new ParseError("expected @int"));
    }
    this._tracer.traceMatch(this, "@int", slice.toString());
    return slice;
  }
  matchUInt() {
    const start = this.mark();
    this.nextToken();
    const slice = this._cursor.matchUInt();
    if (slice === null) {
      this.reset(start);
      this._tracer.traceNoMatch(this, "@uint", "");
      throw this.failure(start, new ParseError("expected @uint"));
    }
    this._tracer.traceMatch(this, "@uint", slice.toString());
    return slice;
  }
  matchFloat() {
    const start = this.mark();
    this.nextToken();
    const slice = this._cursor.matchFloat();
    if (slice === null) {
      this.reset(start);
      this._tracer.traceNoMatch(this, "@float", "");
      throw this.failure(start, new ParseError("expected @float"));
    }
    this._tracer.traceMatch(this, "@float", slice.toString());
    return slice;
  }
  matchBool() {
    const start = this.mark();
    this.nextToken();
    const slice = this._cursor.matchBool();
    if (slice === null) {
      this.reset(start);
      this._tracer.traceNoMatch(this, "@bool", "");
      throw this.failure(start, new ParseError("expected @bool"));
    }
    this._tracer.traceMatch(this, "@bool", slice.toString());
    return slice;
  }
  matchConstant(literal) {
    return literal;
  }
  enter(name) {
    this._callStack.push(name);
  }
  leave() {
    if (this._callStack.length > 0) {
      this._callStack.pop();
    }
  }
  failure(start, cause) {
    this._cursor.reset(start);
    const err = new ParseFailure(this, start, cause);
    if (this.furthest === null || this.furthest.mark <= this._cursor.mark()) {
      this.setFurthestFailure(err);
    }
    return err;
  }
  furthestFailure() {
    return this.furthest;
  }
  setFurthestFailure(failure) {
    this.furthest = failure;
  }
  isKeyword(name) {
    return this.keywords.has(name);
  }
  intern(s) {
    return s;
  }
  heartbeat() {
    const hb = this._heart;
    if (hb instanceof DeadHeart)
      return;
    const now = Date.now();
    if (now - this._lastHeartbeat < 128)
      return;
    this._lastHeartbeat = now;
    const mark = this._cursor.mark();
    const total = this._cursor.len();
    hb.heartbeat(mark, total);
  }
  key(name, canMemo) {
    return { mark: this._cursor.mark(), name, canMemo };
  }
  memo(key) {
    if (!key.canMemo)
      return;
    const k = `${key.mark}:${key.name}`;
    return this.memoCache.get(k);
  }
  memoize(key, value, mark) {
    if (!key.canMemo)
      return;
    const k = `${key.mark}:${key.name}`;
    this.memoCache.set(k, { value, mark });
  }
  recursionDepthExceeded() {
    return this.recursionDepth >= 64;
  }
  track(key) {
    if (this.recursionKey != null && this.recursionKey.mark === key.mark && this.recursionKey.name === key.name) {
      this.recursionDepth++;
    } else {
      this.recursionKey = key;
      this.recursionDepth = 1;
    }
  }
  untrack(key) {
    if (this.recursionKey != null && this.recursionKey.mark === key.mark && this.recursionKey.name === key.name) {
      this.recursionDepth--;
      if (this.recursionDepth <= 0) {
        this.recursionKey = null;
        this.recursionDepth = 0;
      }
    }
  }
  cut() {
    this.cutStack[this.cutStack.length - 1] = true;
    this._tracer.traceCut(this);
    const mark = this._cursor.mark();
    if (!this.cfg().noPruneMemosOnCut && !this.inLookahead()) {
      if (mark > this.lastCutMark) {
        pruneMemoCache(this.memoCache, this.lastCutMark);
        this.lastCutMark = mark;
      }
    }
  }
  isCutSeen() {
    return this.cutStack[this.cutStack.length - 1];
  }
  cutStackPush() {
    this.cutStack.push(false);
  }
  cutStackPop() {
    const seen = this.isCutSeen();
    this.cutStack.pop();
    return seen;
  }
  applySemantics(node, ruleName, params) {
    const sem = this.cfg().semantics;
    if (sem !== null && sem !== undefined) {
      return sem.apply(node, ruleName, params);
    }
    return [node, false];
  }
}
// src/context/tracer.ts
var import_picocolors2 = __toESM(require_picocolors(), 1);
var Event;
((Event2) => {
  Event2[Event2["Entry"] = 0] = "Entry";
  Event2[Event2["Success"] = 1] = "Success";
  Event2[Event2["Failure"] = 2] = "Failure";
  Event2[Event2["Recursion"] = 3] = "Recursion";
  Event2[Event2["Cut"] = 4] = "Cut";
  Event2[Event2["Match"] = 5] = "Match";
  Event2[Event2["NoMatch"] = 6] = "NoMatch";
})(Event ||= {});

class NullTracer {
  trace(_ctx, _msg) {}
  traceEvent(_ctx, _event, _msg) {}
  traceEntry(_ctx) {}
  traceSuccess(_ctx) {}
  traceFailure(_ctx, _err) {}
  traceRecursion(_ctx) {}
  traceCut(_ctx) {}
  traceMatch(_ctx, _name, _token) {
    return true;
  }
  traceNoMatch(_ctx, _name, _token = "") {
    return false;
  }
}
function eventSymbol(pc, event) {
  switch (event) {
    case 0 /* Entry */:
      return pc.yellow("\u2199");
    case 1 /* Success */:
      return pc.green("\u2261");
    case 2 /* Failure */:
      return pc.red("\u2262");
    case 3 /* Recursion */:
      return pc.blue("\u27F2");
    case 4 /* Cut */:
      return pc.yellow("\u2694");
    case 5 /* Match */:
      return pc.green("\u2261");
    case 6 /* NoMatch */:
      return pc.red("\u2262");
    default:
      return "?";
  }
}
function stackSymbol(pc, event) {
  switch (event) {
    case 1 /* Success */:
      return pc.green("\u2192");
    case 2 /* Failure */:
      return pc.red("\u2192");
    case 6 /* NoMatch */:
      return pc.red("\u2190");
    case 5 /* Match */:
      return pc.green("\u2190");
    default:
      return pc.yellow("\u2190");
  }
}

class ConsoleTracer {
  trace(_ctx, msg) {
    console.error(msg);
  }
  traceEvent(ctx, event, msg) {
    const pc = import_picocolors2.default.createColors(ctx.cfg().colorize);
    const esym = eventSymbol(pc, event);
    const ssym = stackSymbol(pc, event);
    const lookahead = pc.bold(pc.black(ctx.cursor().lookahead(ctx.mark()).replace(/ /g, "\xB7")));
    let cs = "";
    const callStack = ctx.callStack();
    for (let i = callStack.length - 1;i >= 0; i--) {
      cs += pc.bold(pc.white(callStack[i])) + ssym;
    }
    const mark = ctx.cursor().mark();
    const [line, col] = ctx.cursor().pos();
    const pos = pc.bold(pc.black(`[${line}:${col}]@${mark} \u2192`));
    const lineMsg = `${esym}${msg} ${cs}\u2022
${pos}${lookahead}`;
    this.trace(ctx, lineMsg);
  }
  traceEntry(ctx) {
    this.traceEvent(ctx, 0 /* Entry */, "");
  }
  traceSuccess(ctx) {
    this.traceEvent(ctx, 1 /* Success */, "");
  }
  traceFailure(ctx, err) {
    const errStr = ` ${import_picocolors2.default.red(err)}`;
    this.traceEvent(ctx, 2 /* Failure */, errStr);
  }
  traceRecursion(ctx) {
    this.traceEvent(ctx, 3 /* Recursion */, "");
  }
  traceCut(ctx) {
    this.traceEvent(ctx, 4 /* Cut */, "");
  }
  traceMatch(ctx, name, token) {
    let tag = "";
    if (name !== "") {
      tag = `/${name}/`;
    }
    const msg = import_picocolors2.default.green(`'${token}'${tag}`);
    this.traceEvent(ctx, 5 /* Match */, msg);
    return true;
  }
  traceNoMatch(ctx, name, token = "") {
    const msg = token !== "" ? import_picocolors2.default.red(` '${token}'`) : import_picocolors2.default.red(` /${name}/`);
    this.traceEvent(ctx, 6 /* NoMatch */, msg);
    return false;
  }
}
// src/input/cursor.ts
class Location {
  source;
  line;
  col;
  constructor(source, line, col) {
    this.source = source;
    this.line = line;
    this.col = col;
  }
}
// src/util/strings.ts
var isAlphabetic = (str) => {
  if (str.length === 0)
    return false;
  for (let i = 0;i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
      return false;
    }
  }
  return true;
};
var isAlphanumeric = (str) => {
  if (str.length === 0)
    return false;
  for (let i = 0;i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122) && !(code >= 48 && code <= 57)) {
      return false;
    }
  }
  return true;
};
function stripRight(s, keepends = false) {
  if (s == null || s === "" || s.length === 0) {
    return "";
  }
  if (keepends) {
    return s.replace(/[ \t\f\v]+$/g, "");
  }
  return s.replace(/\s+$/g, "");
}
function stripLeft(s, keepends = false) {
  if (s == null || s === "" || s.length === 0) {
    return "";
  }
  if (keepends) {
    return s.replace(/^[ \t\f\v]+/g, "");
  }
  return s.replace(/^\s+/g, "");
}
var linesre = /([^\n\r]+)(?:\r?\n)?|\r?\n/g;
function* lines(s, keepends = false) {
  if (s.length === 0) {
    yield "";
    return;
  }
  for (const m of s.matchAll(linesre)) {
    if (keepends) {
      yield m[0];
    } else {
      yield m[1] ?? "";
    }
  }
}
function splitlines(s, keepends = false) {
  return [...lines(s, keepends)];
}
function dedent(s) {
  if (s == null || s === "" || s.length === 0) {
    return "";
  }
  let indent = Infinity;
  const lines2 = splitlines(s, true);
  for (const line of lines2) {
    const stripped = stripLeft(line);
    if (stripped.length === 0)
      continue;
    indent = Math.min(indent, line.length - stripped.length);
  }
  if (indent === Infinity)
    indent = 0;
  for (let i = 0;i < lines2.length; i++) {
    if (lines2[i].trim().length === 0)
      continue;
    lines2[i] = lines2[i].slice(indent);
  }
  return lines2.join("");
}

// node_modules/xregexp/src/xregexp.js
/*!
 * XRegExp 5.1.2
 * <xregexp.com>
 * Steven Levithan (c) 2007-present MIT License
 */
var REGEX_DATA = "xregexp";
var features = {
  astral: false,
  namespacing: true
};
var fixed = {};
var regexCache = Object.create(null);
var patternCache = Object.create(null);
var tokens = [];
var defaultScope = "default";
var classScope = "class";
var nativeTokens = {
  default: /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?(?:[:=!]|<[=!])|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
  class: /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
};
var replacementToken = /\$(?:\{([^\}]+)\}|<([^>]+)>|(\d\d?|[\s\S]?))/g;
var correctExecNpcg = /()??/.exec("")[1] === undefined;
var hasFlagsProp = /x/.flags !== undefined;
function hasNativeFlag(flag) {
  let isSupported = true;
  try {
    new RegExp("", flag);
    if (flag === "y") {
      const gy = (() => "gy")();
      const incompleteY = ".a".replace(new RegExp("a", gy), ".") === "..";
      if (incompleteY) {
        isSupported = false;
      }
    }
  } catch (exception) {
    isSupported = false;
  }
  return isSupported;
}
var hasNativeD = hasNativeFlag("d");
var hasNativeS = hasNativeFlag("s");
var hasNativeU = hasNativeFlag("u");
var hasNativeY = hasNativeFlag("y");
var registeredFlags = {
  d: hasNativeD,
  g: true,
  i: true,
  m: true,
  s: hasNativeS,
  u: hasNativeU,
  y: hasNativeY
};
var nonnativeFlags = hasNativeS ? /[^dgimsuy]+/g : /[^dgimuy]+/g;
function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
  regex[REGEX_DATA] = {
    captureNames
  };
  if (isInternalOnly) {
    return regex;
  }
  if (regex.__proto__) {
    regex.__proto__ = XRegExp.prototype;
  } else {
    for (const p in XRegExp.prototype) {
      regex[p] = XRegExp.prototype[p];
    }
  }
  regex[REGEX_DATA].source = xSource;
  regex[REGEX_DATA].flags = xFlags ? xFlags.split("").sort().join("") : xFlags;
  return regex;
}
function clipDuplicates(str) {
  return str.replace(/([\s\S])(?=[\s\S]*\1)/g, "");
}
function copyRegex(regex, options) {
  if (!XRegExp.isRegExp(regex)) {
    throw new TypeError("Type RegExp expected");
  }
  const xData = regex[REGEX_DATA] || {};
  let flags = getNativeFlags(regex);
  let flagsToAdd = "";
  let flagsToRemove = "";
  let xregexpSource = null;
  let xregexpFlags = null;
  options = options || {};
  if (options.removeG) {
    flagsToRemove += "g";
  }
  if (options.removeY) {
    flagsToRemove += "y";
  }
  if (flagsToRemove) {
    flags = flags.replace(new RegExp(`[${flagsToRemove}]+`, "g"), "");
  }
  if (options.addG) {
    flagsToAdd += "g";
  }
  if (options.addY) {
    flagsToAdd += "y";
  }
  if (flagsToAdd) {
    flags = clipDuplicates(flags + flagsToAdd);
  }
  if (!options.isInternalOnly) {
    if (xData.source !== undefined) {
      xregexpSource = xData.source;
    }
    if (xData.flags != null) {
      xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags;
    }
  }
  regex = augment(new RegExp(options.source || regex.source, flags), hasNamedCapture(regex) ? xData.captureNames.slice(0) : null, xregexpSource, xregexpFlags, options.isInternalOnly);
  return regex;
}
function dec(hex) {
  return parseInt(hex, 16);
}
function getContextualTokenSeparator(match, scope, flags) {
  const matchEndPos = match.index + match[0].length;
  const precedingChar = match.input[match.index - 1];
  const followingChar = match.input[matchEndPos];
  if (/^[()|]$/.test(precedingChar) || /^[()|]$/.test(followingChar) || match.index === 0 || matchEndPos === match.input.length || /\(\?(?:[:=!]|<[=!])$/.test(match.input.substring(match.index - 4, match.index)) || isQuantifierNext(match.input, matchEndPos, flags)) {
    return "";
  }
  return "(?:)";
}
function getNativeFlags(regex) {
  return hasFlagsProp ? regex.flags : /\/([a-z]*)$/i.exec(RegExp.prototype.toString.call(regex))[1];
}
function hasNamedCapture(regex) {
  return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames);
}
function hex(dec2) {
  return parseInt(dec2, 10).toString(16);
}
function isQuantifierNext(pattern, pos, flags) {
  const inlineCommentPattern = "\\(\\?#[^)]*\\)";
  const lineCommentPattern = "#[^#\\n]*";
  const quantifierPattern = "[?*+]|{\\d+(?:,\\d*)?}";
  const regex = flags.includes("x") ? new RegExp(`^(?:\\s|${lineCommentPattern}|${inlineCommentPattern})*(?:${quantifierPattern})`) : new RegExp(`^(?:${inlineCommentPattern})*(?:${quantifierPattern})`);
  return regex.test(pattern.slice(pos));
}
function isType(value, type) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}
function nullThrows(value) {
  if (value == null) {
    throw new TypeError("Cannot convert null or undefined to object");
  }
  return value;
}
function pad4(str) {
  while (str.length < 4) {
    str = `0${str}`;
  }
  return str;
}
function prepareFlags(pattern, flags) {
  if (clipDuplicates(flags) !== flags) {
    throw new SyntaxError(`Invalid duplicate regex flag ${flags}`);
  }
  pattern = pattern.replace(/^\(\?([\w$]+)\)/, ($0, $1) => {
    if (/[dgy]/.test($1)) {
      throw new SyntaxError(`Cannot use flags dgy in mode modifier ${$0}`);
    }
    flags = clipDuplicates(flags + $1);
    return "";
  });
  for (const flag of flags) {
    if (!registeredFlags[flag]) {
      throw new SyntaxError(`Unknown regex flag ${flag}`);
    }
  }
  return {
    pattern,
    flags
  };
}
function prepareOptions(value) {
  const options = {};
  if (isType(value, "String")) {
    XRegExp.forEach(value, /[^\s,]+/, (match) => {
      options[match] = true;
    });
    return options;
  }
  return value;
}
function registerFlag(flag) {
  if (!/^[\w$]$/.test(flag)) {
    throw new Error("Flag must be a single character A-Za-z0-9_$");
  }
  registeredFlags[flag] = true;
}
function runTokens(pattern, flags, pos, scope, context) {
  let i = tokens.length;
  const leadChar = pattern[pos];
  let result = null;
  let match;
  let t;
  while (i--) {
    t = tokens[i];
    if (t.leadChar && t.leadChar !== leadChar || t.scope !== scope && t.scope !== "all" || t.flag && !flags.includes(t.flag)) {
      continue;
    }
    match = XRegExp.exec(pattern, t.regex, pos, "sticky");
    if (match) {
      result = {
        matchLength: match[0].length,
        output: t.handler.call(context, match, scope, flags),
        reparse: t.reparse
      };
      break;
    }
  }
  return result;
}
function setAstral(on) {
  features.astral = on;
}
function setNamespacing(on) {
  features.namespacing = on;
}
function XRegExp(pattern, flags) {
  if (XRegExp.isRegExp(pattern)) {
    if (flags !== undefined) {
      throw new TypeError("Cannot supply flags when copying a RegExp");
    }
    return copyRegex(pattern);
  }
  pattern = pattern === undefined ? "" : String(pattern);
  flags = flags === undefined ? "" : String(flags);
  if (XRegExp.isInstalled("astral") && !flags.includes("A")) {
    flags += "A";
  }
  if (!patternCache[pattern]) {
    patternCache[pattern] = {};
  }
  if (!patternCache[pattern][flags]) {
    const context = {
      hasNamedCapture: false,
      captureNames: []
    };
    let scope = defaultScope;
    let output = "";
    let pos = 0;
    let result;
    const applied = prepareFlags(pattern, flags);
    let appliedPattern = applied.pattern;
    const appliedFlags = applied.flags;
    while (pos < appliedPattern.length) {
      do {
        result = runTokens(appliedPattern, appliedFlags, pos, scope, context);
        if (result && result.reparse) {
          appliedPattern = appliedPattern.slice(0, pos) + result.output + appliedPattern.slice(pos + result.matchLength);
        }
      } while (result && result.reparse);
      if (result) {
        output += result.output;
        pos += result.matchLength || 1;
      } else {
        const [token] = XRegExp.exec(appliedPattern, nativeTokens[scope], pos, "sticky");
        output += token;
        pos += token.length;
        if (token === "[" && scope === defaultScope) {
          scope = classScope;
        } else if (token === "]" && scope === classScope) {
          scope = defaultScope;
        }
      }
    }
    patternCache[pattern][flags] = {
      pattern: output.replace(/(?:\(\?:\))+/g, "(?:)"),
      flags: appliedFlags.replace(nonnativeFlags, ""),
      captures: context.hasNamedCapture ? context.captureNames : null
    };
  }
  const generated = patternCache[pattern][flags];
  return augment(new RegExp(generated.pattern, generated.flags), generated.captures, pattern, flags);
}
XRegExp.prototype = new RegExp;
XRegExp.version = "5.1.2";
XRegExp._clipDuplicates = clipDuplicates;
XRegExp._hasNativeFlag = hasNativeFlag;
XRegExp._dec = dec;
XRegExp._hex = hex;
XRegExp._pad4 = pad4;
XRegExp.addToken = (regex, handler, options) => {
  options = options || {};
  let { optionalFlags } = options;
  if (options.flag) {
    registerFlag(options.flag);
  }
  if (optionalFlags) {
    optionalFlags = optionalFlags.split("");
    for (const flag of optionalFlags) {
      registerFlag(flag);
    }
  }
  tokens.push({
    regex: copyRegex(regex, {
      addG: true,
      addY: hasNativeY,
      isInternalOnly: true
    }),
    handler,
    scope: options.scope || defaultScope,
    flag: options.flag,
    reparse: options.reparse,
    leadChar: options.leadChar
  });
  XRegExp.cache.flush("patterns");
};
XRegExp.cache = (pattern, flags) => {
  if (!regexCache[pattern]) {
    regexCache[pattern] = {};
  }
  return regexCache[pattern][flags] || (regexCache[pattern][flags] = XRegExp(pattern, flags));
};
XRegExp.cache.flush = (cacheName) => {
  if (cacheName === "patterns") {
    patternCache = Object.create(null);
  } else {
    regexCache = Object.create(null);
  }
};
XRegExp.escape = (str) => String(nullThrows(str)).replace(/[\\\[\]{}()*+?.^$|]/g, "\\$&").replace(/[\s#\-,]/g, (match) => `\\u${pad4(hex(match.charCodeAt(0)))}`);
XRegExp.exec = (str, regex, pos, sticky) => {
  let cacheKey = "g";
  let addY = false;
  let fakeY = false;
  let match;
  addY = hasNativeY && !!(sticky || regex.sticky && sticky !== false);
  if (addY) {
    cacheKey += "y";
  } else if (sticky) {
    fakeY = true;
    cacheKey += "FakeY";
  }
  regex[REGEX_DATA] = regex[REGEX_DATA] || {};
  const r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
    addG: true,
    addY,
    source: fakeY ? `${regex.source}|()` : undefined,
    removeY: sticky === false,
    isInternalOnly: true
  }));
  pos = pos || 0;
  r2.lastIndex = pos;
  match = fixed.exec.call(r2, str);
  if (fakeY && match && match.pop() === "") {
    match = null;
  }
  if (regex.global) {
    regex.lastIndex = match ? r2.lastIndex : 0;
  }
  return match;
};
XRegExp.forEach = (str, regex, callback) => {
  let pos = 0;
  let i = -1;
  let match;
  while (match = XRegExp.exec(str, regex, pos)) {
    callback(match, ++i, str, regex);
    pos = match.index + (match[0].length || 1);
  }
};
XRegExp.globalize = (regex) => copyRegex(regex, { addG: true });
XRegExp.install = (options) => {
  options = prepareOptions(options);
  if (!features.astral && options.astral) {
    setAstral(true);
  }
  if (!features.namespacing && options.namespacing) {
    setNamespacing(true);
  }
};
XRegExp.isInstalled = (feature) => !!features[feature];
XRegExp.isRegExp = (value) => Object.prototype.toString.call(value) === "[object RegExp]";
XRegExp.match = (str, regex, scope) => {
  const global2 = regex.global && scope !== "one" || scope === "all";
  const cacheKey = (global2 ? "g" : "") + (regex.sticky ? "y" : "") || "noGY";
  regex[REGEX_DATA] = regex[REGEX_DATA] || {};
  const r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
    addG: !!global2,
    removeG: scope === "one",
    isInternalOnly: true
  }));
  const result = String(nullThrows(str)).match(r2);
  if (regex.global) {
    regex.lastIndex = scope === "one" && result ? result.index + result[0].length : 0;
  }
  return global2 ? result || [] : result && result[0];
};
XRegExp.matchChain = (str, chain) => function recurseChain(values, level) {
  const item = chain[level].regex ? chain[level] : { regex: chain[level] };
  const matches = [];
  function addMatch(match) {
    if (item.backref) {
      const ERR_UNDEFINED_GROUP = `Backreference to undefined group: ${item.backref}`;
      const isNamedBackref = isNaN(item.backref);
      if (isNamedBackref && XRegExp.isInstalled("namespacing")) {
        if (!(match.groups && (item.backref in match.groups))) {
          throw new ReferenceError(ERR_UNDEFINED_GROUP);
        }
      } else if (!match.hasOwnProperty(item.backref)) {
        throw new ReferenceError(ERR_UNDEFINED_GROUP);
      }
      const backrefValue = isNamedBackref && XRegExp.isInstalled("namespacing") ? match.groups[item.backref] : match[item.backref];
      matches.push(backrefValue || "");
    } else {
      matches.push(match[0]);
    }
  }
  for (const value of values) {
    XRegExp.forEach(value, item.regex, addMatch);
  }
  return level === chain.length - 1 || !matches.length ? matches : recurseChain(matches, level + 1);
}([str], 0);
XRegExp.replace = (str, search, replacement, scope) => {
  const isRegex = XRegExp.isRegExp(search);
  const global2 = search.global && scope !== "one" || scope === "all";
  const cacheKey = (global2 ? "g" : "") + (search.sticky ? "y" : "") || "noGY";
  let s2 = search;
  if (isRegex) {
    search[REGEX_DATA] = search[REGEX_DATA] || {};
    s2 = search[REGEX_DATA][cacheKey] || (search[REGEX_DATA][cacheKey] = copyRegex(search, {
      addG: !!global2,
      removeG: scope === "one",
      isInternalOnly: true
    }));
  } else if (global2) {
    s2 = new RegExp(XRegExp.escape(String(search)), "g");
  }
  const result = fixed.replace.call(nullThrows(str), s2, replacement);
  if (isRegex && search.global) {
    search.lastIndex = 0;
  }
  return result;
};
XRegExp.replaceEach = (str, replacements) => {
  for (const r of replacements) {
    str = XRegExp.replace(str, r[0], r[1], r[2]);
  }
  return str;
};
XRegExp.split = (str, separator, limit) => fixed.split.call(nullThrows(str), separator, limit);
XRegExp.test = (str, regex, pos, sticky) => !!XRegExp.exec(str, regex, pos, sticky);
XRegExp.uninstall = (options) => {
  options = prepareOptions(options);
  if (features.astral && options.astral) {
    setAstral(false);
  }
  if (features.namespacing && options.namespacing) {
    setNamespacing(false);
  }
};
XRegExp.union = (patterns, flags, options) => {
  options = options || {};
  const conjunction = options.conjunction || "or";
  let numCaptures = 0;
  let numPriorCaptures;
  let captureNames;
  function rewrite(match, paren, backref) {
    const name = captureNames[numCaptures - numPriorCaptures];
    if (paren) {
      ++numCaptures;
      if (name) {
        return `(?<${name}>`;
      }
    } else if (backref) {
      return `\\${+backref + numPriorCaptures}`;
    }
    return match;
  }
  if (!(isType(patterns, "Array") && patterns.length)) {
    throw new TypeError("Must provide a nonempty array of patterns to merge");
  }
  const parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
  const output = [];
  for (const pattern of patterns) {
    if (XRegExp.isRegExp(pattern)) {
      numPriorCaptures = numCaptures;
      captureNames = pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames || [];
      output.push(XRegExp(pattern.source).source.replace(parts, rewrite));
    } else {
      output.push(XRegExp.escape(pattern));
    }
  }
  const separator = conjunction === "none" ? "" : "|";
  return XRegExp(output.join(separator), flags);
};
fixed.exec = function(str) {
  const origLastIndex = this.lastIndex;
  const match = RegExp.prototype.exec.apply(this, arguments);
  if (match) {
    if (!correctExecNpcg && match.length > 1 && match.includes("")) {
      const r2 = copyRegex(this, {
        removeG: true,
        isInternalOnly: true
      });
      String(str).slice(match.index).replace(r2, (...args) => {
        const len = args.length;
        for (let i = 1;i < len - 2; ++i) {
          if (args[i] === undefined) {
            match[i] = undefined;
          }
        }
      });
    }
    if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
      let groupsObject = match;
      if (XRegExp.isInstalled("namespacing")) {
        match.groups = Object.create(null);
        groupsObject = match.groups;
      }
      for (let i = 1;i < match.length; ++i) {
        const name = this[REGEX_DATA].captureNames[i - 1];
        if (name) {
          groupsObject[name] = match[i];
        }
      }
    } else if (!match.groups && XRegExp.isInstalled("namespacing")) {
      match.groups = undefined;
    }
    if (this.global && !match[0].length && this.lastIndex > match.index) {
      this.lastIndex = match.index;
    }
  }
  if (!this.global) {
    this.lastIndex = origLastIndex;
  }
  return match;
};
fixed.test = function(str) {
  return !!fixed.exec.call(this, str);
};
fixed.match = function(regex) {
  if (!XRegExp.isRegExp(regex)) {
    regex = new RegExp(regex);
  } else if (regex.global) {
    const result = String.prototype.match.apply(this, arguments);
    regex.lastIndex = 0;
    return result;
  }
  return fixed.exec.call(regex, nullThrows(this));
};
fixed.replace = function(search, replacement) {
  const isRegex = XRegExp.isRegExp(search);
  let origLastIndex;
  let captureNames;
  let result;
  if (isRegex) {
    if (search[REGEX_DATA]) {
      ({ captureNames } = search[REGEX_DATA]);
    }
    origLastIndex = search.lastIndex;
  } else {
    search += "";
  }
  if (isType(replacement, "Function")) {
    result = String(this).replace(search, (...args) => {
      if (captureNames) {
        let groupsObject;
        if (XRegExp.isInstalled("namespacing")) {
          groupsObject = Object.create(null);
          args.push(groupsObject);
        } else {
          args[0] = new String(args[0]);
          [groupsObject] = args;
        }
        for (let i = 0;i < captureNames.length; ++i) {
          if (captureNames[i]) {
            groupsObject[captureNames[i]] = args[i + 1];
          }
        }
      }
      return replacement(...args);
    });
  } else {
    result = String(nullThrows(this)).replace(search, (...args) => {
      return String(replacement).replace(replacementToken, replacer);
      function replacer($0, bracketed, angled, dollarToken) {
        bracketed = bracketed || angled;
        const numNonCaptureArgs = isType(args[args.length - 1], "Object") ? 4 : 3;
        const numCaptures = args.length - numNonCaptureArgs;
        if (bracketed) {
          if (/^\d+$/.test(bracketed)) {
            const n2 = +bracketed;
            if (n2 <= numCaptures) {
              return args[n2] || "";
            }
          }
          const n = captureNames ? captureNames.indexOf(bracketed) : -1;
          if (n < 0) {
            throw new SyntaxError(`Backreference to undefined group ${$0}`);
          }
          return args[n + 1] || "";
        }
        if (dollarToken === "" || dollarToken === " ") {
          throw new SyntaxError(`Invalid token ${$0}`);
        }
        if (dollarToken === "&" || +dollarToken === 0) {
          return args[0];
        }
        if (dollarToken === "$") {
          return "$";
        }
        if (dollarToken === "`") {
          return args[args.length - 1].slice(0, args[args.length - 2]);
        }
        if (dollarToken === "'") {
          return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
        }
        dollarToken = +dollarToken;
        if (!isNaN(dollarToken)) {
          if (dollarToken > numCaptures) {
            throw new SyntaxError(`Backreference to undefined group ${$0}`);
          }
          return args[dollarToken] || "";
        }
        throw new SyntaxError(`Invalid token ${$0}`);
      }
    });
  }
  if (isRegex) {
    if (search.global) {
      search.lastIndex = 0;
    } else {
      search.lastIndex = origLastIndex;
    }
  }
  return result;
};
fixed.split = function(separator, limit) {
  if (!XRegExp.isRegExp(separator)) {
    return String.prototype.split.apply(this, arguments);
  }
  const str = String(this);
  const output = [];
  const origLastIndex = separator.lastIndex;
  let lastLastIndex = 0;
  let lastLength;
  limit = (limit === undefined ? -1 : limit) >>> 0;
  XRegExp.forEach(str, separator, (match) => {
    if (match.index + match[0].length > lastLastIndex) {
      output.push(str.slice(lastLastIndex, match.index));
      if (match.length > 1 && match.index < str.length) {
        Array.prototype.push.apply(output, match.slice(1));
      }
      lastLength = match[0].length;
      lastLastIndex = match.index + lastLength;
    }
  });
  if (lastLastIndex === str.length) {
    if (!separator.test("") || lastLength) {
      output.push("");
    }
  } else {
    output.push(str.slice(lastLastIndex));
  }
  separator.lastIndex = origLastIndex;
  return output.length > limit ? output.slice(0, limit) : output;
};
XRegExp.addToken(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/, (match, scope) => {
  if (match[1] === "B" && scope === defaultScope) {
    return match[0];
  }
  throw new SyntaxError(`Invalid escape ${match[0]}`);
}, {
  scope: "all",
  leadChar: "\\"
});
XRegExp.addToken(/\\u{([\dA-Fa-f]+)}/, (match, scope, flags) => {
  const code = dec(match[1]);
  if (code > 1114111) {
    throw new SyntaxError(`Invalid Unicode code point ${match[0]}`);
  }
  if (code <= 65535) {
    return `\\u${pad4(hex(code))}`;
  }
  if (hasNativeU && flags.includes("u")) {
    return match[0];
  }
  throw new SyntaxError("Cannot use Unicode code point above \\u{FFFF} without flag u");
}, {
  scope: "all",
  leadChar: "\\"
});
XRegExp.addToken(/\(\?#[^)]*\)/, getContextualTokenSeparator, { leadChar: "(" });
XRegExp.addToken(/\s+|#[^\n]*\n?/, getContextualTokenSeparator, { flag: "x" });
if (!hasNativeS) {
  XRegExp.addToken(/\./, () => "[\\s\\S]", {
    flag: "s",
    leadChar: "."
  });
}
XRegExp.addToken(/\\k<([^>]+)>/, function(match) {
  const index = isNaN(match[1]) ? this.captureNames.indexOf(match[1]) + 1 : +match[1];
  const endIndex = match.index + match[0].length;
  if (!index || index > this.captureNames.length) {
    throw new SyntaxError(`Backreference to undefined group ${match[0]}`);
  }
  return `\\${index}${endIndex === match.input.length || isNaN(match.input[endIndex]) ? "" : "(?:)"}`;
}, { leadChar: "\\" });
XRegExp.addToken(/\\(\d+)/, function(match, scope) {
  if (!(scope === defaultScope && /^[1-9]/.test(match[1]) && +match[1] <= this.captureNames.length) && match[1] !== "0") {
    throw new SyntaxError(`Cannot use octal escape or backreference to undefined group ${match[0]}`);
  }
  return match[0];
}, {
  scope: "all",
  leadChar: "\\"
});
XRegExp.addToken(/\(\?P?<([\p{ID_Start}$_][\p{ID_Continue}$_\u200C\u200D]*)>/u, function(match) {
  if (!XRegExp.isInstalled("namespacing") && (match[1] === "length" || match[1] === "__proto__")) {
    throw new SyntaxError(`Cannot use reserved word as capture name ${match[0]}`);
  }
  if (this.captureNames.includes(match[1])) {
    throw new SyntaxError(`Cannot use same name for multiple groups ${match[0]}`);
  }
  this.captureNames.push(match[1]);
  this.hasNamedCapture = true;
  return "(";
}, { leadChar: "(" });
XRegExp.addToken(/\((?!\?)/, function(match, scope, flags) {
  if (flags.includes("n")) {
    return "(?:";
  }
  this.captureNames.push(null);
  return "(";
}, {
  optionalFlags: "n",
  leadChar: "("
});
var xregexp_default = XRegExp;

// node_modules/xregexp/src/addons/build.js
/*!
 * XRegExp.build 5.1.2
 * <xregexp.com>
 * Steven Levithan (c) 2012-present MIT License
 */
var build_default = (XRegExp2) => {
  const REGEX_DATA2 = "xregexp";
  const subParts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
  const parts = XRegExp2.union([/\({{([\w$]+)}}\)|{{([\w$]+)}}/, subParts], "g", {
    conjunction: "or"
  });
  function deanchor(pattern) {
    const leadingAnchor = /^(?:\(\?:\))*\^/;
    const trailingAnchor = /\$(?:\(\?:\))*$/;
    if (leadingAnchor.test(pattern) && trailingAnchor.test(pattern) && trailingAnchor.test(pattern.replace(/\\[\s\S]/g, ""))) {
      return pattern.replace(leadingAnchor, "").replace(trailingAnchor, "");
    }
    return pattern;
  }
  function asXRegExp(value, addFlagX) {
    const flags = addFlagX ? "x" : "";
    return XRegExp2.isRegExp(value) ? value[REGEX_DATA2] && value[REGEX_DATA2].captureNames ? value : XRegExp2(value.source, flags) : XRegExp2(value, flags);
  }
  function interpolate(substitution) {
    return substitution instanceof RegExp ? substitution : XRegExp2.escape(substitution);
  }
  function reduceToSubpatternsObject(subpatterns, interpolated, subpatternIndex) {
    subpatterns[`subpattern${subpatternIndex}`] = interpolated;
    return subpatterns;
  }
  function embedSubpatternAfter(raw, subpatternIndex, rawLiterals) {
    const hasSubpattern = subpatternIndex < rawLiterals.length - 1;
    return raw + (hasSubpattern ? `{{subpattern${subpatternIndex}}}` : "");
  }
  XRegExp2.tag = (flags) => (literals, ...substitutions) => {
    const subpatterns = substitutions.map(interpolate).reduce(reduceToSubpatternsObject, {});
    const pattern = literals.raw.map(embedSubpatternAfter).join("");
    return XRegExp2.build(pattern, subpatterns, flags);
  };
  XRegExp2.build = (pattern, subs, flags) => {
    flags = flags || "";
    const addFlagX = flags.includes("x");
    const inlineFlags = /^\(\?([\w$]+)\)/.exec(pattern);
    if (inlineFlags) {
      flags = XRegExp2._clipDuplicates(flags + inlineFlags[1]);
    }
    const data = {};
    for (const p in subs) {
      if (subs.hasOwnProperty(p)) {
        const sub = asXRegExp(subs[p], addFlagX);
        data[p] = {
          pattern: deanchor(sub.source),
          names: sub[REGEX_DATA2].captureNames || []
        };
      }
    }
    const patternAsRegex = asXRegExp(pattern, addFlagX);
    let numCaps = 0;
    let numPriorCaps;
    let numOuterCaps = 0;
    const outerCapsMap = [0];
    const outerCapNames = patternAsRegex[REGEX_DATA2].captureNames || [];
    const output = patternAsRegex.source.replace(parts, ($0, $1, $2, $3, $4) => {
      const subName = $1 || $2;
      let capName;
      let intro;
      let localCapIndex;
      if (subName) {
        if (!data.hasOwnProperty(subName)) {
          throw new ReferenceError(`Undefined property ${$0}`);
        }
        if ($1) {
          capName = outerCapNames[numOuterCaps];
          outerCapsMap[++numOuterCaps] = ++numCaps;
          intro = `(?<${capName || subName}>`;
        } else {
          intro = "(?:";
        }
        numPriorCaps = numCaps;
        const rewrittenSubpattern = data[subName].pattern.replace(subParts, (match, paren, backref) => {
          if (paren) {
            capName = data[subName].names[numCaps - numPriorCaps];
            ++numCaps;
            if (capName) {
              return `(?<${capName}>`;
            }
          } else if (backref) {
            localCapIndex = +backref - 1;
            return data[subName].names[localCapIndex] ? `\\k<${data[subName].names[localCapIndex]}>` : `\\${+backref + numPriorCaps}`;
          }
          return match;
        });
        return `${intro}${rewrittenSubpattern})`;
      }
      if ($3) {
        capName = outerCapNames[numOuterCaps];
        outerCapsMap[++numOuterCaps] = ++numCaps;
        if (capName) {
          return `(?<${capName}>`;
        }
      } else if ($4) {
        localCapIndex = +$4 - 1;
        return outerCapNames[localCapIndex] ? `\\k<${outerCapNames[localCapIndex]}>` : `\\${outerCapsMap[+$4]}`;
      }
      return $0;
    });
    return XRegExp2(output, flags);
  };
};

// node_modules/xregexp/src/addons/matchrecursive.js
/*!
 * XRegExp.matchRecursive 5.1.2
 * <xregexp.com>
 * Steven Levithan (c) 2009-present MIT License
 */
var matchrecursive_default = (XRegExp2) => {
  function row(name, value, start, end) {
    return {
      name,
      value,
      start,
      end
    };
  }
  XRegExp2.matchRecursive = (str, left, right, flags, options) => {
    flags = flags || "";
    options = options || {};
    const global2 = flags.includes("g");
    const sticky = flags.includes("y");
    const basicFlags = flags.replace(/y/g, "");
    left = XRegExp2(left, basicFlags);
    right = XRegExp2(right, basicFlags);
    let esc;
    let { escapeChar } = options;
    if (escapeChar) {
      if (escapeChar.length > 1) {
        throw new Error("Cannot use more than one escape character");
      }
      escapeChar = XRegExp2.escape(escapeChar);
      esc = new RegExp(`(?:${escapeChar}[\\S\\s]|(?:(?!${XRegExp2.union([left, right], "", { conjunction: "or" }).source})[^${escapeChar}])+)+`, flags.replace(XRegExp2._hasNativeFlag("s") ? /[^imsu]/g : /[^imu]/g, ""));
    }
    let openTokens = 0;
    let delimStart = 0;
    let delimEnd = 0;
    let lastOuterEnd = 0;
    let outerStart;
    let innerStart;
    let leftMatch;
    let rightMatch;
    const vN = options.valueNames;
    const output = [];
    while (true) {
      if (escapeChar) {
        delimEnd += (XRegExp2.exec(str, esc, delimEnd, "sticky") || [""])[0].length;
      }
      leftMatch = XRegExp2.exec(str, left, delimEnd);
      rightMatch = XRegExp2.exec(str, right, delimEnd);
      if (leftMatch && rightMatch) {
        if (leftMatch.index <= rightMatch.index) {
          rightMatch = null;
        } else {
          leftMatch = null;
        }
      }
      if (leftMatch || rightMatch) {
        delimStart = (leftMatch || rightMatch).index;
        delimEnd = delimStart + (leftMatch || rightMatch)[0].length;
      } else if (!openTokens) {
        break;
      }
      if (sticky && !openTokens && delimStart > lastOuterEnd) {
        break;
      }
      if (leftMatch) {
        if (!openTokens) {
          outerStart = delimStart;
          innerStart = delimEnd;
        }
        openTokens += 1;
      } else if (rightMatch && openTokens) {
        openTokens -= 1;
        if (!openTokens) {
          if (vN) {
            if (vN[0] && outerStart > lastOuterEnd) {
              output.push(row(vN[0], str.slice(lastOuterEnd, outerStart), lastOuterEnd, outerStart));
            }
            if (vN[1]) {
              output.push(row(vN[1], str.slice(outerStart, innerStart), outerStart, innerStart));
            }
            if (vN[2]) {
              output.push(row(vN[2], str.slice(innerStart, delimStart), innerStart, delimStart));
            }
            if (vN[3]) {
              output.push(row(vN[3], str.slice(delimStart, delimEnd), delimStart, delimEnd));
            }
          } else {
            output.push(str.slice(innerStart, delimStart));
          }
          lastOuterEnd = delimEnd;
          if (!global2) {
            break;
          }
        }
      } else {
        const unbalanced = options.unbalanced || "error";
        if (unbalanced === "skip" || unbalanced === "skip-lazy") {
          if (rightMatch) {
            rightMatch = null;
          } else {
            if (unbalanced === "skip") {
              const outerStartDelimLength = XRegExp2.exec(str, left, outerStart, "sticky")[0].length;
              delimEnd = outerStart + (outerStartDelimLength || 1);
            } else {
              delimEnd = outerStart + 1;
            }
            openTokens = 0;
          }
        } else if (unbalanced === "error") {
          const delimSide = rightMatch ? "right" : "left";
          const errorPos = rightMatch ? delimStart : outerStart;
          throw new Error(`Unbalanced ${delimSide} delimiter found in string at position ${errorPos}`);
        } else {
          throw new Error(`Unsupported value for unbalanced: ${unbalanced}`);
        }
      }
      if (delimStart === delimEnd) {
        delimEnd += 1;
      }
    }
    if (global2 && output.length > 0 && !sticky && vN && vN[0] && str.length > lastOuterEnd) {
      output.push(row(vN[0], str.slice(lastOuterEnd), lastOuterEnd, str.length));
    }
    return output;
  };
};

// node_modules/xregexp/src/addons/unicode-base.js
/*!
 * XRegExp Unicode Base 5.1.2
 * <xregexp.com>
 * Steven Levithan (c) 2008-present MIT License
 */
var unicode_base_default = (XRegExp2) => {
  const unicode = {};
  const unicodeTypes = {};
  const dec2 = XRegExp2._dec;
  const hex2 = XRegExp2._hex;
  const pad42 = XRegExp2._pad4;
  function normalize(name) {
    return name.replace(/[- _]+/g, "").toLowerCase();
  }
  function charCode(chr) {
    const esc = /^\\[xu](.+)/.exec(chr);
    return esc ? dec2(esc[1]) : chr.charCodeAt(chr[0] === "\\" ? 1 : 0);
  }
  function invertBmp(range) {
    let output = "";
    let lastEnd = -1;
    XRegExp2.forEach(range, /(\\x..|\\u....|\\?[\s\S])(?:-(\\x..|\\u....|\\?[\s\S]))?/, (m) => {
      const start = charCode(m[1]);
      if (start > lastEnd + 1) {
        output += `\\u${pad42(hex2(lastEnd + 1))}`;
        if (start > lastEnd + 2) {
          output += `-\\u${pad42(hex2(start - 1))}`;
        }
      }
      lastEnd = charCode(m[2] || m[1]);
    });
    if (lastEnd < 65535) {
      output += `\\u${pad42(hex2(lastEnd + 1))}`;
      if (lastEnd < 65534) {
        output += "-\\uFFFF";
      }
    }
    return output;
  }
  function cacheInvertedBmp(slug) {
    const prop = "b!";
    return unicode[slug][prop] || (unicode[slug][prop] = invertBmp(unicode[slug].bmp));
  }
  function buildAstral(slug, isNegated) {
    const item = unicode[slug];
    let combined = "";
    if (item.bmp && !item.isBmpLast) {
      combined = `[${item.bmp}]${item.astral ? "|" : ""}`;
    }
    if (item.astral) {
      combined += item.astral;
    }
    if (item.isBmpLast && item.bmp) {
      combined += `${item.astral ? "|" : ""}[${item.bmp}]`;
    }
    return isNegated ? `(?:(?!${combined})(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\uFFFF]))` : `(?:${combined})`;
  }
  function cacheAstral(slug, isNegated) {
    const prop = isNegated ? "a!" : "a=";
    return unicode[slug][prop] || (unicode[slug][prop] = buildAstral(slug, isNegated));
  }
  XRegExp2.addToken(/\\([pP])(?:{(\^?)(?:(\w+)=)?([^}]*)}|([A-Za-z]))/, (match, scope, flags) => {
    const ERR_DOUBLE_NEG = "Invalid double negation ";
    const ERR_UNKNOWN_NAME = "Unknown Unicode token ";
    const ERR_UNKNOWN_REF = "Unicode token missing data ";
    const ERR_ASTRAL_ONLY = "Astral mode required for Unicode token ";
    const ERR_ASTRAL_IN_CLASS = "Astral mode does not support Unicode tokens within character classes";
    const [
      fullToken,
      pPrefix,
      caretNegation,
      typePrefix,
      tokenName,
      tokenSingleCharName
    ] = match;
    let isNegated = pPrefix === "P" || !!caretNegation;
    const isAstralMode = flags.includes("A");
    let slug = normalize(tokenSingleCharName || tokenName);
    let item = unicode[slug];
    if (pPrefix === "P" && caretNegation) {
      throw new SyntaxError(ERR_DOUBLE_NEG + fullToken);
    }
    if (!unicode.hasOwnProperty(slug)) {
      throw new SyntaxError(ERR_UNKNOWN_NAME + fullToken);
    }
    if (typePrefix) {
      if (!(unicodeTypes[typePrefix] && unicodeTypes[typePrefix][slug])) {
        throw new SyntaxError(ERR_UNKNOWN_NAME + fullToken);
      }
    }
    if (item.inverseOf) {
      slug = normalize(item.inverseOf);
      if (!unicode.hasOwnProperty(slug)) {
        throw new ReferenceError(`${ERR_UNKNOWN_REF + fullToken} -> ${item.inverseOf}`);
      }
      item = unicode[slug];
      isNegated = !isNegated;
    }
    if (!(item.bmp || isAstralMode)) {
      throw new SyntaxError(ERR_ASTRAL_ONLY + fullToken);
    }
    if (isAstralMode) {
      if (scope === "class") {
        throw new SyntaxError(ERR_ASTRAL_IN_CLASS);
      }
      return cacheAstral(slug, isNegated);
    }
    return scope === "class" ? isNegated ? cacheInvertedBmp(slug) : item.bmp : `${(isNegated ? "[^" : "[") + item.bmp}]`;
  }, {
    scope: "all",
    optionalFlags: "A",
    leadChar: "\\"
  });
  XRegExp2.addUnicodeData = (data, typePrefix) => {
    const ERR_NO_NAME = "Unicode token requires name";
    const ERR_NO_DATA = "Unicode token has no character data ";
    if (typePrefix) {
      unicodeTypes[typePrefix] = {};
    }
    for (const item of data) {
      if (!item.name) {
        throw new Error(ERR_NO_NAME);
      }
      if (!(item.inverseOf || item.bmp || item.astral)) {
        throw new Error(ERR_NO_DATA + item.name);
      }
      const normalizedName = normalize(item.name);
      unicode[normalizedName] = item;
      if (typePrefix) {
        unicodeTypes[typePrefix][normalizedName] = true;
      }
      if (item.alias) {
        const normalizedAlias = normalize(item.alias);
        unicode[normalizedAlias] = item;
        if (typePrefix) {
          unicodeTypes[typePrefix][normalizedAlias] = true;
        }
      }
    }
    XRegExp2.cache.flush("patterns");
  };
  XRegExp2._getUnicodeProperty = (name) => {
    const slug = normalize(name);
    return unicode[slug];
  };
};

// node_modules/xregexp/src/addons/unicode-categories.js
var import_categories = __toESM(require_categories(), 1);
/*!
 * XRegExp Unicode Categories 5.1.2
 * <xregexp.com>
 * Steven Levithan (c) 2010-present MIT License
 * Unicode data by Mathias Bynens <mathiasbynens.be>
 */
var unicode_categories_default = (XRegExp2) => {
  if (!XRegExp2.addUnicodeData) {
    throw new ReferenceError("Unicode Base must be loaded before Unicode Categories");
  }
  XRegExp2.addUnicodeData(import_categories.default);
};

// node_modules/xregexp/src/addons/unicode-properties.js
var import_properties = __toESM(require_properties(), 1);
/*!
 * XRegExp Unicode Properties 5.1.2
 * <xregexp.com>
 * Steven Levithan (c) 2012-present MIT License
 * Unicode data by Mathias Bynens <mathiasbynens.be>
 */
var unicode_properties_default = (XRegExp2) => {
  if (!XRegExp2.addUnicodeData) {
    throw new ReferenceError("Unicode Base must be loaded before Unicode Properties");
  }
  const unicodeData = import_properties.default;
  unicodeData.push({
    name: "Assigned",
    inverseOf: "Cn"
  });
  XRegExp2.addUnicodeData(unicodeData);
};

// node_modules/xregexp/src/addons/unicode-scripts.js
var import_scripts = __toESM(require_scripts(), 1);
/*!
 * XRegExp Unicode Scripts 5.1.2
 * <xregexp.com>
 * Steven Levithan (c) 2010-present MIT License
 * Unicode data by Mathias Bynens <mathiasbynens.be>
 */
var unicode_scripts_default = (XRegExp2) => {
  if (!XRegExp2.addUnicodeData) {
    throw new ReferenceError("Unicode Base must be loaded before Unicode Scripts");
  }
  XRegExp2.addUnicodeData(import_scripts.default, "Script");
};

// node_modules/xregexp/src/index.js
build_default(xregexp_default);
matchrecursive_default(xregexp_default);
unicode_base_default(xregexp_default);
unicode_categories_default(xregexp_default);
unicode_properties_default(xregexp_default);
unicode_scripts_default(xregexp_default);
var src_default = xregexp_default;

// src/input/patterns.ts
function compileRe(pattern, extraFlags) {
  try {
    return src_default(pattern, extraFlags ?? "");
  } catch {
    return null;
  }
}

class TokenizingPatterns {
  wsp;
  cmt;
  eol;
  nonDefault;
  constructor(wsp, cmt, eol, nonDefault = false) {
    this.wsp = wsp;
    this.cmt = cmt;
    this.eol = eol;
    this.nonDefault = nonDefault;
  }
}
function newPatterns(wsp, cmt, eol) {
  return new TokenizingPatterns(compileRe(wsp), compileRe(cmt), compileRe(eol));
}
function defaultPatterns() {
  const pat = newPatterns("\\s+", "[^\\s\\S]", "[^\\s\\S]");
  pat.nonDefault = false;
  return pat;
}
function configurePatterns(patterns, cfg) {
  patterns.nonDefault = false;
  if (cfg.whitespace !== undefined) {
    patterns.nonDefault = true;
    if (cfg.whitespace !== null && cfg.whitespace !== "") {
      const re = compileRe(cfg.whitespace);
      if (re !== null) {
        patterns.wsp = re;
      }
    } else {
      patterns.wsp = null;
    }
  }
  if (cfg.comments !== undefined) {
    patterns.nonDefault = true;
    if (cfg.comments !== null) {
      const re = compileRe(cfg.comments);
      if (re !== null) {
        patterns.cmt = re;
      }
    } else {
      patterns.cmt = null;
    }
  }
  if (cfg.eolComments !== undefined) {
    patterns.nonDefault = true;
    if (cfg.eolComments !== null) {
      const re = compileRe(cfg.eolComments);
      if (re !== null) {
        patterns.eol = re;
      }
    } else {
      patterns.eol = null;
    }
  }
}
var _default = defaultPatterns();
function resetPatterns(patterns) {
  patterns.wsp = _default.wsp;
  patterns.cmt = _default.cmt;
  patterns.eol = _default.eol;
  patterns.nonDefault = false;
}

// src/input/cursor-str.ts
class CursorHeavy {
  ignoreCase = false;
  nameGuard = false;
  nameChars = "";
  source = "";
  patterns = defaultPatterns();
  patternCache = new Map;
}

class StrCursor {
  text;
  offset = 0;
  heavy;
  constructor(text, source, start) {
    this.text = text;
    this.heavy = new CursorHeavy;
    if (source !== undefined) {
      this.heavy.source = source;
    } else {
      this.offset = 0;
    }
    if (start !== undefined) {
      if (start > text.length) {
        start = text.length;
      }
      while (start < text.length && !isRuneStart(text, start)) {
        start++;
      }
      this.offset = start;
    } else {
      this.offset = 0;
    }
  }
  configure(cfg) {
    if (cfg.source) {
      this.heavy.source = cfg.source;
    }
    this.heavy.ignoreCase = cfg.ignoreCase ?? false;
    this.heavy.nameChars = cfg.nameChars ?? "";
    configurePatterns(this.heavy.patterns, cfg);
    const nc = cfg.nameChars ?? "";
    if (cfg.nameGuard !== undefined && cfg.nameGuard !== null) {
      this.heavy.nameGuard = cfg.nameGuard;
    } else {
      this.heavy.nameGuard = nc !== "" || this.heavy.patterns.nonDefault && this.heavy.patterns.wsp !== null && !this.heavy.patterns.wsp.test("");
    }
  }
  inputSource() {
    return this.heavy.source;
  }
  mark() {
    return this.offset;
  }
  reset(mark) {
    this.offset = mark;
  }
  len() {
    return this.text.length;
  }
  lineCount() {
    if (this.text.length === 0)
      return 0;
    let count = 0;
    for (let i = 0;i < this.text.length; i++) {
      if (this.text[i] === `
`) {
        count++;
      }
    }
    if (this.text[this.text.length - 1] !== `
`) {
      count++;
    }
    return count;
  }
  lineAt(mark, keepend = true) {
    const lines2 = this.linesAt(mark, mark + 1, keepend);
    if (lines2 && lines2.length > 0) {
      return lines2[0];
    }
    return "";
  }
  linesAt(start, end, keepend = false) {
    if (end <= start || start < 0) {
      return [];
    }
    const out = [];
    let i = 0;
    for (const line of lines(this.text, keepend)) {
      if (i >= end) {
        break;
      }
      if (i >= start) {
        out.push(line);
      }
      i++;
    }
    return out;
  }
  asStr() {
    return this.text;
  }
  asRef() {
    return this.text;
  }
  ignoreCase() {
    return this.heavy.ignoreCase;
  }
  nameGuard() {
    return this.heavy.nameGuard;
  }
  lookahead(start) {
    const text = this.text;
    if (start >= text.length) {
      return "";
    }
    const lines2 = splitlines(text.slice(start));
    return stripRight(lines2[0]);
  }
  atEnd() {
    return this.offset >= this.text.length;
  }
  next() {
    const [ch, ok] = this.peek();
    if (ok) {
      this.offset += ch.length;
      return [ch, ok];
    }
    return ["", false];
  }
  peek() {
    if (this.atEnd()) {
      return ["", false];
    }
    const cp = this.text.codePointAt(this.offset);
    if (cp === undefined) {
      return ["", false];
    }
    return [String.fromCodePoint(cp), true];
  }
  isNameChar(c) {
    return c === "_" || isAlphanumeric(c) || this.heavy.nameChars.includes(c);
  }
  isName(token) {
    if (token === "") {
      return false;
    }
    const cp = token.codePointAt(0);
    if (cp === undefined) {
      return false;
    }
    const first = String.fromCodePoint(cp);
    if (!isAlphabetic(first) && first !== "_" && !this.heavy.nameChars.includes(first)) {
      return false;
    }
    let i = first.length;
    while (i < token.length) {
      const cp2 = token.codePointAt(i);
      if (cp2 === undefined) {
        return false;
      }
      const ch = String.fromCodePoint(cp2);
      if (!this.isNameChar(ch)) {
        return false;
      }
      i += ch.length;
    }
    return true;
  }
  peekToken(token) {
    if (this.offset + token.length > this.text.length) {
      return ["", false];
    }
    const slice = this.text.slice(this.offset, this.offset + token.length);
    if (this.heavy.ignoreCase) {
      if (slice.toLowerCase() === token.toLowerCase()) {
        return [slice, true];
      }
    } else if (slice === token) {
      return [slice, true];
    }
    return ["", false];
  }
  matchToken(token) {
    const mark = this.offset;
    const [slice, ok] = this.peekToken(token);
    if (!ok) {
      return ["", false];
    }
    this.offset += token.length;
    if (this.offset >= this.text.length) {
      return [slice, true];
    }
    if (!(this.heavy.nameGuard && this.isName(token))) {
      return [slice, true];
    }
    const cp = this.text.codePointAt(this.offset);
    if (cp === undefined) {
      return [slice, true];
    }
    const next = String.fromCodePoint(cp);
    if (!this.isNameChar(next)) {
      return [slice, true];
    }
    this.offset = mark;
    return ["", false];
  }
  matchPattern(pattern) {
    const pat = this.getPattern(pattern);
    if (pat === null) {
      return ["", false];
    }
    const text = this.text.slice(this.offset);
    const m = text.match(pat);
    if (m === null || m.index !== 0) {
      return ["", false];
    }
    this.offset += m[0].length;
    if (m[1] !== undefined) {
      return [m[1], true];
    }
    if (m[0] !== undefined) {
      return [m[0], true];
    }
    return ["", false];
  }
  getPattern(pattern) {
    const cached = this.heavy.patternCache.get(pattern);
    if (cached !== undefined) {
      return cached;
    }
    try {
      const re = src_default(pattern);
      this.heavy.patternCache.set(pattern, re);
      return re;
    } catch {
      return null;
    }
  }
  matchEOL() {
    const mark = this.offset;
    this.eatSpacesNoNewlines();
    const [n, ok] = takeLinebreakLen(this.text, this.offset);
    if (ok) {
      this.offset += n;
      this.eatSpacesNoNewlines();
      return true;
    }
    this.offset = mark;
    return false;
  }
  matchMetaPattern(regex, withBoundary = true) {
    let start = this.offset;
    const slice = this.text.slice(this.offset);
    const match = slice.match(regex);
    if (!match)
      return null;
    this.offset += match[0].length;
    if (withBoundary && !this.isBoundary()) {
      this.reset(start);
      return null;
    }
    return match[0];
  }
  matchName() {
    return this.matchMetaPattern(/[_\p{XID_Start}][_\p{XID_Continue}]*\b/u);
  }
  matchUInt(withBoundary = true) {
    const raw = this.matchMetaPattern(/\d+(?:_?\d+)*/, withBoundary);
    return raw !== null ? Number(raw.replace(/_/g, "")) : null;
  }
  matchInt(withBoundary = true) {
    const raw = this.matchMetaPattern(/[+-]?\d+(?:_?\d+)*/, withBoundary);
    return raw !== null ? Number(raw.replace(/_/g, "")) : null;
  }
  matchFloat() {
    const start = this.offset;
    const text = this.text;
    if (this.matchInt(false) === null) {
      this.reset(start);
      return null;
    }
    let p = this.offset;
    if (p < text.length && text[p] === ".") {
      this.offset++;
      p = this.offset;
      if (p < text.length && /\d/.test(text[p])) {
        if (this.matchUInt(false) === null) {
          this.reset(start);
          return null;
        }
      }
    }
    p = this.offset;
    if (p < text.length && (text[p] === "e" || text[p] === "E")) {
      this.offset++;
      if (this.matchInt(false) === null) {
        this.reset(start);
        return null;
      }
    }
    if (!this.isBoundary()) {
      this.reset(start);
      return null;
    }
    p = this.offset;
    return Number(text.slice(start, p).replace(/_/g, ""));
  }
  matchBool() {
    const raw = this.matchMetaPattern(/true|false/i);
    return raw !== null ? raw.toLowerCase() === "true" : null;
  }
  isBoundary() {
    if (this.offset >= this.text.length)
      return true;
    const slice = this.text.slice(this.offset);
    return /[^_\w\d\p{XID_Start}\p{XID_Continue}]/u.test(slice);
  }
  nextToken() {
    const wsp = this.heavy.patterns.wsp;
    const eol = this.heavy.patterns.eol;
    const cmt = this.heavy.patterns.cmt;
    while (true) {
      const prev = this.offset;
      this.eatPattern(wsp);
      if (this.eatPattern(eol)) {
        this.eatPattern(wsp);
      }
      this.eatPattern(cmt);
      if (this.atEnd() || this.offset === prev) {
        break;
      }
    }
  }
  pos() {
    return this.posAt(this.offset);
  }
  posAt(mark) {
    const text = this.text;
    if (mark <= 0 || text.length === 0) {
      return [1, 1];
    }
    if (mark > text.length) {
      mark = text.length;
    }
    const prefix = text.slice(0, mark);
    const lines2 = splitlines(prefix, true);
    const line = lines2[lines2.length - 1];
    let lineno = lines2.length;
    let colno = stripRight(line).length;
    if (colno < line.length) {
      lineno += 1;
      colno = 1;
    } else if (colno <= 0) {
      colno = 1;
    }
    return [lineno, colno];
  }
  location() {
    const [line, col] = this.pos();
    return new Location(this.heavy.source, line, col);
  }
  locationAt(mark) {
    const [line, col] = this.posAt(mark);
    return new Location(this.heavy.source, line, col);
  }
  setTokenizingPatterns(patterns) {
    if (patterns === null) {
      resetPatterns(this.heavy.patterns);
    } else {
      this.heavy.patterns = patterns;
    }
  }
  setIgnoreCase(ignore) {
    this.heavy.ignoreCase = ignore;
  }
  clone() {
    const c = new StrCursor(this.text);
    c.offset = this.offset;
    c.heavy = this.heavy;
    return c;
  }
  eatPattern(pat) {
    if (pat === null || this.atEnd() || pat.source === "") {
      return false;
    }
    const text = this.text.slice(this.offset);
    const m = text.match(pat);
    if (m !== null && m.index === 0 && m[0].length > 0) {
      this.offset += m[0].length;
      return true;
    }
    return false;
  }
  eatSpacesNoNewlines() {
    for (;; ) {
      const prev = this.offset;
      this.offset += takeNonNewlineWhitespaceLen(this.text, this.offset);
      if (this.eatPattern(this.heavy.patterns.eol)) {
        this.offset += takeNonNewlineWhitespaceLen(this.text, this.offset);
      }
      this.eatPattern(this.heavy.patterns.cmt);
      if (this.offset === prev) {
        break;
      }
    }
  }
}
function isRuneStart(s, i) {
  const cp = s.charCodeAt(i);
  return cp < 56320 || cp > 57343;
}
function takeLinebreakLen(s, pos) {
  if (pos >= s.length) {
    return [0, false];
  }
  switch (s[pos]) {
    case `
`:
      return [1, true];
    case "\r":
      if (pos + 1 < s.length && s[pos + 1] === `
`) {
        return [2, true];
      }
      return [1, true];
  }
  return [0, false];
}
function takeNonNewlineWhitespaceLen(s, pos) {
  let i = pos;
  while (i < s.length) {
    const c = s[i];
    if (c !== " " && c !== "\t" && c !== "\f") {
      break;
    }
    i++;
  }
  return i - pos;
}
// grammar/tatsu.json
var tatsu_default = {
  __class__: "Grammar",
  name: "TatSu",
  directives: {
    grammar: "TatSu",
    whitespace: "(?m)\\s+",
    comments: "(?ms)[(][*]\\s*(.*?)\\s*[*][)]|/[*]\\s*(.*?)\\s*[*]/",
    eol_comments: "(?ms)(?:[#]|[\\/][\\/])(.*?)$",
    parseinfo: true,
    left_recursion: false
  },
  keywords: [],
  rules: [
    {
      __class__: "Rule",
      name: "start",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Call",
        name: "grammar"
      }
    },
    {
      __class__: "Rule",
      name: "grammar",
      params: [
        "Grammar"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "title",
            exp: {
              __class__: "Constant",
              literal: "TATSU"
            }
          },
          {
            __class__: "Closure",
            exp: {
              __class__: "Choice",
              options: [
                {
                  __class__: "NamedList",
                  name: "directives",
                  exp: {
                    __class__: "Call",
                    name: "directive"
                  }
                },
                {
                  __class__: "NamedList",
                  name: "keywords",
                  exp: {
                    __class__: "Call",
                    name: "keyword"
                  }
                }
              ]
            }
          },
          {
            __class__: "NamedList",
            name: "rules",
            exp: {
              __class__: "Call",
              name: "rule"
            }
          },
          {
            __class__: "Closure",
            exp: {
              __class__: "Choice",
              options: [
                {
                  __class__: "NamedList",
                  name: "rules",
                  exp: {
                    __class__: "Call",
                    name: "rule"
                  }
                },
                {
                  __class__: "NamedList",
                  name: "keywords",
                  exp: {
                    __class__: "Call",
                    name: "keyword"
                  }
                }
              ]
            }
          },
          {
            __class__: "EOF"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "directive",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "@@"
          },
          {
            __class__: "NegativeLookahead",
            exp: {
              __class__: "Token",
              token: "keyword"
            }
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Choice",
            options: [
              {
                __class__: "Sequence",
                sequence: [
                  {
                    __class__: "Named",
                    name: "name",
                    exp: {
                      __class__: "Choice",
                      options: [
                        {
                          __class__: "Token",
                          token: "comments"
                        },
                        {
                          __class__: "Token",
                          token: "eol_comments"
                        }
                      ]
                    }
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Token",
                    token: "::"
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Named",
                    name: "value",
                    exp: {
                      __class__: "Call",
                      name: "regex"
                    }
                  }
                ]
              },
              {
                __class__: "Sequence",
                sequence: [
                  {
                    __class__: "Named",
                    name: "name",
                    exp: {
                      __class__: "Token",
                      token: "whitespace"
                    }
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Token",
                    token: "::"
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Named",
                    name: "value",
                    exp: {
                      __class__: "Choice",
                      options: [
                        {
                          __class__: "Call",
                          name: "regex"
                        },
                        {
                          __class__: "Call",
                          name: "string"
                        },
                        {
                          __class__: "Token",
                          token: "None"
                        },
                        {
                          __class__: "Token",
                          token: "False"
                        },
                        {
                          __class__: "Constant",
                          literal: null
                        }
                      ]
                    }
                  }
                ]
              },
              {
                __class__: "Sequence",
                sequence: [
                  {
                    __class__: "Named",
                    name: "name",
                    exp: {
                      __class__: "Choice",
                      options: [
                        {
                          __class__: "Token",
                          token: "nameguard"
                        },
                        {
                          __class__: "Token",
                          token: "ignorecase"
                        },
                        {
                          __class__: "Token",
                          token: "left_recursion"
                        },
                        {
                          __class__: "Token",
                          token: "parseinfo"
                        },
                        {
                          __class__: "Token",
                          token: "memoization"
                        }
                      ]
                    }
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Choice",
                    options: [
                      {
                        __class__: "Sequence",
                        sequence: [
                          {
                            __class__: "Token",
                            token: "::"
                          },
                          {
                            __class__: "Cut"
                          },
                          {
                            __class__: "Named",
                            name: "value",
                            exp: {
                              __class__: "Call",
                              name: "boolean"
                            }
                          }
                        ]
                      },
                      {
                        __class__: "Named",
                        name: "value",
                        exp: {
                          __class__: "Constant",
                          literal: true
                        }
                      }
                    ]
                  }
                ]
              },
              {
                __class__: "Sequence",
                sequence: [
                  {
                    __class__: "Named",
                    name: "name",
                    exp: {
                      __class__: "Token",
                      token: "grammar"
                    }
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Token",
                    token: "::"
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Named",
                    name: "value",
                    exp: {
                      __class__: "Call",
                      name: "word"
                    }
                  }
                ]
              },
              {
                __class__: "Sequence",
                sequence: [
                  {
                    __class__: "Named",
                    name: "name",
                    exp: {
                      __class__: "Token",
                      token: "namechars"
                    }
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Token",
                    token: "::"
                  },
                  {
                    __class__: "Cut"
                  },
                  {
                    __class__: "Named",
                    name: "value",
                    exp: {
                      __class__: "Call",
                      name: "string"
                    }
                  }
                ]
              }
            ]
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "keywords",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "PositiveClosure",
        exp: {
          __class__: "Call",
          name: "keyword"
        }
      }
    },
    {
      __class__: "Rule",
      name: "keyword",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "@@keyword"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Token",
            token: "::"
          },
          {
            __class__: "PositiveClosure",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "OverrideList",
                  exp: {
                    __class__: "Choice",
                    options: [
                      {
                        __class__: "Call",
                        name: "word"
                      },
                      {
                        __class__: "Call",
                        name: "string"
                      }
                    ]
                  }
                },
                {
                  __class__: "NegativeLookahead",
                  exp: {
                    __class__: "Choice",
                    options: [
                      {
                        __class__: "Token",
                        token: ":"
                      },
                      {
                        __class__: "Token",
                        token: "="
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "params",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "OverrideList",
            exp: {
              __class__: "Call",
              name: "first_param"
            }
          },
          {
            __class__: "Closure",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Token",
                  token: ","
                },
                {
                  __class__: "OverrideList",
                  exp: {
                    __class__: "Call",
                    name: "literal"
                  }
                },
                {
                  __class__: "NegativeLookahead",
                  exp: {
                    __class__: "Token",
                    token: "="
                  }
                },
                {
                  __class__: "Cut"
                }
              ]
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "first_param",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "path"
          },
          {
            __class__: "Call",
            name: "literal"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "kwparams",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "PositiveGather",
        exp: {
          __class__: "Call",
          name: "pair"
        },
        sep: {
          __class__: "Token",
          token: ","
        }
      }
    },
    {
      __class__: "Rule",
      name: "the_params_at_last",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Named",
            name: "kwparams",
            exp: {
              __class__: "Call",
              name: "kwparams"
            }
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Named",
                name: "params",
                exp: {
                  __class__: "Call",
                  name: "params"
                }
              },
              {
                __class__: "Token",
                token: ","
              },
              {
                __class__: "Cut"
              },
              {
                __class__: "Named",
                name: "kwparams",
                exp: {
                  __class__: "Call",
                  name: "kwparams"
                }
              }
            ]
          },
          {
            __class__: "Named",
            name: "params",
            exp: {
              __class__: "Call",
              name: "params"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "paramdef",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Token",
                token: "["
              },
              {
                __class__: "Cut"
              },
              {
                __class__: "RuleInclude",
                name: "the_params_at_last"
              },
              {
                __class__: "Token",
                token: "]"
              }
            ]
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Token",
                token: "("
              },
              {
                __class__: "Cut"
              },
              {
                __class__: "RuleInclude",
                name: "the_params_at_last"
              },
              {
                __class__: "Token",
                token: ")"
              }
            ]
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Token",
                token: "::"
              },
              {
                __class__: "Cut"
              },
              {
                __class__: "Named",
                name: "params",
                exp: {
                  __class__: "Call",
                  name: "params"
                }
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "rule",
      params: [
        "Rule"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "decorators",
            exp: {
              __class__: "Closure",
              exp: {
                __class__: "Call",
                name: "decorator"
              }
            }
          },
          {
            __class__: "Named",
            name: "name",
            exp: {
              __class__: "NameMeta"
            }
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Optional",
            exp: {
              __class__: "RuleInclude",
              name: "paramdef"
            }
          },
          {
            __class__: "Optional",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Token",
                  token: "<"
                },
                {
                  __class__: "Cut"
                },
                {
                  __class__: "Named",
                  name: "base",
                  exp: {
                    __class__: "Call",
                    name: "known_name"
                  }
                }
              ]
            }
          },
          {
            __class__: "Void"
          },
          {
            __class__: "Pattern",
            pattern: "=|::=|:=?"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Call",
            name: "ENDRULE"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "ENDRULE",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "DEDENT"
          },
          {
            __class__: "Call",
            name: "BLANK"
          },
          {
            __class__: "Token",
            token: ";"
          },
          {
            __class__: "EOF"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "DEDENT",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Call",
            name: "EOL"
          },
          {
            __class__: "Lookahead",
            exp: {
              __class__: "Pattern",
              pattern: "\\S"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "BLANK",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Call",
            name: "EOL"
          },
          {
            __class__: "Call",
            name: "EOL"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "EOL",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Pattern",
            pattern: "(?m)[ \\t]*$"
          },
          {
            __class__: "Pattern",
            pattern: "(?m)(?:\\r?\\n|\\r)?"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "decorator",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "@"
          },
          {
            __class__: "NegativeLookahead",
            exp: {
              __class__: "Token",
              token: "@"
            }
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Pattern",
              pattern: "(override|name|isname|nomemo|nostak)\\b"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "pair",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "OverrideList",
            exp: {
              __class__: "Call",
              name: "word"
            }
          },
          {
            __class__: "Token",
            token: "="
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "OverrideList",
            exp: {
              __class__: "Call",
              name: "literal"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "expre",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "choice"
          },
          {
            __class__: "Call",
            name: "sequence"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "choice",
      params: [
        "Choice"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Optional",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Token",
                  token: "|"
                },
                {
                  __class__: "Cut"
                }
              ]
            }
          },
          {
            __class__: "OverrideList",
            exp: {
              __class__: "Call",
              name: "option"
            }
          },
          {
            __class__: "PositiveClosure",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Token",
                  token: "|"
                },
                {
                  __class__: "Cut"
                },
                {
                  __class__: "OverrideList",
                  exp: {
                    __class__: "Call",
                    name: "option"
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "option",
      params: [
        "Option"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Call",
        name: "sequence"
      }
    },
    {
      __class__: "Rule",
      name: "sequence",
      params: [
        "Sequence"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Lookahead",
                exp: {
                  __class__: "Sequence",
                  sequence: [
                    {
                      __class__: "Call",
                      name: "element"
                    },
                    {
                      __class__: "Token",
                      token: ","
                    }
                  ]
                }
              },
              {
                __class__: "PositiveGather",
                exp: {
                  __class__: "Call",
                  name: "element"
                },
                sep: {
                  __class__: "Token",
                  token: ","
                }
              }
            ]
          },
          {
            __class__: "PositiveClosure",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "NegativeLookahead",
                  exp: {
                    __class__: "Call",
                    name: "ENDRULE"
                  }
                },
                {
                  __class__: "Call",
                  name: "element"
                }
              ]
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "element",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "override"
          },
          {
            __class__: "Call",
            name: "meta"
          },
          {
            __class__: "Call",
            name: "named"
          },
          {
            __class__: "Call",
            name: "term"
          },
          {
            __class__: "Call",
            name: "rule_include"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "rule_include",
      params: [
        "RuleInclude"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: ">"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "known_name"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "named",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "named_list"
          },
          {
            __class__: "Call",
            name: "named_single"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "named_list",
      params: [
        "NamedList"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "name",
            exp: {
              __class__: "NameMeta"
            }
          },
          {
            __class__: "Pattern",
            pattern: "\\+[:=]"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "term"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "named_single",
      params: [
        "Named"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "name",
            exp: {
              __class__: "NameMeta"
            }
          },
          {
            __class__: "Pattern",
            pattern: "[:=]"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "term"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "override",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "override_list"
          },
          {
            __class__: "Call",
            name: "override_single"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "override_list",
      params: [
        "OverrideList"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Pattern",
            pattern: "\\+=|@\\+:"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "term"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "override_single",
      params: [
        "Override"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Pattern",
            pattern: "=|@:"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "term"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "term",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "gather"
          },
          {
            __class__: "Call",
            name: "join"
          },
          {
            __class__: "Call",
            name: "left_join"
          },
          {
            __class__: "Call",
            name: "right_join"
          },
          {
            __class__: "Call",
            name: "empty_closure"
          },
          {
            __class__: "Call",
            name: "positive_closure"
          },
          {
            __class__: "Call",
            name: "closure"
          },
          {
            __class__: "Call",
            name: "optional"
          },
          {
            __class__: "Call",
            name: "atom"
          },
          {
            __class__: "Call",
            name: "void"
          },
          {
            __class__: "Call",
            name: "skip_to"
          },
          {
            __class__: "Call",
            name: "lookahead"
          },
          {
            __class__: "Call",
            name: "negative_lookahead"
          },
          {
            __class__: "Call",
            name: "cut"
          },
          {
            __class__: "Call",
            name: "cut_deprecated"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "group",
      params: [
        "Group"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "NegativeLookahead",
            exp: {
              __class__: "Token",
              token: "(?:"
            }
          },
          {
            __class__: "Token",
            token: "("
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: ")"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "skip",
      params: [
        "SkipGroup"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "(?:"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: ")"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "gather",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Lookahead",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Call",
                  name: "atom"
                },
                {
                  __class__: "Token",
                  token: ".{"
                }
              ]
            }
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Choice",
            options: [
              {
                __class__: "Call",
                name: "positive_gather"
              },
              {
                __class__: "Call",
                name: "normal_gather"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "positive_gather",
      params: [
        "PositiveGather"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "sep",
            exp: {
              __class__: "Call",
              name: "atom"
            }
          },
          {
            __class__: "Token",
            token: ".{"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: "}"
          },
          {
            __class__: "NegativeLookahead",
            exp: {
              __class__: "Pattern",
              pattern: "\\+="
            }
          },
          {
            __class__: "Pattern",
            pattern: "[+-]"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "normal_gather",
      params: [
        "Gather"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "sep",
            exp: {
              __class__: "Call",
              name: "atom"
            }
          },
          {
            __class__: "Token",
            token: ".{"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: "}"
          },
          {
            __class__: "Optional",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Token",
                  token: "*"
                },
                {
                  __class__: "Cut"
                }
              ]
            }
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "join",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Lookahead",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Call",
                  name: "atom"
                },
                {
                  __class__: "Token",
                  token: "%{"
                }
              ]
            }
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Choice",
            options: [
              {
                __class__: "Call",
                name: "positive_join"
              },
              {
                __class__: "Call",
                name: "normal_join"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "positive_join",
      params: [
        "PositiveJoin"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "sep",
            exp: {
              __class__: "Call",
              name: "atom"
            }
          },
          {
            __class__: "Token",
            token: "%{"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: "}"
          },
          {
            __class__: "NegativeLookahead",
            exp: {
              __class__: "Pattern",
              pattern: "\\+="
            }
          },
          {
            __class__: "Pattern",
            pattern: "[+-]"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "normal_join",
      params: [
        "Join"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "sep",
            exp: {
              __class__: "Call",
              name: "atom"
            }
          },
          {
            __class__: "Token",
            token: "%{"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: "}"
          },
          {
            __class__: "Optional",
            exp: {
              __class__: "Sequence",
              sequence: [
                {
                  __class__: "Token",
                  token: "*"
                },
                {
                  __class__: "Cut"
                }
              ]
            }
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "left_join",
      params: [
        "LeftJoin"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "sep",
            exp: {
              __class__: "Call",
              name: "atom"
            }
          },
          {
            __class__: "Token",
            token: "<{"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: "}"
          },
          {
            __class__: "NegativeLookahead",
            exp: {
              __class__: "Pattern",
              pattern: "\\+="
            }
          },
          {
            __class__: "Pattern",
            pattern: "[+-]"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "right_join",
      params: [
        "RightJoin"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "sep",
            exp: {
              __class__: "Call",
              name: "atom"
            }
          },
          {
            __class__: "Token",
            token: ">{"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Named",
            name: "exp",
            exp: {
              __class__: "Call",
              name: "expre"
            }
          },
          {
            __class__: "Token",
            token: "}"
          },
          {
            __class__: "NegativeLookahead",
            exp: {
              __class__: "Pattern",
              pattern: "\\+="
            }
          },
          {
            __class__: "Pattern",
            pattern: "[+-]"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "positive_closure",
      params: [
        "PositiveClosure"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Token",
                token: "{"
              },
              {
                __class__: "Override",
                exp: {
                  __class__: "Call",
                  name: "expre"
                }
              },
              {
                __class__: "Token",
                token: "}"
              },
              {
                __class__: "NegativeLookahead",
                exp: {
                  __class__: "Pattern",
                  pattern: "\\+="
                }
              },
              {
                __class__: "Pattern",
                pattern: "[+-]"
              },
              {
                __class__: "Cut"
              }
            ]
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Override",
                exp: {
                  __class__: "Call",
                  name: "atom"
                }
              },
              {
                __class__: "NegativeLookahead",
                exp: {
                  __class__: "Pattern",
                  pattern: "\\+="
                }
              },
              {
                __class__: "Pattern",
                pattern: "[+]"
              },
              {
                __class__: "Cut"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "closure",
      params: [
        "Closure"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Token",
                token: "{"
              },
              {
                __class__: "Override",
                exp: {
                  __class__: "Call",
                  name: "expre"
                }
              },
              {
                __class__: "Token",
                token: "}"
              },
              {
                __class__: "Optional",
                exp: {
                  __class__: "Token",
                  token: "*"
                }
              },
              {
                __class__: "Cut"
              }
            ]
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Override",
                exp: {
                  __class__: "Call",
                  name: "atom"
                }
              },
              {
                __class__: "Token",
                token: "*"
              },
              {
                __class__: "Cut"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "empty_closure",
      params: [
        "EmptyClosure"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "{}"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Void"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "optional",
      params: [
        "Optional"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Token",
                token: "["
              },
              {
                __class__: "Cut"
              },
              {
                __class__: "Override",
                exp: {
                  __class__: "Call",
                  name: "expre"
                }
              },
              {
                __class__: "Token",
                token: "]"
              },
              {
                __class__: "Cut"
              }
            ]
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Override",
                exp: {
                  __class__: "Call",
                  name: "atom"
                }
              },
              {
                __class__: "NegativeLookahead",
                exp: {
                  __class__: "Choice",
                  options: [
                    {
                      __class__: "Token",
                      token: '?"'
                    },
                    {
                      __class__: "Token",
                      token: "?'"
                    },
                    {
                      __class__: "Token",
                      token: "?/"
                    }
                  ]
                }
              },
              {
                __class__: "Token",
                token: "?"
              },
              {
                __class__: "Cut"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "lookahead",
      params: [
        "Lookahead"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "&"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "term"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "negative_lookahead",
      params: [
        "NegativeLookahead"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "!"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "term"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "skip_to",
      params: [
        "SkipTo"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "->"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "term"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "atom",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "meta"
          },
          {
            __class__: "Call",
            name: "token"
          },
          {
            __class__: "Call",
            name: "call"
          },
          {
            __class__: "Call",
            name: "dot"
          },
          {
            __class__: "Call",
            name: "pattern"
          },
          {
            __class__: "Call",
            name: "skip"
          },
          {
            __class__: "Call",
            name: "group"
          },
          {
            __class__: "Call",
            name: "eol"
          },
          {
            __class__: "Call",
            name: "eof"
          },
          {
            __class__: "Call",
            name: "alert"
          },
          {
            __class__: "Call",
            name: "constant"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "meta",
      params: [
        "Meta"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Pattern",
        pattern: "@(name|int|uint|float|bool)\\b"
      }
    },
    {
      __class__: "Rule",
      name: "call",
      params: [
        "Call"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Call",
        name: "word"
      }
    },
    {
      __class__: "Rule",
      name: "void",
      params: [
        "Void"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "()"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "fail",
      params: [
        "Fail"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "!()"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "cut",
      params: [
        "Cut"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "~"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "cut_deprecated",
      params: [
        "Cut"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: ">>"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "known_name",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "NameMeta"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "name",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Call",
        name: "word"
      }
    },
    {
      __class__: "Rule",
      name: "constant",
      params: [
        "Constant"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Lookahead",
            exp: {
              __class__: "Token",
              token: "`"
            }
          },
          {
            __class__: "Choice",
            options: [
              {
                __class__: "Pattern",
                pattern: "(?ms)```((?:.|\\n)*?)```"
              },
              {
                __class__: "Sequence",
                sequence: [
                  {
                    __class__: "Token",
                    token: "`"
                  },
                  {
                    __class__: "Override",
                    exp: {
                      __class__: "Call",
                      name: "literal"
                    }
                  },
                  {
                    __class__: "Token",
                    token: "`"
                  }
                ]
              },
              {
                __class__: "Pattern",
                pattern: "`(.*?)`"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "alert",
      params: [
        "Alert"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Named",
            name: "level",
            exp: {
              __class__: "Pattern",
              pattern: "\\^+"
            }
          },
          {
            __class__: "Named",
            name: "message",
            exp: {
              __class__: "Call",
              name: "constant"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "token",
      params: [
        "Token"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "string"
          },
          {
            __class__: "Call",
            name: "raw_string"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "literal",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "raw_string"
          },
          {
            __class__: "Call",
            name: "value"
          },
          {
            __class__: "Call",
            name: "boolean"
          },
          {
            __class__: "Call",
            name: "none"
          },
          {
            __class__: "Call",
            name: "word"
          },
          {
            __class__: "Call",
            name: "hex"
          },
          {
            __class__: "Call",
            name: "float"
          },
          {
            __class__: "Call",
            name: "int"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "string",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Lookahead",
            exp: {
              __class__: "Choice",
              options: [
                {
                  __class__: "Token",
                  token: '"'
                },
                {
                  __class__: "Token",
                  token: "'"
                }
              ]
            }
          },
          {
            __class__: "Choice",
            options: [
              {
                __class__: "Call",
                name: "multiline_string"
              },
              {
                __class__: "Call",
                name: "singlequoted"
              },
              {
                __class__: "Call",
                name: "doublequoted"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "singlequoted",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Call",
        name: "SINGLEQUOTED"
      }
    },
    {
      __class__: "Rule",
      name: "doublequoted",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Call",
        name: "DOUBLEQUOTED"
      }
    },
    {
      __class__: "Rule",
      name: "raw_string",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Lookahead",
            exp: {
              __class__: "Pattern",
              pattern: `r["']`
            }
          },
          {
            __class__: "Pattern",
            pattern: "r"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Call",
              name: "STRING"
            }
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "STRING",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "SINGLEQUOTED"
          },
          {
            __class__: "Call",
            name: "DOUBLEQUOTED"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "SINGLEQUOTED",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Pattern",
            pattern: "'((?:[^'\\n]|\\\\'|\\\\\\\\)*?)'"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "DOUBLEQUOTED",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Pattern",
            pattern: '"((?:[^"\\n]|\\\\"|\\\\\\\\)*?)"'
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "multiline_string",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Pattern",
                pattern: "(?ms)'''((?:\\\\\\\\|\\\\.|.)*?)'''"
              },
              {
                __class__: "Cut"
              }
            ]
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "Pattern",
                pattern: '(?ms)"""((?:\\\\\\\\|\\\\.|.)*?)"""'
              },
              {
                __class__: "Cut"
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "hex",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Pattern",
        pattern: "0[xX](?:\\d|[a-fA-F])+"
      }
    },
    {
      __class__: "Rule",
      name: "float",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Pattern",
        pattern: "[-+]?(?:\\d+\\.\\d*|\\d*\\.\\d+)(?:[Ee][-+]?\\d+)?"
      }
    },
    {
      __class__: "Rule",
      name: "int",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Pattern",
        pattern: "[-+]?\\d+"
      }
    },
    {
      __class__: "Rule",
      name: "path",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Pattern",
        pattern: "[_\\w][_\\w\\d]*(?:::[_\\w][_\\w\\d]*)+"
      }
    },
    {
      __class__: "Rule",
      name: "word",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Pattern",
        pattern: "(?ms)\\s*([_\\w][_\\w\\d]*)\\b"
      }
    },
    {
      __class__: "Rule",
      name: "dot",
      params: [
        "Dot"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Token",
        token: "/./"
      }
    },
    {
      __class__: "Rule",
      name: "pattern",
      params: [
        "Pattern"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Call",
        name: "regex"
      }
    },
    {
      __class__: "Rule",
      name: "regex",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "deprecated_regex"
          },
          {
            __class__: "Sequence",
            sequence: [
              {
                __class__: "NegativeLookahead",
                exp: {
                  __class__: "Token",
                  token: "?/"
                }
              },
              {
                __class__: "Choice",
                options: [
                  {
                    __class__: "Call",
                    name: "REGEX"
                  },
                  {
                    __class__: "Sequence",
                    sequence: [
                      {
                        __class__: "Token",
                        token: "?"
                      },
                      {
                        __class__: "Override",
                        exp: {
                          __class__: "Call",
                          name: "STRING"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "REGEX",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: true,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Lookahead",
            exp: {
              __class__: "Token",
              token: "/"
            }
          },
          {
            __class__: "Pattern",
            pattern: "(?ms)/((?:[^/\\\\]|\\\\/|\\\\.)*)/"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "deprecated_regex",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "?/"
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Override",
            exp: {
              __class__: "Pattern",
              pattern: "(?ms)((?:[^/\\\\]|\\\\/|\\\\.)*)"
            }
          },
          {
            __class__: "Cut"
          },
          {
            __class__: "Token",
            token: "/?"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "boolean",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Token",
            token: "True"
          },
          {
            __class__: "Token",
            token: "False"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "none",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Token",
        token: "None"
      }
    },
    {
      __class__: "Rule",
      name: "eof",
      params: [
        "EOF"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Sequence",
        sequence: [
          {
            __class__: "Token",
            token: "$"
          },
          {
            __class__: "Cut"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "eol",
      params: [
        "EOL"
      ],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Token",
        token: "$->"
      }
    },
    {
      __class__: "Rule",
      name: "value",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Choice",
        options: [
          {
            __class__: "Call",
            name: "string"
          },
          {
            __class__: "Call",
            name: "number"
          },
          {
            __class__: "Call",
            name: "true"
          },
          {
            __class__: "Call",
            name: "false"
          },
          {
            __class__: "Call",
            name: "null"
          }
        ]
      }
    },
    {
      __class__: "Rule",
      name: "number",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Pattern",
        pattern: `(?x)
    -?                                  # Optional negative sign
    (?:
        0                               # Can be a lone zero
        |
        [1-9][0-9]* # Or a non-zero digit followed by any number of digits
    )
    (?: \\. [0-9]+ )?                    # Optional fraction: dot MUST be followed by 1+ digits
    (?: [eE] [+-]? [0-9]+ )?            # Optional exponent component
    \\b
    `
      }
    },
    {
      __class__: "Rule",
      name: "true",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Token",
        token: "true"
      }
    },
    {
      __class__: "Rule",
      name: "false",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Token",
        token: "false"
      }
    },
    {
      __class__: "Rule",
      name: "null",
      params: [],
      kwparams: {},
      decorators: [],
      base: null,
      is_name: false,
      is_tokn: false,
      no_memo: false,
      no_stak: false,
      is_memo: true,
      is_lrec: false,
      exp: {
        __class__: "Token",
        token: "null"
      }
    }
  ]
};

// src/util/boundedmap.ts
class ListNode {
  key;
  value;
  prev;
  next;
  constructor(key, value, prev = null, next = null) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class BoundedMap {
  capacity;
  items;
  head = null;
  tail = null;
  _len = 0;
  constructor(capacity = 0) {
    this.capacity = capacity;
    this.items = new Map;
  }
  removeNode(node) {
    if (node.prev)
      node.prev.next = node.next;
    else
      this.head = node.next;
    if (node.next)
      node.next.prev = node.prev;
    else
      this.tail = node.prev;
    node.prev = null;
    node.next = null;
    this._len--;
  }
  pushFront(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head)
      this.head.prev = node;
    this.head = node;
    if (!this.tail)
      this.tail = node;
    this._len++;
  }
  pushBack(node) {
    node.prev = this.tail;
    node.next = null;
    if (this.tail)
      this.tail.next = node;
    this.tail = node;
    if (!this.head)
      this.head = node;
    this._len++;
  }
  moveToFront(node) {
    if (node === this.head)
      return;
    this.removeNode(node);
    this.pushFront(node);
  }
  get(key) {
    const node = this.items.get(key);
    if (!node)
      return;
    if (this.capacity > 0) {
      this.moveToFront(node);
    }
    return node.value;
  }
  set(key, value) {
    const existing = this.items.get(key);
    if (existing) {
      existing.value = value;
      if (this.capacity > 0) {
        this.moveToFront(existing);
      }
      return;
    }
    if (this.capacity > 0 && this._len >= this.capacity) {
      const oldest = this.tail;
      if (oldest) {
        this.removeNode(oldest);
        this.items.delete(oldest.key);
      }
    }
    const node = new ListNode(key, value);
    this.items.set(key, node);
    if (this.capacity > 0) {
      this.pushFront(node);
    } else {
      this.pushBack(node);
    }
  }
  delete(key) {
    const node = this.items.get(key);
    if (!node)
      return;
    this.removeNode(node);
    this.items.delete(key);
  }
  retain(predicate) {
    let curr = this.head;
    while (curr) {
      const next = curr.next;
      if (!predicate(curr.key, curr.value)) {
        this.items.delete(curr.key);
        this.removeNode(curr);
      }
      curr = next;
    }
  }
  len() {
    return this._len;
  }
  keys() {
    const result = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.key);
      curr = curr.next;
    }
    return result;
  }
  *entries() {
    let curr = this.head;
    while (curr) {
      yield [curr.key, curr.value];
      curr = curr.next;
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  toJSON() {
    const out = {};
    for (const [k, v] of this.entries()) {
      out[String(k)] = v;
    }
    return out;
  }
}
// src/util/compress.ts
async function compress(input) {
  const stream = new Blob([input]).stream();
  const compressedStream = stream.pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(compressedStream).arrayBuffer());
}
async function decompress(buffer) {
  const stream = new Blob([buffer]).stream();
  const decompressedStream = stream.pipeThrough(new DecompressionStream("gzip"));
  return await new Response(decompressedStream).text();
}
// src/util/countlines.ts
function splitLines(s) {
  if (s.length === 0)
    return [];
  const parts = s.split(`
`);
  if (s.endsWith(`
`)) {
    parts.pop();
  }
  return parts;
}
function countLines(s, cmtstr = "//") {
  let total = 0;
  let blank = 0;
  let comment = 0;
  let code = 0;
  for (const line of splitLines(s)) {
    total++;
    const rest = stripLeft(line);
    if (rest === "") {
      blank++;
    } else if (rest.startsWith(cmtstr)) {
      comment++;
    } else {
      code++;
    }
  }
  if (s.length > 0 && (s.endsWith(`
`) || s.endsWith("\r"))) {
    total++;
    blank++;
  }
  return { total, blank, comment, code };
}
// src/util/fs.ts
import { readFile } from "fs/promises";
async function readPath(path, encoding = "utf-8") {
  if (path !== "-") {
    return await readFile(path, encoding);
  }
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString(encoding);
}
function ext(path) {
  const i = path.lastIndexOf(".");
  return i !== -1 ? path.slice(i + 1).toLowerCase() : "";
}
// src/util/helpers.ts
function newCfg(opts) {
  const c = defaultCfg();
  if (opts.trace) {
    c.trace = true;
  }
  if (opts.start)
    c.start = opts.start;
  if (opts.color) {
    switch (opts.color) {
      case "auto":
        c.colorize = process.stderr.isTTY;
        break;
      case "always":
        c.colorize = true;
        break;
      case "never":
        c.colorize = false;
    }
  }
  return c;
}
// src/util/misc.ts
var import_isomorphic_git = __toESM(require_isomorphic_git(), 1);
import fs from "fs";
async function getProjectGitVersion(dir = ".") {
  try {
    const sha = await import_isomorphic_git.default.resolveRef({ fs, dir, ref: "HEAD" });
    const tags = await import_isomorphic_git.default.listTags({ fs, dir });
    for (const tag of tags) {
      const tagSha = await import_isomorphic_git.default.resolveRef({ fs, dir, ref: tag });
      if (tagSha === sha) {
        return tag;
      }
    }
    return sha.slice(0, 7);
  } catch (_) {
    return "unknown";
  }
}
function pybool(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  if (typeof value === "string") {
    return value.length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return true;
}
function isBaseArray(obj) {
  return Array.isArray(obj) && obj.constructor === Array;
}
function isComplex(obj) {
  return obj !== null && (typeof obj === "object" || typeof obj === "function");
}
function asObject(obj) {
  return isComplex(obj) ? obj : null;
}
function isPlain(obj) {
  if (obj === null || typeof obj !== "object")
    return false;
  const proto = Object.getPrototypeOf(obj);
  return proto === Object.prototype || proto === Array.prototype;
}
// src/util/newlines.ts
var whitespace = new Set([" ", "\t", "\r", "\f", "\v"]);
function isWhitespace(ch) {
  return whitespace.has(ch);
}
function takeLinebreakLen2(text, start) {
  const n = text.length;
  if (start >= n)
    return 0;
  const nl = text.indexOf(`
`, start);
  const endOfLine = nl === -1 ? n : nl;
  for (let i = start;i < endOfLine; i++) {
    if (!isWhitespace(text[i]))
      return -1;
  }
  if (nl !== -1) {
    return nl - start + 1;
  }
  return n - start;
}
function takeBlankLineLen(text, start) {
  const off1 = takeLinebreakLen2(text, start);
  if (off1 < 0)
    return -1;
  const off2 = takeLinebreakLen2(text, start + off1);
  if (off2 < 0)
    return -1;
  return off1 + off2;
}
function takeIndentLen(text, start) {
  const n = text.length;
  if (start >= n)
    return 0;
  const nl = text.indexOf(`
`, start);
  let searchLimit;
  if (nl === -1) {
    searchLimit = n;
  } else {
    searchLimit = start + nl;
    while (searchLimit > start && text[searchLimit - 1] === "\r") {
      searchLimit--;
    }
  }
  for (let i = start;i < searchLimit; i++) {
    if (!isWhitespace(text[i]))
      return i - start;
  }
  return -1;
}
function takeDedentLen(text, start) {
  const offset = takeLinebreakLen2(text, start);
  if (offset < 0)
    return -1;
  if (takeIndentLen(text, start + offset) === 0)
    return offset;
  return -1;
}
// src/util/repr.ts
var BlackLineLength = 88;
function fitsfmt(line, addLevels, amount) {
  if (line.includes(`
`))
    return false;
  return line.length + addLevels * amount <= BlackLineLength;
}
function fold(prefix, parts, lbrack, rbrack, opts) {
  const opt = { amount: 2, ...opts };
  if (parts.length === 0) {
    return prefix + lbrack + rbrack;
  }
  const single = prefix + lbrack + parts.join(", ") + rbrack;
  if (fitsfmt(single, opt.addLevels ?? 0, opt.amount ?? 2)) {
    return single;
  }
  const indent = " ".repeat(opt.amount ?? 2);
  const indented = parts.map((p) => indent + p.replace(/\n/g, `
${indent}`));
  return `${prefix + lbrack}
${indented.join(`,
`)},
${prefix}${rbrack}`;
}
function pubMapOf(v) {
  if (v === null || v === undefined)
    return null;
  if (v instanceof BoundedMap)
    return v;
  const ctor = v.constructor;
  if (ctor && ctor !== Object && typeof v === "object") {
    const bm = new BoundedMap(0);
    bm.set("__class__", ctor.name);
    for (const key of Object.keys(v)) {
      bm.set(key, v[key]);
    }
    return bm;
  }
  return v;
}
function classKeys(m) {
  const keys = Object.keys(m).sort();
  let typeName = "";
  if (keys.length > 0 && keys[0] === "__class__") {
    typeName = String(m.__class__);
    keys.shift();
  }
  return [typeName, keys];
}
function reprFold(parts, typeName) {
  if (typeName === "") {
    return fold("", parts, "map[string]any{", "}");
  }
  return fold("", parts, `${typeName}{`, "}");
}
function repr(v) {
  return reprValue(v, new Set);
}
function reprValue(v, seen) {
  if (v === null || v === undefined)
    return "nil";
  if (typeof v === "object") {
    if (seen.has(v))
      return "nil";
    seen.add(v);
    try {
      return reprValueImpl(v, seen);
    } finally {
      seen.delete(v);
    }
  }
  return reprValueImpl(v, seen);
}
function arrTypeString(arr) {
  if (arr.length === 0)
    return "[]any";
  const types = new Set(arr.map((e) => {
    if (e === null || e === undefined)
      return "nil";
    if (typeof e === "object" && e.constructor && e.constructor !== Object) {
      return e.constructor.name;
    }
    return typeof e;
  }));
  if (types.size === 1) {
    const t = types.values().next().value;
    if (t === "string")
      return "[]string";
    if (t === "number")
      return "[]int";
    if (t === "boolean")
      return "[]bool";
    if (typeof t === "string" && t !== "object")
      return `[]${t}`;
  }
  return "[]any";
}
function reprValueImpl(v, seen) {
  if (typeof v === "string")
    return JSON.stringify(v);
  if (typeof v === "boolean")
    return v ? "true" : "false";
  if (typeof v === "number")
    return String(v);
  if (typeof v === "bigint")
    return `${v.toString()}`;
  if (v === null || v === undefined)
    return "nil";
  if (Array.isArray(v)) {
    return reprArray(v, seen);
  }
  if (v instanceof BoundedMap) {
    return reprOrderedMap(v, seen);
  }
  const pm = pubMapOf(v);
  if (pm instanceof BoundedMap) {
    return `&${reprOrderedMap(pm, seen)}`;
  }
  if (typeof pm === "object" && pm.constructor === Object) {
    return reprPlainObject(pm, seen);
  }
  return String(v);
}
function reprArray(arr, seen) {
  const parts = arr.map((e) => reprValue(e, seen));
  const typeStr = arrTypeString(arr);
  return fold("", parts, `${typeStr}{`, "}");
}
function reprOrderedMap(om, seen) {
  const keys = om.keys();
  let typeName = "";
  if (keys.length > 0 && keys[0] === "__class__") {
    const cls = om.get("__class__");
    if (cls !== undefined) {
      typeName = String(cls);
    }
    keys.shift();
  }
  if (keys.length === 0) {
    if (typeName === "")
      return "map[string]any{}";
    return `${typeName}{}`;
  }
  const parts = keys.map((k) => {
    const item = om.get(k);
    return `${k}: ${reprValue(item, seen)}`;
  });
  return reprFold(parts, typeName);
}
function reprPlainObject(obj, seen) {
  const [typeName, keys] = classKeys(obj);
  const parts = keys.map((k) => `${k}: ${reprValue(obj[k], seen)}`);
  return reprFold(parts, typeName);
}
// src/util/stdin.ts
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin)
    chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf-8");
}
// src/util/asjson.ts
function asjsons(obj) {
  return JSON.stringify(asjson(obj), null, 2);
}
function asjson(obj, seen) {
  if (obj === null || obj === undefined) {
    return null;
  }
  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean")
    return obj;
  if (typeof obj === "bigint")
    return obj.toString();
  if (typeof obj === "function" || typeof obj === "symbol")
    return repr3(obj);
  seen ??= new Set;
  if (seen.has(obj))
    return repr3(obj);
  seen.add(obj);
  try {
    if (typeof obj.__json__ === "function") {
      return obj.__json__(seen);
    }
    if (obj instanceof Map) {
      const out = {};
      for (const [k, v] of obj) {
        out[String(k)] = asjson(v, seen);
      }
      return out;
    }
    if (obj instanceof Set || Array.isArray(obj))
      return [...obj].map((e) => asjson(e, seen));
    if (obj instanceof Date)
      return obj.toISOString();
    if (obj instanceof RegExp)
      return obj.toString();
    if (Object.getPrototypeOf(obj) === Object.prototype || obj.constructor === Object) {
      const out = {};
      for (const [k, v] of Object.entries(obj)) {
        out[k] = asjson(v, seen);
      }
      return out;
    }
    return repr3(obj);
  } finally {
    seen.delete(obj);
  }
}
function repr3(obj) {
  if (obj === null)
    return "null";
  if (typeof obj === "string")
    return JSON.stringify(obj);
  const name = obj.constructor?.name ?? "Object";
  if (typeof obj === "function")
    return name ? `[Function: ${name}]` : "[Function]";
  if (typeof obj === "symbol")
    return obj.toString();
  if (typeof obj === "bigint")
    return `${obj.toString()}n`;
  if (typeof obj === "object")
    return `[${name}]`;
  return String(obj);
}

// src/trees/tree.ts
class TreeArray extends Array {
  constructor(value) {
    super(...value);
    Object.setPrototypeOf(this, TreeArray.prototype);
  }
  isTreeArray() {
    return Array.isArray(this) && this instanceof TreeArray && this.constructor === TreeArray;
  }
}
function isTreeArray(obj) {
  return Array.isArray(obj) && obj instanceof TreeArray && obj.isTreeArray();
}
var TreeKind;
((TreeKind2) => {
  TreeKind2["Node"] = "Node";
  TreeKind2["Named"] = "Named";
  TreeKind2["NamedAsList"] = "NamedAsList";
  TreeKind2["Override"] = "Override";
  TreeKind2["OverrideAsList"] = "OverrideAsList";
})(TreeKind ||= {});

class Tree {
  __json__(seen) {
    return treeToJSON(this, seen);
  }
}

class TreeMerge {
  root = null;
  map = new Map;
  insert(key, val) {
    const existing = this.map.get(key);
    if (existing === undefined) {
      this.map.set(key, val);
    } else {
      this.map.set(key, appendTree(existing, val));
    }
  }
  insertAsList(key, val) {
    const existing = this.map.get(key);
    if (existing === undefined) {
      this.map.set(key, [val]);
    } else {
      this.map.set(key, appendAsList(existing, val));
    }
  }
}

class NodeTree extends Tree {
  typeName;
  tree;
  kind = "Node" /* Node */;
  constructor(typeName, tree) {
    super();
    this.typeName = typeName;
    this.tree = tree;
  }
  fold(_gather) {
    return this;
  }
}

class Named extends Tree {
  name;
  value;
  kind = "Named" /* Named */;
  constructor(name, value) {
    super();
    this.name = name;
    this.value = value;
  }
  fold(gather) {
    const val = foldOrGather(this.value, gather);
    gather.insert(this.name, val);
    return val;
  }
}

class NamedAsList extends Tree {
  name;
  value;
  kind = "NamedAsList" /* NamedAsList */;
  constructor(name, value) {
    super();
    this.name = name;
    this.value = value;
  }
  fold(gather) {
    const val = foldOrGather(this.value, gather);
    gather.insertAsList(this.name, val);
    return val;
  }
}

class Override extends Tree {
  value;
  kind = "Override" /* Override */;
  constructor(value) {
    super();
    this.value = value;
  }
  fold(gather) {
    const val = foldOrGather(this.value, gather);
    gather.root = appendTree(gather.root, val);
    return val;
  }
}

class OverrideAsList extends Tree {
  value;
  kind = "OverrideAsList" /* OverrideAsList */;
  constructor(value) {
    super();
    this.value = value;
  }
  fold(gather) {
    const val = foldOrGather(this.value, gather);
    gather.root = appendAsList(gather.root, val);
    return val;
  }
}
function foldOrGather(t, gather) {
  if (t === null) {
    return null;
  }
  if (Array.isArray(t)) {
    if (t instanceof TreeArray) {
      const items = [];
      for (const item of t) {
        items.push(foldOrGather(item, gather));
      }
      return new TreeArray(items);
    }
    let out = null;
    for (const item of t) {
      const tree = foldOrGather(item, gather);
      out = treeMerge(out, tree);
    }
    return out;
  }
  return t instanceof Tree ? t.fold(gather) : t;
}
function treeFold(tree) {
  if (tree === null) {
    return null;
  }
  const g = new TreeMerge;
  const result = foldOrGather(tree, g);
  return finish(g, result);
}
function treeMerge(a, b) {
  if (b === null)
    return a;
  if (a === null)
    return b;
  const aIsArr = isBaseArray(a);
  const bIsArr = isBaseArray(b);
  if (aIsArr && bIsArr) {
    return [...a, ...b];
  }
  if (aIsArr) {
    return [...a, b];
  }
  if (bIsArr) {
    return [a, ...b];
  }
  return [a, b];
}
function appendTree(a, b) {
  if (a === null)
    return b;
  if (b === null)
    return a;
  if (isBaseArray(a)) {
    return [...a, b];
  }
  return [a, b];
}
function appendAsList(a, b) {
  if (a === null) {
    return [b];
  }
  if (isBaseArray(a)) {
    return [...a, b];
  }
  return [a, b];
}
function closed(t) {
  if (t === null) {
    return null;
  }
  if (isBaseArray(t)) {
    return new TreeArray(t);
  }
  return t;
}
function finish(g, base) {
  if (g.root !== null) {
    return closed(g.root);
  }
  if (g.map.size > 0) {
    return g.map;
  }
  return closed(base);
}
function treeToJSON(t, seen) {
  if (!(t instanceof Tree)) {
    return asjson(t, seen);
  }
  switch (t.kind) {
    case "Named" /* Named */: {
      const m = t;
      return { [m.name]: treeToJSON(m.value, seen) };
    }
    case "NamedAsList" /* NamedAsList */: {
      const ml = t;
      return { [ml.name]: treeToJSON(ml.value, seen) };
    }
    case "Override" /* Override */:
      return treeToJSON(t.value, seen);
    case "OverrideAsList" /* OverrideAsList */:
      return treeToJSON(t.value, seen);
    case "Node" /* Node */: {
      const node = t;
      const child = treeToJSON(node.tree, seen);
      if (child !== null && typeof child === "object" && !Array.isArray(child)) {
        const childObj = child;
        if ("__class__" in childObj) {
          return { __class__: node.typeName, ast: child };
        }
        const result = {
          __class__: node.typeName,
          ...childObj
        };
        result.__class__ = node.typeName;
        return result;
      }
      return { __class__: node.typeName, ast: child };
    }
  }
}
function treeToJSONStr(t) {
  return JSON.stringify(treeToJSON(t), null, 2);
}
// src/peg/json.ts
function mapClass(cls, ...fields) {
  const out = { __class__: cls };
  for (const kv of fields) {
    out[kv[0]] = kv[1];
  }
  return out;
}
function serializeExp(exp, seen) {
  switch (exp.kind) {
    case "Token" /* Token */:
      return mapClass("Token", ["token", asjson(exp.value, seen)]);
    case "Pattern" /* Pattern */:
      return mapClass("Pattern", [
        "pattern",
        asjson(exp.value, seen)
      ]);
    case "Constant" /* Constant */:
      return mapClass("Constant", [
        "literal",
        asjson(exp.value, seen)
      ]);
    case "Alert" /* Alert */:
      return mapClass("Alert", ["literal", asjson(exp.value, seen)], ["level", asjson(exp.level, seen)]);
    case "Dot" /* Dot */:
      return mapClass("Dot");
    case "Eof" /* Eof */:
      return mapClass("EOF");
    case "Eol" /* Eol */:
      return mapClass("EOL");
    case "Fail" /* Fail */:
      return mapClass("Fail");
    case "Void" /* Void */:
      return mapClass("Void");
    case "Nil" /* Nil */:
      return mapClass("Null");
    case "Cut" /* Cut */:
      return mapClass("Cut");
    case "EmptyClosure" /* EmptyClosure */:
      return mapClass("EmptyClosure");
    case "Call" /* Call */:
      return mapClass("Call", ["name", asjson(exp.name, seen)]);
    case "RuleInclude" /* RuleInclude */:
      return mapClass("RuleInclude", [
        "name",
        asjson(exp.name, seen)
      ]);
    case "Group" /* Group */:
      return mapClass("Group", ["exp", serializeExp(exp.exp)]);
    case "SkipGroup" /* SkipGroup */:
      return mapClass("SkipGroup", [
        "exp",
        serializeExp(exp.exp)
      ]);
    case "Lookahead" /* Lookahead */:
      return mapClass("Lookahead", [
        "exp",
        serializeExp(exp.exp)
      ]);
    case "NegativeLookahead" /* NegativeLookahead */:
      return mapClass("NegativeLookahead", [
        "exp",
        serializeExp(exp.exp)
      ]);
    case "SkipTo" /* SkipTo */:
      return mapClass("SkipTo", ["exp", serializeExp(exp.exp)]);
    case "Alt" /* Alt */:
      return mapClass("Option", ["exp", serializeExp(exp.exp)]);
    case "Optional" /* Optional */:
      return mapClass("Optional", [
        "exp",
        serializeExp(exp.exp)
      ]);
    case "Closure" /* Closure */:
      return mapClass("Closure", ["exp", serializeExp(exp.exp)]);
    case "PositiveClosure" /* PositiveClosure */:
      return mapClass("PositiveClosure", [
        "exp",
        serializeExp(exp.exp)
      ]);
    case "Override" /* Override */:
      return mapClass("Override", [
        "exp",
        serializeExp(exp.exp)
      ]);
    case "OverrideList" /* OverrideList */:
      return mapClass("OverrideList", [
        "exp",
        serializeExp(exp.exp)
      ]);
    case "Named" /* Named */:
      return mapClass("Named", ["name", asjson(exp.name, seen)], ["exp", serializeExp(exp.exp)]);
    case "NamedList" /* NamedList */:
      return mapClass("NamedList", ["name", asjson(exp.name, seen)], ["exp", serializeExp(exp.exp)]);
    case "Join" /* Join */:
      return mapClass("Join", ["exp", serializeExp(exp.exp)], ["sep", serializeExp(exp.sep)]);
    case "PositiveJoin" /* PositiveJoin */:
      return mapClass("PositiveJoin", ["exp", serializeExp(exp.exp)], ["sep", serializeExp(exp.sep)]);
    case "Gather" /* Gather */:
      return mapClass("Gather", ["exp", serializeExp(exp.exp)], ["sep", serializeExp(exp.sep)]);
    case "PositiveGather" /* PositiveGather */:
      return mapClass("PositiveGather", ["exp", serializeExp(exp.exp)], ["sep", serializeExp(exp.sep)]);
    case "Sequence" /* Sequence */:
      return mapClass("Sequence", [
        "sequence",
        exp.sequence.map((item) => serializeExp(item))
      ]);
    case "Choice" /* Choice */:
      return mapClass("Choice", [
        "options",
        exp.options.map((item) => serializeExp(item))
      ]);
    case "NameMeta" /* NameMeta */:
      return mapClass("NameMeta");
    case "IntMeta" /* IntMeta */:
      return mapClass("IntMeta");
    case "UIntMeta" /* UIntMeta */:
      return mapClass("UIntMeta");
    case "FloatMeta" /* FloatMeta */:
      return mapClass("FloatMeta");
    case "BoolMeta" /* BoolMeta */:
      return mapClass("BoolMeta");
    default:
      throw new Error(`modelToJSON: unhandled ExpKind: ${exp.kind}`);
  }
}
function serializeRule(rule, seen) {
  const kwp = {};
  for (const [k, v] of rule.kwParams) {
    kwp[k] = v;
  }
  return {
    __class__: "Rule",
    name: rule.name,
    params: [...rule.params],
    kwparams: kwp,
    decorators: [...rule.decorators],
    base: rule.base,
    is_name: rule.isName,
    is_tokn: rule.isTokn,
    no_memo: rule.noMemo,
    no_stak: rule.noStak,
    is_memo: rule.isMemo,
    is_lrec: rule.isLrec,
    exp: serializeExp(rule.exp, seen)
  };
}
function serializeDirectives(dirs) {
  const out = {};
  for (const [k, v] of dirs) {
    let value = v;
    switch (v) {
      case "true":
      case "True":
        value = true;
        break;
      case "false":
      case "False":
        value = false;
        break;
      case "null":
      case "None":
        value = null;
        break;
    }
    out[k] = value;
  }
  return out;
}
function serializeGrammar(g, seen) {
  return {
    __class__: "Grammar",
    name: g.name,
    directives: serializeDirectives(g.directives),
    keywords: [...g.keywords],
    rules: g.rules.map((r) => serializeRule(r, seen))
  };
}

// src/peg/parsing/tryexp.ts
function tryExp(ctx2, exp) {
  const mark = ctx2.mark();
  let tree2 = null;
  let cutSeen = false;
  try {
    ctx2.cutStackPush();
    try {
      tree2 = exp.parse(ctx2);
    } finally {
      cutSeen = ctx2.cutStackPop();
    }
  } catch (error3) {
    ctx2.reset(mark);
    if (!isParseError(error3) || cutSeen) {
      throw error3;
    }
    return [null, false];
  }
  return [tree2, true];
}

// src/peg/parsing/choice.ts
function parseChoice(ctx2, choice) {
  const options = choice.options;
  const mark = ctx2.mark();
  for (const opt of options) {
    ctx2.reset(mark);
    const [tree2, ok] = tryExp(ctx2, opt);
    if (ok) {
      return tree2;
    }
  }
  ctx2.reset(mark);
  throw ctx2.failure(mark, new ParseError(`expecting: ${choice.lookaheadStr()}`));
}
function parseOptional(ctx2, exp) {
  const [tree2, ok] = tryExp(ctx2, exp);
  return ok ? tree2 : null;
}

// src/peg/parsing/closure.ts
function closure(ctx2, exp, positive) {
  const out = [];
  if (positive) {
    const tree2 = exp.parse(ctx2);
    out.push(tree2);
  }
  while (!ctx2.atEnd()) {
    const mark = ctx2.mark();
    const [tree2, ok] = tryExp(ctx2, exp);
    if (!ok)
      break;
    if (mark === ctx2.mark()) {
      throw ctx2.failure(ctx2.mark(), new ParseError(`closure matched empty input ${exp}`));
    }
    out.push(tree2);
  }
  return closed(out);
}
function closureWithSep(ctx2, exp, sep, positive, keepSep) {
  const out = [];
  if (positive) {
    const first = exp.parse(ctx2);
    out.push(first);
  } else {
    const mark = ctx2.mark();
    const [first, ok] = tryExp(ctx2, exp);
    if (!ok) {
      ctx2.reset(mark);
      return closed([]);
    }
    if (mark === ctx2.mark()) {
      throw ctx2.failure(ctx2.mark(), new ParseError(`closure matched empty input ${exp}`));
    }
    out.push(first);
  }
  while (!ctx2.atEnd()) {
    const mark = ctx2.mark();
    const [tsep, ok] = tryExp(ctx2, sep);
    if (!ok) {
      ctx2.reset(mark);
      break;
    }
    if (keepSep) {
      out.push(tsep);
    }
    const tree2 = exp.parse(ctx2);
    out.push(tree2);
  }
  return closed(out);
}

// src/peg/parsing/sequence.ts
function sequence(ctx2, seq) {
  const start = ctx2.mark();
  let out = null;
  for (const item of seq.sequence) {
    if (item.kind === "Cut" /* Cut */) {
      ctx2.cut();
      continue;
    }
    try {
      const tree2 = item.parse(ctx2);
      if (tree2 === null) {
        continue;
      }
      out = treeMerge(out, tree2);
    } catch (error3) {
      ctx2.reset(start);
      throw error3;
    }
  }
  return out;
}

// src/peg/pretty.ts
var pep8llen = 72;

class PrettyWriter {
  buf = "";
  indent = 0;
  amount = 4;
  writeLine(s) {
    if (s === "") {
      this.buf += `
`;
      return;
    }
    const pad = " ".repeat(this.indent * this.amount);
    for (const line of s.split(`
`)) {
      this.buf += `${pad + line}
`;
    }
  }
  indent_() {
    this.indent++;
  }
  dedent() {
    this.indent--;
  }
  reset() {
    this.buf = "";
  }
  string() {
    return this.buf.replace(/\n$/, "");
  }
}
function chunkStrings(s, size) {
  if (s.length === 0)
    return [];
  const chunks = [];
  for (let i = 0;i < s.length; i += size) {
    chunks.push(s.slice(i, i + size));
  }
  return chunks;
}
function prettyPrintExp(exp) {
  switch (exp.kind) {
    case "Token" /* Token */: {
      const e = exp;
      return `"${e.value}"`;
    }
    case "Pattern" /* Pattern */: {
      const e = exp;
      if (e.value.includes("/")) {
        return `?"${e.value}"`;
      }
      return `/${e.value}/`;
    }
    case "Constant" /* Constant */: {
      const e = exp;
      const s = String(e.value);
      if ((s.match(/\n/g) || []).length <= 1) {
        return `\`${s}\``;
      }
      return `\`\`\`${s}\`\`\``;
    }
    case "Alert" /* Alert */: {
      const e = exp;
      return `${"^".repeat(e.level)}\`${e.value}\``;
    }
    case "Call" /* Call */: {
      const e = exp;
      return e.name;
    }
    case "RuleInclude" /* RuleInclude */: {
      const e = exp;
      return `>${e.name}`;
    }
    case "Cut" /* Cut */:
      return "~";
    case "Dot" /* Dot */:
      return ".";
    case "Eof" /* Eof */:
      return "$";
    case "Eol" /* Eol */:
      return "$->";
    case "Fail" /* Fail */:
      return "!()";
    case "Nil" /* Nil */:
      return "";
    case "Void" /* Void */:
      return "()";
    case "EmptyClosure" /* EmptyClosure */:
      return "{}";
    case "NameMeta" /* NameMeta */:
      return "@name";
    case "IntMeta" /* IntMeta */:
      return "@int";
    case "UIntMeta" /* UIntMeta */:
      return "@uint";
    case "FloatMeta" /* FloatMeta */:
      return "@float";
    case "BoolMeta" /* BoolMeta */:
      return "@bool";
    case "Alt" /* Alt */: {
      const e = exp;
      return prettyPrintExp(e.exp);
    }
    case "Group" /* Group */: {
      const e = exp;
      const inner = prettyPrintExp(e.exp);
      if (inner.includes(`
`)) {
        const w = new PrettyWriter;
        w.writeLine("(");
        w.indent_();
        w.writeLine(inner);
        w.dedent();
        w.writeLine(")");
        return w.string();
      }
      return `(${inner})`;
    }
    case "SkipGroup" /* SkipGroup */: {
      const e = exp;
      return `(?:${prettyPrintExp(e.exp)})`;
    }
    case "Lookahead" /* Lookahead */: {
      const e = exp;
      return `&${prettyPrintExp(e.exp)}`;
    }
    case "NegativeLookahead" /* NegativeLookahead */: {
      const e = exp;
      return `!${prettyPrintExp(e.exp)}`;
    }
    case "SkipTo" /* SkipTo */: {
      const e = exp;
      return `->${prettyPrintExp(e.exp)}`;
    }
    case "Optional" /* Optional */: {
      const e = exp;
      return `[${prettyPrintExp(e.exp)}]`;
    }
    case "Closure" /* Closure */: {
      const e = exp;
      return `{${prettyPrintExp(e.exp)}}*`;
    }
    case "PositiveClosure" /* PositiveClosure */: {
      const e = exp;
      return `{${prettyPrintExp(e.exp)}}+`;
    }
    case "Override" /* Override */: {
      const e = exp;
      return `=${prettyPrintExp(e.exp)}`;
    }
    case "OverrideList" /* OverrideList */: {
      const e = exp;
      return `+=${prettyPrintExp(e.exp)}`;
    }
    case "Named" /* Named */: {
      const e = exp;
      return `${e.name}=${prettyPrintExp(e.exp)}`;
    }
    case "NamedList" /* NamedList */: {
      const e = exp;
      return `${e.name}+=${prettyPrintExp(e.exp)}`;
    }
    case "Join" /* Join */: {
      const e = exp;
      return `${prettyPrintExp(e.sep)}%{${prettyPrintExp(e.exp)}}*`;
    }
    case "PositiveJoin" /* PositiveJoin */: {
      const e = exp;
      return `${prettyPrintExp(e.sep)}%{${prettyPrintExp(e.exp)}}+`;
    }
    case "Gather" /* Gather */: {
      const e = exp;
      return `${prettyPrintExp(e.sep)}.{${prettyPrintExp(e.exp)}}*`;
    }
    case "PositiveGather" /* PositiveGather */: {
      const e = exp;
      return `${prettyPrintExp(e.sep)}.{${prettyPrintExp(e.exp)}}+`;
    }
    case "Sequence" /* Sequence */: {
      const e = exp;
      const items = [];
      for (const item of e.sequence) {
        if (item.kind === "Eof" /* Eof */)
          continue;
        items.push(prettyPrintExp(item));
      }
      const singleLine = items.join(" ");
      const hasMulti = items.some((s) => s.includes(`
`));
      if (!hasMulti && singleLine.length <= pep8llen) {
        return singleLine;
      }
      const w = new PrettyWriter;
      for (const item of items) {
        w.writeLine(item);
      }
      return w.string();
    }
    case "Choice" /* Choice */: {
      const e = exp;
      const opts = e.options.map((item) => prettyPrintExp(item));
      const hasMulti = opts.some((s) => s.includes(`
`));
      const singleLine = opts.join(" | ");
      if (!hasMulti && singleLine.length <= pep8llen) {
        return singleLine;
      }
      const w = new PrettyWriter;
      for (const opt of opts) {
        w.writeLine(`| ${opt}`);
      }
      return w.string();
    }
    default:
      throw new Error(`prettyPrintExp: unhandled ExpKind: ${exp.kind}`);
  }
}
function prettyPrintRule(rule) {
  const w = new PrettyWriter;
  if (rule.noStak)
    w.writeLine("@nostak");
  if (rule.noMemo)
    w.writeLine("@nomemo");
  if (rule.isName)
    w.writeLine("@name");
  const params = rule.params.length > 0 ? `[${rule.params.join(", ")}]` : "";
  const exp = prettyPrintExp(rule.exp);
  if (exp.includes(`
`)) {
    w.writeLine(`${rule.name}${params}:`);
    w.indent_();
    w.writeLine(exp);
    w.dedent();
  } else {
    w.writeLine(`${rule.name}${params}: ${exp}`);
  }
  return w.string();
}
function prettyPrintGrammar(g) {
  const w = new PrettyWriter;
  w.writeLine(`@@grammar :: ${g.name}`);
  const dirValue = (k) => {
    for (const d of g.directives) {
      if (d[0] === k)
        return [d[1], true];
    }
    return ["", false];
  };
  const showDir = (k) => {
    const [d, ok] = dirValue(k);
    if (ok) {
      switch (k) {
        case "whitespace":
          w.writeLine(`@@whitespace :: /${d}/`);
          break;
        case "comments":
          w.writeLine(`@@comments :: /${d}/`);
          break;
        case "eol_comments":
          w.writeLine(`@@eol_comments :: /${d}/`);
          break;
        case "namechars":
          w.writeLine(`@@namechars :: "${d}"`);
          break;
        case "ignorecase":
          if (d === "True")
            w.writeLine("@@ignorecase :: True");
          break;
        case "nameguard":
          if (d === "True")
            w.writeLine("@@nameguard :: True");
          break;
        case "left_recursion":
          if (d === "False")
            w.writeLine("@@left_recursion :: False");
          break;
        case "parseinfo":
          if (d === "False")
            w.writeLine("@@parseinfo :: False");
          break;
        case "memoization":
          if (d === "False")
            w.writeLine("@@memoization :: False");
          break;
      }
    }
  };
  showDir("whitespace");
  showDir("comments");
  showDir("eol_comments");
  showDir("namechars");
  showDir("ignorecase");
  showDir("nameguard");
  showDir("left_recursion");
  showDir("parseinfo");
  showDir("memoization");
  const known = new Set([
    "grammar",
    "whitespace",
    "comments",
    "eol_comments",
    "namechars",
    "ignorecase",
    "nameguard",
    "left_recursion",
    "parseinfo",
    "memoization"
  ]);
  for (const d of g.directives) {
    if (known.has(d[0]))
      continue;
    w.writeLine(`@@${d[0]} :: ${d[1]}`);
  }
  if (g.keywords.length > 0) {
    w.writeLine("");
    for (const chunk of chunkStrings(g.keywords, 8)) {
      w.writeLine(`@@keyword :: ${chunk.join(" ")}`);
    }
  }
  for (const rule of g.rules) {
    w.writeLine("");
    w.writeLine(prettyPrintRule(rule));
  }
  return w.string();
}

// src/peg/exp.ts
var ExpKind;
((ExpKind2) => {
  ExpKind2["Nil"] = "Nil";
  ExpKind2["Cut"] = "Cut";
  ExpKind2["Void"] = "Void";
  ExpKind2["Fail"] = "Fail";
  ExpKind2["Dot"] = "Dot";
  ExpKind2["Eof"] = "Eof";
  ExpKind2["Eol"] = "Eol";
  ExpKind2["EmptyClosure"] = "EmptyClosure";
  ExpKind2["NameMeta"] = "NameMeta";
  ExpKind2["IntMeta"] = "IntMeta";
  ExpKind2["UIntMeta"] = "UIntMeta";
  ExpKind2["FloatMeta"] = "FloatMeta";
  ExpKind2["BoolMeta"] = "BoolMeta";
  ExpKind2["Token"] = "Token";
  ExpKind2["Pattern"] = "Pattern";
  ExpKind2["Constant"] = "Constant";
  ExpKind2["Alert"] = "Alert";
  ExpKind2["Call"] = "Call";
  ExpKind2["Named"] = "Named";
  ExpKind2["NamedList"] = "NamedList";
  ExpKind2["Override"] = "Override";
  ExpKind2["OverrideList"] = "OverrideList";
  ExpKind2["Group"] = "Group";
  ExpKind2["SkipGroup"] = "SkipGroup";
  ExpKind2["Lookahead"] = "Lookahead";
  ExpKind2["NegativeLookahead"] = "NegativeLookahead";
  ExpKind2["SkipTo"] = "SkipTo";
  ExpKind2["Alt"] = "Alt";
  ExpKind2["Optional"] = "Optional";
  ExpKind2["Closure"] = "Closure";
  ExpKind2["PositiveClosure"] = "PositiveClosure";
  ExpKind2["Sequence"] = "Sequence";
  ExpKind2["Choice"] = "Choice";
  ExpKind2["Join"] = "Join";
  ExpKind2["PositiveJoin"] = "PositiveJoin";
  ExpKind2["Gather"] = "Gather";
  ExpKind2["PositiveGather"] = "PositiveGather";
  ExpKind2["RuleInclude"] = "RuleInclude";
  ExpKind2["Rule"] = "Rule";
  ExpKind2["Grammar"] = "Grammar";
})(ExpKind ||= {});

class Exp {
  la = [];
  children() {
    switch (this.kind) {
      case "Nil" /* Nil */:
      case "Cut" /* Cut */:
      case "Void" /* Void */:
      case "Fail" /* Fail */:
      case "Dot" /* Dot */:
      case "Eof" /* Eof */:
      case "Eol" /* Eol */:
      case "EmptyClosure" /* EmptyClosure */:
      case "NameMeta" /* NameMeta */:
      case "IntMeta" /* IntMeta */:
      case "UIntMeta" /* UIntMeta */:
      case "FloatMeta" /* FloatMeta */:
      case "BoolMeta" /* BoolMeta */:
      case "Token" /* Token */:
      case "Pattern" /* Pattern */:
      case "Constant" /* Constant */:
      case "Alert" /* Alert */:
      case "Call" /* Call */:
        return [];
      case "Named" /* Named */:
      case "NamedList" /* NamedList */:
      case "Override" /* Override */:
      case "OverrideList" /* OverrideList */:
      case "Group" /* Group */:
      case "SkipGroup" /* SkipGroup */:
      case "Lookahead" /* Lookahead */:
      case "NegativeLookahead" /* NegativeLookahead */:
      case "SkipTo" /* SkipTo */:
      case "Alt" /* Alt */:
      case "Optional" /* Optional */:
      case "Closure" /* Closure */:
      case "PositiveClosure" /* PositiveClosure */:
        return [this.exp];
      case "Join" /* Join */:
      case "PositiveJoin" /* PositiveJoin */:
      case "Gather" /* Gather */:
      case "PositiveGather" /* PositiveGather */:
        return [
          this.exp,
          this.sep
        ];
      case "Sequence" /* Sequence */:
        return this.sequence;
      case "Choice" /* Choice */:
        return this.options;
      case "RuleInclude" /* RuleInclude */: {
        const innerExp = this.exp;
        return innerExp != null ? [innerExp] : [];
      }
      case "Grammar" /* Grammar */:
        return [];
      case "Rule" /* Rule */:
        return this.exp.children();
      default:
        throw new Error(`unhandled ExpKind: ${this.kind}`);
    }
  }
  parse(ctx2) {
    switch (this.kind) {
      case "Nil" /* Nil */:
        return null;
      case "EmptyClosure" /* EmptyClosure */:
        return new TreeArray([]);
      case "Cut" /* Cut */:
        ctx2.cut();
        return null;
      case "Void" /* Void */:
        ctx2.matchVoid();
        return null;
      case "Fail" /* Fail */:
        ctx2.matchFail();
        return null;
      case "Dot" /* Dot */: {
        const [ch, ok] = ctx2.matchDot();
        if (!ok)
          return null;
        return ch.toString();
      }
      case "Eof" /* Eof */: {
        return ctx2.matchEOF();
      }
      case "Eol" /* Eol */: {
        return ctx2.matchEOL();
      }
      case "Token" /* Token */: {
        const token = this;
        return ctx2.matchToken(token.value);
      }
      case "Pattern" /* Pattern */: {
        const pattern = this;
        return ctx2.matchPattern(pattern.value);
      }
      case "Constant" /* Constant */: {
        const exp = this;
        return ctx2.matchConstant(exp.value);
      }
      case "Alert" /* Alert */: {
        const exp = this;
        return exp.value;
      }
      case "Named" /* Named */: {
        const named = this;
        const tree2 = named.exp.parse(ctx2);
        return new Named(named.name, tree2);
      }
      case "NamedList" /* NamedList */: {
        const named = this;
        const tree2 = named.exp.parse(ctx2);
        return new NamedAsList(named.name, tree2);
      }
      case "Override" /* Override */: {
        const ovr = this;
        const result = ovr.exp.parse(ctx2);
        if (result == null)
          return null;
        return new Override(result);
      }
      case "OverrideList" /* OverrideList */: {
        const ovr = this;
        const result = ovr.exp.parse(ctx2);
        if (result == null)
          return null;
        return new OverrideAsList(result);
      }
      case "Group" /* Group */: {
        const group = this;
        return group.exp.parse(ctx2);
      }
      case "SkipGroup" /* SkipGroup */: {
        const skip = this;
        skip.exp.parse(ctx2);
        return null;
      }
      case "Lookahead" /* Lookahead */: {
        const la = this;
        const mark = ctx2.mark();
        ctx2.enterLookahead();
        try {
          la.exp.parse(ctx2);
        } finally {
          ctx2.reset(mark);
          ctx2.leaveLookahead();
        }
        return null;
      }
      case "NegativeLookahead" /* NegativeLookahead */: {
        const la = this;
        const mark = ctx2.mark();
        ctx2.enterLookahead();
        try {
          la.exp.parse(ctx2);
        } catch (error3) {
          if (isParseFailure(error3)) {
            return null;
          }
          throw error3;
        } finally {
          ctx2.reset(mark);
          ctx2.leaveLookahead();
        }
        throw ctx2.failure(mark, new ParseError("negative lookahead should not match"));
      }
      case "SkipTo" /* SkipTo */: {
        const skip = this;
        const mark = ctx2.mark();
        while (!ctx2.atEnd()) {
          try {
            return skip.exp.parse(ctx2);
          } catch (err) {
            if (!isParseFailure(err))
              throw err;
          }
          const [_, ok] = ctx2.matchDot();
          if (!ok)
            break;
        }
        ctx2.reset(mark);
        throw ctx2.failure(mark, new ParseError(`cannot skipTo i-> ${skip.exp}`));
      }
      case "Alt" /* Alt */: {
        const alt = this;
        return alt.exp.parse(ctx2);
      }
      case "Optional" /* Optional */: {
        const opt = this;
        return parseOptional(ctx2, opt.exp);
      }
      case "Closure" /* Closure */: {
        const clo = this;
        return closure(ctx2, clo.exp, false);
      }
      case "PositiveClosure" /* PositiveClosure */: {
        const clo = this;
        return closure(ctx2, clo.exp, true);
      }
      case "Sequence" /* Sequence */: {
        const seq = this;
        return sequence(ctx2, seq);
      }
      case "Choice" /* Choice */: {
        const choice = this;
        return parseChoice(ctx2, choice);
      }
      case "Join" /* Join */: {
        const join = this;
        return closureWithSep(ctx2, join.exp, join.sep, false, true);
      }
      case "PositiveJoin" /* PositiveJoin */: {
        const join = this;
        return closureWithSep(ctx2, join.exp, join.sep, true, true);
      }
      case "Gather" /* Gather */: {
        const gather = this;
        return closureWithSep(ctx2, gather.exp, gather.sep, false, false);
      }
      case "PositiveGather" /* PositiveGather */: {
        const gather = this;
        return closureWithSep(ctx2, gather.exp, gather.sep, true, false);
      }
      case "RuleInclude" /* RuleInclude */: {
        const rinc = this;
        if (rinc.exp == null) {
          throw ctx2.failure(ctx2.mark(), new ParseError(`rule not linked: ${rinc.name}`));
        }
        return rinc.exp.parse(ctx2);
      }
      case "NameMeta" /* NameMeta */: {
        return ctx2.matchName();
      }
      case "IntMeta" /* IntMeta */: {
        return ctx2.matchInt();
      }
      case "UIntMeta" /* UIntMeta */: {
        return ctx2.matchUInt();
      }
      case "FloatMeta" /* FloatMeta */: {
        return ctx2.matchFloat();
      }
      case "BoolMeta" /* BoolMeta */: {
        return ctx2.matchBool();
      }
      default:
        throw new Error(`parse() unhandled ExpKind: ${this.kind}`);
    }
  }
  pretty() {
    return prettyPrintExp(this);
  }
  asjson() {
    return asjson(this);
  }
  asjsons() {
    return asjsons(this);
  }
  __json__(seen) {
    return serializeExp(this, seen);
  }
  lookaheadStr() {
    return this.la.map((s) => `${s}`).join(" ");
  }
}

class BoxExp extends Exp {
  exp;
  constructor(exp) {
    super();
    this.exp = exp;
  }
}

class NamedBoxExp extends BoxExp {
  name;
  exp;
  constructor(name, exp) {
    super(exp);
    this.name = name;
    this.exp = exp;
  }
}

class SepBoxExp extends BoxExp {
  exp;
  sep;
  constructor(exp, sep) {
    super(exp);
    this.exp = exp;
    this.sep = sep;
  }
}

class NilExp extends Exp {
  kind = "Nil" /* Nil */;
}

class CutExp extends Exp {
  kind = "Cut" /* Cut */;
}

class VoidExp extends Exp {
  kind = "Void" /* Void */;
}

class FailExp extends Exp {
  kind = "Fail" /* Fail */;
}

class DotExp extends Exp {
  kind = "Dot" /* Dot */;
}

class EofExp extends Exp {
  kind = "Eof" /* Eof */;
}

class EolExp extends Exp {
  kind = "Eol" /* Eol */;
}

class EmptyClosureExp extends Exp {
  kind = "EmptyClosure" /* EmptyClosure */;
}

class NameMetaExp extends Exp {
  kind = "NameMeta" /* NameMeta */;
}

class IntMetaExp extends Exp {
  kind = "IntMeta" /* IntMeta */;
}

class UIntMetaExp extends Exp {
  kind = "UIntMeta" /* UIntMeta */;
}

class FloatMetaExp extends Exp {
  kind = "FloatMeta" /* FloatMeta */;
}

class BoolMetaExp extends Exp {
  kind = "BoolMeta" /* BoolMeta */;
}

class TokenExp extends Exp {
  value;
  kind = "Token" /* Token */;
  constructor(value) {
    super();
    this.value = value;
  }
}

class PatternExp extends Exp {
  value;
  kind = "Pattern" /* Pattern */;
  constructor(value) {
    super();
    this.value = value;
  }
}

class ConstantExp extends Exp {
  value;
  kind = "Constant" /* Constant */;
  constructor(value) {
    super();
    this.value = value;
  }
}

class AlertExp extends Exp {
  value;
  level;
  kind = "Alert" /* Alert */;
  constructor(value, level) {
    super();
    this.value = value;
    this.level = level;
  }
}

class NamedExp extends NamedBoxExp {
  kind = "Named" /* Named */;
}

class NamedListExp extends NamedBoxExp {
  kind = "NamedList" /* NamedList */;
}

class OverrideExp extends BoxExp {
  kind = "Override" /* Override */;
}

class OverrideListExp extends BoxExp {
  kind = "OverrideList" /* OverrideList */;
}

class GroupExp extends BoxExp {
  kind = "Group" /* Group */;
}

class SkipGroupExp extends BoxExp {
  kind = "SkipGroup" /* SkipGroup */;
}

class LookaheadExp extends BoxExp {
  kind = "Lookahead" /* Lookahead */;
}

class NegativeLookaheadExp extends BoxExp {
  kind = "NegativeLookahead" /* NegativeLookahead */;
}

class SkipToExp extends BoxExp {
  kind = "SkipTo" /* SkipTo */;
}

class AltExp extends BoxExp {
  kind = "Alt" /* Alt */;
}

class OptionalExp extends BoxExp {
  kind = "Optional" /* Optional */;
}

class ClosureExp extends BoxExp {
  exp;
  kind = "Closure" /* Closure */;
  constructor(exp) {
    super(exp);
    this.exp = exp;
  }
}

class PositiveClosureExp extends BoxExp {
  exp;
  kind = "PositiveClosure" /* PositiveClosure */;
  constructor(exp) {
    super(exp);
    this.exp = exp;
  }
}

class JoinExp extends SepBoxExp {
  kind = "Join" /* Join */;
}

class PositiveJoinExp extends SepBoxExp {
  kind = "PositiveJoin" /* PositiveJoin */;
}

class GatherExp extends SepBoxExp {
  kind = "Gather" /* Gather */;
}

class PositiveGatherExp extends SepBoxExp {
  kind = "PositiveGather" /* PositiveGather */;
}

class SeqExp extends Exp {
  sequence;
  kind = "Sequence" /* Sequence */;
  constructor(sequence2) {
    super();
    this.sequence = sequence2;
  }
}

class ChoiceExp extends Exp {
  options;
  kind = "Choice" /* Choice */;
  constructor(options) {
    super();
    this.options = options;
  }
}

class RuleIncludeExp extends Exp {
  name;
  exp;
  kind = "RuleInclude" /* RuleInclude */;
  constructor(name, exp = null) {
    super();
    this.name = name;
    this.exp = exp;
  }
}

// src/peg/parsing/call.ts
function call(ctx2, name, rule) {
  ctx2.heartbeat();
  ctx2.enter(name);
  try {
    if (rule === null) {
      throw ctx2.failure(ctx2.mark(), new ParseError(`rule not linked: ${name}`));
    }
    if (rule.shouldTrace()) {
      ctx2.tracer().traceEntry(ctx2);
    }
    if (!rule.isToken()) {
      ctx2.nextToken();
    }
    const start = ctx2.mark();
    const key = ctx2.key(name, rule.isMemoizable());
    let tree2 = null;
    const mark = ctx2.mark();
    try {
      tree2 = doCall(ctx2, name, rule);
    } catch (error3) {
      if (isParseError(error3)) {
        ctx2.memoize(key, error3, start);
        if (rule.shouldTrace()) {
          ctx2.tracer().traceFailure(ctx2, name);
        }
      }
      ctx2.reset(mark);
      throw error3;
    }
    const value = tree2 ? tree2.toString() : name;
    if (rule.isName && ctx2.isKeyword(value)) {
      throw ctx2.failure(ctx2.mark(), new ParseError(`'${value}' is a reserved word`));
    }
    ctx2.memoize(key, tree2, ctx2.mark());
    if (rule.shouldTrace()) {
      ctx2.tracer().traceSuccess(ctx2);
    }
    return tree2;
  } finally {
    ctx2.leave();
  }
}
function doCall(ctx2, name, rule) {
  const key = ctx2.key(name, rule.isMemoizable());
  const memo2 = ctx2.memo(key);
  if (memo2) {
    if (isBottomEntry(memo2)) {
      if (rule.shouldTrace()) {
        ctx2.tracer().traceFailure(ctx2, name);
      }
      throw memo2.value;
    }
    ctx2.reset(memo2.mark);
    return memo2.value;
  }
  if (rule.isLeftRecursive()) {
    return callRecursive(ctx2, name, rule, key);
  }
  return rule.parse(ctx2);
}
function callRecursive(ctx2, _name, rule, key) {
  const start = ctx2.mark();
  ctx2.tracer().traceRecursion(ctx2);
  ctx2.memoize(key, BOTTOM, ctx2.mark());
  let lastMark = start;
  let lastTree = null;
  while (!ctx2.atEnd()) {
    ctx2.reset(start);
    ctx2.track(key);
    try {
      if (ctx2.recursionDepthExceeded()) {
        throw ctx2.failure(ctx2.mark(), new ParseError(`left recursion depth exceeded for rule: ${key.name}`));
      }
      try {
        const result = rule.parse(ctx2);
        if (result === BOTTOM)
          break;
        const endMark = ctx2.mark();
        if (endMark <= lastMark)
          break;
        lastMark = endMark;
        lastTree = result;
        ctx2.memoize(key, lastTree, lastMark);
      } catch (error3) {
        if (isParseError(error3))
          break;
        throw error3;
      }
    } finally {
      ctx2.untrack(key);
    }
  }
  ctx2.reset(lastMark);
  ctx2.memoize(key, lastTree, lastMark);
  if (lastTree === BOTTOM) {
    ctx2.reset(start);
    return null;
  }
  return lastTree;
}

// src/peg/call.ts
class CallExp extends Exp {
  name;
  rule;
  kind = "Call" /* Call */;
  constructor(name, rule = null) {
    super();
    this.name = name;
    this.rule = rule;
  }
  parse(ctx2) {
    return call(ctx2, this.name, this.rule);
  }
}

// src/peg/analysis/nullability.ts
function isNullable(exp) {
  console.assert(exp != null);
  switch (exp.kind) {
    case "Call" /* Call */:
      return false;
    case "RuleInclude" /* RuleInclude */: {
      const cs = exp.children();
      return cs.length > 0 ? isNullable(cs[0]) : false;
    }
    case "Group" /* Group */:
    case "SkipGroup" /* SkipGroup */:
    case "Lookahead" /* Lookahead */:
    case "NegativeLookahead" /* NegativeLookahead */:
    case "Override" /* Override */:
    case "OverrideList" /* OverrideList */:
    case "Named" /* Named */:
    case "NamedList" /* NamedList */:
    case "Alt" /* Alt */:
      return isNullable(unboxExp(exp));
    case "Optional" /* Optional */:
      return true;
    case "Closure" /* Closure */:
      return true;
    case "PositiveClosure" /* PositiveClosure */:
      return isNullable(unboxExp(exp));
    case "Join" /* Join */:
    case "Gather" /* Gather */:
      return true;
    case "PositiveJoin" /* PositiveJoin */:
    case "PositiveGather" /* PositiveGather */:
      return isNullable(unboxExp(exp));
    case "Choice" /* Choice */: {
      for (const opt of exp.children()) {
        if (isNullable(opt))
          return true;
      }
      return false;
    }
    case "Sequence" /* Sequence */: {
      for (const item of exp.children()) {
        if (!isNullable(item))
          return false;
      }
      return true;
    }
    case "Eol" /* Eol */:
    case "Void" /* Void */:
    case "Nil" /* Nil */:
    case "EmptyClosure" /* EmptyClosure */:
    case "Cut" /* Cut */:
    case "Constant" /* Constant */:
    case "Alert" /* Alert */:
      return true;
    case "Token" /* Token */:
    case "Pattern" /* Pattern */:
    case "Dot" /* Dot */:
    case "Eof" /* Eof */:
    case "Fail" /* Fail */:
    case "SkipTo" /* SkipTo */:
    case "NameMeta" /* NameMeta */:
    case "IntMeta" /* IntMeta */:
    case "UIntMeta" /* UIntMeta */:
    case "FloatMeta" /* FloatMeta */:
    case "BoolMeta" /* BoolMeta */:
      return false;
    default:
      throw new Error(`isNullable: unhandled ExpKind ${exp.kind}`);
  }
}
function unboxExp(exp) {
  switch (exp.kind) {
    case "Group" /* Group */:
    case "SkipGroup" /* SkipGroup */:
    case "Lookahead" /* Lookahead */:
    case "NegativeLookahead" /* NegativeLookahead */:
    case "Override" /* Override */:
    case "OverrideList" /* OverrideList */:
    case "Named" /* Named */:
    case "NamedList" /* NamedList */:
    case "SkipTo" /* SkipTo */:
    case "Alt" /* Alt */:
    case "Optional" /* Optional */:
    case "Closure" /* Closure */:
    case "PositiveClosure" /* PositiveClosure */:
    case "Join" /* Join */:
    case "PositiveJoin" /* PositiveJoin */:
    case "Gather" /* Gather */:
    case "PositiveGather" /* PositiveGather */: {
      const cs = exp.children();
      return cs[0];
    }
    default:
      throw new Error(`unboxExp: unhandled ExpKind ${exp.kind}`);
  }
}

// src/peg/analysis/leftrec.ts
function callableRuleIDs(exp, ruleIndex) {
  switch (exp.kind) {
    case "Call" /* Call */: {
      const call2 = exp;
      if (call2.rule != null) {
        const id = ruleIndex.get(call2.rule);
        if (id !== undefined) {
          return [id];
        }
      }
      return [];
    }
    case "RuleInclude" /* RuleInclude */: {
      const cs = exp.children();
      return cs.length > 0 ? callableRuleIDs(cs[0], ruleIndex) : [];
    }
    case "Group" /* Group */:
    case "SkipGroup" /* SkipGroup */:
    case "Lookahead" /* Lookahead */:
    case "NegativeLookahead" /* NegativeLookahead */:
    case "Override" /* Override */:
    case "OverrideList" /* OverrideList */:
    case "Named" /* Named */:
    case "NamedList" /* NamedList */:
    case "SkipTo" /* SkipTo */:
    case "Alt" /* Alt */:
    case "Optional" /* Optional */:
    case "Closure" /* Closure */:
    case "PositiveClosure" /* PositiveClosure */:
    case "Join" /* Join */:
    case "PositiveJoin" /* PositiveJoin */:
    case "Gather" /* Gather */:
    case "PositiveGather" /* PositiveGather */:
      return callableRuleIDs(unboxExp(exp), ruleIndex);
    case "Choice" /* Choice */: {
      const result = [];
      for (const opt of exp.children()) {
        result.push(...callableRuleIDs(opt, ruleIndex));
      }
      return result;
    }
    case "Sequence" /* Sequence */: {
      const result = [];
      for (const item of exp.children()) {
        if (item.kind === "Cut" /* Cut */)
          continue;
        result.push(...callableRuleIDs(item, ruleIndex));
        if (!isNullable(item))
          break;
      }
      return result;
    }
    case "Token" /* Token */:
    case "Pattern" /* Pattern */:
    case "Dot" /* Dot */:
    case "Eof" /* Eof */:
    case "Eol" /* Eol */:
    case "Void" /* Void */:
    case "Fail" /* Fail */:
    case "Nil" /* Nil */:
    case "EmptyClosure" /* EmptyClosure */:
    case "Cut" /* Cut */:
    case "Constant" /* Constant */:
    case "Alert" /* Alert */:
    case "NameMeta" /* NameMeta */:
    case "IntMeta" /* IntMeta */:
    case "UIntMeta" /* UIntMeta */:
    case "FloatMeta" /* FloatMeta */:
    case "BoolMeta" /* BoolMeta */:
      return [];
    default:
      throw new Error(`callableRuleIDs: unhandled ExpKind ${exp.kind}`);
  }
}
function tarjanSCC(edges) {
  const n = edges.length;
  const index = new Array(n).fill(-1);
  const lowlink = new Array(n).fill(0);
  const onStack = new Array(n).fill(false);
  const stack = [];
  let currentIndex = 0;
  const sccs = [];
  function strongconnect(v) {
    index[v] = currentIndex;
    lowlink[v] = currentIndex;
    currentIndex++;
    stack.push(v);
    onStack[v] = true;
    for (const w of edges[v]) {
      if (index[w] === -1) {
        strongconnect(w);
        if (lowlink[w] < lowlink[v]) {
          lowlink[v] = lowlink[w];
        }
      } else if (onStack[w]) {
        if (index[w] < lowlink[v]) {
          lowlink[v] = index[w];
        }
      }
    }
    if (lowlink[v] === index[v]) {
      const scc = [];
      while (true) {
        const w = stack.pop();
        if (w === undefined)
          break;
        onStack[w] = false;
        scc.push(w);
        if (w === v)
          break;
      }
      sccs.push(scc);
    }
  }
  for (let v = 0;v < n; v++) {
    if (index[v] === -1) {
      strongconnect(v);
    }
  }
  return sccs;
}
function findCyclesInSCC(edges, scc, start) {
  const sccSet = new Set(scc);
  const cycles = [];
  function dfs(node, path) {
    for (const p of path) {
      if (p === node) {
        cycles.push([...path]);
        return;
      }
    }
    path = [...path, node];
    for (const child of edges[node]) {
      if (sccSet.has(child)) {
        dfs(child, [...path]);
      }
    }
  }
  dfs(start, []);
  return cycles;
}
function markLeftRecursion(rules) {
  const ruleIndex = new Map;
  for (let i = 0;i < rules.length; i++) {
    rules[i].isLrec = false;
    rules[i].isMemo = !rules[i].noMemo;
    ruleIndex.set(rules[i], i);
  }
  const edges = new Array(rules.length);
  const ruleNames = new Array(rules.length);
  for (let i = 0;i < rules.length; i++) {
    edges[i] = callableRuleIDs(rules[i].exp, ruleIndex);
    ruleNames[i] = rules[i].name;
  }
  const sccs = tarjanSCC(edges);
  for (const scc of sccs) {
    if (scc.length > 1) {
      for (const id of scc) {
        rules[id].isMemo = false;
      }
      const leaders = new Set(scc);
      for (const start of scc) {
        const cycles = findCyclesInSCC(edges, scc, start);
        for (const cycle of cycles) {
          const cycleSet = new Set(cycle);
          for (const id of leaders) {
            if (!cycleSet.has(id)) {
              leaders.delete(id);
            }
          }
          if (leaders.size === 0)
            break;
        }
        if (leaders.size === 0)
          break;
      }
      if (leaders.size === 0) {
        for (const id of scc) {
          leaders.add(id);
        }
      }
      const leaderIDs = [...leaders].sort((a, b) => ruleNames[a].localeCompare(ruleNames[b]));
      rules[leaderIDs[0]].isLrec = true;
    } else if (scc.length === 1) {
      const id = scc[0];
      for (const child of edges[id]) {
        if (child === id) {
          rules[id].isLrec = true;
          rules[id].isMemo = false;
          break;
        }
      }
    }
  }
}

// src/peg/error.ts
class LinkError extends TSemekwesError {
  constructor(msg, options) {
    super(msg, options);
    this.name = "LinkError";
  }
}

class LeftRecursionError extends TSemekwesError {
  get __isLeftRecursionError() {
    return true;
  }
  constructor(message, options) {
    super(message, options);
    this.name = "LeftRecursionError";
  }
  static isLeftRecursionError(error3) {
    return error3 instanceof LeftRecursionError || !!error3 && error3.__isLeftRecursionError === true;
  }
}

// src/peg/analysis/link.ts
function linkExp(exp, rules) {
  if (exp == null)
    return;
  switch (exp.kind) {
    case "Call" /* Call */: {
      const call2 = exp;
      const rule = rules.get(call2.name);
      if (!rule) {
        throw new LinkError(`call to undefined rule: ${call2.name}
${asjsons(rules)}
            `);
      }
      call2.rule = rule;
      return;
    }
    case "RuleInclude" /* RuleInclude */: {
      const ri = exp;
      const rule = rules.get(ri.name);
      if (!rule)
        throw new LinkError(`rule include references undefined rule: ${ri.name}`);
      ri.exp = rule.exp;
      return;
    }
    case "Nil" /* Nil */:
    case "Cut" /* Cut */:
    case "Void" /* Void */:
    case "Fail" /* Fail */:
    case "Dot" /* Dot */:
    case "Eof" /* Eof */:
    case "Eol" /* Eol */:
    case "EmptyClosure" /* EmptyClosure */:
    case "Token" /* Token */:
    case "Pattern" /* Pattern */:
    case "Constant" /* Constant */:
    case "Alert" /* Alert */:
    case "NameMeta" /* NameMeta */:
    case "IntMeta" /* IntMeta */:
    case "UIntMeta" /* UIntMeta */:
    case "FloatMeta" /* FloatMeta */:
    case "BoolMeta" /* BoolMeta */:
      return;
    case "Named" /* Named */:
    case "NamedList" /* NamedList */:
    case "Override" /* Override */:
    case "OverrideList" /* OverrideList */:
    case "Group" /* Group */:
    case "SkipGroup" /* SkipGroup */:
    case "Lookahead" /* Lookahead */:
    case "NegativeLookahead" /* NegativeLookahead */:
    case "SkipTo" /* SkipTo */:
    case "Alt" /* Alt */:
    case "Optional" /* Optional */:
    case "Closure" /* Closure */:
    case "PositiveClosure" /* PositiveClosure */: {
      const box = exp;
      linkExp(box.exp, rules);
      return;
    }
    case "Join" /* Join */:
    case "PositiveJoin" /* PositiveJoin */:
    case "Gather" /* Gather */:
    case "PositiveGather" /* PositiveGather */: {
      const box = exp;
      linkExp(box.exp, rules);
      linkExp(box.sep, rules);
      return;
    }
    case "Sequence" /* Sequence */:
      for (const item of exp.sequence) {
        linkExp(item, rules);
      }
      return;
    case "Choice" /* Choice */: {
      for (const opt of exp.options) {
        linkExp(opt, rules);
      }
      return;
    }
    default:
      throw new Error(`unhandled ExpKind: ${exp.kind}`);
  }
}
function linkRule(rule, rules) {
  linkExp(rule.exp, rules);
}
function linkGrammar(grammar) {
  const rulemap = grammar.ruleMap();
  for (const rule of grammar.rules) {
    linkRule(rule, rulemap);
  }
}

// src/peg/grammar.ts
class Grammar extends Exp {
  name;
  rules;
  directives;
  keywords;
  analyzed;
  kind = "Grammar" /* Grammar */;
  _isLeftRecursive;
  _optrules;
  _rulemap;
  _optrulemap;
  constructor(name, rules = [], directives = [], keywords = [], analyzed = false) {
    super();
    this.name = name;
    this.rules = rules;
    this.directives = directives;
    this.keywords = keywords;
    this.analyzed = analyzed;
  }
  ruleMap() {
    if (!this._rulemap) {
      const m = new Map;
      for (const rule of this.rules) {
        m.set(rule.name, rule);
      }
      this._rulemap = m;
    }
    return this._rulemap;
  }
  optRuleMap() {
    if (!this._optrulemap) {
      if (!this._optrules) {
        this.optimize();
      }
      const m = new Map;
      for (const rule of this._optrules ?? []) {
        m.set(rule.name, rule);
      }
      this._optrulemap = m;
    }
    return this._optrulemap;
  }
  getRule(name) {
    const r = this.optRuleMap().get(name);
    if (r)
      return r;
    return this.ruleMap().get(name);
  }
  optimize() {
    if (this._optrules)
      return;
    this._optrules = this.rules.map((r) => r.optimized());
  }
  optimized() {
    this.optimize();
    return this;
  }
  normalize() {
    for (const r of this.rules) {
      r.normalize();
    }
  }
  leftRecursionDisabled() {
    for (const dir of this.directives) {
      if (dir.length < 2)
        continue;
      if (dir[0] === "left_recursion") {
        const s = dir[1];
        if (s === "False" || s === "false" || s === "0" || s === "NO" || s === "No" || s === "oo" || s === "None")
          return true;
      }
    }
    return false;
  }
  initialize() {
    this.normalize();
    linkGrammar(this);
    this.validateLinked();
    this.markLeftRecursion();
    this.computeLA();
    this.optimize();
    this.analyzed = true;
  }
  markLeftRecursion() {
    markLeftRecursion(this.rules);
  }
  isLeftRecursive() {
    if (this._isLeftRecursive === undefined) {
      for (const r of this.rules) {
        if (r.isLeftRecursive()) {
          this._isLeftRecursive = true;
          return true;
        }
      }
      this._isLeftRecursive = false;
    }
    return this._isLeftRecursive;
  }
  leftRecursionEnabled() {
    return !this.leftRecursionDisabled();
  }
  validateLeftRecursiveParse() {
    if (this.isLeftRecursive() && !this.leftRecursionEnabled())
      throw new LeftRecursionError("Parse on left-recursive grammar with left recursion disabled");
  }
  computeLA() {
    for (const rule of this.rules) {
      rule.computeLA();
    }
  }
  validateLinked() {
    for (const rule of this.rules) {
      this.validateExpLinked(rule.exp);
    }
  }
  validateExpLinked(exp) {
    if (exp instanceof CallExp && exp.rule == null) {
      throw new Error(`unresolved call to rule: ${exp.name}`);
    }
    for (const child of exp.children()) {
      this.validateExpLinked(child);
    }
  }
  pretty() {
    return prettyPrintGrammar(this);
  }
  __json__(seen) {
    return serializeGrammar(this, seen);
  }
  cfgFromDirectives() {
    const c = new Cfg;
    for (const d of this.directives) {
      const name = d[0];
      const s = d[1];
      switch (name) {
        case "name":
          c.name = s;
          break;
        case "source":
          c.source = s;
          break;
        case "start":
          c.start = s;
          break;
        case "grammar":
          c.grammar = s;
          break;
        case "whitespace":
          c.whitespace = s === "" || s === "None" || s === "False" ? null : s;
          break;
        case "comments":
          c.comments = s;
          break;
        case "eol_comments":
          c.eolComments = s;
          break;
        case "ignorecase":
          if (s === "True" || s === "true" || s === "1")
            c.ignoreCase = true;
          break;
        case "namechars":
          c.nameChars = s;
          break;
        case "nameguard":
          c.nameGuard = !["False", "false", "0", "None", "null"].includes(s);
          break;
        case "parseinfo":
          if (s === "True" || s === "true" || s === "1")
            c.parseInfo = true;
          break;
        case "trace":
          if (s === "True" || s === "true" || s === "1")
            c.trace = true;
          break;
        case "left_recursion":
          if (s !== "True" && s !== "true" && s !== "1")
            c.noLeftRecursion = true;
          break;
        case "nomemo":
          if (s === "True" || s === "true" || s === "1")
            c.noMemo = true;
          break;
        case "noprunememosoncut":
          if (s === "True" || s === "true" || s === "1")
            c.noPruneMemosOnCut = true;
          break;
      }
    }
    return c;
  }
  parse(ctx2, cfg) {
    this.validateLeftRecursiveParse();
    let acfg = defaultCfg();
    acfg = acfg.merge(this.cfgFromDirectives());
    acfg = acfg.merge(cfg ?? {});
    acfg.keywords = this.keywords;
    ctx2.configure(acfg);
    const start = acfg.start || "start";
    const rule = this.getRule(start) || this.rules[0];
    if (!rule) {
      throw ctx2.failure(ctx2.mark(), new ParseError("no rules in grammar"));
    }
    return call(ctx2, start, rule);
  }
}

// src/peg/analysis/lookahead.ts
var sentinelEOF = "\uFF04";
function computeLA(exp) {
  if (exp.la.length > 0)
    return exp.la;
  let la;
  switch (exp.kind) {
    case "Token" /* Token */:
      la = [`'${exp.value}'`];
      break;
    case "Pattern" /* Pattern */:
      la = [`/${exp.value}/`];
      break;
    case "Constant" /* Constant */:
      la = [String(exp.value)];
      break;
    case "Alert" /* Alert */:
      la = [`^\`${exp.value}\``];
      break;
    case "Eof" /* Eof */:
      la = [sentinelEOF];
      break;
    case "Group" /* Group */:
    case "SkipGroup" /* SkipGroup */:
    case "Lookahead" /* Lookahead */:
    case "NegativeLookahead" /* NegativeLookahead */:
    case "Override" /* Override */:
    case "OverrideList" /* OverrideList */:
    case "Named" /* Named */:
    case "NamedList" /* NamedList */:
    case "SkipTo" /* SkipTo */:
    case "Alt" /* Alt */:
    case "Optional" /* Optional */:
    case "Closure" /* Closure */:
    case "PositiveClosure" /* PositiveClosure */:
    case "Join" /* Join */:
    case "PositiveJoin" /* PositiveJoin */:
    case "Gather" /* Gather */:
    case "PositiveGather" /* PositiveGather */:
      la = computeLA(unboxExp(exp));
      break;
    case "Sequence" /* Sequence */: {
      la = [];
      for (const item of exp.sequence) {
        if (item.kind === "Cut" /* Cut */)
          continue;
        la = mergeLA(la, computeLA(item));
        if (!isNullable(item))
          break;
      }
      break;
    }
    case "Choice" /* Choice */: {
      la = [];
      for (const child of exp.children()) {
        la = mergeLA(la, computeLA(child));
      }
      break;
    }
    case "Call" /* Call */: {
      const call2 = exp;
      la = call2.rule ? [`\u2192${call2.name}`] : [];
      break;
    }
    case "RuleInclude" /* RuleInclude */: {
      const cs = exp.children();
      la = cs.length > 0 ? computeLA(cs[0]) : [];
      break;
    }
    case "NameMeta" /* NameMeta */:
      la = ["@name"];
      break;
    case "IntMeta" /* IntMeta */:
      la = ["@int"];
      break;
    case "UIntMeta" /* UIntMeta */:
      la = ["@uint"];
      break;
    case "FloatMeta" /* FloatMeta */:
      la = ["@float"];
      break;
    case "BoolMeta" /* BoolMeta */:
      la = ["@bool"];
      break;
    default:
      la = [];
      break;
  }
  exp.la = la;
  return la;
}
function mergeLA(a, b) {
  if (a.length === 0)
    return b;
  if (b.length === 0)
    return a;
  const seen = new Set(a);
  for (const s of b) {
    if (!seen.has(s)) {
      seen.add(s);
      a.push(s);
    }
  }
  return a.sort();
}

// src/peg/optimize.ts
function optimizeExp(exp) {
  switch (exp.kind) {
    case "Nil" /* Nil */:
    case "Cut" /* Cut */:
    case "Void" /* Void */:
    case "Fail" /* Fail */:
    case "Dot" /* Dot */:
    case "Eof" /* Eof */:
    case "Eol" /* Eol */:
    case "EmptyClosure" /* EmptyClosure */:
    case "Token" /* Token */:
    case "Pattern" /* Pattern */:
    case "Constant" /* Constant */:
    case "Alert" /* Alert */:
    case "Call" /* Call */:
    case "NameMeta" /* NameMeta */:
    case "IntMeta" /* IntMeta */:
    case "UIntMeta" /* UIntMeta */:
    case "FloatMeta" /* FloatMeta */:
    case "BoolMeta" /* BoolMeta */:
      return exp;
    case "Group" /* Group */:
      return optimizeExp(exp.exp);
    case "Named" /* Named */:
      return new NamedExp(exp.name, optimizeExp(exp.exp));
    case "NamedList" /* NamedList */:
      return new NamedListExp(exp.name, optimizeExp(exp.exp));
    case "Override" /* Override */:
      return new OverrideExp(optimizeExp(exp.exp));
    case "OverrideList" /* OverrideList */:
      return new OverrideListExp(optimizeExp(exp.exp));
    case "SkipGroup" /* SkipGroup */:
      return new SkipGroupExp(optimizeExp(exp.exp));
    case "Lookahead" /* Lookahead */:
      return new LookaheadExp(optimizeExp(exp.exp));
    case "NegativeLookahead" /* NegativeLookahead */:
      return new NegativeLookaheadExp(optimizeExp(exp.exp));
    case "SkipTo" /* SkipTo */:
      return new SkipToExp(optimizeExp(exp.exp));
    case "Alt" /* Alt */:
      return new AltExp(optimizeExp(exp.exp));
    case "Optional" /* Optional */:
      return new OptionalExp(optimizeExp(exp.exp));
    case "Closure" /* Closure */:
      return new ClosureExp(optimizeExp(exp.exp));
    case "PositiveClosure" /* PositiveClosure */:
      return new PositiveClosureExp(optimizeExp(exp.exp));
    case "Join" /* Join */:
      return new JoinExp(optimizeExp(exp.exp), optimizeExp(exp.sep));
    case "PositiveJoin" /* PositiveJoin */:
      return new PositiveJoinExp(optimizeExp(exp.exp), optimizeExp(exp.sep));
    case "Gather" /* Gather */:
      return new GatherExp(optimizeExp(exp.exp), optimizeExp(exp.sep));
    case "PositiveGather" /* PositiveGather */:
      return new PositiveGatherExp(optimizeExp(exp.exp), optimizeExp(exp.sep));
    case "Sequence" /* Sequence */: {
      const seq = exp.sequence.map(optimizeExp);
      if (seq.length === 1)
        return seq[0];
      return new SeqExp(seq);
    }
    case "Choice" /* Choice */: {
      const opts = exp.options.map(optimizeExp);
      if (opts.length === 1)
        return opts[0];
      return new ChoiceExp(opts);
    }
    case "RuleInclude" /* RuleInclude */: {
      const e = exp;
      if (e.exp != null) {
        return new RuleIncludeExp(e.name, optimizeExp(e.exp));
      }
      return exp;
    }
    default:
      throw new Error(`optimizeExp: unhandled ExpKind: ${exp.kind}`);
  }
}

// src/peg/rule.ts
class Rule extends BoxExp {
  name;
  exp;
  params;
  kwParams;
  decorators;
  base;
  isName;
  isTokn;
  noMemo;
  noStak;
  isMemo;
  isLrec;
  kind = "Rule" /* Rule */;
  constructor(name, exp, params = [], kwParams = new Map, decorators = [], base = "", isName = false, isTokn = false, noMemo = false, noStak = false, isMemo = false, isLrec = false) {
    super(exp);
    this.name = name;
    this.exp = exp;
    this.params = params;
    this.kwParams = kwParams;
    this.decorators = decorators;
    this.base = base;
    this.isName = isName;
    this.isTokn = isTokn;
    this.noMemo = noMemo;
    this.noStak = noStak;
    this.isMemo = isMemo;
    this.isLrec = isLrec;
  }
  computeLA() {
    computeLA(this.exp);
  }
  parse(ctx2) {
    const tree2 = this.exp.parse(ctx2);
    const folded = treeFold(tree2);
    const [newTree, overridden] = ctx2.applySemantics(folded, this.name, this.params);
    if (overridden) {
      return newTree;
    }
    if (this.params.length === 0 || this.params[0] === "bool") {
      return folded;
    }
    return new NodeTree(this.params[0], folded);
  }
  __json__(seen) {
    return asjson(serializeRule(this), seen);
  }
  isToken() {
    if (this.isTokn)
      return true;
    const first = this.name.replace(/^_+/, "")[0];
    return first !== "" && first === first.toUpperCase() && first !== first.toLowerCase();
  }
  isLeftRecursive() {
    return this.isLrec;
  }
  isMemoizable() {
    return this.isLrec || this.isMemo && !this.noMemo;
  }
  shouldTrace() {
    return !this.noStak;
  }
  normalize() {}
  optimized() {
    return new Rule(this.name, optimizeExp(this.exp), [...this.params], new Map(this.kwParams), [...this.decorators], this.base, this.isName, this.isTokn, this.noMemo, this.noStak, this.isMemo, this.isLrec);
  }
}

// src/json/import.ts
class ImportError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ImportError";
  }
}
function assertString(v, path) {
  if (typeof v !== "string")
    throw new ImportError(`${path}: expected string, got ${typeof v}`);
  return v;
}
function assertArray(v, path) {
  if (!Array.isArray(v))
    throw new ImportError(`${path}: expected array, got ${typeof v}`);
  return v;
}
function assertObject(v, path) {
  if (typeof v !== "object" || v === null || Array.isArray(v)) {
    throw new ImportError(`${path}: expected object, got ${typeof v}`);
  }
  return v;
}
function optString(obj, key) {
  const v = obj[key];
  return typeof v === "string" ? v : "";
}
function optBool(obj, key, def) {
  const v = obj[key];
  return typeof v === "boolean" ? v : def;
}
function loadGrammarFromJSON(data) {
  const root = assertObject(data, "root");
  const cls = assertString(root.__class__, "root.__class__");
  if (cls !== "Grammar")
    throw new ImportError(`root: expected Grammar, got ${cls}`);
  const name = assertString(root.name, "root.name");
  const rawRules = assertArray(root.rules || [], "root.rules");
  const rules = [];
  for (let i = 0;i < rawRules.length; i++) {
    rules.push(ruleFromJSON(rawRules[i], `root.rules[${i}]`));
  }
  const directives = parseDirectives(root);
  const keywords = parseKeywords(root);
  const g = new Grammar(name, rules, directives, keywords);
  g.initialize();
  return g;
}
function parseDirectives(obj) {
  const raw = obj.directives;
  if (!raw || typeof raw !== "object")
    return [];
  const dirObj = raw;
  const result = [];
  for (const [k, v] of Object.entries(dirObj)) {
    if (typeof v === "string") {
      result.push([k, v]);
    } else if (typeof v === "boolean") {
      result.push([k, v ? "true" : "false"]);
    } else {
      result.push([k, String(v)]);
    }
  }
  return result;
}
function parseKeywords(obj) {
  const raw = obj.keywords;
  if (!Array.isArray(raw))
    return [];
  return raw.filter((v) => typeof v === "string");
}
function ruleFromJSON(raw, path) {
  const obj = assertObject(raw, path);
  const cls = assertString(obj.__class__, `${path}.__class__`);
  if (cls !== "Rule")
    throw new ImportError(`${path}: expected Rule, got ${cls}`);
  const name = assertString(obj.name, `${path}.name`);
  const expRaw = obj.exp;
  const exp = modelFromJSON(expRaw, `${path}.exp`);
  const paramsRaw = obj.params;
  const params = Array.isArray(paramsRaw) ? paramsRaw.filter((v) => typeof v === "string") : [];
  const kwparams = new Map;
  const kwRaw = obj.kwparams;
  if (typeof kwRaw === "object" && kwRaw !== null && !Array.isArray(kwRaw)) {
    for (const [k, v] of Object.entries(kwRaw)) {
      if (typeof v === "string")
        kwparams.set(k, v);
    }
  }
  const decorators = Array.isArray(obj.decorators) ? obj.decorators.filter((v) => typeof v === "string") : [];
  const base = optString(obj, "base");
  const isName = optBool(obj, "is_name", false) || decorators.includes("name") || decorators.includes("isname");
  const isTokn = optBool(obj, "is_tokn", false);
  const noMemo = optBool(obj, "no_memo", false) || decorators.includes("nomemo");
  const noStak = optBool(obj, "no_stak", false) || decorators.includes("nostak");
  const isMemo = optBool(obj, "is_memo", true);
  const isLrec = optBool(obj, "is_lrec", false);
  return new Rule(name, exp, params, kwparams, decorators, base, isName, isTokn, noMemo, noStak, isMemo, isLrec);
}
function modelFromJSON(raw, path) {
  const obj = assertObject(raw, path);
  const cls = assertString(obj.__class__, `${path}.__class__`);
  switch (cls) {
    case "Sequence": {
      const itemsRaw = assertArray(obj.sequence || [], `${path}.sequence`);
      const items = itemsRaw.map((v, i) => modelFromJSON(v, `${path}.sequence[${i}]`));
      return new SeqExp(items);
    }
    case "Choice": {
      const optsRaw = assertArray(obj.options || [], `${path}.options`);
      const items = optsRaw.map((v, i) => {
        const opt = assertObject(v, `${path}.options[${i}]`);
        if (opt.__class__ === "Option") {
          return modelFromJSON(opt.exp, `${path}.options[${i}].exp`);
        }
        return modelFromJSON(v, `${path}.options[${i}]`);
      });
      return new ChoiceExp(items);
    }
    case "Named": {
      const name = assertString(obj.name, `${path}.name`);
      const exp = modelFromJSON(obj.exp, `${path}.exp`);
      return new NamedExp(name, exp);
    }
    case "NamedList": {
      const name = assertString(obj.name, `${path}.name`);
      const exp = modelFromJSON(obj.exp, `${path}.exp`);
      return new NamedListExp(name, exp);
    }
    case "Call": {
      const name = assertString(obj.name, `${path}.name`);
      return new CallExp(name);
    }
    case "Token": {
      const token = assertString(obj.token, `${path}.token`);
      return new TokenExp(token);
    }
    case "Pattern": {
      const pat = assertString(obj.pattern, `${path}.pattern`);
      return new PatternExp(pat);
    }
    case "Constant": {
      return new ConstantExp(optString(obj, "literal"));
    }
    case "Alert": {
      const lit = optString(obj, "literal");
      const level = typeof obj.level === "number" ? obj.level : 0;
      return new AlertExp(lit, level);
    }
    case "Group":
      return new GroupExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "Optional":
      return new OptionalExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "Closure":
      return new ClosureExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "PositiveClosure":
      return new PositiveClosureExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "Lookahead":
      return new LookaheadExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "NegativeLookahead":
      return new NegativeLookaheadExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "SkipGroup":
      return new SkipGroupExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "SkipTo":
      return new SkipToExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "Override":
      return new OverrideExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "OverrideList":
      return new OverrideListExp(modelFromJSON(obj.exp, `${path}.exp`));
    case "Join":
      return new JoinExp(modelFromJSON(obj.exp, `${path}.exp`), modelFromJSON(obj.sep, `${path}.sep`));
    case "PositiveJoin":
      return new PositiveJoinExp(modelFromJSON(obj.exp, `${path}.exp`), modelFromJSON(obj.sep, `${path}.sep`));
    case "Gather":
      return new GatherExp(modelFromJSON(obj.exp, `${path}.exp`), modelFromJSON(obj.sep, `${path}.sep`));
    case "PositiveGather":
      return new PositiveGatherExp(modelFromJSON(obj.exp, `${path}.exp`), modelFromJSON(obj.sep, `${path}.sep`));
    case "Void":
      return new VoidExp;
    case "Null":
      return new NilExp;
    case "Fail":
      return new FailExp;
    case "Dot":
      return new DotExp;
    case "Cut":
      return new CutExp;
    case "EOF":
      return new EofExp;
    case "EOL":
      return new EolExp;
    case "EmptyClosure":
      return new EmptyClosureExp;
    case "RuleInclude": {
      const name = assertString(obj.name, `${path}.name`);
      return new RuleIncludeExp(name);
    }
    case "NameMeta":
      return new NameMetaExp;
    case "IntMeta":
      return new IntMetaExp;
    case "UIntMeta":
      return new UIntMetaExp;
    case "FloatMeta":
      return new FloatMetaExp;
    case "BoolMeta":
      return new BoolMetaExp;
    default:
      throw new ImportError(`${path}: unsupported expression type: ${cls}`);
  }
}

// src/json/boot.ts
var cached = null;
function bootGrammar() {
  if (cached)
    return cached;
  const g = loadGrammarFromJSON(tatsu_default);
  g.initialize();
  cached = g;
  return g;
}
// src/json/jsonl.ts
function toJSONLines(jsonBlocks) {
  return jsonBlocks.map((block) => typeof block === "string" ? block : JSON.stringify(block)).join(`
`);
}
// src/peg/analysis/compile.ts
import { inspect } from "util";
class CompileError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "CompileError";
  }
}
function nodeTree(node) {
  if (node === null)
    return ["null", null];
  if (node instanceof NodeTree) {
    return [node.typeName, node.tree];
  }
  if (typeof node === "object" && "typeName" in node && "tree" in node) {
    const n2 = node;
    return [n2.typeName, n2.tree];
  }
  const n = node;
  throw new CompileError(`expected NodeTree, got ${typeof n} ${inspect(n)}
${inspect(n)}`);
}
function nodeCheck(tree2, typename) {
  const [name, inner] = nodeTree(tree2);
  if (name !== typename) {
    throw new CompileError(`expected ${typename} node, got ${name}`);
  }
  return inner;
}
function isMapNode(tree2) {
  return tree2 instanceof Map;
}
function mapGet(tree2, key) {
  if (!isMapNode(tree2))
    return null;
  return tree2.get(key) ?? null;
}
function mapGetDefault(tree2, key, def) {
  if (!isMapNode(tree2))
    return def;
  if (tree2 === null)
    return def;
  const val = tree2.get(key);
  if (val == null)
    return def;
  return textValue(val);
}
function textValue(tree2) {
  if (tree2 == null)
    return "";
  return String(tree2);
}
function listValue(tree2) {
  if (Array.isArray(tree2))
    return [...tree2];
  return [];
}
function strListValue(tree2) {
  const items = listValue(tree2);
  if (items.length === 0)
    return [];
  const out = [];
  for (const item of items) {
    const s = textValue(item);
    if (s !== "")
      out.push(s);
  }
  return out;
}
function strPairsListValue(tree2) {
  const out = new Map;
  for (const item of listValue(tree2)) {
    const pair = strListValue(item);
    if (pair.length === 2) {
      out.set(pair[0], pair[1]);
    }
  }
  return out;
}
function compileGrammar(tree2) {
  const inner = nodeCheck(tree2, "Grammar");
  if (!isMapNode(inner)) {
    throw new CompileError(`expected MapNode`);
  }
  let name = "";
  const nameTree = mapGet(inner, "name");
  if (nameTree != null) {
    name = textValue(nameTree);
  }
  const rules = [];
  const rulesTree = mapGet(inner, "rules");
  if (rulesTree != null) {
    for (const rt of listValue(rulesTree)) {
      rules.push(compileRule(rt));
    }
  }
  const directives = [];
  const dirsTree = mapGet(inner, "directives");
  if (dirsTree != null) {
    for (const d of listValue(dirsTree)) {
      if (!isMapNode(d))
        continue;
      const n = textValue(mapGet(d, "name") ?? "");
      const v = textValue(mapGet(d, "value") ?? "");
      if (n !== "") {
        directives.push([n, v]);
        if (n === "grammar" && name === "") {
          name = v;
        }
      }
    }
  }
  if (name === "") {
    name = "__COMPILED__";
  }
  const keywords = [];
  const kwTree = mapGet(inner, "keywords");
  if (kwTree != null) {
    for (const innerList of listValue(kwTree)) {
      for (const kw of listValue(innerList)) {
        const s = textValue(kw);
        if (s !== "")
          keywords.push(s);
        if (kw instanceof NodeTree && kw.typeName === "Word") {
          const ws = textValue(kw.tree);
          if (ws !== "")
            keywords.push(ws);
        }
      }
    }
  }
  const g = new Grammar(name, rules, directives, keywords, false);
  g.initialize();
  return g;
}
function compileRule(tree2) {
  const inner = nodeCheck(tree2, "Rule");
  if (!isMapNode(inner)) {
    throw new CompileError(`expected MapNode for Rule`);
  }
  const name = mapGetDefault(inner, "name", "");
  if (name === "") {
    throw new CompileError("rule has no name");
  }
  const decorators = strListValue(mapGet(inner, "decorators") ?? []);
  const params = strListValue(mapGet(inner, "params") ?? []);
  const kwparams = strPairsListValue(mapGet(inner, "kwparams") ?? []);
  const isName = decorators.includes("name") || decorators.includes("isname");
  const noMemo = decorators.includes("nomemo");
  const noStak = decorators.includes("nostak");
  const isTokn = decorators.includes("token") || decorators.includes("tokn");
  const expTree = mapGet(inner, "exp");
  if (expTree == null) {
    throw new CompileError("rule has no exp");
  }
  const exp = compileExp(expTree);
  return new Rule(name, exp, params, kwparams, decorators, "", isName, isTokn, noMemo, noStak);
}
function compileExp(node) {
  const [typename, tree2] = nodeTree(node);
  switch (typename) {
    case "bool":
      return compileExp(tree2);
    case "Alert": {
      const msgTree = mapGet(tree2, "message");
      if (msgTree == null)
        throw new CompileError("Alert missing message");
      const msg = compileExp(msgTree);
      if (msg instanceof ConstantExp) {
        return new AlertExp(msg.value, 0);
      }
      return new AlertExp(String(msg), 0);
    }
    case "BasedRule":
    case "Box":
    case "Grammar":
    case "GrammarSemantics":
    case "Model":
    case "ModelContext":
    case "NULL":
    case "NamedBox":
    case "Rule":
    case "Synth":
      return new NilExp;
    case "Call":
      return new CallExp(textValue(tree2));
    case "Choice": {
      const exps = listValue(tree2).map(compileExp);
      return new ChoiceExp(exps);
    }
    case "Option":
      return compileExp(tree2);
    case "Closure":
      return new ClosureExp(compileExp(tree2));
    case "Constant":
      return new ConstantExp(textValue(tree2));
    case "Cut":
      return new CutExp;
    case "Dot":
      return new DotExp;
    case "EOF":
    case "Eof":
      return new EofExp;
    case "EOL":
    case "Eol":
      return new EolExp;
    case "EmptyClosure":
      return new EmptyClosureExp;
    case "Fail":
      return new FailExp;
    case "Gather": {
      const expTreeG = mapGet(tree2, "exp");
      const sepTreeG = mapGet(tree2, "sep");
      if (expTreeG == null || sepTreeG == null)
        throw new CompileError("Gather missing exp or sep");
      return new GatherExp(compileExp(expTreeG), compileExp(sepTreeG));
    }
    case "Group":
      return new GroupExp(compileExp(tree2));
    case "Join": {
      const expTreeJ = mapGet(tree2, "exp");
      const sepTreeJ = mapGet(tree2, "sep");
      if (expTreeJ == null || sepTreeJ == null)
        throw new CompileError("Join missing exp or sep");
      return new JoinExp(compileExp(expTreeJ), compileExp(sepTreeJ));
    }
    case "Lookahead":
      return new LookaheadExp(compileExp(tree2));
    case "Named": {
      const nameN = mapGetDefault(tree2, "name", "");
      const expTreeN = mapGet(tree2, "exp");
      if (expTreeN == null)
        throw new CompileError("Named missing exp");
      return new NamedExp(nameN, compileExp(expTreeN));
    }
    case "NamedList": {
      const nameNL = mapGetDefault(tree2, "name", "");
      const expTreeNL = mapGet(tree2, "exp");
      if (expTreeNL == null)
        throw new CompileError("NamedList missing exp");
      return new NamedListExp(nameNL, compileExp(expTreeNL));
    }
    case "NegativeLookahead":
      return new NegativeLookaheadExp(compileExp(tree2));
    case "Optional":
      return new OptionalExp(compileExp(tree2));
    case "Override":
      return new OverrideExp(compileExp(tree2));
    case "OverrideList":
      return new OverrideListExp(compileExp(tree2));
    case "Pattern":
      return new PatternExp(textValue(tree2));
    case "Patterns": {
      let items;
      const t = mapGet(tree2, "tree");
      if (t != null) {
        items = listValue(t);
      } else {
        items = listValue(tree2);
      }
      if (items.length === 0) {
        items = [tree2];
      }
      const exps = items.map(compileExp);
      const [first] = exps;
      if (exps.length === 1 && first !== undefined)
        return first;
      return new ChoiceExp(exps);
    }
    case "PositiveClosure":
      return new PositiveClosureExp(compileExp(tree2));
    case "PositiveGather": {
      const expTreePG = mapGet(tree2, "exp");
      const sepTreePG = mapGet(tree2, "sep");
      if (expTreePG == null || sepTreePG == null)
        throw new CompileError("PositiveGather missing exp or sep");
      return new PositiveGatherExp(compileExp(expTreePG), compileExp(sepTreePG));
    }
    case "PositiveJoin":
    case "RightJoin":
    case "LeftJoin": {
      const expTreePJ = mapGet(tree2, "exp");
      const sepTreePJ = mapGet(tree2, "sep");
      if (expTreePJ == null || sepTreePJ == null)
        throw new CompileError(`${typename} missing exp or sep`);
      return new PositiveJoinExp(compileExp(expTreePJ), compileExp(sepTreePJ));
    }
    case "RuleInclude":
      return new RuleIncludeExp(textValue(tree2));
    case "Sequence": {
      const items = listValue(tree2);
      const exps = items.map(compileExp);
      return new SeqExp(exps);
    }
    case "SkipGroup":
      return new SkipGroupExp(compileExp(tree2));
    case "SkipTo":
      return new SkipToExp(compileExp(tree2));
    case "Token":
      return new TokenExp(textValue(tree2));
    case "Void":
      return new VoidExp;
    case "Meta":
      switch (textValue(tree2)) {
        case "name":
          return new NameMetaExp;
        case "int":
          return new IntMetaExp;
        case "uint":
          return new UIntMetaExp;
        case "float":
          return new FloatMetaExp;
        case "bool":
          return new BoolMetaExp;
      }
      throw new CompileError(`unknown meta type "${textValue(tree2)}"`);
    case "NameMeta":
      return new NameMetaExp;
    case "IntMeta":
      return new IntMetaExp;
    case "UIntMeta":
      return new UIntMetaExp;
    case "FloatMeta":
      return new FloatMetaExp;
    case "BoolMeta":
      return new BoolMetaExp;
    default:
      throw new CompileError(`unknown expression type "${typename}"`);
  }
}
// src/peg/ebnf_semantics.ts
class EBNFGrammarSemantics {
  apply(node, ruleName, _params) {
    if (ruleName === "true")
      return [true, true];
    if (ruleName === "false")
      return [false, true];
    if (ruleName === "null")
      return [null, true];
    if (node instanceof NodeTree && node.typeName === "Meta" && typeof node.tree === "string") {
      switch (node.tree) {
        case "name":
          return [new NodeTree("NameMeta", null), true];
        case "int":
          return [new NodeTree("IntMeta", null), true];
        case "uint":
          return [new NodeTree("UIntMeta", null), true];
        case "float":
          return [new NodeTree("FloatMeta", null), true];
        case "bool":
          return [new NodeTree("BoolMeta", null), true];
      }
    }
    return [node, false];
  }
}
// src/peg/summary.ts
var import_picocolors3 = __toESM(require_picocolors(), 1);
function grammarSummary(g, colorize) {
  const lines2 = [];
  const pc = import_picocolors3.default.createColors(colorize !== false);
  lines2.push(pc.bold(pc.cyan(g.name)));
  lines2.push("");
  if (g.directives.length > 0) {
    lines2.push(pc.dim("directives:"));
    for (const d of g.directives) {
      lines2.push(`  ${pc.yellow(`@${d[0]}`)} ${pc.dim("::")} ${d[1]}`);
    }
  }
  if (g.keywords.length > 0) {
    if (g.directives.length > 0)
      lines2.push("");
    lines2.push(`${pc.dim("keywords:")} ${pc.green(g.keywords.join(", "))}`);
  }
  if (g.directives.length > 0 || g.keywords.length > 0)
    lines2.push("");
  lines2.push(`${pc.dim("rules:")} ${g.rules.length}`);
  for (const r of g.rules) {
    const deco = r.decorators.length > 0 ? ` ${pc.green(`[${r.decorators.join(", ")}]`)}` : "";
    lines2.push(`  ${pc.yellow(r.name)}${deco}`);
  }
  return lines2.join(`
`);
}
// src/api/error.ts
class ApiError extends TSemekwesError {
  cause;
  constructor(msg, cause) {
    super(msg, { cause });
    this.cause = cause;
    this.name = "ApiError";
  }
}

// src/api/api.ts
var compileCache = new Map;
function cacheKey(text) {
  return gzipSync(Buffer.from(text, "utf-8")).toString("base64");
}
function parseGrammar(grammar2, cfg) {
  const acfg = defaultCfg().merge({
    semantics: new EBNFGrammarSemantics
  }).merge(cfg ?? {});
  const boot2 = bootGrammar2();
  const cursor2 = new StrCursor(dedent(grammar2));
  const ctx2 = newCtx(cursor2, acfg);
  try {
    return boot2.parse(ctx2, acfg);
  } catch (error4) {
    if (!isParseError(error4)) {
      throw error4;
    }
    if (isParseFailure(error4)) {
      const failure = error4;
      const apierror = new ApiError(failure.memento.render());
      if (Error.captureStackTrace) {
        Error.captureStackTrace(apierror, parseGrammar);
      }
      throw error4;
    }
    throw new ApiError("failed to parse grammar", error4);
  }
}
function compile2(grammar2, cfg) {
  const key = cacheKey(grammar2);
  const cached2 = compileCache.get(key);
  if (cached2)
    return cached2;
  const tree2 = parseGrammar(grammar2, cfg);
  const g = compileGrammar(tree2);
  compileCache.set(key, g);
  return g;
}
async function parseInputAsync(parser, text, cfg) {
  return parseInput(parser, text, cfg);
}
function parseInput(parser, text, cfg) {
  const cursor2 = new StrCursor(text);
  const merged = cfg ?? undefined;
  const ctx2 = newCtx(cursor2, merged);
  try {
    return parser.parse(ctx2, merged);
  } catch (error4) {
    if (!isParseError(error4)) {
      throw error4;
    }
    let failure;
    if (isParseFailure(error4)) {
      failure = error4;
    } else {
      failure = ctx2.furthestFailure();
    }
    if (failure !== null) {
      const error5 = new ApiError(failure.memento.render());
      if (Error.captureStackTrace) {
        Error.captureStackTrace(error5, parseInput);
      }
      throw error5;
    }
    throw new ApiError("failed to parse input", error4);
  }
}
function parse(grammar2, text, cfg) {
  return parseInput(compile2(grammar2, cfg), text, cfg);
}
function bootGrammar2() {
  return bootGrammar();
}
function loadGrammarFromJSON2(json2) {
  const key = cacheKey(json2);
  const cached2 = compileCache.get(key);
  if (cached2)
    return cached2;
  const data = JSON.parse(json2);
  const g = loadGrammarFromJSON(data);
  compileCache.set(key, g);
  return g;
}
function grammarPretty(grammar2) {
  return grammar2.pretty();
}
async function loadGrammarFromPath(path, cfg) {
  const text = await readPath(path);
  if (path === "-") {
    return [text, compile2(text, cfg)];
  }
  if (ext(path) === "json") {
    return [text, loadGrammarFromJSON2(text)];
  }
  return [text, compile2(text, cfg)];
}
// src/cmd/parse-worker.ts
async function loadGrammarFromCompressed() {
  const json2 = await decompress(workerData.grammarJson);
  return loadGrammarFromJSON2(json2);
}
var grammar2 = await loadGrammarFromCompressed();
var baseCfg = defaultCfg();
baseCfg.start = workerData.start ?? baseCfg.start;
baseCfg.trace = workerData.trace ?? baseCfg.trace;
parentPort?.on("message", async (msg) => {
  const { fileId, inputPath } = msg;
  let text;
  if (msg.text !== undefined) {
    text = msg.text;
  } else {
    try {
      text = await readFile2(inputPath, "utf-8");
    } catch {
      parentPort?.postMessage({ type: "result", fileId, readError: true });
      return;
    }
  }
  const fileCfg = baseCfg.merge({
    heart: {
      heartbeat: (mark, total) => {
        parentPort?.postMessage({ type: "heartbeat", fileId, mark, total });
      }
    },
    source: inputPath
  });
  try {
    const tree2 = parseInput(grammar2, text, fileCfg);
    parentPort?.postMessage({
      type: "result",
      fileId,
      name: path.basename(inputPath),
      text,
      payload: treeToJSONStr(tree2)
    });
  } catch (e) {
    parentPort?.postMessage({
      type: "result",
      fileId,
      parseError: true,
      error: e.message
    });
  }
});
