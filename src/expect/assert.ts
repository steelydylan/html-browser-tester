export const assert = (expected: unknown) => ({
  toBe: (resut: unknown) => {
    return expected === resut
  },
  toBeTruthy: (result: unknown) => {
    return result === true
  },
  toBeFalsy: (result: unknown) => {
    return result === false
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
  toContain: (result: unknown) => {
    if (Array.isArray(expected)) {
      expected.some(item => item === result)
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