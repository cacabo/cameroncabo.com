const prefix = 'Invariant failed'

export type InvariantErrorMessage = string | Error | (() => string | Error)

/**
 * `invariant` is used to [assert](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) that the `condition` is [truthy](https://github.com/getify/You-Dont-Know-JS/blob/bdbe570600d4e1107d0b131787903ca1c9ec8140/up%20%26%20going/ch2.md#truthy--falsy).
 *
 * Adapted from https://github.com/alexreardon/tiny-invariant/blob/master/src/tiny-invariant.ts
 *
 * @example
 *
 * ```ts
 * const value: Person | null = { name: 'Alex' };
 * invariant(value, 'Expected value to be a person');
 * // type of `value`` has been narrowed to `Person`
 * ```
 */
export function invariant(
  condition: unknown,
  /**
   * Can provide a string, or a function that returns a string for cases where the message takes a
   * fair amount of effort to compute
   */
  message?: InvariantErrorMessage,
): asserts condition {
  if (condition) {
    return
  }

  const provided: Error | string | undefined = typeof message === 'function' ? message() : message

  if (provided instanceof Error) {
    throw provided
  }

  throw new Error(provided ?? prefix)
}
