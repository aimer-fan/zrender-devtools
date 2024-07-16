export interface Options {
  defaultShowPane: boolean;
  // Options for Mask
  mask: { pointSize: number };
}
export type DevtoolsOptions = Partial<Options>
export let options: Options

export function setOptions (opt?: DevtoolsOptions) {
  const defaultOptions: Options = {
    defaultShowPane: true,
    mask: { pointSize: 2 },
  }
  options = Object.assign({}, defaultOptions, opt)
}
