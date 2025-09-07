# 📜 ライセンス情報

## MITライセンス

**Nav-data**プロジェクトは、簡潔で寛容なオープンソースライセンスであるMITライセンスに基づいてオープンソースとして公開されています。

### ライセンス全文

```
MIT License

Copyright (c) 2025 Justin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🔍 ライセンス解釈

### ✅ 許可されること
- **商用利用** - 本ソフトウェアを商用環境で使用すること
- **改変** - ソフトウェアのソースコードを改変すること
- **頒布** - オリジナルまたは改変されたソフトウェアを頒布すること
- **私的利用** - 個人的な目的でソフトウェアを使用すること
- **特許利用** - いかなる貢献者が保有する特許権も使用すること

### ⚠️ 利用条件
- **ライセンスの含載** - ソフトウェアのすべてのコピーに、オリジナルのライセンスおよび著作権表示を含める必要があります
- **著作権表示の含載** - オリジナルの著作権表示を保持する必要があります

### ❌ 制限事項
- **責任** - ソフトウェアの作者は一切の責任を負いません
- **保証** - ソフトウェアはいかなる種類の保証も提供しません

## 📋 サードパーティ依存ライセンス

Nav-dataは以下のオープンソースライブラリを使用しており、それぞれ独自のライセンスを有しています：

### Python標準ライブラリ
- **Python** - [PSF License](https://docs.python.org/3/license.html)

### データ処理ライブラリ
- **pandas** - BSD 3-Clause License
- **numpy** - BSD License
- **sqlite3** - Public Domain

### 科学計算ライブラリ
- **pygeomag** - MIT License

### ユーザーインターフェースライブラリ
- **tqdm** - MIT License + MPL-2.0 License

### ファイル処理ライブラリ
- **chardet** - LGPL 2.1 License

### HTTPライブラリ
- **requests** - Apache 2.0 License

### 完全な依存関係リスト

```yaml
核心依赖:
  pandas: ">=1.3.0"     # BSD 3-Clause
  requests: ">=2.26.0"  # Apache 2.0
  tqdm: ">=4.62.0"      # MIT + MPL-2.0
  chardet: ">=4.0.0"    # LGPL 2.1
  ratelimit: ">=2.2.1"  # MIT
  pygeomag: ">=0.9.0"   # MIT

开发依赖:
  pytest: ">=6.0.0"     # MIT
  flake8: ">=4.0.0"     # MIT
  black: ">=22.0.0"     # MIT
  mypy: ">=0.910"       # MIT
```

### ライセンス互換性

すべてのサードパーティ依存ライブラリのライセンスはMITライセンスと互換性があり、以下の点を保証します：
- 商用利用の合法性
- 頒布の自由度
- 最小限の法的制約

## ⚖️ 法的声明

### 免責事項

**Nav-dataプロジェクトはシミュレーション飛行のみを目的としています。以下の重要な声明にご注意ください：**

#### 🛫 使用目的の制限
- **シミュレーター専用** - 本ソフトウェアおよびそれが生成するナビゲーションデータは、飛行シミュレーター専用です
- **実航行での使用禁止** - 実際の航空機ナビゲーションでの使用は禁止されています
- **教育目的** - 教育、訓練、および娯楽目的に適しています

#### 📊 データソース
- **サードパーティデータ** - ナビゲーションデータは、サードパーティの公開データソースに由来します
- **データの正確性** - データの完全性、正確性、または適時性は保証されません
- **ユーザーの責任** - ユーザーはデータの適用性を自己責任で検証する必要があります

#### 🚫 責任の制限
本ソフトウェアの開発者および貢献者は**一切の責任を負いません**。以下を含むがこれらに限定されません：
- データエラーに起因する損失
- ソフトウェアの欠陥によって引き起こされる影響
- 不適切な使用によって生じる問題
- サードパーティデータの正確性に関する問題

### 遵守事項

#### 📋 データ使用ガイドライン
1.  **現地法の遵守** - お住まいの地域の法令に準拠していることを確認してください
2.  **データソースの尊重** - 元のデータ提供者の利用規約を遵守してください
3.  **非商用利用の制限** - 一部のデータソースには、非商用利用の制限がある場合があります
4.  **帰属表示** - データソースとソフトウェア作者を適切に帰属表示してください

#### 🔒 安全な使用
1.  **データのバックアップ** - 使用前に元のナビゲーションデータをバックアップしてください
2.  **テストと検証** - 重要な使用の前に十分にテストしてください
3.  **バージョン管理** - 重要なアプリケーションには安定版を使用してください
4.  **更新の監視** - セキュリティアップデートや修正にタイムリーに注意を払ってください

## 🤝 貢献者契約

### 貢献ライセンス
Nav-dataプロジェクトにコードを貢献することにより、以下のことに同意するものとします：

1.  **ライセンス付与** - あなたの貢献はMITライセンスの下で公開されます
2.  **著作権帰属** - 貢献物の著作権はプロジェクトに帰属します
3.  **オリジナリティ** - あなたは貢献があなたのオリジナル作品であることを確認します
4.  **権利の保有** - あなたはこれらの権利を付与する法的権限を保有しています

### 著作権帰属
- **原作者** - Nav-data開発チーム
- **貢献者** - すべてのコード貢献者は、その貢献の作者性を保持します
- **集合著作権** - プロジェクト全体は、すべての貢献者によって共同で所有されます

## 📞 法律相談

### 問題報告
もしライセンスまたは法的コンプライアンスに関する問題を発見された場合、以下のことを行ってください：

1.  **即時報告** - GitHub Issuesを通じて報告する
2.  **詳細な説明** - 具体的な法的懸念を提供する
3.  **メンテナーへの連絡** - プロジェクトメンテナーに直接連絡する
4.  **専門家のアドバイス** - 必要に応じて専門の法律アドバイスを求める

### 商用利用に関する相談
商用利用または大規模展開の場合：

1.  **リスク評価** - 内部での法的リスク評価を行うことを推奨します
2.  **コンプライアンスチェック** - 組織のコンプライアンス要件に適合していることを確認してください
3.  **専門家の意見** - 知的財産権弁護士への相談を検討してください
4.  **カスタマイズされたライセンス** - 特別なライセンス取り決めが必要な場合は、お問い合わせください

## 🔗 関連リソース

### ライセンス情報
- [MIT License 全文](https://opensource.org/licenses/MIT)
- [オープンソースライセンスの比較](https://choosealicense.com/)
- [GPL互換性ガイド](https://www.gnu.org/licenses/license-compatibility.html)

### コンプライアンスガイドライン
- [企業向けオープンソースコンプライアンスのベストプラクティス](https://www.linuxfoundation.org/resources/open-source-compliance-program)
- [知的財産権リスク管理](https://www.wipo.int/sme/en/ip_business/trade_secrets/trade_secrets.htm)

### 航空データ規制
- [ICAO 付属書15 - 航空情報サービス](https://www.icao.int/safety/aviation-medicine/library/Documents/ICAO_Annex_15.pdf)
- [FAA データ利用ポリシー](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/library/policy/)

---

**最終更新**: 2024年12月24日

**注意**: 本ドキュメントは情報提供のみを目的としており、法的助言を構成するものではありません。具体的な法律問題がある場合は、専門の弁護士にご相談ください。