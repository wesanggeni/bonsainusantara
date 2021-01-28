import {
  SET_SYARAT,
} from "../constants/action-types"

const initialState = {
    dataSyarat: [],
  };
  
  const dataReducer = (state = initialState, action) => {
      switch (action.type) {
          case SET_SYARAT:{
              return {
                  ...state,
                  dataSyarat: action.payload,
                }
          }
          default:{
              return state;
          }
      }
  };
  
  export default dataReducer;