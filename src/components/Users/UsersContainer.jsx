import { connect } from "react-redux";
import {
  requestUsers,
  setCurrentPage,
  toggleUserFollow,
  toggleUserUnFollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getPageSize,
  getAllUsers,
  getTotalUsersCount,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getUserSuper,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (page) => {
    this.props.requestUsers(page, this.props.pageSize);
  };
  render() {
    return (
      <div>
        {this.props.isFetching ? <Preloader /> : null}

        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          onPageChanged={this.onPageChanged}
          currentPage={this.props.currentPage}
          users={this.props.users}
          followingInProgress={this.props.followingInProgress}
          toggleUserFollow={this.props.toggleUserFollow}
          toggleUserUnFollow={this.props.toggleUserUnFollow}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    // users: getAllUsers(state),
    users: getUserSuper(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setCurrentPage,
    requestUsers,
    toggleUserFollow,
    toggleUserUnFollow,
  }),
  withAuthRedirect
)(UsersContainer);
