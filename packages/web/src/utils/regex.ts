const regex = {
  ONLY_ALPHA_NUM_DASH_SPACES_DOT: new RegExp(/^[a-zA-z0-9\s-_.]*$/, 'i'),
  ONLY_ALPHA_NUM_NO_SPACES: new RegExp(/^[a-zA-Z0-9]+$/),
  ONLY_ALPHA_SPACES: new RegExp(/^[a-zA-Z\s-]*$/, 'i'),
  MIN_ONE_UPPERCASE: new RegExp(/^.*[a-z].*$/),
  MIN_ONE_LOWERCASE: new RegExp(/^.*[A-Z].*$/),
  MIN_ONE_NUMERIC: new RegExp(/^.*\d.*$/),
  MIN_ONE_SPECIAL: new RegExp(/^.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*$/),
};

export default regex;
