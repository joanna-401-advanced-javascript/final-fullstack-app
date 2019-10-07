export default (state = [], {type, payload}) => {
  switch(type){
    case 'SCORE_GET':
      return payload;
    case 'MATERIAL_ADD':
      return [...state, payload];
    // case 'SCORE_DELETE':
    //   return state.filter((material) => material._id !== payload._id);
    default:
      return state;
  }
};
