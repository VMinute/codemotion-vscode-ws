// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as quickpick from './quickpick';
import * as activitybar from './activitybar';
import * as editor from './editor';

var statusBarItem=vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

async function statusBarCommand() {
	await vscode.window.showInformationMessage('You clicked on the status bar!');
}

async function testBasicUI() {
	var name=await vscode.window.showInputBox({
		prompt: 'Insert your name'
	});

	await vscode.window.showInformationMessage(`Hello ${name}!`);
}

var outputChannel : vscode.OutputChannel = vscode.window.createOutputChannel('Codemotion 2021');

async function testAdvancedUI() {
	// this is a sample of how to NOT implement password check :)
	var password=await vscode.window.showInputBox({
		prompt: 'Please insert your password',
		password: true,
		ignoreFocusOut: true,
		validateInput: (value: string) => {
			if (value==='1234') {
				return undefined;
			}
			return `${value} is not the right password!`;
		}
	});

	var response = await vscode.window.showWarningMessage('Do you want to continue?','yes','no');

	if (response==='no') {
		vscode.window.showInformationMessage('We will continue anyway!');
	}
	
	var element=await vscode.window.showQuickPick(['one', 'two', 'three']);

	var complexelement=await quickpick.showQuickPick();

	if (complexelement!==undefined) {
		outputChannel.appendLine(`You selected item ${complexelement.label}`);
		outputChannel.show();
	}

	var inputbox=vscode.window.createInputBox();

	inputbox.prompt='Insert a value';
	inputbox.title='My input box';
	inputbox.buttons=[
		{ iconPath: new vscode.ThemeIcon('bug'), tooltip: 'bug'},
		{ iconPath: new vscode.ThemeIcon('gear'), tooltip: 'gear'}
	];
	inputbox.onDidTriggerButton(button => inputbox.value=button.tooltip!);
	inputbox.onDidAccept( () => outputChannel.appendLine(inputbox.value));
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codemotion2021ws" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codemotion2021ws.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Codemotion 2021 Workshop!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand('codemotion2021ws.testBasicUI',testBasicUI)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('codemotion2021ws.testAdvancedUI',testAdvancedUI)
	);

	context.subscriptions.push(
		vscode.window.registerTreeDataProvider("codemotion2021ws.uiview", new activitybar.DummyDataProvider())
	);
	
	context.subscriptions.push(
		vscode.commands.registerCommand('codemotion2021ws.treeViewTitleCommand',activitybar.treeViewTitleCommand)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('codemotion2021ws.treeViewElementCommand',activitybar.treeViewElementCommand)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('codemotion2021ws.statusBarCommand',statusBarCommand)
	);

	statusBarItem.command='codemotion2021ws.statusBarCommand';
	statusBarItem.text='$(star) codemotion2021';
	statusBarItem.show();

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument( document => {
		statusBarItem.text=`$(star) ${vscode.workspace.textDocuments.length}`;
	}));

	context.subscriptions.push(
		vscode.workspace.onDidSaveTextDocument(editor.onTextSave)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
