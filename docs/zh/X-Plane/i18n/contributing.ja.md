# 貢献ガイド

Nav-data オープンソースプロジェクトへのご参加を歓迎します！航空ナビゲーションデータ変換ツールへの皆様のご貢献に心より感謝申し上げます。

## 🤝 参加方法

### 問題報告 (Issues)
- **バグ報告**: プログラムのエラーや異常な動作を発見した場合
- **機能リクエスト**: 新機能の提案または既存機能の改善
- **ドキュメント改善**: ドキュメント内の誤りや不明瞭な点の指摘
- **パフォーマンス問題**: パフォーマンスのボトルネックや最適化の提案

### コード貢献 (Pull Requests)
- **バグ修正**: 既知の問題の修正
- **新機能開発**: 新しいデータ処理機能の実装
- **パフォーマンス最適化**: コードの実行効率の向上
- **コードリファクタリング**: コード構造と保守性の改善

### ドキュメント貢献
- **技術ドキュメント**: API ドキュメントとアーキテクチャ説明の充実
- **ユーザーガイド**: 使用方法とチュートリアルの改善
- **サンプルコード**: より多くの使用例の提供
- **多言語翻訳**: ドキュメントの他言語への翻訳

## 📋 開始する前に

### 1. プロジェクトを理解する
貢献を開始する前に、以下をご確認ください。
- [アーキテクチャ説明](./architecture.md) を確認する
- [使用方法](./guide/usage.md) を理解する
- 既存の [Issues](https://github.com/your-repo/nav-data/issues) を参照する

### 2. 環境準備
開発環境が要件を満たしていることを確認してください。
- Python 3.6+
- Git
- 必要な依存パッケージ（[インストールガイド](./guide/installation.md) を参照）

### 3. プロジェクトをフォークする
1. [Nav-data GitHub ページ](https://github.com/your-repo/nav-data) にアクセスする
2. 右上の「Fork」ボタンをクリックする
3. フォークしたリポジトリをローカルにクローンする：
   ```bash
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

## 🐛 問題の報告

### バグ報告テンプレート

バグを報告する際は、以下の情報を提供してください。

```markdown
**バグの説明**
簡潔に遭遇した問題を説明してください。

**再現手順**
1. '...' コマンドを実行
2. '...' データファイルを使用
3. '...' エラーを観察

**期待される動作**
期待される動作を記述してください。

**実際の動作**
実際に発生した動作を記述してください。

**環境情報**
- オペレーティングシステム: [例: macOS 12.0]
- Python バージョン: [例: 3.9.7]
- Nav-data バージョン: [例: v1.2.0]

**追加情報**
- エラーログ
- 関連するスクリーンショット
- サンプルデータファイル（該当する場合）
```

### 機能リクエストテンプレート

```markdown
**機能の説明**
簡潔に、追加したい機能を説明してください。

**利用シナリオ**
この機能が解決する具体的な問題や使用シナリオを説明してください。

**提案される実装案**
具体的な実装案があれば、詳しく記述してください。

**代替案**
検討した他の代替案を説明してください。

**追加情報**
その他の関連情報や参考資料。
```

## 💻 コード貢献フロー

### 1. ブランチの作成
貢献のために新しいブランチを作成します。

```bash
# main ブランチが最新であることを確認
git checkout main
git pull upstream main

# 新しいブランチを作成
git checkout -b feature/your-feature-name
# またはバグ修正の場合
git checkout -b fix/issue-number-description
```

### 2. 開発とテスト
開発中に：

```bash
# こまめに変更をコミット
git add .
git commit -m "feat: add waypoint validation function"

# テストを実行してコード品質を確保
python -m pytest tests/
python -m flake8 .
python -m black . --check
```

### 3. プルリクエストの提出
開発が完了したら：

```bash
# ブランチをフォークにプッシュ
git push origin feature/your-feature-name
```

その後、GitHub上でプルリクエストを作成します。

### プルリクエストテンプレート

```markdown
**変更の種類**
- [ ] バグ修正
- [ ] 新機能
- [ ] コードリファクタリング
- [ ] ドキュメント更新
- [ ] パフォーマンス最適化

**変更内容の説明**
簡潔に、このPRでの変更内容を説明してください。

**関連するIssue**
- Fixes #(issue number)
- Related to #(issue number)

**テスト**
- [ ] 新しいテストケースを追加
- [ ] 既存の全テストがパス
- [ ] 手動テストで検証済み

**チェックリスト**
- [ ] コードはプロジェクトのコーディング規約に従っている
- [ ] 必要なドキュメントが追加されている
- [ ] 関連するREADMEまたは設定が更新されている
- [ ] 後方互換性が考慮されている
```

## 📝 コーディング規約

### Python コーディング標準

#### 1. コードスタイル
[PEP 8](https://pep8.org/) を基本とし、以下の補足規約に従います。

```python
# インポート順序
import os  # 標準ライブラリ
import sys

import pandas as pd  # サードパーティライブラリ
import numpy as np

from .utils import helper_function  # ローカルインポート

# クラス定義
class NavigationDataProcessor:
    """
    ナビゲーションデータプロセッサ
    
    CSV、PDFなどの様々な形式の航空ナビゲーションデータを処理し、変換します。
    
    Attributes:
        input_format (str): 入力データ形式
        output_format (str): 出力データ形式
    """
    
    def __init__(self, input_format: str, output_format: str):
        """
        プロセッサを初期化する
        
        Args:
            input_format: 入力データ形式 ('csv', 'pdf', 'dat')
            output_format: 出力データ形式 ('dat', 'txt', 'json')
        """
        self.input_format = input_format
        self.output_format = output_format
    
    def process(self, data: Any) -> Any:
        """
        データを処理する主要メソッド
        
        Args:
            data: 入力データ
            
        Returns:
            処理後のデータ
            
        Raises:
            ValueError: 入力データ形式がサポートされていない場合に発生
        """
        if not self._validate_input(data):
            raise ValueError(f"Invalid input format: {type(data)}")
        
        return self._convert_data(data)
```

#### 2. 命名規約
```python
# 定数: 全て大文字、アンダースコア区切り
CHINA_AREAS = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW'}
MAX_RETRY_COUNT = 3

# 変数と関数: 小文字、アンダースコア区切り
def process_waypoint_data(input_file: str) -> List[Dict]:
    waypoint_list = []
    error_count = 0
    return waypoint_list

# クラス名: パスカルケース
class CSVDataProcessor:
    pass

# プライベートメソッド: 単一アンダースコアプレフィックス
def _validate_coordinates(self, lat: float, lon: float) -> bool:
    pass

# 内部使用: 二重アンダースコアプレフィックス
def __internal_helper(self) -> None:
    pass
```

#### 3. 型ヒント
すべての公開関数には型ヒントを含める必要があります。

```python
from typing import Dict, List, Optional, Union, Any

def convert_coordinates(
    input_coords: Union[str, Tuple[float, float]], 
    output_format: str = "decimal"
) -> Optional[Dict[str, float]]:
    """
    座標形式を変換する
    
    Args:
        input_coords: 入力座標、文字列またはタプル形式をサポート
        output_format: 出力フォーマット、'decimal' または 'dms' をサポート
        
    Returns:
        変換された座標の辞書、失敗した場合は None
    """
    pass
```

#### 4. ドキュメント文字列
Googleスタイルのドキュメント文字列を使用します。

```python
def process_airway_csv(csv_file: str, output_file: str, 
                      excluded_areas: Set[str] = None) -> bool:
    """
    航空路CSVデータファイルを処理する
    
    CSVファイルから航空路データを読み込み、検証と変換を行い、
    X-Plane DAT形式で出力します。地域フィルタリング機能をサポートしています。
    
    Args:
        csv_file: 入力CSVファイルパス
        output_file: 出力DATファイルパス  
        excluded_areas: 除外する地域コードのセット、デフォルトはNone
        
    Returns:
        処理成功時にTrue、失敗時にFalseを返します
        
    Raises:
        FileNotFoundError: 入力ファイルが存在しない場合に発生
        ValueError: CSVフォーマットが誤っている場合に発生
        
    Example:
        >>> process_airway_csv('routes.csv', 'earth_awy.dat', {'ZB', 'ZG'})
        True
        
    Note:
        処理中に元の出力ファイルが自動的にバックアップされます。
    """
    pass
```

### コード品質ツール

#### 1. コード整形
[Black](https://black.readthedocs.io/) を使用してコードを整形します。

```bash
# インストール
pip install black

# プロジェクト全体を整形
black .

# 整形チェックのみ（変更なし）
black . --check

# 単一ファイルを整形
black script.py
```

#### 2. コード検査
[flake8](https://flake8.pycqa.org/) を使用してコードを検査します。

```bash
# インストール
pip install flake8

# プロジェクト全体を検査
flake8 .

# 設定ファイル .flake8
[flake8]
max-line-length = 88
ignore = E203, W503
exclude = 
    .git,
    __pycache__,
    build,
    dist,
    venv,
    .venv
```

#### 3. 型チェック
[mypy](http://mypy-lang.org/) を使用して型チェックを行います。

```bash
# インストール
pip install mypy

# 型をチェック
mypy .

# 設定ファイル mypy.ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
```

### Gitコミット規約

#### コミットメッセージのフォーマット
[Conventional Commits](https://www.conventionalcommits.org/) 規約を使用します。

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### コミットタイプ
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイル（コードの動作に影響を与えない変更）
- `refactor`: リファクタリング（機能追加でもバグ修正でもないコード変更）
- `perf`: パフォーマンス最適化
- `test`: テストの追加
- `chore`: ビルドプロセスまたは補助ツールの変更

#### 例
```bash
# 新機能
git commit -m "feat(airway): add AIRAC cycle validation"

# バグ修正
git commit -m "fix(pdf): resolve coordinate parsing error for edge cases"

# ドキュメント更新
git commit -m "docs: update installation guide for macOS"

# リファクタリング
git commit -m "refactor(terminal): extract common validation logic"
```

## 🧪 テストガイド

### テスト構造
```
tests/
├── unit/                   # ユニットテスト
│   ├── test_airway.py
│   ├── test_pdf_extract.py
│   └── test_terminal.py
├── integration/            # 統合テスト
│   ├── test_full_pipeline.py
│   └── test_module_interaction.py
├── fixtures/               # テストデータ
│   ├── sample_data/
│   └── expected_outputs/
└── conftest.py            # pytest 設定
```

### テストの書き方

#### ユニットテストの例
```python
import pytest
from unittest.mock import Mock, patch
from nav_data.airway import NavigationPoint, process_navigation_point

class TestNavigationPoint:
    """ナビゲーションポイントのテストクラス"""
    
    def test_navigation_point_creation(self):
        """ナビゲーションポイント作成のテスト"""
        point = NavigationPoint("ABCDE", "DESIGNATED_POINT", "ZB")
        
        assert point.identifier == "ABCDE"
        assert point.type.code_type == "DESIGNATED_POINT"
        assert point.area_code == "ZB"
    
    def test_navigation_point_invalid_type(self):
        """無効なナビゲーションポイントタイプのテスト"""
        with pytest.raises(ValueError):
            NavigationPoint("ABCDE", "INVALID_TYPE", "ZB")
    
    @pytest.mark.parametrize("identifier,expected", [
        ("ABCDE", True),
        ("", False),
        (None, False),
    ])
    def test_navigation_point_validation(self, identifier, expected):
        """ナビゲーションポイント検証のパラメータ化テスト"""
        result = validate_navigation_identifier(identifier)
        assert result == expected
```

#### 統合テストの例
```python
import tempfile
from pathlib import Path
from nav_data.pipeline import DataPipeline

class TestDataPipeline:
    """データパイプライン統合テスト"""
    
    @pytest.fixture
    def temp_directory(self):
        """一時ディレクトリ fixture"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def sample_csv_data(self):
        """サンプルCSVデータ"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123"""
    
    def test_complete_pipeline(self, temp_directory, sample_csv_data):
        """完全なデータ処理パイプラインのテスト"""
        # テストデータの準備
        input_file = temp_directory / "input.csv"
        input_file.write_text(sample_csv_data)
        output_file = temp_directory / "output.dat"
        
        # パイプラインを実行
        pipeline = DataPipeline()
        result = pipeline.process(str(input_file), str(output_file))
        
        # 結果を検証
        assert result is True
        assert output_file.exists()
        
        output_content = output_file.read_text()
        assert "ABCDE" in output_content
        assert "FGHIJ" in output_content
```

### テストの実行
```bash
# すべてのテストを実行
pytest

# 特定のテストファイルを実行
pytest tests/unit/test_airway.py

# 特定のテストメソッドを実行
pytest tests/unit/test_airway.py::TestNavigationPoint::test_navigation_point_creation

# カバレッジレポートを生成
pytest --cov=nav_data tests/

# 詳細出力
pytest -v

# 最初の失敗で停止
pytest -x
```

## 📚 ドキュメント貢献

### ドキュメント構造
```
docs/
├── guide/                  # ユーザーガイド
│   ├── index.md           # ガイドのホームページ
│   ├── installation.md    # インストールガイド
│   ├── configuration.md   # 設定説明
│   └── usage.md           # 使用方法
├── api/                    # APIドキュメント
│   ├── airway.md
│   ├── pdf_extract.md
│   └── terminal.md
├── architecture.md         # アーキテクチャ説明
├── contributing.md         # 貢献ガイド
├── changelog.md           # 更新履歴
└── license.md             # ライセンス
```

### ドキュメント作成規約

#### Markdown フォーマット
```markdown
---
title: ドキュメントタイトル
description: ドキュメントの説明
---

# 1次見出し

簡潔にドキュメントの内容を紹介します。

## 2次見出し

### 3次見出し

本文コンテンツは明確な日本語で表現してください。

#### コード例
コードブロックを使用して例を示します。

```python
def example_function():
    """例示関数"""
    return "Hello, Nav-data!"
```

#### 注意事項
> **注意**: 重要なヒントは引用形式を使用します。

**警告**: 警告メッセージは太字を使用します。

#### リンクと参照
- 内部リンク：[インストールガイド](./guide/installation.md)
- 外部リンク：[Python 公式サイト](https://python.org)
- コード参照：`code` 形式でコードを参照します
```

#### 技術文書作成ガイド
1. **明確かつ簡潔**: 簡潔で分かりやすい言葉を使用する
2. **構造化**: 見出し、リスト、表を使用して内容を整理する
3. **豊富な例**: 十分なコード例を提供する
4. **ユーザーフレンドリー**: ユーザーの視点からドキュメントを作成する
5. **タイムリーな更新**: ドキュメントとコードを同期させる

### APIドキュメント
すべての公開APIについて詳細なドキュメントを作成します。

```python
def process_csv_data(csv_file: str, output_format: str = "dat") -> Dict[str, Any]:
    """
    CSV形式のナビゲーションデータを処理する
    
    この関数はCSV形式の航空路データを読み込み、検証と変換を行い、
    指定された形式のナビゲーションデータファイルとして出力します。
    
    Args:
        csv_file (str): 入力CSVファイルパス
        output_format (str, optional): 出力フォーマット、'dat', 'json', 'xml' をサポート。
                                     デフォルトは 'dat'。
    
    Returns:
        Dict[str, Any]: 処理結果情報。以下のキーが含まれます：
            - 'success' (bool): 処理が成功したかどうか
            - 'processed_count' (int): 正常に処理されたレコード数
            - 'error_count' (int): エラーレコード数
            - 'output_file' (str): 出力ファイルパス
    
    Raises:
        FileNotFoundError: 入力ファイルが存在しない場合に発生
        ValueError: CSVフォーマットが正しくない場合に発生
        PermissionError: 出力ファイルへの書き込みができない場合に発生
    
    Example:
        基本的な使用例：
        
        >>> result = process_csv_data('airway_data.csv')
        >>> print(result['success'])
        True
        
        出力フォーマットを指定する場合：
        
        >>> result = process_csv_data('airway_data.csv', 'json')
        >>> print(result['output_file'])
        'airway_data.json'
    
    Note:
        - 入力CSVファイルには標準的な航空路データフィールドが含まれている必要があります
        - 処理中にデータの完全性が自動的に検証されます
        - 中断後の再開機能（断点续传機能）をサポートします
    
    See Also:
        :func:`validate_csv_format`: CSVフォーマット検証
        :func:`convert_coordinate_format`: 座標フォーマット変換
    """
    pass
```

## 🔍 コードレビュー

### レビューチェックリスト

#### 機能性
- [ ] コードは期待される機能を実装しているか
- [ ] すべてのエッジケースを処理しているか
- [ ] エラー処理は適切か
- [ ] パフォーマンスは要件を満たしているか

#### コード品質
- [ ] コード構造は明確か
- [ ] 命名は記述的か
- [ ] 関数の責務は単一か
- [ ] コードの重複は避けられているか

#### セキュリティ
- [ ] 入力検証は十分か
- [ ] セキュリティ脆弱性はないか
- [ ] 機密情報は適切に処理されているか
- [ ] 権限管理は適切か

#### テスト
- [ ] テストカバレッジは十分か
- [ ] テストケースは網羅的か
- [ ] 統合テストはパスしているか
- [ ] パフォーマンステストは要件を満たしているか

#### ドキュメント
- [ ] コードコメントは十分か
- [ ] APIドキュメントは完全か
- [ ] ユーザー向けドキュメントは更新されているか
- [ ] 変更履歴は更新されているか

### レビューフィードバック
建設的なフィードバックを提供します。

```markdown
**全体評価**
コードは期待される機能を実装しており、構造は明確で、テストカバレッジも十分です。

**具体的な意見**
1. **コード構造**: `process_data` 関数が長すぎるため、複数の小さな関数に分割することを推奨します。
2. **パフォーマンス最適化**: 45行目のループはリスト内包表記で最適化を検討できます。
3. **エラー処理**: 78行目に具体的な例外タイプを追加することを推奨します。

**推奨される修正**
```python
# このコードを推奨
for item in data_list:
    if validate_item(item):
        processed_list.append(process_item(item))

# に変更
processed_list = [
    process_item(item) 
    for item in data_list 
    if validate_item(item)
]
```

**その他**
ドキュメントに利用例を追加する必要があります。
```

## 🚀 リリースプロセス

### バージョン番号規約
[セマンティックバージョニング](https://semver.org/lang/zh-CN/) (Semantic Versioning) を使用します。

- **メジャーバージョン**: 互換性のないAPI変更
- **マイナーバージョン**: 後方互換性のある機能追加
- **パッチバージョン**: 後方互換性のある問題修正

例：`1.2.3`

### リリースチェックリスト
リリース前に以下を確認します。
- [ ] すべてのテストがパスしているか
- [ ] ドキュメントは更新されているか
- [ ] 変更履歴は更新されているか
- [ ] バージョン番号は更新されているか
- [ ] 依存関係は正しいか
- [ ] セキュリティレビューはパスしているか

## 🏆 貢献者への報酬

### 認知メカニズム
- **コード貢献者**: READMEにすべての貢献者をリストする
- **ドキュメント貢献者**: ドキュメントに貢献者情報を明記する
- **問題報告者**: Issue解決後に感謝を表明する
- **長期貢献者**: プロジェクトメンテナーとして招待する

### メンテナーになる
長期にわたり活発に貢献している方は、プロジェクトメンテナーとして招待される場合があります。これにより、以下の権限を得られます。
- 直接プッシュ権限
- プルリクエストのレビュー権限
- プロジェクトの意思決定への参加権
- プロジェクト紹介での特別な感謝

## 📞 連絡先

### ヘルプの取得
- **GitHub Issues**: 問題の報告や機能リクエスト
- **GitHub Discussions**: 一般的な議論とQ&A
- **ドキュメント**: 詳細な使用ガイドを参照
- **コードコメント**: ソースコード内の詳細なコメントを参照

### コミュニティガイドライン
プロジェクトに参加する際は、以下の原則に従ってください。
- **他者への尊重**: 友好的でプロフェッショナルな態度を保つ
- **建設的な議論**: 価値のあるフィードバックと提案を提供する
- **包括性**: さまざまなバックグラウンドを持つ貢献者を歓迎する
- **学習志向**: 他者の学習と成長を支援する

## 🙏 謝辞

Nav-dataプロジェクトに貢献してくださったすべての開発者、テスター、ドキュメント貢献者、ユーザーの皆様に感謝いたします！

### 特別な感謝
- コアメンテナンスチーム
- 長期貢献者
- 問題報告者
- ドキュメント翻訳者
- コミュニティサポーター

---

**重ねて、皆様の貢献に感謝いたします！** 🎉 皆様のご参加により、Nav-dataはより良いものとなり、航空シミュレーションコミュニティに高品質なナビゲーションデータツールを提供できるようになります。