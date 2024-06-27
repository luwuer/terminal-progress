import ora from 'ora'

interface ProgressOptions {
  name: string
  current: number
  total: number
}
const spinnerMap = {}

/**
 * Write and refresh progress in terminal
 * @param options
 */
export function progress(options: ProgressOptions): void {
  const { name, current, total } = options
  
  let spinner = spinnerMap[name]
  if (!spinner) {
    spinner = ora(name).start()
    spinnerMap[name] = spinner
  }

  const progress = current ? Math.floor((current / total) * 100) : 0
  const progressBar =
    '[' + '='.repeat(Math.ceil(progress / 2)) + '>'.repeat(progress === 100 ? 0 : 1) + ' '.repeat(50 - Math.ceil(progress / 2)) + ']'
  const msg = `${name}: ${current}/${total} | ${progress}% ${progressBar}`
  spinner.text = msg

  if (progress === 100) {
    spinner.succeed(msg)
    spinnerMap[name] = null
  }
}
