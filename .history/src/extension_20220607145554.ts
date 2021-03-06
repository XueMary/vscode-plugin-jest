// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import createJestFile from './rules/createJest';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-plugin-jest.helloWorld', createJestFile);
	context.subscriptions.push(disposable);
}

export function deactivate() {}
