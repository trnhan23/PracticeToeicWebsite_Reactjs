import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import BinhLuan from '../../../components/BinhLuan/BinhLuan';
import CustomScrollbars from '../../../components/CustomScrollbars';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import SummarySection from "../../../components/ChiTietKetQua/SummarySection";
import './ResultContainer.scss';
import { useParams } from 'react-router-dom';
class ResultContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount = async () => {

  }

  render() {
    const { match } = this.props;
    const { testId } = match.params;
    if (testId) {
      localStorage.setItem('testId', testId);
    }

    return (
      <React.Fragment>
        <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
          <HomeHeader />
          <div className='container'>
            <div className='content-top'>
              <div className='summary-section'>
                <SummarySection />
              </div>

            </div>
            <div className='content-bottom'>
              <BinhLuan />
            </div>
          </div>
          <HomeFooter />
        </CustomScrollbars>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfor: state.user.userInfor,
    exam: state.user.selectedExam
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);