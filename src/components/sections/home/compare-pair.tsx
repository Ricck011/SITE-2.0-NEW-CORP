interface CompareImage {
  src: string;
  alt: string;
  tag: "antes" | "depois";
}

interface ComparePairProps {
  label: string;
  images: CompareImage[];
}

// Par antes/depois lado a lado, com legenda por cima de cada imagem.
const ComparePair = ({ label, images }: ComparePairProps) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-3">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        {images.map((image) => (
          <figure key={image.tag} className="relative rounded-xl overflow-hidden border border-border bg-card">
            <span
              className={
                "absolute top-2 left-2 z-10 rounded-full px-2.5 py-1 text-xs font-medium " +
                (image.tag === "depois" ? "bg-primary text-primary-foreground" : "bg-background/80 text-muted-foreground")
              }
            >
              {image.tag}
            </span>
            <img src={image.src} alt={image.alt} className="w-full h-auto" loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
};

export default ComparePair;
