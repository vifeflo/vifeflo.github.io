const assetPathPrefix = "/assets"

type ProjectImageProps = {
  alt: string
  file: string
  className?: string
}

export default function ProjectImage({
  alt,
  file,
  className = "",
}: ProjectImageProps) {
  return (
    <img
      className={`block h-auto w-full object-cover shadow-[0_5px_7px_rgba(0,0,0,0.1)] ${className}`}
      src={`${assetPathPrefix}/${file}`}
      alt={alt}
    />
  )
}