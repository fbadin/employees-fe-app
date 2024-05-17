import { toast } from 'react-toastify';

import { Toast } from './Toast';

jest.mock('react-toastify', ()=>({
  'toast': {
    'success': jest.fn(),
    'error': jest.fn(),
  }
}))

const mockedToastSuccess = jest.mocked(toast.success);
const mockedToastError = jest.mocked(toast.error);

beforeEach(()=>{
  mockedToastSuccess.mockClear();
  mockedToastError.mockClear();
})

describe('Toast', ()=>{
  it('calls the RNTM component', ()=>{
    Toast({
      type: 'success',
      message: 'it worked!'
    })
    expect(mockedToastSuccess).toHaveBeenCalledWith("it worked!");
  });

  it('when logError is passed, it should call the postLog', ()=>{
    Toast({
      type: 'error',
      message: 'something went wrong',
    });
    expect(mockedToastError).toHaveBeenCalledWith('something went wrong');
  });
});