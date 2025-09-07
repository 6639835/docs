# 🔧 トラブルシューティングガイド

本ガイドは、Nav-data iniBuilds 変換ツール使用時に発生しうる一般的な問題とその解決策について説明します。問題の深刻度と種類によって分類されており、迅速な診断と解決に役立ちます。

---

## 🚨 緊急の問題 (Critical Issues)

### ❌ 変換ツールが起動しない

#### **問題**: Python環境の問題によりツールが実行できない
**症状**:
```bash
ModuleNotFoundError: No module named 'converter'
ImportError: cannot import name 'XP2INI_Converter'
```

**即時解決策**:
```bash
# 1. Python環境の検証
python --version  # 3.8+と表示されるはず

# 2. 依存関係の再インストール
pip uninstall -r requirements.txt -y
pip install -r requirements.txt --force-reinstall

# 3. 作業ディレクトリの確認
pwd  # Linux/macOS
echo %cd%  # Windows

# 4. リポジトリの再クローン (最終手段)
git clone https://github.com/nav-data/converter.git
cd converter
python setup.py install
```

#### **問題**: 重要なファイルの欠落
**症状**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'XP2INI_NDB_Converter.py'
```

**即時解決策**:
```bash
# 1. ファイルの整合性検証
ls -la *.py  # Linux/macOS
dir *.py     # Windows

# 2. 欠落ファイルの再ダウンロード
wget https://raw.githubusercontent.com/nav-data/converter/main/XP2INI_NDB_Converter.py

# 3. 権限の確認
chmod +x *.py  # Linux/macOS
```

---

## ⚠️ 高優先度の問題 (High Priority)

### ❌ A350データ統合の失敗

#### **問題**: iniBuilds A350がナビゲーションデータを認識しない
**症状**: MCDUに「NO NAV DATA」と表示される、またはAIRACが空表示になる

**診断手順**:
```bash
# 1. A350インストールパスの確認
find /c/Users -name "*inibuilds*" -type d 2>/dev/null  # Windows (Git Bash)
find /Users -name "*inibuilds*" -type d 2>/dev/null    # macOS
find /home -name "*inibuilds*" -type d 2>/dev/null     # Linux

# 2. Communityフォルダの検証
ls "$MSFS_COMMUNITY_PATH/inibuilds-aircraft-a350/SimObjects/Airplanes/iniBuilds_A350_900/"

# 3. データファイルの確認
ls -la *.db *.sqlite *.json  # A350データディレクトリ内
```

**解決策**:
```bash
# 1. A350インストールの再配置
python converter.py --detect-aircraft --scan-community-folder

# 2. パスの手動指定
python converter.py --a350-path="/path/to/inibuilds-aircraft-a350" --force-install

# 3. ファイル権限の修復
# Windows
icacls "A350データディレクトリ" /grant Users:F /T

# Linux/macOS  
chmod -R 755 /path/to/inibuilds-aircraft-a350/
chown -R $USER:$USER /path/to/inibuilds-aircraft-a350/

# 4. インストールの検証
python verify_installation.py --aircraft=a350 --verbose
```

#### **問題**: AIRACサイクルが一致しない
**症状**: A350に古いまたは誤ったAIRACサイクルが表示される

**解決策**:
```bash
# 1. AIRAC識別子の強制更新
python converter.py --force-airac --cycle=2024-01 --aircraft=a350

# 2. A350キャッシュのクリア
# A350キャッシュファイルの削除
rm -f "$A350_PATH/work/NavData/cache/*"  # Linux/macOS
del "%A350_PATH%\work\NavData\cache\*"   # Windows

# 3. ナビゲーションデータベースの再生成
python rebuild_navdb.py --aircraft=a350 --clean-rebuild

# 4. AIRACサイクルの検証
python check_airac.py --aircraft=a350 --expected-cycle=2024-01
```

---

## 🔄 インストールと設定の問題

### ❌ 依存パッケージのインストール失敗

#### **問題**: 特定パッケージのインストール失敗
**よくあるエラー**:
```bash
# 数学ライブラリの依存関係の問題
ERROR: Failed building wheel for numpy
ERROR: Failed building wheel for pandas

# コンパイラの問題
Microsoft Visual C++ 14.0 is required
error: Microsoft Visual Studio 14.0 is required
```

**プラットフォームごとの解決策**:

**Windows**:
```bash
# 1. Visual Studio Build Toolsのインストール
# ダウンロードしてインストール: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# 2. プリコンパイル済みパッケージの使用
pip install numpy pandas -f https://www.lfd.uci.edu/~gohlke/pythonlibs/

# 3. condaの使用 (推奨)
conda install numpy pandas sqlite3 lxml
```

**macOS**:
```bash
# 1. Xcode Command Line Toolsのインストール
xcode-select --install

# 2. Homebrewを使用して依存関係をインストール
brew install python@3.9 sqlite3

# 3. Pythonパッケージの再インストール
pip3 install -r requirements.txt
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3-dev python3-pip build-essential libsqlite3-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel sqlite-devel

# パッケージの再インストール
pip3 install -r requirements.txt
```

### ❌ データソース設定の問題

#### **問題**: データソースに接続できない
**症状**:
```
ConnectionError: Failed to download AIRAC data
TimeoutError: Data source unreachable
```

**ネットワーク診断**:
```bash
# 1. ネットワーク接続のテスト
ping navigraph.com
nslookup navigraph.com

# 2. プロキシ設定の確認
echo $HTTP_PROXY $HTTPS_PROXY  # Linux/macOS
echo %HTTP_PROXY% %HTTPS_PROXY%  # Windows

# 3. ポート接続のテスト
telnet navigraph.com 443
nc -zv navigraph.com 443  # Linux/macOS
```

**解決策**:
```bash
# 1. プロキシの設定 (必要な場合)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# Windows
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=https://proxy.company.com:8080

# 2. オフラインモードの使用
python converter.py --offline --local-data=/path/to/airac/data

# 3. データソースの変更
python converter.py --data-source=backup --mirror=asia
```

---

## 📊 データ処理の問題

### ❌ メモリ関連のエラー

#### **問題**: メモリ不足による変換失敗
**症状**:
```
MemoryError: Unable to allocate memory
MemoryError: cannot allocate memory for array
OSError: [Errno 12] Cannot allocate memory
```

**メモリ監視**:
```bash
# リアルタイムでのメモリ使用量監視
# Linux
free -h
htop

# macOS
vm_stat
activity monitor

# Windows
tasklist /fi "imagename eq python.exe"
wmic process get name,processid,workingsetsize
```

**最適化された解決策**:
```bash
# 1. ストリーミングモードの有効化
python converter.py --streaming --chunk-size=512KB --memory-limit=2GB

# 2. 地域ごとの処理
python converter.py --region=ZSPD --process-incrementally
python converter.py --region=ZBAA --process-incrementally  
python converter.py --region=ZGGG --process-incrementally

# 3. システムメモリの最適化
# 不要なアプリケーションの終了
# 仮想メモリ/スワップ領域の増量

# Linux - スワップ領域の増量
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. 低メモリモードの使用
python converter.py --low-memory --disable-cache --temp-cleanup
```

### ❌ データ形式のエラー

#### **問題**: 入力データ形式の非互換性
**症状**:
```
ValueError: Invalid ARINC 424 format
ParseError: Malformed XML data
UnicodeDecodeError: codec can't decode byte
```

**データ検証**:
```bash
# 1. ファイルエンコーディングの確認
file input_data.dat
hexdump -C input_data.dat | head

# 2. ファイル整合性の検証
md5sum input_data.dat  # Linux/macOS
certUtil -hashfile input_data.dat MD5  # Windows

# 3. ファイル形式の確認
python validate_format.py --input=input_data.dat --format=arinc424
```

**修復策**:
```bash
# 1. ファイルエンコーディングの変換
iconv -f ISO-8859-1 -t UTF-8 input_data.dat > input_data_utf8.dat  # Linux/macOS

# Windows (PowerShell)
Get-Content input_data.dat -Encoding Default | Set-Content input_data_utf8.dat -Encoding UTF8

# 2. 形式変換ツールの使用
python format_converter.py --input=input_data.dat --from=legacy --to=arinc424

# 3. よくある問題の手動修復
python repair_data.py --fix-encoding --fix-line-endings --input=input_data.dat
```

---

## 🚀 パフォーマンスの問題

### ❌ 変換速度が遅すぎる

#### **問題**: 変換プロセスが異常に遅い
**考えられる原因分析**:
- ディスクI/Oのボトルネック (HDD vs SSD)
- CPU使用率の低さ (シングルスレッド処理)
- メモリ不足による頻繁なスワッピング
- ネットワーク遅延 (オンライン検証)

**パフォーマンス診断**:
```bash
# 1. システムリソースの監視
# Linux
iostat -x 1    # I/O統計
top -p $(pgrep python)  # CPUとメモリ

# macOS
iostat 1       # I/O統計  
top -pid $(pgrep python)  # プロセス監視

# Windows
perfmon        # パフォーマンスモニタ
wmic process get name,processid,percentprocessortime
```

**パフォーマンスの最適化**:
```bash
# 1. マルチプロセス処理の有効化
python converter.py --parallel=auto --workers=$(nproc)

# 2. より高速なストレージの使用
python converter.py --temp-dir=/path/to/ssd/temp --output-dir=/path/to/ssd/output

# 3. 不要なチェックの無効化
python converter.py --skip-validation --no-backup --fast-mode

# 4. メモリマップモード (大容量ファイル)
python converter.py --memory-map --buffer-size=64MB

# 5. 出力の圧縮 (I/O削減)
python converter.py --compress-output --compression=lz4
```

### ❌ CPU使用率が高すぎる

#### **問題**: 変換プロセスでCPU使用率が100%になり、システム応答が遅い
**解決策**:
```bash
# 1. CPU使用率の制限
python converter.py --cpu-limit=75 --nice=10

# 2. 並列度を下げる
python converter.py --parallel=2 --throttle=1000ms

# 3. 優先度制御の使用
# Linux/macOS
nice -n 19 python converter.py  # 最低優先度

# Windows  
start /low python converter.py
```

---

## 🔍 iniBuilds A350 専用の問題

### ❌ MCDUナビゲーションデータ表示の問題

#### **問題**: MCDUでのナビゲーションデータが不正確または不完全
**症状**:
- ウェイポイントが見つからない
- SID/STARプロシージャの欠落
- 周波数情報の誤り
- 座標のずれ

**診断ツール**:
```bash
# 1. A350データベースの整合性チェック
python check_a350_db.py --comprehensive --report=detailed

# 2. 特定のナビゲーションポイントの検証
python verify_waypoint.py --icao=ZSPD --waypoint=SASAN --aircraft=a350

# 3. データの一貫性比較
python compare_data.py --source=navigraph --target=a350_db --threshold=0.001

# 4. 差分レポートの生成
python diff_report.py --original=source_data --converted=a350_data --format=html
```

**修復手順**:
```bash
# 1. ナビゲーションデータベースの再生成
python rebuild_navdb.py --aircraft=a350 --source=latest_airac

# 2. 重要なウェイポイントの手動修復
python manual_fix.py --waypoints=critical_fixes.json --aircraft=a350

# 3. 周波数データの更新
python update_frequencies.py --aircraft=a350 --source=official

# 4. 修復結果の検証
python validate_fix.py --aircraft=a350 --quick-test
```

### ❌ FMSルート計画の問題

#### **問題**: A350 FMSがルートを正しく計画できない
**症状**:
- 「NO ROUTE FOUND」エラー
- ルートセグメント接続の中断
- 高度制限の誤り

**解決手順**:
```bash
# 1. ルートの接続性チェック
python check_airways.py --from=ZSPD --to=ZBAA --aircraft=a350

# 2. ウェイポイント接続の検証
python validate_connections.py --airway=A461 --aircraft=a350

# 3. 切断されたルートの修復
python repair_airways.py --auto-fix --aircraft=a350 --region=china

# 4. ルートネットワークの再構築
python rebuild_airways.py --aircraft=a350 --optimize-paths
```

---

## 📋 ログ分析と診断

### 🔍 エラーログの理解

#### **よくあるエラーパターンとその意味**:

**データ変換エラー**:
```bash
# 座標変換の問題
ERROR: CoordinateTransformError: Invalid coordinate format
# -> 入力データの座標形式を確認してください

# データベース書き込み失敗  
ERROR: DatabaseError: database is locked
# -> データベースにアクセスしている他のプログラムを終了してください

# ファイル権限の問題
ERROR: PermissionError: [Errno 13] Permission denied
# -> 管理者権限を使用するか、ファイル権限を変更してください
```

**ネットワーク接続エラー**:
```bash
# 接続タイムアウト
ERROR: ConnectionTimeout: Failed to connect within 30 seconds
# -> ネットワーク接続を確認し、タイムアウト時間を延長してください

# DNS解決失敗
ERROR: socket.gaierror: [Errno -2] Name or service not known  
# -> DNS設定を確認し、代替DNSサーバーを使用してください
```

#### **ログレベルの詳細**:
- **CRITICAL**: プログラムが実行を継続できない深刻なエラー
- **ERROR**: 機能の実行は失敗したが、プログラムは継続可能
- **WARNING**: 潜在的な問題であり、現在の実行には影響しない
- **INFO**: 一般的な情報、処理の進行状況など
- **DEBUG**: 問題診断のための詳細なデバッグ情報

### 🛠️ 高度なデバッグ技術

#### **詳細デバッグの有効化**:
```bash
# 1. 最も詳細なログ
python converter.py --log-level=DEBUG --verbose --trace --profile

# 2. 異なる種類のログの分離
python converter.py --log-split \
  --error-log=errors.log \
  --warning-log=warnings.log \
  --debug-log=debug.log \
  --info-log=info.log

# 3. ログのリアルタイム監視
tail -f converter.log | grep -E "(ERROR|CRITICAL)"  # Linux/macOS
```

#### **性能分析**:
```bash
# 1. 性能分析の有効化
python -m cProfile -o profile_output.prof converter.py

# 2. 性能ボトルネックの分析
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"

# 3. メモリ使用量分析
python -m memory_profiler converter.py --memory-profile
```

---

## 🆘 緊急回復手順

### 🚨 データ破損からの回復

#### **迅速な回復手順**:
```bash
# 1. 関連するすべてのプロセスを直ちに停止する
pkill -f "python.*converter"  # Linux/macOS
taskkill /f /im python.exe    # Windows

# 2. 現在の状態のスナップショットを作成する
cp -r output_data recovery_snapshot_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
robocopy output_data recovery_snapshot_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E  # Windows

# 3. 最新のバックアップから回復する
python restore_backup.py --list-available
python restore_backup.py --restore=latest --confirm --target=output_data

# 4. 回復したデータの検証
python verify_data_integrity.py --comprehensive --fix-minor-issues
```

### 🔄 完全リセット手順

#### **すべての方法が失敗した場合**:
```bash
# 警告：これにより、変換されたすべてのデータと設定が削除されます
echo "This will delete all converted data. Continue? (yes/no)"
read confirmation
if [ "$confirmation" = "yes" ]; then
    # 1. ユーザー設定のバックアップ
    cp config.json config_backup_$(date +%Y%m%d).json
    
    # 2. 完全クリーンアップ
    python cleanup_all.py --nuclear-option --confirm-delete
    
    # 3. 再初期化
    python setup.py --fresh-install --default-config
    
    # 4. ユーザー設定の回復
    python merge_config.py --base=config.json --user=config_backup_*.json
fi
```

---

## 📞 専門家によるサポートの利用

### 📝 サポートリクエストの準備

**サポートに連絡する前に、以下の情報を収集してください**:

```bash
# 1. システム情報レポート
python system_report.py --full > system_info.txt

# 2. エラーログ (最新100行)
tail -100 converter.log > recent_errors.log  # Linux/macOS
powershell "Get-Content converter.log -Tail 100" > recent_errors.log  # Windows

# 3. 設定ファイル
cp config.json config_for_support.json

# 4. バージョン情報
python --version > version_info.txt
python converter.py --version >> version_info.txt
git log --oneline -5 >> version_info.txt
```

### 🔗 サポートチャネル

#### **緊急度に応じて選択**:

**🚨 緊急 (24時間以内に飛行に影響)**:
- 📧 **緊急メールアドレス**: emergency@nav-data.org
- 📱 **緊急連絡先**: WeChatグループ "Nav-data緊急支援"

**⚠️ 重要 (1～3日以内に返信)**:
- 🐛 **GitHub Issues**: [詳細な問題レポートを作成](https://github.com/nav-data/docs/issues/new?template=bug_report.md)
- 📧 **技術サポート**: technical@nav-data.org

**💬 一般的な質問 (1週間以内に返信)**:
- 🗣️ **コミュニティディスカッション**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 📧 **一般サポート**: support@nav-data.org

#### **サポートリクエストテンプレート**:
```
件名: [iniBuilds] 問題の簡潔な説明 - 影響レベル

環境情報:
- オペレーティングシステム: Windows 11 / macOS 12.6 / Ubuntu 22.04
- Pythonバージョン: 3.9.7
- ツールバージョン: v2.1.3
- iniBuilds A350バージョン: v1.2.0
- MSFSバージョン: 2024

問題の説明:
[問題の現象を詳細に記述]

再現手順:
1. ステップ1...
2. ステップ2...
3. 問題が発生

期待される結果:
[期待される正しい動作を記述]

実際の結果:
[実際に発生したエラー動作を記述]

試行済みの解決策:
- 解決策Aを試しましたが、結果は...
- 解決策Bを試しましたが、結果は...

添付ファイル:
- system_info.txt
- recent_errors.log
- config_for_support.json
```

---

## 🔄 予防保守

### ✅ 定期保守チェックリスト

#### **毎週のチェック**:
- [ ] ログファイルを確認し、潜在的な問題を特定する
- [ ] 一時ファイルとキャッシュをクリーンアップする
- [ ] A350データが正常にロードされていることを検証する
- [ ] ディスク使用状況を確認する

```bash
# 毎週のチェックを自動化
python weekly_maintenance.py --clean-temp --check-logs --verify-data --disk-usage
```

#### **毎月のチェック**:
- [ ] AIRACデータを更新する
- [ ] 重要な設定とデータをバックアップする
- [ ] ツールバージョンの更新を確認する
- [ ] 性能ベンチマークテスト

```bash
# 毎月の保守を自動化
python monthly_maintenance.py --update-airac --backup-data --check-updates --benchmark
```

#### **メジャーアップデート前**:
- [ ] 完全なデータバックアップ
- [ ] テスト環境での検証
- [ ] バージョン互換性チェック
- [ ] ロールバック計画の準備

### 📊 監視とアラート

#### **自動監視の設定**:
```bash
# 1. 監視スクリプトの作成
python create_monitor.py --check-interval=1h --alert-email=admin@your-domain.com

# 2. システムサービスの設定 (Linux)
sudo systemctl enable nav-data-monitor
sudo systemctl start nav-data-monitor

# 3. タスクスケジューラのセットアップ (Windows)
schtasks /create /tn "Nav-Data Monitor" /tr "python monitor.py" /sc hourly
```

覚えておいてください：能動的な保守と監視は、ほとんどの問題の発生を防ぎ、事後的な修復よりもはるかに効率的です！

---

**最終更新**: 2024年1月15日  
**ドキュメントバージョン**: v2.1  
**適用ツールバージョン**: v2.1.0+