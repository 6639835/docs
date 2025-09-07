# 設定の説明

本文書では、Nav-data の各モジュールの設定オプションとパラメーター設定について詳しく説明します。

## 📋 設定ファイルの概要

### 主要設定ファイル
```
config/
├── main.conf           # メイン設定ファイル
├── airway.conf         # 航空路処理設定
├── pdf_extract.conf    # PDF抽出設定
├── terminal.conf       # ターミナルプログラム設定
└── paths.conf          # パス設定
```

### 環境変数設定
```bash
# .env ファイルの例
NAV_DATA_HOME=/path/to/nav-data
XPLANE_PATH=/path/to/X-Plane
LOG_LEVEL=INFO
```

## 🛣️ 航空路モジュール設定 (Airway)

### 設定ファイル：`config/airway.conf`

```ini
[General]
# 詳細ログを有効にする
verbose_logging = true

# プログレスバーを表示する
show_progress = true

# バッチサイズ
batch_size = 1000

[Input]
# CSV入力ファイルのパス
csv_file = RTE_SEG.csv

# X-Plane参照データファイル
earth_fix_file = earth_fix.dat
earth_nav_file = earth_nav.dat
earth_awy_file = earth_awy.dat

[Output]
# 出力ファイルのエンコーディング
output_encoding = utf-8

# 元ファイルをバックアップする
create_backup = true

# バックアップファイルのサフィックス
backup_suffix = .backup

[Filtering]
# 除外する空域区域コード（カンマ区切り）
excluded_areas = ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU

# 最小航空路区間長（海里）
min_segment_length = 0.1

# 最大航空路区間長（海里）
max_segment_length = 999.9

[Validation]
# データ検証を有効にする
enable_validation = true

# ナビゲーションポイント許容誤差（度）
coordinate_tolerance = 0.001

# 区域コード検証
validate_area_codes = true

[AIRAC]
# AIRACサイクルを自動計算する
auto_calculate_cycle = true

# AIRACサイクルを手動で指定する（形式：YYMM）
manual_cycle = 

# AIRAC基準日（ISO形式）
reference_date = 2025-01-23

# 基準サイクル
reference_cycle = 2501
```

### コード内の設定オプション

#### 航空路処理メインスクリプト設定
```python
# Airway/airway.py 設定例

# 中国空域コード設定
CHINA_AREAS = {
    'ZB',  # 北京飛行情報区
    'ZG',  # 広州飛行情報区
    'ZY',  # 瀋陽飛行情報区
    'ZS',  # 上海飛行情報区
    'ZW',  # ウルムチ飛行情報区
    'ZJ',  # 三亜飛行情報区
    'ZP',  # 蘭州飛行情報区
    'ZL',  # 昆明飛行情報区
    'ZH',  # 武漢飛行情報区
    'ZU'   # 成都飛行情報区
}

# ファイルパス設定
FILE_PATHS = {
    'csv_input': 'RTE_SEG.csv',
    'earth_fix': 'earth_fix.dat',
    'earth_nav': 'earth_nav.dat',
    'earth_awy': 'earth_awy.dat'
}

# ナビゲーションポイントタイプマッピング
NAVIGATION_TYPES = {
    'DESIGNATED_POINT': {'code': 'DESIGNATED_POINT', 'type_code': '11'},
    'VORDME': {'code': 'VORDME', 'type_code': '3'},
    'NDB': {'code': 'NDB', 'type_code': '2'}
}
```

## 📄 PDF抽出モジュール設定

### 設定ファイル：`config/pdf_extract.conf`

```ini
[General]
# 処理モード：auto（自動）、manual（手動）
processing_mode = auto

# 出力形式：txt、json、csv
output_format = txt

# 文字エンコーディング
encoding = utf-8

[PDF_Processing]
# PDF解析エンジン：pdfplumber、pypdf2
pdf_engine = pdfplumber

# ページトリミング余白（ピクセル）
crop_margin_top = 50
crop_margin_bottom = 50
crop_margin_left = 30
crop_margin_right = 30

# テキスト抽出閾値
text_confidence_threshold = 0.8

# 線検出閾値
line_detection_threshold = 5

[Coordinate_Extraction]
# 座標形式検証
coordinate_format_strict = true

# 座標精度（小数点以下の桁数）
coordinate_precision = 8

# 座標範囲検証（中国地域）
latitude_min = 15.0
latitude_max = 55.0
longitude_min = 70.0
longitude_max = 140.0

[Error_Handling]
# エラー発生時も処理を継続する
continue_on_error = true

# エラーログの詳細度
error_detail_level = high

# よくあるエラーを自動修復する
auto_fix_common_errors = true

[Output]
# 出力ファイル命名パターン
# 変数：{airport}, {type}, {timestamp}
filename_pattern = {airport}_{type}.txt

# 出力ディレクトリを作成する
create_output_dirs = true

# 既存ファイルを上書きする
overwrite_existing = false
```

### コード設定例

#### PDF処理設定
```python
# PDF extract/utils.py 設定

# ウェイポイントカテゴリ定義
WAYPOINT_CATEGORIES = {
    'ENRT': 1,      # 航空路ウェイポイント
    'VHF': 2,       # VHF航法施設
    'NDB': 3,       # NDB航法施設
    'TERMINAL': 4   # ターミナルエリアウェイポイント
}

# 座標処理精度
COORDINATE_PRECISION = 8

# 区域コード変換テーブル
AREA_CODE_TRANSLATION = {
    'KA': 'K1'  # 特殊区域コード変換
}

# エラー情報カラー設定（coloramaを使用）
COLOR_CONFIG = {
    'error': Fore.RED,
    'warning': Fore.YELLOW,
    'info': Fore.GREEN,
    'debug': Fore.CYAN
}
```

#### 座標抽出設定
```python
# PDF extract/waypoint_1_pdf.py 設定

# ページ処理設定
PAGE_PROCESSING = {
    'enable_text_lines': True,
    'debug_output': False,
    'max_lines_per_page': 1000
}

# 座標計算設定
COORDINATE_CALCULATION = {
    'precision_digits': 8,
    'handle_number_prefix': True,
    'auto_format_detection': True
}

# 文字処理設定
CHARACTER_PROCESSING = {
    'degree_symbol_replacement': '°',
    'minute_symbol_replacement': "'",
    'second_symbol_replacement': '"',
    'special_char_mapping': {"¡ã": '°'}
}
```

## 🔧 ターミナルプログラム設定 (Terminal Patch)

### 設定ファイル：`config/terminal.conf`

```ini
[Encoder]
# デフォルト入力パス
default_input_path = PDF extract/public

# デフォルト出力パス
default_output_path = PDF extract/output

# ファイルエンコーディング
file_encoding = utf-8

# エンコーディング検証を有効にする
enable_encoding_validation = true

[Processing_Rules]
# IFポイント識別ルール
if_point_markers = c

# エンコーディングルール
encoding_rules = {
    'if_line': 'E  A',
    'transition_middle': 'E   ',
    'transition_end': 'EE B',
    'main_approach_if': 'E  B',
    'faf_point': 'E  F',
    'missed_approach': 'E M ',
    'procedure_end': 'EE  ',
    'holding_end': 'EE H'
}

[ReEncoder]
# サポートされる空港コードプレフィックス
supported_airport_prefixes = ZB,ZG,ZL,ZU,ZW,ZY,ZJ,ZS,ZH,ZP

# ファイルエンコーディング検出
auto_detect_encoding = true

# エンコーディング修正ルール
fix_rules = {
    'appch_gy_m_rule': true,
    'pure_alpha_rule': true,
    'sid_runway_rule': true,
    'procedure_end_rule': true
}

[Validation]
# 形式検証
validate_format = true

# 滑走路識別子検証
validate_runway_identifiers = true

# プロシージャタイプ検証
validate_procedure_types = true
```

### エンコーダー設定例

```python
# Terminal Patch/terminal_encoder.py 設定

# プロシージャタイプ識別子
PROCEDURE_MARKERS = {
    'approach': 'c',
    'departure': 'd',
    'arrival': 'a'
}

# エンコーディングマッピング
ENCODING_MAPPINGS = {
    'IF_LINE': 'E  A',
    'TRANSITION_MIDDLE': 'E   ',
    'TRANSITION_END': 'EE B',
    'MAIN_APPROACH_IF': 'E  B', 
    'FAF_POINT': 'E  F',
    'MISSED_APPROACH_FIRST': 'E M ',
    'PROCEDURE_END': 'EE  ',
    'HOLDING_END': 'EE H'
}

# ファイル処理設定
FILE_PROCESSING = {
    'batch_mode': True,
    'show_progress': True,
    'create_backup': False,
    'output_encoding': 'utf-8'
}
```

## 🛩️ X-Plane CIFPモジュール設定

### 設定ファイル：`config/cifp.conf`

```ini
[General]
# X-Planeバージョン互換性
xplane_version = 12

# CIFPデータ形式バージョン
cifp_format_version = 1101

[Paths]
# 入力データパス
input_path = /Users/lujuncheng/Downloads/XP导航数据/编码重构

# 出力フォルダー
output_folder = /Users/lujuncheng/Downloads/XP导航数据/CIFP

# X-Planeインストールパス
xplane_path = /Users/lujuncheng/Downloads/xplane12_native_2502

# CSVデータフォルダー
csv_folder = /Users/lujuncheng/Downloads/NAIP2502

[Processing]
# 処理するプロシージャタイプ
process_departures = true
process_arrivals = true
process_approaches = true

# 滑走路情報処理
generate_runway_info = true

# プロシージャ混合モード
enable_procedure_mixing = true

[NavAid_Processing]
# VORデータファイル
vor_data_file = VOR.csv

# NDBデータファイル  
ndb_data_file = NDB.csv

# 周波数処理
frequency_conversion = true

# 高度単位変換（メートルからフィート）
altitude_conversion_factor = 3.28

[Waypoint_Processing]
# ウェイポイントタイプエンコーディング
waypoint_type_coding = true

# ARINC 424互換性
arinc424_compatibility = true

# 区域コード処理
process_area_codes = true

[Validation]
# 座標検証許容誤差
coordinate_tolerance = 0.2

# ウェイポイント識別子検証
validate_identifiers = true

# プロシージャ整合性チェック
validate_procedure_integrity = true
```

### ウェイポイントシステム設定

```python
# X-Plane CIFP/utils.py 設定

# ウェイポイントカテゴリ定義
WAYPOINT_CATEGORIES = {
    'UNAVAILABLE': -1,  # ステータス利用不可
    'WAYPOINT': 1,      # ウェイポイント
    'VHF_NAVAID': 2,    # VHF航法施設
    'NDB_NAVAID': 3     # NDB航法施設
}

# 座標比較許容誤差（度）
COORDINATE_TOLERANCE = 0.2

# 区域コードマッピング
AREA_CODE_MAPPING = {
    # 中国飛行情報区コード
    'ZBPE': 'ZB',  # 北京
    'ZGZU': 'ZG',  # 広州
    'ZYSH': 'ZY',  # 瀋陽
    'ZSHA': 'ZS',  # 上海
    'ZWUQ': 'ZW',  # ウルムチ
    'ZJSA': 'ZJ',  # 三亜
    'ZLHW': 'ZL',  # 蘭州
    'ZUCK': 'ZU',  # 成都
    'ZHWH': 'ZH'   # 武漢
}
```

## 📊 データ処理設定

### CSVデータ設定

```python
# 共通CSV処理設定
CSV_CONFIG = {
    'encoding': 'gbk',          # 中国語CSVは通常GBKエンコーディングを使用
    'delimiter': ',',
    'quotechar': '"',
    'skipinitialspace': True,
    'na_values': ['', 'N/A', 'NULL', '0.0']
}

# 必須CSVフィールド
REQUIRED_CSV_FIELDS = {
    'airway': [
        'CODE_POINT_START', 'CODE_TYPE_START',
        'CODE_POINT_END', 'CODE_TYPE_END', 
        'CODE_DIR', 'TXT_DESIG'
    ],
    'airport': [
        'CODE_AIRPORT', 'GEO_LAT', 'GEO_LONG', 
        'ELEVATION', 'TXT_NAME'
    ],
    'runway': [
        'CODE_AIRPORT', 'TXT_DESIG', 'GEO_LAT_START',
        'GEO_LONG_START', 'GEO_LONG_END', 'GEO_LONG_END'
    ]
}
```

### データベース設定
```python
# X-Plane CIFP/データベース.py 設定

DATABASE_CONFIG = {
    'connection_timeout': 30,
    'auto_commit': True,
    'encoding': 'utf-8',
    'journal_mode': 'WAL',  # SQLite最適化
    'synchronous': 'NORMAL'
}

# データテーブル構造
TABLE_SCHEMAS = {
    'waypoints': {
        'id': 'INTEGER PRIMARY KEY',
        'ident': 'TEXT NOT NULL',
        'latitude': 'REAL NOT NULL', 
        'longitude': 'REAL NOT NULL',
        'type': 'INTEGER',
        'airport': 'TEXT',
        'area': 'TEXT'
    }
}
```

## 🔧 ログ設定

### ログ設定ファイル：`config/logging.conf`

```ini
[loggers]
keys=root,airway,pdf_extract,terminal,cifp

[handlers] 
keys=consoleHandler,fileHandler,rotatingFileHandler

[formatters]
keys=standardFormatter,detailedFormatter

[logger_root]
level=INFO
handlers=consoleHandler,rotatingFileHandler

[logger_airway]
level=DEBUG
handlers=fileHandler
qualname=airway
propagate=0

[logger_pdf_extract]
level=INFO
handlers=fileHandler
qualname=pdf_extract
propagate=0

[logger_terminal]
level=INFO
handlers=fileHandler
qualname=terminal
propagate=0

[logger_cifp]
level=DEBUG
handlers=fileHandler
qualname=cifp
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=standardFormatter
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=detailedFormatter
args=('logs/nav-data.log', 'a')

[handler_rotatingFileHandler]
class=handlers.RotatingFileHandler
level=INFO
formatter=standardFormatter
args=('logs/nav-data-rotating.log', 'a', 10485760, 5)

[formatter_standardFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=%Y-%m-%d %H:%M:%S

[formatter_detailedFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(funcName)s() - %(message)s
datefmt=%Y-%m-%d %H:%M:%S
```

### Pythonログ設定例

```python
import logging
import logging.config
from pathlib import Path

# ログ設定をロードする
def setup_logging(config_path='config/logging.conf'):
    """ログ設定をセットアップする"""
    if Path(config_path).exists():
        logging.config.fileConfig(config_path)
    else:
        # デフォルト設定
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('logs/nav-data.log')
            ]
        )

# 各モジュールのロガー
def get_logger(name):
    """モジュール専用のロガーを取得する"""
    return logging.getLogger(name)

# 使用例
logger = get_logger('airway')
logger.info('航空路処理開始')
```

## ⚙️ パフォーマンス最適化設定

### メモリ管理設定
```python
# メモリ使用量の最適化
MEMORY_CONFIG = {
    'chunk_size': 10000,        # チャンク処理サイズ
    'max_memory_usage': '2GB',  # 最大メモリ使用量
    'garbage_collection': True, # ガベージコレクションを有効にする
    'buffer_size': 8192        # ファイル読み取りバッファ
}

# 並行処理設定
CONCURRENCY_CONFIG = {
    'max_workers': 4,           # 最大ワーカー数
    'enable_multiprocessing': False, # マルチプロセス処理
    'thread_pool_size': 2       # スレッドプールサイズ
}
```

### キャッシュ設定
```python
# キャッシュ設定
CACHE_CONFIG = {
    'enable_cache': True,
    'cache_size': 1000,
    'cache_ttl': 3600,          # キャッシュ生存時間（秒）
    'cache_directory': 'cache/'
}
```

## 🔍 設定検証

### 設定検証スクリプト

`validate_config.py`を作成：

```python
#!/usr/bin/env python3
"""
設定ファイル検証スクリプト
"""
import configparser
import os
import sys
from pathlib import Path

def validate_airway_config(config_file):
    """航空路モジュール設定を検証する"""
    config = configparser.ConfigParser()
    config.read(config_file)
    
    errors = []
    
    # 必須セクションのチェック
    required_sections = ['General', 'Input', 'Output', 'Filtering']
    for section in required_sections:
        if section not in config:
            errors.append(f"設定セクションが見つかりません: [{section}]")
    
    # ファイルパスのチェック
    if 'Input' in config:
        for key in ['csv_file', 'earth_fix_file', 'earth_nav_file']:
            if key in config['Input']:
                file_path = config['Input'][key]
                if not os.path.exists(file_path):
                    errors.append(f"ファイルが存在しません: {file_path}")
    
    return errors

def validate_all_configs():
    """全ての設定ファイルを検証する"""
    config_dir = Path('config')
    if not config_dir.exists():
        print("❌ 設定ディレクトリが存在しません")
        return False
    
    config_files = {
        'airway.conf': validate_airway_config,
        # 追加の設定検証関数を追加可能
    }
    
    all_valid = True
    for config_file, validator in config_files.items():
        config_path = config_dir / config_file
        if config_path.exists():
            errors = validator(str(config_path))
            if errors:
                print(f"❌ {config_file} 設定エラー:")
                for error in errors:
                    print(f"   - {error}")
                all_valid = False
            else:
                print(f"✅ {config_file} 設定が正しいです")
        else:
            print(f"⚠️  {config_file} 設定ファイルが存在しません（デフォルト値を使用します）")
    
    return all_valid

if __name__ == "__main__":
    if validate_all_configs():
        print("\n🎉 全ての設定検証が成功しました！")
        sys.exit(0)
    else:
        print("\n❌ 設定検証に失敗しました。上記の問題を修正してください。")
        sys.exit(1)
```

## 📚 設定のベストプラクティス

### 1. 設定ファイル管理
- バージョン管理を使用して設定ファイルを管理する
- 環境ごとに異なる設定ファイルを作成する
- 重要な設定を定期的にバックアップする

### 2. セキュリティ上の考慮事項
- 設定ファイルに機密情報を保存しない
- 環境変数を使用してパスなどの可変情報を保存する
- 適切なファイル権限を設定する

### 3. パフォーマンス最適化
- システムリソースに基づいてバッチサイズを調整する
- メモリ使用制限を適切に設定する
- 適切なキャッシュメカニズムを有効にする

### 4. エラー処理
- 全ての主要設定項目にデフォルト値を設定する
- 設定検証メカニズムを実装する
- 明確なエラー情報を提供する

---

**設定完了！** 🎯 これで、特定の要件に基づいて各モジュールの設定パラメーターを調整できます。初回使用前に設定検証スクリプトを実行して、設定が正しいことを確認することをお勧めします。