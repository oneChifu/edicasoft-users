import store from "@/store";
import { extend } from 'vee-validate'
import { 
  regex, 
  required, 
  email, 
  min, 
  max, 
  alpha, 
  integer, 
  max_value, 
  min_value
} from 'vee-validate/dist/rules'

extend('regex', {
  ...regex,
  message: 'Value field may only contain alphabetic characters',
})

extend('alpha', {
  ...alpha,
  message: '{_field_} field may only contain alphabetic characters',
})

extend('integer', {
  ...integer,
  message: '{_field_} field may only contain number characters',
})

extend('max_value', {
  ...max_value,
  params: ['max'],
  message: 'Value must be {max} or less',
})

extend('min_value', {
  ...min_value,
  params: ['min'],
  message: 'Value must be {min} or more',
})

extend('required', {
  ...required,
  message: '{_field_} field can not be empty',
})

// extend('accept', {
//   ...accept,
//   validate(value) {
//     return value ? true : false;
//   },
//   message: 'Please check this field',
// })

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('email', {
  ...email,
  message: '{_field_} must be valid',
})

extend("password", {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password repeat does not match to Password"
})

extend('email_uniq', {
  params: ['user'],
  validate: (value, {user}) => {
    return !store.getters['users/data'].some(item => {
      return item.id != user.id && item.email == value
    })
  },
  message: 'This Email already exist',
})
