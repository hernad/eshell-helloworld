import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('"eShell-helloWorld" ekstenzija aktivna!');

	let disposable = vscode.commands.registerCommand('hello.World', () => {
		vscode.window.showInformationMessage('eShell Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
