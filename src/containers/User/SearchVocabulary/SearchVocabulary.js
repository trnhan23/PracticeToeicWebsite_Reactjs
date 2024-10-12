import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import { getSearchVocabularyApi, getAudioVocabularyApi } from '../../../services/vocabularyService';
import './SearchVocabulary.scss'
class SearchVocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            result: null,
            error: '',
            lang: 'en',
            searchType: 'dictionary',
            audioUS: '',
            audioUK: ''
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
            let dataAudio = {};
            // lấy nội dung của từ
            response = await getSearchVocabularyApi(word, lang);

            // lấy file âm thanh của từ
            dataAudio = await getAudioVocabularyApi(word);
            this.setState({
                result: response,
                audioUS: dataAudio.audioUS,
                audioUK: dataAudio.audioUK,
                error: ''
            });
            console.log("check res: ", this.state.result)
        } catch (error) {
            this.setState({ error: 'Word not found! Plz enter another word!' });
        }
    };

    playAudio = (audioUrl) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.log("Audio URL not available");
        }
    };

    render() {
        const { word, result, error, searchType, audioUS, audioUK } = this.state;

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
                                    onChange={(event) => { this.handleInputChange(event) }}
                                    placeholder='Enter a word'
                                />
                                <button onClick={() => { this.handleSearch() }}>Tra từ</button>
                            </div>
                            {error && <div className='search-vocabulary-input-error'>😊{error}😊</div>}

                            <div className='search-vocabulary-content'>
                                {result && result.tratu && result.tratu.length > 0 && searchType === 'dictionary' && (
                                    <div className='vocabulary-result'>
                                        <div className='vocabulary-header'>
                                            <h3>Kết quả cho "{word}"</h3>
                                        </div>

                                        <div className='audio-controls'>
                                            {audioUS && (
                                                <a onClick={() => this.playAudio(audioUS)} className="us" title="Phát âm (US)">
                                                    <i className="fas fa-volume-up"> US</i>
                                                </a>
                                            )}
                                            {audioUK && (
                                                <a onClick={() => this.playAudio(audioUK)} className="uk" title="Phát âm (UK)">
                                                    <i className="fas fa-volume-up"> UK</i>
                                                </a>
                                            )}
                                        </div>

                                        <div className='vocabulary-definition'>
                                            {result.tratu[0].fields.fulltext && this.renderDefinition(result.tratu[0].fields.fulltext)}
                                        </div>
                                    </div>
                                )}
                            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVocabulary);
