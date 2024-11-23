import axios from "../axios"

const getSearchVocabularyApi = async (word, language) => {
    return await axios.get('/api/search-vocabulary', {
        params: {
            word: word,
            language: language
        }
    })
};

const getAudioVocabularyApi = async (word) => {
    return await axios.get('/api/audio-vocabulary', {
        params: {
            word: word
        }
    })
};

const createVocabularyInFlashcard = (data) => {
    return axios.post('/api/create-vocabulary-in-flashcard', data);
}


export {
    getSearchVocabularyApi,
    getAudioVocabularyApi,
    createVocabularyInFlashcard,
    
}


