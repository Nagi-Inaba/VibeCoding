# バイブコーディング初心者向けサイト調査結果

調査日: 2026-07-08
目的: 既存のバイブコーディング初心者向けサイトが、どのような内容を扱っているかを読み取り、本プロジェクトの初心者向けガイドに活かせる形で機能別に整理する。
調査範囲: 初心者向けチュートリアル、ツール比較、実践Tips、公開前チェック、セキュリティ記事を含む。本文を確認できたサイトのみ採用し、アクセス不能だったページは採用しない。

## 要約

読んだサイトは大きく分けると、次の3系統に分かれる。

1. 入門・体験型: 「自然言語でアプリを作るとは何か」「まず小さいものを作る」「ツールを触って成功体験を作る」という導入。Lovable、Replit、Microsoft、Tom's Guide、日本語のAI革命やObotAIがこの系統。
2. 実務フロー型: PRD、ワイヤーフレーム、GitHub、DB、secrets、テスト、段階的な実装を重視する。Zapier、Anything、ProductTalk、Aatir Substackがこの系統。
3. リスク管理型: AI生成コードのセキュリティ、秘密情報、認証、入力検証、依存関係、レビュー、実行時検証を扱う。CSA、Invicti、ITPro、TechRadarがこの系統。

初心者向けサイトの最近の主流は「AIに丸投げすればよい」ではない。むしろ、AIで初速を出しつつ、要件を小さく切る、作業履歴を残す、GitHubで戻れるようにする、実際に触って確認する、公開前に安全性を確認する、という方向へ寄っている。

本プロジェクトの差別化余地は、単なるプロンプト集ではなく「AIが迷わない作業場所の設計」「フォルダ構成」「作業記録」「検証ログ」「人間が最終判断するチェックリスト」を中心に据えることにある。既存サイトはツールやプロンプトには触れるが、AIに読ませるファイル群、プロジェクト内の情報配置、作業の再開性まで体系化している例は少ない。

## 機能別の調査結果

### 1. 概念理解とマインドセット

初心者向けページでは、バイブコーディングを「自然言語でAIに意図を伝え、AIがコードを生成し、人間が確認しながら反復する開発方法」と説明している。Google Cloud、DataCamp、Lovable、Replit Docsは、従来のコーディング知識がなくても始められることを強調しつつ、人間側には目的設定、テスト、判断が残ると書いている。

よくある説明:

- 人間は細かい構文より、作りたい体験や条件を説明する。
- AIは初期実装、修正案、コード生成、時にはデバッグを担当する。
- 人間は完成物を触り、意図と違う箇所を言語化し、公開可否を判断する。
- 「コードを知らなくてよい」と「何も考えなくてよい」は別物として扱う。

本プロジェクトへの示唆:

- 最初のページでは、バイブコーディングを「プロンプト技術」ではなく「作業の進め方」として定義するとよい。
- 初心者に対しては「あなたの役割は、仕様作成者、検品者、編集者です」と明示すると理解されやすい。

代表ソース:

- Google Cloud: https://cloud.google.com/discover/what-is-vibe-coding
- DataCamp: https://www.datacamp.com/blog/vibe-coding-guide-for-beginners
- Lovable: https://lovable.dev/blog/what-is-vibe-coding
- Replit Docs: https://docs.replit.com/learn/foundations/vibe-coding-101

### 2. ツール選定

多くのサイトは、初心者向けツールを用途別に整理している。Business Insider、Lovable、Zapierの比較記事では、非エンジニア向けのアプリ生成ツールと、エンジニア寄りのAIコーディング支援ツールを分けて紹介している。

よくある分類:

- アプリ生成・ノーコード寄り: Lovable、Bolt、Base44、Replit。
- UI生成・プロトタイプ寄り: v0、Tempo、Figma Makeなど。
- コード編集・開発者寄り: Cursor、Claude Code、GitHub Copilot、OpenAI Codex。
- 汎用AIチャット: ChatGPT、Claude、Gemini。PRD、プロンプト、エラー整理に使う。

本プロジェクトへの示唆:

- ツール一覧だけではなく、「何を作りたい人にはどの入口が向いているか」を示すと初心者に親切。
- 「いきなり高機能な開発環境を使う」より、「小さなアプリ生成ツールで成功体験を作る」流れも紹介できる。
- ただし、ツール名は変わりやすいので、サイト本文では固定ランキングより選び方の軸を重視するのがよい。

代表ソース:

- Business Insider: https://www.businessinsider.com/beginners-guide-ai-vibe-coding-lovable-base44-claude-2026-6
- Lovable tool guide: https://lovable.dev/guides/vibe-coding-apps-8-options-for-beginners
- Zapier tool guide: https://zapier.com/blog/best-vibe-coding-tools/

### 3. 要件定義、PRD、ワイヤーフレーム

Zapierの実践ガイドは、初心者向けにもPRD、ワイヤーフレーム、GitHub準備を推奨している。AnythingやProductTalkも、AIにいきなり「アプリを作って」と頼むのではなく、機能、画面、データ、ユーザーの流れを先に整理する重要性を扱っている。

よくある内容:

- 何を作るかを1文で書く。
- 誰が、いつ、何を達成するためのアプリかを決める。
- 画面ごとの役割を簡単に書く。
- 保存するデータ、認証、外部連携の有無を先に確認する。
- できたと言える条件を決める。

本プロジェクトへの示唆:

- 初心者向けの「ミニPRDテンプレート」を用意するとよい。
- 本プロジェクトの特徴である「フォルダ構成」を、PRD、画面メモ、作業ログ、検証ログの置き場所として説明できる。
- プロンプト例より先に、AIに読ませる前提ファイルを作る手順を置くと差別化できる。

代表ソース:

- Zapier: https://zapier.com/blog/how-to-vibe-code/
- Anything: https://www.anything.com/blog/vibe-coding-tutorial
- ProductTalk: https://www.producttalk.org/vibe-coding-best-practices/

### 4. プロンプト作成

初心者向け記事では、プロンプトは「短い魔法の言葉」ではなく、要件、制約、完成イメージ、修正内容を伝えるための仕様書に近い扱いになっている。Business Insider、Microsoft、Tom's Guideは、詳細に頼むこと、段階的に頼むこと、最初のプロンプトをChatGPTやClaudeに作らせることを推奨している。

よくあるプロンプトの要素:

- 作りたいもの。
- 想定ユーザー。
- 画面や機能。
- データの保存方法。
- デザインの雰囲気。
- 使ってよい技術や避けたいこと。
- 期待する出力形式。
- 既知のエラーや直したい挙動。

本プロジェクトへの示唆:

- 「万能プロンプト集」ではなく、場面別の頼み方として整理するのがよい。
- 例: 初回作成、画面修正、エラー修正、仕様変更、テスト追加、公開前レビュー。
- プロンプトを考え込むより、プロジェクト内の前提資料を整えることが大事、という本プロジェクトの軸を強調できる。

代表ソース:

- Business Insider: https://www.businessinsider.com/beginners-guide-ai-vibe-coding-lovable-base44-claude-2026-6
- Microsoft Developer: https://developer.microsoft.com/blog/complete-beginners-guide-to-vibe-coding-an-app-in-5-minutes
- Tom's Guide: https://www.tomsguide.com/ai/how-to-get-started-with-vibe-coding-5-simple-tips-for-beginners

### 5. 生成、確認、反復の実装ループ

Replit Docs、AI革命、Addy Osmaniのガイドなどは、バイブコーディングを「一発生成」ではなく、作って、触って、違いを伝えて、直すループとして説明している。

典型的な流れ:

1. 小さな目的を決める。
2. AIに初期版を作らせる。
3. プレビューやブラウザで触る。
4. 気になる点を具体的に伝える。
5. 一つずつ直す。
6. 動く状態を保存する。
7. 次の機能へ進む。

本プロジェクトへの示唆:

- 「AIに頼む前」「AIが作った後」「動いた後」の3段階でページを分けるとわかりやすい。
- 作業ログを残す意義を、初心者向けに「次に何を頼むか迷わないため」と説明するとよい。

代表ソース:

- Replit Docs: https://docs.replit.com/learn/foundations/vibe-coding-101
- AI革命: https://ai-revolution.co.jp/media/vibe-coding-guide/
- Addy Osmani guide: https://vibe.addy.ie/

### 6. デバッグと修正依頼

Tom's Guide、Aatir Substack、Anything、ProductTalkでは、AIがうまく直せないときの対処が実践的に扱われている。特に、エラーをそのまま貼る、一度に複数の変更を頼まない、何度も失敗する修正はロールバックする、という考え方が目立つ。

よくあるTips:

- エラー文、再現手順、期待する挙動、実際の挙動をセットで伝える。
- 「全部直して」ではなく「ログイン後に一覧が空になる問題だけ直して」と絞る。
- 3回ほど失敗したら、別の説明に変えるか、動いていた版へ戻す。
- AIに原因候補を出させてから修正させる。
- 新機能追加より先に、今壊れている部分を安定させる。

本プロジェクトへの示唆:

- 初心者向けに「エラー報告テンプレート」を用意すると価値が高い。
- 「修正依頼は一つずつ」という原則をサイト全体で繰り返すとよい。
- ロールバックの説明はGit未経験者にもわかるように、「動いていた状態に戻る保険」として扱う。

代表ソース:

- Tom's Guide: https://www.tomsguide.com/ai/how-to-get-started-with-vibe-coding-5-simple-tips-for-beginners
- Aatir Substack: https://aatir.substack.com/p/vibe-coding-101-23-practical-tips
- Anything: https://www.anything.com/blog/vibe-coding-tutorial
- ProductTalk: https://www.producttalk.org/vibe-coding-best-practices/

### 7. UI/UXとデザイン品質

Business InsiderのUX記事は、AI生成アプリは「整って見えるが、使う人の判断や不安に寄り添っていない」ケースがあると指摘している。初心者向け記事ではデザインの見た目に偏りがちだが、実際にはユーザーが何をしたいか、どの状態で迷うか、エラー時にどう回復するかを指定する必要がある。

よくある問題:

- ボタンやカードはあるが、優先順位がわからない。
- エラー、空状態、読み込み中、権限なし、オフラインなどの状態が弱い。
- きれいだがどこかで見たようなAI生成UIになる。
- 実際の利用文脈に合わない。

本プロジェクトへの示唆:

- デザイン指示は「色や雰囲気」だけでなく、「ユーザーが迷う場面」を伝える方法として教える。
- 初心者向けのUI確認チェックリストを入れるとよい。

代表ソース:

- Business Insider UX article: https://www.businessinsider.com/ai-coded-app-user-interface-experience-design-2026-7

### 8. データ、認証、バックエンド

初心者向けの軽い記事では後回しにされがちだが、実務寄りの記事では、DB、認証、環境変数、外部API、決済などを早めに整理する必要があると説明している。ZapierやCSA、Anythingは、公開するアプリでは特にデータと認証を軽く扱わないように促している。

初心者がつまずきやすい点:

- 画面はできたが、データが保存されない。
- ユーザーごとのデータ分離ができていない。
- APIキーをコードに直接書いてしまう。
- 認証後の権限チェックが不十分。
- DB構造を途中で大きく変えてAIが混乱する。

本プロジェクトへの示唆:

- 「公開しないおもちゃ」と「他人に使わせるアプリ」を分けて説明する。
- 初心者向けでも、secrets、環境変数、個人情報、認証は早めに扱う。
- フォルダ構成の中に `notes/data-model.md` や `notes/security-check.md` のような置き場所を提案できる。

代表ソース:

- Zapier: https://zapier.com/blog/how-to-vibe-code/
- Anything: https://www.anything.com/blog/vibe-coding-tutorial
- CSA: https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide

### 9. GitHub、履歴、ロールバック

実務寄りのサイトでは、GitHub連携やコミットを初心者向けにも推奨している。Aatir SubstackやAnythingは、AIが壊したときに戻れる状態を作ることを重視している。Zapierも、GitHubを準備してから進める実践フローを示している。

よくある内容:

- 動いたら保存する。
- 大きな変更の前にコミットする。
- AIが何を変えたかを見る。
- 壊れたら動いていた版に戻す。
- 自動生成された差分をそのまま信用しない。

本プロジェクトへの示唆:

- Gitを知らない初心者向けに、「履歴を残す理由」から説明する必要がある。
- 「完璧なGit講座」ではなく、バイブコーディングに必要な最小限の履歴管理として扱うとよい。

代表ソース:

- Zapier: https://zapier.com/blog/how-to-vibe-code/
- Aatir Substack: https://aatir.substack.com/p/vibe-coding-101-23-practical-tips
- Anything: https://www.anything.com/blog/vibe-coding-tutorial

### 10. テストと動作確認

DataCamp、Zapier、Anything、Microsoftは、AIが作ったコードを動作確認する重要性を扱っている。初心者向け記事では「テスト」と言うと難しく見えるため、実際に触る確認、期待する挙動のチェック、エラーケースの確認から始める説明が多い。

よくある確認項目:

- 主要ボタンをクリックする。
- フォームに正しい値と間違った値を入れる。
- 画面を再読み込みしてデータが残るか見る。
- ログイン前後の見え方を確認する。
- スマホ幅で表示する。
- 生成されたテストやlintを走らせる。

本プロジェクトへの示唆:

- 「テストを書く」より前に、「触って確かめる観点」を初心者向けに出す。
- 画面確認ログ、エラー記録、修正依頼テンプレートをセットにすると実用的。

代表ソース:

- DataCamp: https://www.datacamp.com/blog/vibe-coding-guide-for-beginners
- Zapier: https://zapier.com/blog/how-to-vibe-code/
- Anything: https://www.anything.com/blog/vibe-coding-tutorial
- Microsoft Developer: https://developer.microsoft.com/blog/complete-beginners-guide-to-vibe-coding-an-app-in-5-minutes

### 11. セキュリティと公開前チェック

CSA、Invicti、ITPro、TechRadarは、AI生成コードのリスクを中心に扱っている。初心者向け本体記事ではセキュリティは軽く触れられる程度の場合もあるが、公開するアプリを前提にすると必須テーマになる。

よくある警告:

- AIが生成したコードには脆弱性が含まれうる。
- APIキーや秘密情報をコードに直接書かない。
- 入力値を検証する。
- 認証と認可を分けて考える。
- 依存パッケージを確認する。
- AIの説明をそのまま信じず、人間が確認する。
- 可能ならセキュリティスキャンやレビューを使う。

本プロジェクトへの示唆:

- 初心者向けサイトでも、公開前ページに最低限のセキュリティチェックを置くべき。
- 「人に使わせる前の10項目」として軽量化すると読まれやすい。
- セキュリティを怖がらせるだけでなく、「公開しない練習アプリならここまで」「公開するならここまで」と段階を分けるとよい。

代表ソース:

- CSA: https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide
- Invicti: https://www.invicti.com/blog/web-security/vibe-coding-security-checklist-how-to-secure-ai-generated-apps
- ITPro: https://www.itpro.com/technology/artificial-intelligence/vibe-coding-security-risks-how-to-mitigate
- TechRadar: https://www.techradar.com/pro/ai-written-software-is-booming-can-you-trust-the-vibe

### 12. 費用、クレジット、ツールの使い分け

Business InsiderとZapier Cost記事では、バイブコーディングツールのクレジット消費や費用が扱われている。初心者は、作り直しや曖昧なプロンプトでクレジットを浪費しやすい。

よくある節約策:

- いきなりアプリ生成ツールに頼まず、ChatGPTやClaudeで要件を整理する。
- planモードとbuildモードを使い分ける。
- 1回の依頼で大きく変えすぎない。
- エラー修正で詰まったら、別ツールに状況を要約させる。
- 無料枠でできる範囲を把握する。

本プロジェクトへの示唆:

- 初心者向けに「高いツールへ投げる前の下書き」ページがあると有用。
- 作業フォルダにPRDや画面メモを置くことは、費用節約にもつながると説明できる。

代表ソース:

- Business Insider: https://www.businessinsider.com/beginners-guide-ai-vibe-coding-lovable-base44-claude-2026-6
- Zapier Cost: https://zapier.com/blog/vibe-coding-cost/

### 13. 学習ロードマップと小さな題材

Tom's Guide、AI革命、ObotAI、Microsoftなどは、小さなアプリから始めることを勧めている。題材としては、TODO、タイマー、予算管理、CSVダッシュボード、予約、簡単なフォーム、個人用管理ツールなどが出てくる。

初心者向けに向く題材:

- TODOリスト。
- 習慣記録。
- 家計メモ。
- CSV可視化。
- 簡単な予約フォーム。
- ポートフォリオ。
- 社内メモ検索。

本プロジェクトへの示唆:

- サイト内で「最初の1時間で作る題材」と「次に作る題材」を分けるとよい。
- 題材ごとに、必要なファイル、AIへの初回依頼、確認項目をセットにする。

代表ソース:

- Tom's Guide: https://www.tomsguide.com/ai/how-to-get-started-with-vibe-coding-5-simple-tips-for-beginners
- AI革命: https://ai-revolution.co.jp/media/vibe-coding-guide/
- ObotAI: https://obot-ai.com/column/14407/
- Microsoft Developer: https://developer.microsoft.com/blog/complete-beginners-guide-to-vibe-coding-an-app-in-5-minutes

## 日本語サイトと英語サイトの違い

日本語サイトは、初心者に対して「何から始めるか」「どのAIを使うか」「どういうステップで作るか」を説明する傾向が強い。AI革命やObotAIは、バイブコーディングそのものの説明、ツール選び、段階的な学習、簡単な活用例が中心である。

英語サイトは、入門記事でもPRD、GitHub、テスト、セキュリティ、公開前チェックへ踏み込むものが多い。Zapier、Anything、Aatir、ProductTalkは、初学者でも「壊れる」「戻す」「テストする」「レビューする」を前提にしている。

本プロジェクトでは、日本語初心者向けの読みやすさを保ちながら、英語圏の記事が重視している実務的な検証・履歴・安全性を取り込むと、既存日本語サイトとの差別化になる。

## 本プロジェクトに取り込むべき構成案

既存サイトの調査から、本プロジェクトのガイドは次の構成が合う。

1. バイブコーディングはプロンプト芸ではなく、作業設計である。
2. 最初に作るフォルダ: `idea.md`、`requirements.md`、`screens.md`、`work-log.md`、`checklist.md`。
3. AIに頼む前に書くミニPRD。
4. 初回生成の頼み方。
5. 画面を見て修正を頼む方法。
6. エラーをAIに渡すテンプレート。
7. 変更を小さく分ける方法。
8. 動いた状態を保存する方法。
9. 公開前の動作確認チェック。
10. 公開前のセキュリティチェック。
11. クレジットを無駄にしない進め方。
12. 最初に作る小さなプロジェクト例。

特に差別化できるページ:

- 「AIに読ませるフォルダ構成」
- 「作業ログの残し方」
- 「AIが壊したときに戻る方法」
- 「プロンプトを書く前に置くファイル」
- 「初心者向けの公開前チェックリスト」

## 注意点

- ツール名、料金、無料枠は変化しやすい。本文化する場合は、日付を明記するか、選び方の軸を中心に書く。
- ベンダー記事は自社ツールに寄った説明になりやすい。複数サイトを並べて、共通点だけを抽出するのが安全。
- セキュリティ記事は初心者には重く見えるため、練習用、個人利用、公開用でチェックの重さを分ける必要がある。
- 「初心者でも作れる」というメッセージと「公開するなら責任がある」というメッセージの両立が必要。
