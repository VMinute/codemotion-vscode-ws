import * as vscode from 'vscode';

const decoration = vscode.window.createTextEditorDecorationType( {
    backgroundColor: 'yellow',
    color: 'purple',
    fontWeight: 'bold'
});

export function onTextSave(document:vscode.TextDocument) {
    const editors=vscode.window.visibleTextEditors.filter(
        e => e.document.uri === document.uri
    );

    if (editors.length===0) {
        return;
    }

    const editor=editors[0];

    var text=editor.document.getText();
    var textToHighlight='ciao';
    var regexp=new RegExp(textToHighlight);
    var decorations : vscode.DecorationOptions[] = [];
    var currentLine = 0;

    text.split('\n').forEach(line => {
        var match = line.match(regexp);

        if ((match === null) || (match.index === undefined)) {
            currentLine++;
            return;
        }

        var range = new vscode.Range(
            new vscode.Position(currentLine, match.index),
            new vscode.Position(currentLine, match.index+textToHighlight.length)
        );

        decorations.push({
            range: range,
            hoverMessage: "Yahooooo!"
        });

        currentLine++;
    });

    editor.setDecorations(decoration,decorations);
}
