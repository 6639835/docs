# 🛠️ TFDI ナビゲーションデータコンバーター トラブルシューティング

## 🚨 よくあるエラーと解決策

### 1. 環境とインストールに関する問題

#### ❌ Python 環境の問題

**エラーメッセージ：**
```
ModuleNotFoundError: No module named 'rich'
ImportError: No module named 'pandas'
```

**解決策：**
```bash
# 1. Pythonバージョンの確認
python --version  # 3.8以上であることを確認

# 2. pipのアップグレード
python -m pip install --upgrade pip

# 3. 依存関係のインストール
pip install -r requirements.txt

# 4. インストールの確認
python -c "import rich, pandas; print('依存関係のインストールに成功しました')"
```

#### ❌ 権限エラー

**エラーメッセージ：**
```
PermissionError: [Errno 13] Permission denied
出力ディレクトリを作成できません
```

**解決策：**
```bash
# Windows - 管理者として実行
# コマンドプロンプトを右クリック → 「管理者として実行」

# macOS/Linux - sudoを使用するか、権限を変更
sudo python converter.py
# または
chmod 755 /path/to/output/directory
```

### 2. データベースアクセスに関する問題

#### ❌ データベースファイルが存在しない

**エラーメッセージ：**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
Fenixデータベースファイルが見つかりません
```

**解決策：**
1.  **Fenixのインストールを確認**：
    ```bash
    # 一般的なパス
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\
    ```

2.  **ファイルを手動で特定**：
    ```bash
    # Windows
    dir /s nd.db3
       
    # macOS/Linux
    find ~ -name "nd.db3" 2>/dev/null
    ```

3.  **データベースを再生成**：
    -   MSFSを起動
    -   Fenix A320をロード
    -   ナビゲーションデータの読み込みが完了するまで待機

#### ❌ データベースの破損

**エラーメッセージ：**
```
sqlite3.DatabaseError: database disk image is malformed
データベースファイルが破損しています
```

**診断方法：**
```python
import sqlite3

def check_database_integrity(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        if result[0] == "ok":
            print("✅ データベースの整合性は正常です")
        else:
            print(f"❌ データベースの破損: {result[0]}")
    except Exception as e:
        print(f"❌ データベースにアクセスできません: {e}")
    finally:
        conn.close()
```

**復旧策：**
```bash
# 1. 破損したデータベースをバックアップ
cp nd.db3 nd.db3.backup

# 2. SQLiteによる修復を試みる
sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3

# 3. 修復に失敗した場合は、データベースを再取得
# ファイルを削除し、Fenixを再起動
```

#### ❌ データベースのテーブル構造に互換性がない

**エラーメッセージ：**
```
sqlite3.OperationalError: no such table: Terminals
データベースに必要なテーブルがありません
```

**検証スクリプト：**
```python
def validate_database_schema(db_path):
    required_tables = [
        'Airports', 'Runways', 'Waypoints', 'Navaids',
        'Airways', 'AirwayLegs', 'Terminals', 'TerminalLegs',
        'ILSes', 'AirportLookup', 'NavaidLookup', 'WaypointLookup'
    ]
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = {row[0] for row in cursor.fetchall()}
    
    missing_tables = set(required_tables) - existing_tables
    if missing_tables:
        print(f"❌ テーブルが不足しています: {missing_tables}")
        return False
    
    print("✅ データベース構造の検証に成功しました")
    return True
```

### 3. メモリとパフォーマンスに関する問題

#### ❌ メモリ不足

**エラーメッセージ：**
```
MemoryError: Unable to allocate array
メモリが不足しているため、データを処理できません
```

**メモリ使用量の監視：**
```python
import psutil
import gc

def monitor_memory_usage():
    memory = psutil.virtual_memory()
    print(f"総メモリ: {memory.total // 1024**3} GB")
    print(f"使用済みメモリ: {memory.used // 1024**3} GB")
    print(f"利用可能メモリ: {memory.available // 1024**3} GB")
    print(f"使用率: {memory.percent}%")

def optimize_memory():
    # 強制ガベージコレクション
    gc.collect()
    
    # pandasキャッシュをクリア
    import pandas as pd
    pd.reset_option('all')
```

**解決策：**
```python
# 1. バッチサイズを減らす
config = ConverterConfig(
    batch_size=500,  # デフォルトの1000から減らす
    coordinate_precision=6  # 精度を低下させる
)

# 2. ストリーミング処理を有効にする
def process_large_table_streaming(table_name):
    chunk_size = 1000
    offset = 0
    
    while True:
        query = f"""
        SELECT * FROM {table_name} 
        LIMIT {chunk_size} OFFSET {offset}
        """
        
        chunk = pd.read_sql_query(query, conn)
        if chunk.empty:
            break
            
        process_chunk(chunk)
        del chunk  # メモリを解放
        gc.collect()
        
        offset += chunk_size
```

#### ❌ 処理速度が遅すぎる

**症状：** 変換プロセスが特定のステップで長時間停止する

**パフォーマンス診断：**
```python
import time
import cProfile

def profile_conversion():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # 変換を実行
    converter.convert(db_path, terminal_id)
    
    profiler.disable()
    profiler.dump_stats('conversion_profile.prof')

# パフォーマンスボトルネックの分析
# python -m cProfile -o profile.prof converter.py
# python -c "import pstats; pstats.Stats('profile.prof').sort_stats('cumulative').print_stats(10)"
```

**最適化の推奨事項：**
```python
# 1. SQLiteパフォーマンスの最適化
def optimize_sqlite_connection(conn):
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA cache_size=10000")
    conn.execute("PRAGMA temp_store=MEMORY")

# 2. 並列処理
from concurrent.futures import ThreadPoolExecutor

def parallel_table_processing():
    tables = ['Airports', 'Runways', 'Waypoints', 'Navaids']
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for table in tables:
            future = executor.submit(process_table, table)
            futures.append(future)
        
        # すべてのタスクが完了するまで待機
        for future in futures:
            future.result()
```

### 4. データ変換に関する問題

#### ❌ 座標データの異常

**エラーメッセージ：**
```
ValueError: Invalid coordinate value: latitude=91.5
座標が有効範囲を超えています
```

**検証と修正：**
```python
def validate_and_fix_coordinates(df):
    """座標データを検証し修正します"""
    initial_count = len(df)
    
    # 緯度範囲[-90, 90]を確認
    invalid_lat = (df['Latitude'] < -90) | (df['Latitude'] > 90)
    if invalid_lat.any():
        print(f"無効な緯度値が {invalid_lat.sum()} 個見つかりました")
        df = df[~invalid_lat]
    
    # 経度範囲[-180, 180]を確認
    invalid_lon = (df['Longitude'] < -180) | (df['Longitude'] > 180)
    if invalid_lon.any():
        print(f"無効な経度値が {invalid_lon.sum()} 個見つかりました")
        df = df[~invalid_lon]
    
    removed_count = initial_count - len(df)
    if removed_count > 0:
        print(f"⚠️ 無効な座標レコードが {removed_count} 個削除されました")
    
    return df
```

#### ❌ JSONシリアライズの失敗

**エラーメッセージ：**
```
TypeError: Object of type 'datetime' is not JSON serializable
JSONシリアライズエラー
```

**解決策：**
```python
import json
from datetime import datetime
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """カスタムJSONエンコーダ"""
    
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# カスタムエンコーダを使用
def safe_json_dump(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=CustomJSONEncoder, 
                 ensure_ascii=False, indent=2)
```

#### ❌ 文字エンコーディングの問題

**エラーメッセージ：**
```
UnicodeDecodeError: 'utf-8' codec can't decode byte
文字エンコーディングエラー
```

**解決策：**
```python
import chardet

def detect_and_convert_encoding(file_path):
    """ファイルエンコーディングを検出し変換します"""
    # エンコーディングを検出
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        encoding = chardet.detect(raw_data)['encoding']
    
    print(f"検出されたエンコーディング: {encoding}")
    
    # UTF-8に変換
    with open(file_path, 'r', encoding=encoding) as f:
        content = f.read()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def safe_string_handling(text):
    """安全な文字列処理"""
    if isinstance(text, bytes):
        # 複数のエンコーディングを試行
        for encoding in ['utf-8', 'gbk', 'latin1']:
            try:
                return text.decode(encoding)
            except UnicodeDecodeError:
                continue
        # すべて失敗した場合は、エラー処理を使用
        return text.decode('utf-8', errors='replace')
    return str(text)
```

### 5. 出力ファイルに関する問題

#### ❌ 圧縮ファイル作成の失敗

**エラーメッセージ：**
```
py7zr.exceptions.Bad7zFile: not a 7z file
圧縮ファイルの作成に失敗しました
```

**解決策：**
```python
import py7zr
import shutil
from pathlib import Path

def safe_create_archive(source_dir, archive_path):
    """安全にアーカイブを作成します"""
    try:
        # ソースディレクトリが存在することを確認
        if not Path(source_dir).exists():
            raise FileNotFoundError(f"ソースディレクトリが存在しません: {source_dir}")
        
        # 既存のアーカイブを削除
        if Path(archive_path).exists():
            Path(archive_path).unlink()
        
        # アーカイブを作成
        with py7zr.SevenZipFile(archive_path, 'w') as archive:
            archive.writeall(source_dir, ".")
        
        print(f"✅ アーカイブ作成成功: {archive_path}")
        return True
        
    except Exception as e:
        print(f"❌ アーカイブ作成失敗: {e}")
        
        # フォールバック案：ZIPファイルの作成
        try:
            shutil.make_archive(
                str(Path(archive_path).with_suffix('')), 
                'zip', 
                source_dir
            )
            print("✅ ZIP形式のバックアップファイルが作成されました")
            return True
        except Exception as zip_error:
            print(f"❌ ZIP作成も失敗しました: {zip_error}")
            return False
```

#### ❌ ファイルサイズの異常

**症状：** 出力ファイルが小さすぎるか大きすぎる

**確認方法：**
```python
def validate_output_files(output_dir):
    """出力ファイルを検証します"""
    expected_files = [
        'Airports.json', 'Runways.json', 'Waypoints.json',
        'Navaids.json', 'Airways.json', 'AirwayLegs.json',
        'Terminals.json', 'ILSes.json'
    ]
    
    file_info = {}
    for file_name in expected_files:
        file_path = Path(output_dir) / file_name
        if file_path.exists():
            size = file_path.stat().st_size
            file_info[file_name] = {
                'exists': True,
                'size_mb': size / 1024 / 1024,
                'empty': size == 0
            }
        else:
            file_info[file_name] = {'exists': False}
    
    # ファイル情報を表示
    print("📁 出力ファイルチェック:")
    for file_name, info in file_info.items():
        if info['exists']:
            if info.get('empty', False):
                print(f"⚠️ {file_name}: 空ファイル")
            else:
                print(f"✅ {file_name}: {info['size_mb']:.2f} MB")
        else:
            print(f"❌ {file_name}: ファイルが見つかりません")
    
    return file_info
```

## 🔍 診断ツール

### 1. システム環境チェック

```python
def system_diagnostics():
    """システム環境診断"""
    import platform
    import sys
    import psutil
    
    print("🔍 システム環境診断")
    print("=" * 50)
    
    # オペレーティングシステム情報
    print(f"オペレーティングシステム: {platform.system()} {platform.release()}")
    print(f"アーキテクチャ: {platform.machine()}")
    
    # Python環境
    print(f"Python バージョン: {sys.version}")
    print(f"Python パス: {sys.executable}")
    
    # ハードウェア情報
    print(f"CPU コア数: {psutil.cpu_count()}")
    memory = psutil.virtual_memory()
    print(f"総メモリ: {memory.total // 1024**3} GB")
    print(f"利用可能メモリ: {memory.available // 1024**3} GB")
    
    # ディスク容量
    disk = psutil.disk_usage('.')
    print(f"ディスク総容量: {disk.total // 1024**3} GB")
    print(f"ディスク利用可能容量: {disk.free // 1024**3} GB")
```

### 2. 依存パッケージの検証

```python
def verify_dependencies():
    """依存パッケージを検証します"""
    required_packages = [
        'rich', 'pandas', 'py7zr', 'sqlite3'
    ]
    
    print("📦 依存パッケージの検証")
    print("=" * 30)
    
    for package in required_packages:
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package}: {version}")
        except ImportError:
            print(f"❌ {package}: 未インストール")
        except Exception as e:
            print(f"⚠️ {package}: エラー - {e}")
```

### 3. パフォーマンス監視ツール

```python
import time
import threading
from contextlib import contextmanager

class PerformanceMonitor:
    """パフォーマンスモニター"""
    
    def __init__(self):
        self.metrics = {}
        self.monitoring = False
    
    @contextmanager
    def measure(self, operation_name):
        """操作にかかった時間を測定"""
        start_time = time.time()
        start_memory = psutil.virtual_memory().used
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.virtual_memory().used
            
            self.metrics[operation_name] = {
                'duration': end_time - start_time,
                'memory_delta': end_memory - start_memory
            }
    
    def start_monitoring(self):
        """リアルタイム監視を開始"""
        self.monitoring = True
        
        def monitor():
            while self.monitoring:
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                
                print(f"\r🔄 CPU: {cpu_percent:5.1f}% | "
                      f"メモリ: {memory.percent:5.1f}% | "
                      f"利用可能: {memory.available//1024**2:,} MB", 
                      end='', flush=True)
                
                time.sleep(1)
        
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def stop_monitoring(self):
        """監視を停止"""
        self.monitoring = False
        print()  # （改行）
    
    def print_summary(self):
        """パフォーマンスサマリーを表示"""
        print("\n📊 パフォーマンスサマリー:")
        print("-" * 40)
        
        for operation, metrics in self.metrics.items():
            duration = metrics['duration']
            memory_mb = metrics['memory_delta'] / 1024 / 1024
            
            print(f"{operation:20s}: {duration:8.2f}s | "
                  f"{memory_mb:+8.1f}MB")

# 使用例
monitor = PerformanceMonitor()
monitor.start_monitoring()

with monitor.measure("データベース検証"):
    validate_database(db_path)

with monitor.measure("データ変換"):
    convert_data()

monitor.stop_monitoring()
monitor.print_summary()
```

## 📋 トラブルシューティングチェックリスト

### 🔧 変換前のチェック
- [ ] Pythonバージョン ≥ 3.8
- [ ] すべての依存パッケージがインストールされ、バージョンが正しいこと
- [ ] Fenixデータベースファイルが存在し、破損していないこと
- [ ] 十分な利用可能メモリ (推奨 4GB以上)
- [ ] 十分なディスク容量 (推奨 1GB以上)
- [ ] 出力ディレクトリに書き込み権限があること

### 📊 変換プロセスのチェック
- [ ] データベース接続が成功していること
- [ ] すべての必須テーブルが存在すること
- [ ] 座標データが有効範囲内にあること
- [ ] メモリ使用量が適切な範囲内にあること
- [ ] 権限エラーが発生していないこと
- [ ] 一時ファイルが正常に作成されていること

### 📁 変換後の検証
- [ ] すべてのJSONファイルが生成されていること
- [ ] ファイルサイズが適切であること（空でない、または異常に大きくない）
- [ ] JSON形式が有効であること
- [ ] 圧縮ファイル作成が成功していること
- [ ] 一時ファイルがクリーンアップされていること
- [ ] ログに重大なエラーがないこと

## 🆘 ヘルプの入手

### 自己診断
1.  **診断ツールを実行**：
    ```python
    from tfdi_converter.diagnostics import run_full_diagnostics
    run_full_diagnostics()
    ```

2.  **詳細ログを確認**：
    ```bash
    tail -f converter.log
    grep -i error converter.log
    ```

3.  **システムリソースを確認**：
    ```bash
    # Windows
    taskmgr
       
    # macOS
    activity monitor
       
    # Linux
    top
    htop
    ```

### コミュニティサポート
-   **GitHub Issues**: バグや技術的な問題を報告
-   **GitHub Discussions**: 使用上の問題と経験の共有
-   **プロジェクトドキュメント**: 完全な使用ガイドを参照

### 問題を報告する際は、以下を提供してください：
-   **完全なエラーログ**
-   **システム環境情報**
-   **コンバーターバージョン**
-   **データベース情報**（サイズ、AIRACなど）
-   **再現手順**
-   **関連する設定ファイル**

---

**未解決の問題に遭遇しましたか？** 

[GitHub Issues](https://github.com/your-org/tfdi-converter/issues) で新しい問題を作成してください。私たちができるだけ早く解決を支援します！🚁✨