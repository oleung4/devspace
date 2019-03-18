import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;

    axios.get(`/api/profile/github/${username}`).then(data => {
      if (this.refs.myRef) {
        // console.log(data.data);
        // check for if user entered exists
        if (data.data.message === "Not Found") {
          return null;
        }
        this.setState({ repos: data.data });
      }
    });
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-info mr-1">
            Forks: {repo.forks_count}
          </span>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <hr />
        {/* Don't display if no user / repos */}
        {/* {repos.length > 0 ? ( */}
        <h3 className="mb-4">Latest Github Repos</h3>
        {/* ) : null} */}
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
