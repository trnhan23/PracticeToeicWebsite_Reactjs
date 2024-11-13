import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Login from './Auth/Login.js';
import Register from './Auth/Register.js';
import System from '../routes/System';
import HomePage from './User/HomePage/HomePage.js';
import SearchVocabulary from './User/SearchVocabulary/SearchVocabulary.js';
import ToeicExam from './User/ToeicExam/ToeicExam.js';
import TTDeThi from './User/TTDeThi/TTDeThi.js';
import { Zoom } from 'react-toastify';
import Practice from './User/LuyenTap/Practice.js';
import HienThiDapAn from '../components/KetQua/HienThiDapAn.js';
import ResultContainer from './User/ChiTietKetQua/ResultContainer.js';
import Flashcard from './User/FlashCard/FlashCard.js';
import HomeVocab from './User/PracticeVocab/HomeVocab.js';
import Statistic from './User/Statistic/Statistic.js';
import ResultPractice from './User/Statistic/ResultPractice.js';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <span className="content-container">
                            <Switch>
                                {/* <Route path={path.HOME} exact component={(Home)} /> */}
                                <Route path={path.HOMEPAGE} exact component={(HomePage)} />
                                <Route path={path.SEARCH_WORD} component={(SearchVocabulary)} />
                                <Route path={path.TOEIC_EXAM} component={(ToeicExam)} />
                                <Route path={path.PRACTICE} component={(Practice)} />
                                <Route path={path.DETAIL} component={(ResultContainer)} />
                                <Route path={path.TT_DETHI} component={(TTDeThi)} />
                                <Route path={path.STATISTIC} component={(Statistic)} />
                                <Route path={path.RESULT_PRACTIC} component={(ResultPractice)} />
                                <Route path={path.REGISTER} component={(Register)} />
                                <Route path={path.PRACTICE_VOCAB} component={(HomeVocab)} />
                                <Route path={path.HT_DAPAN} component={(HienThiDapAn)} />
                                <Route path={path.FLASHCARD} component={(Flashcard)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                            </Switch>
                        </span>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            className='custom-toast'
                            bodyClassName='custom-body'
                            progressClassName='custom-progress'
                            icon="🚀"
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Zoom}
                        />

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);