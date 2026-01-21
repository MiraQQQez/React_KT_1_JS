type ClientConfig = Omit<RequestInit, 'body'> & {
  // Тело запроса, которое будет автоматически превращено в JSON
  body?: unknown
}

export interface Client {
  <T = unknown>(endpoint: string, config?: ClientConfig): Promise<T>
  get<T = unknown>(endpoint: string, config?: RequestInit): Promise<T>
  post<T = unknown>(endpoint: string, body: unknown, config?: RequestInit): Promise<T>
}

const API_BASE_URL = '/fakeServer'

function buildUrl(endpoint: string): string {
  // Если передали абсолютный URL или уже полный путь к fakeServer — не трогаем
  if (/^https?:\/\//i.test(endpoint)) return endpoint
  if (endpoint.startsWith(API_BASE_URL)) return endpoint

  // Иначе склеиваем с базовым префиксом
  return endpoint.startsWith('/') ? `${API_BASE_URL}${endpoint}` : `${API_BASE_URL}/${endpoint}`
}

export const client: Client = (async function client<T = unknown>(
  endpoint: string,
  { body, ...customConfig }: ClientConfig = {},
): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...(customConfig.headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  }

  let data: unknown

  try {
    const response = await fetch(buildUrl(endpoint), config)

    const text = await response.text()
    data = text ? (JSON.parse(text) as unknown) : null

    if (response.ok) {
      return data as T
    }

    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err)
  }
}) as Client

client.get = function get<T = unknown>(endpoint: string, config: RequestInit = {}) {
  return client<T>(endpoint, { ...config, method: 'GET' })
}

client.post = function post<T = unknown>(endpoint: string, body: unknown, config: RequestInit = {}) {
  return client<T>(endpoint, { ...config, body, method: 'POST' })
}
