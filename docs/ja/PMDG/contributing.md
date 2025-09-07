# 🤝 貢献ガイドライン

Nav-data プロジェクトへの貢献を歓迎します！このガイドラインは、コード標準、開発プロセス、ベストプラクティスなど、プロジェクトへの貢献方法を理解するのに役立ちます。

## 🎯 貢献の種類

### 以下の種類の貢献を歓迎します。

- **🐛 バグ報告と修正** - プロジェクト内の問題を発見し修正する
- **✨ 新機能開発** - 新しいデータ処理機能や最適化を追加する
- **📚 ドキュメントの改善** - ドキュメントの改善、例の追加、誤りの修正
- **🔧 パフォーマンスの最適化** - データ処理効率とメモリ使用量を向上させる
- **🧪 テストケース** - テストカバレッジを増やし、コード品質を向上させる
- **🌍 国際化サポート** - 多言語サポートまたは他の地域データを追加する
- **🎨 ユーザーエクスペリエンスの改善** - ツールの使いやすさと出力形式を最適化する

## 🚀 クイックスタート

### 1. 環境準備

```bash
# プロジェクトをGitHubアカウントにフォークする
# フォークをクローンする
git clone https://github.com/[您的用户名]/Nav-data.git
cd Nav-data

# 上流リポジトリを追加する
git remote add upstream https://github.com/原作者/Nav-data.git

# 仮想環境を作成する
python -m venv nav-data-dev
source nav-data-dev/bin/activate  # Linux/macOS
# または nav-data-dev\Scripts\activate  # Windows

# 開発依存関係をインストールする
pip install -r requirements.txt
pip install -r requirements-dev.txt  # 開発依存関係（存在する場合）
```

### 2. 開発環境の検証

```bash
# 基本テストを実行する
python -m pytest tests/ -v

# コードスタイルをチェックする
flake8 *.py

# 型チェックを実行する（使用する場合）
mypy *.py
```

## 📋 開発規約

### コードスタイル

私たちはPythonコミュニティの標準とベストプラクティスに従います。

#### 1. PEP 8 コードスタイル

```python
# ✅ 良い例
class AirportDataProcessor:
    """空港データプロセッサー
    
    NAIP形式の空港データを処理し、PMDG互換形式に変換します。
    """
    
    def __init__(self, csv_file_path: str, output_db_path: str):
        self.csv_file_path = csv_file_path
        self.output_db_path = output_db_path
        self.processed_count = 0
    
    def process_airport_data(self) -> ProcessingResult:
        """空港データを処理するメインメソッド
        
        Returns:
            ProcessingResult: 処理統計情報を含む結果オブジェクト
            
        Raises:
            FileNotFoundError: 入力ファイルが存在しない場合
            DatabaseError: データベース操作が失敗した場合
        """
        try:
            data = self._load_csv_data()
            processed_data = self._transform_data(data)
            self._save_to_database(processed_data)
            
            return ProcessingResult(
                success=True,
                processed_count=self.processed_count,
                message="空港データの処理が完了しました"
            )
        except Exception as e:
            logging.error(f"空港データ処理中にエラーが発生しました: {e}")
            raise

# ❌ 避けるべき記述
def processAirports(file,db):  # 関数名が不適切で、引数の型が不明確
    d=pd.read_csv(file)       # 変数名が不明瞭
    for i in d.iterrows():    # エラー処理がない
        # 処理ロジック...
        pass
```

#### 2. 型アノテーション

```python
from typing import List, Dict, Optional, Union, Tuple
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """処理結果データクラス"""
    success: bool
    processed_count: int
    failed_count: int = 0
    errors: List[str] = None
    message: Optional[str] = None

def convert_coordinates(
    dms_latitude: str, 
    dms_longitude: str
) -> Tuple[Optional[float], Optional[float]]:
    """DMS形式の座標を十進数度に変換します
    
    Args:
        dms_latitude: DMS形式の緯度文字列 (例: N390308.00)
        dms_longitude: DMS形式の経度文字列 (例: E1162930.00)
    
    Returns:
        (緯度, 経度) のタプル、変換失敗時は (None, None) を返します
    """
    try:
        lat = parse_dms_coordinate(dms_latitude, coord_type='latitude')
        lon = parse_dms_coordinate(dms_longitude, coord_type='longitude')
        return lat, lon
    except ValueError as e:
        logging.warning(f"座標変換に失敗しました: {e}")
        return None, None
```

#### 3. エラー処理とロギング

```python
import logging
from enum import Enum

class ProcessingError(Exception):
    """データ処理関連エラーの基底クラス"""
    pass

class ValidationError(ProcessingError):
    """データ検証エラー"""
    pass

class CoordinateError(ValidationError):
    """座標関連エラー"""
    pass

def process_with_error_handling(data: Dict) -> bool:
    """完全なエラー処理を含むデータ処理の例"""
    try:
        # データ検証
        if not validate_required_fields(data):
            raise ValidationError("必須フィールドが不足しています")
        
        # 座標処理
        lat, lon = convert_coordinates(
            data.get('latitude'),
            data.get('longitude')
        )
        
        if lat is None or lon is None:
            raise CoordinateError("座標変換に失敗しました")
        
        # データ保存
        save_to_database(data)
        logging.info(f"レコードの処理に成功しました: {data.get('identifier')}")
        return True
        
    except ValidationError as e:
        logging.warning(f"データ検証に失敗しました: {e}")
        return False
    except CoordinateError as e:
        logging.error(f"座標処理エラー: {e}")
        return False
    except Exception as e:
        logging.critical(f"予期せぬエラー: {e}")
        raise
```

### ドキュメント標準

#### 1. 関数とクラスのドキュメント

```python
def parse_dat_file(
    file_path: str, 
    batch_size: int = 1000,
    encoding: str = 'utf-8'
) -> List[Dict[str, Any]]:
    """X-Plane形式のDATファイルを解析します
    
    この関数はX-Planeナビゲーションデータファイルを読み込み、その中のウェイポイント情報を解析し、
    構造化されたデータリストを返します。大ファイルのバッチ処理をサポートします。
    
    Args:
        file_path: DATファイルの完全パス
        batch_size: バッチ処理サイズ。メモリ最適化に使用され、デフォルトは1000です
        encoding: ファイルエンコーディング。デフォルトはutf-8です
    
    Returns:
        ウェイポイント情報を含む辞書リスト。各辞書には以下のキーが含まれます。
        - waypoint_identifier: ウェイポイント識別子
        - latitude: 緯度（十進数度）
        - longitude: 経度（十進数度）
        - waypoint_type: ウェイポイントタイプ
        - icao_code: ICAO地域コード
    
    Raises:
        FileNotFoundError: 指定されたファイルが存在しない場合
        ValueError: ファイル形式が正しくない場合
        MemoryError: 利用可能なメモリが不足している場合
    
    Examples:
        基本的な使用法:
        >>> waypoints = parse_dat_file('data/earth_fix.dat')
        >>> print(f"解析しました {len(waypoints)} 個のウェイポイント")
        
        大ファイルの処理:
        >>> waypoints = parse_dat_file(
        ...     'large_file.dat', 
        ...     batch_size=5000
        ... )
    
    Note:
        この関数はファイルヘッダのコメント行を自動的にスキップし、有効なデータ行のみを処理します。
        破損したデータ行については、警告ログを記録しますが、処理は中断しません。
    """
    # 実装...
```

#### 2. モジュールレベルのドキュメント

```python
"""
PMDG空港データ処理モジュール

このモジュールは、NAIP形式の空港データを処理し、PMDG互換の
SQLiteデータベース形式に変換します。主な機能は以下の通りです。

- CSVファイルの読み込みと解析
- DMS座標形式の変換
- 空港名の検索とマッチング
- データ検証とクリーンアップ
- SQLiteデータベースへの書き込み

サポートされる入力ファイル形式:
- AD_HP.csv: 空港基本データ（NAIP形式）
- Airport.dat: 空港名検索テーブル

出力形式:
- SQLiteデータベース、tbl_airportsテーブルを含む

Author: Nav-data Team
Version: 2.0.0
License: MIT

Examples:
    コマンドラインでの使用:
    $ python PMDG_APT.py
    
    プログラミングインターフェース:
    >>> from PMDG_APT import AirportProcessor
    >>> processor = AirportProcessor(
    ...     csv_path='data/AD_HP.csv',
    ...     output_path='output/airports.s3db'
    ... )
    >>> result = processor.process()
    >>> print(f"処理完了: {result.processed_count} 個の空港")
"""

import pandas as pd
import sqlite3
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path

# モジュールレベル定数
DEFAULT_AREA_CODE = 'EEU'
DEFAULT_ENCODING = 'latin1'
SUPPORTED_ICAO_REGIONS = {'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW'}

# ... その他のコード
```

### テスト標準

#### 1. ユニットテスト

```python
import unittest
from unittest.mock import patch, mock_open
import pandas as pd
from PMDG_APT import AirportProcessor, convert_dms_to_decimal

class TestCoordinateConversion(unittest.TestCase):
    """座標変換機能テスト"""
    
    def test_valid_north_latitude(self):
        """有効な北緯座標の変換をテスト"""
        result, error = convert_dms_to_decimal("N390308.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 39.0522222, places=6)
    
    def test_valid_east_longitude(self):
        """有効な東経座標の変換をテスト"""
        result, error = convert_dms_to_decimal("E1162930.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 116.4916667, places=6)
    
    def test_invalid_format(self):
        """無効な座標形式をテスト"""
        result, error = convert_dms_to_decimal("INVALID")
        self.assertIsNone(result)
        self.assertIsNotNone(error)
        self.assertIn("無効なDMS形式", error)
    
    def test_boundary_coordinates(self):
        """境界座標をテスト"""
        # 北極点をテスト
        result, error = convert_dms_to_decimal("N900000.00")
        self.assertIsNone(error)
        self.assertEqual(result, 90.0)

class TestAirportProcessor(unittest.TestCase):
    """空港データプロセッサーテスト"""
    
    def setUp(self):
        """テスト初期化"""
        self.processor = AirportProcessor(
            csv_file_path="test_data/AD_HP.csv",
            lookup_file_path="test_data/Airport.dat",
            output_db_path="test_output/test.s3db"
        )
    
    @patch('pandas.read_csv')
    def test_csv_loading(self, mock_read_csv):
        """CSVファイルの読み込みをテスト"""
        # CSVデータをモックする
        mock_data = pd.DataFrame({
            'CODE_ID': ['ZBAA', 'ZSPD'],
            'GEO_LAT_ACCURACY': ['N390308.00', 'N311133.00'],
            'GEO_LONG_ACCURACY': ['E1162930.00', 'E1211056.00']
        })
        mock_read_csv.return_value = mock_data
        
        result = self.processor._load_csv_data()
        self.assertEqual(len(result), 2)
        self.assertEqual(result.iloc[0]['CODE_ID'], 'ZBAA')
    
    @patch('sqlite3.connect')
    def test_database_creation(self, mock_connect):
        """データベースの作成をテスト"""
        mock_connection = mock_connect.return_value
        mock_cursor = mock_connection.cursor.return_value
        
        self.processor._create_database_tables()
        
        # テーブル作成SQLが実行されたことを検証
        create_table_calls = [call[0][0] for call in mock_cursor.execute.call_args_list]
        self.assertTrue(any('CREATE TABLE' in call for call in create_table_calls))
```

#### 2. 結合テスト

```python
import tempfile
import os
import sqlite3
from pathlib import Path

class TestIntegration(unittest.TestCase):
    """結合テスト"""
    
    def setUp(self):
        """一時的なテスト環境を作成"""
        self.test_dir = tempfile.mkdtemp()
        self.csv_file = Path(self.test_dir) / "test_airports.csv"
        self.lookup_file = Path(self.test_dir) / "airports.dat"
        self.output_db = Path(self.test_dir) / "output.s3db"
        
        # テストデータファイルを作成
        self.create_test_csv()
        self.create_test_lookup()
    
    def tearDown(self):
        """テスト環境をクリーンアップ"""
        import shutil
        shutil.rmtree(self.test_dir)
    
    def create_test_csv(self):
        """テストCSVファイルを作成"""
        test_data = """CODE_ID,GEO_LAT_ACCURACY,GEO_LONG_ACCURACY
ZBAA,N390308.00,E1162930.00
ZSPD,N311133.00,E1211056.00"""
        
        with open(self.csv_file, 'w', encoding='latin1') as f:
            f.write(test_data)
    
    def create_test_lookup(self):
        """テスト検索ファイルを作成"""
        lookup_data = """ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL"""
        
        with open(self.lookup_file, 'w') as f:
            f.write(lookup_data)
    
    def test_end_to_end_processing(self):
        """エンドツーエンド処理テスト"""
        processor = AirportProcessor(
            csv_file_path=str(self.csv_file),
            lookup_file_path=str(self.lookup_file),
            output_db_path=str(self.output_db)
        )
        
        result = processor.process()
        
        # 処理結果を検証
        self.assertTrue(result.success)
        self.assertEqual(result.processed_count, 2)
        
        # データベースの内容を検証
        self.assertTrue(self.output_db.exists())
        
        conn = sqlite3.connect(str(self.output_db))
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        self.assertEqual(count, 2)
        
        cursor.execute("SELECT airport_identifier, airport_name FROM tbl_airports ORDER BY airport_identifier")
        airports = cursor.fetchall()
        
        self.assertEqual(airports[0][0], 'ZBAA')
        self.assertEqual(airports[0][1], 'BEIJING/CAPITAL')
        
        conn.close()
```

## 🔄 開発フロー

### Git ワークフロー

私たちは **Git Flow** ワークフローを使用します。

```bash
# 最新のmainブランチから機能ブランチを作成する
git checkout main
git pull upstream main
git checkout -b feature/航路処理优化

# 開発作業を行う
# コードの記述、テストの追加、ドキュメントの更新

# 変更をコミットする
git add .
git commit -m "feat: 航路データ処理のパフォーマンスを最適化

- メモリ使用量を削減するためのバッチ処理を実装
- 処理状況を表示するプログレスバーを追加
- データベース書き込み操作を最適化

Closes #123"

# フォークにプッシュする
git push origin feature/航路処理优化

# プルリクエストを作成する
```

### コミットメッセージ規約

私たちは **Conventional Commits** 規約を使用します。

```bash
# 形式: <タイプ>(<スコープ>): <説明>
#
# <オプションの本文>
#
# <オプションのフッター>

# 例:
git commit -m "feat(airport): 空港名の自動検索機能を追加

ICAOコードに基づいた空港名の自動検索を実装し、
複数のデータソースから空港名情報を取得するのをサポートします。

- AirportNameResolverクラスを追加
- 検索性能向上のためのキャッシュをサポート
- 対応するユニットテストを追加

Closes #45"

# タイプ説明:
# feat: 新機能
# fix: バグ修正
# docs: ドキュメント更新
# style: コード形式の調整（機能に影響なし）
# refactor: コードのリファクタリング
# perf: パフォーマンス最適化
# test: テストの追加または変更
# chore: ビルドプロセスまたは補助ツールの変更
```

### プルリクエストフロー

#### 1. PR チェックリスト

PRを提出する前に、以下を確認してください。

- [ ] コードがプロジェクトのコーディング規約に準拠しているか
- [ ] 必要なテストケースが追加されているか
- [ ] すべてのテストがパスしているか
- [ ] 関連ドキュメントが更新されているか
- [ ] コミットメッセージが規約に準拠しているか
- [ ] 新しい依存関係が導入されていないか（導入されている場合はPRで説明が必要）

#### 2. PR テンプレート

```markdown
## 📝 変更内容
このPRで行われた変更を簡潔に記述してください。

## 🔧 変更タイプ
- [ ] バグ修正
- [ ] 新機能
- [ ] パフォーマンス最適化
- [ ] コードのリファクタリング
- [ ] ドキュメント更新
- [ ] テスト改善

## 🧪 テスト
これらの変更をどのようにテストしたか記述してください。
- [ ] 新しいユニットテストを追加しました
- [ ] 結合テストを追加しました
- [ ] 手動テスト手順:
  1. 手順1
  2. 手順2

## 📸 スクリーンショット（該当する場合）
UIの変更や出力形式の変更がある場合は、スクリーンショットを追加してください。

## 🔗 関連Issue
Fixes #123
Related to #456

## 📋 チェックリスト
- [ ] 私のコードはプロジェクトのコード規約に準拠しています
- [ ] 私は自分のコードを自己レビューしました
- [ ] 私は対応するテストを追加しました
- [ ] すべての新規および既存のテストがパスしました
- [ ] 私は関連ドキュメントを更新しました

## 💬 その他のコメント
その他に説明が必要な内容があれば追加してください。
```

## 🐛 問題報告

### バグ報告テンプレート

問題を発見した際は、以下のテンプレートを使用してIssueを作成してください。

```markdown
**🐛 バグの説明**
発生している問題を簡潔かつ明確に記述してください。

**🔄 再現手順**
1. '...' に移動する
2. '...' をクリックする
3. '...' までスクロールする
4. エラーを観察する

**✅ 期待される動作**
期待される動作を記述してください。

**💻 環境情報**
- オペレーティングシステム: [例: Windows 10, macOS 11.6, Ubuntu 20.04]
- Pythonバージョン: [例: 3.9.7]
- Nav-dataバージョン: [例: 2.1.0]
- その他の関連ソフトウェアバージョン:

**📄 エラーログ**
該当する場合、エラーログまたはスクリーンショットを添付してください。

```
[ここにログの内容を貼り付けてください]
```

**📁 入力データ**
問題が特定の入力データに関連する場合は、サンプルデータ（機密情報を削除したもの）を提供してください。

**🔍 その他の情報**
問題の診断に役立つその他の情報を追加してください。
```

### 機能リクエストテンプレート

```markdown
**🚀 機能の説明**
追加したい機能を簡潔かつ明確に記述してください。

**💡 使用シナリオ**
この機能がどのような問題を解決し、どのようなプロセスを改善するかを記述してください。

**📋 詳細要件**
- [ ] 要件1: 説明
- [ ] 要件2: 説明
- [ ] 要件3: 説明

**🎨 可能な実装案**
実装のアイデアがあれば、簡潔に記述してください。

**📚 参考資料**
関連するドキュメント、標準、または参考資料のリンクを提供してください。

**📊 優先度**
- [ ] 低 - 時間があるときに実施
- [ ] 中 - 重要だが緊急ではない
- [ ] 高 - 早急な実装が必要
- [ ] 緊急 - 他の作業をブロックしている

**💬 その他のコメント**
その他に説明が必要な内容。
```

## 📚 開発環境設定

### IDE設定の推奨

#### Visual Studio Code

推奨される拡張機能:
```json
{
    "recommendations": [
        "ms-python.python",
        "ms-python.flake8",
        "ms-python.pylint",
        "ms-python.black-formatter",
        "njpwerner.autodocstring",
        "ms-python.isort",
        "charliermarsh.ruff"
    ]
}
```

ワークスペース設定 (`.vscode/settings.json`)：
```json
{
    "python.defaultInterpreterPath": "./nav-data-dev/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length=88"],
    "python.sortImports.args": ["--profile", "black"],
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    }
}
```

#### PyCharm

1. コードスタイルの設定:
   - File → Settings → Editor → Code Style → Python
   - "Black"プリセットを選択

2. テストランナーの設定:
   - File → Settings → Tools → Python Integrated Tools
   - デフォルトのテストランナー: pytest

### 開発ツール設定

#### pre-commit フック

`.pre-commit-config.yaml` の作成:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
  
  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
        language_version: python3
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88, --extend-ignore=E203]
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: [--profile=black]
```

インストールと有効化:
```bash
pip install pre-commit
pre-commit install
```

## 🏆 ベストプラクティス

### パフォーマンス最適化

1. **メモリ管理**
   ```python
   # ✅ 良い方法：ジェネレーターを使用して大ファイルを処理する
   def process_large_file(file_path):
       with open(file_path, 'r') as f:
           for line in f:
               yield process_line(line)
   
   # ❌ 避けるべき：ファイル全体を一度にメモリに読み込む
   def process_large_file_bad(file_path):
       with open(file_path, 'r') as f:
           lines = f.readlines()  # 大量のメモリを消費する可能性あり
       return [process_line(line) for line in lines]
   ```

2. **データベース操作の最適化**
   ```python
   # ✅ 良い方法：バッチ挿入
   def insert_records_batch(connection, records, batch_size=1000):
       cursor = connection.cursor()
       for i in range(0, len(records), batch_size):
           batch = records[i:i + batch_size]
           cursor.executemany(
               "INSERT INTO table (col1, col2) VALUES (?, ?)", 
               batch
           )
           connection.commit()
   
   # ❌ 避けるべき：1レコードずつ挿入
   def insert_records_one_by_one(connection, records):
       cursor = connection.cursor()
       for record in records:
           cursor.execute("INSERT INTO table (col1, col2) VALUES (?, ?)", record)
           connection.commit()  # 毎回コミットすると、パフォーマンスに影響する
   ```

### エラー処理

```python
# ✅ 良いエラー処理
def process_coordinate(dms_string: str) -> float:
    """座標文字列を処理し、十進数度を返します"""
    try:
        return convert_dms_to_decimal(dms_string)
    except ValueError as e:
        logging.warning(f"座標形式エラー: {dms_string}, エラー: {e}")
        raise CoordinateError(f"座標を解析できません: {dms_string}") from e
    except Exception as e:
        logging.error(f"座標処理中に不明なエラーが発生しました: {e}")
        raise

# ❌ 避けるべきエラー処理
def process_coordinate_bad(dms_string):
    try:
        return convert_dms_to_decimal(dms_string)
    except:  # すべての例外をキャッチし、デバッグが難しい
        return None  # エラー情報が失われる
```

### テストの記述

```python
# ✅ 良いテスト
class TestCoordinateProcessing(unittest.TestCase):
    def test_valid_north_latitude_conversion(self):
        """有効な北緯座標変換をテスト"""
        # Given
        dms_input = "N390308.00"
        expected_decimal = 39.0522222
        
        # When
        result = convert_dms_to_decimal(dms_input)
        
        # Then
        self.assertAlmostEqual(result, expected_decimal, places=6)
    
    def test_invalid_format_raises_error(self):
        """無効な形式が適切なエラーをスローすることをテスト"""
        # Given
        invalid_input = "INVALID_FORMAT"
        
        # When/Then
        with self.assertRaises(CoordinateError) as context:
            convert_dms_to_decimal(invalid_input)
        
        self.assertIn("座標を解析できません", str(context.exception))

# ❌ 避けるべきテスト
def test_coordinate():  # テスト名が不明瞭
    result = convert_dms_to_decimal("N390308.00")
    assert result == 39.0522222  # 浮動小数点数の厳密な比較は失敗する可能性がある
```

## 📞 ヘルプ

貢献プロセスで問題が発生した場合:

1. **ドキュメントを確認する** - まずプロジェクトドキュメントとこの貢献ガイドラインを確認してください
2. **既存のIssueを検索する** - 類似の問題に遭遇した人がいないか確認してください
3. **ディスカッションに参加する** - GitHub Discussionsで質問してください
4. **メンテナーに連絡する** - GitHub Issuesを通じてプロジェクトメンテナーに連絡してください

### コミュニティガイドライン

私たちはオープンで友好的なコミュニティ環境の構築に努めます。

- **他人を尊重する** - すべての参加者に対して礼儀正しく、敬意を払ってください
- **建設的なフィードバックを提供する** - 役立つ、建設的な意見や提案を提供してください
- **忍耐強く学ぶ** - 新しいメンバーの学習を助け、知識と経験を共有してください
- **協力してプロジェクトを改善する** - 協力してプロジェクトを改善してください

## 🎉 貢献者への謝意

以下の場所で貢献者を認識します。
- README.md の貢献者セクション
- CHANGELOG.md のバージョン更新履歴
- GitHub Releases の謝意リスト

Nav-data プロジェクトへの貢献をご検討いただきありがとうございます！すべての貢献がこのプロジェクトをより良くします。

---

**覚えておいてください**: 良いコードは人が読むために書かれるものであり、機械がそれを実行できるのは単なる偶然です。