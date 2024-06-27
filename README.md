### Install
```bash
pnpm i @luwuer/terminal-progress
```

### Usage
```ts
import { progress } from '../src/index.ts'

let num = 0,
  total = 200
function renderProgress(name) {
  if (num <= total) {
    progress({ name: name, current: num, total: total })

    num++
    setTimeout(function () {
      renderProgress(name)
    }, 10)
  }
}

// ⠼ Process: 174/200 | 87% [============================================>      ]
// ✔ Process: 200/200 | 100% [==================================================]
renderProgress('Process')
```