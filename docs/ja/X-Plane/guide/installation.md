# インストールガイド

本ガイドは、様々なオペレーティングシステム上でNav-dataツールを正しくインストールし、設定するのに役立ちます。

## 📋 システム要件

### 最低システム要件
- **オペレーティングシステム**：Windows 10/11, macOS 10.15+, Ubuntu 18.04+ またはその他の主要なLinuxディストリビューション
- **Python バージョン**：Python 3.6 以降
- **メモリ**：4GB RAM 以上推奨
- **ストレージ容量**：2GB 以上の空きディスク容量
- **ネットワーク**：依存パッケージおよびデータ更新のダウンロード用

### 推奨システム構成
- **Python バージョン**：Python 3.8+
- **メモリ**：8GB RAM 以上
- **ストレージ容量**：10GB+ SSD ストレージ
- **プロセッサ**：マルチコアCPU（大容量ファイルのバッチ処理用）

## 🔧 インストール手順

### 1. Python 環境のインストール

#### Windows システム
1. [Python 公式サイト](https://www.python.org/downloads/) にアクセスして最新バージョンをダウンロードします。
2. インストーラーを実行し、**必ず "Add Python to PATH" にチェックを入れてください**。
3. インストールの確認：
   ```cmd
   python --version
   pip --version
   ```

#### macOS システム
Homebrew を使用（推奨）：
```bash
# Homebrew のインストール（未インストールの場合）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python のインストール
brew install python

# インストールの確認
python3 --version
pip3 --version
```

#### Linux システム（Ubuntu/Debian）
```bash
# パッケージマネージャーの更新
sudo apt update

# Python および pip のインストール
sudo apt install python3 python3-pip python3-venv

# インストールの確認
python3 --version
pip3 --version
```

### 2. プロジェクトソースコードの取得

#### 方法一：Git クローン（推奨）
```bash
# プロジェクトリポジトリのクローン
git clone https://github.com/your-repo/nav-data.git

# プロジェクトディレクトリへ移動
cd nav-data
```

#### 方法二：圧縮ファイルのダウンロード
1. プロジェクトのGitHubページにアクセスします。
2. "Code" → "Download ZIP" をクリックします。
3. ターゲットディレクトリに解凍します。

### 3. 仮想環境の作成（推奨）

依存関係の競合を避けるため、独立したPython仮想環境を作成します。

```bash
# 仮想環境の作成
python -m venv nav-data-env

# 仮想環境のアクティベート
# Windows:
nav-data-env\Scripts\activate

# macOS/Linux:
source nav-data-env/bin/activate

# 仮想環境の確認
which python  # 仮想環境のパスが表示されるはずです
```

### 4. 依存パッケージのインストール

#### コア依存パッケージ
```bash
# 基本依存パッケージのインストール
pip install -r requirements.txt
```

#### 手動での依存パッケージインストール（requirements.txt がない場合）
```bash
# データ処理関連
pip install pandas numpy

# PDF 処理
pip install pdfplumber

# プログレスバーとユーザーインターフェース
pip install tqdm colorama

# 地理計算
pip install geopy

# 中国語処理（必要な場合）
pip install pypinyin

# その他のツールパッケージ
pip install typing-extensions dataclasses
```

#### オプションの依存パッケージ
```bash
# Jupyter Notebook サポート（データ分析用）
pip install jupyter

# テストフレームワーク
pip install pytest pytest-cov

# コードフォーマッター
pip install black flake8
```

## 🗂️ ディレクトリ構造の設定

### 標準ディレクトリレイアウト
```
nav-data/
├── Airway/                 # 航空路データ処理モジュール
│   ├── airway.py          # 主要な変換スクリプト
│   └── README.md          # モジュール説明
├── PDF extract/           # PDF データ抽出モジュール
│   ├── 1_terminal_pdf.py  # PDF 原文抽出
│   ├── 2_terminal_encode.py # データエンコード
│   ├── 3_terminal_db.py   # データベース生成
│   ├── waypoint_1_pdf.py  # ウェイポイント抽出
│   └── utils.py           # ユーティリティ関数
├── Terminal Patch/        # データ修復モジュール
│   ├── terminal_encoder.py # プログラムエンコーダ
│   └── terminal_reencode.py # フォーマット修復
├── X-Plane CIFP/         # X-Plane CIFP 処理
│   ├── 1_navaid.py       # 航法援助施設処理
│   ├── 2_waypoint.py     # ウェイポイント処理
│   ├── 3_terminal.py     # ターミナル手順処理
│   └── utils.py          # ユーティリティ関数
├── docs/                  # プロジェクトドキュメント
├── requirements.txt       # 依存リスト
└── README.md             # プロジェクト説明
```

### 作業ディレクトリの作成
```bash
# データ入力ディレクトリの作成
mkdir -p data/input/{csv,pdf,raw}

# データ出力ディレクトリの作成
mkdir -p data/output/{dat,txt,processed}

# ログディレクトリの作成
mkdir -p logs

# 設定ディレクトリの作成
mkdir -p config
```

## ⚙️ 環境変数の設定

### 環境設定ファイルの作成
`.env` ファイルを作成します（Windowsユーザーは `.env.txt` を作成し、その後名前を変更してください）。

```bash
# X-Plane インストールパス
XPLANE_PATH=/path/to/X-Plane

# データファイルパス
DATA_INPUT_PATH=./data/input
DATA_OUTPUT_PATH=./data/output

# ログ設定
LOG_LEVEL=INFO
LOG_FILE=./logs/nav-data.log

# 処理設定
BATCH_SIZE=1000
ENABLE_PROGRESS_BAR=true

# 中国空域コード（カスタマイズ可能）
CHINA_AREAS=ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU
```

### Windows システム環境変数設定
1. "PC" を右クリック → "プロパティ" → "システムの詳細設定"
2. "環境変数" をクリックします。
3. "ユーザー環境変数" に以下を追加します。
   - 変数名：`NAV_DATA_HOME`
   - 変数値：プロジェクトのインストールパス

### macOS/Linux 環境変数設定
`~/.bashrc` または `~/.zshrc` に以下を追加します。
```bash
export NAV_DATA_HOME="/path/to/nav-data"
export PATH="$NAV_DATA_HOME:$PATH"
```

## 🧪 インストール検証

### 1. 基本機能テスト
```bash
# プロジェクトディレクトリへ移動
cd nav-data

# 航空路モジュールのテスト
python -c "import Airway.airway; print('Airway module loaded successfully')"

# PDF 処理モジュールのテスト
python -c "import sys; sys.path.append('PDF extract'); import utils; print('PDF module loaded successfully')"

# ターミナルパッチモジュールのテスト
python -c "import sys; sys.path.append('Terminal Patch'); print('Terminal Patch module available')"
```

### 2. 依存関係チェックスクリプト
`check_installation.py` を作成します。
```python
#!/usr/bin/env python3
"""
Nav-data インストールチェックスクリプト
"""
import sys
import importlib
import os

def check_python_version():
    """Python バージョンのチェック"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 6):
        print("❌ Python バージョンが古すぎます。3.6+ が必要です。")
        return False
    print(f"✅ Python バージョン: {version.major}.{version.minor}.{version.micro}")
    return True

def check_dependencies():
    """依存パッケージのチェック"""
    required_packages = [
        'pandas', 'numpy', 'pdfplumber', 'tqdm', 
        'colorama', 'geopy', 'typing_extensions'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - 未インストール")
            missing_packages.append(package)
    
    return len(missing_packages) == 0, missing_packages

def check_directories():
    """ディレクトリ構造のチェック"""
    required_dirs = [
        'Airway', 'PDF extract', 'Terminal Patch', 'X-Plane CIFP'
    ]
    
    missing_dirs = []
    for dirname in required_dirs:
        if os.path.exists(dirname):
            print(f"✅ {dirname}/")
        else:
            print(f"❌ {dirname}/ - ディレクトリが見つかりません")
            missing_dirs.append(dirname)
    
    return len(missing_dirs) == 0, missing_dirs

def main():
    print("🔍 Nav-data インストールチェック")
    print("=" * 40)
    
    # Python バージョンのチェック
    print("\n📍 Python バージョンチェック:")
    python_ok = check_python_version()
    
    # 依存パッケージのチェック
    print("\n📍 依存パッケージチェック:")
    deps_ok, missing_deps = check_dependencies()
    
    # ディレクトリのチェック
    print("\n📍 ディレクトリ構造チェック:")
    dirs_ok, missing_dirs = check_directories()
    
    # まとめ
    print("\n" + "=" * 40)
    if python_ok and deps_ok and dirs_ok:
        print("🎉 インストールチェックに合格しました！Nav-data は準備完了です。")
        return 0
    else:
        print("⚠️  インストールチェックで問題が見つかりました：")
        if missing_deps:
            print(f"   不足している依存パッケージ: {', '.join(missing_deps)}")
            print(f"   インストールコマンド: pip install {' '.join(missing_deps)}")
        if missing_dirs:
            print(f"   不足しているディレクトリ: {', '.join(missing_dirs)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

チェックを実行：
```bash
python check_installation.py
```

## 🔥 よくあるインストール問題

### 問題 1：Python バージョンの互換性
**症状**：実行時に構文エラーやモジュールインポートエラーが発生する
**解決策**：
```bash
# Python バージョンの確認
python --version

# バージョンが古い場合は Python をアップグレードする
# Windows: 新しいバージョンを再ダウンロードしてインストールする
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### 問題 2：依存パッケージのインストール失敗
**症状**：`pip install` コマンドが失敗する
**解決策**：
```bash
# pip のアップグレード
python -m pip install --upgrade pip

# 国内ミラーサイトの使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# キャッシュをクリアして再試行
pip cache purge
pip install package_name
```

### 問題 3：仮想環境の問題
**症状**：仮想環境がアクティベートできない、またはパッケージが見つからない
**解決策**：
```bash
# 古い仮想環境の削除
rm -rf nav-data-env

# 再作成
python -m venv nav-data-env

# アクティベートして依存パッケージをインストール
source nav-data-env/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

### 問題 4：ファイル権限の問題（Linux/macOS）
**症状**：ファイルやディレクトリを作成できない
**解決策**：
```bash
# ディレクトリの権限を変更する
chmod -R 755 nav-data/

# または sudo を使用（非推奨）
sudo python script.py
```

### 問題 5：PDF 処理モジュールの問題
**症状**：pdfplumber のインストールまたは使用が失敗する
**解決策**：
```bash
# システム依存パッケージのインストール（Ubuntu/Debian）
sudo apt-get install python3-dev libpoppler-cpp-dev

# pdfplumber の再インストール
pip uninstall pdfplumber
pip install pdfplumber
```

## 🚀 インストールの完了

インストール完了後、以下を実行できます。

1.  **クイックテストの実行**：
    ```bash
    python check_installation.py
    ```

2.  **ヘルプ情報の表示**：
    ```bash
    python Airway/airway.py --help
    ```

3.  **データ変換の開始**：
    最初のデータ変換については、[使用説明](./usage.md) を参照してください。

## 🔄 更新とアップグレード

### プロジェクトコードの更新
```bash
# Git を使用している場合
git pull origin main

# または最新バージョンを再ダウンロードする
```

### 依存パッケージの更新
```bash
# 仮想環境のアクティベート
source nav-data-env/bin/activate

# すべてのパッケージを更新
pip install --upgrade -r requirements.txt

# または特定のパッケージを手動で更新
pip install --upgrade package_name
```

### データファイルの更新
NAIPデータソースを定期的に確認し、更新して航法データの適時性を確保してください。

---

**インストール完了！** 🎉 これでNav-dataを使用して航法データ変換を開始できます。問題が発生した場合は、[トラブルシューティング](#よくあるインストール問題) を参照するか、GitHub Issue を提出してください。