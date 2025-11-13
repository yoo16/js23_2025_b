// dotenv インポート(ESM)
import dotenv from 'dotenv';
// path モジュールのインポート
import path from 'path';
// TODO: express インポート(ESM)

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
// app.get('/test', (req, res) => {
//     console.log("ルーティング: /test");
//     const message = 'Hello, Express!';
//     res.send(message);
// });

// TODO: GET /info

// TODO: POST /save

// TODO: GET /
// /public/home.html

// TODO: GET /about
// /public/about.html

// TODO: GET /search  => keyword クエリパラメータ対応
// /public/home.html

// TODO GET /product/:id  => id パスパラメータ対応
// /public/product.html

// TODO: Express 起動
// app.listen(PORT, HOST, () => {
//     console.log(`Server running: ${BASE_URL}`);
// });