import { collectTaskItems, SelectStageVO } from './app'
import { join } from 'node:path'
declare global {
  interface JSON {
    load: (url: string) => Promise<any>
  }
}

JSON.load = async function (url: string) {
  const { readFileSync } = await import('node:fs')
  const file: string = readFileSync(url).toString()
  return JSON.parse(file)
}

async function main() {
  const data = await JSON.load(join(process.cwd(), 'src/data.json'))
  const stageVO = new SelectStageVO()
  await collectTaskItems(stageVO, data.items, {}, 0)
  console.log(stageVO.items)
}

main()
