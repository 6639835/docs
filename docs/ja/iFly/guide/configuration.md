# ⚙️ iFly ナビゲーションデータコンバーター 設定ガイド

このガイドでは、iFly ナビゲーションデータコンバーターの様々な設定オプションについて詳しく説明し、お客様のニーズに合わせて変換プロセスを最適化するのに役立ちます。

## 🎯 設定概要

コンバーターは、以下の柔軟な設定システムを提供します。
- **📁 パス設定** - 入力および出力パスのカスタマイズ
- **📊 処理パラメータ** - データ処理の精度と範囲の調整
- **⚡ パフォーマンス最適化** - メモリと処理速度の最適化
- **🔍 検証オプション** - データ整合性検証設定

## 📋 設定方法

### 1. 対話型設定 (推奨)
```bash
# コンバーターを実行し、プロンプトに従って設定します
python main.py
```

### 2. 設定ファイル
`config.json` ファイルを作成します。
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "ifly_path": "/path/to/ifly-aircraft-737max8",
    "terminal_id_start": 1000,
    "coordinate_precision": 8,
    "enable_validation": true
}
```

### 3. 環境変数
```bash
export IFLY_FENIX_DB="/path/to/nd.db3"
export IFLY_CSV_FILE="/path/to/RTE_SEG.csv"
export IFLY_INSTALL_PATH="/path/to/ifly-aircraft-737max8"
```

## 🔧 主要設定オプション

### ファイルパス設定

#### Fenix データベースパス
**パラメータ名**: `fenix_db_path`  
**説明**: Fenix A320 ナビゲーションデータベースファイルの場所  
**デフォルト値**: 自動検出  

**一般的な場所:**
```bash
# Windows
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# カスタムパスの例
/Users/username/Documents/Fenix/navdata/nd.db3
```

**検証方法:**
```python
import sqlite3
def validate_fenix_db(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        required_tables = ['Airports', 'Runways', 'Waypoints', 'Terminals']
        return all(table in tables for table in required_tables)
    except Exception as e:
        print(f"データベース検証失敗: {e}")
        return False
```

#### NAIP CSV ファイルパス
**パラメータ名**: `csv_file_path`  
**説明**: 中国民用航空路区間データファイル  
**フォーマット要件**: UTF-8 エンコーディングの CSV ファイル  

**ファイル構造の例:**
```csv
ROUTE_ID,SEQUENCE_NUMBER,WAYPOINT_ID,LATITUDE,LONGITUDE,MAG_VARIATION
A1,1,ZSAM,39.916667,116.383333,7.2
A1,2,VOR01,39.833333,116.500000,7.1
```

**必須列:**
- `WAYPOINT_ID`: ウェイポイント識別子
- `LATITUDE`: 緯度 (十進度)
- `LONGITUDE`: 経度 (十進度)
- `ROUTE_ID`: 航路識別子

#### iFly インストールパス
**パラメータ名**: `ifly_path`  
**説明**: iFly 737 MAX 8 のインストールディレクトリ  
**自動検出**: 対応  

**検出順序:**
1. Community パッケージ: `Community\ifly-aircraft-737max8\`
2. Official パッケージ: `Official\asobo-aircraft-ifly-737max8\`
3. 手動でパスを指定

## ⚙️ 処理パラメータ設定

### ターミナル手順 ID 範囲

#### 開始 ID 設定
**パラメータ名**: `terminal_id_start`  
**説明**: ターミナル手順の開始 ID 番号  
**デフォルト値**: `1000`  
**範囲**: `1 - 9999`  

**設定の推奨事項:**
```python
# 空港数に応じて設定
small_airports = 1000   # < 50 空港
medium_airports = 2000  # 50-200 空港  
large_airports = 5000   # > 200 空港
```

#### ID 割り当て戦略
```python
def calculate_terminal_ids(airport_count, start_id=1000):
    """ターミナル手順 ID 割り当てを計算"""
    # 各空港に20個のIDを予約
    id_per_airport = 20
    total_ids_needed = airport_count * id_per_airport
    
    if start_id + total_ids_needed > 9999:
        print("⚠️ 警告: ID範囲が不足する可能性があります")
        return start_id, 9999
    
    return start_id, start_id + total_ids_needed
```

### 座標精度設定

#### 精度設定
**パラメータ名**: `coordinate_precision`  
**説明**: 座標の小数点以下の桁数  
**デフォルト値**: `8`  
**範囲**: `4 - 12`  

**精度比較:**
| 精度 | 誤差範囲 | 適用シーン |
|------|----------|----------|
| 4桁 | 約11メートル | 基本ナビゲーション |
| 6桁 | 約1.1メートル | 標準ナビゲーション |
| 8桁 | 約1.1センチメートル | 高精度ナビゲーション |
| 10桁 | 約1.1ミリメートル | 超高精度 |

**設定例:**
```python
# 異なる精度の座標例
coord_4 = 39.9167  # 4桁精度
coord_6 = 39.916667  # 6桁精度  
coord_8 = 39.91666700  # 8桁精度
```

### 磁気偏角計算設定

#### WMM モデルパラメータ
**モデルバージョン**: WMM-2025  
**更新頻度**: 5年ごと  
**計算精度**: 0.1度  

**計算パラメータ:**
```python
{
    "model_year": 2025,
    "altitude": 0,  # 海抜高度 (メートル)
    "calculation_date": "auto",  # 現在の日付を自動的に使用
    "use_local_time": true  # ローカル時間を使用
}
```

#### 磁気偏角検証
```python
def validate_magnetic_declination(declination):
    """磁気偏角値の妥当性を検証"""
    # 世界の磁気偏角範囲は約 -30° から +30°
    if -30.0 <= declination <= 30.0:
        return True
    else:
        print(f"⚠️ 異常な磁気偏角値: {declination}°")
        return False
```

## 🚀 パフォーマンス最適化設定

### メモリ管理

#### バッチサイズ
**パラメータ名**: `batch_size`  
**説明**: 単一バッチで処理するレコード数  
**デフォルト値**: `1000`  
**推奨設定:**

```python
# 利用可能なメモリに応じて調整
import psutil

def get_optimal_batch_size():
    available_memory = psutil.virtual_memory().available
    memory_gb = available_memory / (1024**3)
    
    if memory_gb < 4:
        return 500   # 4GB未満
    elif memory_gb < 8:
        return 1000  # 4-8GB
    else:
        return 2000  # 8GB以上
```

#### メモリ監視
```python
def monitor_memory_usage():
    """メモリ使用状況を監視"""
    import psutil
    memory = psutil.virtual_memory()
    print(f"メモリ使用率: {memory.percent}%")
    print(f"利用可能なメモリ: {memory.available / (1024**2):.1f} MB")
```

### 並行処理設定

#### スレッド数設定
**パラメータ名**: `max_workers`  
**説明**: 最大並行スレッド数  
**デフォルト値**: CPUコア数  

**設定戦略:**
```python
import os

def get_optimal_workers():
    cpu_count = os.cpu_count()
    
    # システムのために1つのコアを予約
    if cpu_count <= 2:
        return 1
    elif cpu_count <= 4:
        return cpu_count - 1
    else:
        return min(cpu_count - 2, 8)  # 最大8スレッド
```

#### I/O最適化
```python
{
    "use_ssd_optimization": true,    # SSD最適化
    "buffer_size": 8192,            # バッファサイズ (バイト)
    "enable_compression": false,     # 一時ファイル圧縮
    "temp_dir": "/tmp"              # 一時ディレクトリ
}
```

## 🔍 検証と品質管理

### データ検証設定

#### 検証レベル
**パラメータ名**: `validation_level`  
**説明**: データ検証の強度  
**オプション**: `basic`, `standard`, `strict`  

**検証内容:**
```python
validation_levels = {
    "basic": [
        "file_existence",
        "basic_format_check"
    ],
    "standard": [
        "file_existence", 
        "format_validation",
        "coordinate_range_check",
        "database_integrity"
    ],
    "strict": [
        "file_existence",
        "format_validation", 
        "coordinate_range_check",
        "database_integrity",
        "data_consistency_check",
        "cross_reference_validation"
    ]
}
```

#### エラー処理戦略
**パラメータ名**: `error_handling`  
**オプション**: `stop`, `skip`, `fix`  

```python
error_strategies = {
    "stop": "エラー発生時に即座に停止",
    "skip": "エラーのあるレコードをスキップして処理を続行", 
    "fix": "エラーの自動修復を試行"
}
```

### 出力品質管理

#### ファイル命名規則
```python
output_naming = {
    "use_timestamp": true,          # タイムスタンプを使用
    "include_version": true,        # バージョン番号を含める
    "airac_suffix": true,          # AIRACサフィックスを追加
    "backup_original": true        # 元のファイルをバックアップ
}

# 生成されるファイル名の例:
# WPNAVRTE_2024-12-15_v2.0_2508.txt
# FMC_Ident_2024-12-15_v2.0_2508.txt
```

## 📅 AIRACサイクル設定

### 自動計算設定
**パラメータ名**: `airac_auto_calculate`  
**デフォルト値**: `true`  
**タイムゾーン**: UTC+8 (北京時間)  

```python
airac_config = {
    "auto_calculate": true,
    "timezone": "Asia/Shanghai",
    "reference_date": "2024-01-11",  # AIRAC 2401 開始日
    "cycle_days": 28,                # 標準サイクル日数
    "format": "YYWW"                # フォーマット: YYWW
}
```

### 手動設定
```python
# AIRACサイクルを手動で指定
manual_airac = {
    "cycle": "2508",
    "effective_date": "2025-02-20",
    "expiry_date": "2025-03-19"
}
```

## 🎛️ 高度な設定

### ロギング設定
```python
logging_config = {
    "level": "INFO",               # DEBUG, INFO, WARNING, ERROR
    "file": "converter.log",       # ログファイル名
    "max_size": "10MB",           # 最大ファイルサイズ
    "backup_count": 3,            # バックアップファイル数
    "format": "%(asctime)s - %(levelname)s - %(message)s"
}
```

### UI設定
```python
ui_config = {
    "theme": "dark",              # テーマ: dark, light, auto
    "progress_style": "bar",      # プログレスバースタイル: bar, spinner
    "color_scheme": "rich",       # 配色スキーム
    "show_details": true,         # 詳細を表示
    "animation": true            # アニメーション効果を有効にする
}
```

### デバッグ設定
```python
debug_config = {
    "enable_debug": false,        # デバッグモードを有効にする
    "save_intermediate": false,   # 中間結果を保存
    "verbose_logging": false,     # 詳細ログ
    "performance_profiling": false, # パフォーマンスプロファイリング
    "memory_tracking": false     # メモリ追跡
}
```

## 📝 設定ファイルテンプレート

### 完全な設定例
```json
{
    "paths": {
        "fenix_db_path": "auto_detect",
        "csv_file_path": "./data/RTE_SEG.csv",
        "ifly_path": "auto_detect",
        "output_backup_dir": "./backup"
    },
    "processing": {
        "terminal_id_start": 1000,
        "coordinate_precision": 8,
        "batch_size": 1000,
        "max_workers": 4
    },
    "magnetic": {
        "model_year": 2025,
        "altitude": 0,
        "use_local_time": true
    },
    "airac": {
        "auto_calculate": true,
        "timezone": "Asia/Shanghai",
        "format": "YYWW"
    },
    "validation": {
        "validation_level": "standard",
        "error_handling": "skip",
        "enable_validation": true
    },
    "output": {
        "use_timestamp": true,
        "include_version": true,
        "airac_suffix": true,
        "backup_original": true
    },
    "logging": {
        "level": "INFO",
        "file": "converter.log",
        "max_size": "10MB",
        "backup_count": 3
    },
    "ui": {
        "theme": "dark",
        "progress_style": "bar",
        "show_details": true,
        "animation": true
    }
}
```

### 最小限の設定例
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "terminal_id_start": 1000
}
```

## 🛠️ 設定ツール

### 設定検証スクリプト
```python
def validate_config(config_path):
    """設定ファイルの有効性を検証"""
    import json
    import jsonschema
    
    # 設定スキーマ
    schema = {
        "type": "object",
        "properties": {
            "fenix_db_path": {"type": "string"},
            "csv_file_path": {"type": "string"},
            "terminal_id_start": {"type": "integer", "minimum": 1, "maximum": 9999}
        },
        "required": ["fenix_db_path", "csv_file_path"]
    }
    
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        jsonschema.validate(config, schema)
        print("✅ 設定検証が成功しました")
        return True
    except Exception as e:
        print(f"❌ 設定検証が失敗しました: {e}")
        return False
```

### 設定ジェネレーター
```python
def generate_config_template():
    """設定テンプレートを生成"""
    template = {
        "fenix_db_path": "请输入 Fenix データベースパス",
        "csv_file_path": "请输入 CSV ファイルパス", 
        "ifly_path": "auto_detect",
        "terminal_id_start": 1000,
        "coordinate_precision": 8
    }
    
    with open('config_template.json', 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)
    
    print("設定テンプレートが生成されました: config_template.json")
```

---

**次のステップ**: 設定が完了したら、[使用方法](usage.md) を参照して最初のデータ変換を開始してください！🚀
