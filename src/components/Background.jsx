// Full-bleed artwork. The previous image stays underneath while the next fades in.
export default function Background({ layers }) {
  const current = layers.length - 1
  return (
    <div className="bg">
      <div className="bg__fallback" />
      {layers.map((art, i) => (
        <img
          key={art.id}
          className={`bg__img ${i === current ? 'bg__img--current' : ''}`}
          src={art.image}
          alt={i === current ? art.alt : ''}
          style={art.placeholder ? { backgroundImage: `url(${art.placeholder})` } : undefined}
        />
      ))}
      <div className="bg__scrim" />
    </div>
  )
}
