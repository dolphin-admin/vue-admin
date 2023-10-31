// Reference: https://tailwindcss.com/docs/responsive-design#using-custom-breakpoints
export const useMobile = () =>
  useMediaQuery('only screen and (max-width: 639.999999px)')
export const useSM = () => useMediaQuery('(min-width: 640px)')
export const useMD = () => useMediaQuery('(min-width: 768px)')
export const useLG = () => useMediaQuery('(min-width: 1024px)')
export const useXL = () => useMediaQuery('(min-width: 1280px)')
export const use2XL = () => useMediaQuery('(min-width: 1536px)')
