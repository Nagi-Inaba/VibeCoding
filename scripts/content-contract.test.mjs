import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('404 uses a conflict-free custom route and stays base-aware', () => {
  const config = read('astro.config.mjs');
  const source = read('src/pages/404.astro');
  const legacyContentRoute = new URL('../src/content/docs/404.mdx', import.meta.url);

  assert.equal(fs.existsSync(legacyContentRoute), false);
  assert.match(config, /disable404Route:\s*true/);
  assert.match(source, /StarlightPage/);
  assert.match(source, /LinkButton/);
  assert.match(source, /import\.meta\.env\.BASE_URL/);
  assert.doesNotMatch(source, /draft:\s*true|href=["'{`]\/start\/|href=["'{`]\/$/m);
});

test('practice completes a real mobile HTML verification cycle', () => {
  const source = read('src/content/docs/practice.mdx');
  assert.doesNotMatch(source, /outputs\/reading-note\.md|スマホ表示の確認\s*\n- /);
  for (const phrase of ['outputs/reading-note.html', '375×844', '横スクロール', 'ブラウザで実際に']) {
    assert.match(source, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('publish checklist records deployment evidence and official recovery guidance', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const heading = '### 例: GitHub Pagesの場合';
  const exampleStart = publish.indexOf(heading);
  assert.ok(exampleStart >= 0, 'GitHub Pages evidence must be inside a named example');
  const afterHeading = exampleStart + heading.length;
  const nextPeerOffset = publish.slice(afterHeading).search(/^#{1,3}\s/m);
  const exampleEnd = nextPeerOffset >= 0 ? afterHeading + nextPeerOffset : publish.length;
  const example = publish.slice(exampleStart, exampleEnd);

  assert.match(example, /GitHub Pagesは一般公開方法の一例/);
  assert.match(example, /GitHub Pagesを選んだ場合/);
  assert.doesNotMatch(example, /このガイドサイトで使っている/);
  for (const subsection of [
    '#### 初回だけ: 公開元を設定する',
    '#### 毎回: 8ステップで公開を確認する',
    '#### 問題が出たら公開を止める',
  ]) {
    assert.match(example, new RegExp(subsection));
  }
  for (const phrase of ['commit SHA', 'build', 'deploy', 'run URL', '公開URL', 'Unpublish']) {
    assert.match(example, new RegExp(phrase));
  }
  assert.match(example, /docs\.github\.com\/en\/pages\/getting-started-with-github-pages\/configuring-a-publishing-source/);
  assert.match(example, /docs\.github\.com\/en\/actions\/monitoring-and-troubleshooting-workflows\/monitoring-workflows\/viewing-workflow-run-history/);
  assert.match(example, /docs\.github\.com\/en\/pages\/getting-started-with-github-pages\/unpublishing-a-github-pages-site/);
});

test('sharing guidance is audience-based and keeps publication as a conditional path', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');

  assert.match(publish, /^title:\s*人に使ってもらう前に$/m);
  assert.match(publish, /自分だけで使うものに、公開操作や公開URLの確認は不要/);

  for (const phrase of [
    '練習', '自分だけで使う', '他の人に使ってもらう', '一般公開',
    'ウェブサイト', 'ウェブツール', 'スキル', 'エージェント',
    '秘密情報と設定', '必要な権限', '入力と実行範囲', '戻し方と停止方法',
    '一般公開する場合',
  ]) {
    assert.match(publish, new RegExp(phrase));
  }

  for (const phrase of ['練習', '自分だけで使う', '他の人に使ってもらう', '一般公開する']) {
    assert.match(checklist, new RegExp(phrase));
  }

  assert.doesNotMatch(checklist, /<h3>公開前<\/h3>/);
  assert.match(checklist, /<h3>人に使ってもらう前<\/h3>/);
  assert.match(checklist, /<h3>一般公開する場合<\/h3>/);
  assert.doesNotMatch(checklist, /<h3>GitHub Pagesでウェブサイトを一般公開する場合<\/h3>/);
});

test('sharing levels distinguish one-off practice, continued self-use, and specific people', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');
  const labels = [
    '練習（継続利用しない）',
    '自分だけで使う（継続利用する）',
    '他の人に使ってもらう（特定の人）',
    '一般公開する',
  ];

  for (const source of [publish, checklist]) {
    for (const label of labels) assert.match(source, new RegExp(label));
  }

  assert.match(checklist, /練習なのか、自分だけで継続して使うのか、特定の人に使ってもらうのか、一般公開するのかで見る量を変えます。/);
  assert.match(publish, /ここからは、特定の人への共有と一般公開に共通する確認です。/);
});

test('sharing outcomes avoid safety guarantees', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');
  const combined = `${publish}\n${checklist}`;

  assert.match(publish, /^description: 自分用、限定共有、一般公開で確認量を分け、他の人へ渡す前に必要な確認を選べるようにする。$/m);
  assert.match(combined, /あとで再開できる状態にする。/);
  assert.match(combined, /相手が使い方と、問題が起きたときに止める方法を確認できる状態にする。/);
  assert.doesNotMatch(combined, /安全に渡せる|安全に止められる/);
});

test('common checks cover websites, skills, and agents', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');

  for (const phrase of [
    '実際の表示・操作・実行結果',
    '使い始める場所が分かり、画面または実行結果を確認できるか',
    'リンク、ボタン、コマンドなど主要な操作を試せるか',
    '画面がある場合は、スマホ幅で文字や表がはみ出していないか',
  ]) {
    assert.match(publish, new RegExp(phrase));
  }

  assert.match(checklist, /実際の画面または実行結果を確認し、意図しないページ、ファイル、外部操作がないか確認している。/);
});

test('GitHub Pages guidance is generic and defers current steps to official documentation', () => {
  const publish = read('src/content/docs/publish-check.mdx');

  assert.match(publish, /Astroなどビルドが必要なサイトでは、GitHub Pagesの公開元に GitHub Actions を使えます。最新の設定方法はGitHub公式ドキュメントで確認します。/);
  assert.match(publish, /公開ワークフローで、ビルドを行うjobと公開反映を行うjobを特定する。/);
  assert.match(publish, /job名はworkflowごとに異なり、`build` と `deploy` は例/);
  assert.match(publish, /対象runでビルドを行うjob（例: `build`）/);
  assert.match(publish, /同じ対象runで公開反映を行うjob（例: `deploy`）/);
  assert.match(publish, /https:\/\/docs\.github\.com\/en\/actions\/reference\/workflows-and-actions\/workflow-syntax#jobsjob_id/);
  assert.match(publish, /そのサイトで定めたQAコマンドを実行し、結果を記録する。コマンドは `package\.json` や `README` で確認する。失敗したら公開へ進まない。/);
  assert.doesNotMatch(publish, /このサイトはビルド|main へのpush|npm run qa|正本に/);
});

test('general publication is platform neutral and precedes the GitHub Pages example', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const generalStart = publish.indexOf('## 一般公開する場合');
  const exampleStart = publish.indexOf('### 例: GitHub Pagesの場合');

  assert.ok(generalStart >= 0, 'platform-neutral general-public section is required');
  assert.ok(exampleStart > generalStart, 'GitHub Pages must follow the general-public section as an example');

  const generic = publish.slice(generalStart, exampleStart);
  for (const phrase of [
    '公開先または配布先',
    '公開対象を特定する情報',
    '該当するもの',
    'その成果物で定めたテスト、QA（品質確認）、build（公開用ファイルの生成）、検証',
    '公開後のURL、インストール方法、配布物のうち、該当するもの',
    '公開停止、配布停止、無効化、前版への復帰',
    'Vercel',
    'GitHub Pagesに限りません',
    '別のホスティングサービス',
    '配布先・配布方法',
  ]) {
    assert.match(generic, new RegExp(phrase));
  }
  assert.doesNotMatch(generic, /Actionsのrun|run URL|\bdeploy\b|Unpublish/);
  assert.doesNotMatch(publish, /このガイドサイトで使っている/);
});

test('general-public checklist is platform neutral', () => {
  const checklist = read('src/content/docs/checklists.mdx');
  const heading = '<h3>一般公開する場合</h3>';
  const cardStart = checklist.indexOf(heading);

  assert.ok(cardStart >= 0, 'platform-neutral general-public checklist card is required');
  assert.doesNotMatch(checklist, /<h3>GitHub Pagesでウェブサイトを一般公開する場合<\/h3>/);

  const cardEnd = checklist.indexOf('</div>', cardStart);
  const card = checklist.slice(cardStart, cardEnd);
  for (const phrase of [
    '公開先または配布先と、アクセスできる人',
    '公開対象を特定する情報のうち',
    '該当するもの',
    'その成果物で定めたテスト、QA（品質確認）、build（公開用ファイルの生成）、検証',
    '公開後のURL、インストール方法、配布物のうち、該当するもの',
    '公開停止、配布停止、無効化、前版への復帰',
  ]) {
    assert.match(card, new RegExp(phrase));
  }
  assert.doesNotMatch(card, /Actionsの対象run|run URL|deploy/);
  assert.match(checklist, /一般公開する場合は、公開先または配布先 → 公開対象を特定する情報 → その成果物で定めたQA（品質確認） → 公開後の実利用 → 停止・撤回方法の順に確認結果をつなげます。/);
});

test('generic sharing checks and the practice page use artifact-neutral wording', () => {
  const checklist = read('src/content/docs/checklists.mdx');
  const practice = read('src/content/docs/practice.mdx');

  assert.match(checklist, /ウェブサイトや資料なら、リンク、事実、引用元、表現、権利、スマホ表示を確認したか/);
  for (const phrase of [
    '- 作ったもの: ウェブサイト / ウェブツール / スキル / エージェント',
    '- 利用範囲: 特定の人 / 一般公開',
    '秘密情報、権限、入力、保存、外部操作、エラー、ログ、停止方法を確認してください。',
  ]) {
    assert.match(checklist, new RegExp(phrase));
  }
  assert.match(practice, /「スマホでも読めそう」という予想ではなく、375×844で横スクロールがないことを実際に確認します。/);
});

test('all public-summary surfaces are platform neutral', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');
  const summary = '公開先・配布先、公開対象を特定する情報、その成果物で定めたQA（品質確認）、権利、停止・撤回';

  for (const source of [publish, checklist]) {
    assert.match(source, new RegExp(summary));
    assert.doesNotMatch(source, /公開URL、公開停止/);
  }
  assert.match(publish, /権利とアクセシビリティを、作ったものと想定する利用者に応じて確認したか/);
  assert.match(publish, /一般公開する場合だけ、公開先・配布先、公開する版、停止・撤回方法を確認したか/);
});

test('both AI prompts branch checks by artifact and scope rights correctly', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');

  for (const source of [publish, checklist]) {
    for (const phrase of [
      'ウェブサイト: リンク、スマホ表示、画面表示',
      'ウェブツール: 画面、入力、権限、データ',
      'スキル: 読み書きするファイル、実行コマンド',
      'エージェント: 自動実行、外部操作、停止条件',
      '権利とアクセシビリティを、作ったものと想定する利用者に応じて確認',
      '一般公開する場合だけ、公開先・配布先、公開する版、停止・撤回方法',
    ]) {
      assert.match(source, new RegExp(phrase));
    }
    assert.doesNotMatch(source, /一般公開する場合だけ、[^\n]*(?:権利|アクセシビリティ)/);
  }
});

test('beginner-facing technical terms are explained at first use', () => {
  const publish = read('src/content/docs/publish-check.mdx');
  const checklist = read('src/content/docs/checklists.mdx');

  for (const source of [publish, checklist]) {
    assert.equal(source.indexOf('QA'), source.indexOf('QA（品質確認）'));
    assert.equal(source.indexOf('build'), source.indexOf('build（公開用ファイルの生成）'));
    assert.equal(source.indexOf('commit'), source.indexOf('commit（変更を記録した番号）'));
    assert.equal(source.indexOf('release'), source.indexOf('release（公開・配布する版）'));
    assert.match(source, /公開対象を特定する情報のうち、[^\n]*該当するもの/);
  }
  assert.equal(publish.indexOf('version'), publish.indexOf('version（配布版）'));
  assert.equal(publish.indexOf('deployment'), publish.indexOf('deployment（公開反映）'));
});

test('common content checks cover optional media, packaged files, and generated behavior', () => {
  const publish = read('src/content/docs/publish-check.mdx');

  assert.match(publish, /画像、名前、会社名がある場合は、他の人に渡してよいものだけになっているか/);
  assert.match(publish, /元資料、下書き、開発用ファイルが成果物や配布物へ意図せず入っていないか/);
  assert.match(publish, /AIが作った文章、設定、処理内容を確認したか/);
});

test('design and plan keep host choice neutral and GitHub evidence inside the example', () => {
  const design = read('docs/superpowers/specs/2026-07-10-audience-based-sharing-checks-design.md');
  const plan = read('docs/superpowers/plans/2026-07-10-audience-based-sharing-checks.md');

  for (const source of [design, plan]) {
    assert.match(source, /Vercel/);
    assert.match(source, /GitHub Pagesに限(?:りません|らない)/);
    assert.match(source, /GitHub Pagesを選んだ場合/);
    assert.match(source, /GitHub Actionsのrun、run URL、deploy job、UnpublishはGitHub Pages例にだけ置く/);
    assert.match(source, /buildと公開URLは、該当する成果物や公開方法の場合だけ/);
    assert.match(source, /4成果物それぞれに合う確認項目/);
    assert.match(source, /権利とアクセシビリティは、成果物と想定する利用者に応じて確認/);
    assert.match(source, /公開後のURL、インストール方法、配布物のうち、該当するもの/);
    assert.match(source, /job名はworkflowごとに異なる/);
    assert.match(source, /https:\/\/docs\.github\.com\/en\/actions\/reference\/workflows-and-actions\/workflow-syntax#jobsjob_id/);
    assert.match(source, /ステップ3、6、7では、`build`、`deploy` という固定名ではなく、ビルド役と公開反映役のjob/);
    assert.match(source, /#### 初回だけ: 公開元を設定する/);
    assert.match(source, /#### 毎回: 8ステップで公開を確認する/);
    assert.match(source, /#### 問題が出たら公開を止める/);
    assert.doesNotMatch(source, /このガイドサイトで使っている|安全に渡せる|安全に止められる/);
    assert.doesNotMatch(source, /^### (?:初回だけ: 公開元を設定する|毎回: 8ステップで公開を確認する|問題が出たら公開を止める)$/m);
  }
});

test('practice and related pages use reader-oriented completion terms', () => {
  const practice = read('src/content/docs/practice.mdx');
  const workLog = read('src/content/docs/work-log.mdx');
  const introduction = read('src/content/docs/what-is-vibe-coding.mdx');

  for (const phrase of [
    '次の4項目をすべて実際に確認できたら、この練習は完了です。',
    'スマホ確認が未実施または「要確認」の場合は、確認を続けます。',
    '## 8. 確認結果を作業記録に残す',
    '「完了」ではなく「要確認」と記録します。',
  ]) {
    assert.match(practice, new RegExp(phrase));
  }

  assert.match(workLog, /利用範囲に応じて確認すること:/);
  assert.match(introduction, /他の人に渡したり、使ってもらったりしてよいかの最終判断/);
});
