// WebSocketモジュール
const WebSocket = require('ws');
const readline = require('readline');

// WebSocketサーバー生成、ポート8081を監視
const server = new WebSocket.Server({ port: 8080 });
console.log('WebSocket Server Started on port:8080.');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// クライアントからの接続
server.on('connection', (socket) => {
  console.log('Client connected');

  // エラー発生
  socket.on('error', console.error);

  // クライアントメッセージ処理
  socket.on('message', (data) => {
    const msg = JSON.parse(data);
    console.log('Get Message:', msg);

    // 接続して来たクライアント以外のクライアントにメッセージ送信
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // コマンドラインを利用してメッセージをクライアントに送信
  rl.on('line', (input) => {
    const msg = {
      who: "Server",
      messages: input,
    };
    // 接続している全てのクライアントにメッセージ送信
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }  
    });
  });

  // クライアント接続断
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});