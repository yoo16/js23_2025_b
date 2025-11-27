// lib/db.js から pool をインポート（DB接続済みのはず）
import { pool } from './lib/db.js';

// TODO: SQL: users テーブルから 5 件取得
// const sql = "SELECT * FROM users LIMIT 5;"
// const sql = "SELECT name, email FROM users LIMIT 5;"
// users テーブルのレコードの件数を取得
const sql = "SELECT COUNT(id) AS user_count FROM users;"

// TODO: SQLクエリー実行:非同期通信
const [rows] = await pool.query(sql)

// 表示
console.table(rows);

// DB切断
pool.end();