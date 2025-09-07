# 🤝 貢献ガイド

Nav-dataプロジェクトへの貢献を歓迎します！このガイドは、プロジェクト開発への参加方法、コードの提出、改善提案の方法を理解するのに役立ちます。

## 🎯 貢献方法

### 📝 貢献方法は以下の通りです：

- **🐛 バグ報告**：問題を発見し、詳細な再現手順を提供
- **💡 機能提案**：新機能の提案や既存機能の改善案
- **📖 ドキュメント改善**：ドキュメントの補完、誤りの修正、例の追加
- **🔧 コード貢献**：バグ修正、新機能の実装、パフォーマンス最適化
- **🧪 テスト支援**：テストケースの追加、テストカバレッジの改善
- **🌐 ローカライズ**：ドキュメントの翻訳、より多くの言語と地域への対応

## 🚀 クイックスタート

### 📋 開発環境のセットアップ

1. **プロジェクトリポジトリをフォーク**
   ```bash
   # GitHubでプロジェクトをフォーク
   # その後、ローカルにクローン
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

2. **開発環境のセットアップ**
   ```bash
   # 仮想環境を作成
   python -m venv venv
   
   # 仮想環境をアクティベート
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # 依存関係をインストール
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # 開発依存
   ```

3. **Gitフックをインストール**
   ```bash
   # pre-commitフックをインストール
   pre-commit install
   ```

### 🔄 開発ワークフロー

1. **ブランチの作成**
   ```bash
   git checkout -b feature/your-feature-name
   # または
   git checkout -b fix/bug-description
   ```

2. **開発の実施**
   - コードを作成
   - テストを追加
   - ドキュメントを更新
   - テストを実行して合格を確認

3. **コードをコミット**
   ```bash
   git add .
   git commit -m "feat: add new navigation data processor"
   ```

4. **プッシュしてPRを作成**
   ```bash
   git push origin feature/your-feature-name
   # GitHubでプルリクエストを作成
   ```

## 📋 コーディング規約

### 🐍 Pythonコードスタイル

私たちは[PEP 8](https://pep8.org/)標準に従い、以下のツールを使用しています：

#### **コードフォーマッター**
```bash
# blackを使用してコードをフォーマット
black *.py

# isortを使用してimportを整理
isort *.py
```

#### **コードチェック**
```bash
# flake8を使用してコードをチェック
flake8 *.py

# pylintを使用して静的解析を実行
pylint *.py
```

### 📝 コーディング規約要件

#### **1. 関数とクラスの命名**
```python
# ✅ 正しい命名
def process_airports(csv_file_path: str, db_path: str) -> None:
    """空港データを処理"""
    pass

class CoordinateCache:
    """座標キャッシュクラス"""
    pass

# ❌ 誤った命名
def processAirports(csvFile, dbPath):
    pass

class coordinateCache:
    pass
```

#### **2. ドキュメント文字列**
```python
def get_magnetic_variation(lat: float, lon: float) -> float:
    """
    指定された座標の磁気偏差を計算します
    
    引数:
        lat (float): 緯度（十進法度数）
        lon (float): 経度（十進法度数）
    
    戻り値:
        float: 磁気偏差（度）、小数点以下1桁
    
    例:
        >>> get_magnetic_variation(39.9042, 116.4074)
        -6.2
    """
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)
```

#### **3. 型ヒント**
```python
from typing import Dict, List, Optional, Tuple

def parse_dat_file(file_path: str) -> List[Dict[str, str]]:
    """DATファイルを解析し、レコードのリストを返します"""
    records = []
    # 処理ロジック
    return records

def find_coordinates(
    identifier: str, 
    icao_code: Optional[str] = None
) -> Tuple[float, float]:
    """座標を検索し、緯度経度のタプルを返します"""
    return lat, lon
```

#### **4. エラー処理**
```python
import logging

logger = logging.getLogger(__name__)

def process_data_file(file_path: str) -> bool:
    """
    データファイルを処理します
    
    戻り値:
        bool: 処理が成功したかどうか
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            # 処理ロジック
            data = file.read()
            
        logger.info(f"ファイルの処理に成功しました: {file_path}")
        return True
        
    except FileNotFoundError:
        logger.error(f"ファイルが見つかりません: {file_path}")
        return False
    except PermissionError:
        logger.error(f"ファイルアクセス権が不足しています: {file_path}")
        return False
    except Exception as e:
        logger.error(f"ファイルの処理中に不明なエラーが発生しました: {e}")
        return False
```

#### **5. 定数定義**
```python
# モジュールの上部で定数を定義
SUPPORTED_ICAO_REGIONS = {
    'ZB', 'ZS', 'ZJ', 'ZG', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH',
    'VM', 'VH', 'RK'
}

DEFAULT_BATCH_SIZE = 1000
COORDINATE_PRECISION = 8
DATABASE_TIMEOUT = 30

# 関数内で使用
def process_waypoints(icao_code: str) -> bool:
    if icao_code not in SUPPORTED_ICAO_REGIONS:
        logger.warning(f"サポートされていないICAO地域: {icao_code}")
        return False
    # 処理ロジック
```

## 🧪 テスト要件

### 📊 テストカバレッジ

- **最低要件**：新規コードのテストカバレッジ ≥ 80%
- **目標**：プロジェクト全体のテストカバレッジ ≥ 90%

### 🛠️ テストツール

```bash
# 全てのテストを実行
pytest

# 特定のテストファイルを実行
pytest tests/test_airports.py

# カバレッジレポートを生成
pytest --cov=. --cov-report=html

# カバレッジレポートを表示
open htmlcov/index.html
```

### ✅ テスト例

#### **ユニットテスト**
```python
import unittest
from unittest.mock import patch, MagicMock
from airports import get_magnetic_variation, convert_dms_to_decimal

class TestAirports(unittest.TestCase):
    
    def test_convert_dms_to_decimal_north(self):
        """北緯DMS変換のテスト"""
        result = convert_dms_to_decimal("N390842.12")
        self.assertAlmostEqual(result, 39.145033, places=6)
    
    def test_convert_dms_to_decimal_south(self):
        """南緯DMS変換のテスト"""
        result = convert_dms_to_decimal("S390842.12")
        self.assertAlmostEqual(result, -39.145033, places=6)
    
    @patch('airports.geo_mag')
    def test_get_magnetic_variation(self, mock_geomag):
        """磁気偏差計算のテスト"""
        # モックの戻り値を設定
        mock_result = MagicMock()
        mock_result.d = -6.234
        mock_geomag.calculate.return_value = mock_result
        
        result = get_magnetic_variation(39.9042, 116.4074)
        
        self.assertEqual(result, -6.2)
        mock_geomag.calculate.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### **結合テスト**
```python
import tempfile
import sqlite3
import os
from airports import process_airports

class TestAirportsIntegration(unittest.TestCase):
    
    def setUp(self):
        """テスト前のセットアップ"""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix='.db')
        self.temp_db.close()
        self.db_path = self.temp_db.name
    
    def tearDown(self):
        """テスト後のクリーンアップ"""
        os.unlink(self.db_path)
    
    def test_process_airports_integration(self):
        """空港データ処理の結合テスト"""
        csv_file = "test_data/sample_airports.csv"
        lookup_file = "test_data/sample_icao.txt"
        
        # 処理を実行
        process_airports(csv_file, lookup_file, self.db_path)
        
        # 結果を検証
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        
        self.assertGreater(count, 0)
        
        # データ品質を検証
        cursor.execute("""
            SELECT COUNT(*) FROM tbl_airports 
            WHERE airport_latitude IS NULL OR airport_longitude IS NULL
        """)
        null_coords = cursor.fetchone()[0]
        
        self.assertEqual(null_coords, 0, "空の座標は存在すべきではありません")
        
        conn.close()
```

### 📝 テストデータ

テストデータは`tests/test_data/`ディレクトリに配置する必要があります：

```
tests/
├── test_data/
│   ├── sample_airports.csv      # サンプル空港データ
│   ├── sample_runways.csv       # サンプル滑走路データ
│   ├── sample_earth_fix.dat     # サンプルウェイポイントデータ
│   ├── sample_earth_nav.dat     # サンプル航行援助施設データ
│   └── sample_icao.txt          # サンプルICAOルックアップテーブル
├── test_airports.py             # 空港モジュールテスト
├── test_runways.py              # 滑走路モジュールテスト
├── test_waypoints.py            # ウェイポイントモジュールテスト
└── conftest.py                  # pytest設定
```

## 🐛 バグ報告

### 📋 バグ報告テンプレート

以下のテンプレートを使用してバグを報告してください：

```markdown
## Bug描述
問題を簡潔に説明します

## 重現手順
1. コマンド `python XP2INI_NDB_Converter.py` を実行します
2. 設定 '...' を選択します
3. エラー '...' が発生します

## 预期行为
何が起こることを期待したかを説明します

## 实际行为
実際に何が起こったかを説明します

## 环境信息
- オペレーティングシステム: Windows 11 22H2
- Pythonバージョン: 3.11.5
- MSFSバージョン: 2024
- 航空機アドオン: PMDG 777

## 错误日志
```
関連するエラーメッセージとログを貼り付けます
```

## 其他信息
問題の診断に役立つその他の情報
```

### 🔍 バグの分類

| 優先度 | ラベル | 説明 |
|--------|------|------|
| 🔴 Critical | `priority:critical` | プログラムのクラッシュやデータ破損を引き起こす |
| 🟠 High | `priority:high` | 主要機能に影響があるが、回避策がある |
| 🟡 Medium | `priority:medium` | 副次的な機能やユーザーエクスペリエンスに影響がある |
| 🟢 Low | `priority:low` | コア機能に影響しない小さな問題 |

## 💡 機能提案

### 📋 機能提案テンプレート

```markdown
## 功能概述
提案する機能を簡潔に説明します

## 使用场景
どのような状況でこの機能が必要かを説明します

## 详细描述
機能の実装方法と期待される効果を詳細に説明します

## 替代方案
他の解決策を検討しましたか？

## 额外信息
提案の理解に役立つその他の情報
```

### 🎯 機能の分類

| タイプ | ラベル | 説明 |
|------|------|------|
| ✨ Enhancement | `type:enhancement` | 既存機能の改善 |
| 🚀 Feature | `type:feature` | 新規機能 |
| 📊 Performance | `type:performance` | パフォーマンス最適化 |
| 📖 Documentation | `type:documentation` | ドキュメントの改善 |

## 📖 ドキュメントへの貢献

### 📝 ドキュメント規約

1. **Markdown形式**：標準Markdown構文を使用
2. **VitePress互換性**：フロントマターが正しいことを確認
3. **日英混合**：技術用語は英語のまま、説明は日本語を使用
4. **コード例**：完全で実行可能なコード例を提供

### 🎨 ドキュメントスタイルガイド

```markdown
---
title: ページタイトル
description: ページ説明
---

# 🎯 メインタイトル

このドキュメントの目的と範囲を説明する導入段落。

## 📋 セカンダリタイトル

### サブタイトル

適切な絵文字と階層構造を使用してください。

#### コード例

```python
# 完全なコード例を提供
def example_function():
    return "サンプル"
```

#### 注意事項

> ⚠️ **重要**：重要な情報は引用ブロックで強調表示します

#### リスト形式

- ✅ 絵文字を使用して可読性を向上
- 📝 リスト項目を簡潔に保つ
- 🔗 適切な内部リンクを追加
```

## 🔄 プルリクエストのフロー

### 📋 PRチェックリスト

PRを提出する前に確認してください：

- [ ] 🧪 **すべてのテストに合格**：`pytest`
- [ ] 📊 **テストカバレッジの達成**：新規コードカバレッジ ≥ 80%
- [ ] 🎨 **コードフォーマットが正しい**：`black`、`isort`、`flake8`
- [ ] 📖 **ドキュメントが更新済み**：API変更にはドキュメントの更新が必要
- [ ] 🏷️ **コミットメッセージの規約遵守**：Conventional Commitsに従う
- [ ] 🔗 **関連するIssueへのリンク**：PRの説明で引用

### 📝 PRテンプレート

```markdown
## 变更概述
このPRの目的と主な変更点を簡潔に説明します

## 变更类型
- [ ] 🐛 バグ修正
- [ ] ✨ 新機能
- [ ] 📖 ドキュメント更新
- [ ] 🎨 コードリファクタリング
- [ ] ⚡ パフォーマンス最適化
- [ ] 🧪 テスト改善

## 详细说明
実装方法と技術的な詳細を詳しく説明します

## 测试
これらの変更をどのようにテストするかを説明します

## 相关Issue
Close #123

## 检查清单
- [ ] テスト合格
- [ ] コードフォーマットが正しい
- [ ] ドキュメントが更新済み
- [ ] 変更履歴が更新済み
```

### 🏷️ コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/)規約に従ってください：

```bash
# 機能追加
feat: add support for AIRAC 2024 data format

# バグ修正
fix: resolve coordinate conversion precision issue

# ドキュメント更新
docs: update installation guide for Windows 11

# パフォーマンス最適化
perf: optimize magnetic variation calculation

# コードリファクタリング
refactor: restructure database connection handling

# テスト追加
test: add unit tests for waypoint processing

# ビルド関連
build: update dependencies to latest versions
```

## 🌟 貢献者への感謝

### 🏆 貢献者ティア

| ティア | 要件 | 権限 |
|--------|------|------|
| 👋 Contributor | 1つ以上の有効なPR | 基本的な貢献者 |
| 🎖️ Regular Contributor | 5つ以上の有効なPR | 優先的なコードレビュー |
| 🌟 Core Contributor | 10以上の有効なPR + 長期的な参加 | Issueトリアージ権限 |
| 👑 Maintainer | コア開発者 | 完全なリポジトリ権限 |

### 📜 貢献者リスト

私たちはREADMEで貢献者リストを管理しており、全ての貢献者の努力に感謝いたします！

```markdown
## 🙏 貢献者に感謝

<a href="https://github.com/your-repo/nav-data/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/nav-data" />
</a>
```

## 🤔 ヘルプを得る

### 💬 コミュニケーションチャネル

- **📧 メール**：project@nav-data.org
- **💬 ディスカッション**：GitHub Discussions
- **🐛 問題報告**：GitHub Issues
- **📖 ドキュメントの問題**：PRを直接提出して修正

### 📚 学習リソース

- [Python公式ドキュメント](https://docs.python.org/)
- [SQLiteドキュメント](https://sqlite.org/docs.html)
- [航空航法原理](https://www.faa.gov/air_traffic/publications/)
- [ARINC 424標準](https://www.arinc.com/)

### 🎓 初心者向けガイド

もしあなたがオープンソースプロジェクトに初めて参加する場合：

1. 📖 **コードを読む**：まずプロジェクトの構造とコア機能を理解する
2. 🐛 **小さなことから始める**：ドキュメントの誤りや小さなバグの修正から始める
3. 🤝 **積極的にコミュニケーションをとる**：質問したり助けを求めたりすることを恐れない
4. 📈 **継続的に学習する**：プロジェクトの動向に注意を払い、ベストプラクティスを学ぶ

## 📄 行動規範

### 🤝 私たちのコミットメント

オープンで歓迎される環境を育むため、私たちは以下のことを約束します：

- **🌈 包括性**：多様な背景や視点を持つ参加者を歓迎します
- **🤝 尊重**：異なる意見や経験を尊重します
- **📚 学習指向**：初心者の成長と学習を支援します
- **🎯 プロフェッショナリズム**：技術的な議論とプロジェクトの改善に集中します

### ❌ 許容されない行動

- 人身攻撃や侮辱的な発言
- ハラスメントや差別行為
- 他人の個人情報の公開
- その他の非専門的または不適切な行動

### 📞 報告メカニズム

行動規範に違反する状況に遭遇した場合は、プロジェクトのメンテナーにご連絡ください：
- 📧 メール：conduct@nav-data.org
- 📱 プライベートメッセージ：GitHubのプライベートメッセージでメンテナーに連絡

---

Nav-dataプロジェクトへの貢献をご検討いただきありがとうございます！あなたの貢献は、航空シミュレーションコミュニティをより良いものにします。🛫