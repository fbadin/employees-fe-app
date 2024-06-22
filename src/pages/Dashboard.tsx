import React from 'react';
import { Col, Dropdown, Form, InputGroup, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, PersonPlus, SortAlphaDown, SortAlphaUp, XLg } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import { DepartmentFilter, EmployeesData, EmployeesSortBy, fetchEmployees } from '../api/employees';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';
import { Panel } from '../UI/Panel';
import { DEPARTMENTS } from '../constants';
import useDebounce from '../hooks/useDebounce';
import { Button } from '../UI/Button';
import { RootState } from '../state/store';
import { setUsers } from '../state/employees/actions';

const Dashboard = () => {
  const appContext = React.useContext(AppContext);
  const [selectedDepartment, setSelectedDepartment] = React.useState <DepartmentFilter> ('All');
  const [sortedEmployees, setSortedEmployees] = React.useState <EmployeesSortBy> ('none');
  const [search, setSearch] = React.useState<string>('');
  const { debouncedValue: debouncedSearch } = useDebounce(search);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const employeesStore = useSelector((state: RootState) => state.employees);
  const dispatch = useDispatch();
  const employees = employeesStore.employees;

  React.useEffect(()=>{
    appContext?.setBackBtnUrl(URLS.DASHBOARD);
  }, [appContext]);

  React.useEffect(()=>{
    (async () => {
      setIsLoading(true);

      const response = await fetchEmployees(debouncedSearch, selectedDepartment, sortedEmployees);

      setIsLoading(false);

      if (response.error_message) {
        toast.error(response.error_message);
        return;
      }

      const employees = response.data as EmployeesData;
      dispatch(setUsers(employees))
    })();
  }, [debouncedSearch, selectedDepartment, sortedEmployees]);

  const onDepartmentSelect = (eventKey: any, event: any) => {
    event.preventDefault();
    event.persist();
    event.stopPropagation();
    setSelectedDepartment(eventKey)
  }

  const showZeroState = employees.length === 0;
  const departmentFilterLabel = selectedDepartment === 'All' ? 'Filter by Department' : selectedDepartment;
  const activeSortClass = sortedEmployees === 'asc' || sortedEmployees === 'desc' ? 'bg-slate-500' : '';

  return (
    <div data-testid='dashboard'>
      <div className='flex justify-between items-center'>
        <h1 className="text-lg">Employee Dashboard</h1>

        <Button variant='primary' onClick={()=> navigate(URLS.EMPLOYEE_DETAILS(null))}>
          <div className='flex justify-center items-center gap-2'>
            <PersonPlus /> <div className='whitespace-nowrap' >New Employee</div>
          </div>
        </Button>
      </div>

      <div className='flex items-center justify-between flex-col gap-2 mt-3 sm:flex-row sm:mt-0'>
        <div className='flex items-center justify-center gap-2'>
          <div data-testid='sort-button'
            onClick={()=>{
              if (sortedEmployees === 'none') {
                setSortedEmployees('asc');
              } else if (sortedEmployees === 'asc') {
                setSortedEmployees('desc');
              } else {
                setSortedEmployees('none');
              }
            }}
            className={`border p-2 rounded-md cursor-pointer hover:bg-gray-500 ${activeSortClass}`}
          >
            {
              sortedEmployees === 'none' || sortedEmployees === 'asc' ? (
                <SortAlphaDown />
              ) : (
                <SortAlphaUp />
              )
            }
          </div>

          <InputGroup className='w-72'>
            <InputGroup.Text>
              {
                search.length ? (
                  <XLg className='cursor-pointer' onClick={()=>setSearch('')} />
                ) : (
                  <Search />
                )
              }
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by name or position"
              aria-label="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='w-60'
            />
          </InputGroup>
        </div>

        <Dropdown onSelect={onDepartmentSelect}>
          <Dropdown.Toggle className='bg-dark-2 border'>
            {departmentFilterLabel}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              eventKey={'All'}
              active={selectedDepartment === 'All'}
            >
              All
            </Dropdown.Item>
            {
              DEPARTMENTS.map((department) => {
                return (
                  <Dropdown.Item
                    key={department}
                    eventKey={department}
                    active={selectedDepartment === department}
                  >
                    {department}
                  </Dropdown.Item>
                )
              })
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {
        isLoading ? (
          <Panel className="mt-4">
            <div className='w-full flex justify-center'>
              <Spinner animation="border" variant="primary" aria-label='Loading Spinner' />
            </div>
          </Panel>
        ) : (
          <ListGroup className="mt-4">
            {
              showZeroState ? (
                <Panel className='flex justify-center items-center gap-4'>
                  There are no employees found
                </Panel>
              ) : (
                <>
                  <ListGroup.Item
                      action
                      key={'1'}
                      variant="dark"
                    >
                      <Row>
                        <Col className='font-bold'>Name</Col>
                        <Col className='font-bold'>Position</Col>
                        <Col className='font-bold'>Department</Col>
                      </Row>
                    </ListGroup.Item>
                    {
                      employees.map((employee) => {
                        return (
                          <ListGroup.Item
                            action
                            key={employee.id}
                            variant="light"
                            onClick={() => navigate(URLS.EMPLOYEE_DETAILS(employee.id))}
                          >
                            <Row>
                              <Col>{employee.name}</Col>
                              <Col className='text-gray-500'>{employee.position}</Col>
                              <Col className="text-gray-500">{employee.department}</Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      })
                    }
                </>
              )
            }
          </ListGroup>
        )
      }

    </div>
  )
}

export { Dashboard };