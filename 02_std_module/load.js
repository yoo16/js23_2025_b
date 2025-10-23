/**
 * モジュール読み込み(CommonJS)
 */
// 0) モジュール読み込み
// TODO: fsモジュール読み込む: CommonJS形式
// req
const fs = require('fs');

// TODO: pathモジュールを読み込む: CommonJS形式
const path = require('path');

/**
 * ファイル読み込み処理
 */
// TODO: 現在のディレクトリパスから、data/products.json を指定
// join() と __dirname を使用
// ./data/products.json
const filePath = path.join(__dirname, 'data', 'projects.json');

// 1) 最初に実行
console.log("📖 ファイル読み込み開始（非同期）...");

// 2) 非同期でファイル読み込み
// TODO: readFile(パス, 文字コード, コールバック関数)
// コールバック関数: handleRead
fs.readFile(filePath, 'utf8', handleRead)

// 3) ファイル読み込み中のメッセージ
console.log("⚙️ ファイル読み込み中...");

/**
 * ファイル読み込み：コールバック
 */
function handleRead(err, data) {
    // 4) 読み込み完了後に実行
    if (err) {
        console.error("❌ ファイル読み込みエラー");
        return;
    }

    // JSONをオブジェクトに変換
    const products = JSON.parse(data);
    // 内容表示
    console.table(products);
}