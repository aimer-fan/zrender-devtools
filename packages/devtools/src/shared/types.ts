export const isObject = (obj: unknown): obj is Record<string, unknown> => obj !== null && typeof obj === 'object'
export const isArray = (arr: unknown): arr is unknown[] => Array.isArray(arr)
export const isString = (str: unknown): str is string => typeof str === 'string'
export const isNumber = (num: unknown): num is number => typeof num === 'number'
export const isBoolean = (b: unknown): b is boolean => typeof b === 'boolean'
