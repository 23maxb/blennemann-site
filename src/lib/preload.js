// Resolve once an image is downloaded (and decoded, if that finishes quickly).
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const decoded = img.decode ? img.decode().catch(() => {}) : Promise.resolve()
      const timeout = new Promise((r) => setTimeout(r, 400))
      Promise.race([decoded, timeout]).then(() => resolve(src))
    }
    img.onerror = () => reject(new Error(`Failed to load ${src}`))
    img.src = src
  })
}
