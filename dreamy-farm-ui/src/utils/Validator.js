import methods from 'validator';

class Validator {
  constructor(rules) {
    this.rules = rules;
    this.initiate();
  }

  initiate() {
    this.isValid = true;
    this.errors = {};
  }

  matches(field, value, state) {
    return value === state[field];
  }

  handleValidation(state, rules, field) {
    this.initiate();
    let rulesQuery = rules;
    if (field) {
      rulesQuery = this.rules.filter((rule) => rule.field === field);
    }

    rulesQuery.forEach((rule) => {
      if (state[rule.field] === undefined) return;
      if (this.errors[rule.field]) return;

      const fieldValue = state[rule.field] || '';
      const args = rule.args || [];
      const validationMethod =
        typeof rule.method === 'string' ? methods[rule.method] : rule.method;

      if (rule.method === 'matches') {
        const [field] = args;
        if (this.matches(field, fieldValue, state) !== rule.validWhen) {
          this.errors[rule.field] = rule.message;
          this.isValid = false;
        }
        return;
      }
      if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
        this.errors[rule.field] = rule.message;
        this.isValid = false;
      }
    });
    return this.errors;
  }

  isNoErrors(errors) {
    if (errors) {
      return Object.keys(errors).length === 0;
    }
    return Object.keys(this.errors).length === 0;
  }

  validateOne(field, state) {
    return this.handleValidation(state, this.rules, field);
  }

  validate(state) {
    return this.handleValidation(state, this.rules);
  }
}

export default Validator;
