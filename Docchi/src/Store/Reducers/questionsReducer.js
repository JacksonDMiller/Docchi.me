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
                  return state;
            case 'QUESTION_FETCH_SUCCESS':
                  return {
                        ...state,
                        currentQuestion: action.question,
                        previousQuestion: action.previousQuestion
                  }
            case 'QUESTION_REQUESTED': return {
                  ...state,
                  previousQuestion: false
            }
            case 'QUESTION_APPROVAL_SUCCESS': return {
                  state
            }
            case 'QUESTION_APPROVAL_ERROR':
                  return {
                        state
                  }
            case 'QUESTION_REJECT_SUCCESS': return {
                  state
            }
            case 'QUESTION_REJECT_ERROR':
                  return {
                        state
                  }
            case 'QUESTIONS_FETCH_ERROR':
                  return state;
            case 'QUESTIONS_FETCH_SUCCESS':
                  return {
                        ...state,
                        submissions: action.submissions
                  }
            default:
                  return state;

      }
};

export default questionReducer;