import axios from "axios";

export const fetchData = (url: string, states: any) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const getData = async () => {
    states.setLoading(true)
    const response = await axios
      .get(
        url, {cancelToken: source.token}
      )
      try {
        states.setLoading(false)
        states.mainState(response.data)
        states.secondMainState(response.data)
        states.duplicateData(response.data)
        
        
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        }
      }   
  };
  getData();

  return () => {
    source.cancel()
  }
}