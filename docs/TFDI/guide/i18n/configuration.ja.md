# ⚙️ TFDI ナビゲーションデータコンバーター設定ガイド

本ガイドでは、TFDIナビゲーションデータコンバーターの様々な設定オプションについて詳しく説明し、要件に応じて変換プロセスと出力結果を最適化するのに役立ちます。

## 🎯 設定概要

TFDIコンバーターは柔軟な設定システムを採用しており、以下をサポートしています。
- **📁 出力設定** - 出力ディレクトリとファイル形式のカスタマイズ
- **📊 データ処理パラメータ** - 座標精度とデータフィルタリングの調整
- **⚡ パフォーマンス最適化** - メモリ管理と処理速度のチューニング
- **🔍 検証オプション** - データ整合性と品質管理設定

## 📋 設定方法

### 1. デフォルト設定 (初心者におすすめ)
```python
# デフォルト設定で実行
python Fenix2TFDINavDataConverter.py
# コンバーターはプリセットされた最適な設定を使用します
```

### 2. コード内設定
```python
from dataclasses import dataclass

@dataclass
class ConverterConfig:
    """コンバーター設定クラス"""
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs" 
    archive_name: str = "Primary.7z"
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
```

### 3. インタラクティブ設定
```python
# コンバーター実行時のインタラクティブ設定
# ユーザーは実行中に主要なパラメータを設定できます
```

## 🔧 主要な設定オプション

### 出力パス設定

#### 出力ディレクトリ設定
**パラメータ名**: `output_dir`  
**デフォルト値**: `"Primary"`  
**説明**: すべてのJSONファイルの出力ディレクトリ

**使用例:**
```python
config = ConverterConfig(
    output_dir="TFDI_NavData",  # カスタム出力ディレクトリ名
)
```

**ディレクトリ構造:**
```
TFDI_NavData/           # メイン出力ディレクトリ
├── Airports.json       # 空港データ
├── Runways.json        # 滑走路データ
├── Waypoints.json      # ウェイポイントデータ
├── ...                 # その他のJSONファイル
└── ProcedureLegs/      # プロシージャレッグサブディレクトリ
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

#### プロシージャレッグディレクトリ
**パラメータ名**: `procedure_legs_dir`  
**デフォルト値**: `"Primary/ProcedureLegs"`  
**説明**: ターミナルプロシージャレッグファイルの出力ディレクトリ

**設定例:**
```python
config = ConverterConfig(
    output_dir="NavData",
    procedure_legs_dir="NavData/Procedures",  # カスタムプロシージャレッグディレクトリ
)
```

#### アーカイブ名
**パラメータ名**: `archive_name`  
**デフォルト値**: `"Primary.7z"`  
**説明**: 最終的に生成される圧縮ファイル名

**命名規則:**
```python
# タイムスタンプを含む命名
import datetime
now = datetime.datetime.now()
config = ConverterConfig(
    archive_name=f"TFDI_NavData_{now.strftime('%Y%m%d_%H%M')}.7z"
)

# バージョン情報を含む命名
config = ConverterConfig(
    archive_name="TFDI_NavData_v1.0.7z"
)
```

### データ処理設定

#### 座標精度設定
**パラメータ名**: `coordinate_precision`  
**デフォルト値**: `8`  
**範囲**: `4 - 12`  
**説明**: 地理座標の小数点以下の桁数

**精度比較表:**
| 精度 | 誤差範囲 | 適用シーン | ファイルサイズへの影響 |
|------|----------|----------|--------------|
| 4 桁 | ~11 メートル | 基本ナビゲーション | 最小 |
| 6 桁 | ~1.1 メートル | 標準ナビゲーション | 小 |
| 8 桁 | ~1.1 センチメートル | 高精度ナビゲーション | デフォルト |
| 10 桁 | ~1.1 ミリメートル | 非常に高い精度 | 大 |
| 12 桁 | ~0.1 ミリメートル | 測量級精度 | 最大 |

**設定例:**
```python
# 高精度設定 (推奨)
config = ConverterConfig(coordinate_precision=8)

# バランス設定 (ファイルサイズがより小さい)
config = ConverterConfig(coordinate_precision=6)

# 非常に高い精度設定 (ファイルサイズがより大きい)
config = ConverterConfig(coordinate_precision=10)
```

#### VNAVしきい値設定
**パラメータ名**: `vnav_threshold`  
**デフォルト値**: `2.5`  
**単位**: 度  
**説明**: FAFポイント検出のVNAV角度しきい値

**しきい値の意味:**
```python
# 厳格なFAF検出 (より少ないが、より正確なFAFポイント)
config = ConverterConfig(vnav_threshold=2.0)

# 標準FAF検出 (精度とカバレッジのバランス)
config = ConverterConfig(vnav_threshold=2.5)

# 緩やかなFAF検出 (より多くのFAFポイント、誤検出を含む可能性あり)
config = ConverterConfig(vnav_threshold=3.0)
```

**FAF検出ロジック:**
```python
def is_faf_point(vnav_angle: float, vnav_threshold: float) -> bool:
    """FAFポイントであるかどうかを判断します"""
    return (vnav_angle is not None and 
            vnav_angle <= vnav_threshold and 
            vnav_angle > 0)
```

## 🚀 パフォーマンス設定

### SQLiteデータベース最適化

#### データベース接続設定
```python
# SQLite パフォーマンス最適化設定
sqlite_pragmas = {
    "journal_mode": "WAL",          # 先行書き込みログモード
    "synchronous": "NORMAL",        # パフォーマンスと安全性のバランス
    "cache_size": "10000",          # キャッシュページ数 (約 40MB)
    "temp_store": "MEMORY",         # 一時データをメモリに保存
    "mmap_size": "268435456",       # メモリマップサイズ (256MB)
}

def optimize_database_connection(conn):
    """データベース接続を最適化します"""
    for pragma, value in sqlite_pragmas.items():
        conn.execute(f"PRAGMA {pragma}={value}")
```

#### バッチ処理設定
**パラメータ**: バッチサイズ  
**デフォルト値**: `1000`  
**説明**: 1回で処理するレコード数

**設定戦略:**
```python
import psutil

def get_optimal_batch_size():
    """システムメモリに基づいてバッチサイズを自動調整します"""
    available_memory_gb = psutil.virtual_memory().available / (1024**3)
    
    if available_memory_gb < 4:
        return 500      # 低メモリシステム
    elif available_memory_gb < 8:
        return 1000     # 標準設定
    else:
        return 2000     # 高メモリシステム

# 使用例
batch_size = get_optimal_batch_size()
```

### メモリ管理設定

#### メモリ監視設定
```python
class MemoryMonitor:
    """メモリ監視設定"""
    
    def __init__(self):
        self.memory_limit_gb = 6        # メモリ使用制限
        self.warning_threshold = 0.8    # 警告しきい値 (80%)
        self.critical_threshold = 0.9   # 危険しきい値 (90%)
    
    def check_memory_usage(self):
        """メモリ使用状況をチェックします"""
        memory = psutil.virtual_memory()
        usage_ratio = memory.used / memory.total
        
        if usage_ratio > self.critical_threshold:
            return "CRITICAL"
        elif usage_ratio > self.warning_threshold:
            return "WARNING"
        else:
            return "NORMAL"
```

#### ガベージコレクション設定
```python
import gc

def configure_garbage_collection():
    """ガベージコレクションを設定します"""
    # ガベージコレクションのしきい値を設定
    gc.set_threshold(700, 10, 10)
    
    # ガベージコレクションのデバッグを有効化 (デバッグ時のみ使用)
    # gc.set_debug(gc.DEBUG_STATS)

def force_cleanup():
    """メモリを強制的にクリーンアップします"""
    gc.collect()
    gc.collect()  # 完全にクリーンアップするために2回実行
    gc.collect()
```

## 🔍 検証と品質管理

### データ検証設定

#### 検証レベル設定
```python
class ValidationConfig:
    """データ検証設定"""
    
    def __init__(self, level="standard"):
        self.level = level
        self.checks = self._get_checks_for_level(level)
    
    def _get_checks_for_level(self, level):
        """レベルに基づいてチェック項目を取得します"""
        base_checks = [
            "file_exists",
            "database_format", 
            "required_tables"
        ]
        
        if level == "basic":
            return base_checks
        
        elif level == "standard":
            return base_checks + [
                "coordinate_ranges",
                "data_types",
                "foreign_keys"
            ]
        
        elif level == "strict":
            return base_checks + [
                "coordinate_ranges",
                "data_types", 
                "foreign_keys",
                "data_consistency",
                "duplicate_detection",
                "business_rules"
            ]
```

#### 座標検証設定
```python
class CoordinateValidator:
    """座標検証設定"""
    
    def __init__(self):
        # 有効な座標範囲
        self.lat_min = -90.0
        self.lat_max = 90.0
        self.lon_min = -180.0
        self.lon_max = 180.0
        
        # 不審な座標範囲 (エラーデータの可能性あり)
        self.suspicious_zones = [
            {"lat": (0, 0), "lon": (0, 0)},      # 原点座標はエラーの可能性あり
            {"lat": (90, 90), "lon": (0, 0)},    # 極点座標は特別にチェックする必要あり
        ]
    
    def validate_coordinate(self, lat, lon):
        """単一の座標を検証します"""
        # 基本範囲をチェック
        if not (self.lat_min <= lat <= self.lat_max):
            return False, f"緯度が範囲外です: {lat}"
        
        if not (self.lon_min <= lon <= self.lon_max):
            return False, f"経度が範囲外です: {lon}"
        
        # 不審な座標をチェック
        for zone in self.suspicious_zones:
            if (zone["lat"][0] <= lat <= zone["lat"][1] and 
                zone["lon"][0] <= lon <= zone["lon"][1]):
                return True, f"不審な座標: ({lat}, {lon})"
        
        return True, "座標は有効です"
```

### 出力品質管理

#### ファイル形式検証
```python
import json

class OutputValidator:
    """出力ファイル検証設定"""
    
    def __init__(self):
        self.required_files = [
            "Airports.json",
            "Runways.json", 
            "Waypoints.json",
            "Navaids.json",
            "Airways.json",
            "AirwayLegs.json",
            "Terminals.json",
            "ILSes.json"
        ]
        
        self.min_file_sizes = {
            "Airports.json": 1024,      # 少なくとも 1KB
            "Waypoints.json": 10240,    # 少なくとも 10KB
        }
    
    def validate_json_file(self, file_path):
        """JSONファイル形式を検証します"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, (dict, list)):
                return False, "JSONのルートオブジェクトは辞書またはリストである必要があります"
            
            if isinstance(data, dict) and len(data) == 0:
                return False, "JSONオブジェクトが空です"
            
            return True, "JSON形式は有効です"
            
        except json.JSONDecodeError as e:
            return False, f"JSON形式エラー: {e}"
        except Exception as e:
            return False, f"ファイル読み取りエラー: {e}"
```

## 🎛️ 高度な設定

### ログ設定

#### ログレベルとフォーマット
```python
import logging
from rich.logging import RichHandler

class LoggingConfig:
    """ログ設定クラス"""
    
    def __init__(self, level="INFO"):
        self.level = level
        self.format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        self.file_name = "tfdi_converter.log"
        self.max_file_size = 10 * 1024 * 1024  # 10MB
        self.backup_count = 3
    
    def setup_logging(self):
        """ログシステムを設定します"""
        # ロガーを作成
        logger = logging.getLogger("TFDIConverter")
        logger.setLevel(getattr(logging, self.level))
        
        # Rich コンソールハンドラー
        console_handler = RichHandler(rich_tracebacks=True)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter("%(message)s")
        console_handler.setFormatter(console_formatter)
        
        # ファイルハンドラー
        from logging.handlers import RotatingFileHandler
        file_handler = RotatingFileHandler(
            self.file_name, 
            maxBytes=self.max_file_size,
            backupCount=self.backup_count,
            encoding='utf-8'
        )
        file_handler.setLevel(logging.DEBUG)
        file_formatter = logging.Formatter(self.format)
        file_handler.setFormatter(file_formatter)
        
        # ハンドラーを追加
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)
        
        return logger
```

### 圧縮設定

#### 圧縮レベル設定
```python
import py7zr

class CompressionConfig:
    """圧縮設定クラス"""
    
    def __init__(self):
        self.compression_level = 5      # 圧縮レベル (1-9)
        self.method = "LZMA2"          # 圧縮アルゴリズム
        self.solid = True              # ソリッド圧縮
        self.multi_threading = True    # マルチスレッド圧縮
    
    def create_archive(self, source_dir, archive_path):
        """アーカイブを作成します"""
        filters = [
            {"id": py7zr.FILTER_LZMA2, "preset": self.compression_level}
        ]
        
        with py7zr.SevenZipFile(
            archive_path, 
            'w', 
            filters=filters,
            mp=self.multi_threading
        ) as archive:
            archive.writeall(source_dir, ".")
```

### デバッグ設定

#### デバッグモード設定
```python
class DebugConfig:
    """デバッグ設定クラス"""
    
    def __init__(self, debug_mode=False):
        self.debug_mode = debug_mode
        self.save_intermediate_files = debug_mode
        self.verbose_logging = debug_mode
        self.performance_profiling = debug_mode
        self.memory_tracking = debug_mode
    
    def enable_debug_features(self):
        """デバッグ機能を有効にします"""
        if self.debug_mode:
            # 詳細ログを有効化
            logging.getLogger().setLevel(logging.DEBUG)
            
            # パフォーマンスプロファイリングを有効化
            if self.performance_profiling:
                import cProfile
                self.profiler = cProfile.Profile()
                self.profiler.enable()
            
            # メモリトラッキングを有効化
            if self.memory_tracking:
                import tracemalloc
                tracemalloc.start()
```

## 📝 完全な設定例

### 基本設定例
```python
# 初心者向けのシンプルな設定
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8,
    vnav_threshold=2.5
)
```

### 高性能設定例
```python
# ハイエンドハードウェア向けのパフォーマンス最適化設定
config = ConverterConfig(
    output_dir="Primary_HighPerf",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# パフォーマンス最適化設定と連携
batch_size = 2000
memory_limit_gb = 8
enable_multi_threading = True
```

### 高品質設定例
```python
# データ品質に非常に高い要件があるシナリオに適しています
config = ConverterConfig(
    output_dir="Primary_HighQuality", 
    coordinate_precision=10,        # より高い精度
    vnav_threshold=2.0             # より厳格なFAF検出
)

# 厳格な検証と連携
validation_level = "strict"
enable_duplicate_detection = True
enable_consistency_check = True
```

### デバッグ設定例
```python
# 開発およびデバッグ用設定
config = ConverterConfig(
    output_dir="Debug_Output",
    coordinate_precision=6,         # 処理を高速化するため精度を低減
    vnav_threshold=3.0             # デバッグを容易にするための緩やかなしきい値
)

# デバッグオプション
debug_config = DebugConfig(debug_mode=True)
save_intermediate_files = True
verbose_logging = True
```

## 🔧 設定ファイル管理

### 設定ファイル形式
```python
# config.py
from dataclasses import dataclass, asdict
import json

@dataclass 
class TFDIConverterConfig:
    """TFDIコンバーター完全設定"""
    # 出力設定
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs"
    archive_name: str = "Primary.7z"
    
    # データ処理設定
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
    
    # パフォーマンス設定
    batch_size: int = 1000
    memory_limit_gb: int = 6
    
    # 検証設定
    validation_level: str = "standard"
    enable_coordinate_check: bool = True
    
    # ログ設定
    log_level: str = "INFO"
    log_file: str = "tfdi_converter.log"
    
    def save_to_file(self, file_path: str):
        """設定をファイルに保存します"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(asdict(self), f, indent=2)
    
    @classmethod
    def load_from_file(cls, file_path: str):
        """ファイルから設定をロードします"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls(**data)
```

### 設定テンプレート
```python
# 設定テンプレートを作成
def create_config_templates():
    """様々な設定テンプレートを作成します"""
    
    # デフォルト設定
    default_config = TFDIConverterConfig()
    default_config.save_to_file("config_default.json")
    
    # 高性能設定
    performance_config = TFDIConverterConfig(
        batch_size=2000,
        memory_limit_gb=8,
        coordinate_precision=6
    )
    performance_config.save_to_file("config_performance.json")
    
    # 高品質設定
    quality_config = TFDIConverterConfig(
        coordinate_precision=10,
        vnav_threshold=2.0,
        validation_level="strict"
    )
    quality_config.save_to_to_file("config_quality.json")

# 設定を使用
config = TFDIConverterConfig.load_from_file("config_performance.json")
```

---

**次のステップ**: 設定が完了したら、[使用説明](usage.md) を参照してTFDIデータ変換を開始してください！🚁✨