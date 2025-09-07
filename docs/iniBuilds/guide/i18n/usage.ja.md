# 🔄 使用方法

このガイドでは、Nav-dataツールのデータ変換から航空機アドオンへの最終的な展開（デプロイ）まで、一連の使用手順をご案内します。

## 🚀 クイックスタート

### ⚡ ワンクリック変換

設定が完了している場合は、メインプログラムを直接実行できます。

```bash
python XP2INI_NDB_Converter.py
```

プログラムが変換プロセス全体を自動的にご案内します。

## 📝 詳細な操作手順

### 🎯 ステップ1：データ準備の検証

変換を開始する前に、すべての必須データファイルが所定の場所にあることを確認してください。

```bash
# データファイルの整合性を検証
python -c "
import os
files = [
    'NAIP/AD_HP.csv',
    'NAIP/RWY.csv',
    'NAIP/RWY_DIRECTION.csv',
    'NAIP/RTE_SEG.csv',
    'X-Plane/earth_fix.dat',
    'X-Plane/earth_nav.dat',
    'NDBs/nd.db3'
]
for f in files:
    print(f'✅ {f}' if os.path.exists(f) else f'❌ {f}')
"
```

### 🔧 ステップ2：変換プログラムの起動

メイン変換プログラムを実行し、プロンプトに従って操作します。

```bash
python XP2INI_NDB_Converter.py
```

### 📂 ステップ3：パス設定ウィザード

プログラムがパス設定を案内します。

#### 3.1 ベースディレクトリの設定

```
ベースディレクトリのパス（NAIP, NDBs, XP_Dataフォルダを含む）を入力してください:
> C:\NavData\Workspace
```

#### 3.2 自動パス検出

プログラムが自動的にスキャンし、検出されたファイルを表示します。

```
================= パス設定開始 =================
✅ NAIP_PATH: C:\NavData\Workspace\NAIP
✅ DB_OUTPUT_PATH: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
✅ FNX_NDB_PATH: C:\NavData\Workspace\NDBs\nd.db3
✅ CIFP_PATH: C:\NavData\Workspace\CIFP
✅ PATH_TO_FIX_DAT: C:\NavData\Workspace\X-Plane\earth_fix.dat
✅ PATH_TO_NAV_DAT: C:\NavData\Workspace\X-Plane\earth_nav.dat
✅ LOOKUP_TXT_PATH: C:\NavData\Workspace\ICAO.txt
```

#### 3.3 パス確認

```
上記のパスがすべて正しいことを確認しますか？(Y/N): Y
```

### ⚙️ ステップ4：データ処理フロー

変換プログラムは以下の順序で各種データを処理します。

#### 4.1 空港データ処理

```
空港データを処理中...
📍 空港基本情報を解析中
🧭 空港の磁気偏角を計算中
✅ 空港データ処理完了 (156件の空港を処理)
```

#### 4.2 滑走路データ処理

```
滑走路データを処理中...
🛬 滑走路情報を処理中
📐 滑走路の方向と座標を計算中
✅ 滑走路データ処理完了 (312件の滑走路を処理)
```

#### 4.3 VHF航法援助施設処理

```
VHFデータを処理中...
📡 VOR/DME航法援助施設を処理中
🔢 航法援助施設の周波数とカバー範囲を計算中
✅ VHFデータ処理完了 (89件の航法援助施設を処理)
```

#### 4.4 GS着陸誘導システム

```
GSデータを処理中...
🛬 ILS着陸システムを処理中
📐 グライドパスと位置を計算中
✅ GSデータ処理完了
```

#### 4.5 NDB航法援助施設処理

```
NDBデータを処理中...
📻 無指向性無線標識 (NDB) を処理中
🧭 NDBの磁気偏角を計算中
✅ NDBデータ処理完了 (45件のNDBを処理)
```

#### 4.6 ウェイポイントデータ処理

```
ウェイポイントデータを処理中...
🗺️ 航空路ウェイポイントを処理中
✅ ウェイポイントデータ処理完了 (2,453件の地点を処理)
```

#### 4.7 ターミナルエリアウェイポイント処理

```
ターミナルエリアウェイポイントデータを処理中...
🏢 ターミナルエリアウェイポイントを処理中
✅ ターミナルエリアウェイポイントデータ処理完了 (876件の地点を処理)
```

#### 4.8 SID出発方式処理

```
出発方式を処理中...
🛫 SID (標準計器出発方式) を処理中
📋 方式のウェイポイントと制限を解析中
✅ 出発方式処理完了 (234件の方式を処理)
```

#### 4.9 STAR到着方式処理

```
到着方式を処理中...
🛬 STAR (標準計器到着方式) を処理中
📋 方式のウェイポイントと制限を解析中
✅ 到着方式処理完了 (198件の方式を処理)
```

#### 4.10 IAP進入方式処理

```
進入方式を処理中...
🎯 進入方式 (IAP) を処理中
📋 進入ウェイポイントと制限を解析中
✅ 進入方式処理完了 (445件の方式を処理)
```

#### 4.11 航空路データ処理

```
航空路データを処理中...
🛣️ 高・低高度航空路を処理中
🔗 ウェイポイント間の接続関係を構築中
✅ 航空路データ処理完了 (167件の航空路を処理)
```

#### 4.12 データベース最適化

```
🗜️ データベースを圧縮中...
📊 一時インデックスを削除中...
✅ データベース最適化完了
```

### ⏱️ ステップ5：処理完了

```
=====================================
🎉 データ処理完了、所要時間 127.3 秒
📄 出力ファイル：C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
📊 データベースサイズ：15.6 MB
📈 処理統計：
   - 空港: 156 個
   - 滑走路: 312 条
   - VHF航法援助施設: 89 個
   - NDB航法援助施設: 45 個
   - ウェイポイント: 3,329 個
   - SID方式: 234 個
   - STAR方式: 198 個
   - 進入方式: 445 個
   - 航空路: 167 条
=====================================
Enterキーを押して終了...
```

## 🚁 データ展開（デプロイ）ガイド

### 📁 ターゲット航空機の識別

使用している航空機アドオンに応じて、対応する展開パスを選択してください。

#### iniBuilds A350シリーズ

```
[MSFS Communityフォルダ]\inibuilds-aircraft-a350\work\NavigationData\
```

#### PMDG 737シリーズ

```
[MSFS Communityフォルダ]\pmdg-aircraft-737\Config\Navdata\
[MSFS Communityフォルダ]\pmdg-aircraft-738\Config\Navdata\
[MSFS Communityフォルダ]\pmdg-aircraft-739\Config\Navdata\
```

#### PMDG 777シリーズ

```
[MSFS Communityフォルダ]\pmdg-aircraft-77w\Config\Navdata\
[MSFS Communityフォルダ]\pmdg-aircraft-77f\Config\Navdata\
```

### 🔄 展開（デプロイ）手順

#### ステップ1：既存データのバックアップ

**重要**：常に新しいデータを展開する前にバックアップを作成してください！

```powershell
# 既存のナビゲーションデータをバックアップ
$targetDir = "C:\...\pmdg-aircraft-77w\Config\Navdata"
$backupDir = "$targetDir" + "_backup_" + (Get-Date -Format "yyyyMMdd")
Copy-Item $targetDir $backupDir -Recurse
Write-Host "バックアップが作成されました: $backupDir"
```

#### ステップ2：キャッシュディレクトリのクリア

MSFSのナビゲーションデータキャッシュをクリアします：

**MSFS 2020 (Microsoft Store)**

```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2020 (Steam)**

```
%APPDATA%\Microsoft Flight Simulator\Packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Microsoft Store)**

```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalState\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Steam)**

```
%APPDATA%\Microsoft Flight Simulator 2024\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

#### ステップ3：新しいデータの展開

変換されたデータベースファイルをターゲットの場所にコピーします：

```bash
# データベースファイルをコピー
copy "C:\NavData\Workspace\Output\e_dfd_PMDG.s3db" "[ターゲットナビゲーションデータディレクトリ]\"
```

#### ステップ4：展開の検証

MSFSを起動し、航空機を読み込み、以下の項目を確認します：

- [ ] FMCが正常に起動し、データベースエラーがないこと
- [ ] 空港情報（ICAOコード）を照会できること
- [ ] 航空路（出発地から目的地まで）を計画できること
- [ ] SID/STAR方式が利用可能で完全であること
- [ ] 進入方式が選択可能でデータが正しいこと

## 🔧 高度な使用方法

### 📊 バッチ処理スクリプト

バッチ処理スクリプトを作成して、自動化された操作を実現します：

```batch
@echo off
echo ======================================
echo     Nav-data 自動変換スクリプト
echo ======================================

cd /d "C:\NavData\iniBuilds"

echo 1. データ変換を開始...
python XP2INI_NDB_Converter.py

echo 2. 既存データをバックアップ...
set BACKUP_DIR=C:\NavData\Backup\%date:~0,4%%date:~5,2%%date:~8,2%
mkdir "%BACKUP_DIR%"
xcopy "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData" "%BACKUP_DIR%" /E /I

echo 3. キャッシュをクリア...
del /Q "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\*"

echo 4. 新しいデータを展開...
copy "Output\e_dfd_PMDG.s3db" "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\"

echo 5. 完了！
pause
```

### 🔄 定期更新ワークフロー

自動更新プロセスを設定します：

```python
#!/usr/bin/env python3
"""自動更新ワークフロー"""

import schedule
import time
import subprocess
from datetime import datetime

def update_navdata():
    """ナビゲーションデータ更新を実行"""
    print(f"🔄 ナビゲーションデータ更新を開始 - {datetime.now()}")

    try:
        # 変換プログラムを実行
        result = subprocess.run(['python', 'XP2INI_NDB_Converter.py'],
                              capture_output=True, text=True)

        if result.returncode == 0:
            print("✅ ナビゲーションデータ更新成功！")
            # ここに自動展開（デプロイ）ロジックを追加できます
        else:
            print("❌ 更新失敗：", result.stderr)

    except Exception as e:
        print(f"❌ 更新エラー：{e}")

# 28日ごとに実行（AIRACサイクル）
schedule.every(28).days.do(update_navdata)

# スクリプトの実行を維持
print("📅 ナビゲーションデータ自動更新スケジューラが起動しました")
while True:
    schedule.run_pending()
    time.sleep(3600)  # 1時間ごとにチェック
```

### 🔍 データ品質検証

検証スクリプトを作成して、出力データの品質をチェックします：

```python
#!/usr/bin/env python3
"""データ品質検証スクリプト"""

import sqlite3
import os

def validate_database(db_path):
    """データベースの整合性とデータ品質を検証"""

    if not os.path.exists(db_path):
        print(f"❌ データベースファイルが存在しません: {db_path}")
        return False

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # テーブル構造をチェック
    tables = [
        'tbl_airports',
        'tbl_runways',
        'tbl_d_vhfnavaids',
        'tbl_db_enroute_ndbnavaids',
        'tbl_ea_enroute_waypoints',
        'tbl_pc_terminal_waypoints',
        'tbl_pd_sids',
        'tbl_er_enroute_airways'
    ]

    print("🔍 データベース検証レポート")
    print("=" * 40)

    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"✅ {table}: {count} 件のレコード")
        except sqlite3.OperationalError as e:
            print(f"❌ {table}: テーブルが存在しないか、クエリに失敗しました")

    # データ品質をチェック
    print("\n📊 データ品質チェック")
    print("=" * 40)

    # 空の座標をチェック
    cursor.execute("""
        SELECT COUNT(*) FROM tbl_airports
        WHERE airport_latitude IS NULL OR airport_longitude IS NULL
    """)
    null_coords = cursor.fetchone()[0]

    if null_coords == 0:
        print("✅ 空港座標: 空値なし")
    else:
        print(f"⚠️ 空港座標: {null_coords} 件の空値")

    conn.close()
    return True

if __name__ == "__main__":
    validate_database("Output/e_dfd_PMDG.s3db")
```

## 🚨 よくある使用上の問題

### 変換プロセス中の問題

#### 問題：プログラムが途中で停止する

```bash
# 原因：データファイルが破損しているか、パスが間違っている
# 解決策：すべての入力ファイルの整合性を確認してください
python -c "
import os
for f in ['NAIP/AD_HP.csv', 'X-Plane/earth_fix.dat']:
    if os.path.exists(f):
        print(f'{f}: {os.path.getsize(f)} bytes')
    else:
        print(f'{f}: ファイルが存在しない')
"
```

#### 問題：メモリ不足エラー

```python
# 解決策：バッチ処理サイズを減らす
# 設定でBATCH_SIZEを小さく設定する
BATCH_SIZE = 500  # 500に減らす
```

#### 問題：データベースロックエラー

```bash
# 原因：他のプログラムがデータベースを使用している
# 解決策：関連するすべてのプログラムを閉じてから再実行してください
taskkill /f /im "FlightSimulator.exe"
```

### 展開（デプロイ）の問題

#### 問題：FMCに「DB OUT OF DATE」と表示される

```bash
# 原因：
# 1. データベースファイルが正しくコピーされていない
# 2. MSFSキャッシュがクリアされていない
# 3. AIRACサイクルが一致しない

# 解決手順：
# 1. データベースファイルが正しい場所にあることを確認する
# 2. NavigationDataキャッシュフォルダの内容を完全に削除する
# 3. MSFSを再起動する
```

#### 問題：一部のウェイポイントまたは方式が欠落している

```bash
# 原因：CIFPデータが不完全
# 解決策：
# 1. 完全なCIFPデータパッケージを再ダウンロードする
# 2. ターゲット空港の方式ファイルが存在することを確認する
# 3. ICAO区域コードがサポート範囲内にあるか確認する
```

## 📈 パフォーマンス最適化

### 🚀 変換速度の向上

```python
# マルチプロセス処理を有効にする
MULTIPROCESS_WORKERS = 8  # CPUコア数に応じて調整

# SSDストレージの使用
# 作業ディレクトリをSSDに設定すると、I/Oパフォーマンスが大幅に向上します

# 利用可能なメモリを増やす
# 不要なプログラムを閉じ、最低8GBの利用可能なメモリを確保する
```

### 📊 リソース使用量の監視

```python
import psutil
import time

def monitor_performance():
    """システムリソース使用状況を監視"""
    while True:
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        disk = psutil.disk_usage('.').percent

        print(f"CPU: {cpu}% | メモリ: {memory}% | ディスク: {disk}%")
        time.sleep(5)

# 変換中に監視を実行
monitor_performance()
```

---

おめでとうございます！Nav-dataツールの完全な使用手順を習得しました。