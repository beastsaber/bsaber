class AudioPlayer {
  audioElement: HTMLAudioElement = document.createElement('audio')
  playingId: string | null = null

  play(url: string, id?: string) {
    this.audioElement.src = url
    this.audioElement.play()
    this.playingId = id || null
  }

  pause() {
    this.audioElement.pause()
    this.playingId = null
  }
}

// Basically a singleton; this is done to prevent multiple audio tracks to run
export const audioPlayer = new AudioPlayer()
