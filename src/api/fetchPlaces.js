import axios from 'axios';

const fetchPlaces = async (term) => {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json`,
      {
        headers: {
          Authorization: `KakaoAK d7bc1cd4f37041f376771eb9024c1c51`,
        },
        params: {
          query: term,
        },
      }
    );
    return response.data.documents;
  };

  export default fetchPlaces;