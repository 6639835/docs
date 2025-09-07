# 📜 ライセンス情報

## MITライセンス

**Nav-data** プロジェクトはMITライセンスに基づいてオープンソース化されており、これは簡潔で寛容なオープンソースライセンスです。

### ライセンス全文

```
MIT License

Copyright (c) 2025 Yuzuriha

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

## 🔍 ライセンスの解釈

### ✅ 許可事項
-   **商用利用** - 本ソフトウェアを商用環境で使用すること
-   **変更** - ソフトウェアのソースコードを変更すること
-   **配布** - オリジナルまたは変更されたソフトウェアを配布すること
-   **私的利用** - 個人的な目的でソフトウェアを使用すること
-   **特許利用** - いずれかの貢献者が所有する特許権を使用すること

### ⚠️ 利用条件
-   **ライセンスを含めること** - ソフトウェアのすべての複製に、オリジナルのライセンスおよび著作権表示を含める必要があります
-   **著作権表示を含めること** - オリジナルの著作権表示を保持する必要があります

### ❌ 制限事項
-   **責任** - ソフトウェアの作者はいかなる責任も負いません
-   **保証** - ソフトウェアはいかなる種類の保証も提供しません

## 📋 サードパーティ依存関係のライセンス

Nav-dataは以下のオープンソースライブラリを使用しており、それぞれ独自のライセンスを持っています。

### Python標準ライブラリ
-   **Python** - [PSF License](https://docs.python.org/3/license.html)

### データ処理ライブラリ
-   **pandas** - BSD 3-Clause License
-   **numpy** - BSD License
-   **sqlite3** - Public Domain

### 科学計算ライブラリ
-   **pygeomag** - MIT License

### ユーザーインターフェースライブラリ
-   **tqdm** - MIT License + MPL-2.0 License

### ファイル処理ライブラリ
-   **chardet** - LGPL 2.1 License

### HTTPライブラリ
-   **requests** - Apache 2.0 License

### 完全な依存関係リスト

```yaml
コア依存関係:
  pandas: ">=1.3.0"     # BSD 3-Clause
  requests: ">=2.26.0"  # Apache 2.0
  tqdm: ">=4.62.0"      # MIT + MPL-2.0
  chardet: ">=4.0.0"    # LGPL 2.1
  ratelimit: ">=2.2.1"  # MIT
  pygeomag: ">=0.9.0"   # MIT

開発依存関係:
  pytest: ">=6.0.0"     # MIT
  flake8: ">=4.0.0"     # MIT
  black: ">=22.0.0"     # MIT
  mypy: ">=0.910"       # MIT
```

### ライセンス互換性

すべてのサードパーティ依存関係のライセンスはMITライセンスと互換性があり、以下を保証します：
-   商用利用の合法性
-   配布の自由度
-   最小限の法的制約

## ⚖️ 法的声明

### 免責事項

**Nav-dataプロジェクトはシミュレーション飛行のみを目的としており、以下の重要な声明にご注意ください：**

#### 🛫 用途の制限
-   **シミュレーター専用** - 本ソフトウェアおよびそれが生成するナビゲーションデータは、飛行シミュレーターのみに使用されます
-   **実機ナビゲーションへの非使用** - 実際の航空機のナビゲーションには使用しないでください
-   **教育目的** - 教育、訓練、および娯楽目的に適用されます

#### 📊 データソース
-   **サードパーティデータ** - ナビゲーションデータは、サードパーティの公開データソースから取得されます
-   **データの正確性** - データの完全性、正確性、または適時性は保証されません
-   **ユーザーの責任** - ユーザーはデータの適用性を自己責任で検証する必要があります

#### 🚫 責任の制限
本ソフトウェアの開発者および貢献者は**一切の責任を負いません**。これには以下が含まれますが、これらに限定されません：
-   データエラーに起因する損失
-   ソフトウェアの欠陥によって引き起こされる影響
-   不適切な使用に起因する問題
-   サードパーティデータの正確性に関する問題

### 準拠した使用

#### 📋 データ使用の規範
1.  **現地法の遵守** - お住まいの地域の法令に準拠していることを確認してください
2.  **データソースの尊重** - 元データ提供者の利用規約を遵守してください
3.  **非商用利用の制限** - 一部のデータソースには非商用利用の制限がある場合があります
4.  **帰属表示** - データソースとソフトウェア作者に適切に帰属表示を行ってください

#### 🔒 安全な使用
1.  **データのバックアップ** - 使用前にオリジナルのナビゲーションデータをバックアップしてください
2.  **テスト検証** - 重要な使用の前に十分なテストを行ってください
3.  **バージョン管理** - 重要なアプリケーションには安定版を使用してください
4.  **更新の監視** - セキュリティ更新と修正にタイムリーに注意を払ってください

## 🤝 貢献者契約

### 貢献ライセンス
Nav-dataプロジェクトにコードを貢献することにより、あなたは以下に同意します：

1.  **ライセンス付与** - あなたの貢献はMITライセンスの下で公開されます
2.  **著作権の帰属** - 貢献の著作権はプロジェクトに帰属します
3.  **オリジナル性** - あなたは貢献があなたのオリジナル作品であることを確認します
4.  **権利の所有** - あなたはこれらの権利を付与する法的権限を所有しています

### 著作権の帰属
-   **オリジナル作者** - Nav-data 開発チーム
-   **貢献者** - すべてのコード貢献者は、その貢献の作者としての身分を保持します
-   **集団著作権** - プロジェクト全体は、すべての貢献者によって共同で所有されます

## 📞 法的相談

### 問題報告
もしライセンスまたは法的コンプライアンスに関する問題を発見した場合は、以下を行ってください：

1.  **即時報告** - GitHub Issuesを通じて報告してください
2.  **詳細な説明** - 具体的な法的懸念を提供してください
3.  **メンテナーへの連絡** - プロジェクトメンテナーに直接連絡してください
4.  **専門家のアドバイス** - 必要に応じて専門の法的アドバイスを求めてください

### 商用利用に関する相談
商用利用または大規模なデプロイメントについては：

1.  **リスク評価** - 内部的な法的リスク評価を実施することをお勧めします
2.  **コンプライアンスチェック** - あなたの組織のコンプライアンス要件を満たしていることを確認してください
3.  **専門家の意見** - 知的財産弁護士に相談することを検討してください
4.  **カスタムライセンス** - 特別なライセンス契約が必要な場合は、お問い合わせください

## 🔗 関連リソース

### ライセンス情報
-   [MITライセンス全文](https://opensource.org/licenses/MIT)
-   [オープンソースライセンス比較](https://choosealicense.com/)
-   [GPL互換性ガイド](https://www.gnu.org/licenses/license-compatibility.html)

### コンプライアンスガイドライン
-   [企業向けオープンソースコンプライアンスのベストプラクティス](https://www.linuxfoundation.org/resources/open-source-compliance-program)
-   [知的財産リスク管理](https://www.wipo.int/sme/en/ip_business/trade_secrets/trade_secrets.htm)

### 航空データ規制
-   [ICAO 附属書15 - 航空情報サービス](https://www.icao.int/safety/aviation-medicine/library/Documents/ICAO_Annex_15.pdf)
-   [FAA データ利用方針](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/library/policy/)

---

**最終更新**: 2024年12月24日

**注意**: 本ドキュメントは情報提供のみを目的としており、法的助言を構成するものではありません。具体的な法的問題については、専門の弁護士にご相談ください。