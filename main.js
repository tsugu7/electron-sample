const { app, BrowserWindow } = require('electron');
const path = require('path');

// グローバル参照を維持します。そうしないと、JavaScriptのGCによってウィンドウが自動的に閉じられてしまいます。
let mainWindow;

function createWindow() {
  // ブラウザウィンドウを作成します。
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // アプリケーションのindex.htmlを読み込みます。
  mainWindow.loadFile('index.html');

  // 開発者ツールを開きます（必要に応じてコメントアウトしてください）
  // mainWindow.webContents.openDevTools();

  // ウィンドウが閉じられたときに呼ばれます。
  mainWindow.on('closed', function () {
    // ウィンドウオブジェクトの参照を削除します。
    // 通常、マルチウィンドウをサポートするアプリでは、
    // ウィンドウを配列に格納しておき、対応するウィンドウの参照をここで削除します。
    mainWindow = null;
  });
}

// このメソッドはElectronが初期化を終了し、
// ブラウザウィンドウを作成する準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ使用できます。
app.whenReady().then(createWindow);

// すべてのウィンドウが閉じられたときに終了します。
app.on('window-all-closed', function () {
  // macOSでは、ユーザーがCmd + Qで明示的に終了するまで、
  // アプリケーションとそのメニューバーがアクティブなままになるのが一般的です。
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // macOSでは、ドックアイコンがクリックされ、他のウィンドウが開いていない場合、
  // アプリでウィンドウを再作成するのが一般的です。
  if (mainWindow === null) createWindow();
});

// このファイルでは、アプリケーション固有のメインプロセスコードを含めることができます。
// 別のファイルに入れて、ここで require することもできます。
