# 📥 インストールガイド

<div class="installation-header">
  <div class="header-content">
    <h2>Nav-data iniBuilds A350 インストールウィザード</h2>
    <p>このガイドでは、Nav-data航空航法データ変換ツールの完全なインストールプロセスを案内し、システム環境が正しく構成されていることを確認します。</p>
  </div>
  <div class="progress-indicator">
    <div class="step active" data-step="1">
      <div class="step-number">1</div>
      <div class="step-label">システムチェック</div>
    </div>
    <div class="step" data-step="2">
      <div class="step-number">2</div>
      <div class="step-label">Python環境</div>
    </div>
    <div class="step" data-step="3">
      <div class="step-number">3</div>
      <div class="step-label">MSFS設定</div>
    </div>
    <div class="step" data-step="4">
      <div class="step-number">4</div>
      <div class="step-label">検証完了</div>
    </div>
  </div>
</div>

## 🖥️ システム要件

### 📋 構成要件の比較

<div class="requirements-comparison">
  <div class="req-column">
    <h4>🟡 最小要件</h4>
    <div class="req-card minimal">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>OS (オペレーティングシステム)</strong>
          <span>Windows 10 1903+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Pythonバージョン</strong>
          <span>Python 3.8+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>メモリ</strong>
          <span>8GB RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>ストレージ</strong>
          <span>2GB 空き容量</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>ネットワーク</strong>
          <span>ブロードバンドインターネット接続</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="req-column">
    <h4>🟢 推奨要件</h4>
    <div class="req-card recommended">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>OS (オペレーティングシステム)</strong>
          <span>Windows 11 22H2+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Pythonバージョン</strong>
          <span>Python 3.11+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>メモリ</strong>
          <span>16GB+ RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>ストレージ</strong>
          <span>5GB+ 空き容量</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>ネットワーク</strong>
          <span>安定した高速接続</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.installation-header {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.05));
  border: 1px solid rgba(30, 64, 175, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.header-content h2 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
}

.header-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1.6;
}

.progress-indicator {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;
}

.progress-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.requirements-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.req-column h4 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.req-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.req-card.minimal {
  border-color: rgba(245, 158, 11, 0.3);
}

.req-card.recommended {
  border-color: rgba(34, 197, 94, 0.3);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
}

.req-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.req-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.req-item:last-child {
  border-bottom: none;
}

.req-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.req-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.req-details strong {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.req-details span {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .progress-indicator {
    flex-direction: column;
    gap: 1rem;
  }
  
  .progress-indicator::before {
    display: none;
  }
  
  .step {
    flex-direction: row;
    justify-content: flex-start;
  }
  
  .requirements-comparison {
    grid-template-columns: 1fr;
  }
}
</style>

### ✈️ 必須ソフトウェア

- [**Microsoft Flight Simulator**](https://www.flightsimulator.com/) (2020または2024バージョン)
- [**Python 3.8+**](https://www.python.org/downloads/) 開発環境
- 対象航空機アドオン：[**iniBuilds A350**](https://www.inibuilds.com/) または [**PMDG 737/777**](https://pmdg.com/)

### 📊 データソースサブスクリプション（いずれかを選択）

- [**Navigraph**](https://navigraph.com/) - 推奨、データはタイムリーに更新されます
- [**Aerosoft NavDataPro**](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) - 手頃な価格の代替案

## 🐍 Python環境のインストール

### ステップ1：Pythonをダウンロードしてインストール

1.  [Python公式サイト](https://www.python.org/downloads/)にアクセス
2.  最新のPython 3.11バージョンをダウンロード（推奨）
3.  **重要**：インストール時に「Add Python to PATH」オプションをチェックしてください

```powershell
# Pythonのインストールを検証
python --version
# 表示されるべき：Python 3.11.x

# pipのインストールを検証
pip --version
# pipバージョン情報が表示されるべき
```

### ステップ2：プロジェクトの依存関係をインストール

```bash
# プロジェクトをローカルにクローンまたはダウンロード
cd /path/to/nav-data

# 必要な依存パッケージをインストール
pip install -r requirements.txt
```

#### 依存パッケージの説明

| パッケージ名 | バージョン | 用途 |
|------|------|------|
| `pandas` | ≥1.3.0 | データ処理と分析 |
| `requests` | ≥2.26.0 | HTTPリクエスト処理 |
| `tqdm` | ≥4.62.0 | プログレスバー表示 |
| `chardet` | ≥4.0.0 | 文字エンコーディング検出 |
| `ratelimit` | ≥2.2.1 | APIリクエスト制限 |
| `pygeomag` | ≥0.9.0 | 地磁気偏角計算 |

### ステップ3：インストールを検証

```python
# 主要な依存関係をテスト
python -c "import pandas, sqlite3, pygeomag; print('すべての依存関係が正常にインストールされました！')"
```

## 🎮 Microsoft Flight Simulator設定

### 🔍 MSFSインストール場所の確認

MSFSのバージョンと購入チャネルに応じて、Communityフォルダーの場所は以下の通りです。

#### MSFS 2020

**Microsoft Store版**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam版**
```
%APPDATA%\Microsoft Flight Simulator\Packages\Community
```

#### MSFS 2024

**Microsoft Store版**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam版**
```
%APPDATA%\Microsoft Flight Simulator 2024\Packages\Community
```

### 🛠️ クイックパス検出スクリプト

MSFSのインストールを自動的に検出するために、以下のPowerShellスクリプトを作成してください：

```powershell
# detect_msfs.ps1 として保存
$paths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator\Packages\Community",
    "$env:LOCALAPPDATA\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator 2024\Packages\Community"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "MSFS Communityフォルダーが見つかりました: $path" -ForegroundColor Green
    }
}
```

## ✈️ 航空機アドオンの検証

### iniBuilds A350の検証

以下のディレクトリが存在するか確認してください：

```
[Communityフォルダー]\inibuilds-aircraft-a350\Config\NavigationData\
```

### PMDGアドオンの検証

以下のディレクトリが存在するか確認してください（PMDG航空機モデルに応じて）：

```
[Communityフォルダー]\pmdg-aircraft-737\Config\Navdata\
[Communityフォルダー]\pmdg-aircraft-738\Config\Navdata\
[Communityフォルダー]\pmdg-aircraft-77w\Config\Navdata\
[Communityフォルダー]\pmdg-aircraft-77f\Config\Navdata\
```

## 📁 プロジェクトディレクトリ構造

インストールが完了すると、プロジェクトディレクトリは以下のようになります：

```
nav-data/
├── XP2INI_NDB_Converter.py    # メイン変換プログラム
├── requirements.txt           # Python依存関係リスト
├── README.md                 # プロジェクト説明
├── LICENSE                   # ライセンスファイル
│
├── データ処理モジュール/
│   ├── airports.py           # 空港データ処理
│   ├── runways.py           # 滑走路データ処理
│   ├── vhfs.py              # VHF航法施設処理
│   ├── ndbs.py              # NDB航法施設処理
│   ├── enroute_waypoints.py # 航空路ウェイポイント処理
│   ├── terminal_waypoints.py# ターミナルウェイポイント処理
│   ├── sids.py              # SID手順処理
│   ├── stars.py             # STAR手順処理
│   ├── iaps.py              # アプローチ手順処理
│   ├── airways.py           # 航空路処理
│   └── gs.py                # グライドスロープ処理
│
└── docs/                    # ドキュメントディレクトリ
    ├── guide/               # 使用ガイド
    └── ...                  # その他のドキュメント
```

## 🔧 環境変数設定（オプション）

より便利にご利用いただくために、以下の環境変数を設定できます：

```powershell
# MSFS Communityパスを設定
setx MSFS_COMMUNITY_PATH "C:\Users\[ユーザー名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community"

# Nav-data作業ディレクトリを設定
setx NAVDATA_WORKSPACE "C:\path\to\nav-data"
```

## ✅ インストール検証チェックリスト

インストール完了後、以下の項目を確認してください：

- [ ] Python 3.8+が正しくインストールされ、PATHに追加されていること
- [ ] すべての依存パッケージが正常にインストールされていること
- [ ] MSFS Communityフォルダーが特定されていること
- [ ] 対象航空機アドオンがインストールされ、検証されていること
- [ ] プロジェクトファイルがローカルディレクトリにダウンロードされていること
- [ ] 十分なディスク容量（少なくとも2GB）があること

## 🚨 一般的なインストール問題

### Python関連の問題

**問題**：`'python' は内部コマンドまたは外部コマンドとして認識されていません`
```bash
# 解決策：Pythonを再インストールし、「Add to PATH」をチェックしていることを確認してください
# またはPythonをシステムPATHに手動で追加してください
```

**問題**：`ModuleNotFoundError: No module named 'xxx'`
```bash
# 解決策：依存関係を再インストールしてください
pip install --upgrade -r requirements.txt
```

### 権限の問題

**問題**：MSFSフォルダーにアクセスできません
```powershell
# 解決策：PowerShell/コマンドプロンプトを管理者として実行してください
# 右クリック → 「管理者として実行」
```

### パスの問題

**問題**：航空機アドオンディレクトリが見つかりません
```bash
# 解決策：
# 1. 航空機アドオンが正しくインストールされていることを確認してください
# 2. 必要なディレクトリを作成するために、MSFSで航空機を一度起動してください
# 3. アドオンが正しいCommunityフォルダーにあることを確認してください
```

## 🔄 更新手順

Nav-dataを最新バージョンに更新するには：

```bash
# 最新のコードをプル
git pull origin main

# 依存パッケージを更新
pip install --upgrade -r requirements.txt
```

---

インストールが完了しました！次に、[**設定手順**](./configuration.md)でデータソースとAIRACサイクルを設定してください。