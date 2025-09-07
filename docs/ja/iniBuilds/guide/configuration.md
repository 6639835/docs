# ⚙️ 設定説明

このガイドでは、Nav-data変換ツールのデータソース、パス設定、およびAIRACサイクル管理の方法について詳しく説明します。

## 📊 データソース概要

Nav-dataツールは、複数の業界標準航空航法データソースをサポートしており、データの信頼性と正確性を保証します。

### 🔄 サポートされているデータ形式

| データ形式 | ソース | 用途 | 標準 |
|---------|------|------|------|
| **NAIP CSV** | Navigraph/Aerosoft | 空港、滑走路、航路 | ARINC 424 |
| **X-Plane DAT** | X-Plane 11/12 | ウェイポイント、航法施設 | X-Plane形式 |
| **CIFP** | 公式プロシージャデータ | SID/STAR/アプローチ | ARINC 424 |
| **SQLite DB** | Fenix A320 | NDB参照データ | カスタム形式 |

## 🗃️ 必須のデータファイル

### 📁 基本ディレクトリ構造

ナビゲーションデータを整理するために、以下のディレクトリ構造を作成してください。

```
NavData_Workspace/
├── NAIP/                    # NAIP CSVファイルディレクトリ
│   ├── AD_HP.csv           # 空港基本データ
│   ├── RWY.csv             # 滑走路情報
│   ├── RWY_DIRECTION.csv   # 滑走路方向データ
│   └── RTE_SEG.csv         # 航路セグメントデータ
│
├── X-Plane/                 # X-Planeデータファイル
│   ├── earth_fix.dat       # ウェイポイントデータ
│   └── earth_nav.dat       # 航法施設データ
│
├── CIFP/                    # CIFPプロシージャデータディレクトリ
│   ├── ZBAA.dat            # 北京首都空港
│   ├── ZSSS.dat            # 上海浦東空港
│   └── [その他空港].dat      # 各空港プロシージャファイル
│
├── NDBs/                    # NDBデータベース
│   └── nd.db3              # Fenixナビゲーションデータベース
│
└── Output/                  # 出力ディレクトリ
    └── e_dfd_PMDG.s3db     # 変換後のデータベース
```

## 🌐 データソース入手ガイド

### 1️⃣ Navigraphデータ（推奨）

**入手手順：**
1. [Navigraph公式サイト](https://navigraph.com/) にアクセスし、アカウントを登録します
2. Navigraph UnlimitedまたはCharts + Dataサービスを購読します
3. Navigraph FMS Data Managerをダウンロードします
4. FMS Data Managerで「Generic」形式を選択します
5. NAIPデータパックをダウンロードして解凍します

**NAIPファイルの入手：**
```
Navigraph FMS Data Manager → 
Generic → 
NAIP Format → 
現在のAIRACサイクルをダウンロード
```

### 2️⃣ Aerosoft NavDataPro

**入手手順：**
1. [Aerosoft NavDataPro](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) を購入します
2. NavDataProアプリケーションをダウンロードします
3. ログインし、NAIP形式のデータをダウンロードします
4. NAIPディレクトリに解凍します

### 3️⃣ X-Planeデータファイル

**ソースオプション：**
- **オプションA**：X-Plane 11/12インストールディレクトリからコピー
  ```
  [X-Planeインストールディレクトリ]/Resources/default data/earth_fix.dat
  [X-Planeインストールディレクトリ]/Resources/default data/earth_nav.dat
  ```

- **オプションB**：本プロジェクトのサンプルデータから取得
  ```
  [プロジェクトディレクトリ]/sample_data/earth_fix.dat
  [プロジェクトディレクトリ]/sample_data/earth_nav.dat
  ```

### 4️⃣ CIFPプロシージャデータ

**入手方法：**
- **公式チャネル**：FAA公式サイトで無料ダウンロード
- **サードパーティ**：Navigraphに含まれるCIFPデータ
- **プロジェクト提供**：前処理された中国地域のCIFPファイル

### 5️⃣ NDBデータベース

**入手経路：**
```bash
# Fenix A320のインストールディレクトリからコピー
[MSFS Community]/fenix-a320/Resources/NavData/nd.db3
```

## 🛠️ パス設定ウィザード

### 自動設定モード

変換ツールを実行すると、プログラムがパス設定を案内します。

```bash
python XP2INI_NDB_Converter.py
```

**設定フロー：**
1. **基本ディレクトリの選択**：すべてのデータファイルを含むルートディレクトリを選択します
2. **自動検出**：プログラムが自動的に各種データファイルをスキャンし、検証します
3. **パス確認**：検出されたファイルパスが表示され、確認を求められます
4. **手動補完**：見つからなかったファイルについては、手動でパスを指定します

### 🔍 パス検証チェックリスト

| データタイプ | ファイルパス | 検証ステータス |
|---------|---------|---------|
| NAIP空港データ | `NAIP/AD_HP.csv` | ✅ |
| NAIP滑走路データ | `NAIP/RWY.csv` | ✅ |
| NAIP滑走路方向 | `NAIP/RWY_DIRECTION.csv` | ✅ |
| NAIP航路データ | `NAIP/RTE_SEG.csv` | ✅ |
| X-Planeウェイポイント | `X-Plane/earth_fix.dat` | ✅ |
| X-Plane航法施設 | `X-Plane/earth_nav.dat` | ✅ |
| CIFPプロシージャディレクトリ | `CIFP/` | ✅ |
| NDBデータベース | `NDBs/nd.db3` | ✅ |
| ICAOルックアップテーブル | `ICAO.txt` | ✅ |

## 📅 AIRACサイクル管理

### 🗓️ AIRACサイクル説明

**AIRAC（Aeronautical Information Regulation And Control）**は、国際民間航空機関（ICAO）が定めた28日間の航空情報更新サイクルです。

- **更新頻度**：28日ごと
- **グローバル同期**：全世界で統一された更新時間
- **重要性**：パイロットと管制官が同じナビゲーションデータを使用することを保証します

### 📊 現在のサイクル照会

```python
# 現在のAIRACサイクルを照会
import datetime

def get_current_airac():
    # AIRAC 2023年参照日：2023年1月5日
    base_date = datetime.date(2023, 1, 5)
    today = datetime.date.today()
    
    days_diff = (today - base_date).days
    cycle_number = (days_diff // 28) + 1
    
    return f"AIRAC {today.year}{cycle_number:02d}"

print(f"現在のサイクル：{get_current_airac()}")
```

### 🔄 データ更新戦略

#### リアルタイム更新ユーザー
- **更新頻度**：各AIRACサイクルごと
- **推奨ソース**：Navigraph（自動更新）
- **適用シナリオ**：オンライン飛行、プロフェッショナル用途

#### 一般ユーザー
- **更新頻度**：3～6ヶ月ごと
- **推奨ソース**：Aerosoft NavDataPro
- **適用シナリオ**：オフライン飛行、エンターテイメント用途

## 🎛️ 高度な設定オプション

### 📍 地域フィルタ設定

異なる地域向けにデータ処理範囲をカスタマイズします。

```python
# 処理するICAO地域コードを設定
SUPPORTED_ICAO_REGIONS = {
    'ZB',  # 中国北部地域
    'ZS',  # 中国東部地域  
    'ZG',  # 中国南部地域
    'ZJ',  # 中国華東地域
    'ZY',  # 中国中部地域
    'ZL',  # 中国南西地域
    'ZU',  # 中国西部地域
    'ZW',  # 中国西北地域
    'ZP',  # 中国華北地域
    'ZH',  # 中国華南地域
    'VM',  # ベトナム地域
    'VH',  # 香港地域
    'RK'   # 韓国地域
}
```

### 🎯 精度設定

座標と計算精度を設定します。

```python
# 座標精度設定
COORDINATE_PRECISION = 8  # 小数点以下の桁数
MAGNETIC_VARIATION_PRECISION = 1  # 磁偏角精度

# 距離単位変換
NM_TO_KM = 1.852  # 海里からキロメートル
KM_TO_NM = 0.539957  # キロメートルから海里
```

### ⚡ パフォーマンス最適化設定

```python
# 並列処理設定
MULTIPROCESS_WORKERS = 4  # 並列プロセス数
BATCH_SIZE = 1000  # バッチ処理サイズ
DATABASE_TIMEOUT = 30  # データベースタイムアウト（秒）

# メモリ最適化
ENABLE_CACHE = True  # 座標キャッシュを有効にする
CACHE_SIZE_LIMIT = 10000  # キャッシュサイズ制限
```

## 🔧 設定ファイルテンプレート

頻繁に使用する設定を保存するために、`config.json` ファイルを作成します。

```json
{
  "data_sources": {
    "naip_path": "C:/NavData/NAIP",
    "xplane_path": "C:/NavData/X-Plane", 
    "cifp_path": "C:/NavData/CIFP",
    "ndb_path": "C:/NavData/NDBs/nd.db3",
    "icao_txt": "C:/NavData/ICAO.txt"
  },
  "output": {
    "database_path": "C:/NavData/Output/e_dfd_PMDG.s3db"
  },
  "processing": {
    "regions": ["ZB", "ZS", "ZJ", "ZG", "ZY", "ZL", "ZU", "ZW", "ZP", "ZH"],
    "coordinate_precision": 8,
    "enable_multiprocessing": true,
    "workers": 4
  },
  "airac": {
    "current_cycle": "2410",
    "auto_update_check": true
  }
}
```

## ✅ 設定検証

### 🔍 設定チェック用スクリプト

```python
#!/usr/bin/env python3
"""設定検証スクリプト"""

import os
import json
from pathlib import Path

def validate_config():
    """設定ファイルの完全性を検証します"""
    
    required_files = {
        'NAIP/AD_HP.csv': '空港データ',
        'NAIP/RWY.csv': '滑走路データ', 
        'NAIP/RWY_DIRECTION.csv': '滑走路方向',
        'NAIP/RTE_SEG.csv': '航路データ',
        'X-Plane/earth_fix.dat': 'ウェイポイント',
        'X-Plane/earth_nav.dat': '航法施設',
        'NDBs/nd.db3': 'NDBデータベース'
    }
    
    print("🔍 設定の検証を開始します...")
    
    for file_path, description in required_files.items():
        if os.path.exists(file_path):
            print(f"✅ {description}: {file_path}")
        else:
            print(f"❌ {description}: {file_path} (ファイルが存在しません)")
    
    print("🔍 検証が完了しました！")

if __name__ == "__main__":
    validate_config()
```

## 🚨 よくある設定問題

### パスの問題
```bash
# 問題：パスに中国語の文字が含まれているため、エンコーディングエラーが発生する
# 解決策：英字パスを使用し、特殊文字を避ける

# 誤ったパスの例
C:/导航数据/NAIP/

# 正しいパスの例  
C:/NavData/NAIP/
```

### ファイル権限の問題
```powershell
# 問題：読み取り権限がない
# 解決策：管理者として実行するか、ファイル権限を変更する
icacls "C:\NavData" /grant Everyone:F /T
```

### データ整合性の問題
```bash
# 問題：NAIPファイルが不完全
# 解決策：完全なAIRACデータパックを再ダウンロードする
# すべてのCSVファイルが存在し、空でないことを確認する
```

---

設定完了！次のステップとして、データ変換プロセスを実行するために [**使用説明書**](./usage.md) を参照してください。