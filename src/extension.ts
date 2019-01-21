import * as vscode from 'vscode';
import { unzip, unzipError, download } from './zip';
import * as fs from 'fs';
import { Global } from './global';

export function activate(context: vscode.ExtensionContext) {

	console.log('"eShell-helloWorld" ekstenzija aktivna!');

	let disposable = vscode.commands.registerCommand('hello.World', () => {
		
		// vscode.window.showInformationMessage('eShell Hello World!');

		Global.context = context;

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Download & Unzip",
			cancellable: true
		}, (progress, token) => {
			
			progress.report({ increment: 0 });
			
			
			var p = new Promise((resolve, reject) => {
			
				//resolve = () => { vscode.window.showInformationMessage('resolve funkcija!!')};
				token.onCancellationRequested(() => {
					vscode.window.showErrorMessage("Unzip prekinut!?");
					unzipError();
					reject();
				});
	

				const options = {
					host: 'https://dl.bintray.com/bringout', 
					// path: path.join(destDir), 
					packageName: 'F18',
					// platform: 'windows-x64'
					revision: '20190119.2'
				};

				//unzip(progress, resolve, reject);
				download(options, progress, resolve, reject);
				
			});

			p.then(( params: any ) => {
				if (fs.existsSync( params.revisionInfo.executablePath)) fs.chmodSync( params.revisionInfo.executablePath, 0o755);
				if (fs.existsSync( params.revisionInfo.zipPath)) fs.unlinkSync( params.revisionInfo.zipPath);
				// vscode.window.showInformationMessage('kraj resolve funkcije after unzip!');
				progress.report({ increment: 100, message: params.message });

			});

			

			return p;
			
			
		});

		// zipTest();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
