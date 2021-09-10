import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return <div className="text-red-500">{error}</div>;
    } else {
      return null;
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="flex flex-col space-y-1">
        <label className="text-lg">{label}</label>
        <input {...input} className="border border-gray-300 p-2  shadow" />
        {/* {this.renderError(meta)} */}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="space-y-5"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Stream Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Stream Description"
        />
        <button className="bg-purple-600 text-white  px-4 py-2 shadow">
          Submit
        </button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};
  if (!title) {
    errors.title = 'You must enter a title';
  }
  if (!description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validate,
})(StreamForm);
