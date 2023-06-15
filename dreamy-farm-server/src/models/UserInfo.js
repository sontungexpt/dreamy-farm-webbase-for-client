import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserInfo = new Schema({
  email: { type: String, unique: true, required: true, maxlength: 255 },
  name: { type: String, required: true, maxlength: 255 },
  sex: { type: String, default: '', maxlength: 255 },
  addreses: {
    type: Array,
    validate: {
      validator: function (array) {
        return array.every((v) => {
          const addressValidated = typeof v.address === 'string';
          const phoneNumberValidated =
            /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/.test(v.phoneNumber) ||
            v.phoneNumber === '';
          const addressActiveValidated = typeof v.active === 'boolean';
          return (
            addressValidated && phoneNumberValidated && addressActiveValidated
          );
        });
      },
      message: (props) => {
        for (let i = 0; i < props.value.length; i++) {
          const addressValidated = typeof props.value[i].address === 'string';
          if (!addressValidated)
            return `${props.value[i].address} is not a valid address!`;
          const phoneNumberValidated =
            /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/.test(
              props.value[i].phoneNumber,
            ) || props.value[i].phoneNumber === '';
          if (!phoneNumberValidated)
            return `${props.value[i].phoneNumber} is not a valid phone number!`;
          const addressActiveValidated =
            typeof props.value[i].active === 'boolean';
          if (!addressActiveValidated)
            return `${props.value[i].active} is not a valid active!`;
        }
      },
    },
    default: [],
  },
  avatar: { type: String, default: '' },
});

UserInfo.index({ email: 1 });
export default mongoose.model('UserInfo', UserInfo);
