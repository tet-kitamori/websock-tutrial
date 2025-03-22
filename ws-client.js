const WebSocket = require("ws");
const readline = require('readline');

// WebSocketクライアントを作成してサーバーに接続
const clientSocket = new WebSocket('ws://localhost:8080');

// サーバ接続ができた時の処理
clientSocket.onopen = () => {
  console.log('Connected to Server!');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // コマンドラインを利用してメッセージをサーバーに送信
  rl.on('line', (input) => {
    // 入力したメッセージを送信
    clientSocket.send(input);
  });
};

// サーバーのメッセージ受信
clientSocket.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

// サーバから接続中止
clientSocket.onclose = () => {
  console.log('Server closed Connection!');
};
