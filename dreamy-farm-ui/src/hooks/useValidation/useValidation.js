import { Validator } from '~/utils';
import { useCallback, useState, useRef } from 'react';

function useValidation(state, rules) {
  const validator = useRef(new Validator(rules));
  const [errors, setErrors] = useState(() => {
    const result = {};
    Object.keys(state).forEach((key) => {
      result[key] = '';
    });
    return result;
  });

  const isNoErrors = useCallback(() => {
    return Object.values(errors).every((error) => error === '');
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors = validator.current.validate(state);
    setErrors((prevErrors) => {
      const result = {};
      Object.keys(prevErrors).forEach((key) => {
        result[key] = newErrors[key] || '';
      });
      return result;
    });
    if (validator.current.isNoErrors(newErrors)) {
      return true;
    }
    return false;
  }, [state]);

  const clearErrors = useCallback(() => {
    setErrors((prevErrors) => {
      const result = {};
      Object.keys(prevErrors).forEach((key) => {
        result[key] = '';
      });
      return result;
    });
  }, []);

  const handleFocus = useCallback(() => {
    clearErrors();
  }, [clearErrors]);

  const handleBlur = useCallback(() => {
    validate();
  }, [validate]);

  const handleSubmit = useCallback(
    (callback) => {
      if (validate()) {
        callback();
      }
    },
    [validate],
  );

  return {
    errors,
    validate,
    isNoErrors,
    clearErrors,
    handleFocus,
    handleBlur,
    handleSubmit,
  };
}

export default useValidation;
