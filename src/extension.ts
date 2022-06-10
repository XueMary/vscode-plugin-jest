
import * as vscode from 'vscode';
import createJestFile from './rules/createJest';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-plugin-jest.createJest', createJestFile);
	context.subscriptions.push(disposable);
}

export function deactivate() {}
