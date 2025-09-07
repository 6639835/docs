# 🔄 Instructions d'utilisation

Ce guide vous guidera à travers le processus complet d'utilisation de l'outil Nav-data, de la conversion des données au déploiement final dans les add-ons d'avion.

## 🚀 Démarrage rapide

### ⚡ Conversion en un clic

Si vous avez déjà terminé la configuration, vous pouvez exécuter directement le programme principal :

```bash
python XP2INI_NDB_Converter.py
```

Le programme vous guidera automatiquement à travers l'ensemble du processus de conversion.

## 📝 Procédure détaillée

### 🎯 Première étape : Validation de la préparation des données

Avant de commencer la conversion, assurez-vous que tous les fichiers de données nécessaires sont en place :

```bash
# 验证数据文件完整性
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

### 🔧 Deuxième étape : Lancement du programme de conversion

Exécutez le programme de conversion principal et suivez les instructions :

```bash
python XP2INI_NDB_Converter.py
```

### 📂 Troisième étape : Assistant de configuration des chemins

Le programme vous guidera à travers la configuration des chemins :

#### 3.1 Configuration du répertoire de base
```
请输入基础目录路径（包含NAIP, NDBs和XP_Data文件夹）: 
> C:\NavData\Workspace
```

#### 3.2 Détection automatique des chemins
Le programme scannera et affichera automatiquement les fichiers détectés :

```
================= 开始路径配置 =================
✅ NAIP_PATH: C:\NavData\Workspace\NAIP
✅ DB_OUTPUT_PATH: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
✅ FNX_NDB_PATH: C:\NavData\Workspace\NDBs\nd.db3
✅ CIFP_PATH: C:\NavData\Workspace\CIFP
✅ PATH_TO_FIX_DAT: C:\NavData\Workspace\X-Plane\earth_fix.dat
✅ PATH_TO_NAV_DAT: C:\NavData\Workspace\X-Plane\earth_nav.dat
✅ LOOKUP_TXT_PATH: C:\NavData\Workspace\ICAO.txt
```

#### 3.3 Confirmation des chemins
```
是否确认以上路径全部正确？(Y/N): Y
```

### ⚙️ Quatrième étape : Processus de traitement des données

Le programme de conversion traitera les différentes catégories de données dans l'ordre suivant :

#### 4.1 Traitement des données d'aéroport
```
开始处理机场数据...
📍 正在解析机场基础信息
🧭 计算机场磁偏角数据
✅ 机场数据处理完成 (处理了 156 个机场)
```

#### 4.2 Traitement des données de piste
```
开始处理跑道数据...
🛬 正在处理跑道信息
📐 计算跑道方向和坐标
✅ 跑道数据处理完成 (处理了 312 条跑道)
```

#### 4.3 Traitement des aides à la navigation VHF
```
开始处理VHF数据...
📡 正在处理VOR/DME导航台
🔢 计算导航台频率和覆盖范围
✅ VHF数据处理完成 (处理了 89 个导航台)
```

#### 4.4 Système de guidage à l'atterrissage GS
```
开始处理GS数据...
🛬 正在处理ILS着陆系统
📐 计算滑行坡度和位置
✅ GS数据处理完成
```

#### 4.5 Traitement des balises de navigation NDB
```
开始处理NDB数据...
📻 正在处理非定向信标台
🧭 计算NDB磁偏角
✅ NDB数据处理完成 (处理了 45 个NDB)
```

#### 4.6 Traitement des données de points de cheminement
```
开始处理航路点数据...
🗺️ 正在处理航路航路点
✅ 航路点数据处理完成 (处理了 2,453 个点)
```

#### 4.7 Traitement des points de cheminement terminaux
```
开始处理终端点数据...
🏢 正在处理终端区域航路点
✅ 终端点数据处理完成 (处理了 876 个点)
```

#### 4.8 Traitement des procédures de départ SID
```
开始处理离场程序...
🛫 正在处理SID程序
📋 解析程序航路点和限制
✅ 离场程序处理完成 (处理了 234 个程序)
```

#### 4.9 Traitement des procédures d'arrivée STAR
```
开始处理进场程序...
🛬 正在处理STAR程序
📋 解析程序航路点和限制
✅ 进场程序处理完成 (处理了 198 个程序)
```

#### 4.10 Traitement des procédures d'approche IAP
```
开始处理进近程序...
🎯 正在处理进近程序
📋 解析进近航路点和限制
✅ 进近程序处理完成 (处理了 445 个程序)
```

#### 4.11 Traitement des données de routes aériennes
```
开始处理航路数据...
🛣️ 正在处理高低空航路
🔗 建立航路点连接关系
✅ 航路数据处理完成 (处理了 167 条航路)
```

#### 4.12 Optimisation de la base de données
```
🗜️ 正在压缩数据库...
📊 删除临时索引...
✅ 数据库优化完成
```

### ⏱️ Cinquième étape : Traitement terminé

```
=====================================
🎉 数据处理完成，用时 127.3 秒
📄 输出文件：C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
📊 数据库大小：15.6 MB
📈 处理统计：
   - 机场: 156 个
   - 跑道: 312 条
   - VHF导航台: 89 个
   - NDB导航台: 45 个
   - 航路点: 3,329 个
   - SID程序: 234 个
   - STAR程序: 198 个
   - 进近程序: 445 个
   - 航路: 167 条
=====================================
按Enter键退出...
```

## 🚁 Guide de déploiement des données

### 📁 Identification de l'avion cible

Sélectionnez le chemin de déploiement correspondant à l'add-on d'avion que vous utilisez :

#### Série iniBuilds A350
```
[Dossier Communauté MSFS]\inibuilds-aircraft-a350\work\NavigationData\
```

#### Série PMDG 737
```
[Dossier Communauté MSFS]\pmdg-aircraft-737\Config\Navdata\
[Dossier Communauté MSFS]\pmdg-aircraft-738\Config\Navdata\
[Dossier Communauté MSFS]\pmdg-aircraft-739\Config\Navdata\
```

#### Série PMDG 777
```
[Dossier Communauté MSFS]\pmdg-aircraft-77w\Config\Navdata\
[Dossier Communauté MSFS]\pmdg-aircraft-77f\Config\Navdata\
```

### 🔄 Processus de déploiement

#### Étape 1 : Sauvegarde des données existantes

**IMPORTANT** : Toujours créer une sauvegarde avant de déployer de nouvelles données !

```powershell
# 备份现有导航数据
$targetDir = "C:\...\pmdg-aircraft-77w\Config\Navdata"
$backupDir = "$targetDir" + "_backup_" + (Get-Date -Format "yyyyMMdd")
Copy-Item $targetDir $backupDir -Recurse
Write-Host "备份创建完成: $backupDir"
```

#### Étape 2 : Vider le répertoire cache

Vider le cache des données de navigation de MSFS :

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

#### Étape 3 : Déploiement des nouvelles données

Copiez le fichier de base de données converti vers l'emplacement cible :

```bash
# 复制数据库文件
copy "C:\NavData\Workspace\Output\e_dfd_PMDG.s3db" "[目标导航数据目录]\"
```

#### Étape 4 : Vérification du déploiement

Lancez MSFS et chargez l'avion, vérifiez les éléments suivants :

- [ ] Le FMC démarre normalement et sans erreurs de base de données
- [ ] Possibilité de consulter les informations d'aéroport (codes OACI)
- [ ] Possibilité de planifier un itinéraire (du point de départ au point d'arrivée)
- [ ] Les procédures SID/STAR sont disponibles et complètes
- [ ] Les procédures d'approche sont sélectionnables et les données sont correctes

## 🔧 Conseils d'utilisation avancés

### 📊 Script de traitement par lots

Créez un script de traitement par lots pour automatiser les opérations :

```batch
@echo off
echo ======================================
echo     Nav-data 自动转换脚本
echo ======================================

cd /d "C:\NavData\iniBuilds"

echo 1. 开始数据转换...
python XP2INI_NDB_Converter.py

echo 2. 备份现有数据...
set BACKUP_DIR=C:\NavData\Backup\%date:~0,4%%date:~5,2%%date:~8,2%
mkdir "%BACKUP_DIR%"
xcopy "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData" "%BACKUP_DIR%" /E /I

echo 3. 清空缓存...
del /Q "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\*"

echo 4. 部署新数据...
copy "Output\e_dfd_PMDG.s3db" "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\"

echo 5. 完成！
pause
```

### 🔄 Workflow de mise à jour régulière

Configurez un processus de mise à jour automatique :

```python
#!/usr/bin/env python3
"""自动更新工作流"""

import schedule
import time
import subprocess
from datetime import datetime

def update_navdata():
    """执行导航数据更新"""
    print(f"🔄 开始更新导航数据 - {datetime.now()}")
    
    try:
        # 运行转换程序
        result = subprocess.run(['python', 'XP2INI_NDB_Converter.py'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ 导航数据更新成功！")
            # 这里可以添加自动部署逻辑
        else:
            print("❌ 更新失败：", result.stderr)
            
    except Exception as e:
        print(f"❌ 更新异常：{e}")

# 每28天运行一次（AIRAC周期）
schedule.every(28).days.do(update_navdata)

# 保持脚本运行
print("📅 导航数据自动更新调度器已启动")
while True:
    schedule.run_pending()
    time.sleep(3600)  # 每小时检查一次
```

### 🔍 Validation de la qualité des données

Créez un script de validation pour vérifier la qualité des données de sortie :

```python
#!/usr/bin/env python3
"""数据质量验证脚本"""

import sqlite3
import os

def validate_database(db_path):
    """验证数据库完整性和数据质量"""
    
    if not os.path.exists(db_path):
        print(f"❌ 数据库文件不存在: {db_path}")
        return False
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 检查表结构
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
    
    print("🔍 数据库验证报告")
    print("=" * 40)
    
    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"✅ {table}: {count} 条记录")
        except sqlite3.OperationalError as e:
            print(f"❌ {table}: 表不存在或查询失败")
    
    # 检查数据质量
    print("\n📊 数据质量检查")
    print("=" * 40)
    
    # 检查空坐标
    cursor.execute("""
        SELECT COUNT(*) FROM tbl_airports 
        WHERE airport_latitude IS NULL OR airport_longitude IS NULL
    """)
    null_coords = cursor.fetchone()[0]
    
    if null_coords == 0:
        print("✅ 机场坐标: 无空值")
    else:
        print(f"⚠️ 机场坐标: {null_coords} 个空值")
    
    conn.close()
    return True

if __name__ == "__main__":
    validate_database("Output/e_dfd_PMDG.s3db")
```

## 🚨 Problèmes d'utilisation courants

### Problèmes pendant la conversion

#### Problème : Le programme s'arrête en cours de route
```bash
# 原因：数据文件损坏或路径错误
# 解决：检查所有输入文件的完整性
python -c "
import os
for f in ['NAIP/AD_HP.csv', 'X-Plane/earth_fix.dat']:
    if os.path.exists(f):
        print(f'{f}: {os.path.getsize(f)} bytes')
    else:
        print(f'{f}: 文件不存在')
"
```

#### Problème : Erreur de mémoire insuffisante
```python
# 解决：减少批处理大小
# 在配置中设置较小的BATCH_SIZE
BATCH_SIZE = 500  # 减少到500
```

#### Problème : Erreur de verrouillage de la base de données
```bash
# 原因：其他程序正在使用数据库
# 解决：关闭所有相关程序后重新运行
taskkill /f /im "FlightSimulator.exe"
```

### Problèmes de déploiement

#### Problème : Le FMC affiche "DB OUT OF DATE"
```bash
# 原因：
# 1. 数据库文件未正确复制
# 2. MSFS缓存未清空
# 3. AIRAC周期不匹配

# 解决步骤：
# 1. 确认数据库文件存在于正确位置
# 2. 完全删除NavigationData缓存文件夹内容
# 3. 重启MSFS
```

#### Problème : Certains points de cheminement ou procédures sont manquants
```bash
# 原因：CIFP数据不完整
# 解决：
# 1. 重新下载完整的CIFP数据包
# 2. 确认目标机场的程序文件存在
# 3. 检查ICAO区域码是否在支持范围内
```

## 📈 Optimisation des performances

### 🚀 Amélioration de la vitesse de conversion

```python
# 启用多进程处理
MULTIPROCESS_WORKERS = 8  # 根据CPU核心数调整

# 使用SSD存储
# 将工作目录设置在SSD上可显著提升I/O性能

# 增加可用内存
# 关闭不必要的程序，确保至少8GB可用内存
```

### 📊 Surveillance de l'utilisation des ressources

```python
import psutil
import time

def monitor_performance():
    """监控系统资源使用情况"""
    while True:
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        disk = psutil.disk_usage('.').percent
        
        print(f"CPU: {cpu}% | 内存: {memory}% | 磁盘: {disk}%")
        time.sleep(5)

# 在转换过程中运行监控
monitor_performance()
```

---

Félicitations ! Vous maîtrisez désormais le processus complet d'utilisation de l'outil Nav-data.