import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
}

const CommonTemplate = ({ children }: Props) => {
  return (
          <main data-testid="main" className="bg-dark-2 text-dark-gray min-h-full mt-16">
    <Container fluid="md">
      <Row>
        <Col>
            <div className="px-3 py-4">
              {children}
            </div>

        </Col>
      </Row>
    </Container>
          </main>
  )
}

export { CommonTemplate };