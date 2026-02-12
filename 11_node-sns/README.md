# Node SNS

## npm install

```bash
npm install
```

## Run the app

```bash
npm run dev
```

## JWTとCookieの実装

提示されたコードに基づき、**JWT（JSON Web Token）**と**Cookie**を用いた認証の仕組みを簡潔に解説します。

---

## 1. JWTの役割：2種類のトークン

この構成では、役割の異なる2つのトークンを使い分けています。

* **Access Token (アクセストークン)**
* **寿命:** 短い（例: 15分）。
* **用途:** 毎リクエストの認証に使用。万が一盗まれても被害が短時間で済むようにします。

* **Refresh Token (リフレッシュトークン)**
* **寿命:** 長い（例: 30日）。
* **用途:** アクセストークンが切れた際、**再ログインなしで新しいアクセストークンを発行**するために使用。DBに保存して管理します。

---

## 2. Cookieの役割：トークンの運搬

生成されたJWTをブラウザに保存し、リクエストのたびに自動送信する「入れ物」です。

* **httpOnly:** JavaScriptからのアクセスを禁止し、**XSS攻撃**（トークン盗難）を防ぎます。
* **sameSite: "lax":** 外部サイトからの意図しないリクエストを防ぎ、**CSRF攻撃**を抑制します。

---

## 3. 認証のフロー

`restoreUser` ミドルウェアで行っている処理の流れです。

1. **Session:** まずサーバー側のセッションを確認（最速）。
2. **Access Token:** セッションがなければCookieのアクセストークンを検証。有効ならログイン状態を復元。
3. **Refresh Token:** アクセストークンが期限切れなら、リフレッシュトークンをDBと照合。一致すれば**両方のトークンを再発行**してログインを継続。

---

### セキュリティのポイント

* **ステートレスとステートフルの併用:** 基本はJWT（ステートレス）ですが、リフレッシュトークンをDBで管理することで、強制ログアウトなどの制御を可能にしています。
* **パスワードハッシュ化:** `bcrypt` を使い、DBに生パスワードを保存しない設計になっています。

---

### 1. トークンの生成 (`authService.js`)

`jwt.sign(ペイロード, 秘密鍵, オプション)` を使って、ユーザーIDを含むトークンを作成します。秘密鍵は、実務では必ず環境変数（`.env`）で管理します。

```javascript
export const generateTokens = (id) => {
    // ※実務では process.env.JWT_SECRET などを使用します
    const secret = "your_super_secret_key"; 

    const accessToken = jwt.sign({ id }, secret, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id }, secret, { expiresIn: "30d" });

    return { accessToken, refreshToken };
};

```

### 2. Cookieの保存と削除 (`authService.js`)

セキュリティ設定（`httpOnly`等）を保ったままコメントアウトを外します。削除（ログアウト時）はキー名を指定してクリアします。

```javascript
export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15分
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30日
    });
};

export const clearAuthCookies = (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
};

```

### 3. トークンの検証 (`authenticateRequest.js`)

`jwt.verify(トークン, 秘密鍵)` で改ざんや期限切れをチェックします。**期限切れや不正なトークンの場合はエラーがスローされる**ため、アプリを止めないよう `try-catch` で安全に処理するのがポイントです。

```javascript
// 3. アクセストークン有効時のTODO部分
let decoded = null;
try {
    const secret = "your_super_secret_key";
    decoded = jwt.verify(accessToken, secret);
} catch (err) {
    // 期限切れ(TokenExpiredError)等は無視（= decodedはnullのまま次へ）
}

if (decoded) {
    // ...以降のDB取得処理へ続く
}

```

※「4. リフレッシュトークン有効時」の `TODO` も、検証する変数を `refreshToken` に変えて全く同じ `try-catch` 構文で実装します。

---

最後に `LoginController.js` の `auth` メソッド内にある `setAuthCookies` と `updateRefreshToken` のコメントアウトを外せば、ログイン機構が完成します。
