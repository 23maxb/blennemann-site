import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchRandomArtwork } from '../lib/artic.js'
import { preloadImage } from '../lib/preload.js'

// status: 'loading' | 'ready' | 'error'
// layers: the previous and current artwork, so the background can crossfade.
export function useArtwork() {
  const [layers, setLayers] = useState([])
  const [status, setStatus] = useState('loading')
  const controller = useRef(null)

  const fetchNext = useCallback(async () => {
    controller.current?.abort()
    const ctrl = new AbortController()
    controller.current = ctrl
    try {
      const ratio = window.innerWidth / window.innerHeight
      const art = await fetchRandomArtwork({ signal: ctrl.signal, viewportRatio: ratio })
      await preloadImage(art.image)
      if (ctrl.signal.aborted) return
      setLayers((prev) => [...prev.filter((a) => a.id !== art.id).slice(-1), art])
      setStatus('ready')
    } catch (err) {
      if (ctrl.signal.aborted) return
      console.warn('Artwork unavailable:', err)
      setStatus('error')
    }
  }, [])

  const shuffle = useCallback(() => {
    setStatus('loading')
    fetchNext()
  }, [fetchNext])

  useEffect(() => {
    fetchNext()
    return () => controller.current?.abort()
  }, [fetchNext])

  return { artwork: layers.at(-1) ?? null, layers, status, shuffle }
}
