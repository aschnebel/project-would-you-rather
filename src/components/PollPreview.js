import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {};
};

class PollPreview extends Component {
  render() {
    return <div>PollPreview</div>;
  }
}

export default connect(mapStateToProps)(PollPreview);
