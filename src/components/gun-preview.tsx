export function GunPreview({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 250" role="img" aria-label="Weapon preview silhouette">
      <path
        className="gun-shadow"
        d="M41 82h330l24-22h104l11 17 91 8v30l-108 8-28 27h-80l-38 25-96-2-19-39H91l-29 31H23l18-44z"
      />
      <path
        className="gun-body"
        d="M34 71h341l25-23h105l12 17 96 9v31l-113 8-31 30h-91l-35 24-84-3-20-41H99l-29 31H32l16-43z"
      />
      <path className="gun-detail" d="M133 81h232v22H133zm283-18h79v36h-79zM260 122h82l-22 32h-45z" />
      <path className="gun-stock" d="M50 81 10 43h84l43 29v41H48z" />
      <path className="gun-grip" d="m348 141 47 1-23 72h-55z" />
      <path className="gun-accent" d="M145 87h204v8H145zm281-17h61v8h-61zM532 82h69v12h-69z" />
    </svg>
  );
}