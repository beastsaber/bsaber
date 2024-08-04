// If you make a request to BeatSaver, you should use this client.
// It will ensure that you are not rate limited and provide more clear error messages if something went wrong.
// Import the concrete instance of this client as it wild hold the information on made requests.

// This will be used in the end to track the time of the 10 last calls to the BeatSaver API
class FixedSizeQueue<T> {
  private queue: T[] = []

  constructor(private _capacity: number) {}

  add(item: T): void {
    if (this.queue.length >= this._capacity) {
      this.queue.shift()
    }
    this.queue.push(item)
  }

  get last(): T | null {
    return this.queue[this.queue.length - 1] ?? null
  }

  get size(): number {
    return this.queue.length
  }

  get isAtCapacity(): boolean {
    return this.queue.length === this._capacity
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class BeatSaverClient {
  constructor(
    public baseUrl: string,
    // Not the best design - should be passed with a shared reference - not cloned
    private lastRelevantRequests: FixedSizeQueue<number>,
    // Here to pass the fetch fucntion from the load parameters
    private underlyingFetchFunction: typeof fetch = fetch,
  ) {}

  // Assumed rate limit depends on fixed queue size. If it's n-sized it will implicitly assume that the rate limit is n requests per second.
  fetch(path: string): ReturnType<typeof fetch> {
    return new Promise(async (resolve, reject) => {
      const now = Date.now()
      // If we're not at capacity, we can make the request immediately
      if (this.lastRelevantRequests.isAtCapacity) {
        // If we're at capacity, we might need to wait before making the request
        const lastRequestTimestamp = this.lastRelevantRequests.last
        if (lastRequestTimestamp) {
          const timeSinceLastRequest = now - lastRequestTimestamp
          const timeToWait = 1000 - timeSinceLastRequest
          if (timeToWait > 0) {
            await sleep(timeToWait)
          }
        }
      }

      this.lastRelevantRequests.add(now)
      this.unrateLimitedFetch(`${this.baseUrl}${path}`).then(resolve).catch(reject)
    })
  }

  private async unrateLimitedFetch(url: string): Promise<any> {
    return this.underlyingFetchFunction(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${url}. Status: ${
              response.status
            }. Response Body: ${await response.text()}`,
          )
        }
        return response
      })
      .catch((e) => {
        console.error(`Failed to fetch ${url}`, e)
        throw e
      })
  }
}

// Needed to hold the shared queue and make fetch-function injectable
class BeatSaverClientFactory {
  private lastRelevantRequests: FixedSizeQueue<number>

  constructor(public baseUrl: string, rateLimit: number) {
    this.lastRelevantRequests = new FixedSizeQueue(rateLimit)
  }

  create(underlyingFetchFunction: typeof fetch = fetch): BeatSaverClient {
    return new BeatSaverClient(this.baseUrl, this.lastRelevantRequests, underlyingFetchFunction)
  }
}

export const beatSaverClientFactory = new BeatSaverClientFactory(
  import.meta.env.VITE_BEATSAVER_API_BASE || 'https://api.beatsaver.com',
  10,
)
