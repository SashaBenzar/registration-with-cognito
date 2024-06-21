import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-central-1_SaE5OceTW',
  ClientId: '6huoon92phu55nco0d0krtitmd',
};

export default new CognitoUserPool(poolData);
