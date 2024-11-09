import React, { Component } from 'react';
import './HomeVocab.scss';
import Practice from './PracticeVocab';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import Pagination from '../../../components/Pagination/Pagination';
import { getVocabInFlashcardPagination } from '../../../services/flashcardService';
class HomeVocab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPractice: false,
            flashcardName: '',
            amount: '',
            words: [],
            currentPage: 1,
            totalPages: 0,
            numberOfElementPerPAge: 8,
        };
    }

    componentDidMount = async () => {
        const { match } = this.props;
        const { flashcardId } = match.params;
        let res = await getVocabInFlashcardPagination(flashcardId, 1);
        console.log("Kiểm tra res: ", res);
        this.setState({
            flashcardName: res.flashcard.flashcardName,
            amount: res.flashcard.amount,
            words: res.flashcard.vocabularies
        })

    }

    handlePracticeClick = () => {
        this.setState({ showPractice: true });
    };

    render() {
        if (this.state.showPractice) {
            return <Practice />;
        }
        const {flashcardName, amount} = this.state;
        return (
            
            <React.Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                    <div className="home-vocab-container">
                        <h2>Flashcards: {flashcardName}</h2>
                        <button className="practice-button" onClick={this.handlePracticeClick}>
                            Luyện tập flashcards
                        </button>
                        <div> <span className="pratice-count">List có {amount} từ</span></div>

                        <div className="flashcard-list">
                            {this.state.words.map((word, index) => (
                                <div key={index} className="flashcard">
                                    <div className="word-info">
                                        <h3>{word.word} {word.partOfSpeech} <span className="pronunciation">{word.pronunciation}</span></h3>
                                        <div className="audio-icons">
                                            <div className="us" title="Phát âm (US)">
                                                <i className="fas fa-volume-up"></i>
                                                <div className='name'> US</div>

                                            </div>
                                            <div className="uk" title="Phát âm (UK)">
                                                <i className="fas fa-volume-up"></i>
                                                <div className='name'> UK</div>
                                            </div>
                                        </div>
                                        <div className='vocab-content'>
                                            <div className='vocab_name'>
                                                Định nghĩa:
                                                <div className='noidung'>{word.definition}</div>
                                            </div>
                                            <div className='vocab_name'>
                                                Ví dụ:
                                                <div className='noidung'>{word.exampleSentence}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

export default HomeVocab;
