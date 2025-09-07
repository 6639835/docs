---
title: 故障排除ガイド
description: Nav-dataシステムの問題診断と解決策
---

# 故障排除ガイド

このドキュメントは、Nav-dataの使用中に発生する問題をユーザーが迅速に特定し、解決できるよう、体系的な問題診断方法と解決策を提供します。

## 🔍 迅速な診断フロー

### ステップ1：環境チェック
```bash
# 1. Pythonのバージョンを確認
python --version
# Python 3.6+ のバージョンが表示されるはずです

# 2. 依存パッケージのインストールを確認
pip list | grep -E "(pandas|numpy|pdfplumber|tqdm|colorama|geopy)"

# 3. 作業ディレクトリを確認
ls -la
# プロジェクトのファイル構造が表示されるはずです

# 4. システムリソースを確認
df -h          # ディスク容量
free -h        # メモリ（Linux/macOS）
# Windows: タスクマネージャーで確認
```

### ステップ2：ログ分析
```bash
# 詳細ログを有効にする
export NAV_DATA_DEBUG=1  # Linux/macOS
set NAV_DATA_DEBUG=1     # Windows

# 最新のエラーログを表示
tail -n 50 logs/nav-data.log
```

### ステップ3：データファイル検証
```bash
# 入力ファイルを確認
file -I input_file.csv   # エンコーディングをチェック
head -n 5 input_file.csv # 最初の数行を表示

# ファイルの整合性を検証
wc -l input_file.csv     # 行数をカウント
```

## 🚨 共通のエラーパターン

### エラータイプの分類

#### A. 環境設定エラー
- Pythonのバージョンが互換性がない
- 依存パッケージの欠落またはバージョン競合
- パス設定エラー
- 権限の問題

#### B. データ形式エラー
- CSVエンコーディングの問題
- PDF形式がサポートされていない
- フィールドの欠落または形式エラー
- 座標形式の問題

#### C. システムリソースの問題
- メモリ不足
- ディスク容量不足
- ファイルハンドル数超過
- ネットワーク接続の問題

#### D. ロジック処理エラー
- データ検証失敗
- 変換ルールの誤り
- 出力形式が正しくない
- 並行処理の競合

## 🔧 詳細なトラブルシューティング

### 1. インストールと環境の問題

#### 問題：ModuleNotFoundError
```
エラーメッセージ：ModuleNotFoundError: No module named 'pandas'
```

**診断ステップ：**
```bash
# 1. 現在のPython環境を確認
which python
python -c "import sys; print(sys.path)"

# 2. 仮想環境の状態を確認
echo $VIRTUAL_ENV  # 仮想環境のパスが表示されるはずです

# 3. パッケージのインストールを検証
pip show pandas
```

**解決策：**
```bash
# 解決策1: 依存関係を再インストール
pip install -r requirements.txt

# 解決策2: 新しい仮想環境を作成
python -m venv nav-data-env-new
source nav-data-env-new/bin/activate
pip install -r requirements.txt

# 解決策3: conda環境を使用
conda create -n nav-data python=3.8
conda activate nav-data
pip install -r requirements.txt
```

#### 問題：Permission Denied
```
エラーメッセージ：PermissionError: [Errno 13] Permission denied
```

**診断ステップ：**
```bash
# 1. ファイルの権限を確認
ls -la target_file

# 2. ディレクトリの権限を確認
ls -ld target_directory

# 3. 現在のユーザーを確認
whoami
groups
```

**解決策：**
```bash
# 解決策1: ファイルの権限を変更
chmod 644 target_file    # ファイル権限
chmod 755 target_dir     # ディレクトリ権限

# 解決策2: 所有者を変更（必要に応じて）
sudo chown $USER:$USER target_file

# 解決策3: ユーザーディレクトリを使用
mkdir ~/nav-data-workspace
cd ~/nav-data-workspace
```

#### 問題：Pythonバージョン競合
```
エラーメッセージ：SyntaxError: invalid syntax (Python 2.7 detected)
```

**診断ステップ：**
```bash
# すべてのPythonバージョンを確認
python --version
python3 --version
which python
which python3

# デフォルトのPythonを確認
ls -la /usr/bin/python*
```

**解決策：**
```bash
# 解決策1: python3を明示的に呼び出す
python3 script.py

# 解決策2: エイリアスを作成
echo "alias python=python3" >> ~/.bashrc
source ~/.bashrc

# 解決策3: システムデフォルトを更新（慎重に操作してください）
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### 2. データ処理の問題

#### 問題：CSVエンコーディングエラー
```
エラーメッセージ：UnicodeDecodeError: 'utf-8' codec can't decode
```

**診断スクリプト：**
```python
#!/usr/bin/env python3
"""
CSV エンコーディング診断ツール
"""
import chardet
import pandas as pd
from pathlib import Path

def diagnose_csv_encoding(file_path):
    """CSV ファイルのエンコーディングを診断"""
    file_path = Path(file_path)
    
    print(f"🔍 診断ファイル: {file_path}")
    
    # 1. ファイル基本情報
    print(f"ファイルサイズ: {file_path.stat().st_size} bytes")
    
    # 2. 自動エンコーディング検出
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)  # 最初の10KBを読み込み
        encoding_info = chardet.detect(raw_data)
        print(f"検出されたエンコーディング: {encoding_info}")
    
    # 3. 異なるエンコーディングを試行
    encodings = ['utf-8', 'gbk', 'gb2312', 'utf-16', 'latin1']
    
    for encoding in encodings:
        try:
            df = pd.read_csv(file_path, encoding=encoding, nrows=5)
            print(f"✅ {encoding}: {len(df)}行の読み込みに成功")
            print(f"   カラム名: {list(df.columns)}")
            break
        except Exception as e:
            print(f"❌ {encoding}: {str(e)[:50]}...")
    
    return encoding_info['encoding']

# 使用例
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnosed_encoding = diagnose_csv_encoding(sys.argv[1])
        print(f"\n💡 推奨エンコーディング: {diagnosed_encoding}")
```

**解決策：**
```python
# 解決策1: 正しいエンコーディングを指定
import pandas as pd
df = pd.read_csv('file.csv', encoding='gbk')

# 解決策2: ファイルのエンコーディングを変換
import codecs
with codecs.open('input.csv', 'r', 'gbk') as f_in:
    with codecs.open('output.csv', 'w', 'utf-8') as f_out:
        f_out.write(f_in.read())

# 解決策3: エンコーディングを自動検出
import chardet
with open('file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']
df = pd.read_csv('file.csv', encoding=encoding)
```

#### 問題：PDF解析失敗
```
エラーメッセージ：PDFSyntaxError: No /Root object found
```

**診断ツール：**
```python
#!/usr/bin/env python3
"""
PDF ファイル診断ツール
"""
import pdfplumber
from pathlib import Path

def diagnose_pdf_file(file_path):
    """PDF ファイルの問題を診断"""
    file_path = Path(file_path)
    
    print(f"🔍 PDFファイルを診断中: {file_path}")
    
    # 1. ファイル基本情報
    print(f"ファイルサイズ: {file_path.stat().st_size} bytes")
    
    # 2. PDFを開こうと試行
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"✅ PDFを開けました")
            print(f"ページ数: {len(pdf.pages)}")
            
            # 1ページ目をチェック
            if pdf.pages:
                first_page = pdf.pages[0]
                print(f"1ページ目のサイズ: {first_page.width} x {first_page.height}")
                
                # テキスト抽出テスト
                text = first_page.extract_text()
                if text:
                    print(f"テキスト抽出成功、最初の100文字: {text[:100]}...")
                else:
                    print("⚠️ テキストを抽出できません、スキャン版PDFの可能性があります")
                
                # テーブルをチェック
                tables = first_page.extract_tables()
                print(f"検出されたテーブル数: {len(tables)} 個")
                
                # 画像をチェック
                images = first_page.images
                print(f"検出された画像数: {len(images)} 個")
                
    except Exception as e:
        print(f"❌ PDFを開くのに失敗しました: {e}")
        
        # 修正提案を試行
        print("\n💡 修正提案:")
        print("1. PDFファイルが破損していないか確認してください")
        print("2. Adobe Readerで開いて検証してみてください")
        print("3. PDF修復ツールを使用してください")
        print("4. PDFファイルを再ダウンロードまたは再取得してください")

# 使用例
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnose_pdf_file(sys.argv[1])
```

**解決策：**
```python
# 解決策1: より緩やかな解析オプションを使用
import pdfplumber
try:
    with pdfplumber.open(pdf_file, password="") as pdf:
        # 処理ロジック
        pass
except Exception as e:
    print(f"PDF解析失敗: {e}")

# 解決策2: 他のPDFライブラリを試す
import pypdf2
try:
    with open(pdf_file, 'rb') as f:
        reader = pypdf2.PdfFileReader(f)
        # 処理ロジック
except Exception as e:
    print(f"代替PDFライブラリも失敗: {e}")

# 解決策3: PDFを前処理
# pdftk などの外部ツールを使用してPDFを修復
import subprocess
subprocess.run(['pdftk', 'broken.pdf', 'output', 'fixed.pdf'])
```

#### 問題：座標変換エラー
```
エラーメッセージ：ValueError: invalid literal for float()
```

**診断ツール：**
```python
#!/usr/bin/env python3
"""
座標データ診断ツール
"""
import re

def diagnose_coordinate_data(text):
    """座標データ形式を診断"""
    print(f"🔍 座標データを診断中: {text[:50]}...")
    
    # よくある座標形式パターン
    patterns = {
        'decimal': r'[+-]?\d+\.\d+',
        'dms_with_symbols': r'\d+°\d+′\d+″',
        'dms_with_letters': r'\d+[°]\d+[\']\d+["]',
        'dms_spaces': r'\d+\s+\d+\s+\d+',
        'chinese_format': r'北緯|南緯|東経|西経',
    }
    
    found_patterns = []
    for name, pattern in patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            found_patterns.append((name, matches[:3]))  # 最初の3つのマッチを表示
    
    print("検出された座標形式:")
    for name, matches in found_patterns:
        print(f"  {name}: {matches}")
    
    # 可能性のある座標を抽出
    coord_candidates = re.findall(r'\d+[°′″\s\'"]+\d+[°′″\s\'"]*\d*', text)
    print(f"座標候補: {coord_candidates[:5]}")
    
    return found_patterns

def test_coordinate_conversion(coord_string):
    """座標変換をテスト"""
    print(f"\n🧪 変換をテスト中: {coord_string}")
    
    try:
        # 異なる変換方法を試行
        
        # 方法1: 直接浮動小数点数に変換
        try:
            result = float(coord_string)
            print(f"  直接変換: {result}")
            return result
        except ValueError:
            pass
        
        # 方法2: 度分秒変換
        dms_pattern = r'(\d+)[°]\s*(\d+)[′\']\s*(\d+(?:\.\d+)?)[″"]?'
        match = re.search(dms_pattern, coord_string)
        if match:
            degrees, minutes, seconds = map(float, match.groups())
            decimal = degrees + minutes/60 + seconds/3600
            print(f"  度分秒変換: {decimal}")
            return decimal
        
        # 方法3: 特殊文字をクリーンアップ後に変換
        cleaned = re.sub(r'[^\d\.]', '', coord_string)
        if cleaned:
            result = float(cleaned)
            print(f"  クリーンアップ後の変換: {result}")
            return result
            
        print(f"  ❌ 変換失敗")
        return None
        
    except Exception as e:
        print(f"  ❌ 変換例外: {e}")
        return None

# 使用例
if __name__ == "__main__":
    test_data = "北緯39°48'35.6\" 東経116°34'46.7\""
    diagnose_coordinate_data(test_data)
    test_coordinate_conversion("39°48'35.6\"")
```

### 3. システムリソースの問題

#### 問題：メモリ不足
```
エラーメッセージ：MemoryError: Unable to allocate array
```

**メモリ監視スクリプト：**
```python
#!/usr/bin/env python3
"""
メモリ使用量監視ツール
"""
import psutil
import gc
import os
from functools import wraps

def monitor_memory(func):
    """メモリ監視デコレータ"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 初期メモリ状態を取得
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"🔍 実行前のメモリ: {initial_memory:.2f} MB")
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # 強制ガベージコレクション
            gc.collect()
            
            # 最終メモリ状態を取得
            final_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_delta = final_memory - initial_memory
            
            print(f"🔍 実行後のメモリ: {final_memory:.2f} MB")
            print(f"🔍 メモリ変化: {memory_delta:+.2f} MB")
            
            # メモリ警告
            if final_memory > 1000:  # 1GBを超えた場合
                print("⚠️ メモリ使用量が高いです、最適化を推奨します")
    
    return wrapper

def check_system_memory():
    """システムメモリの状態をチェック"""
    memory = psutil.virtual_memory()
    
    print("💾 システムメモリの状態:")
    print(f"  総メモリ: {memory.total / 1024**3:.2f} GB")
    print(f"  使用可能メモリ: {memory.available / 1024**3:.2f} GB")
    print(f"  使用率: {memory.percent:.1f}%")
    
    if memory.percent > 80:
        print("⚠️ システムメモリ使用率が高すぎます")
        return False
    return True

# メモリ最適化されたデータ処理関数
@monitor_memory
def memory_efficient_csv_processing(file_path, chunk_size=1000):
    """メモリフレンドリーなCSV処理"""
    import pandas as pd
    
    results = []
    
    # 大容量ファイルをチャンクで読み込み
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # データチャンクを処理
        processed_chunk = process_data_chunk(chunk)
        results.append(processed_chunk)
        
        # メモリをクリーンアップ
        del chunk
        gc.collect()
    
    return pd.concat(results, ignore_index=True)

def process_data_chunk(chunk):
    """個々のデータチャンクを処理"""
    # 実際のデータ処理ロジック
    return chunk  # 簡略化された例
```

**解決策：**
```python
# 解決策1: チャンクで処理
def process_large_file_in_chunks(file_path, chunk_size=1000):
    import pandas as pd
    
    processed_data = []
    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # 個々のチャンクを処理
        processed_chunk = your_processing_function(chunk)
        processed_data.append(processed_chunk)
        
        # メモリを解放
        del chunk
        gc.collect()
    
    return pd.concat(processed_data, ignore_index=True)

# 解決策2: ジェネレーターを使用
def data_generator(file_path):
    """データジェネレーター、メモリを節約"""
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

# 解決策3: 仮想メモリを増やす
# Linux/macOS:
# sudo fallocate -l 4G /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
```

#### 問題：ディスク容量不足
```
エラーメッセージ：OSError: [Errno 28] No space left on device
```

**ディスク容量チェックスクリプト：**
```python
#!/usr/bin/env python3
"""
ディスクスペース監視ツール
"""
import shutil
import os
from pathlib import Path

def check_disk_space(path="."):
    """ディスクスペースをチェック"""
    total, used, free = shutil.disk_usage(path)
    
    print(f"💽 ディスクスペースの状態 ({path}):")
    print(f"  総容量: {total / 1024**3:.2f} GB")
    print(f"  使用済み: {used / 1024**3:.2f} GB")
    print(f"  利用可能容量: {free / 1024**3:.2f} GB")
    print(f"  使用率: {used/total*100:.1f}%")
    
    # 容量不足警告
    if free < 1024**3:  # 1GB未満の場合
        print("⚠️ ディスクスペースが不足しています！")
        return False
    
    return True

def cleanup_temp_files():
    """一時ファイルをクリーンアップ"""
    temp_patterns = [
        "*.tmp",
        "*.temp", 
        "*.cache",
        "*.log",
        "__pycache__",
        ".pytest_cache"
    ]
    
    current_dir = Path(".")
    total_cleaned = 0
    
    for pattern in temp_patterns:
        for file_path in current_dir.rglob(pattern):
            try:
                if file_path.is_file():
                    size = file_path.stat().st_size
                    file_path.unlink()
                    total_cleaned += size
                    print(f"ファイルを削除中: {file_path}")
                elif file_path.is_dir():
                    import shutil
                    size = sum(f.stat().st_size for f in file_path.rglob('*') if f.is_file())
                    shutil.rmtree(file_path)
                    total_cleaned += size
                    print(f"ディレクトリを削除中: {file_path}")
            except Exception as e:
                print(f"{file_path}を削除できません: {e}")
    
    print(f"💾 合計で {total_cleaned / 1024**2:.2f} MB をクリーンアップしました")

def estimate_output_size(input_file):
    """出力ファイルサイズを推定"""
    input_size = Path(input_file).stat().st_size
    
    # 処理タイプに基づいて推定（これは簡略化された推定です）
    estimated_multiplier = {
        '.csv': 1.2,    # CSVからDATへの変換は通常少し大きくなります
        '.pdf': 0.1,    # PDFからのテキスト抽出は通常かなり小さくなります
        '.dat': 1.0,    # DAT形式の修復はサイズが変わりません
    }
    
    suffix = Path(input_file).suffix.lower()
    multiplier = estimated_multiplier.get(suffix, 1.0)
    
    estimated_size = input_size * multiplier
    print(f"📊 推定出力サイズ: {estimated_size / 1024**2:.2f} MB")
    
    return estimated_size
```

### 4. 性能最適化のトラブルシューティング

#### 問題：処理速度が遅すぎる

**性能分析ツール：**
```python
#!/usr/bin/env python3
"""
性能分析ツール
"""
import time
import cProfile
import pstats
from functools import wraps

def profile_performance(func):
    """性能分析デコレータ"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 性能プロファイラを作成
        pr = cProfile.Profile()
        
        # 分析開始
        pr.enable()
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # 分析停止
            end_time = time.time()
            pr.disable()
            
            # 性能レポートを出力
            print(f"⏱️ 実行時間: {end_time - start_time:.2f} 秒")
            
            # 詳細レポートを保存
            stats = pstats.Stats(pr)
            stats.sort_stats('cumulative')
            
            print("\n🔍 性能ホットスポット (上位10関数):")
            stats.print_stats(10)
            
            # レポートをファイルに保存
            stats.dump_stats(f'performance_profile_{int(time.time())}.prof')
    
    return wrapper

# 使用例
@profile_performance
def slow_function():
    """サンプル遅延関数"""
    import pandas as pd
    
    # 遅延操作をシミュレート
    data = []
    for i in range(100000):
        data.append({'id': i, 'value': i**2})
    
    df = pd.DataFrame(data)
    return df.groupby('id').sum()

def benchmark_different_approaches():
    """異なる実装方法の性能を比較"""
    import pandas as pd
    
    # テストデータ
    test_data = list(range(10000))
    
    # 方法1: 通常のループ
    start_time = time.time()
    result1 = []
    for i in test_data:
        result1.append(i * 2)
    time1 = time.time() - start_time
    
    # 方法2: リスト内包表記
    start_time = time.time()
    result2 = [i * 2 for i in test_data]
    time2 = time.time() - start_time
    
    # 方法3: NumPy
    import numpy as np
    start_time = time.time()
    result3 = (np.array(test_data) * 2).tolist()
    time3 = time.time() - start_time
    
    print("🏃 性能比較:")
    print(f"  通常のループ: {time1:.4f} 秒")
    print(f"  リスト内包表記: {time2:.4f} 秒")
    print(f"  NumPy: {time3:.4f} 秒")
    
    # 最も速い方法を見つける
    times = {'通常のループ': time1, 'リスト内包表記': time2, 'NumPy': time3}
    fastest = min(times, key=times.get)
    print(f"🏆 最速の方法: {fastest}")
```

## 🔬 高度な診断ツール

### 総合診断スクリプト

`diagnose_nav_data.py`を作成：

```python
#!/usr/bin/env python3
"""
Nav-data 総合診断ツール
"""
import sys
import os
import subprocess
import platform
from pathlib import Path
import importlib

class NavDataDiagnostic:
    """Nav-data 診断ツールクラス"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.info = []
    
    def log_issue(self, message):
        """問題を記録"""
        self.issues.append(message)
        print(f"❌ {message}")
    
    def log_warning(self, message):
        """警告を記録"""
        self.warnings.append(message)
        print(f"⚠️ {message}")
    
    def log_info(self, message):
        """情報を記録"""
        self.info.append(message)
        print(f"ℹ️ {message}")
    
    def check_python_environment(self):
        """Python環境をチェック"""
        print("\n🐍 Python環境チェック:")
        
        # Pythonバージョン
        version = sys.version_info
        version_str = f"{version.major}.{version.minor}.{version.micro}"
        print(f"  Pythonバージョン: {version_str}")
        
        if version.major < 3 or (version.major == 3 and version.minor < 6):
            self.log_issue(f"Pythonバージョンが低すぎます ({version_str})、3.6+が必要です")
        else:
            self.log_info(f"Pythonバージョンは要件を満たしています ({version_str})")
        
        # 仮想環境
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            self.log_info("仮想環境を使用しています")
        else:
            self.log_warning("仮想環境を使用していません、仮想環境の使用を推奨します")
        
        # Pythonパス
        print(f"  Pythonパス: {sys.executable}")
        print(f"  パッケージ検索パス: {len(sys.path)} パス")
    
    def check_dependencies(self):
        """依存パッケージをチェック"""
        print("\n📦 依存パッケージチェック:")
        
        required_packages = {
            'pandas': '1.3.0',
            'numpy': '1.21.0',
            'pdfplumber': '0.7.0',
            'tqdm': '4.60.0',
            'colorama': '0.4.4',
            'geopy': '2.2.0'
        }
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                version = getattr(module, '__version__', '未知')
                print(f"  ✅ {package}: {version}")
                
                # TODO: バージョン比較ロジック
                
            except ImportError:
                self.log_issue(f"依存パッケージがありません: {package}")
    
    def check_system_resources(self):
        """システムリソースをチェック"""
        print("\n💻 システムリソースチェック:")
        
        # オペレーティングシステム
        system_info = platform.system()
        print(f"  OS: {system_info} {platform.release()}")
        
        # メモリチェック
        try:
            import psutil
            memory = psutil.virtual_memory()
            print(f"  総メモリ: {memory.total / 1024**3:.2f} GB")
            print(f"  使用可能メモリ: {memory.available / 1024**3:.2f} GB")
            
            if memory.available < 2 * 1024**3:  # 2GB未満の場合
                self.log_warning("使用可能メモリが少ないです、大容量ファイルの処理に影響する可能性があります")
        except ImportError:
            self.log_warning("メモリ状態をチェックできません（psutilがありません）")
        
        # ディスクスペース
        try:
            import shutil
            total, used, free = shutil.disk_usage('.')
            print(f"  ディスクスペース: {free / 1024**3:.2f} GB 利用可能")
            
            if free < 1024**3:  # 1GB未満の場合
                self.log_warning("ディスクスペース不足")
        except Exception as e:
            self.log_warning(f"ディスクスペースをチェックできません: {e}")
    
    def check_project_structure(self):
        """プロジェクト構造をチェック"""
        print("\n📁 プロジェクト構造チェック:")
        
        required_dirs = [
            'Airway',
            'PDF extract', 
            'Terminal Patch',
            'X-Plane CIFP'
        ]
        
        for dirname in required_dirs:
            if Path(dirname).exists():
                print(f"  ✅ {dirname}/")
            else:
                self.log_issue(f"ディレクトリがありません: {dirname}/")
        
        # 重要なファイルをチェック
        key_files = [
            'Airway/airway.py',
            'PDF extract/utils.py',
            'Terminal Patch/terminal_encoder.py',
        ]
        
        for filepath in key_files:
            if Path(filepath).exists():
                print(f"  ✅ {filepath}")
            else:
                self.log_issue(f"ファイルがありません: {filepath}")
    
    def check_common_issues(self):
        """一般的な問題をチェック"""
        print("\n🔍 一般的な問題チェック:")
        
        # ファイルエンコーディングをチェック
        csv_files = list(Path('.').glob('**/*.csv'))
        if csv_files:
            print(f"  {len(csv_files)}個のCSVファイルを発見")
            # TODO: エンコーディングチェック
        
        # ログファイルをチェック
        log_files = list(Path('.').glob('**/*.log'))
        if log_files:
            print(f"  {len(log_files)}個のログファイルを発見")
            
            # 最新のログの検証
            for log_file in log_files[-3:]:  # 最新の3つのログをチェック
                try:
                    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        error_lines = [line for line in lines[-50:] if 'ERROR' in line.upper()]
                        if error_lines:
                            print(f"    ⚠️ {log_file}で{len(error_lines)}個のエラーを発見")
                except Exception as e:
                    print(f"    {log_file}を読み取れません: {e}")
    
    def generate_report(self):
        """診断レポートを生成"""
        print("\n" + "="*50)
        print("📋 診断レポート概要")
        print("="*50)
        
        print(f"重大な問題: {len(self.issues)} 個")
        for issue in self.issues:
            print(f"  ❌ {issue}")
        
        print(f"\n警告情報: {len(self.warnings)} 個")
        for warning in self.warnings:
            print(f"  ⚠️ {warning}")
        
        print(f"\n情報提示: {len(self.info)} 個")
        for info in self.info:
            print(f"  ℹ️ {info}")
        
        # 全体的な状態
        if not self.issues:
            if not self.warnings:
                print("\n🎉 システム状態は良好です！")
            else:
                print("\n✅ システムはほぼ正常ですが、警告情報に注意を払うことをお勧めします")
        else:
            print("\n🚨 重大な問題が発見されました。正常に機能させるには修正が必要です")
        
        # レポートを保存
        report_file = f"diagnostic_report_{int(time.time())}.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("Nav-data 診断レポート\n")
            f.write("="*50 + "\n\n")
            
            f.write("重大な問題:\n")
            for issue in self.issues:
                f.write(f"- {issue}\n")
            
            f.write("\n警告情報:\n")
            for warning in self.warnings:
                f.write(f"- {warning}\n")
            
            f.write("\n情報提示:\n")
            for info in self.info:
                f.write(f"- {info}\n")
        
        print(f"\n📄 詳細レポートは以下に保存されました: {report_file}")
    
    def run_full_diagnostic(self):
        """完全な診断を実行"""
        print("🔬 Nav-data システム診断")
        print("="*50)
        
        self.check_python_environment()
        self.check_dependencies()
        self.check_system_resources()
        self.check_project_structure()
        self.check_common_issues()
        self.generate_report()

def main():
    """メイン関数"""
    diagnostic = NavDataDiagnostic()
    
    try:
        diagnostic.run_full_diagnostic()
    except KeyboardInterrupt:
        print("\n\n診断はユーザーによって中断されました")
    except Exception as e:
        print(f"\n\n診断プロセス中に例外が発生しました: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import time
    main()
```

### 診断ツールの使用

```bash
# 完全な診断を実行
python diagnose_nav_data.py

# 診断レポートを表示
cat diagnostic_report_*.txt

# 診断結果に基づいて行動する
# 重大な問題がある場合は、レポートの推奨事項に従って修正してください
# 警告のみの場合は、引き続き使用できますが、最適化を推奨します
```

## 📞 ヘルプを求める

### 問題を報告する際は、以下を提供してください：

1.  **完全なエラーメッセージ**
2.  **システム環境情報**（診断ツールを実行して取得）
3.  **再現手順**
4.  **入力データサンプル**（共有可能な場合）
5.  **期待される結果 vs 実際の結果**

### 連絡チャネル：
- [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- [FAQ ドキュメント](./faq.md)
- [コミュニティディスカッション](https://github.com/your-repo/nav-data/discussions)

---

**覚えておいてください：ほとんどの問題には解決策があります！** 🛠️ 

体系的な診断とトラブルシューティングを通じて、Nav-dataの使用中に発生する問題を迅速に解決できます。問題が解決しない場合は、遠慮なくコミュニティに助けを求めてください。