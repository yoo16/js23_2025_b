// dotenv インポート(ESM)
import dotenv from 'dotenv';
// path モジュールのインポート
import path from 'path';
// TODO: express インポート(ESM)
import express from 'express';

// 環境変数の取得（デフォルト値も設定）
dotenv.config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://${HOST}:${PORT}/`

// 現在のディレクトリパスを取得
const __dirname = path.resolve();

// サーバーステータスの表示
const status = { HOST, PORT, BASE_URL, __dirname };
console.log(status);

// TODO: Expressアプリケーションの初期化
const app = express()

// ミドルウェア設定
// TODO: JSONボディパーサー
// app.use(express.json());

// TODO: URLエンコード: www-form-urlencoded ボディパーサー
// app.use(express.urlencoded({ extended: true }));

// TODO: 静的ファイルの公開: /public
// app.use(express.static(__dirname + '/public'));

// ------------------------
// ルーティング
// ------------------------
// TODO: GET /test
app.get('/test', (req, res) => {
    console.log("ルーティング: /test");
    const message = 'Hello, Express!';
    // クライアントにレスポンスを送信
    res.send(message);
});

// TODO: ALL /info
app.all('/info', (req, res) => {
    console.log("ルーティング: /info");
    const message = 'どのHTTPメソッドでもOK!';
    // クライアントにレスポンスを送信
    res.send(message);
});

// TODO: POST /save
app.post('/save', (req, res) => {
    console.log("ルーティング: /save");
    const message = 'データを保存しました!';
    // クライアントにレスポンスを送信
    res.send(message);
});

// TODO: GET /
// /public/home.html
app.get('/', (req, res) => {
    console.log("ルーティング: /");
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/home.html'
    res.sendFile(path);
});

// TODO: GET /about
// /public/about.html
app.get('/about', (req, res) => {
    console.log("ルーティング: /about");
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/about.html'
    res.sendFile(path);
});

// TODO: GET /search  => keyword クエリパラメータ対応
// /public/home.html
app.get('/search', (req, res) => {
    console.log("ルーティング: /search");
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/home.html'
    res.sendFile(path);
});

// TODO GET /product/:id  => id パスパラメータ対応
// /public/product.html
// http://localhost:3000/product/1 とかのURLでブラウザでアクセス
app.get('/product/:id', (req, res) => {
    console.log("ルーティング: /product/:id");
    // パスパラメータで id を取得
    const id = req.params.id
    console.log(id);
    // クライアントにレスポンスを送信
    const path = __dirname + '/public/product.html'
    res.sendFile(path);
});

// TODO: Express 起動
app.listen(PORT, HOST, () => {
    console.log(`Server running: ${BASE_URL}`);
});