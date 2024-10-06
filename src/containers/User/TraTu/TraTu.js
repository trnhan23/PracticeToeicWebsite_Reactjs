import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import * as actions from "../../../store/actions";
import { push } from "connected-react-router";
import { getSearchVocabularyApi } from '../../../services/vocabularyService';
import './TraTu.scss'
class TraTu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            result: null,
            error: '',
            lang: 'en',
            searchType: 'dictionary'
        };
    }

    handleInputChange = (event) => {
        this.setState({ 
            word: event.target.value 
        });
    };

    renderDefinition = (fulltext) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(fulltext, 'text/html');

        const title = doc.querySelector('.dict--title');
        const content = doc.querySelector('.dict--content');

        if (!title || !content) {
            return <p>No definitions found</p>;
        }

        return (
            <div>
                <h4 dangerouslySetInnerHTML={{ __html: title.innerHTML }} />
                <div dangerouslySetInnerHTML={{ __html: content.innerHTML }} />
            </div>
        );
    };

    handleSearchTypeChange = (type) => {
        this.setState({ searchType: type }, this.resetSearch);
    };

    handleSearch = async () => {
        const { word, lang, searchType } = this.state;

        if (!word) {
            this.setState({ error: 'Please enter a word to search' });
            return;
        }

        try {
            let response = {};
            if (searchType === 'dictionary') {
                response = await getSearchVocabularyApi(word, lang);
                // response = axios.get(`https://api.tracau.vn/WBBcwnwQpV89/s/${word}/${lang}`);
            } else if (searchType === 'grammar') {
                // response = axios.get(`https://api.tracau.vn/WBBcwnwQpV89/s/${word}/${lang}`);
                response = await getSearchVocabularyApi(word, lang);
            }
            this.setState({ result: response, error: '' });
            console.log("check res: ",this.state.result)
        } catch (error) {
            this.setState({ error: 'Word not found or API error' });
        }
    };

    render() {
        const { word, result, error, searchType } = this.state;

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='search-vocabulary'>
                        <div className='search-vocabulary-container'>
                            <div className='search-vocabulary-title'>
                                <i className="fa-solid fa-book"></i>
                                <span className='search-vocabulary-title-one'>Dictionary</span>
                            </div>
                            <div className='search-vocabulary-input'>
                                <input
                                    type='text'
                                    value={word}
                                    onChange={(event) => {this.handleInputChange(event)}}
                                    placeholder='Enter a word'
                                />
                                <button onClick={() => {this.handleSearch()}}>Tra từ</button>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div className='search-vocabulary-content'>
                                {result && result.tratu && result.tratu.length > 0 && searchType === 'dictionary' && (
                                    <div className='vocabulary-result'>
                                        <div className='vocabulary-header'>
                                            <h3>Kết quả cho "{word}"</h3>
                                        </div>

                                        <div className='vocabulary-definition'>
                                            {result.tratu[0].fields.fulltext && this.renderDefinition(result.tratu[0].fields.fulltext)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraTu);
