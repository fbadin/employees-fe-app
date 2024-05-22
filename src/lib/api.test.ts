import { api } from './api';

type MyData = {
  data: string
}

describe('api', () => {
  it('GET request', async () => {
    const data = 'this is working!';
    const mockedFetch = jest.fn((url, options) => {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: async () => {
         return data;
        },
      });
    }) as jest.Mock;
    global.fetch = mockedFetch;

    const url = 'https://example.com/api';
    const response = await api.get<MyData>(url);

    expect(mockedFetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(response.data).toBe(data);
  });

  it('GET request when returns not 200', async () => {
    const errorMessage = 'Invalid login. Please, reauthenticate'
    const url = 'https://example.com/api';
    global.fetch = jest.fn().mockImplementation((mockedUrl, options) => {
      return Promise.resolve({
        status: 403,
        ok: false,
        json: async () => ({
         error_message: errorMessage
        }),
      });
    }) as jest.Mock;

    const response = await api.get<MyData>(url);
    expect(response.error_message).toBe(errorMessage);
  });

  it('GET request when there is an internal server error', async () => {
    const url = 'https://example.com/api';
    const errorMessage = 'Internal Server Error';
    global.fetch = jest.fn().mockImplementation((mockedUrl, options) => {
      return Promise.resolve({
        status: 500,
        ok: false,
        statusText: errorMessage,
      });
    }) as jest.Mock;

    const response = await api.get<MyData>(url);
    expect(response.error_message).toBe(errorMessage);
  });

  it('GET request when the server is unreachable', async () => {
    const url = 'https://example.com/api';
    const errorMessage = 'TypeError: Failed to fetch';
    global.fetch = jest.fn().mockImplementation((mockedUrl, options) => {
      return Promise.reject(errorMessage);
    }) as jest.Mock;

    const response = await api.get<MyData>(url);
    expect(response.error_message).toBe(errorMessage);
  });

  it('POST request', async () => {
    const data = 'got response from api post!';
    const mockedFetch = jest.fn((url, options) => {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: async () => {
         return data;
        },
      });
    }) as jest.Mock;
    global.fetch = mockedFetch;

    const url = 'https://example.com/api';
    const backendData = { x: 123 };
    const response = await api.post<MyData>(url, { body: backendData });

    expect(mockedFetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData)
    });
    expect(response.data).toBe(data);
  });

  it('PUT/PATCH request', async () => {
    const data = 'response data from PUT request';
    const mockedFetch = jest.fn((url, options) => {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: async () => {
         return data;
        },
      });
    }) as jest.Mock;
    global.fetch = mockedFetch;

    const url = 'https://example.com/api/123';
    const backendData = { x: 123 };
    const response = await api.put<MyData>(url, { body: backendData });

    expect(mockedFetch).toHaveBeenCalledWith(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData)
    });
    expect(response.data).toBe(data);
  });

  it('DELETE request', async () => {
    Storage.prototype.getItem = jest.fn().mockImplementation((key)=>{
      expect(key).toBe('token');
      return undefined;
    })

    const data = 'got response from api post!';
    const mockedFetch = jest.fn((url, options) => {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: async () => {
         return data;
        },
      });
    }) as jest.Mock;
    global.fetch = mockedFetch;

    const url = 'https://example.com/api';
    const backendData = { x: 123 };
    const response = await api.delete<MyData>(url, { body: backendData });

    expect(mockedFetch).toHaveBeenCalledWith(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData)
    });
    expect(response.data).toBe(data);
  });
});



