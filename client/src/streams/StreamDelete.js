import React from 'react';
import Modal from '../components/modal';
import history from '../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream } from './../actions';
import { deleteStream } from './../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const id = this.props.match.params.id;

    return (
      <div className="actions flex space-x-1 self-end">
        <button
          className="bg-purple-600 text-white  px-4 py-2 shadow"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <Link
          to="/"
          className="bg-transparent border text-purple-600 border-purple-600 text-white  px-4 py-2 shadow"
        >
          Cancel
        </Link>
      </div>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    } else {
      return `Are you sure you want to delete the stream with title <<${this.props.stream.title}>>`;
    }
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => {
          history.push('/');
        }}
      />
    );
  }
}

const setStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(setStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
