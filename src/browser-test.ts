type Option = {
  html: string;
}

type Result = {
  description: string;
  result: boolean;
}

type Test = {
  description: string;
  callback: (window: Window, doc: Document) => Promise<boolean>
}

export class BrowserTest {
  html = '';
  tests: Test[] = []

  constructor({
    html = ''
  }: Option) {
    this.html = html
  }

  test(description: string, callback: (window: Window, doc: Document) => Promise<boolean>) {
    this.tests.push({
      description,
      callback,
    })
  }

  run() {
    return new Promise<Result[]>((resolve) => {
      const blob = new Blob(
        [this.html],
        { type: "text/html" }
      );
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe')
      const body = document.querySelector('body') as HTMLBodyElement
      iframe.src = url
      const iframeCallback = async () => {
        const results = await Promise.all(this.tests.map(async (t) => {
          const result = await t.callback(iframe.contentWindow as Window, iframe.contentDocument as Document)
          const { description } = t
          return {
            description,
            result,
          }
        }))
        iframe.removeEventListener('load', iframeCallback)
        URL.revokeObjectURL(url)
        iframe.remove()
        resolve(results)
      }
      iframe.addEventListener('load', iframeCallback)
      body.appendChild(iframe)
    })
  }
}
