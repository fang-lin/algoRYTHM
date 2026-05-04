# ADR-001: Migrate from AWS (Terraform) + Webpack 4 to Vercel + Vite

- **Status:** accepted
- **Created:** 2026-05-04

## Context

项目当前使用 Webpack 4.46.0 构建，通过 Terraform 部署到 AWS S3 + CloudFront + Route53。存在以下问题：

1. Webpack 4 已停止维护，构建需要 `--openssl-legacy-provider` hack
2. Terraform + AWS 部署链路复杂，没有 PR Preview 能力
3. Node 18 / npm 9 版本陈旧
4. 所有依赖混在 `dependencies` 中，未区分 `devDependencies`
5. semantic-release 在 build 之前执行，部署失败也会发版
6. React 17 + react-router v5 版本落后

## Options Considered

### Option A: 仅升级 Webpack 5 + 保留 AWS
- Pros: 改动最小
- Cons: 无 PR Preview，Terraform 维护成本高，DX 提升有限

### Option B: 迁移到 Vercel + Vite（采纳）
- Pros: 极快开发体验，PR Preview 自动部署，零运维，Vercel CLI 集成 GitHub Actions，与 function-plotter 项目对齐
- Cons: 需要全面升级依赖栈

## Decision

迁移到 Vercel + Vite，同时升级核心依赖：

| Component | Before | After |
|-----------|--------|-------|
| Build tool | Webpack 4.46.0 | Vite 6 |
| Runtime | React 17 + react-router 5 | React 18 + react-router 6 |
| TypeScript | 4.5.4 | 5.5+ |
| Node | 18.17.1 | 22 |
| Deploy | AWS S3/CloudFront (Terraform) | Vercel |
| CI/CD | GitHub Actions → Terraform | GitHub Actions → Vercel CLI |
| Release | semantic-release 22 (before build) | semantic-release 25 (after deploy) |

## Migration Steps

1. Upgrade React 17 → 18（`createRoot` API）
2. Upgrade react-router-dom 5 → 6（`Routes`/`useParams`/`useNavigate`）
3. Migrate Webpack → Vite（`vite.config.ts`、`index.html`、SVG/font handling）
4. Update package.json（deps split、engines、scripts）
5. Update ESLint/commitlint config for ESM
6. Rewrite GitHub Actions pipeline for Vercel CLI deploy
7. Remove Terraform infrastructure files
8. npm install and verify build

## Consequences

- 删除 `terraform/` 目录及 AWS 相关配置
- 删除 `webpack.config.js` 及 Webpack loader 依赖
- PR 自动获得 Preview 部署
- semantic-release 在部署成功后才执行，避免空发版
- 开发启动从秒级降到毫秒级
- 与 function-plotter 项目工程体系对齐
