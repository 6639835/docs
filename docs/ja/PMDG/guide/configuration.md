# ⚙️ 設定説明

本ガイドでは、Nav-data のデータソース、ファイルパス、および処理パラメータを設定し、ツールが航空ナビゲーションデータを正しく処理できるようにする方法を詳しく説明します。

## 📋 設定概要

Nav-data は、以下の種類のデータソースを設定する必要があります。
- **NAIP データ** - 中国民間航空情報処理システムデータ (CSV形式)
- **X-Plane データ** - X-Plane ナビゲーションデータファイル (DAT形式)
- **CIFP データ** - 符号化計器飛行方式データ (DAT形式)
- **出力設定** - 生成されたデータベースとログファイルの場所

## 🗂️ データソース詳細

### 1. NAIP データソース (中国民間航空データ)

NAIP (National Aeronautical Information Processing) データには、中国地域の公式航空情報が含まれます。

#### 必須ファイルリスト
```
data/input/naip/
├── AD_HP.csv              # 空港基本データ (空港位置、磁気偏差)
├── RWY_DIRECTION.csv      # 滑走路方向情報
├── RWY.csv                # 滑走路詳細情報 (長さ、幅、表面)
└── RTE_SEG.csv            # 航空路区間データ
```

#### ファイル形式要件
- **エンコーディング**: Latin-1 (ISO-8859-1)
- **区切り文字**: コンマ (,)
- **改行コード**: Windows (CRLF) または Unix (LF)

#### 主要フィールド説明

**AD_HP.csv** - 空港データ:
- `CODE_ID`: 4文字のICAOコード (例: ZBAA)
- `GEO_LAT_ACCURACY`: 緯度 (DMS形式: N390308.00)
- `GEO_LONG_ACCURACY`: 経度 (DMS形式: E1162930.00)
- `VAL_MAG_VAR`: 磁気偏差値

**RWY.csv** - 滑走路データ:
- `CODE_ID`: 空港ICAOコード
- `TXT_DESIG`: 滑走路識別子 (例: 18L/36R)
- `VAL_LEN`: 滑走路長 (メートル)
- `VAL_WID`: 滑走路幅 (メートル)

**RTE_SEG.csv** - 航空路データ:
- `TXT_DESIG`: 航空路識別子 (例: A1, G212)
- `CODE_POINT_START`: 起点識別子
- `CODE_TYPE_START`: 地点タイプ (DESIGNATED_POINT, VORDME, NDB)
- `VAL_MAG_TRACK`: 磁方位 (度)
- `VAL_LEN`: 航路区間長 (キロメートル)

### 2. X-Plane データソース

X-Plane は、高品質なナビゲーションデータを世界規模で提供します。

#### 必須ファイル
```
data/input/xplane/
├── earth_fix.dat          # 全世界のウェイポイントデータ
└── earth_nav.dat          # VOR/DME/NDB/ILSデータ
```

#### データ形式説明

**earth_fix.dat** 形式:
```
緯度 経度 識別子 地域コード ICAOコード タイプ
39.051639 116.497222 ADNAP ZZZZ ZB DESIGNATED_POINT
```

**earth_nav.dat** 形式:
```
タイプ 緯度 経度 標高 周波数 航続距離 磁気偏差 識別子 地域コード ICAOコード 名称 機器タイプ
3 39.051639 116.497222 35 11030 130 -6.0 BJK ENRT ZB BEIJING VOR/DME
```

#### サポートされるICAO地域コード
```python
# 現在サポートされている中国地域コード
VALID_ICAO_CODES = {
    'ZB',  # 華北地区
    'ZG',  # 広州地区  
    'ZS',  # 上海地区
    'ZJ',  # 新疆地区
    'ZY',  # 中南地区
    'ZL',  # 蘭州地区
    'ZH',  # 黒竜江地区
    'ZU',  # ウルムチ地区
    'ZP',  # 昆明地区
    'ZW'   # 西蔵地区
}
```

### 3. CIFP データソース (飛行方式)

CIFP (Coded Instrument Flight Procedures) には、標準計器飛行方式が含まれます。

#### ファイル構造
```
data/input/cifp/
├── ZBAA.dat              # 北京首都空港方式
├── ZSPD.dat              # 上海浦東空港方式
├── ZGGG.dat              # 広州白雲空港方式
└── [空港ICAOコード].dat     # その他の空港方式ファイル
```

#### 方式タイプ
- **SID** - 標準計器出発方式 (Standard Instrument Departure)
- **STAR** - 標準到着経路 (Standard Terminal Arrival Route)  
- **APPCH** - 計器進入方式 (Instrument Approach)

#### データ形式例
```
SID:010,D,ABING1,T,ZBAA,ABING,ZB,001,IF,L,0.30,IF,,-6.0,ZBAA,0,0,0,270.0,0,D,+,1700,,,,,0.0,,ABING,,J
```

### 4. 参照データファイル

#### 空港名ルックアップファイル
```
data/input/Airport.dat

形式：
ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL
ZGGG GUANGZHOU/BAIYUN INTL
```

## 🔧 設定ファイル設定

### 1. パス設定

各 Python モジュールにはパス設定が含まれており、実際の環境に合わせて調整する必要があります。

#### PMDG_APT.py 設定例
```python
# 空港データ処理設定
csv_file_path = r'/path/to/naip/AD_HP.csv'
lookup_txt_file_path = r'/path/to/Airport.dat'
output_db_path = r'/path/to/output/e_dfd_PMDG.s3db'
missing_airports_path = r'/path/to/logs/missing_airports_data.txt'
```

#### PMDG_RUNWAY.py 設定例
```python
# 滑走路データ処理設定
path_to_first_csv = r'/path/to/naip/RWY_DIRECTION.csv'
path_to_second_csv = r'/path/to/naip/RWY.csv'
path_to_magvar_csv = r'/path/to/naip/AD_HP.csv'
output_db3_path = r'/path/to/output/e_dfd_PMDG.s3db'
earth_nav_dat_path = r'/path/to/xplane/earth_nav.dat'
```

#### 方式データ設定例
```python
# SID/STAR/APPCH 方式設定
source_dat_directory = '/path/to/cifp/'
earth_fix_path = '/path/to/xplane/earth_fix.dat'
earth_nav_path = '/path/to/xplane/earth_nav.dat'
db_path = '/path/to/output/e_dfd_PMDG.s3db'
```

### 2. 設定管理スクリプトの作成

管理を容易にするため、統一された設定ファイルを作成することをお勧めします。

```python
# config/paths.py
import os

# 基本パス
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INPUT_DIR = os.path.join(DATA_DIR, 'input')
OUTPUT_DIR = os.path.join(DATA_DIR, 'output')
LOGS_DIR = os.path.join(BASE_DIR, 'logs')

# NAIP データパス
NAIP_DIR = os.path.join(INPUT_DIR, 'naip')
NAIP_FILES = {
    'airports': os.path.join(NAIP_DIR, 'AD_HP.csv'),
    'runway_direction': os.path.join(NAIP_DIR, 'RWY_DIRECTION.csv'),
    'runway_data': os.path.join(NAIP_DIR, 'RWY.csv'),
    'route_segments': os.path.join(NAIP_DIR, 'RTE_SEG.csv')
}

# X-Plane データパス
XPLANE_DIR = os.path.join(INPUT_DIR, 'xplane')
XPLANE_FILES = {
    'waypoints': os.path.join(XPLANE_DIR, 'earth_fix.dat'),
    'navigation': os.path.join(XPLANE_DIR, 'earth_nav.dat')
}

# CIFP データパス
CIFP_DIR = os.path.join(INPUT_DIR, 'cifp')

# 出力ファイルパス
OUTPUT_DATABASE = os.path.join(OUTPUT_DIR, 'e_dfd_PMDG.s3db')

# 参照ファイル
AIRPORT_LOOKUP = os.path.join(INPUT_DIR, 'Airport.dat')

# ログファイルパス
LOG_FILES = {
    'missing_airports': os.path.join(LOGS_DIR, 'missing_airports_data.txt'),
    'ils_processing': os.path.join(LOGS_DIR, 'PMDG_ILS.log'),
    'airway_processing': os.path.join(LOGS_DIR, 'PMDG_AWY_NEW.log'),
    'validation': os.path.join(LOGS_DIR, 'db_validation.log')
}

# MSFS インストールパス (ユーザーによるカスタマイズが必要)
MSFS_COMMUNITY_PATHS = {
    'microsoft_store': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community',
    'steam': r'C:\Users\{username}\AppData\Roaming\Microsoft Flight Simulator\Packages\Community',
    'xbox_gamepass': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community'
}
```

## ⚡ パフォーマンス設定

### 1. メモリ最適化設定

大規模なデータセットの場合、バッチサイズを調整できます。

```python
# PMDG_TMA_WAYPOINT.py 内のバッチ処理設定
BATCH_SIZE = 1000  # デフォルトのバッチサイズ
MAX_MEMORY_MB = 2048  # 最大メモリ使用量 (MB)

# 利用可能なメモリに応じて調整
import psutil
available_memory = psutil.virtual_memory().available / (1024 * 1024)
if available_memory > 8192:  # 8GB以上
    BATCH_SIZE = 5000
elif available_memory > 4096:  # 4GB以上
    BATCH_SIZE = 2000
```

### 2. 並行処理設定

```python
# PMDG_AWY_FINAL.py 内の並行処理設定
MAX_WORKERS = 50  # 最大並行スレッド数

# CPUコア数に応じて調整
import multiprocessing
cpu_count = multiprocessing.cpu_count()
MAX_WORKERS = min(50, cpu_count * 2)
```

### 3. データベース最適化設定

```python
# SQLite パフォーマンス最適化設定
DATABASE_PRAGMAS = {
    'journal_mode': 'DELETE',    # 互換モード
    'synchronous': 'FULL',       # 完全同期
    'foreign_keys': 'ON',        # 外部キー制約を有効にする
    'cache_size': 10000,         # キャッシュページ数
    'temp_store': 'MEMORY'       # 一時テーブルをメモリに保存
}
```

## 🗺️ 地理座標系設定

### 1. 座標形式変換

Nav-data は複数の座標形式間の変換をサポートしています。

```python
# DMS (度分秒) 形式変換設定
DMS_FORMATS = {
    'latitude': 'NDDMMSS.ss',   # 例: N390308.00
    'longitude': 'EDDDMMSS.ss'  # 例: E1162930.00
}

# 精度設定
COORDINATE_PRECISION = 8  # 小数点以下の桁数
```

### 2. 磁気偏差計算設定

```python
# 磁気モデル設定
MAGNETIC_MODEL = {
    'coefficients_file': 'wmm/WMMHR_2025.COF',
    'high_resolution': True,
    'epoch': 2025.0
}
```

## 📊 データ検証設定

### 1. データ品質チェック

```python
# データ検証設定
VALIDATION_CONFIG = {
    'check_duplicates': True,
    'validate_coordinates': True,
    'check_icao_codes': True,
    'verify_references': True,
    'generate_reports': True
}

# ICAOコード検証
VALID_ICAO_PATTERN = r'^Z[BGJLHUPYW][A-Z]{2}$'

# 座標範囲検証 (中国地域)
COORDINATE_BOUNDS = {
    'latitude': {'min': 15.0, 'max': 55.0},   # 北緯15°～55°
    'longitude': {'min': 70.0, 'max': 140.0}  # 東経70°～140°
}
```

### 2. エラー処理設定

```python
# エラー処理戦略
ERROR_HANDLING = {
    'missing_data': 'log',      # log | skip | raise
    'invalid_coordinates': 'skip',
    'duplicate_records': 'log',
    'reference_not_found': 'log'
}
```

## 🔍 デバッグ設定

### 1. ログレベル設定

```python
# ロギング設定
LOGGING_CONFIG = {
    'level': 'INFO',            # DEBUG | INFO | WARNING | ERROR
    'format': '%(asctime)s - %(levelname)s - %(message)s',
    'file_size_mb': 10,         # 単一ログファイルのサイズ
    'backup_count': 5,          # 保持するバックアップファイルの数
    'encoding': 'utf-8'
}
```

### 2. 進捗表示設定

```python
# プログレスバー設定
PROGRESS_CONFIG = {
    'enable_progress_bar': True,
    'update_interval': 100,     # 更新間隔 (レコード数)
    'show_eta': True,           # 予測完了時間表示
    'show_rate': True           # 処理速度表示
}
```

## ✅ 設定検証

設定の正確性を確認するために、設定検証スクリプトを作成します。

```python
# scripts/validate_config.py
import os
import sys
from config.paths import *

def validate_config():
    """設定ファイルの完全性と正確性を検証する"""
    
    print("🔍 設定ファイルを検証中...")
    
    # 必須ディレクトリのチェック
    required_dirs = [DATA_DIR, INPUT_DIR, OUTPUT_DIR, LOGS_DIR]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ 必須ディレクトリがありません: {dir_path}")
            return False
        print(f"✅ ディレクトリが存在します: {dir_path}")
    
    # 必須入力ファイルのチェック
    required_files = []
    required_files.extend(NAIP_FILES.values())
    required_files.extend(XPLANE_FILES.values())
    required_files.append(AIRPORT_LOOKUP)
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✅ ファイルが存在します: {os.path.basename(file_path)}")
    
    if missing_files:
        print(f"❌ 必須ファイルがありません:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ 設定検証に合格しました！")
    return True

if __name__ == "__main__":
    if not validate_config():
        sys.exit(1)
```

## 📞 設定問題のトラブルシューティング

### よくある設定問題

1. **パス区切り文字の問題**
   - Windows: バックスラッシュ `\` または生の文字列 `r'path'` を使用
   - macOS/Linux: スラッシュ `/` を使用

2. **ファイルエンコーディングの問題**
   - CSVファイル: Latin-1 エンコーディングが使用されていることを確認
   - DATファイル: 通常は UTF-8 エンコーディング

3. **権限の問題**
   - すべての設定パスに対して読み書き権限があることを確認
   - Windows: 管理者権限が必要な場合があります

4. **パス長の制限**
   - Windows: パス全体の長さは260文字を超えない
   - 相対パスを使用して長さを短縮

---

**次へ**: データ変換プロセスの実行方法については、[使用説明](usage.md)をお読みください。