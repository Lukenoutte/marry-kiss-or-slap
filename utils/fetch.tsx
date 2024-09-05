class FetchWrapper {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>({
    endpoint,
    options = {},
    query,
  }: RequestFunctionParams): Promise<T> {
    const url = this.constructURL(endpoint, query);
    const response = await this.fetchData(url, options);

    return this.handleResponse<T>(response);
  }

  private constructURL(
    endpoint: string,
    query?: Record<string, string | number | boolean>,
  ): string {
    const url = new URL(endpoint, this.baseURL);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private async fetchData(
    url: string,
    options: RequestOptions,
  ): Promise<Response> {
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  }
}

type RequestFunctionParams = {
  endpoint: string;
  options?: RequestOptions;
  query?: Record<string, string | number | boolean>;
};

type RequestOptions = RequestInit & {
  headers?: Record<string, string>;
};

export default FetchWrapper;
