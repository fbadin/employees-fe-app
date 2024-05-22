interface Params {
  body?: {},
  timeout?: number
}

export type ApiResponse<T> = {
  data: T | undefined,
  error_message: string | undefined
}

class Api {
  async submit<T>(url: string, params: Params): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetch(url, params);

      if (!response.ok) {
        if (response.status === 500) {
          return {
            data: undefined,
            error_message: response.statusText
          }
        }

        try {
          const errorResponse = await response.json();
          return {
            data: undefined,
            error_message: errorResponse.error_message
          };
        } catch (e) {
          return {
            data: undefined,
            error_message: String(e)
          };
        }
      }

      const data: T = await response.json();

      return {
        data,
        error_message: undefined
      };
    } catch (e) {
      return {
        data: undefined,
        error_message: String(e)
      };
    }
  }

  private fetch = async (url: string, params?: Params): Promise<Response> => {
    const userToken = localStorage.getItem('token');

    const options = {
      ...params,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (params?.body) {
      options['body'] = JSON.stringify(params.body);
    }

    if (params?.timeout) {
      options['timeout'] = params.timeout;
    }

    try {
      return await fetch(url, options as RequestInit);
    } catch (error) {
      throw error;
    }
  }
}

class StaticApi {

  private static api: Api | undefined;

  static get<T>(url: string, params?: Params): Promise<ApiResponse<T>> {
    const api = StaticApi.initializeApi();

    const getParams = {
      ...params,
      method: 'GET'
    };

    return api.submit<T>(url, getParams);
  }

  static post<T>(url: string, params: Params): Promise<ApiResponse<T>> {
    const api = StaticApi.initializeApi();

    const postParams = {
      ...params,
      method: 'POST'
    };

    return api.submit<T>(url, postParams);
  }

  static put<T>(url: string, params: Params): Promise<ApiResponse<T>> {
    const api = StaticApi.initializeApi();

    const postParams = {
      ...params,
      method: 'PUT'
    };

    return api.submit<T>(url, postParams);
  }

  static delete<T>(url: string, params: Params): Promise<ApiResponse<T>> {
    const api = StaticApi.initializeApi();

    const deleteParams = {
      ...params,
      method: 'DELETE'
    };

    return api.submit<T>(url, deleteParams);
  }

  private static initializeApi(): Api {
    if (!StaticApi.api) {
      StaticApi.api = new Api()
    }
    return StaticApi.api;
  }
}

export {
  StaticApi as api
}

