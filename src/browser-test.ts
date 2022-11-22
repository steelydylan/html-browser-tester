import { Expect } from "./expect";
import { Spy } from "./spy";

type Option = {
  html: string;
  width?: number;
  height?: number;
}

type Result = {
  description: string;
  result: boolean;
}

type Test = {
  description: string;
  callback: (window: Window, doc: Document) => Promise<void>
}

export class BrowserTester {
  private html = '';
  private width?: number;
  private height?: number;
  private iframe!: HTMLIFrameElement;
  private tests: Test[] = []
  private expects = new Expect()
  private beforeEachCallbacks: ((window: Window, doc: Document) => Promise<void>)[] = []
  private afterEachCallbacks: ((window: Window, doc: Document) => Promise<void>)[] = []

  constructor({
    html = '',
    width,
    height,
  }: Option) {
    this.html = html
    if (width) {
      this.width = width
    }
    if (height) {
      this.height = height
    }
  }

  spyOn<T extends string>(obj: Record<T, Function>, key: T) {
    return new Spy(obj, key)
  }

  setBrowserSize(width: number, height: number) {
    if (width) {
      this.iframe.width = `${width}px`
    }
    if (height) {
      this.iframe.height = `${height}px`
    }
  }

  beforeEach(callback: (window: Window, doc: Document) => Promise<void>) {
    this.beforeEachCallbacks.push(callback)
  }

  afterEach(callback: (window: Window, doc: Document) => Promise<void>) {
    this.afterEachCallbacks.push(callback)
  }

  test(description: string, callback: (window: Window, doc: Document) => Promise<void>) {
    this.tests.push({
      description,
      callback,
    })
  }

  it(description: string, callback: (window: Window, doc: Document) => Promise<void>) {
    this.tests.push({
      description,
      callback,
    })
  }

  expect(...args: unknown[]) {
    // @ts-ignore
    return this.expects.expect(...args)
  }

  clearTests() {
    this.tests = []
  }

  evaluate(code: string) {
    const func = new Function(
      'test', 
      'it', 
      'expect', 
      'beforeEach', 
      'afterEach', 
      'setBrowserSize',
      'spyOn',
      code
    )
    func(
      this.test.bind(this), 
      this.it.bind(this),
      this.expect.bind(this), 
      this.beforeEach.bind(this), 
      this.afterEach.bind(this), 
      this.setBrowserSize.bind(this),
      this.spyOn.bind(this),
    )
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
      this.iframe = iframe
      iframe.style.opacity = '0'
      iframe.style.pointerEvents = 'none'
      iframe.src = url
      if (this.width && this.height) {
        iframe.width = `${this.width}px`
        iframe.height = `${this.height}px`
      }
      const iframeCallback = async () => {
        const results: Result[] = []
        for (const t of this.tests) {
          for (const b of this.beforeEachCallbacks) {
            await b(iframe.contentWindow as Window, iframe.contentDocument as Document)
          }
          const { description } = t
          try {
            await t.callback(iframe.contentWindow as Window, iframe.contentDocument as Document)
            results.push({
              description,
              result: this.expects.isAllPassed()
            })
          } catch (e) {
            results.push({
              description,
              result: false,
            })
          }
          this.expects.clean()
          for (const a of this.afterEachCallbacks) {
            await a(iframe.contentWindow as Window, iframe.contentDocument as Document)
          }
        }
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
