import { pool } from './lib/db.js';

// TODO: SQL: users テーブルから 5 件取得
const sql = ""

// TODO: SQL 実行
const [rows] = [];

// 表示
console.table(rows);

// DB切断
pool.end();