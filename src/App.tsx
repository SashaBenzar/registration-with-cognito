import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Input } from './components/Input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from './components/Select';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from './cognitoConfig';
import './css/style.css';
import Popup from './components/Popup';

const App = () => {
  const [location, setLocation] = useState<{ State: string; Affiliation: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    first_name: '',
    last_name: '',
    state: location[0]?.State,
    affiliation: location[0]?.Affiliation,
    email: '',
  };
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState('');

  const validationSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    state: yup.string().required(),
    affiliation: yup.string().required(),
    email: yup.string().required().email(),
  });

  useEffect(() => {
    axios
      .get(`https://y0uurfnk44.execute-api.eu-central-1.amazonaws.com/default/items`)
      .then((res) => {
        setLocation(res.data);
        setIsLoading(true);
      });
  }, []);

  const onSubmit = ({ email, ...values }) => {
    const attributes = Object.keys(values).map((key) => {
      return {
        Name: `custom:${key}`,
        Value: values[key] || '',
      };
    });
    const attributeList = attributes.map((attr) => new CognitoUserAttribute(attr));

    UserPool.signUp(email, 'Aa-123123', attributeList, null, (err, data) => {
      if (err) {
        setShowError(err.message);
      } else {
        console.log(data);
        setShowPopup(true);
      }
    });
  };

  return isLoading ? (
    <div className="container">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <Form className="form">
            <h1>Form</h1>
            <Input title="First Name" name="first_name" placeholder="Jane" />

            <Input title="Last Name" name="last_name" placeholder="Doe" />

            <Input title="Email" name="email" placeholder="jane@acme.com" type="email" />

            <Select
              title="State"
              array={[...new Set(location.map((item) => item.State))]}
              name="state"
              value={values.state}
              onChange={(e) => setFieldValue('state', e.target.value)}
            />

            <Select
              title="Affiliation"
              array={location
                .filter((item) => item.State === values.state)
                .map((item) => item.Affiliation)}
              name="affiliation"
              value={values.affiliation}
              onChange={(e) => setFieldValue('affiliation', e.target.value)}
            />
            {showError ? <p>{showError}</p> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      {showPopup && (
        <Popup
          handleClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
