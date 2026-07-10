# 初心者向け導入・日本語品質監査

監査日: 2026-07-10
対象: `src/pages/index.astro`, `src/content/docs/*.mdx`, `astro.config.mjs`, `scripts/content-contract.test.mjs`
最終用途: AIコーディングをまだ始めていない読者が、契約関係を誤解せずに道具を1つ選び、PCの作業フォルダを開くところまで進めるようにする。

## 結論

監査前の `はじめの一歩` は、すでにコーディング支援AIを使える人を前提にし、最初の行動が作業フォルダの作成になっていた。今回、ツールの選択、利用条件の確認、導入、サインイン、作業フォルダの接続確認を先頭へ追加した。

同時に、ChatGPTを使う場合はCodex、Claudeを使う場合はClaude Codeという2つの始め方を整理した。両方を使い始める必要はなく、どちらか1つを選べばよいことを明記した。

日本語は、筆者の内部運用や強い断定ではなく、読者が次に取る行動と確認できる事実を中心に修正した。一般公開はサイト全体の前提にせず、自分用、特定の人への共有、一般公開のうち1つの利用範囲として扱っている。

## 監査方法

- 現行の全コンテンツと過去の監査資料をUTF-8で読み直した。
- 初心者導入、日本語表現、製品・契約関係について、2つの独立した読み取り専用レビューを実施した。
- 変動する製品情報は、各社の公式ページまたは対象リポジトリのREADMEで確認した。
- 新しい要件をコンテンツ契約テストへ追加し、REDからGREENへの変化を確認した。
- Astroの全ページをビルドし、内部リンク、フラグメント、404、別base pathを検査した。
- PlaywrightでPC幅1280×740、スマホ幅390×844の表示を確認した。

## 主な所見と対応

| 重要度 | 所見 | 対応 |
| --- | --- | --- |
| 最優先 | `はじめの一歩` に、AIの選択、契約、導入、サインインがない | 冒頭に2経路、公式確認先、ローカル利用の前提、読み取りだけの接続確認を追加 |
| 最優先 | ChatGPTとCodex、ClaudeとClaude Codeの関係が分かりにくい | ChatGPT→Codex、Claude→Claude Codeを分け、どちらか1つで始められると説明 |
| 最優先 | 最初に選ぶ有料プランと統合後のOpenAIアプリが分からない | ChatGPT PlusとClaude Proの月20ドルを案内し、Chat・Work・Codexを統合した新しいChatGPTデスクトップアプリを入口に変更 |
| 重要 | Web・クラウド版を選ぶと、次のローカルフォルダ手順へ進めない | このガイドはPCのフォルダを直接開けるアプリ、CLI、IDE連携を対象と明記 |
| 重要 | Typelessが必須のように見え、紹介報酬、クラウド処理、必要権限が弱い | OS標準音声入力を先に案内し、紹介報酬、データ処理、マイク・アクセシビリティ権限を明記 |
| 重要 | MarkItDownとPlaywrightが、依頼文だけで使えるように見える | Python、Node.js、仮想環境、操作用ブラウザ、ファイル権限、手動代替を説明 |
| 重要 | Product Starterが初心者の標準入口に見える | 第三者の高度なClaude Code専用スターターと明記し、`/init-pj` 前の承認ゲートを追加 |
| 重要 | `公開前` が共通の主題として残る | `仕上げる・人に使ってもらう前` と利用範囲ベースのテンプレートへ変更 |
| 重要 | 料金・利用回数の節約を強い因果で説明している | 主目的を方向違いと大きなやり直しの軽減へ変更 |
| 重要 | GitHub検索の説明と `created:` / `--sort stars` の意味が一致しない | 「直近1か月に作成され、現在のスター数が多い候補」に修正 |
| 重要 | 最初のテンプレートが、README 1ファイルの導入順を迂回する | テンプレートもREADME 1ファイルに限定し、準備前は `はじめの一歩` へ案内 |
| 重要 | 権利確認が一般公開だけの条件になっている | 権利とアクセシビリティを、成果物と利用者に応じた共通確認へ移動 |
| 重要 | 法律・医療・お金の判断が、詳しい指示だけで足りるように読める | AIだけで最終判断せず、最新の一次情報または専門家を確認すると追記 |
| 日本語 | 「適当にダラダラ」「たぶん動いています」「やはりGitHub」「かなり弱い」などが残る | 具体的な行動、条件、結果へ言い換え |
| 表示 | スマホ幅で比較表の文字が詰まり読みづらい | AI選択2経路と補助ツール5用途をカード表示へ変更 |

## 公式情報の確認結果

確認日は2026-07-10。ChatGPT PlusとClaude Proの米国月払い20ドルは、確認日、税、地域差の注意と一緒に本文へ記載した。対象プラン、機能、利用上限、導入手順は変わるため、公式ページへのリンクも併記している。

- OpenAI: ChatGPT Plusは月20ドル。CodexはFreeとGoを含むChatGPT各プランに含まれ、利用上限はプランにより異なる。[What is ChatGPT Plus?](https://help.openai.com/en/articles/6950777-what-is-chatgpt), [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-chatgpt)
- OpenAI: 2026年7月9日、新しいChatGPTデスクトップアプリがChat、Work、Codexを1つにまとめた。既存のCodexアプリは通常どおり更新すると新アプリへ移行する。[ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-app-features), [Moving to the new ChatGPT desktop app](https://help.openai.com/en/articles/20001276)
- Anthropic: Claude Proは米国月払い20ドルでClaude Codeを含む。API利用は別料金で、利用上限がある。[What is the Pro plan?](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan), [Set up Claude Code](https://docs.anthropic.com/en/docs/claude-code/getting-started)
- Typeless: 音声と限定的な文脈はクラウド処理され、マイク・アクセシビリティ権限が必要と説明されている。紹介プログラムでは紹介者への報酬が案内されている。[Data Controls](https://www.typeless.com/data-controls), [Installation & Setup](https://www.typeless.com/help/installation-and-setup), [Affiliate Program](https://www.typeless.com/affiliate)
- MarkItDown: Python 3.10以上、仮想環境が推奨され、現在のプロセスと同じ権限でI/Oを行う。信頼できない入力を直接渡さないよう注意されている。[microsoft/markitdown README](https://github.com/microsoft/markitdown)
- Playwright: 本体と操作用ブラウザの導入が必要で、Node.jsなどの要件がある。[Playwright Installation](https://playwright.dev/docs/intro)
- Product Starter: Claude Code用の第三者リポジトリで、`/init-pj` は前提ツールの導入からDB構築まで行うとREADMEに記載されている。[jujunjun110/product-starter](https://github.com/jujunjun110/product-starter)

## 日本語の編集基準

- 「安全」「正しく」「必ず」は、確認した事実または条件を説明できる場合だけ使う。
- 「かなり」「一気に」「楽」など程度が曖昧な語は、読者の行動や結果へ言い換える。
- 筆者の内部運用は、一般の読者が再現できる手順へ変換する。
- 製品名を一般名詞として使わず、`Claude Code`と`Codex`を区別する。
- 一般公開を共通の完成条件にせず、利用範囲に応じて確認量を変える。
- 高リスク判断は、AIへの詳しい指示だけで完結させない。

## 検証結果

- `npm run qa`: 成功。39テスト、17必須ルート、18 HTML、1023ローカル参照、477フラグメントを確認し、エラー0。
- `/preview-base/` での `npm run build` と `npm run qa:site`: 成功。base pathを変えても内部リンク・フラグメントのエラー0。
- `git diff --check`: エラー0。
- 文字化け候補検索: 該当0。
- ブラウザ表示:
  - `/`: PC幅1280、スマホ幅390とも横スクロールなし。「使うAIを1つ選ぶ」と `はじめの一歩` への導線を実画面で確認。
  - `/start/`: PC幅1280で横スクロールなし。スマホ幅390でページ幅390、AI選択カード2枚は各358px。
  - `/tools/`: PC幅1280で横スクロールなし。スマホ幅390でページ幅390、用途カード5枚は各358px。
  - 公式リンク、見出し順、コピー用ボタンを実画面で確認。

## 継続監視

- ChatGPTとClaudeの対象プランと利用上限。
- ChatGPTデスクトップアプリへの統合後の導入手順と旧アプリの扱い。
- Typelessの料金、データ処理、必要権限、紹介プログラム。
- MarkItDown、Playwright、Product Starterの前提バージョンと導入手順。
- 外部ツールの説明を更新するときは、記事や検索結果ではなく公式ページまたは対象READMEを確認する。
