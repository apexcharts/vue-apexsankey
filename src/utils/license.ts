import type { ApexSankeyConstructor } from '../types'

/**
 * sets the license key for ApexSankey
 * call this once at app initialization before rendering any charts
 * 
 * @param key - the license key string
 * 
 * @example
 * ```ts
 * import { setApexSankeyLicense } from 'vue-apexsankey'
 * 
 * // call at app initialization
 * setApexSankeyLicense('your-license-key-here')
 * ```
 */
export function setApexSankeyLicense(key: string): void {
  if (typeof window === 'undefined') {
    return
  }

  const ApexSankey = (window as unknown as { ApexSankey?: ApexSankeyConstructor }).ApexSankey

  if (ApexSankey && typeof ApexSankey.setLicense === 'function') {
    ApexSankey.setLicense(key)
  } else {
    console.warn(
      '[vue-apexsankey] ApexSankey not found. Make sure apexsankey is loaded before calling setApexSankeyLicense.'
    )
  }
}
