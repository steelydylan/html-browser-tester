import { BrowserTest } from "./browser-test";

const html = `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ストックホルム観光</title>
  </head>
  <body>
    <h1>ストックホルム観光</h1>
    <h2>ストックホルムの治安</h2>
    <h2>ストックホルム観光名所</h2>
    <h3>写真</h3>
    <h2>かかった費用</h2>
  </body>
  </html>
`

const main = async () => {
  const browserTest = new BrowserTest({ html })

  browserTest.test('h1の内容が正しい', async (_, doc) => {
    const h1 = doc.querySelector('h1')
    return h1?.textContent === 'ストックホルム観光'
  })

  browserTest.test('h2の内容が正しい', async (_, doc) => {
    const h1 = doc.querySelector('h2')
    return h1?.textContent === 'ストックホルムの治安'
  })

  const results = await browserTest.run()

  console.log(results)
}

main()
