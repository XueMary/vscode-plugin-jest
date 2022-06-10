// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-plugin-jest" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-plugin-jest.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-plugin-jest!');
	});
	// context.subscriptions.push(disposable);

	const showTime = vscode.commands.registerCommand('vscode-plugin-jest.time', () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		vscode.window.showInformationMessage(`${year}/${month}/${day}`);
	});
	context.subscriptions.push(showTime);
}

// this method is called when your extension is deactivated
export function deactivate() {}
