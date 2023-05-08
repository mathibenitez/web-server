
const DTO_PROPERY_NAMES = ['email', 'password'];

const loginDTOSSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email'},
    paswword: { type: 'string'}
  },
  required: ['email', 'paswword'],
  additionalProperties: false
}

const validateLoginDto = (req, res, next) => {
  const loginDto = req.body;

  if(typeof loginDto !== 'object') res.statusCode(400).send('The body has to come in json format');

  const bodyPropertyNames = Object.keys(loginDto);

  const checkProperties = bodyPropertyNames.length === DTO_PROPERY_NAMES.length &&
   bodyPropertyNames.every(bodyPropertyNames =>
   DTO_PROPERY_NAMES.includes(bodyPropertyNames));

  if(!checkProperties) res.statusCode(400).sene('The body must have only email and password');
}

export default validateLoginDto;