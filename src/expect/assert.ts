export const assert = (expected: unknown) => ({
  toBe: (resut: unknown) => {
    return expected === resut
  },
  toBeTruthy: (result: unknown) => {
    return !!result
  },
  toBeFalsy: (result: unknown) => {
    return !result
  },
  toBeNull: (result: unknown) => {
    return result === null
  },
  toBeUndefined: (result: unknown) => {
    return result === undefined
  },
  toBeDefined: (result: unknown) => {
    return result !== undefined
  },
  toBeNaN: (result: unknown) => {
    return result === NaN
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
})