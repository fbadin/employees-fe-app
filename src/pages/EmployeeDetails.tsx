import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchEmployeeDetails, EmployeeDetails as TEmployeeDetails, deleteEmployee } from '../api/employees';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';
import { Label } from '../UI/Label';
import { Painel } from '../UI/Panel';
import { Toast } from '../UI/Toast';

const EmployeeDetails = () => {
  const appContext = React.useContext(AppContext);
  const [companyDetails, setCompanyDetails] = React.useState<TEmployeeDetails | undefined>();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const navigate = useNavigate();

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

        setCompanyDetails(response.data);
      }
    })()
  }, [id]);

  const isNewEmployee = id === undefined;

  console.log('id', id)

  return (
    <Painel>
      {
        !companyDetails ? (
          'Loading'
        ) : (
          <div className="flex flex-col items-center">
            <Label className='mt-3'>
              { isNewEmployee ? 'New Employee' : 'Edit Employee' }
            </Label>
            {/* <img src={companyDetails.picture_url} className="w-24 sm:w-1/4 rounded border-solid border-2" alt="Company's logo" />
            <Label className='mt-3'>Company Info</Label>
            <div className="pl-3">
              <Label>uuid:</Label> {companyDetails.uuid} <br />
              <Label>name:</Label> {companyDetails.name} <br />
              <Label className="text-red-500">no. pictures:</Label> {companyDetails.pictures.length} <br />
              <Label className="text-green-900">quota:</Label> {companyDetails.quota} <br />
            </div>

            <Label className="mt-3">Services ({companyDetails.services.length})</Label>
            <div className="mt-3 pl-3">
              {
                companyDetails.services.map((service)=>{
                  return (
                    <div key={service.uuid} className="mt-1">
                      <Label>uuid:</Label> {service.uuid} <br />
                      <Label>name:</Label> {service.name} <br />
                    </div>
                  )
                })
              }
            </div>

            <Label className="mt-3">Users ({companyDetails.users.length})</Label>
            <div className="mt-3 pl-3">
              {
                companyDetails.users.map((user)=>{
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

            <div className="mt-4">
              <Button variant="danger" onClick={()=>setShowDeleteModal(true)}>Delete Company</Button>
            </div>

            <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)}>
              <Modal.Header closeButton className="bg-danger">
                <Modal.Title>Delete {companyDetails.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-black">
                Are you sure you want to delete this company? This action cannot be undone.
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
                      message: `Company ${companyDetails.name} is deleted`,
                    });
                    navigate(URLS.DASHBOARD);
                  }
                }}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )
      }
    </Painel>
  )
}

export { EmployeeDetails };