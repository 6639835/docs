# 🔧 iFly 航法データ変換器 インストールガイド

本ガイドでは、iFly 航法データ変換器の完全なインストールプロセスをご案内します。これにより、システム環境が正しく構成され、すべての依存関係がインストールされていることを確認できます。

## 📋 システム要件

### 💻 ハードウェア要件
| コンポーネント | 最小要件 | 推奨構成 |
|------|----------|----------|
| **プロセッサ** | デュアルコア 2.0GHz | クアッドコア 3.0GHz+ |
| **メモリ** | 4GB RAM | 8GB+ RAM |
| **ストレージ** | 500MB 空き容量 | 2GB+ 空き容量 |
| **ネットワーク** | ネットワーク接続不要 | 依存関係のダウンロード時に必要 |

### 🖥️ オペレーティングシステム対応
- **Windows**: Windows 10 (1909+) / Windows 11
- **macOS**: macOS 10.15 Catalina またはそれ以降のバージョン
- **Linux**: Ubuntu 18.04+、CentOS 7+、またはその他の主要なディストリビューション

### 🐍 Python 環境要件
- **Python バージョン**: 3.8.0 またはそれ以降のバージョン
- **推奨バージョン**: Python 3.9.x または 3.10.x
- **パッケージマネージャー**: pip 21.0+ (通常、Python とともにインストールされます)

## 🚀 クイックインストール

### Windows ユーザー

#### 1️⃣ Python のインストール

**方法1：公式サイトからダウンロード (推奨)**
```bash
# 1. https://www.python.org/downloads/ にアクセス
# 2. 最新の Python 3.9+ バージョンをダウンロード
# 3. インストーラーを実行し、「Add Python to PATH」がチェックされていることを確認
# 4. インストールを検証
python --version
pip --version
```

**方法2：Microsoft Store を使用**
```bash
# 1. Microsoft Store を開く
# 2. 「Python 3.9」または「Python 3.10」を検索
# 3. インストールをクリック
# 4. インストールを検証
python --version
```

#### 2️⃣ 変換器の依存関係のインストール

```bash
# コマンドプロンプトまたは PowerShell を開く
# すべての必須依存関係をインストール
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# インストールを検証
python -c "import rich, pandas, pygeomag; print('依存関係のインストールに成功しました！')"
```

### macOS ユーザー

#### 1️⃣ Python のインストール

**方法1：Homebrew を使用 (推奨)**
```bash
# Homebrew をインストール (まだインストールされていない場合)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python をインストール
brew install python@3.9

# インストールを検証
python3 --version
pip3 --version
```

**方法2：公式サイトからダウンロード**
```bash
# 1. https://www.python.org/downloads/macos/ にアクセス
# 2. macOS 用の Python インストールパッケージをダウンロード
# 3. .pkg ファイルを実行してインストール
# 4. インストールを検証
python3 --version
```

#### 2️⃣ 変換器の依存関係のインストール

```bash
# pip3 を使用して依存関係をインストール
pip3 install rich pathlib typing pygeomag pandas tqdm geographiclib

# インストールを検証
python3 -c "import rich, pandas, pygeomag; print('依存関係のインストールに成功しました！')"
```

### Linux ユーザー

#### 1️⃣ Python のインストール

**Ubuntu/Debian:**
```bash
# パッケージリストを更新
sudo apt update

# Python 3.9 と pip をインストール
sudo apt install python3.9 python3.9-pip python3.9-dev

# シンボリックリンクを作成 (オプション)
sudo ln -sf /usr/bin/python3.9 /usr/bin/python
sudo ln -sf /usr/bin/pip3.9 /usr/bin/pip

# インストールを検証
python --version
pip --version
```

**CentOS/RHEL:**
```bash
# EPEL リポジトリをインストール
sudo yum install epel-release

# Python 3.9 をインストール
sudo yum install python39 python39-pip

# インストールを検証
python3.9 --version
pip3.9 --version
```

**Arch Linux:**
```bash
# Python と pip をインストール
sudo pacman -S python python-pip

# インストールを検証
python --version
pip --version
```

#### 2️⃣ 変換器の依存関係のインストール

```bash
# 依存関係パッケージをインストール
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 権限の問題が発生した場合は、ユーザーとしてインストール
pip install --user rich pathlib typing pygeomag pandas tqdm geographiclib

# インストールを検証
python -c "import rich, pandas, pygeomag; print('依存関係のインストールに成功しました！')"
```

## 📦 依存関係の詳細説明

### コア依存関係パッケージ

| パッケージ名 | バージョン要件 | 用途 | ライセンス |
|------|----------|------|--------|
| **rich** | ≥ 12.0.0 | モダンな CLI インターフェース | MIT |
| **pandas** | ≥ 1.3.0 | データ処理と分析 | BSD-3 |
| **pygeomag** | ≥ 0.4.2 | 磁気偏角の計算 | MIT |
| **tqdm** | ≥ 4.60.0 | プログレスバー表示 | MPL-2.0 |
| **geographiclib** | ≥ 1.52 | 地理座標の計算 | MIT |

### 標準ライブラリの依存関係 (インストール不要)

| モジュール | 用途 |
|------|------|
| **pathlib** | ファイルパス処理 |
| **typing** | 型ヒントのサポート |
| **sqlite3** | SQLite データベースアクセス |
| **csv** | CSV ファイル処理 |
| **datetime** | 日付と時刻の処理 |
| **logging** | ロギング |

## 🔍 インストール検証

### 完全な検証スクリプト

検証スクリプト `verify_installation.py` を作成します。

```python
#!/usr/bin/env python3
"""
iFly 航法データ変換器インストール検証スクリプト
"""

import sys
import importlib
from pathlib import Path

def check_python_version():
    """Python バージョンを確認"""
    version = sys.version_info
    print(f"🐍 Python バージョン: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python バージョンは要件を満たしています")
        return True
    else:
        print("❌ Python バージョンが古すぎます。3.8 以降が必要です")
        return False

def check_dependencies():
    """依存関係パッケージを確認"""
    dependencies = [
        'rich',
        'pandas', 
        'pygeomag',
        'tqdm',
        'geographiclib'
    ]
    
    all_ok = True
    print("\n📦 依存関係パッケージを確認中:")
    
    for dep in dependencies:
        try:
            module = importlib.import_module(dep)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {dep}: {version}")
        except ImportError:
            print(f"❌ {dep}: 未インストール")
            all_ok = False
    
    return all_ok

def check_system_resources():
    """システムリソースを確認"""
    import shutil
    
    print("\n💾 システムリソースを確認中:")
    
    # ディスク空き容量を確認
    total, used, free = shutil.disk_usage(Path.home())
    free_gb = free // (1024**3)
    print(f"📁 利用可能なディスク空き容量: {free_gb} GB")
    
    if free_gb >= 1:
        print("✅ ディスク空き容量は十分です")
        disk_ok = True
    else:
        print("⚠️ ディスク空き容量が不足しています。最低 1GB を推奨します")
        disk_ok = False
    
    return disk_ok

def main():
    """メイン検証関数"""
    print("🔍 iFly 航法データ変換器 インストール検証")
    print("=" * 50)
    
    # チェック項目
    checks = [
        ("Python バージョン", check_python_version),
        ("依存関係パッケージ", check_dependencies),
        ("システムリソース", check_system_resources),
    ]
    
    all_passed = True
    for name, check_func in checks:
        try:
            result = check_func()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} のチェックに失敗しました: {e}")
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 すべてのチェックが合格しました！変換器を使用できます。")
        return 0
    else:
        print("⚠️ 一部のチェックが不合格でした。上記のヒントに従って問題を解決してください。")
        return 1

if __name__ == "__main__":
    exit(main())
```

検証スクリプトを実行：
```bash
python verify_installation.py
```

### 手動検証手順

```bash
# 1. Python バージョンを確認
python --version

# 2. pip バージョンを確認
pip --version

# 3. コア依存関係を検証
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import pygeomag; print('PyGeoMag: OK')"

# 4. Rich インターフェースをテスト
python -c "from rich.console import Console; Console().print('Hello, World!', style='bold green')"

# 5. 磁気偏角計算をテスト
python -c "from pygeomag import GeoMag; gm = GeoMag(); print(f'磁気偏角計算 OK: {gm.GeoMag(39.9, 116.4, 0, 2024)}')"
```

## 🔧 よくあるインストール問題

### 問題1: Python バージョンが古すぎる

**症状:**
```
SyntaxError: invalid syntax
```

**解決策:**
```bash
# 現在のバージョンを確認
python --version

# バージョンが 3.8 未満の場合は、アップグレードしてください
# Windows: python.org から新しいバージョンをダウンロード
# macOS: brew upgrade python
# Linux: 上記のインストールガイドを参照
```

### 問題2: pip のインストール失敗

**症状:**
```
ERROR: Could not find a version that satisfies the requirement
```

**解決策:**
```bash
# pip をアップグレード
python -m pip install --upgrade pip

# 国内のミラーリポジトリを使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# キャッシュをクリアして再試行
pip cache purge
pip install rich pandas pygeomag tqdm geographiclib
```

### 問題3: 権限エラー

**症状:**
```
PermissionError: [Errno 13] Permission denied
```

**解決策:**
```bash
# Windows: 管理者としてコマンドプロンプトを実行
# macOS/Linux: ユーザーとしてインストール
pip install --user rich pandas pygeomag tqdm geographiclib

# または sudo を使用 (非推奨)
sudo pip install rich pandas pygeomag tqdm geographiclib
```

### 問題4: ネットワーク接続の問題

**症状:**
```
WARNING: Retrying... Connection broken
```

**解決策:**
```bash
# 国内のミラーリポジトリを使用
pip install -i https://mirrors.aliyun.com/pypi/simple/ rich pandas pygeomag tqdm geographiclib

# または Tsinghua ミラー
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# 永続的なミラーリポジトリを設定
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 🎯 インストール後の手順

### 1. 必要なファイルの準備
- **Fenix データベース**: `nd.db3` ファイルを取得
- **NAIP データ**: `RTE_SEG.csv` 経路データをダウンロード
- **iFly インストール**: iFly 737 MAX 8 がインストールされていることを確認

### 2. 作業ディレクトリの作成
```bash
# 専用ディレクトリを作成
mkdir ~/ifly-converter
cd ~/ifly-converter

# 変換器スクリプトをダウンロード
# (プロジェクトリポジトリから main.py を取得)
```

### 3. 初回テストの実施
```bash
# 変換器を実行
python main.py

# 画面の指示に従って操作
```

## 📚 次のステップ

インストールが完了したら、以下を引き続きお読みください：

1. **[設定ガイド](configuration.md)** - 詳細な設定オプションについて学ぶ
2. **[使用方法](usage.md)** - 初めてのデータ変換を開始する
3. **[トラブルシューティング](../troubleshooting.md)** - 問題が発生した場合に参照

---

**インストール完了！** 🎉 これで、iFly 航法データ変換器を使い始めることができます。何か問題が発生した場合は、[トラブルシューティングガイド](../troubleshooting.md) を参照するか、GitHub Issues で助けを求めてください。
