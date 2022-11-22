import { Spy } from "../spy"

export const assert = (expected: unknown) => ({
  toBe: (resut: unknown) => {
    return expected === resut
  },
  toBeTruthy: () => {
    return !!expected
  },
  toBeFalsy: () => {
    return !expected
  },
  toBeNull: () => {
    return expected === null
  },
  toBeUndefined: () => {
    return expected === undefined
  },
  toBeDefined: () => {
    return expected !== undefined
  },
  toBeNaN: () => {
    return expected === NaN
  },
  toMatch: (result: unknown) => {
    if (typeof expected === 'string' && typeof result === 'string') {
      if (expected.indexOf(result) !== -1) {
        return true
      }
    }
    return false
  },
  toContain: (result: unknown) => {
    if (Array.isArray(expected)) {
      return expected.includes(result)
    }
    return false
  },
  toBeLessThan: (result: unknown) => {
    if (typeof expected === 'number' && typeof result === 'number') {
      return expected < result
    }
    return false
  },
  toBeGreaterThan: (result: unknown) => {
    if (typeof expected === 'number' && typeof result === 'number') {
      return expected > result
    }
    return false
  },
  toBeLessThanOrEqual: (result: unknown) => {
    if (typeof expected === 'number' && typeof result === 'number') {
      return expected <= result
    }
    return false
  },
  toBeGreaterThanOrEqual: (result: unknown) => {
    if (typeof expected === 'number' && typeof result === 'number') {
      return expected >= result
    }
    return false
  },
  toBeInstanceOf: (result: unknown) => {
    if (typeof result !== 'function') {
      return false
    }
    if (expected instanceof result) {
      return true
    }
    return false
  },
  toHaveBeenCalled: () => {
    if (!(expected instanceof Spy)) {
      return false
    }
    if (expected.called) {
      return true
    }
    return false
  },
  toHaveBeenCalledWith: (...args: any[]) => {
    if (!(expected instanceof Spy)) {
      return false
    }
    if (!expected.calledArgs.length) {
      return false
    }
    return expected.calledArgs.some(arg => {
      return arg.every((a, i) => a === args[i])
    })
  }
})