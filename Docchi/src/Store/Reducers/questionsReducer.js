const initState = {}

const questionReducer = (state = initState, action) => {
      switch (action.type) {
            case 'QUESTION_SUBMIT_SUCCESS':
                  return {
                        state,
                  }

            case 'QUESTION_SUBMIT_ERROR':
                  console.log(action.err);
                  return state;
            case 'QUESTION_UPDATE_SUCCESS':
                  return {
                        ...state,
                        
                  }
            case 'QUESTION_UPDATE_ERROR':
                  console.log(action.err)
                  return {
                        state,
                  }
            case 'QUESTION_FETCH_ERROR':
                  console.log(action)
                  return state;
            case 'QUESTION_FETCH_SUCCESS':
                  console.log(action)
                  return {
                        ...state,
                        currentQuestion: action.question,
                        previousQuestion: action.previousQuestion
                  };
            default:
                  return state;

      }
};

export default questionReducer;