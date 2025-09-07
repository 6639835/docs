# 📥 インストールガイド

このガイドでは、異なるオペレーティングシステム上で Nav-data ナビゲーションデータ変換ツールをインストールおよび設定する方法を詳細に説明します。

## 🔧 システム要件

### 最小構成
- **Python**: 3.8 以降
- **メモリ**: 4GB RAM
- **ストレージ**: 2GB の空き容量
- **ネットワーク**: 安定したインターネット接続（依存関係のダウンロード用）

### 推奨構成
- **Python**: 3.9+ (3.11を推奨)
- **メモリ**: 8GB RAM 以上
- **ストレージ**: 5GB の空き容量
- **プロセッサ**: マルチコアCPU（並列処理用）

### サポートされるオペレーティングシステム
- **Windows**: Windows 10/11 (64ビット)
- **macOS**: macOS 10.15 Catalina 以降
- **Linux**: Ubuntu 18.04+, CentOS 7+, または互換性のある他のディストリビューション

## 📋 準備作業

### 1. Pythonのインストール

#### Windows
1. [Python公式サイト](https://www.python.org/downloads/windows/)にアクセスします
2. 最新の Python 3.11.x バージョンをダウンロードします
3. インストーラーを実行し、「Add Python to PATH」にチェックが入っていることを確認します
4. インストールを検証します：
```cmd
python --version
pip --version
```

#### macOS
Homebrewを使用します（推奨）：
```bash
# Homebrewをインストール（まだインストールしていない場合）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Pythonをインストール
brew install python@3.11

# インストールを検証
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# パッケージマネージャーを更新
sudo apt update

# Pythonとpipをインストール
sudo apt install python3.11 python3.11-pip python3.11-venv

# インストールを検証
python3.11 --version
pip3.11 --version
```

### 2. プロジェクトコードの取得

#### 方法 A: Gitを使用 (推奨)
```bash
# リポジトリをクローン
git clone https://github.com/Nav-data/docs.git

# プロジェクトディレクトリに移動
cd docs
```

#### 方法 B: ZIPファイルをダウンロード
1. GitHubリポジトリページにアクセスします
2. 「Code」 > 「Download ZIP」をクリックします
3. ターゲットディレクトリに解凍します

## 🐍 Python 環境設定

### 1. 仮想環境の作成

#### Windows
```cmd
# プロジェクトディレクトリに移動
cd Nav-data

# 仮想環境を作成
python -m venv nav-data-env

# 仮想環境をアクティベート
nav-data-env\Scripts\activate

# 仮想環境を検証
where python
```

#### macOS/Linux
```bash
# プロジェクトディレクトリに移動
cd Nav-data

# 仮想環境を作成
python3 -m venv nav-data-env

# 仮想環境をアクティベート
source nav-data-env/bin/activate

# 仮想環境を検証
which python
```

### 2. プロジェクトの依存関係をインストール

```bash
# 仮想環境がアクティベートされていることを確認
# pipをアップグレード
pip install --upgrade pip

# プロジェクトの依存関係をインストール
pip install -r requirements.txt
```

### 3. 依存関係のインストールを検証

```python
# Pythonを実行してインポートをテスト
python -c "
import pandas as pd
import sqlite3
import pygeomag
import tqdm
import chardet
print('すべての依存パッケージが正常にインストールされました！')
"
```

## 📁 データソース設定

### 1. データディレクトリ構造の作成

```bash
# データディレクトリを作成
mkdir -p data/input/{naip,xplane,cifp}
mkdir -p data/output
mkdir -p logs
```

ディレクトリ構造は以下のようになります：
```
Nav-data/
├── data/
│   ├── input/
│   │   ├── naip/          # NAIP CSVデータファイル
│   │   ├── xplane/        # X-Plane DATファイル
│   │   └── cifp/          # CIFPプログラムデータファイル
│   └── output/            # 生成されたデータベースファイル
├── logs/                  # ログファイル
└── ...
```

### 2. ファイルパスの設定

設定ファイルをコピーして編集します（オプション）：
```bash
# サンプル設定ファイルをコピー
cp config/paths.example.py config/paths.py

# 設定ファイルを編集
nano config/paths.py  # Linux/macOS
notepad config/paths.py  # Windows
```

## 🛠️ Microsoft Flight Simulatorの設定

### 1. MSFS Communityフォルダーの特定

#### Microsoft Store バージョン
```
C:\Users\[ユーザー名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### Steam バージョン
```
C:\Users\[ユーザー名]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

#### Xbox Game Pass バージョン
```
C:\Users\[ユーザー名]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

### 2. PMDG機のインストール検証

以下のディレクトリが存在することを確認してください：
```
[Communityフォルダー]/
├── pmdg-aircraft-737/     # PMDG 737
├── pmdg-aircraft-738/     # PMDG 737-800
├── pmdg-aircraft-77w/     # PMDG 777-300ER
└── ...
```

### 3. 元のNavdataのバックアップ

```bash
# 各PMDG機について元のデータをバックアップ
# 例：PMDG 737-800
cd "C:\Users\[ユーザー名]\...\Community\pmdg-aircraft-738\Config"
rename Navdata Navdata_backup_original
```

## ✅ インストール検証

### 1. 基本テストの実行

```bash
# 仮想環境をアクティベート
source nav-data-env/bin/activate  # macOS/Linux
# または nav-data-env\Scripts\activate  # Windows

# 基本テストを実行
python -c "
import sys
print(f'Pythonバージョン: {sys.version}')

# 主要な依存関係をテスト
import pandas as pd
print(f'Pandasバージョン: {pd.__version__}')

import sqlite3
print('SQLite3: 利用可能')

import pygeomag
print('PyGeoMag: 利用可能')

print('✅ すべてのコンポーネントが正常にインストールされました！')
"
```

### 2. データベース作成の検証

```bash
# データベース作成機能をテスト
python -c "
import sqlite3
import os

# テストデータベースを作成
test_db = 'data/output/test.s3db'
os.makedirs(os.path.dirname(test_db), exist_ok=True)

conn = sqlite3.connect(test_db)
cursor = conn.cursor()
cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY)')
conn.close()

print('✅ データベース作成機能は正常です')
os.remove(test_db)
"
```

### 3. ファイル権限の確認

#### Windows
以下のディレクトリへの書き込み権限があることを確認してください：
- プロジェクトディレクトリとそのサブディレクトリ
- MSFS Communityフォルダー
- MSFS キャッシュディレクトリ

#### macOS/Linux
```bash
# プロジェクトディレクトリの権限を確認
ls -la Nav-data/

# 権限を変更する必要がある場合
chmod -R 755 Nav-data/
```

## 🔍 トラブルシューティング

### よくある問題とその解決策

#### 1. Python バージョンの非互換性
**問題**: "python: command not found" またはバージョンが古すぎる
**解決策**: 
- Python 3.8+が正しくインストールされていることを確認します
- 一部のシステムでは `python` ではなく `python3` を使用します

#### 2. pip 依存関係のインストール失敗
**問題**: 依存関係のインストール時にコンパイルエラーが発生する
**解決策**:
```bash
# ビルドツールをアップグレード
pip install --upgrade pip setuptools wheel

# 特定のパッケージの問題の場合
pip install --no-cache-dir --force-reinstall [パッケージ名]
```

#### 3. pygeomag インストールに関する問題
**問題**: pygeomag のコンパイルに失敗する
**解決策**:
```bash
# Windows: Microsoft C++ Build Tools をインストールします
# macOS: Xcode Command Line Tools をインストールします
xcode-select --install

# Linux: ビルド依存関係をインストールします
sudo apt install build-essential python3-dev
```

#### 4. 権限の問題
**問題**: MSFS ディレクトリに書き込めない
**解決策**:
- 管理者として実行します (Windows)
- ディレクトリの権限を確認します (macOS/Linux)
- 一時的にウイルス対策ソフトウェアのリアルタイム保護をオフにします

#### 5. メモリ不足
**問題**: 大きなデータファイルを処理する際にメモリ不足が発生する
**解決策**:
- 仮想メモリ/スワップ領域を増やします
- 他のアプリケーションを閉じます
- データファイルをバッチで処理します

### ログファイルの場所

問題が発生した場合は、以下のログを確認してください：
- `logs/PMDG_*.log` - 各モジュールの処理ログ
- `logs/db_validation.log` - データベース検証ログ
- `data/output/missing_airports_data.txt` - 欠落データの記録

## 📞 ヘルプの取得

インストール中に問題が発生した場合は：

1. **エラーメッセージの確認** - ターミナルに出力されたエラーメッセージを注意深く読みます
2. **システム要件の確認** - システムが最小要件を満たしていることを確認します
3. **ドキュメントの参照** - このガイドのトラブルシューティングセクションを参照してください
4. **Issueの提出** - GitHubリポジトリに詳細な問題レポートを提出します

---

**次のステップ**: データソースの設定方法については、[設定手順](configuration.md)を引き続きお読みください。