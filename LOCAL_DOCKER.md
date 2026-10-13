# TaskNexus 本地 Docker 使用说明

本机通过 Docker Desktop 运行 TaskNexus。主应用及数据库由项目根目录的 Docker Compose 管理；Airbyte 运行在 Docker Desktop 中的独立 kind 容器里。访问应用时保持 Docker Desktop 运行。

本文记录已完成初始化的本地环境。文中 `.deploy-tools` 属于本机辅助文件，未随 GitHub 仓库上传；新电脑需要另行准备 Airbyte 和文档解析服务。

## 访问入口

| 服务 | 地址 |
| --- | --- |
| TaskNexus | http://localhost:3000 |
| Airbyte | http://localhost:8006 |
| Python 后台接口文档 | http://localhost:8080/docs |
| Qdrant 管理界面 | http://localhost:6333/dashboard |
| RabbitMQ 管理界面 | http://localhost:15672 |

首次使用 TaskNexus 时注册自己的账号。使用云端大模型时，在应用中配置对应供应商的 API Key。当前采用本地文件存储、MongoDB、Redis、RabbitMQ 和 Qdrant；邮件、OAuth、支付及 Google Cloud Functions 需要相应外部凭据。

Airbyte 首次打开可能显示偏好设置页面，可以填写自己的信息。TaskNexus 使用的 Airbyte 工作区、RabbitMQ 目标和同步回调由应用初始化。

## 启动和停止

在 PowerShell 中进入项目根目录，然后启动已有容器和镜像：

```powershell
Set-Location '<你的 TaskNexus 项目路径>'
docker start airbyte-abctl-control-plane
docker compose up -d --no-build
docker compose ps
```

Web 启动命令会等待 Airbyte 健康接口，再初始化应用。同步服务遇到启动或轮询错误会退出，由 Docker 的重启策略重试。

停止本项目：

```powershell
docker compose stop
docker stop airbyte-abctl-control-plane
```

检查 Airbyte 内部服务：

```powershell
.\.deploy-tools\airbyte\airbyte-local.ps1 -Action Status
```

## 配置和数据

根目录 `.env` 保存本机部署参数及自动生成的认证密钥。RabbitMQ 管理账号也在这个文件里；保留其中的 `RABBITMQ_HOSTNAME`，让重建后的容器继续读取现有节点数据。

MongoDB、Redis、RabbitMQ、Qdrant 和上传文件分别保存在 `tasknexus` 前缀的 Docker 命名卷中。Airbyte 数据保存在 `%USERPROFILE%\.airbyte\abctl\data`，集群配置保存在 `%USERPROFILE%\.airbyte\abctl\abctl.kubeconfig`。

文档解析服务使用 `tasknexus/unstructured:cpu`。其构建基于官方 Unstructured API 0.1.15 源码，使用 CPU 版 PyTorch；构建文件位于 `.deploy-tools/unstructured/upstream/Dockerfile.cpu`。Airbyte 的固定版本安装文件、操作脚本和详细说明位于 `.deploy-tools/airbyte`。保留 `.env`、数据卷及 `.deploy-tools`，以便继续运行和维护这次本机部署。
