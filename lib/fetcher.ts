type FetcherOptions = RequestInit & {
  bodyJson?: unknown;
};

export async function fetcher<TResponse>(
  url: string,
  options?: FetcherOptions
): Promise<TResponse> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: options?.bodyJson ? JSON.stringify(options.bodyJson) : options?.body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Ocurrió un error al procesar la solicitud.");
  }

  return response.json() as Promise<TResponse>;
}