import * as vscode from 'vscode';

export class MyObject implements vscode.QuickPickItem {
    label: string;
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;

    constructor(name: string, description: string, detail: string) {
        this.label=name;
        this.description=description;
        this.detail=detail;
    }
}

export async function showQuickPick() {
    var objects : MyObject[] = [
        new MyObject('1','one','The number one'),
        new MyObject('2','two','The number two'),
        new MyObject('3','three','The number three'),
    ];

    return await vscode.window.showQuickPick<MyObject>(objects, { placeHolder: 'choose an item', ignoreFocusOut: true, });    
}
