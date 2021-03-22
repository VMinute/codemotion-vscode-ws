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

    decorate(editor);
}

function decorate(editor:vscode.TextEditor) {
    const configuration=vscode.workspace.getConfiguration("codemotion2021ws");
    const textToHighlight:string | undefined=configuration.get("textToHighlight");

    if (textToHighlight===undefined) {
        return;
    }

    var text=editor.document.getText();
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

export function updateVisibleEditors() {
    vscode.window.visibleTextEditors.forEach(
        editor => decorate(editor)
    );   
}

export function onConfigurationChange(event: vscode.ConfigurationChangeEvent) {

    if (event.affectsConfiguration('codemotion2021ws')) {
        updateVisibleEditors();
    }
}
