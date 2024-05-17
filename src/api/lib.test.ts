import { api } from './lib'; // Assuming your lib.ts file exports the Api class

type MyData = {
  data: string
}

beforeEach(()=>{
  Storage.prototype.getItem = jest.fn().mockImplementation((key)=>{
    expect(key).toBe('token');
    return 'Bearer 102030'
  })
});

describe('api', () => {
  it('GET request', async () => {
    Storage.prototype.getItem = jest.fn().mockImplementation((key)=>{
      expect(key).toBe('token');
      return undefined;
    })

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

  it('GET request when authenticated', async () => {
    const url = 'https://example.com/api';
    const data = 'this is working!';
    const mockedFetch = jest.fn(() => {
      return Promise.resolve({
        status: 200,
        ok: true,
        json: async () => data,
      });
    }) as jest.Mock;
    global.fetch = mockedFetch;

    const response = await api.get<MyData>(url);

    expect(mockedFetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
          "Authorization": "Bearer 102030",
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



