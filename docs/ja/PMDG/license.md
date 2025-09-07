# 📜 ライセンス情報

## MITライセンス

**Nav-data**プロジェクトは、簡潔で寛容なオープンソースライセンスであるMITライセンスに基づいてオープンソース化されています。

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

## 🔍 ライセンスの解釈

### ✅ 許可されること
- **商用利用** - 本ソフトウェアを商用環境で使用すること
- **変更** - ソフトウェアのソースコードを変更すること
- **配布** - オリジナルまたは変更されたソフトウェアを配布すること
- **個人利用** - 個人目的でソフトウェアを使用すること
- **特許利用** - いずれかの貢献者が所有する特許権を使用すること

### ⚠️ 使用条件
- **ライセンスの包含** - ソフトウェアのすべてのコピーに、元のライセンスと著作権表示を含める必要があります
- **著作権表示の包含** - 元の著作権表示を保持する必要があります

### ❌ 制限
- **責任** - ソフトウェアの作者は一切の責任を負いません
- **保証** - ソフトウェアはいかなる種類の保証も提供しません

## 📋 サードパーティ依存関係のライセンス

Nav-dataは以下のオープンソースライブラリを使用しており、それぞれ独自のライセンスを持っています。

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
コア依存:
  pandas: ">=1.3.0"     # BSD 3-Clause
  requests: ">=2.26.0"  # Apache 2.0
  tqdm: ">=4.62.0"      # MIT + MPL-2.0
  chardet: ">=4.0.0"    # LGPL 2.1
  ratelimit: ">=2.2.1"  # MIT
  pygeomag: ">=0.9.0"   # MIT

開発依存:
  pytest: ">=6.0.0"     # MIT
  flake8: ">=4.0.0"     # MIT
  black: ">=22.0.0"     # MIT
  mypy: ">=0.910"       # MIT
```

### ライセンスの互換性

すべてのサードパーティ依存関係のライセンスはMITライセンスと互換性があり、以下を保証します。
- 商用利用の合法性
- 配布の自由度
- 最小限の法的制約

## ⚖️ 法的声明

### 免責事項

**Nav-dataプロジェクトはシミュレーション飛行のみを目的としており、以下の重要な声明にご注意ください。**

#### 🛫 使用目的の制限
- **シミュレーター専用** - 本ソフトウェアおよびそれによって生成されるナビゲーションデータは、フライトシミュレーターのみを目的としています
- **実機ナビゲーション不可** - 実航空機のナビゲーションには使用しないでください
- **教育目的** - 教育、トレーニング、娯楽目的での使用に適しています

#### 📊 データソース
- **サードパーティデータ** - ナビゲーションデータは、サードパーティの公開データソースから取得されます
- **データの正確性** - データの完全性、正確性、または適時性は保証されません
- **ユーザーの責任** - ユーザーはデータの適合性を自己責任で検証する必要があります

#### 🚫 責任の制限
本ソフトウェアの開発者および貢献者は、以下を含むがこれに限定されない**いかなる責任も負いません**。
- データエラーに起因する損失
- ソフトウェアの欠陥によって引き起こされる影響
- 不適切な使用によって生じる問題
- サードパーティデータの正確性に関する問題

### コンプライアンス遵守

#### 📋 データ使用規範
1. **現地法の遵守** - お住まいの地域の法律および規制に準拠していることを確認してください
2. **データソースの尊重** - 元のデータ提供者の使用条件を遵守してください
3. **非商用利用の制限** - 一部のデータソースには非商用利用の制限がある場合があります
4. **帰属表示** - データソースとソフトウェア作者を適切に帰属表示してください

#### 🔒 安全な使用
1. **データのバックアップ** - 使用する前に元のナビゲーションデータをバックアップしてください
2. **テストと検証** - 重要な使用の前に十分にテストしてください
3. **バージョン管理** - 重要なアプリケーションには安定版を使用してください
4. **更新の監視** - セキュリティアップデートと修正にタイムリーに注意してください

## 🤝 貢献者契約

### 貢献ライセンス
Nav-dataプロジェクトにコードを貢献することにより、お客様は以下に同意するものとします。

1. **ライセンスの付与** - お客様の貢献はMITライセンスの下で公開されます
2. **著作権の帰属** - 貢献の著作権はプロジェクトに帰属します
3. **オリジナリティ** - お客様は貢献がお客様のオリジナル作品であることを確認します
4. **権利の所有** - お客様はこれらの権利を付与する法的権限を所有しています

### 著作権の帰属
- **オリジナル作者** - Nav-data開発チーム
- **貢献者** - すべてのコード貢献者は、その貢献の作者としての身分を保持します
- **集合著作権** - プロジェクト全体は、すべての貢献者によって共同で所有されます

## 📞 法務相談

### 問題の報告
ライセンスまたは法的コンプライアンスに関する問題を発見した場合は、以下を行ってください。

1. **直ちに報告** - GitHub Issuesを通じて報告する
2. **詳細な記述** - 具体的な法的懸念事項を提供する
3. **メンテナーへの連絡** - プロジェクトメンテナーに直接連絡する
4. **専門家のアドバイス** - 必要に応じて専門家の法的アドバイスを求める

### ビジネス相談
商業利用または大規模展開の場合：

1. **リスク評価** - 内部的な法的リスク評価を実施することをお勧めします
2. **コンプライアンスチェック** - 組織のコンプライアンス要件を満たしていることを確認する
3. **専門家の意見** - 知的財産弁護士への相談を検討する
4. **カスタマイズされたライセンス** - 特別なライセンス手配が必要な場合は、お問い合わせください

## 🔗 関連リソース

### ライセンス情報
- [MIT License 全文](https://opensource.org/licenses/MIT)
- [オープンソースライセンスの比較](https://choosealicense.com/)
- [GPL互換性ガイド](https://www.gnu.org/licenses/license-compatibility.html)

### コンプライアンスガイド
- [企業向けオープンソースコンプライアンスのベストプラクティス](https://www.linuxfoundation.org/resources/open-source-compliance-program)
- [知的財産リスク管理](https://www.wipo.int/sme/en/ip_business/trade_secrets/trade_secrets.htm)

### 航空データ規制
- [ICAO 附属書15 - 航空情報サービス](https://www.icao.int/safety/aviation-medicine/library/Documents/ICAO_Annex_15.pdf)
- [FAA データ使用ポリシー](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/library/policy/)

---

**最終更新日**: 2024年12月24日

**注記**: この文書は情報提供のみを目的としており、法的助言を構成するものではありません。具体的な法的問題については、専門の弁護士にご相談ください。