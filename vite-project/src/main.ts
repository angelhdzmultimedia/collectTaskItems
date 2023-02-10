import { loadUI } from './app'
import { join } from 'node:path'
declare global {
  interface JSON {
    load: (url: string) => Promise<any>
  }
}

JSON.load = async function (url: string) {
  const res = await fetch(url)
  return res.json()
}

async function main() {
  const data = await JSON.load('data.json')
  loadUI(data)
  console.log(globalThis.document.body.children)
}

main()
