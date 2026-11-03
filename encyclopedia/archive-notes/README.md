# 归档说明

以后阶段性旧版本、旧截图、旧数据快照可按版本号建子目录，例如：

```text
archive-notes/v2.9.31-20261103-index-collapse-bloom/
  ├─ notes.md
  ├─ code-summary.md
  └─ screenshots/
```

当前代码级回退快照优先放在 `../app/versions/`；本目录用于跨版本总结、根目录临时证据截图和历史索引。

## 图片覆盖核对

- `image-coverage.txt` 记录源目录与新目录按 SHA256 去重后的图片覆盖结果。
- `root-evidence-screenshots/` 保存从旧工作区根目录补存的临时证据图。
- 2026-11-03 结果：源目录 162 个图片文件，按内容去重后未覆盖到新目录的唯一图片为 0；新目录按自身结构重新归档，存在重复合并，因此文件总数不直接等于源目录文件数。

