import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, LongTextField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Contacts } from '../../api/contact/Contacts';

const schema = Contacts.schema.omit('owner');
const bridge = new SimpleSchema2Bridge(schema);

/* Renders the AddContact page for adding a document. */
const AddContact = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, address, image, description } = data;
    const owner = Meteor.user().username;
    Contacts.collection.insert(
      { firstName, lastName, address, image, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Contact</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="firstName" /></Col>
                  <Col><TextField name="lastName" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="address" /></Col>
                  <Col> <TextField name="image" /></Col>
                </Row>
                <LongTextField name="description" />
                <SubmitField value="submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContact;
