export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init);

  // 如果服务器回复，json中总是有一些数据
  // 如果有网络错误，它会在上一行抛出
  const data = await response.json();

  // res.status 为 2xx 时 response.ok 为真
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // 将剩余的参数（包括供应商特定的参数）传递给父构造函数
    super(message);

    // 为我们的错误被抛出的位置维护正确的堆栈跟踪（仅在 V8 上可用）
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? { message: message };
  }
}
