import * as React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
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
import { formatDate } from '../lib/utils';

const EmployeeDetails = () => {
  const appContext = React.useContext(AppContext);
  const [employeeDetails, setEmployeeDetails] = React.useState<TEmployeeDetails | undefined>();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
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

        setEmployeeDetails(response.data);
      }
    })()
  }, [id]);

  const isNewEmployee = id === undefined;

  console.log('id', id)



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


              <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-3'>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Full name"
                      defaultValue={employeeDetails?.name}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        defaultValue={employeeDetails?.email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose an Email.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Position"
                      defaultValue={employeeDetails?.position}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Department"
                      defaultValue={employeeDetails?.department}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Salary</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Salary"
                        aria-describedby="inputGroupPrepend"
                        defaultValue={employeeDetails?.salary}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a salary.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="Start Date"
                      defaultValue={formatDate(employeeDetails?.start_date.toString())}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>


                <div className='mt-4 flex justify-between items-center w-full'>
                  <div>
                    {
                      !isNewEmployee && (
                        <Button variant='danger' onClick={()=>setShowDeleteModal(true)}>Delete Employee</Button>
                      )
                    }
                  </div>
                  <Button variant='primary' onClick={()=>null}>Update Employee</Button>
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