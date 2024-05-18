import React from 'react';
import { Button, Dropdown, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, PersonPlus, SortAlphaDown, SortAlphaUp, XLg } from 'react-bootstrap-icons';

import { DepartmentValue, EmployeesData, EmployeesSortBy, fetchEmployees } from '../api/employees';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';
import { Painel } from '../UI/Panel';
import { DEPARTMENTS } from '../constants';
import useDebounce from '../hooks/useDebounce';

const Dashboard = () => {
  const appContext = React.useContext(AppContext);
  const [employees, setEmployees] = React.useState<EmployeesData | undefined>();
  const [selectedDepartment, setSelectedDepartment] = React.useState <DepartmentValue> ('All');
  const [sortedEmployees, setSortedEmployees] = React.useState <EmployeesSortBy> ('none');
  const [search, setSearch] = React.useState<string>('');
  const { debouncedValue: debouncedSearch } = useDebounce(search);
  const navigate = useNavigate();

  React.useEffect(()=>{
    appContext?.setBackBtnUrl(URLS.DASHBOARD);
  }, [appContext]);

  React.useEffect(()=>{
    handleFetchEmployees();
  }, [debouncedSearch, selectedDepartment, sortedEmployees]);

  const handleFetchEmployees = async () => {
    const response = await fetchEmployees(debouncedSearch, selectedDepartment, sortedEmployees);

    if (response.error_message) {
      toast.error(response.error_message);
      return;
    }

    setEmployees(response.data);
  }

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
    <div data-testid="main-container">
      <div className='flex justify-between items-center h-14 min-h-14'>
        <h1 className="text-lg">Employee Dashboard</h1>

        <Button variant="success" onClick={()=>null}>
          <div className='flex justify-center items-center gap-2 '>
            <PersonPlus /> New Employee
          </div>
        </Button>
      </div>

      <div className='flex items-center justify-between'>
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

          <InputGroup>
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
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      <ListGroup className="mt-4">
        {
          showZeroState ? (
            <Painel className='bg-dark-gray flex justify-center items-center gap-4'>
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
                  <div className='flex justify-between'>
                    {employee.name}
                    <div className="text-gray-500">{employee.department}</div>
                  </div>
                </ListGroup.Item>
              )
            })
          )
        }
      </ListGroup>
    </div>
  )
}

export { Dashboard };