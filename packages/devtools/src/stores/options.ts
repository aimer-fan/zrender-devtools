export interface DevtoolsOptions {
  // Options for Mask
  mask: { pointSize: number };
}

export let options: DevtoolsOptions

export function setOptions (opt?: DevtoolsOptions) {
  const defaultOptions: DevtoolsOptions = { mask: { pointSize: 2 } }
  options = Object.assign({}, defaultOptions, opt)
}
