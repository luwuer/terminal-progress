import { progress } from '../lib/index.js';

let num = 0,
  total = 200;
function renderProgress(name) {
  if (num <= total) {
    progress({ name: name, current: num, total: total });

    num++;
    setTimeout(function () {
      renderProgress(name);
    }, 10);
  }
}

renderProgress('Process');
// renderProgress('222')
