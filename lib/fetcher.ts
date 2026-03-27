type FetcherOptions = RequestInit & {
  bodyJson?: unknown;
};

type ErrorPayload = {
  success?: boolean;
  message?: string;
};

export async function fetcher<T>(
  url: string,
  options?: FetcherOptions,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: options?.bodyJson
      ? JSON.stringify(options.bodyJson)
      : options?.body,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJsonResponse = contentType.includes("application/json");

  if (!response.ok) {
    if (isJsonResponse) {
      const errorPayload = (await response.json()) as ErrorPayload;

      throw new Error(
        errorPayload.message || "Ocurrió un error al procesar la solicitud.",
      );
    }

    const errorText = await response.text();

    throw new Error(
      errorText || "Ocurrió un error al procesar la solicitud.",
    );
  }

  if (!isJsonResponse) {
    throw new Error("El backend no devolvió una respuesta JSON válida.");
  }

  return (await response.json()) as T;
}