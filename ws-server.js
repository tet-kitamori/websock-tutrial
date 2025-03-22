// WebSocketモジュール
const WebSocket = require('ws');

// WebSocketサーバー生成、ポート8081を監視
const server = new WebSocket.Server({ port: 8080 });
console.log('WebSocket Server Started on port:8080.');

// クライアントからの接続
server.on('connection', (socket) => {
  console.log('Client connected');

  // エラー発生
  socket.on('error', console.error);

  // クライアントメッセージ処理
  socket.on('message', (data) => {
    console.log(`Received: ${data}`);

    // 接続している全てのクライアントにメッセージ送信
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // クライアント接続断
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});