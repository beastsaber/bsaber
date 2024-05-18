import { writable, type Writable } from 'svelte/store'

class AudioPlayer {
  audioElement: HTMLAudioElement | null = null
  // Making this a writable so it will update in the UI efficiently
  playingId: Writable<string | null> = writable(null)

  play(url: string, id?: string) {
    if (!this.audioElement) {
      this.audioElement = document.createElement('audio')
    }
    this.audioElement.src = url
    this.audioElement.volume = 0.35
    this.audioElement.play()
    this.audioElement.onended = () => {
      this.playingId.set(null)
    }
    this.playingId.set(id || null)
  }

  pause() {
    this.audioElement?.pause()
    this.playingId.set(null)
  }
}

// Basically a singleton; this is done to prevent multiple audio tracks to run
export const audioPlayer = new AudioPlayer()
