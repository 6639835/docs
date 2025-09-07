# 🔧 トラブルシューティングガイド

このガイドでは、Nav-data PMDG 変換ツール使用時に発生する可能性のある一般的な問題とその解決策についてカバーしています。問題の種類別に分類されており、迅速な特定と解決に役立ちます。

---

## 🚨 インストールに関する問題

### ❌ Python 環境に関する問題

#### **問題**: `python: command not found` または `'python' は内部コマンドまたは外部コマンドとして認識されていません`
**症状**: 
```bash
'python' is not recognized as an internal or external command
```

**解決策**:
```bash
# 1. Pythonのインストールを確認
python --version
# または
python3 --version

# 2. PATH環境変数をチェック
echo $PATH  # Linux/macOS
echo %PATH%  # Windows

# 3. Pythonを再インストール (公式サイトからのダウンロードを推奨)
# https://www.python.org/downloads/
```

#### **問題**: 依存パッケージのインストール失敗
**症状**:
```bash
ERROR: Could not find a version that satisfies the requirement
```

**解決策**:
```bash
# 1. pipを更新
python -m pip install --upgrade pip

# 2. 国内ミラーサイトを使用 (中国ユーザー向け)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 3. pipキャッシュをクリア
pip cache purge

# 4. 仮想環境を使用
python -m venv nav_data_env
source nav_data_env/bin/activate  # Linux/macOS
nav_data_env\Scripts\activate     # Windows
```

### ❌ 権限に関する問題

#### **問題**: MSFSディレクトリへのアクセスが拒否されました
**症状**:
```
PermissionError: [Errno 13] Permission denied
```

**解決策**:
```bash
# Windowsユーザー
# 1. 管理者としてコマンドプロンプトを実行
# 2. またはディレクトリの権限を変更
icacls "C:\Users\[ユーザー名]\AppData\Local\Packages" /grant Users:F /T

# MSFSディレクトリの権限を確認
# ディレクトリを右クリック -> プロパティ -> セキュリティ -> 編集 -> フルコントロール権限を追加
```

---

## 🔄 変換に関する問題

### ❌ データファイルに関する問題

#### **問題**: AIRACデータファイルが見つかりません
**症状**:
```
FileNotFoundError: AIRAC data file not found
```

**診断手順**:
```bash
# 1. ファイルパスを確認
ls -la ./input/AIRAC2024-01/  # Linux/macOS
dir .\input\AIRAC2024-01\     # Windows

# 2. ファイル権限を確認
ls -la *.dat *.txt *.xml      # データファイルを確認
```

**解決策**:
```bash
# 1. データファイルの形式と場所を確認
mkdir -p ./input/AIRAC2024-01
# AIRACデータファイルを正しいディレクトリに配置

# 2. ファイルの整合性を確認
python validate_data.py --check-integrity --input-dir=./input/AIRAC2024-01
```

#### **問題**: データ形式の非互換性
**症状**:
```
ValueError: Unsupported data format or corrupted file
```

**解決策**:
```bash
# 1. サポートされている形式を確認
python converter.py --list-supported-formats

# 2. データ形式を変換
python format_converter.py --input=old_format.dat --output=new_format.xml --format=ARINC424

# 3. デバッグモードを使用して詳細情報を取得
python converter.py --debug --verbose --input=problematic_file.dat
```

### ❌ 変換プロセスエラー

#### **問題**: メモリ不足エラー
**症状**:
```
MemoryError: Unable to allocate array
```

**解決策**:
```bash
# 1. 大規模なデータセットをチャンク処理
python converter.py --batch-size=1000 --memory-limit=4GB

# 2. データストリーム処理を有効化
python converter.py --streaming-mode --temp-dir=/tmp/nav_data

# 3. 仮想メモリを増やす (Windows)
# コントロールパネル -> システム -> システムの詳細設定 -> 仮想メモリ

# 4. システムリソースの最適化
# 不要なプログラムを終了
# 一時ファイルをクリーンアップ
```

#### **問題**: 座標変換エラー
**症状**:
```
CoordinateTransformError: Invalid coordinate conversion
```

**解決策**:
```bash
# 1. 座標系設定を確認
python converter.py --coordinate-system=WGS84 --verify-coordinates

# 2. 代替の変換方法を使用
python converter.py --coordinate-method=alternative --precision=8

# 3. 磁気偏角設定を確認
python converter.py --magnetic-model=WMM2020 --declination-check
```

---

## ⚙️ 設定に関する問題

### ❌ PMDG 統合に関する問題

#### **問題**: PMDG機がナビゲーションデータを認識できません
**症状**: FMCに「NAV DATA NOT FOUND」と表示される、またはウェイポイントが読み込まれない

**診断手順**:
```bash
# 1. PMDGデータディレクトリを確認
dir "C:\Users\%USERNAME%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\PMDG\"

# 2. データベースファイルを確認
python verify_pmdg_db.py --check-tables --check-indexes
```

**解決策**:
```bash
# 1. PMDGデータパスを確認
python converter.py --pmdg-path="C:\Users\[ユーザー名]\AppData\Local\Packages\Microsoft.FlightSimulator_[ID]\LocalCache\PMDG"

# 2. データベースインデックスを再構築
python rebuild_indexes.py --database=pmdg_nav.db

# 3. ファイル権限を確認
icacls "PMDGデータディレクトリ" /grant Users:F /T

# 4. MSFSとPMDG機を再起動
```

#### **問題**: データバージョンの不一致
**症状**: PMDGが古いAIRACサイクルを表示する、またはデータが更新されない

**解決策**:
```bash
# 1. AIRAC識別子を強制更新
python converter.py --force-airac-update --airac-cycle=2024-01

# 2. キャッシュをクリア
python clear_cache.py --pmdg-cache --nav-cache

# 3. AIRACサイクルを確認
python verify_airac.py --current-cycle --check-validity
```

---

## 🚀 パフォーマンスに関する問題

### ❌ 変換速度が遅い

#### **問題**: 変換プロセスが異常に遅い
**考えられる原因**:
- HDD/SSD I/Oのボトルネック
- メモリ不足
- CPU使用率の低さ
- ネットワーク遅延（オンライン検証）

**最適化案**:
```bash
# 1. マルチプロセス処理を有効化
python converter.py --parallel=4 --workers=auto

# 2. SSDの一時ディレクトリを使用
python converter.py --temp-dir="D:\SSD_Temp" --keep-temp-files=false

# 3. 不要な検証を無効化
python converter.py --skip-validation --no-online-check

# 4. I/O操作を最適化
python converter.py --buffer-size=64MB --async-io
```

### ❌ メモリ使用量が高すぎる

#### **問題**: 変換プロセスが大量のメモリを消費する
**メモリ使用量の監視**:
```bash
# Windows
tasklist /fi "imagename eq python.exe"

# Linux/macOS  
top -p $(pgrep python)
```

**解決策**:
```bash
# 1. ストリーミング処理を有効化
python converter.py --streaming --chunk-size=10MB

# 2. メモリ使用量を制限
python converter.py --max-memory=2GB --gc-threshold=100MB

# 3. 段階的に処理
python converter.py --process-by-region --region-size=small
```

---

## 🔍 データ検証に関する問題

### ❌ データ整合性チェックの失敗

#### **問題**: 検証ツールがデータ不完全を報告する
**症状**:
```
ValidationError: Missing required navigation points
```

**診断ツール**:
```bash
# 1. 包括的な検証を実行
python validate_data.py --comprehensive --output-report=validation_report.html

# 2. 特定のデータ型をチェック
python validate_data.py --check-airports --check-navaids --check-airways

# 3. 参照データと比較
python compare_data.py --reference=official_data.xml --current=converted_data.db
```

**修復案**:
```bash
# 1. ソースデータを再ダウンロード
# AIRACデータが完全かつ最新であることを確認

# 2. 修復ツールを使用
python repair_data.py --fix-missing --interpolate-gaps

# 3. 不足しているデータを手動で補完
python manual_fix.py --add-missing-waypoints --config=fixes.json
```

### ❌ 座標精度に関する問題

#### **問題**: ナビゲーションポイントの位置が不正確
**確認方法**:
```bash
# 1. 特定のウェイポイント座標を確認
python check_waypoint.py --icao=ZSPD --waypoint=SASAN

# 2. 複数のデータソースを比較
python compare_coordinates.py --sources=navigraph,aerosoft --output=coordinate_diff.csv

# 3. 偏差レポートを生成
python deviation_report.py --threshold=0.001 --output=deviations.html
```

---

## 📊 ログ分析

### 🔍 ログファイルの理解

#### **ログレベルの説明**:
- **DEBUG**: 詳細なデバッグ情報
- **INFO**: 一般的な処理情報
- **WARNING**: 警告情報、機能には影響なし
- **ERROR**: エラー情報、要確認
- **CRITICAL**: 重大なエラー、処理中断

#### **一般的なログパターン**:
```bash
# エラーログを検索
grep "ERROR\|CRITICAL" converter.log

# 警告数をカウント
grep -c "WARNING" converter.log

# 処理時間を分析
grep "Processing time" converter.log | tail -10
```

### 🔧 ログ設定

#### **ログの詳細レベルを上げる**:
```bash
# 詳細ログを有効化
python converter.py --log-level=DEBUG --log-format=detailed

# 異なる種類のログを分離
python converter.py --log-split --error-log=errors.log --debug-log=debug.log
```

---

## 🆘 緊急修復

### 🚨 データ破損からの復旧

#### **ステップ1**: 即時バックアップ
```bash
# 現在の状態をバックアップ
cp -r ./output ./backup_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
xcopy .\output .\backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E /I  # Windows
```

#### **ステップ2**: バックアップからの復元
```bash
# 最新の有効なバックアップを復元
python restore_backup.py --list-backups
python restore_backup.py --restore=backup_20240115_1430 --target=./output
```

#### **ステップ3**: 復元されたデータの検証
```bash
# 復元されたデータを検証
python validate_data.py --quick-check --report-only-errors
```

### 🚨 デフォルト状態にリセット

#### **完全リセット**:
```bash
# 警告：これにより、変換されたすべてのデータが削除されます
python reset_tool.py --full-reset --confirm

# デフォルト設定を再ダウンロード
python setup.py --download-config --reset-settings

# 初期化を再実行
python init.py --first-time-setup
```

---

## 📞 さらにヘルプが必要な場合

### 📝 問題を報告する際に提供すべき情報

1.  **システム情報**:
    ```bash
    python --version
    python system_info.py --full-report # 完全なレポート
    ```

2.  **エラーログ**:
    - 完全なエラーのスタックトレース
    - 関連する警告情報
    - 処理前後のログスニペット

3.  **環境情報**:
    - OSバージョン
    - MSFSのバージョンとインストール方法
    - PMDG機のバージョン
    - データソースとAIRACサイクル

4.  **再現手順**:
    - 詳細な操作手順
    - 入力されたコマンドとパラメータ
    - 期待される結果 vs 実際の結果

### 🔗 連絡先

- **GitHub Issues**: [問題レポートを提出](https://github.com/nav-data/docs/issues/new)
- **コミュニティフォーラム**: [議論に参加](https://github.com/nav-data/docs/discussions)
- **緊急サポート**: support@nav-data.org

---

## 🔄 予防策

### ✅ ベストプラクティスチェックリスト

- [ ] データと設定の**定期的なバックアップ**
- [ ] 変換ツールの**最新バージョンを使用**
- [ ] 変換後に**データを検証**
- [ ] 潜在的な問題を把握するために**ログを監視**
- [ ] 環境をクリーンに保ち、**更新する**
- [ ] カスタム設定を**文書化する**

### 📅 メンテナンス計画

- **毎週**: ログファイルをチェックし、一時ファイルをクリーンアップ
- **毎月**: AIRACデータを更新し、ツールバージョンを検証
- **四半期ごと**: 完全なシステムチェック、パフォーマンス最適化
- **重要な更新時**: 完全なバックアップ、慎重なアップグレード

覚えておいてください：予防は治療に勝る！定期的なメンテナンスは、ほとんどの問題の発生を防ぐことができます。