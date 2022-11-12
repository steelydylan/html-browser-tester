import { BrowserTester } from "./browser-test";

const html = `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello</title>
    <style>
      h2 {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Title1</h1>
    <h2>Title2</h2>
  </body>
  </html>
`

const main = async () => {
  const browserTest = new BrowserTester({ html, width: 980, height: 980 })

  browserTest.test('h1,h2 textContent should have right textContent', async (_, doc) => {
    const h1 = doc.querySelector('h1')
    const h2 = doc.querySelector('h2')
    browserTest.expect(h1?.textContent).toBe('Title1')
    browserTest.expect(h2?.textContent).toBe('Title2')
  })

  browserTest.test('title should have right textContent', async (_, doc) => {
    const title = doc.querySelector('title')
    browserTest.expect(title?.textContent).toBe('Hello')
  })

  browserTest.test('h2 should have red text', async (window, doc) => {
    const h2 = doc.querySelector('h2') as HTMLHeadingElement
    browserTest.expect(window.getComputedStyle(h2).color).toBe('rgb(255, 0, 0)')
  })

  // browserTest.test('can insert text to h5', async (window, doc) => {
  //   const h5 = doc.querySelector('h5') as HTMLHeadingElement
  //   h5.textContent = 'aaaa'
  // })

  const results = await browserTest.run()

  console.log(results)
}

main()
