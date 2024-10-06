import axios from "../axios"

const getSearchVocabularyApi = async (word, language) => {
    return await axios.get('/api/search-vocabulary', {
        params: {
            word: word,
            language: language
        }
    })
};

export {
    getSearchVocabularyApi,
}


