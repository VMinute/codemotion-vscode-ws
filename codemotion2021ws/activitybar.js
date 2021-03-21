"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDataProvider = void 0;
const vscode = require("vscode");
const numbertowords = require("number-to-words");
// we create 1k nodes on 3 levels:
// 0
//  0
//  1
//  ...
//  9
// 1
//  0
// ...
class DummyDataProvider {
    getTreeItem(element) {
        var item = {
            label: element.toString(),
            description: numbertowords.toWords(element),
            command: {
                title: "info",
                command: "ui-demo.showInfo",
                arguments: [element]
            }
        };
        // only the top two levels can be expanded, first one is expanded, 2nd collapsed
        if (element <= 9) {
            item.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        }
        if (element <= 99) {
            item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        }
        return item;
    }
    getChildren(element) {
        var base;
        if (element === undefined) {
            base = 0;
        }
        else {
            base = element;
        }
        if (base > 99) {
            return [];
        }
        var children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (var i = 0; i < 9; i++) {
            children[i] += base * 10;
        }
        return children;
    }
}
exports.DummyDataProvider = DummyDataProvider;
//# sourceMappingURL=activitybar.js.map