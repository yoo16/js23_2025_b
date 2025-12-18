import Channel from '../models/channelModel.js';

// チャンネル一覧表示
const index = (req, res) => {
    // チャンネルリストを取得
    const channels = Channel().fetchAll();
    // ビューに渡すデータを設定
    const data = {
        channels,
    }
    // TODO: ビューにチャンネルリストを渡す
    // 1. views/channel/index.ejs を設定: res.render()
    // 2. データをビューに渡す
    return res.render('channel/index', data)
    // res.end("views/channel/index.ejs を res.render() で表示");
};

// チャンネル詳細表示
const show = (req, res) => {
    // TODO: リクエストパラメータからチャンネルIDを取得
    const id = req.params.id;
    // TODO: チャンネルを取得: Channelモデルのfindメソッドを使用: Channel().find(id)
    const channel = Channel().find(id)
    if (!channel) {
        // チャンネルが存在しない場合は、トップページにリダイレクト
        res.redirect('/');
    }
    // ビューに渡すデータを設定
    const data = {
        channel,
    }
    // TODO: views/channel/show.ejs ビューにチャンネルを渡す
    return res.render('channel/show', data)
    // res.end("views/channel/show.ejs を res.render() で表示");
};

export default {
    index,
    show,
};