"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var pascalCaseToKebab = function (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
var getImports = function (list) {
    return list.filter(function (item) { return item.includes('import') && item.includes('from'); }).join('\n');
};
var getComponentName = function (list) {
    var result = list.find(function (item) { return item.includes('default') && item.includes('App'); });
    if (result === undefined) {
        return 'err';
    }
    var componentName = result.split(' ').find(function (item) { return item.includes('App'); });
    if (componentName === undefined) {
        return 'missing component App in component name';
    }
    return pascalCaseToKebab(componentName.split('(')[0]);
};
var getClassName = function (list) {
    var result = list.find(function (item) { return item.includes('default') && item.includes('App'); });
    if (result === undefined) {
        return 'err';
    }
    var className = result.split(' ').find(function (item) { return item.includes('App'); });
    if (className === undefined) {
        return 'missing class App in component name';
    }
    return className.split('(')[0].replace('App', '').concat('Component');
};
var getComponentParams = function (list) {
    var result = list.find(function (item) { return item.includes('default') && item.includes('App'); });
    if (result === undefined) {
        return 'err';
    }
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(result);
    if (matches === null) {
        return 'missing parenthesis in component name';
    }
    return matches[1].split(',').map(function (item) { return "public ".concat(item); }).join(', ');
};
var transformLetInInput = function (list) {
    // @ts-ignore
    return list.map(function (item) {
        if (item.includes('let')) {
            return item.replace('let', '@Input()').replace(';', '; \n');
        }
    }).filter(Boolean).join(' ');
};
var getModules = function (list) {
    var result = list.find(function (item) { return item.includes('const') && item.includes('imports'); });
    if (result === undefined) {
        return 'err';
    }
    var moduleName = result.split(' = ')[1].replace(';', ',');
    if (moduleName === undefined) {
        return 'missing modules in component';
    }
    return moduleName;
};
var returnStatement = function (list) {
    var result = list.filter(function (item) { return item.includes('if') && item.includes('('); });
    var result2 = list.filter(function (item) { return item.includes('return') && item.includes('('); });
    return result2.map(function (item, index) {
        var regExp = /\(([^)]+)\)/;
        var r = regExp.exec(item);
        if (r === null) {
            return 'missing parenthesis in component name';
        }
        var last = result2[result2.length - 1];
        if (item === last) {
            return r[1];
        }
        var i = regExp.exec(result[index]);
        var ngIf = i === null ? '' : "*ngIf=\"".concat(i[1], "\"");
        return "<ng-container ".concat(ngIf, "> ").concat(r[1], " </ng-container>");
    }).join('\n');
};
var template = function (c) { return "\nimport {Component, Input} from \"@angular/core\";\n".concat(c.fileImports, "\n\n@Component({\n  selector: '").concat(c.selector, "',\n  standalone: true,\n  template: `").concat(c.template, "`,\n  imports: ").concat(c.imports, "\n})\nexport class ").concat(c.className, " {\n  ").concat(c.inputs, "\n\n  constructor(").concat(c.constructorParams, ") {}\n}\n"); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readFile('src/lib/test/Header.tsx', 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    var c = data.split('\n');
                    var component = template({
                        fileImports: getImports(c),
                        selector: getComponentName(c),
                        template: returnStatement(c),
                        imports: getModules(c),
                        className: getClassName(c),
                        constructorParams: getComponentParams(c),
                        inputs: transformLetInInput(c)
                    });
                    console.log('component', component);
                    fs.writeFile('src/lib/test/header.component.ts', component, function (err) { return err; });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
