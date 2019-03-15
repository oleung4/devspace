import React from "react";
// import classnames from "classnames"; // is-invalid reading true when it shouldn't - reverting to vanilla js
import PropTypes from "prop-types";

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) {
  return (
    <div className="form-group">
      <textarea
        className={
          error
            ? "form-control form-control-lg is-invalid"
            : "form-control form-control-lg"
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
