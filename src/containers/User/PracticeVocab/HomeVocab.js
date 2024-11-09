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
        await this.fetchVocabInFlashcards();
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState.words !== this.state.words && this.state.currentPage !== 1) {
            await this.setState({ currentPage: 1 });
            await this.fetchVocabInFlashcards(1);
        }
    };



    fetchVocabInFlashcards = async (page = 1) => {
        const { match } = this.props;
        const { flashcardId } = match.params;
        if (flashcardId) {
            localStorage.setItem('flashcardId', flashcardId);
        }
        let res = await getVocabInFlashcardPagination(flashcardId, page);
        console.log("Kiểm tra res: ", res);
        this.setState({
            flashcardName: res.flashcard.flashcardName,
            amount: res.flashcard.amount,
            words: res.flashcard.vocabularies,

            currentPage: page,
            totalPages: Math.ceil(res.totalCount / this.state.numberOfElementPerPAge),
        })
    }

    handlePracticeClick = () => {
        this.setState({showPractice: true})
    };

    // Hàm xử lý khi chuyển trang
    handlePageChange = (newPage) => {
        this.fetchVocabInFlashcards(newPage);
    }

    render() {
        
        const { flashcardName, amount, currentPage, totalPages, words } = this.state;
        if(this.state.showPractice){
            return <Practice/>;
        }
        return (

            <React.Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                    <div className="home-vocab-container">
                        <h2>Flashcards: {flashcardName}</h2>
                        <button className="practice-button" onClick={() => { this.handlePracticeClick() }}>
                            Luyện tập flashcards
                        </button>
                        <div> <span className="pratice-count">List có {amount} từ</span></div>

                        <div className="flashcard-list">
                            {this.state.words <= 0 ? (<div>Chưa có từ vựng bạn ơi</div>)
                                :
                                (this.state.words.map((word, index) => (
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
                                )))}
                        </div>
                        <div className='pagination'>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={this.handlePageChange}
                            />
                        </div>
                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

export default HomeVocab;
