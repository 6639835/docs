# 🤝 貢献ガイド

iFly ナビゲーションデータコンバータープロジェクトにご関心をお寄せいただきありがとうございます！あらゆる形態の貢献を歓迎し、感謝いたします。

## 🌟 貢献方法

### 💻 コード貢献
- 🐛 バグ修正
- ✨ 新機能追加
- 📈 パフォーマンス最適化
- 🧪 テストケース追加
- 📚 ドキュメント改善

### 📝 非コード貢献
- 🐛 問題報告
- 💡 機能提案
- 📖 ドキュメント充実化
- 🌐 翻訳サポート
- 🎓 チュートリアル作成

## 🚀 クイックスタート

### 1. 環境準備

```bash
# クローン倉庫
git clone https://github.com/your-username/ifly-nav-converter.git
cd ifly-nav-converter

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt
pip install -r requirements-dev.txt  # 開発依存
```

### 2. 開発環境設定

```bash
# 安装预提交钩子
pre-commit install

# 运行测试
pytest

# 代码质量检查
flake8 .
mypy .
black . --check
```

## 📋 開発フロー

### 1. 機能ブランチの作成

```bash
# 从主分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 或修复分支
git checkout -b fix/issue-description
```

### 2. 開発とテスト

```bash
# 进行开发
# ... 编写代码 ...

# 运行测试
pytest tests/

# 检查代码质量
black .
flake8 .
mypy .
```

### 3. コードコミット

```bash
# 添加文件
git add .

# 提交（遵循提交信息规范）
git commit -m "feat: add new feature description"

# 推送到远程分支
git push origin feature/your-feature-name
```

### 4. Pull Requestの作成

1. GitHubでPull Requestを作成
2. PRの詳しい説明を記入
3. 全てのチェックがパスしていることを確認
4. コードレビューを待つ

## 📝 コーディング規約

### Python コードスタイル

コード品質を確保するために、以下のツールを使用しています：

- **Black**：コード整形
- **Flake8**：コードスタイルチェック
- **MyPy**：型チェック
- **isort**：インポート順序整理

### コード例

```python
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class NavigationDataConverter:
    """ナビゲーションデータコンバーターのメインクラス。
    
    このクラスはFenixナビゲーションデータをiFly形式に変換する役割を担います。
    
    Attributes:
        config: コンバーター設定
        logger: ロガー
    """
    
    def __init__(self, config: ConverterConfig) -> None:
        """コンバーターを初期化します。
        
        Args:
            config: コンバーター設定オブジェクト
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def convert_data(
        self, 
        source_path: Path,
        target_path: Path,
        options: Optional[Dict[str, Any]] = None
    ) -> bool:
        """ナビゲーションデータを変換します。
        
        Args:
            source_path: 元データパス
            target_path: ターゲットデータパス  
            options: オプションの変換オプション
            
        Returns:
            変換が成功したかどうか
            
        Raises:
            ConversionError: 変換中にエラーが発生しました
        """
        try:
            # 変換ロジックを実装
            return True
        except Exception as e:
            self.logger.error(f"変換失敗: {e}")
            raise ConversionError(f"データ変換失敗: {e}") from e
```

### コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/) 規約を使用します：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**タイプ識別子：**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コード書式調整
- `refactor`: コードリファクタリング
- `test`: テストケース
- `chore`: ビルドプロセスまたは補助ツールの変更

**例：**
```
feat(converter): add magnetic declination calculation

- Implement WMM-2025 model integration
- Add pygeomag dependency
- Improve calculation accuracy

Closes #123
```

## 🧪 テストガイド

### テスト構造

```
tests/
├── unit/           # ユニットテスト
├── integration/    # 統合テスト
├── fixtures/       # テストデータ
└── conftest.py     # テスト設定
```

### テストの記述

```python
import pytest
from pathlib import Path
from ifly_converter.converter import NavigationDataConverter


class TestNavigationDataConverter:
    """ナビゲーションデータコンバーターのテストクラス。"""
    
    @pytest.fixture
    def converter(self):
        """テスト用のコンバーターインスタンスを作成します。"""
        config = ConverterConfig(
            output_dir="test_output",
            coordinate_precision=8
        )
        return NavigationDataConverter(config)
    
    def test_convert_data_success(self, converter, tmp_path):
        """データ変換成功のケースをテストします。"""
        source = tmp_path / "source.db3"
        target = tmp_path / "target"
        
        # テストデータを作成
        source.touch()
        
        # 変換を実行
        result = converter.convert_data(source, target)
        
        # 結果を検証
        assert result is True
        assert target.exists()
    
    def test_convert_data_failure(self, converter):
        """データ変換失敗のケースをテストします。"""
        with pytest.raises(ConversionError):
            converter.convert_data(
                Path("nonexistent.db3"),
                Path("target")
            )
```

### テストの実行

```bash
# 全てのテストを実行
pytest

# 指定したテストファイルを実行
pytest tests/unit/test_converter.py

# テストを実行し、カバレッジレポートを生成
pytest --cov=ifly_converter --cov-report=html

# パフォーマンステストを実行
pytest tests/performance/ -m performance
```

## 📚 ドキュメント貢献

### ドキュメント構造

```
docs/
├── guide/          # ユーザーガイド
├── api/            # APIドキュメント
├── examples/       # サンプルコード
└── deployment/     # デプロイガイド
```

### ドキュメント規約

- **Markdown**形式を使用
- コード例を含める
- 多言語サポートを提供
- ドキュメントを最新の状態に保つ

### ドキュメント例

```markdown
## 🔧 設定管理

### 基本設定

コンバーターは `ConverterConfig` クラスを使用して設定を管理します：

```python
from ifly_converter.config import ConverterConfig

# デフォルト設定を作成
config = ConverterConfig()

# カスタム設定
config = ConverterConfig(
    output_dir="custom_output",
    coordinate_precision=6,
    enable_validation=True
)
```

### 設定オプション

| オプション | 型 | デフォルト値 | 説明 |
|------|------|--------|------|
| `output_dir` | str | "output" | 出力ディレクトリ |
| `coordinate_precision` | int | 8 | 座標精度 |
| `enable_validation` | bool | True | 検証を有効にする |
```

## 🐛 問題報告

### 問題報告テンプレート

問題を報告する際は、以下の情報を提供してください：

```markdown
**問題の説明**
遭遇した問題を明確かつ簡潔に説明してください。

**再現手順**
1. 最初のステップ '...'
2. 2番目のステップ '...'
3. 3番目のステップ '...'
4. エラーを確認

**期待される動作**
期待される動作を説明してください。

**実際の動作**
実際に発生した動作を説明してください。

**環境情報**
- OS: [例: Windows 10]
- Python バージョン: [例: 3.9.0]
- プロジェクトバージョン: [例: v2.0.0]

**ログ情報**
```
関連するログ情報を貼り付けてください
```

**スクリーンショット**
必要に応じて、問題の説明に役立つスクリーンショットを追加してください。

**補足情報**
その他、関連するコンテキスト情報を追加してください。
```

### 問題分類

以下のラベルを使用して問題を分類します：

- 🐛 `bug` - バグ報告
- ✨ `enhancement` - 機能リクエスト
- 📚 `documentation` - ドキュメント関連
- ❓ `question` - 使用上の質問
- 🔥 `priority: high` - 高優先度
- 🧹 `good first issue` - 初心者向け

## 📋 機能リクエスト

### 機能リクエストテンプレート

```markdown
**機能概要**
追加したい機能を簡潔に説明してください。

**解決される問題**
この機能はどのような問題を解決しますか？

**詳細な説明**
機能の動作方法を詳しく説明してください。

**代替案**
他の解決策も検討しましたか？

**追加情報**
その他の関連情報、スクリーンショット、または例を追加してください。
```

## 🎯 開発ロードマップ

### 短期目標（1～3ヶ月）
- [ ] GUIインターフェース開発
- [ ] バッチ処理機能
- [ ] データ検証ツール強化
- [ ] パフォーマンス最適化

### 中期目標（3～6ヶ月）
- [ ] 複数形式サポート
- [ ] クラウド処理
- [ ] REST APIインターフェース
- [ ] プラグインシステム

### 長期目標（6～12ヶ月）
- [ ] 機械学習最適化
- [ ] リアルタイムデータ更新
- [ ] モバイルサポート
- [ ] エンタープライズ機能

## 🏆 貢献者

プロジェクトに貢献してくださった全ての開発者に感謝いたします！

<!-- 貢献者リストは自動的に更新されます -->

## 📞 お問い合わせ

- 📧 **メール**：project@example.com
- 💬 **ディスカッション**：GitHub Discussions
- 🐛 **問題**：GitHub Issues
- 🌐 **公式サイト**：https://ifly-converter.org

---

改めてご貢献に感謝いたします！一緒に、より良いiFlyナビゲーションデータコンバーターを作りましょう！🚀