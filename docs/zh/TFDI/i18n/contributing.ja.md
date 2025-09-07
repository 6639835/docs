# 🤝 TFDI ナビゲーションデータコンバーター貢献ガイド

TFDI ナビゲーションデータコンバータープロジェクトへようこそ！コードの貢献、ドキュメントの改善、バグ報告、機能提案など、すべての貢献者の皆様の参加に感謝いたします。

## 🌟 貢献方法

### 💻 コードによる貢献
- 🐛 **バグの修正** - 既知の問題や欠陥の解決
- ✨ **新機能の開発** - 新しい変換機能の追加または改善
- 📈 **パフォーマンスの最適化** - 変換速度とメモリ使用効率の向上
- 🧪 **テストの強化** - テストケースとカバレッジの増加
- 📚 **ドキュメントの改善** - APIドキュメントとユーザーガイドの改善

### 📝 コード以外の貢献
- 🐛 **問題報告** - バグと互換性の問題の報告
- 💡 **機能提案** - 新機能と改善提案の提出
- 📖 **ドキュメントの執筆** - チュートリアル、ガイド、およびサンプルの作成
- 🌐 **ローカライゼーション** - インターフェースとドキュメントの翻訳
- 🎓 **コミュニティサポート** - 他のユーザーの問題解決を支援

## 🚀 開発環境のセットアップ

### 環境要件

```bash
# Pythonバージョンの要件
Python 3.8+ (推奨 3.9 または 3.10)

# オペレーティングシステムのサポート
Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+)

# メモリ要件
最低 4GB RAM (推奨 8GB+)
```

### クイックスタート

#### 1. プロジェクトのクローン
```bash
# メインリポジトリのクローン
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# またはあなたのForkをクローン
git clone https://github.com/your-username/tfdi-nav-converter.git
cd tfdi-nav-converter
```

#### 2. 開発環境のセットアップ
```bash
# 仮想環境の作成
python -m venv venv

# 仮想環境のアクティベーション
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 開発依存関係のインストール
pip install -r requirements-dev.txt
pip install -e .  # 編集可能なインストール
```

#### 3. インストールの検証
```bash
# テストスイートの実行
pytest

# コード品質チェックの実行
flake8 src/
mypy src/
black --check src/

# コンバーターの実行
python -m tfdi_converter --help
```

### 開発ツールの設定

#### IDE設定 (VS Code推奨)
```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./venv/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.mypyEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests/"]
}
```

#### プレコミットフック
```bash
# pre-commitのインストール
pip install pre-commit

# フックのインストール
pre-commit install

# すべてのフックを手動で実行
pre-commit run --all-files
```

## 📋 開発フロー

### 1. 機能ブランチの作成

```bash
# メインブランチが最新であることを確認
git checkout main
git pull origin main

# 新しい機能ブランチの作成
git checkout -b feature/add-new-format-support

# または修正ブランチ
git checkout -b fix/memory-leak-in-processor
```

### 2. 開発とテスト

#### コード開発
```bash
# コードの記述
# ... 開発を行う ...

# テストの追加
# tests/test_new_feature.py

# ドキュメントの更新
# docs/api/new_feature.md
```

#### テストの実行
```bash
# すべてのテストを実行
pytest

# 特定のテストファイルを実行
pytest tests/test_converter.py

# カバレッジレポートを実行および生成
pytest --cov=tfdi_converter --cov-report=html

# パフォーマンス テストの実行
pytest tests/performance/ -m performance
```

#### コード品質チェック
```bash
# コードのフォーマット
black src/ tests/

# インポートのソート
isort src/ tests/

# 静的解析
flake8 src/ tests/
mypy src/

# セキュリティチェック
bandit -r src/
```

### 3. コードのコミット

#### コミットメッセージの規約
[Conventional Commits](https://www.conventionalcommits.org/)の規約を使用：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**コミットタイプ：**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コード書式調整
- `refactor`: コードリファクタリング
- `test`: テスト関連
- `chore`: ビルドプロセスまたは補助ツールの変更
- `perf`: パフォーマンス改善

**コミット例：**
```bash
# 新機能
git commit -m "feat(converter): add support for MSFS native format"

# バグ修正
git commit -m "fix(parser): handle malformed coordinate data gracefully"

# ドキュメント更新
git commit -m "docs(api): add examples for batch processing"

# パフォーマンス改善
git commit -m "perf(processor): optimize memory usage in large dataset processing"
```

### 4. プッシュとPRの作成

```bash
# ブランチをリモートにプッシュ
git push origin feature/add-new-format-support

# GitHubでプルリクエストを作成
# PRテンプレートを記入
# コードレビューを待つ
```

## 📝 コーディング規約

### Pythonコーディング規約

#### 1. コードスタイル
```python
# Blackフォーマッターのデフォルト設定を使用
# 行長: 88文字
# 二重引用符を使用
# 関数間に2行の空白

from typing import Dict, List, Optional, Union
import logging
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


@dataclass
class ConversionConfig:
    """変換設定クラス。
    
    TFDIコンバーターの様々な設定パラメーターを管理するために使用されます。
    
    Attributes:
        output_dir: 出力ディレクトリパス
        coordinate_precision: 座標精度
        enable_validation: データ検証を有効にするかどうか
    """
    output_dir: str = "Primary"
    coordinate_precision: int = 8
    enable_validation: bool = True


class FenixDataProcessor:
    """Fenixデータプロセッサー。
    
    Fenixデータベースからナビゲーションデータを読み込み、処理する役割を担います。
    """
    
    def __init__(self, config: ConversionConfig) -> None:
        """プロセッサーを初期化します。
        
        Args:
            config: 変換設定オブジェクト
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def process_waypoints(
        self, 
        waypoint_data: List[Dict[str, Union[str, float]]]
    ) -> List[Dict[str, Union[str, float]]]:
        """ウェイポイントデータを処理します。
        
        Args:
            waypoint_data: 元のウェイポイントデータリスト
            
        Returns:
            処理されたウェイポイントデータリスト
            
        Raises:
            DataProcessingError: データ処理中にエラーが発生しました
        """
        try:
            processed_data = []
            
            for waypoint in waypoint_data:
                processed_waypoint = self._normalize_waypoint(waypoint)
                processed_data.append(processed_waypoint)
            
            self.logger.info(f"正常に処理しました {len(processed_data)} のウェイポイント")
            return processed_data
            
        except Exception as e:
            self.logger.error(f"ウェイポイント処理が失敗しました: {e}")
            raise DataProcessingError(f"ウェイポイントデータを処理できません: {e}") from e
    
    def _normalize_waypoint(
        self, waypoint: Dict[str, Union[str, float]]
    ) -> Dict[str, Union[str, float]]:
        """個々のウェイポイントデータを標準化します。"""
        # 標準化ロジックの実装
        normalized = waypoint.copy()
        
        # 座標精度の標準化
        if "latitude" in normalized:
            normalized["latitude"] = round(
                float(normalized["latitude"]), 
                self.config.coordinate_precision
            )
        
        return normalized
```

#### 2. 型ヒント
```python
from typing import (
    Any, Dict, List, Optional, Union, 
    Callable, Iterator, TypeVar, Generic
)

# 型エイリアス
ConfigDict = Dict[str, Any]
WaypointData = Dict[str, Union[str, float]]
ProcessingResult = List[WaypointData]

# ジェネリック型
T = TypeVar('T')

class DataCache(Generic[T]):
    """ジェネリックデータキャッシュクラス"""
    
    def __init__(self) -> None:
        self._cache: Dict[str, T] = {}
    
    def get(self, key: str) -> Optional[T]:
        """キャッシュデータを取得"""
        return self._cache.get(key)
    
    def set(self, key: str, value: T) -> None:
        """キャッシュデータを設定"""
        self._cache[key] = value
```

#### 3. エラーハンドリング
```python
class TFDIConverterError(Exception):
    """コンバーターの基本例外クラス"""
    pass


class DataValidationError(TFDIConverterError):
    """データ検証例外"""
    pass


class DatabaseConnectionError(TFDIConverterError):
    """データベース接続例外"""
    pass


def safe_database_operation(operation: Callable[[], T]) -> Optional[T]:
    """安全なデータベース操作ラッパー"""
    try:
        return operation()
    except sqlite3.Error as e:
        logger.error(f"データベース操作に失敗しました: {e}")
        raise DatabaseConnectionError(f"データベース操作に失敗しました: {e}") from e
    except Exception as e:
        logger.error(f"不明なエラー: {e}")
        return None
```

### テスト規約

#### 1. テスト構造
```python
# tests/test_converter.py
import pytest
from unittest.mock import Mock, patch
from pathlib import Path

from tfdi_converter.core.converter import FenixToTFDIConverter
from tfdi_converter.core.config import ConverterConfig
from tfdi_converter.exceptions import DataValidationError


class TestFenixToTFDIConverter:
    """Fenix から TFDIコンバーターへのテストクラス"""
    
    @pytest.fixture
    def sample_config(self) -> ConverterConfig:
        """サンプル設定の作成"""
        return ConverterConfig(
            output_dir="test_output",
            coordinate_precision=6,
            enable_validation=True
        )
    
    @pytest.fixture
    def sample_database(self, tmp_path: Path) -> Path:
        """サンプルデータベースの作成"""
        db_path = tmp_path / "test.db3"
        # テストデータベースを作成するロジック
        return db_path
    
    def test_converter_initialization(self, sample_config):
        """コンバーターの初期化をテスト"""
        converter = FenixToTFDIConverter(sample_config)
        
        assert converter.config == sample_config
        assert converter.config.coordinate_precision == 6
    
    def test_database_validation_success(
        self, sample_config, sample_database
    ):
        """データベース検証成功ケースのテスト"""
        converter = FenixToTFDIConverter(sample_config)
        
        result = converter.validate_database(sample_database)
        
        assert result is True
    
    def test_database_validation_failure(self, sample_config):
        """データベース検証失敗ケースのテスト"""
        converter = FenixToTFDIConverter(sample_config)
        invalid_db = Path("nonexistent.db3")
        
        with pytest.raises(DataValidationError):
            converter.validate_database(invalid_db)
    
    @patch('tfdi_converter.core.converter.sqlite3.connect')
    def test_database_connection_error(
        self, mock_connect, sample_config, sample_database
    ):
        """データベース接続エラーのテスト"""
        mock_connect.side_effect = sqlite3.Error("接続失敗")
        converter = FenixToTFDIConverter(sample_config)
        
        with pytest.raises(DatabaseConnectionError):
            converter.convert(sample_database, start_terminal_id=1000)
    
    @pytest.mark.performance
    def test_large_database_performance(
        self, sample_config, large_test_database
    ):
        """大規模データベースのパフォーマンスをテスト"""
        import time
        
        converter = FenixToTFDIConverter(sample_config)
        start_time = time.time()
        
        converter.convert(large_test_database, start_terminal_id=1000)
        
        elapsed_time = time.time() - start_time
        assert elapsed_time < 300  # 5分以内に完了すべき
```

#### 2. テストデータ管理
```python
# tests/conftest.py
import pytest
import sqlite3
from pathlib import Path


@pytest.fixture(scope="session")
def test_data_dir() -> Path:
    """テストデータディレクトリ"""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_fenix_database(tmp_path: Path) -> Path:
    """サンプルFenixデータベースの作成"""
    db_path = tmp_path / "sample_fenix.db3"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # テストテーブル構造の作成
    cursor.execute("""
        CREATE TABLE Airports (
            AirportID TEXT PRIMARY KEY,
            AirportName TEXT,
            Latitude REAL,
            Longitude REAL
        )
    """)
    
    # テストデータの挿入
    cursor.execute("""
        INSERT INTO Airports VALUES 
        ('ZBAA', 'Beijing Capital', 40.080111, 116.584556),
        ('ZSPD', 'Shanghai Pudong', 31.143378, 121.805214)
    """)
    
    conn.commit()
    conn.close()
    
    return db_path
```

### ドキュメント規約

#### 1. APIドキュメント
```python
def convert_fenix_database(
    database_path: Path,
    output_dir: Path,
    config: Optional[ConverterConfig] = None
) -> ConversionResult:
    """FenixデータベースをTFDI形式に変換します。
    
    この関数はFenix A320ナビゲーションデータベースファイルを受け取り、それを
    TFDI MD-11互換のJSON形式ファイル群に変換します。
    
    Args:
        database_path: Fenixデータベースファイルのパス (.db3ファイル)
        output_dir: 出力ディレクトリパス、変換後のファイルはこのディレクトリに保存されます
        config: オプションの変換設定オブジェクト。提供されない場合はデフォルト設定が使用されます
    
    Returns:
        ConversionResult: 変換結果と統計情報を含むオブジェクト
        
    Raises:
        FileNotFoundError: データベースファイルが存在しない場合
        DataValidationError: データベース形式が正しくない場合
        PermissionError: 出力ディレクトリへの書き込み権限がない場合
        
    Example:
        >>> from pathlib import Path
        >>> from tfdi_converter import convert_fenix_database
        >>> 
        >>> result = convert_fenix_database(
        ...     database_path=Path("fenix_nav.db3"),
        ...     output_dir=Path("./output")
        ... )
        >>> print(f"変換完了、処理済み {result.processed_records} 件のレコード")
        
    Note:
        変換プロセスは、データベースのサイズによって数分かかる場合があります。
        変換前に元のデータをバックアップすることをお勧めします。
        
    See Also:
        - :class:`ConverterConfig`: 変換設定オプション
        - :class:`ConversionResult`: 変換結果の詳細
    """
    pass
```

#### 2. ユーザー ドキュメント
```markdown
# 使用例

## 基本変換

```python
from tfdi_converter import FenixToTFDIConverter, ConverterConfig

# 設定を作成
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8
)

# コンバーターを初期化
converter = FenixToTFDIConverter(config)

# 変換を実行
result = converter.convert(
    database_path="path/to/fenix.db3",
    start_terminal_id=1000
)

print(f"変換完了！出力ファイル: {result.output_archive}")
```

## 高度な設定

```python
# カスタム設定
config = ConverterConfig(
    output_dir="Custom_Output",
    coordinate_precision=6,
    vnav_threshold=3.0,
    enable_faf_detection=True,
    compression_level=9
)
```
```

## 🧪 テストガイド

### テスト戦略

#### 1. ユニットテスト
- **カバレッジ目標**: 90%+
- **テスト範囲**: すべての公開メソッドと主要なプライベートメソッド
- **Mock戦略**: 外部依存関係（データベース、ファイルシステム）を隔離

#### 2. 統合テスト  
- **データベース統合**: 実際のテストデータベースを使用
- **ファイルシステム統合**: 実際のファイル読み書き操作をテスト
- **エンドツーエンドテスト**: 完全な変換フローテスト

#### 3. パフォーマンス テスト
- **ベンチマークテスト**: さまざまなデータセットサイズの処理時間を記録
- **メモリテスト**: メモリ使用とリークの監視
- **並行テスト**: マルチスレッドと並行安全性をテスト

### テストの実行

```bash
# クイックテスト（パフォーマンス テストを除く）
pytest -m "not performance"

# 完全なテストスイート
pytest

# 特定モジュールのテスト
pytest tests/test_converter.py

# カバレッジテスト
pytest --cov=tfdi_converter --cov-report=term-missing

# パフォーマンスベンチマークテスト
pytest tests/performance/ --benchmark-only
```

## 📚 ドキュメントへの貢献

### ドキュメントの種類

#### 1. ユーザー ドキュメント
- **インストールガイド**: 詳細なインストール手順
- **使用チュートリアル**: 基本から高度な使用例
- **トラブルシューティング**: よくある質問と解決策
- **APIリファレンス**: 完全なAPIドキュメント

#### 2. 開発者 ドキュメント
- **アーキテクチャ設計**: システムアーキテクチャと設計思想
- **貢献ガイド**: このドキュメント
- **コーディング規約**: コードスタイルとベストプラクティス
- **リリースプロセス**: バージョンリリースとメンテナンスプロセス

### ドキュメントのビルド

```bash
# ドキュメントの依存関係をインストール
pip install -r docs/requirements.txt

# ドキュメントをビルド
cd docs/
make html

# リアルタイムプレビュー
make livehtml
```

## 🐛 問題報告

### 問題報告テンプレート

```markdown
**問題の説明**
遭遇した問題を明確かつ簡潔に記述してください。

**再現手順**
1. '...' を実行
2. '...' を入力
3. エラー '...' を表示

**期待される動作**
期待される状況を記述してください。

**実際の動作**
実際に発生した状況を記述してください。

**環境情報**
- OS: [例: Windows 11, macOS 12.0, Ubuntu 20.04]
- Python: [例: 3.9.16]
- コンバーターバージョン: [例: v1.0.0]
- Fenix バージョン: [例: v1.2.0]
- TFDI バージョン: [例: v1.1.0]

**データベース情報**
- データベースサイズ: [例: 150MB]
- レコード数: [例: ~50,000 件]
- AIRACサイクル: [例: 2508]

**ログ情報**
```
関連するログ情報またはエラーのスタックトレースを貼り付けてください
```

**添付ファイル**
- 設定ファイル
- エラースクリーンショット
- サンプルデータ（可能な場合）
```

### 問題タグ

問題を分類するために以下のタグを使用してください：
- 🐛 `bug` - エラー報告
- ✨ `enhancement` - 機能リクエスト
- 📚 `documentation` - ドキュメント関連
- ❓ `question` - 使用上の質問
- 🔥 `urgent` - 緊急問題
- 🆕 `good first issue` - 新しい貢献者向け

## 🏆 評価と報酬

### 貢献者の評価

#### 1. コード貢献者
- **コミッターリスト**: READMEおよびドキュメント内の貢献者リスト
- **リリースノート**: バージョンリリースノートで特別な感謝
- **GitHub統計**: 貢献統計と達成バッジ

#### 2. ドキュメント貢献者
- **ドキュメントの署名**: 関連するドキュメントページでの署名
- **翻訳の評価**: 多言語版の翻訳者リスト
- **チュートリアル作者**: コミュニティチュートリアルの著者評価

#### 3. コミュニティ貢献者
- **問題報告**: 重要な問題を発見した方への特別な感謝
- **テストへの貢献**: ベータテストと品質保証への貢献者
- **プロモーションへの貢献**: コミュニティプロモーションと教育への貢献者

### 特別貢献報酬

#### 月間貢献者
- 毎月、優れた貢献者を選出
- プロジェクトのホームページとソーシャルメディアで宣伝
- 特殊なGitHubバッジと称号

#### 年間貢献者
- 年間最優秀貢献者の選出
- 特製記念品と証明書
- プロジェクト意思決定委員会への招待

## 📞 連絡先

### 開発チームの連絡先

- **プロジェクトメンテナー**: @maintainer-username
- **技術責任者**: @tech-lead-username  
- **コミュニティ管理**: @community-manager-username

### コミュニケーションチャネル

- **GitHub Issues**: 技術的な問題と機能リクエスト
- **GitHub Discussions**: 一般的な議論とQ&A
- **メーリングリスト**: dev@tfdi-converter.org
- **Discord**: [招待リンク]

### 応答時間の約束

- **バグ報告**: 48時間以内に応答
- **機能リクエスト**: 1週以内に返信
- **Pull Request**: 3営業日以内にレビュー
- **コミュニティの問題**: 24時間以内に返信

---

**TFDIナビゲーションデータコンバーターへの貢献をご検討いただき、ありがとうございます！** 

より良いフライトシミュレーションツールを共に構築できることを楽しみにしています。🚁✨
