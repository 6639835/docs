# 🛠️ iFly 航法データ変換ツールのトラブルシューティング

## 🚨 よくあるエラーとその解決策

### 1. インストールと環境の問題

#### ❌ Pythonバージョンの非互換性

**エラーメッセージ：**
```
SyntaxError: invalid syntax
TypeError: 'type' object is not subscriptable
```

**解決策：**
1. **Pythonバージョンを確認する**：
   ```bash
   python --version
   ```
2. **Python 3.8+にアップグレードする**：
   - Windows: python.orgから最新バージョンをダウンロードする
   - macOS: `brew install python`
   - Linux: `sudo apt-get install python3.9`

#### ❌ 依存パッケージのインストール失敗

**エラーメッセージ：**
```
ERROR: Could not find a version that satisfies the requirement
ModuleNotFoundError: No module named 'rich'
```

**解決策：**
1. **pipをアップグレードする**：
   ```bash
   python -m pip install --upgrade pip
   ```
2. **キャッシュをクリアして再インストールする**：
   ```bash
   pip cache purge
   pip install -r requirements.txt --no-cache-dir
   ```
3. **国内ミラーサイトを使用する**：
   ```bash
   pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
   ```

### 2. ファイルとパスの問題

#### ❌ Fenixデータベースファイルが見つからない

**エラーメッセージ：**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
データベースファイルが存在しないか、パスが間違っています
```

**解決策：**
1. **ファイルの場所を確認する**：
   ```bash
   # よくある場所
   %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\
   ```
2. **絶対パスを使用する**：完全なファイルパスを入力する
3. **ファイル権限を確認する**：ファイルが読み取り可能であることを確認する

#### ❌ iFlyインストールパスの検出に失敗しました

**エラーメッセージ：**
```
iFly 737 MAX 8のインストールパスが見つかりませんでした
iFlyのインストールディレクトリを手動で指定してください
```

**解決策：**
1. **パスを手動で入力する**：
   ```
   # Community版
   %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Community\ifly-aircraft-737max8\
   
   # Marketplace版
   %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Official\asobo-aircraft-ifly-737max8\
   ```
2. **パス構造を検証する**：`Data\navdata\` ディレクトリが含まれていることを確認する

#### ❌ ファイル書き込み権限の不足

**エラーメッセージ：**
```
PermissionError: [Errno 13] Permission denied
ファイルに書き込めません
```

**解決策：**
1. **管理者として実行する**：
   - Windows: 右クリック → "管理者として実行"
   - macOS/Linux: `sudo python main.py`
2. **ファイル権限を変更する**：
   ```bash
   chmod 755 /path/to/ifly/directory
   ```
3. **ファイルが使用中か確認する**：MSFSおよびその他の関連プログラムを閉じる

### 3. データ処理の問題

#### ❌ CSVファイル形式のエラー

**エラーメッセージ：**
```
pandas.errors.EmptyDataError: No columns to parse from file
UnicodeDecodeError: 'utf-8' codec can't decode
```

**解決策：**
1. **ファイルエンコーディングを確認する**：
   ```python
   # UTF-8に変換
   import chardet
   with open('file.csv', 'rb') as f:
       encoding = chardet.detect(f.read())['encoding']
   ```
2. **CSV形式を検証する**：必要な列が含まれていることを確認する
3. **データを再ダウンロードする**：新しいNAIPデータファイルを取得する

#### ❌ 磁気偏角の計算に失敗

**エラーメッセージ：**
```
geomag.GeomagnticCalculationError: Invalid date or coordinates
磁気偏角の計算で異常が発生しました
```

**解決策：**
1. **座標範囲を確認する**：
   - 緯度: -90° から +90°
   - 経度: -180° から +180°
2. **pygeomagを更新する**：
   ```bash
   pip install --upgrade pygeomag
   ```
3. **日付の有効性を検証する**：AIRACの日付が妥当な範囲内であることを確認する

#### ❌ AIRACサイクル計算エラー

**エラーメッセージ：**
```
ValueError: Invalid AIRAC cycle calculation
AIRACサイクルの計算に失敗しました
```

**解決策：**
1. **システム時間を確認する**：システム時間が正しいことを確認する
2. **サイクルを手動で設定する**：
   ```python
   # AIRACサイクルを手動で指定
   airac_cycle = "2508"
   ```
3. **タイムゾーン情報を更新する**：正しいタイムゾーン設定であることを確認する

### 4. メモリとパフォーマンスの問題

#### ❌ メモリ不足

**エラーメッセージ：**
```
MemoryError: Unable to allocate array
メモリ不足のため、大きなデータファイルを処理できません
```

**解決策：**
1. **仮想メモリを増やす**：
   - Windows: コントロールパネル → システム → システムの詳細設定 → パフォーマンス設定 → 仮想メモリ
2. **バッチ処理する**：
   ```python
   # データをバッチで読み込む
   chunk_size = 1000
   for chunk in pd.read_csv(file, chunksize=chunk_size):
       process_chunk(chunk)
   ```
3. **他のプログラムを閉じる**：システムメモリを解放する

#### ❌ 処理速度が遅すぎる

**現象：** 磁気偏角の計算に時間がかかりすぎる

**最適化策：**
1. **ハードウェアの最適化**：
   - SSDドライブを使用する
   - RAMを8GB以上に増やす
   - マルチコアCPUを使用する
2. **ソフトウェアの最適化**：
   ```python
   # 並列処理
   from concurrent.futures import ThreadPoolExecutor
   with ThreadPoolExecutor(max_workers=4) as executor:
       results = executor.map(calculate_declination, coordinates)
   ```
3. **データ量を減らす**：不要なウェイポイントをフィルタリングする

### 5. 出力と検証の問題

#### ❌ 変換後のデータがiFlyで表示されない

**考えられる原因：**
- ファイル形式が正しくない
- データの上書きルールに関する問題
- iFlyのキャッシュがクリアされていない

**解決策：**
1. **ファイル形式を検証する**：
   ```bash
   # ファイル内容を確認
   head -n 10 WPNAVRTE.txt
   ```
2. **iFlyのキャッシュをクリアする**：
   ```bash
   # キャッシュファイルを削除
   rm -rf "%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_*\LocalCache\*ifly*"
   ```
3. **シミュレーターを再起動する**：MSFSを完全に終了し、再起動する

#### ❌ FMCでのウェイポイント表示異常

**現象：** ウェイポイントの座標オフセットまたはタイプエラー

**確認手順：**
1. **座標形式を検証する**：
   ```
   # 正しい形式
   123.45678  # 経度 (°)
   -12.34567  # 緯度 (°)
   ```
2. **ウェイポイントタイプを確認する**：
   ```
   11 - DESIGNATED_POINT (指定点)
   3  - VOR/DME
   2  - NDB
   ```
3. **磁気偏角の値を検証する**：
   ```
   # 妥当な範囲
   -30.0 から +30.0 度
   ```

## 🔍 診断ツール

### 1. ログ分析

**詳細ログの表示：**
```bash
# 最新ログを表示
tail -f converter.log

# エラーメッセージを検索
grep "ERROR" converter.log
grep "Exception" converter.log
```

**ログレベルの説明：**
- `DEBUG`: 詳細なデバッグ情報
- `INFO`: 一般情報
- `WARNING`: 警告情報
- `ERROR`: エラー情報
- `CRITICAL`: 致命的なエラー

### 2. データ検証スクリプト

**検証スクリプトの作成：**
```python
import pandas as pd
import sqlite3

def validate_database(db_path):
    """データベースの整合性を検証する"""
    conn = sqlite3.connect(db_path)
    
    # 必須テーブルの確認
    required_tables = [
        'Airports', 'Runways', 'Navaids', 
        'Waypoints', 'Terminals', 'TerminalLegs'
    ]
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    missing_tables = set(required_tables) - set(tables)
    if missing_tables:
        print(f"不足しているテーブル: {missing_tables}")
        return False
    
    print("データベース検証成功")
    return True

# 使用例
validate_database("path/to/nd.db3")
```

### 3. システム情報収集

**システム情報レポートの作成：**
```python
import platform
import sys
import pkg_resources

def generate_system_report():
    """システム情報レポートを生成する"""
    report = []
    
    # システム情報
    report.append("=== システム情報 ===")
    report.append(f"OS: {platform.system()} {platform.release()}")
    report.append(f"アーキテクチャ: {platform.machine()}")
    report.append(f"Pythonバージョン: {sys.version}")
    
    # インストール済みパッケージ
    report.append("\n=== インストール済みパッケージ ===")
    installed_packages = [d for d in pkg_resources.working_set]
    for package in sorted(installed_packages, key=lambda x: x.key):
        report.append(f"{package.key}: {package.version}")
    
    return "\n".join(report)

# レポートを生成
print(generate_system_report())
```

## 📋 トラブルシューティングチェックリスト

### 🔧 基本チェック
- [ ] Pythonバージョン ≥ 3.8
- [ ] すべての依存パッケージがインストールされている
- [ ] Fenixデータベースファイルが存在し、読み取り可能である
- [ ] iFly 737 MAX 8が正しくインストールされている
- [ ] 十分なディスク容量 (≥ 100MB)
- [ ] 十分なメモリ (≥ 4GB)

### 📁 パス検証
- [ ] Fenixデータベースパスが正しい
- [ ] iFlyインストールパスが正しい
- [ ] CSVデータファイルのパスが正しい
- [ ] 出力ディレクトリに書き込み権限がある

### 📊 データチェック
- [ ] CSVファイル形式が正しい (UTF-8エンコーディング)
- [ ] データベースのテーブル構造が完全である
- [ ] 座標データが有効範囲内にある
- [ ] AIRACサイクル計算が正しい

### 🔄 処理検証
- [ ] ログファイルにERRORレベルの情報がない
- [ ] 出力ファイルが生成されている
- [ ] ファイルサイズが妥当である (0ではない)
- [ ] iFlyでデータが正しく表示されている

## 🆘 ヘルプの利用

### 自己解決
1. **ドキュメントを参照する**：完全なユーザーガイドを読む
2. **ログを検索する**：特定のエラーメッセージを見つける
3. **FAQを確認する**：よくある質問と回答を見る
4. **問題を再現する**：問題が再現可能であることを確認する

### コミュニティサポート
1. **GitHub Issues**：技術的な問題を報告する
2. **ディスカッションフォーラム**：コミュニティディスカッションに参加する
3. **QQグループ/WeChatグループ**：リアルタイムでの質疑応答

### 問題を報告する際は、以下を提供してください：
- **エラーログ**：完全なエラー情報
- **システム情報**：OS、Pythonバージョンなど
- **再現手順**：詳細な操作手順
- **ファイル情報**：関連ファイルのサイズとパス
- **スクリーンショット**：必要に応じて画面のスクリーンショット

---

**覚えておいてください：ほとんどの問題には解決策があります！**

困ったときは、まず深呼吸をしてから、このガイドに従って段階的にトラブルシューティングを行ってください。🔧✨