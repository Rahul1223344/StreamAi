const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms))

export const fetchMovieOverview = async (
  query: string,
  retryCount = 0
): Promise<string> => {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a detailed cinematic movie story (200+ words).

Movie: ${query}`,
                },
              ],
            },
          ],
        }),
      }
    )

    /* ---------- HANDLE 429 / 503 ---------- */
    if ((response.status === 429 || response.status === 503) && retryCount < 2) {
      console.warn(`Retrying AI... (${retryCount + 1})`)
      await delay(1000 * (retryCount + 1)) // exponential delay
      return fetchMovieOverview(query, retryCount + 1)
    }

    if (!response.ok) {
      throw new Error(`AI failed: ${response.status}`)
    }

    const data = await response.json()

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    if (!text) throw new Error('Empty AI response')

    return text.trim()
  } catch (error) {
    console.error('AI error:', error)

    /* 🔥 FINAL FALLBACK */
    return `Story details are currently unavailable due to high demand. 
However, this movie offers a compelling narrative and engaging experience worth exploring.`
  }
}