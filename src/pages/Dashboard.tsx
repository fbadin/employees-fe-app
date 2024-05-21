import React from 'react';
import { Col, Dropdown, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, PersonPlus, SortAlphaDown, SortAlphaUp, XLg } from 'react-bootstrap-icons';

import { DepartmentFilter, EmployeesData, EmployeesSortBy, fetchEmployees } from '../api/employees';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';
import { Painel } from '../UI/Panel';
import { DEPARTMENTS } from '../constants';
import useDebounce from '../hooks/useDebounce';
import { Button } from '../UI/Button';

const Dashboard = () => {
  const appContext = React.useContext(AppContext);
  const [employees, setEmployees] = React.useState<EmployeesData | undefined>();
  const [selectedDepartment, setSelectedDepartment] = React.useState <DepartmentFilter> ('All');
  const [sortedEmployees, setSortedEmployees] = React.useState <EmployeesSortBy> ('none');
  const [search, setSearch] = React.useState<string>('');
  const { debouncedValue: debouncedSearch } = useDebounce(search);
  const navigate = useNavigate();

  React.useEffect(()=>{
    appContext?.setBackBtnUrl(URLS.DASHBOARD);
  }, [appContext]);

  React.useEffect(()=>{
    (async () => {
      const response = await fetchEmployees(debouncedSearch, selectedDepartment, sortedEmployees);

      if (response.error_message) {
        toast.error(response.error_message);
        return;
      }

      setEmployees(response.data);
    })();
  }, [debouncedSearch, selectedDepartment, sortedEmployees]);

  const onDepartmentSelect = (eventKey: any, event: any) => {
    event.preventDefault();
    event.persist();
    event.stopPropagation();
    setSelectedDepartment(eventKey)
  }

  const showZeroState = employees?.employees.length === 0;
  const departmentFilterLabel = selectedDepartment === 'All' ? 'Filter by Department' : selectedDepartment;
  const activeSortClass = sortedEmployees === 'asc' || sortedEmployees === 'desc' ? 'bg-slate-500' : '';

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className="text-lg">Employee Dashboard</h1>

        <Button variant='primary' onClick={()=> navigate(URLS.EMPLOYEE_DETAILS(null))}>
          <div className='flex justify-center items-center gap-2'>
            <PersonPlus /> <div className='whitespace-nowrap' >New Employee</div>
          </div>
        </Button>
      </div>

      <div
        className='flex items-center justify-between flex-col gap-2 mt-3 sm:flex-row sm:mt-0'
      >
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
      </div>

      <ListGroup className="mt-4">
        {
          showZeroState ? (
            <Painel className='flex justify-center items-center gap-4'>
               There are no employees found
            </Painel>
          ) : (
            employees?.employees.map((employee) => {
              return (
                <ListGroup.Item
                  action
                  key={employee.id}
                  variant="dark"
                  onClick={() => navigate(URLS.EMPLOYEE_DETAILS(employee.id))}
                >
                  <Row>
                    <Col>{employee.name}</Col>
                    <Col className='text-gray-500'>{employee.position}</Col>
                    <Col className="text-gray-500 text-right">{employee.department}</Col>
                  </Row>
                </ListGroup.Item>
              )
            })
          )
        }
      </ListGroup>
    </>
  )
}

export { Dashboard };