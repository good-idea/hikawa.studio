// Next.js get confused with the params and sometimes needs a little
// help!

export const getParam = (param?: string | string[]): string | undefined => {
  if (!param) return undefined
  if (typeof param === 'string') return param
  const last = param[param.length - 1]
  return last.replace('.json', '')
}
