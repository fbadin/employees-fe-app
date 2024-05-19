import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { fetchEmployeeDetails, EmployeeDetails as TEmployeeDetails, deleteEmployee } from '../api/employees';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';
import { Label } from '../UI/Label';
import { Painel } from '../UI/Panel';
import { Toast } from '../UI/Toast';
import { Button } from '../UI/Button';

const EmployeeDetails = () => {
  const appContext = React.useContext(AppContext);
  const [employeeDetails, setEmployeeDetails] = React.useState<TEmployeeDetails | undefined>();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const navigate = useNavigate();

  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  React.useEffect(()=>{
    appContext?.setBackBtnUrl(URLS.DASHBOARD);
  }, [appContext])

  React.useEffect(()=>{
    (async () => {
      if (id) {
        const response = await fetchEmployeeDetails(id);

        if (response.error_message) {
          Toast({
            type: 'error',
            message: response.error_message
          });
          return;
        }

        setEmployeeDetails(response.data);
      }
    })()
  }, [id]);

  const isNewEmployee = id === undefined;

  console.log('id', id)

  return (
    <Painel>
      <h1 className='text-lg'>
        { isNewEmployee ? 'New Employee' : 'Edit Employee' }
      </h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-3'>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <div className='mt-4 flex justify-between items-center w-full'>
          <div>
            {
              !isNewEmployee && (
                <Button onClick={()=>setShowDeleteModal(true)}>Delete Employee</Button>
              )
            }
          </div>
          <Button variant='primary' onClick={()=>null}>Update Employee</Button>
        </div>
      </Form>

      <div className="flex flex-col items-center">

        {/* <img src={employeeDetails.picture_url} className="w-24 sm:w-1/4 rounded border-solid border-2" alt="employee's logo" />
        <Label className='mt-3'>employee Info</Label>
        <div className="pl-3">
          <Label>uuid:</Label> {employeeDetails.uuid} <br />
          <Label>name:</Label> {employeeDetails.name} <br />
          <Label className="text-red-500">no. pictures:</Label> {employeeDetails.pictures.length} <br />
          <Label className="text-green-900">quota:</Label> {employeeDetails.quota} <br />
        </div>

        <Label className="mt-3">Services ({employeeDetails.services.length})</Label>
        <div className="mt-3 pl-3">
          {
            employeeDetails.services.map((service)=>{
              return (
                <div key={service.uuid} className="mt-1">
                  <Label>uuid:</Label> {service.uuid} <br />
                  <Label>name:</Label> {service.name} <br />
                </div>
              )
            })
          }
        </div>

        <Label className="mt-3">Users ({employeeDetails.users.length})</Label>
        <div className="mt-3 pl-3">
          {
            employeeDetails.users.map((user)=>{
              return (
                <div key={user.uuid} className="mt-1">
                  <Label>uuid:</Label> {user.uuid} <br />
                  <Label>name:</Label> {user.full_name} <br />
                  <Label>email:</Label> {user.email} <br />
                  <Label>email_verified:</Label> {`${user.email_verified}`} <br />
                  <Label>last_language:</Label> {user.last_language} <br />
                </div>
              )
            })
          }
        </div> */}



        {/* <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)}>
          <Modal.Header closeButton className="bg-danger">
            <Modal.Title>Delete {employeeDetails.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-black">
            Are you sure you want to delete this employee? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer className="bg-black gap-8">
            <Button variant="success" onClick={()=>setShowDeleteModal(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={async ()=>{
              setShowDeleteModal(false);
              const response = await deleteEmployee(id as string);

              if (response.error_message) {
                Toast({
                  type: 'error',
                  message: 'Oops. Something went wrong',
                });
              } else {
                Toast({
                  type: 'success',
                  message: `employee ${employeeDetails.name} is deleted`,
                });
                navigate(URLS.DASHBOARD);
              }
            }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </Painel>
  )
}

export { EmployeeDetails };