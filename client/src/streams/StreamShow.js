import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from './../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="StreamShow space-y-4">
          <h2 className="text-3xl">{this.props.stream.title}</h2>
          <p className="text-lg">{this.props.stream.description}</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
