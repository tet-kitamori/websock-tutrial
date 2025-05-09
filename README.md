# WebSock-tutrial

HTTP はクライアントから何らかのリクエストを送り、一時的にコネクションを張り、
サーバがそれに対するレスポンスを返します。

これに対して、WebSocket はコネクションを常時張って双方向通信ができる。

## WebScket 通信の特徴

1. サーバ・クライアント間で一度コネクションを張れば、どちらからコネクションを
切断しない限り、そのコネクション上で通信ができる。
2. サーバとクライアントのどちらからでも通信を行える。
3. Payload 以外の制御用ヘッダのデータ量が2byte～14byteで通信負荷が少ない。
4. 常時接続で、コネクションの張り直しがないため他のアプリケーションへの影響が少ない。

## node.js での Websocket インストール

node.js で WebSocket 通信を行うには、以下のように npm を使って WS モジュールを
インストールする。
```
> npm install ws
```

## このリポジトリのサーバ、クライアントの動作確認

1. コマンドプロンプト（またはターミナル）を３つ用意し、これらのファイルの格納された
フォルダに移動する。
2. 一つのコマンドプロンプトで、`> node ws-server.js` としてサーバを立ち上げる。
3. 他の２つのコマンドプロンプトで、`> node ws-client.js` としてクライアントを
立ち上げる。

クライアントから、サーバあてにメッセージを送信すると、それを受信したサーバを
メッセージを表示するとともに、すべてのクライアントにそのメッセージを転送する。

クライアントが切断すると、サーバが切断メッセージを表示する。

サーバが切断すると、生存しているクライアントは切断メッセージを表示する。

'ws-server.js' と 'ws-client.js' は、クライアントでの入力をそのままサーバーに
送る例で、ペアになります。

'ws-server2.js' と 'ws-client2.js' は、クライアントとサーバの両方で、文字列
入力できるようにするとともに、送受信するデータをJSONデータに拡張した例です。
