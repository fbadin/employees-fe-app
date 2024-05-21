import * as React from 'react';
import { Dropdown, Modal, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Floppy, PersonPlus, Trash } from 'react-bootstrap-icons';

import { fetchEmployeeDetails, EmployeeDetails as TEmployeeDetails, deleteEmployee, DepartmentValue } from '../api/employees';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';
import { Painel } from '../UI/Panel';
import { Toast } from '../UI/Toast';
import { Button } from '../UI/Button';
import { formatDate } from '../lib/utils';
import { DEPARTMENTS, emailRegex } from '../constants';

const EmployeeDetails = () => {
  const appContext = React.useContext(AppContext);
  const [employeeDetails, setEmployeeDetails] = React.useState<TEmployeeDetails | undefined>();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [position, setPosition] = React.useState<string>('');
  const [salary, setSalary] = React.useState<string>('');
  const [startDate, setStartDate] = React.useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = React.useState <DepartmentValue> (DEPARTMENTS[0]);
  const [isNameValid, setIsNameValid] = React.useState <boolean | undefined> (undefined);
  const [isEmailValid, setIsEmailValid] = React.useState <boolean | undefined> (undefined);
  const [isPositionValid, setIsPositionValid] = React.useState <boolean | undefined> (undefined);
  const [isSalaryValid, setIsSalaryValid] = React.useState <boolean | undefined> (undefined);
  const [isStartDateValid, setIsStartDateValid] = React.useState <boolean | undefined> (undefined);

  React.useEffect(()=>{
    appContext?.setBackBtnUrl(URLS.DASHBOARD);
  }, [appContext])

  React.useEffect(()=>{
    (async () => {
      if (id) {
        setIsLoading(true);

        const response = await fetchEmployeeDetails(id);

        setIsLoading(false);

        if (response.error_message) {
          Toast({
            type: 'error',
            message: response.error_message
          });
          return;
        }

        const employeeData = response.data;
        setEmployeeDetails(employeeData);
        setName(employeeData?.name || '');
        setEmail(employeeData?.email || '');
        setPosition(employeeData?.position || '');
        setSalary(employeeData?.salary || '');
        setSelectedDepartment(employeeData?.department as DepartmentValue);
        setStartDate(employeeData?.start_date.toString() || '');
      }
    })()
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);

    if (!name.length) {
      setIsNameValid(undefined);
      return;
    }

    setIsNameValid(name.trim().split(' ').length >= 2);
    setValidated(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.length) {
      setIsEmailValid(undefined);
      return;
    }

    setIsEmailValid(emailRegex.test(value));
    setValidated(false);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = e.target.value;
    setPosition(position);

    if (!position.length) {
      setIsPositionValid(undefined);
      return;
    }

    setIsPositionValid(position.length > 3);
    setValidated(false);
  };

  const onDepartmentSelect = (eventKey: any, event: any) => {
    event.preventDefault();
    event.persist();
    event.stopPropagation();
    setSelectedDepartment(eventKey);
    setValidated(false);
  }

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const salary = e.target.value;
    setSalary(salary);

    if (!salary.length) {
      setIsSalaryValid(undefined);
      return;
    }

    setIsSalaryValid(salary.length > 4);
    setValidated(false);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = e.target.value;
    setStartDate(startDate);

    if (!startDate.length) {
      setIsStartDateValid(undefined);
      return;
    }

    setIsStartDateValid(!!startDate.length);
    setValidated(false);
  };

  const handleSubmit = () => {

  };

  const isNewEmployee = id === undefined;
  const isValidForm = name.length > 0 &&
    email.length > 0 &&
    position.length > 0 &&
    salary.length > 0 &&
    startDate.length > 0;

  return (
    <>
      <h1 className='text-lg'>
        { isNewEmployee ? 'New Employee' : 'Edit Employee' }
      </h1>
      <Painel className='mt-3'>
        {
          isLoading ? (
            <div className='w-full flex justify-center'>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Form noValidate validated={validated} className='mt-3'>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationFullName">
                    <Form.Label>Employee's name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={handleNameChange}
                      isInvalid={!name.length || isNameValid === undefined ? undefined : !isNameValid}
                      isValid={!name.length ? undefined : isNameValid}
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please type the employee's full name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        value={email}
                        onChange={handleEmailChange}
                        isInvalid={!email.length || isEmailValid === undefined ? undefined : !isEmailValid}
                        isValid={!email.length ? undefined : isEmailValid}
                        required
                      />
                      <>
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Please choose a valid Email
                        </Form.Control.Feedback>
                      </>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Position"
                      onChange={handlePositionChange}
                      isInvalid={!position.length || isPositionValid === undefined ? undefined : !isPositionValid}
                      isValid={!position.length ? undefined : isPositionValid}
                      defaultValue={employeeDetails?.position}
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please choose a position
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <Form.Label>Department</Form.Label>
                    <Dropdown onSelect={onDepartmentSelect}>
                      <Dropdown.Toggle className='w-full bg-white text-black border border-solid border-custom'>
                        {selectedDepartment}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
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
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                    <Form.Label>Salary</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="number"
                        placeholder="Salary"
                        aria-describedby="inputGroupPrepend"
                        defaultValue={employeeDetails?.salary}
                        onChange={handleSalaryChange}
                        isInvalid={!salary.length || isSalaryValid === undefined ? undefined : !isSalaryValid}
                        isValid={!salary.length ? undefined : isSalaryValid}
                        required
                      />
                      <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please choose a salary per year. 5 Digits minimum.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="Start Date"
                      defaultValue={formatDate(employeeDetails?.start_date.toString())}
                      onChange={handleStartDateChange}
                      isInvalid={!startDate.length || isStartDateValid === undefined ? undefined : !isStartDateValid}
                      isValid={!startDate.length ? undefined : isStartDateValid}
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please choose a start date
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {
                  !isNewEmployee && (
                    <Row className="mb-3">
                      <Form.Group as={Col} md="4">
                        <Form.Label>Created At</Form.Label>
                        <Form.Control
                          readOnly
                          type="date"
                          placeholder="Created At"
                          defaultValue={formatDate(employeeDetails?.created_at.toString())}
                          className='bg-slate-400 focus:bg-slate-400'
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="4">
                        <Form.Label>Updated At</Form.Label>
                        <InputGroup>
                          <Form.Control
                            readOnly
                            type="date"
                            placeholder="Updated At"
                            defaultValue={formatDate(employeeDetails?.updated_at.toString())}
                            className='bg-slate-400 focus:bg-slate-400'
                          />
                        </InputGroup>
                      </Form.Group>
                    </Row>
                  )
                }

                <div className='mt-4 flex justify-between items-center w-full'>
                  <div>
                    {
                      !isNewEmployee && (
                        <Button variant='danger' onClick={()=>setShowDeleteModal(true)}>
                          <div className='flex justify-center items-center gap-2'>
                            <Trash /> Delete Employee
                          </div>
                        </Button>
                      )
                    }
                  </div>
                  <Button
                    variant='primary'
                    disabled={!isValidForm}
                    onClick={()=> setValidated(true)}
                  >
                    <div className='flex justify-center items-center gap-2'>
                      {
                        isNewEmployee ? (
                          <><PersonPlus /> Create Employee</>
                        ) : (
                          <><Floppy /> Save Employee</>
                        )
                      }
                    </div>
                  </Button>
                </div>
              </Form>
            </>
          )
        }

      </Painel>
      <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)} className='text-white'>
        <Modal.Header closeButton className="bg-danger">
          <Modal.Title >Delete {employeeDetails?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black">
          Are you sure you want to delete this employee? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer className="bg-black gap-8">
          <Button variant="primary" onClick={()=>setShowDeleteModal(false)} disabled={isLoading}>
            Close
          </Button>
          <Button variant="danger" disabled={isLoading} onClick={async ()=>{
            setShowDeleteModal(false);
            setIsLoading(true);

            const response = await deleteEmployee(id as string);

            setIsLoading(false);

            if (response.error_message) {
              Toast({
                type: 'error',
                message: 'Oops. Something went wrong',
              });
            } else {
              Toast({
                type: 'success',
                message: `${employeeDetails?.name} was deleted`,
              });
              navigate(URLS.DASHBOARD);
            }
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { EmployeeDetails };