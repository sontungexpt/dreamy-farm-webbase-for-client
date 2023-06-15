const rules = [
  {
    field: 'name',
    method: 'isEmpty',
    validWhen: false,
    message: 'The name field is required.',
  },
  {
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: 'The email field is required.',
  },
  {
    field: 'email',
    method: 'isEmail',
    validWhen: true,
    message: 'The email must be a valid email address.',
  },
  {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'The password field is required.',
  },
  {
    field: 'password',
    method: 'isLength',
    validWhen: true,
    args: [{ min: 6 }],
    message: 'The password must be at least 6 characters',
  },
  {
    field: 'confirmPassword',
    method: 'isEmpty',
    validWhen: false,
    message: 'The confirm password field is required.',
  },
  {
    field: 'confirmPassword',
    method: 'matches',
    validWhen: true,
    args: ['password'],
    message: 'The confirm password must match password.',
  },
  {
    field: 'phoneNumber',
    method: 'isEmpty',
    validWhen: false,
    message: 'The phone number field is required.',
  },
  {
    field: 'phoneNumber',
    method: 'isMobilePhone',
    validWhen: true,
    args: ['vi-VN'],
    message: 'The phone number must be a valid phone number.',
  },
  {
    field: 'address',
    method: 'isEmpty',
    validWhen: false,
    message: 'The address field is required.',
  },
];

export default rules;
