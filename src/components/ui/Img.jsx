// Expects `src` without extension; serves <name>-sm.webp and <name>.webp via srcset.
export default function Img({ src, alt, sizes = '(min-width: 1024px) 50vw, 100vw', className = '', priority, width, height }) {
  return (
    <img
      src={`${src}.webp`}
      srcSet={`${src}-sm.webp 640w, ${src}.webp 1280w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
    />
  )
}
