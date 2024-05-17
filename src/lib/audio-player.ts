class AudioPlayer {
  audioElement: HTMLAudioElement = document.createElement('audio')

  play(url: string) {
    this.audioElement.src = url
    this.audioElement.play()
  }

  pause() {
    this.audioElement.pause()
  }
}

// Basically a singleton; this is done to prevent multiple audio tracks to run
export const audioPlayer = new AudioPlayer()
