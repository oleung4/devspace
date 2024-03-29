import React from "react";
// import classnames from "classnames"; // is-invalid reading true when it shouldn't - reverting to vanilla js
import PropTypes from "prop-types";

function TextFieldGroup({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        // className={classnames("form-control form-control-lg", {
        //   "is-invalid": { error }
        // })}
        className={
          error
            ? "form-control form-control-lg is-invalid"
            : "form-control form-control-lg"
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
