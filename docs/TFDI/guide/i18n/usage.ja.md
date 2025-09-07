# 🚀 TFDI ナビゲーションデータ変換ツール 使用ガイド

このガイドでは、TFDIナビゲーションデータ変換ツールの使用方法を、基本操作から高度な機能まで詳細に説明し、FenixからTFDIへのナビゲーションデータ変換をスムーズに行えるようサポートします。

## 🎯 使用前の準備

### 1. 環境チェックリスト

変換を開始する前に、以下の環境要件を確認してください。

- ✅ **Python環境**: 3.8+ がインストールされ、設定されていること
- ✅ **依存パッケージ**: rich, pandas, py7zr がインストールされていること
- ✅ **システムリソース**: 少なくとも4GBのRAM、1GBの空きディスク容量
- ✅ **Fenixデータベース**: nd.db3ファイルが準備されていること
- ✅ **TFDI MD-11**: がMicrosoft Flight Simulatorにインストールされていること

### 2. ファイルの準備

#### Fenixデータベースの場所
```bash
# Windowsでの一般的なパス
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# ファイルの存在を確認
python -c "import pathlib; print('データベースが存在' if pathlib.Path('nd.db3').exists() else 'データベースが存在しません')"
```

#### ファイルの整合性チェック
```python
import sqlite3
import os

def check_database_file(db_path):
    """データベースファイルの整合性をチェックする"""
    print(f"🔍 データベースをチェック中: {db_path}")
    
    # ファイルの存在をチェック
    if not os.path.exists(db_path):
        print("❌ ファイルが存在しません")
        return False
    
    # ファイルサイズをチェック
    size_mb = os.path.getsize(db_path) / (1024 * 1024)
    print(f"📁 ファイルサイズ: {size_mb:.1f} MB")
    
    if size_mb < 10:
        print("⚠️ ファイルが小さすぎる可能性があります")
    
    # データベース接続をチェック
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        conn.close()
        
        print(f"✅ {len(tables)}個のテーブルが含まれています")
        return True
        
    except sqlite3.Error as e:
        print(f"❌ データベースエラー: {e}")
        return False

# 使用例
check_database_file("path/to/nd.db3")
```

## 🖥️ 対話型での使用

### 変換ツールの起動

```bash
# 基本的な起動
python Fenix2TFDINavDataConverter.py

# デバッグ情報付きで起動
python Fenix2TFDINavDataConverter.py --debug

# ヘルプ情報を表示
python Fenix2TFDINavDataConverter.py --help
```

### ようこそ画面

変換ツールが起動すると、プロフェッショナルなようこそ画面が表示されます。

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 環境チェック中...
✅ Python 3.9.16
✅ Rich 12.6.0
✅ Pandas 1.5.3
✅ py7zr 0.20.2
✅ システムメモリ: 16 GB
✅ 空きディスク: 128 GB

🚀 変換を開始する準備ができました...
```

## 📋 変換プロセス詳細

### ステップ1: データベースファイルの選択

```
╭─────────────────────────────────────── 📂 データベースファイルの選択 ───────────────────────────────────────╮
│                                                                                                │
│ Fenixナビゲーションデータベースファイルのパスを入力してください:                                                               │
│                                                                                                │
│ 💡 ヒント: ファイルを直接ターミナルにドラッグ＆ドロップするか、フルパスを入力してください                  │
│                                                                                                │
│ 一般的な場所:                                                                                      │
│ • %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\...\navdata\nd.db3              │
│                                                                                                │
╰────────────────────────────────────────────────────────────────────────────────────────────────╯

ファイルパスを入力: 
```

**入力方法:**
```bash
# 方法1: パスの直接入力
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# 方法2: ファイルをターミナルウィンドウにドラッグ＆ドロップ
# (システムが自動的にパスを入力します)

# 方法3: 相対パスの使用 (ファイルが現在のディレクトリにある場合)
./nd.db3
```

### ステップ2: データベースの検証

```
╭─────────────────────────────────────── 🔍 データベースの検証 ─────────────────────────────────────────╮
│                                                                                              │
│ データベースファイルを検証中...                                                                        │
│                                                                                              │
│ ✅ ファイルが存在します: nd.db3 (142.5 MB)                                                               │
│ ✅ データベース形式: SQLite 3.x                                                                    │
│ ✅ エンコード形式: UTF-8                                                                           │
│                                                                                              │
│ 🔍 データベーステーブル構造をチェック中...                                                                       │
│ ████████████████████████████████████████ 12/12 (100%)                                      │
│                                                                                              │
│ ✅ すべての必須テーブルが存在します                                                                          │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

**検証項目:**
- ✅ ファイルの存在と可読性
- ✅ SQLiteデータベース形式
- ✅ 必須テーブル構造の整合性
- ✅ データエンコードの正確性
- ✅ 外部キー関係の整合性

### ステップ3: ターミナルIDの設定

```
╭─────────────────────────────────────── ⚙️ 変換パラメータの設定 ───────────────────────────────────────╮
│                                                                                              │
│ ターミナルプロシージャ開始ID設定                                                                          │
│                                                                                              │
│ 💡 説明: ターミナルIDはTFDIシステム内のターミナルプロシージャを識別するために使用されます                │
│                                                                                              │
│ 📊 推奨値:                                                                                   │
│ • 小規模データセット (< 50空港): 1000                                                               │
│ • 中規模データセット (50-200空港): 2000                                                             │
│ • 大規模データセット (> 200空港): 5000                                                              │
│                                                                                              │
│ ⚠️ 注意: 既存のTFDIデータとの衝突を避けてください                                                            │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯

開始ターミナルIDを入力してください [デフォルト: 1000]: 
```

**設定の考慮事項:**
```python
def calculate_terminal_id_range(airport_count, start_id=1000):
    """ターミナルIDの範囲を計算する"""
    # 各空港に予約するIDの数
    ids_per_airport = 20
    
    # 必要なIDの総数を計算
    total_ids_needed = airport_count * ids_per_airport
    
    # バッファを追加 (20%)
    buffer = int(total_ids_needed * 0.2)
    total_with_buffer = total_ids_needed + buffer
    
    end_id = start_id + total_with_buffer
    
    print(f"📊 ID割り当ての推定:")
    print(f"   空港数: {airport_count}")
    print(f"   開始ID: {start_id}")
    print(f"   終了ID: {end_id}")
    print(f"   利用可能範囲: {total_with_buffer} 個のID")
    
    return start_id, end_id
```

### ステップ4: 変換の確認

```
┌─────────────────────────────────────── ✅ 変換設定の確認 ───────────────────────────────────────┐
│                                                                                             │
│ 📂 入力ファイル                                                                                  │
│ └─ データベース: nd.db3 (142.5 MB)                                                                │
│                                                                                             │
│ 📁 出力設定                                                                                  │
│ ├─ 出力ディレクトリ: Primary/                                                                        │
│ ├─ プロシージャレッグディレクトリ: Primary/ProcedureLegs/                                                        │
│ └─ 圧縮ファイル: Primary.7z                                                                       │
│                                                                                             │
│ ⚙️ 変換パラメータ                                                                                  │
│ ├─ 開始ターミナルID: 1000                                                                        │
│ ├─ 座標精度: 小数点以下8桁                                                                        │
│ ├─ VNAVしきい値: 2.5°                                                                          │
│ └─ FAF検出: 有効                                                                           │
│                                                                                             │
│ 📊 処理予測                                                                                  │
│ ├─ テーブル数: 12個                                                                          │
│ ├─ 予測レコード数: 約156,000件                                                                    │
│ ├─ 予測時間: 5-8分                                                                       │
│ └─ 出力サイズ: 約15-25 MB                                                                      │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

変換を開始しますか？ [Y/n]: 
```

## 🔄 変換プロセスの監視

### データベース接続と最適化

```
╭─────────────────────────────────────── 🔗 データベース接続 ─────────────────────────────────────────╮
│                                                                                              │
│ データベースに接続中...                                                                            │
│                                                                                              │
│ 🔧 SQLite最適化設定を適用中:                                                                     │
│ ├─ journal_mode = WAL                                                                        │
│ ├─ synchronous = NORMAL                                                                      │
│ ├─ cache_size = 10000                                                                        │
│ ├─ temp_store = MEMORY                                                                       │
│ └─ mmap_size = 256MB                                                                         │
│                                                                                              │
│ ✅ データベース接続に成功しました。パフォーマンス最適化が有効になっています                             │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 標準データテーブルの処理

```
╭─────────────────────────────────────── 📊 標準データテーブルのエクスポート ────────────────────────────────────────╮
│                                                                                               │
│ 標準データテーブルを処理中...                                                                         │
│                                                                                               │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                             │
│                                                                                               │
│ 📋 完了:                                                                                    │
│ ✅ AirportLookup     (2,456 件のレコード) → AirportLookup.json     (156 KB)                       │
│ ✅ Airports          (15,234 件のレコード) → Airports.json          (2.3 MB)                       │
│ ✅ Runways          (28,456 件のレコード) → Runways.json           (3.1 MB)                        │
│ ✅ Waypoints        (89,123 件のレコード) → Waypoints.json         (8.7 MB)                        │
│ ✅ WaypointLookup   (89,123 件のレコード) → WaypointLookup.json    (4.2 MB)                       │
│ ✅ Navaids         (12,345 件のレコード) → Navaids.json           (1.8 MB)                         │
│ ✅ NavaidLookup     (12,345 件のレコード) → NavaidLookup.json     (685 KB)                         │
│ ✅ Airways          (1,234 件のレコード) → Airways.json            (145 KB)                        │
│                                                                                               │
│ 🔄 現在処理中: AirwayLegs → 航路区間データ変換中                                                      │
│                                                                                               │
╰───────────────────────────────────────────────────────────────────────────────────────────────╯
```

### ターミナルプロシージャの処理

```
╭─────────────────────────────────────── 🎯 ターミナルプロシージャを処理中 ───────────────────────────────────────╮
│                                                                                              │
│ ターミナルプロシージャデータを処理中...                                                                      │
│                                                                                              │
│ ████████████████████████████████████████ 245/350 (70%) ⏱️ 0:02:18                         │
│                                                                                              │
│ 📊 処理統計:                                                                                 │
│ ├─ 空港数: 145個                                                                          │
│ ├─ ターミナルプロシージャ数: 245個                                                                          │
│ ├─ SIDプロシージャ数: 89個                                                                           │
│ ├─ STARプロシージャ数: 76個                                                                          │
│ ├─ APPプロシージャ数: 80個                                                                           │
│ └─ FAFポイント検出: 234個                                                                        │
│                                                                                              │
│ 🔄 現在処理中: ZBAA (北京首都) → SHUAY1A SID                                                   │
│ 📁 出力: ProcedureLegs/TermID_1245.json                                                     │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### データ検証

```
╭─────────────────────────────────────── 🔍 データ検証 ───────────────────────────────────────────╮
│                                                                                              │
│ 変換結果を検証中...                                                                          │
│                                                                                              │
│ ████████████████████████████████████████ 11/11 (100%) ⏱️ 0:00:45                          │
│                                                                                              │
│ ✅ JSON形式検証                                                                             │
│ ├─ すべてのファイル形式が正しい                                                                          │
│ ├─ 文字エンコーディング: UTF-8                                                                          │
│ └─ 構文チェック通過                                                                              │
│                                                                                              │
│ ✅ データ整合性検証                                                                            │
│ ├─ 座標範囲チェック: 通過                                                                        │
│ ├─ 外部キー関係チェック: 通過                                                                        │
│ ├─ 重複データチェック: 3件の重複を発見 (削除済み)                                                    │
│ └─ ビジネスルールチェック: 通過                                                                        │
│                                                                                              │
│ ✅ FAFポイント検証                                                                                │
│ ├─ 234個のFAFポイントを検出                                                                     │
│ ├─ VNAV角度検証: 通過                                                                       │
│ └─ アプローチプロシージャ関連付け: 通過                                                                        │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### ファイルの圧縮とパッケージング

```
╭─────────────────────────────────────── 📦 圧縮ファイルを作成中 ─────────────────────────────────────────╮
│                                                                                              │
│ 7z圧縮ファイルを作成中...                                                                        │
│                                                                                              │
│ 🗜️ 圧縮設定:                                                                                │
│ ├─ アルゴリズム: LZMA2                                                                              │
│ ├─ レベル: 5 (標準)                                                                           │
│ ├─ ソリッド: 有効                                                                               │
│ └─ マルチスレッド: 有効                                                                             │
│                                                                                              │
│ ████████████████████████████████████████ 22.4/22.4 MB (100%) ⏱️ 0:01:23                   │
│                                                                                              │
│ ✅ 圧縮完了: Primary.7z                                                                     │
│ 📊 圧縮統計:                                                                                │
│ ├─ 元のサイズ: 22.4 MB                                                                        │
│ ├─ 圧縮後: 15.6 MB                                                                          │
│ ├─ 圧縮率: 69.6%                                                                            │
│ └─ ファイル数: 145個                                                                         │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

## ✅ 変換完了

### 成功の概要

```
╔══════════════════════════════════════════════════════════════╗
║                          変換成功                           ║
║                                                              ║
║  ✓ データ変換が正常に完了しました！                                        ║
║                                                              ║
║  📊 処理統計:                                                ║
║  • エクスポートされたテーブル: 11個                                          ║
║  • 処理されたレコード: 156,789件                                      ║
║  • ターミナルプロシージャ: 350個                                         ║
║  • FAFポイント: 234個                                           ║
║  • 空港数: 145個                                         ║
║                                                              ║
║  📁 出力ファイル: Primary.7z (15.6 MB)                          ║
║  🕒 総所要時間: 6分32秒                                       ║
║                                                              ║
║  TFDI MD-11でこのファイルを使用してナビゲーションを行うことができます。    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

📋 生成されたファイルリスト:
┌─────────────────────────────────────────┬─────────────┬─────────────┐
│ ファイル名                                  │ サイズ        │ レコード数      │
├─────────────────────────────────────────┼─────────────┼─────────────┤
│ Primary.7z                              │ 15.6 MB     │ -           │
│ ├─ AirportLookup.json                   │ 156 KB      │ 2,456       │
│ ├─ Airports.json                        │ 2.3 MB      │ 15,234      │
│ ├─ AirwayLegs.json                      │ 4.2 MB      │ 23,456      │
│ ├─ Airways.json                         │ 145 KB      │ 1,234       │
│ ├─ Ilses.json                           │ 892 KB      │ 5,678       │
│ ├─ NavaidLookup.json                    │ 685 KB      │ 12,345      │
│ ├─ Navaids.json                         │ 1.8 MB      │ 12,345      │
│ ├─ Runways.json                         │ 3.1 MB      │ 28,456      │
│ ├─ Terminals.json                       │ 1.2 MB      │ 8,945       │
│ ├─ WaypointLookup.json                  │ 4.2 MB      │ 89,123      │
│ ├─ Waypoints.json                       │ 8.7 MB      │ 89,123      │
│ └─ ProcedureLegs/ (145個のプロシージャファイル)       │ 2.1 MB      │ 12,340      │
└─────────────────────────────────────────┴─────────────┴─────────────┘

🔄 次のステップの推奨事項:
1. Primary.7zファイルを解凍します
2. JSONファイルをTFDI MD-11ナビゲーションデータディレクトリにインストールします
3. シミュレーターでナビゲーション機能をテストします
4. 復元できるように元のファイルをバックアップします

📝 使用手順:
• 圧縮ファイルの内容をTFDI MD-11ナビゲーションデータディレクトリにコピーします
• Microsoft Flight Simulatorを再起動します
• TFDI MD-11で新しいナビゲーションデータを確認します
```

## 💻 プログラミングによる使用

### 基本的な使用例

```python
from Fenix2TFDINavDataConverter import FenixToTFDIConverter, ConverterConfig

# 設定を作成
config = ConverterConfig(
    output_dir="TFDI_NavData",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# 変換ツールの初期化
converter = FenixToTFDIConverter(config)

# 変換を実行
try:
    result = converter.convert(
        database_path="path/to/fenix_navdata.db3",
        start_terminal_id=1000
    )
    
    if result.success:
        print(f"✅ 変換成功!")
        print(f"📁 出力ファイル: {result.output_archive}")
        print(f"📊 処理されたレコード: {result.total_records}")
        print(f"⏱️ 所要時間: {result.duration:.2f} 秒")
    else:
        print(f"❌ 変換失敗: {result.error_message}")
        
except Exception as e:
    print(f"💥 変換中に例外が発生しました: {e}")
```

### 高度な設定例

```python
# カスタム設定
custom_config = ConverterConfig(
    output_dir="Custom_Output",
    procedure_legs_dir="Custom_Output/Procedures",
    archive_name="TFDI_MD11_NavData_20241224.7z",
    coordinate_precision=10,        # 高精度座標
    vnav_threshold=2.0              # 厳密なFAF検出
)

# コールバック付きの変換
def progress_callback(step, progress, message):
    """変換進捗コールバック関数"""
    print(f"[{step}] {progress:.1f}% - {message}")

def validation_callback(validation_type, result, details):
    """検証結果コールバック関数"""
    status = "✅" if result else "❌"
    print(f"{status} {validation_type}: {details}")

converter = FenixToTFDIConverter(
    config=custom_config,
    progress_callback=progress_callback,
    validation_callback=validation_callback
)

result = converter.convert(
    database_path="fenix_navdata.db3",
    start_terminal_id=2000,
    validate_output=True,          # 出力検証を有効にする
    cleanup_temp_files=True        # 一時ファイルをクリーンアップする
)
```

### バッチ処理例

```python
import os
from pathlib import Path

def batch_convert_databases():
    """複数のデータベースをバッチ変換する"""
    
    database_files = [
        "fenix_navdata_2508.db3",
        "fenix_navdata_2509.db3", 
        "fenix_navdata_2510.db3"
    ]
    
    base_config = ConverterConfig(coordinate_precision=8)
    
    for i, db_file in enumerate(database_files):
        print(f"\n🔄 データベースを処理中 {i+1}/{len(database_files)}: {db_file}")
        
        # 各データベース用に独立した出力ディレクトリを作成
        airac_cycle = db_file.split('_')[-1].replace('.db3', '')
        output_config = ConverterConfig(
            output_dir=f"TFDI_NavData_{airac_cycle}",
            archive_name=f"TFDI_MD11_{airac_cycle}.7z",
            coordinate_precision=base_config.coordinate_precision,
            vnav_threshold=base_config.vnav_threshold
        )
        
        converter = FenixToTFDIConverter(output_config)
        
        try:
            result = converter.convert(
                database_path=db_file,
                start_terminal_id=1000 + (i * 1000)  # ID衝突を回避
            )
            
            if result.success:
                print(f"✅ {db_file} 変換成功")
            else:
                print(f"❌ {db_file} 変換失敗: {result.error_message}")
                
        except Exception as e:
            print(f"💥 {db_file} の処理中に例外が発生しました: {e}")

# バッチ変換を実行
batch_convert_databases()
```

## 🧪 検証とテスト

### 出力ファイルの検証

```python
def verify_conversion_output(archive_path):
    """変換出力を検証する"""
    import py7zr
    import json
    
    print(f"🔍 圧縮ファイルを検証中: {archive_path}")
    
    try:
        # 圧縮ファイルの整合性を検証
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            file_list = archive.getnames()
            
        print(f"✅ 圧縮ファイルには {len(file_list)} 個のファイルが含まれています")
        
        # 必須ファイルを検証
        required_files = [
            "Airports.json", "Runways.json", "Waypoints.json",
            "Navaids.json", "Airways.json", "AirwayLegs.json",
            "Terminals.json", "ILSes.json"
        ]
        
        missing_files = []
        for required_file in required_files:
            if required_file not in file_list:
                missing_files.append(required_file)
        
        if missing_files:
            print(f"❌ 必須ファイルが不足しています: {missing_files}")
            return False
        else:
            print("✅ すべての必須ファイルが存在します")
        
        # JSON形式を検証
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            for file_name in required_files:
                try:
                    file_data = archive.read([file_name])
                    json_content = json.loads(file_data[file_name].read())
                    print(f"✅ {file_name}: JSON形式が有効です")
                except json.JSONDecodeError as e:
                    print(f"❌ {file_name}: JSON形式エラー - {e}")
                    return False
        
        print("🎉 出力ファイルの検証に成功しました!")
        return True
        
    except Exception as e:
        print(f"❌ 検証失敗: {e}")
        return False

# 使用例
verify_conversion_output("Primary.7z")
```

### TFDI互換性テスト

```python
def test_tfdi_compatibility(json_file_path):
    """TFDI互換性をテストする"""
    import json
    
    print(f"🧪 TFDI互換性をテスト中: {json_file_path}")
    
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # データ構造をチェック
        if isinstance(data, dict):
            print(f"✅ データ構造: 辞書 ({len(data)} 個のエントリ)")
            
            # 座標形式をチェック (Waypointsを例として)
            if "Waypoints" in json_file_path or any(key for key in data.keys() if "latitude" in str(data[key]).lower()):
                coord_issues = []
                for key, value in list(data.items())[:5]:  # 最初の5つのエントリをチェック
                    if isinstance(value, dict):
                        if "Latitude" in value and "Longitude" in value:
                            lat = value["Latitude"]
                            lon = value["Longitude"]
                            
                            if not (-90 <= lat <= 90):
                                coord_issues.append(f"{key}: 緯度が範囲外 ({lat})")
                            if not (-180 <= lon <= 180):
                                coord_issues.append(f"{key}: 経度が範囲外 ({lon})")
                
                if coord_issues:
                    print(f"⚠️ 座標の問題: {coord_issues}")
                else:
                    print("✅ 座標形式チェック通過")
        
        elif isinstance(data, list):
            print(f"✅ データ構造: リスト ({len(data)} 個の要素)")
        
        else:
            print(f"⚠️ 不明なデータ構造: {type(data)}")
        
        print("✅ TFDI互換性テスト通過")
        return True
        
    except Exception as e:
        print(f"❌ 互換性テスト失敗: {e}")
        return False

# すべての出力ファイルをテスト
output_files = [
    "Primary/Airports.json",
    "Primary/Waypoints.json", 
    "Primary/Navaids.json"
]

for file_path in output_files:
    test_tfdi_compatibility(file_path)
```

## ⚠️ 注意事項とベストプラクティス

### 重要事項

1. **データバックアップ**: 変換前に元のFenixデータとTFDIデータをバックアップしてください
2. **バージョン互換性**: Fenix、TFDI、および変換ツールのバージョンが互換であることを確認してください
3. **システムリソース**: 大規模データベースの変換には十分なメモリとディスク容量が必要です
4. **権限チェック**: 十分なファイル読み書き権限があることを確認してください

### パフォーマンス最適化の推奨事項

```python
# システム最適化チェック
def check_system_optimization():
    """システム最適化の状態をチェックする"""
    import psutil
    
    print("🔧 システム最適化チェック:")
    
    # メモリをチェック
    memory = psutil.virtual_memory()
    if memory.available < 4 * 1024**3:  # 4GB
        print("⚠️ 利用可能なメモリが不足しています。他のプログラムを閉じることを推奨します")
    else:
        print("✅ メモリは十分です")
    
    # ディスクタイプをチェック
    disk_info = psutil.disk_usage('.')
    print(f"💿 ディスク空き容量: {disk_info.free // 1024**3} GB")
    
    # CPUをチェック
    cpu_count = psutil.cpu_count()
    print(f"🖥️ CPUコア数: {cpu_count}")
    
    if cpu_count >= 4:
        print("✅ マルチスレッド処理の有効化を推奨します")
    else:
        print("⚠️ シングルコア処理の場合、変換が遅くなる可能性があります")

check_system_optimization()
```

### トラブルシューティングチェックリスト

- [ ] ✅ Pythonバージョン ≥ 3.8
- [ ] ✅ すべての依存パッケージがインストールされていること
- [ ] ✅ Fenixデータベースファイルが完全で読み取り可能であること
- [ ] ✅ 十分な利用可能メモリ (4GB以上)
- [ ] ✅ 十分なディスク容量 (1GB以上)
- [ ] ✅ 出力ディレクトリに書き込み権限があること
- [ ] ✅ TFDI MD-11が正しくインストールされていること

---

**学習完了おめでとうございます！** 🎉

これで、TFDIナビゲーションデータ変換ツールの完全な使用方法を習得しました。問題が発生した場合は、[トラブルシューティングガイド](../troubleshooting.md) または [よくある質問](../faq.md) を参照してください。

楽しいフライトをお楽しみください！🚁✨