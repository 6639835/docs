# 🔧 TFDI ナビゲーションデータコンバーター インストールガイド

このガイドでは、TFDI ナビゲーションデータコンバーターのインストールと設定方法を詳細に説明し、システム環境でコンバーターがスムーズに動作するようにします。

## 📋 システム要件

### 💻 ハードウェア要件
| コンポーネント | 最低要件 | 推奨構成 |
|------|----------|----------|
| **プロセッサ** | デュアルコア 2.0GHz | クアッドコア 3.0GHz+ |
| **メモリ** | 4GB RAM | 8GB+ RAM |
| **ストレージ** | 1GB 利用可能領域 | 5GB+ 利用可能領域 |
| **ネットワーク** | ダウンロード時のみ必要 | 安定したネットワーク接続 |

### 🖥️ OSサポート
- **Windows**: Windows 10 (2004+) / Windows 11
- **macOS**: macOS 10.15 Catalina 以降
- **Linux**: Ubuntu 18.04+, CentOS 8+, またはその他の主要なディストリビューション

### 🐍 Python環境要件
- **Pythonバージョン**: 3.8.0 以降
- **推奨バージョン**: Python 3.9.x または 3.10.x
- **パッケージマネージャー**: pip 21.0+ (通常、Pythonと一緒にインストールされます)

## 🚀 クイックインストール

### Windowsユーザー

#### 1️⃣ Pythonのインストール

**方法1：Microsoft Store (推奨)**
```bash
# 1. Microsoft Storeを開きます
# 2. "Python 3.10"を検索します
# 3. Python 3.10をインストールします
# 4. インストールを検証します
python --version
pip --version
```

**方法2：公式サイトからダウンロード**
```bash
# 1. https://www.python.org/downloads/windows/ にアクセスします
# 2. Python 3.10.x (64-bit) をダウンロードします
# 3. インストーラーを実行します
#    ✅ "Add Python to PATH"にチェックを入れます
#    ✅ "Install pip"にチェックを入れます
# 4. インストールを検証します
python --version
```

#### 2️⃣ コンバーターの依存関係のインストール

```bash
# コマンドプロンプトまたはPowerShellを開きます
# pipをアップグレードします
python -m pip install --upgrade pip

# 必須の依存関係をインストールします
pip install rich pandas py7zr

# インストールを検証します
python -c "import rich, pandas, py7zr; print('✅ すべての依存関係が正常にインストールされました!')"
```

#### 3️⃣ コンバーターのダウンロード

```bash
# 方法1：リリースパッケージをダウンロードします
# GitHub Releasesページにアクセスして最新バージョンをダウンロードします

# 方法2：ソースコードをクローンします (Gitが必要)
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# コンバーターを検証します
python Fenix2TFDINavDataConverter.py --help
```

### macOSユーザー

#### 1️⃣ Pythonのインストール

**方法1：Homebrew (推奨)**
```bash
# Homebrewをインストールします (まだインストールしていない場合)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Pythonをインストールします
brew install python@3.10

# インストールを検証します
python3 --version
pip3 --version

# シンボリックリンクを作成します (オプション)
ln -sf $(which python3) /usr/local/bin/python
ln -sf $(which pip3) /usr/local/bin/pip
```

**方法2：公式サイトからダウンロード**
```bash
# 1. https://www.python.org/downloads/macos/ にアクセスします
# 2. Python 3.10.x for macOS をダウンロードします
# 3. .pkgファイルをインストールします
# 4. インストールを検証します
python3 --version
```

#### 2️⃣ コンバーターの依存関係のインストール

```bash
# pipをアップグレードします
python3 -m pip install --upgrade pip

# 依存関係をインストールします
pip3 install rich pandas py7zr

# インストールを検証します
python3 -c "import rich, pandas, py7zr; print('✅ 依存関係のインストールが完了しました！')"
```

#### 3️⃣ コンバーターのダウンロードと設定

```bash
# コンバーターをダウンロードします
curl -L -o tfdi-converter.zip https://github.com/your-org/tfdi-converter/archive/main.zip
unzip tfdi-converter.zip
cd tfdi-converter-main

# またはGitを使用します
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# インストールを検証します
python3 Fenix2TFDINavDataConverter.py --version
```

### Linuxユーザー

#### 1️⃣ Pythonのインストール

**Ubuntu/Debian:**
```bash
# パッケージリストを更新します
sudo apt update

# Python 3.10と関連ツールをインストールします
sudo apt install python3.10 python3.10-pip python3.10-venv python3.10-dev

# build-essentialをインストールします (一部のパッケージはコンパイルが必要)
sudo apt install build-essential

# シンボリックリンクを作成します
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3.10 1

# インストールを検証します
python --version
pip --version
```

**CentOS/RHEL 8+:**
```bash
# PowerToolsリポジトリを有効にします
sudo dnf config-manager --set-enabled powertools

# Python 3.10をインストールします
sudo dnf install python3.10 python3.10-pip python3.10-devel

# 開発ツールをインストールします
sudo dnf groupinstall "Development Tools"

# インストールを検証します
python3.10 --version
pip3.10 --version
```

**Arch Linux:**
```bash
# Pythonをインストールします
sudo pacman -S python python-pip

# 開発ツールをインストールします
sudo pacman -S base-devel

# インストールを検証します
python --version
pip --version
```

#### 2️⃣ コンバーターの依存関係のインストール

```bash
# pipをアップグレードします
python -m pip install --upgrade pip

# 依存関係をインストールします
pip install rich pandas py7zr

# 権限の問題が発生した場合は、ユーザーインストールを使用します
pip install --user rich pandas py7zr

# インストールを検証します
python -c "import rich, pandas, py7zr; print('✅ 依存関係のインストールに成功しました！')"
```

#### 3️⃣ コンバーターのダウンロード

```bash
# wgetを使用してダウンロードします
wget https://github.com/your-org/tfdi-converter/archive/main.zip
unzip main.zip
cd tfdi-converter-main

# またはgitを使用します
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 実行権限を設定します
chmod +x Fenix2TFDINavDataConverter.py

# インストールを検証します
python Fenix2TFDINavDataConverter.py --version
```

## 📦 依存関係の詳細

### コア依存パッケージ

| パッケージ名 | バージョン要件 | 用途 | インストールコマンド |
|------|----------|------|----------|
| **rich** | ≥ 12.0.0 | モダンなCLIインターフェース | `pip install rich` |
| **pandas** | ≥ 1.3.0 | データ処理と分析 | `pip install pandas` |
| **py7zr** | ≥ 0.18.0 | 7z圧縮ファイル処理 | `pip install py7zr` |

### 標準ライブラリの依存関係 (追加インストール不要)

| モジュール | 用途 |
|------|------|
| **sqlite3** | SQLiteデータベースアクセス |
| **json** | JSONデータシリアライズ |
| **pathlib** | ファイルパス処理 |
| **logging** | ログ記録 |
| **dataclasses** | データクラスのサポート |
| **concurrent.futures** | 並行処理 |

### オプションの依存関係

```bash
# 開発関連の依存関係 (開発者のみ必要)
pip install pytest flake8 mypy black pre-commit

# パフォーマンス監視の依存関係
pip install psutil

# プログレスバーの強化
pip install tqdm
```

## 🔍 インストール検証

### 完全検証スクリプト

検証スクリプト `verify_tfdi_installation.py`を作成します：

```python
#!/usr/bin/env python3
"""
TFDI ナビゲーションデータコンバーター インストール検証スクリプト
システム環境、依存パッケージ、およびコンバーターの機能をチェックします
"""

import sys
import importlib
import platform
from pathlib import Path

def check_python_version():
    """Pythonバージョンをチェックします"""
    version = sys.version_info
    print(f"🐍 Python バージョン: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Pythonバージョンは要件を満たしています (>= 3.8)")
        return True
    else:
        print("❌ Pythonバージョンが古すぎます。3.8以降が必要です")
        print("   Pythonをアップグレードしてから再試行してください")
        return False

def check_dependencies():
    """必須の依存パッケージをチェックします"""
    required_packages = {
        'rich': 'モダンなCLIインターフェース',
        'pandas': 'データ処理ライブラリ',
        'py7zr': '7z圧縮処理'
    }
    
    print("\n📦 依存パッケージをチェック中:")
    all_ok = True
    
    for package, description in required_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"❌ {package:<10} 未インストール        ({description})")
            all_ok = False
        except Exception as e:
            print(f"⚠️ {package:<10} エラー: {e}")
            all_ok = False
    
    return all_ok

def check_optional_dependencies():
    """オプションの依存関係をチェックします"""
    optional_packages = {
        'psutil': 'システム監視',
        'tqdm': 'プログレスバーの強化'
    }
    
    print("\n🔧 オプションの依存関係をチェック中:")
    for package, description in optional_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"⚪ {package:<10} 未インストール        ({description}) - オプション")

def check_system_resources():
    """システムリソースをチェックします"""
    print("\n💾 システムリソースをチェック中:")
    
    try:
        import psutil
        
        # メモリをチェック
        memory = psutil.virtual_memory()
        memory_gb = memory.total // (1024**3)
        print(f"💿 総メモリ: {memory_gb} GB")
        
        if memory_gb >= 4:
            print("✅ メモリは十分です (>= 4GB)")
        else:
            print("⚠️ メモリが不足している可能性があります。4GB以上を推奨します")
        
        # ディスク容量をチェック
        disk = psutil.disk_usage('.')
        free_gb = disk.free // (1024**3)
        print(f"💿 利用可能なディスク容量: {free_gb} GB")
        
        if free_gb >= 1:
            print("✅ ディスク容量は十分です (>= 1GB)")
        else:
            print("⚠️ ディスク容量が不足しています。少なくとも1GBが必要です")
            
    except ImportError:
        print("⚪ システムリソースをチェックできません (psutilが未インストール)")

def check_converter_accessibility():
    """コンバーターファイルのアクセス可能性をチェックします"""
    print("\n🔧 コンバーターファイルをチェック中:")
    
    converter_files = [
        'Fenix2TFDINavDataConverter.py',
        'README.md'
    ]
    
    for file_name in converter_files:
        file_path = Path(file_name)
        if file_path.exists():
            size_kb = file_path.stat().st_size // 1024
            print(f"✅ {file_name:<35} ({size_kb} KB)")
        else:
            print(f"⚠️ {file_name:<35} ファイルが存在しません")

def test_basic_functionality():
    """基本機能をテストします"""
    print("\n🧪 基本機能をテスト中:")
    
    try:
        # Richインターフェースをテスト
        from rich.console import Console
        console = Console()
        console.print("✅ Richインターフェースのテスト", style="green")
        
        # Pandasデータ処理をテスト
        import pandas as pd
        df = pd.DataFrame({'test': [1, 2, 3]})
        assert len(df) == 3
        print("✅ Pandasデータ処理テストが通過しました")
        
        # py7zr圧縮機能をテスト
        import py7zr
        print("✅ py7zr圧縮機能が利用可能です")
        
        # SQLite接続をテスト
        import sqlite3
        conn = sqlite3.connect(':memory:')
        conn.close()
        print("✅ SQLiteデータベース接続テストが通過しました")
        
        return True
        
    except Exception as e:
        print(f"❌ 機能テストに失敗しました: {e}")
        return False

def main():
    """メイン検証関数"""
    print("🔍 TFDI ナビゲーションデータコンバーター インストール検証")
    print("=" * 60)
    
    # チェック項目リスト
    checks = [
        ("Pythonバージョン", check_python_version),
        ("必須の依存関係", check_dependencies),
        ("オプションの依存関係", check_optional_dependencies),
        ("システムリソース", check_system_resources),
        ("コンバーターファイル", check_converter_accessibility),
        ("基本機能", test_basic_functionality),
    ]
    
    all_passed = True
    critical_passed = True
    
    for name, check_func in checks:
        try:
            result = check_func()
            if name in ["Pythonバージョン", "必須の依存関係", "基本機能"]:
                if not result:
                    critical_passed = False
                    all_passed = False
            elif result is False:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} チェックに失敗しました: {e}")
            if name in ["Pythonバージョン", "必須の依存関係"]:
                critical_passed = False
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if critical_passed:
        if all_passed:
            print("🎉 すべてのチェックが通過しました！コンバーターは正常に使用できます。")
            print("\n📝 次のステップ:")
            print("   1. Fenix ナビゲーションデータベースファイル (nd.db3) を準備します")
            print("   2. コンバーターを実行します: python Fenix2TFDINavDataConverter.py")
            return 0
        else:
            print("✅ コア機能は利用可能ですが、一部のオプション機能は制限される可能性があります。")
            print("   コンバーターは正常に使用できますが、不足しているオプションの依存関係をインストールすることを推奨します。")
            return 0
    else:
        print("❌ 重要なチェックが通過しませんでした。上記の問題を解決してから再試行してください。")
        print("\n🔧 よくある解決策:")
        print("   • Pythonバージョンのアップグレード: https://python.org/downloads")
        print("   • 依存関係のインストール: pip install rich pandas py7zr")
        print("   • ネットワーク接続と権限設定を確認してください")
        return 1

if __name__ == "__main__":
    exit(main())
```

検証スクリプトを実行します：
```bash
python verify_tfdi_installation.py
```

### クイック検証コマンド

```bash
# 1. Pythonバージョンをチェックします
python --version

# 2. pipバージョンをチェックします  
pip --version

# 3. コア依存関係を検証します
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import py7zr; print(f'py7zr: {py7zr.__version__}')"

# 4. Richインターフェースをテストします
python -c "from rich.console import Console; Console().print('🎉 Richテスト成功!', style='bold green')"

# 5. コンバーターの起動をテストします
python Fenix2TFDINavDataConverter.py --version
```

## 🔧 よくあるインストール問題

### 問題1: Pythonバージョンが古すぎる

**症状:**
```
SyntaxError: invalid syntax (新しい構文機能が使用されています)
TypeError: 'type' object is not subscriptable
```

**解決策:**
```bash
# 現在のバージョンをチェックします
python --version

# バージョンが3.8未満の場合は、アップグレードが必要です
# Windows: python.orgから新しいバージョンをダウンロードします
# macOS: brew upgrade python  
# Linux: 上記のインストールガイドを参照して更新してください
```

### 問題2: pipのインストール失敗

**症状:**
```
ERROR: Could not find a version that satisfies the requirement
WARNING: Retrying... Connection broken
```

**解決策:**
```bash
# pipをアップグレードします
python -m pip install --upgrade pip

# 国内ミラーソースを使用します
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas py7zr

# キャッシュをクリアして再試行します
pip cache purge
pip install rich pandas py7zr

# ネットワーク接続をチェックします
ping pypi.org
```

### 問題3: 権限エラー

**症状:**
```
PermissionError: [Errno 13] Permission denied
Could not install packages due to an PermissionError
```

**解決策:**
```bash
# Windows: 管理者として実行します
# コマンドプロンプトを右クリック → 「管理者として実行」

# macOS/Linux: ユーザーインストールを使用します
pip install --user rich pandas py7zr

# またはsudoを使用します (非推奨)
sudo pip install rich pandas py7zr
```

### 問題4: コンパイルエラー

**症状:**
```
error: Microsoft Visual C++ 14.0 is required
error: building wheel for package failed
```

**解決策:**

**Windows:**
```bash
# Microsoft C++ Build Toolsをインストールします
# アクセス: https://visualstudio.microsoft.com/visual-cpp-build-tools/
# "Build Tools for Visual Studio"をダウンロードしてインストールします

# またはプリコンパイル済みパッケージを使用します
pip install --only-binary=all rich pandas py7zr
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install build-essential python3-dev

# CentOS/RHEL
sudo dnf groupinstall "Development Tools"
sudo dnf install python3-devel
```

### 問題5: 依存関係の競合

**症状:**
```
ERROR: pip's dependency resolver does not currently support multiple versions
```

**解決策:**
```bash
# 仮想環境を作成します
python -m venv tfdi_env

# 仮想環境をアクティブ化します
# Windows:
tfdi_env\Scripts\activate
# macOS/Linux:
source tfdi_env/bin/activate

# 仮想環境にインストールします
pip install rich pandas py7zr

# インストールを検証します
python -c "import rich, pandas, py7zr; print('インストール成功！')"
```

## 🎯 インストール後のステップ

### 1. 環境設定

#### Windows環境変数 (オプション)
```batch
# Python ScriptsディレクトリをPATHに追加します
set PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\Python\Python310\Scripts

# コンバーターディレクトリを設定します
set TFDI_CONVERTER_HOME=C:\Users\%USERNAME%\tfdi-converter
```

#### macOS/Linux環境変数 (オプション)
```bash
# ~/.bashrc または ~/.zshrc に追加します
export TFDI_CONVERTER_HOME="$HOME/tfdi-converter"
export PATH="$PATH:$TFDI_CONVERTER_HOME"

# 設定をリロードします
source ~/.bashrc  # または source ~/.zshrc
```

### 2. データファイルの準備

```bash
# Fenixデータベースの場所をチェックします
# Windowsでの一般的なパス:
dir "%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320" /s | findstr nd.db3

# macOS/Linux:
find ~ -name "nd.db3" 2>/dev/null
```

### 3. 作業ディレクトリの作成

```bash
# 専用の作業ディレクトリを作成します
mkdir ~/tfdi-conversion-workspace
cd ~/tfdi-conversion-workspace

# サブディレクトリを作成します
mkdir input output logs backups

# コンバーターを作業ディレクトリにコピーします (オプション)
cp /path/to/Fenix2TFDINavDataConverter.py .
```

### 4. 初回実行テスト

```bash
# コンバーターのヘルプを実行します
python Fenix2TFDINavDataConverter.py --help

# 基本テストを実行します (テストデータがある場合)
python Fenix2TFDINavDataConverter.py --test

# バージョン情報を表示します
python Fenix2TFDINavDataConverter.py --version
```

## 📚 次のステップ

インストールが完了したら、以下を読み続けてください：

1.  **[設定説明](configuration.md)** - コンバーターの設定オプションについて学ぶ
2.  **[使用方法](usage.md)** - 最初のデータ変換を開始する
3.  **[トラブルシューティング](../troubleshooting.md)** - 問題が発生した場合に参照する

### クイックスタートチェックリスト

- [ ] ✅ Python 3.8+ がインストール済み
- [ ] ✅ 必須の依存関係がインストール済み (rich, pandas, py7zr)
- [ ] ✅ コンバーターファイルがダウンロード済み
- [ ] ✅ インストール検証通過
- [ ] ✅ Fenix データベースファイルが準備済み
- [ ] ✅ TFDI MD-11 が MSFS にインストール済み

---

**インストール完了！** 🎉 

これで、TFDI ナビゲーションデータコンバーターの使用を開始できます。何か問題が発生した場合は、[トラブルシューティングガイド](../troubleshooting.md) を参照するか、GitHub Issues で助けを求めてください。🚁✨