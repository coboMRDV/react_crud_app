import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="flex space-x-1 self-end">
          <Link
            to={`/streams/edit/${stream.id}`}
            className="bg-purple-600 text-white  px-4 py-2 shadow"
          >
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="bg-transparent border text-purple-600 border-purple-600 text-white  px-4 py-2 shadow"
          >
            Delete
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }

  renderList() {
    if (this.props.streams) {
      return this.props.streams.map((stream) => {
        return (
          <div
            key={stream.id}
            className="border border-gray-400 p-3 flex justify-between items-center shadow mb-4 "
          >
            <div className="content ">
              <Link to={`/streams/${stream.id}`}>
                <h2 className="text-xl font-bold">{stream.title}</h2>
              </Link>

              <p>{stream.description}</p>
            </div>
            {this.renderAdmin(stream)}
          </div>
        );
      });
    } else {
      return null;
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div className="self-end mt-1 mb-6">
          <Link
            to="/streams/new"
            onClick={this.onSignOutClick}
            className="bg-purple-600 text-white  px-4 py-2 shadow "
          >
            Crate Stream
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    // console.log(this.props);

    return (
      <div className=" flex flex-col">
        <h2 className="text-3xl mb-4">Streams</h2>
        {this.renderList()}
        {this.renderCreate()}
      </div>
    );
  }
}

const setStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(setStateToProps, { fetchStreams })(StreamList);
