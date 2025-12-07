export const typography = {
  hero: {
    mobile: 'text-5xl',
    tablet: 'text-6xl',
    desktop: 'text-7xl'
  },
  h1: {
    mobile: 'text-3xl',
    tablet: 'text-4xl'
  },
  h2: {
    mobile: 'text-2xl',
    tablet: 'text-3xl'
  },
  button: {
    primary: 'text-xl',
    secondary: 'text-lg'
  },
  body: {
    base: 'text-base',
    large: 'text-lg',
    small: 'text-sm'
  }
}

// Responsive utility builder
export const responsive = (mobile: string, tablet?: string, desktop?: string) => {
  let classes = mobile
  if (tablet) classes += ` md:${tablet}`
  if (desktop) classes += ` lg:${desktop}`
  return classes
}
