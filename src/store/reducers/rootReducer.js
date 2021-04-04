import * as actionTypes from '../actions/actionTypes';

const initialState = {
  categoryDatas: [],
  toDoCards: [],
  copiedToDoCards: [],
  isChecked: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CARD_CREATED: {
      return {
        ...state,
        toDoCards: state.toDoCards.concat(action.toDoCard),
      };
    }

    case actionTypes.CARD_SAVED: {
      const updatedToDoCards = [...state.toDoCards];
      const cardIndex = updatedToDoCards.findIndex(
        card => card.id === action.cardId
      );
      const updatedCard = { ...updatedToDoCards[cardIndex] };
      updatedCard.isSaved = !updatedCard.isSaved;
      updatedToDoCards[cardIndex] = updatedCard;
      return {
        ...state,
        toDoCards: updatedToDoCards,
      };
    }

    case actionTypes.CARD_EDITTED: {
      const updatedToDoCards = [...state.toDoCards];
      const cardIndex = updatedToDoCards.findIndex(
        card => card.id === action.cardId
      );
      const updatedCard = { ...updatedToDoCards[cardIndex] };
      updatedCard.isSaved = !updatedCard.isSaved;
      updatedToDoCards[cardIndex] = updatedCard;
      return {
        ...state,
        toDoCards: updatedToDoCards,
      };
    }

    case actionTypes.CARD_DELETED: {
      const updatedToDoCards = [...state.toDoCards];
      const cardIndex = updatedToDoCards.findIndex(
        card => card.id === action.cardId
      );
      updatedToDoCards.splice(cardIndex, 1);
      return {
        ...state,
        toDoCards: updatedToDoCards,
      };
    }

    case actionTypes.CATEGORY_ADDED: {
      const card = state.toDoCards.find(card => card.id === action.cardId);
      const categoryData = { category: card.category, cardId: card.id };
      const hasSameCardId = state.categoryDatas.some(
        categData => categData.cardId === categoryData.cardId
      );
      if (hasSameCardId) return state;
      return {
        ...state,
        categoryDatas: state.categoryDatas.concat(categoryData),
      };
    }

    case actionTypes.CATEGORY_CHANGED: {
      const updatedToDoCards = [...state.toDoCards];
      const cardIndex = updatedToDoCards.findIndex(
        card => card.id === action.cardId
      );
      const updatedCard = { ...updatedToDoCards[cardIndex] };
      updatedCard.category = action.category;
      updatedToDoCards[cardIndex] = updatedCard;
      ///
      return {
        ...state,
        toDoCards: updatedToDoCards,
      };
    }

    case actionTypes.TASK_ADDED: {
      const updatedToDoCards = [...state.toDoCards];
      const cardIndex = updatedToDoCards.findIndex(
        card => card.id === action.cardId
      );
      const updatedCard = { ...updatedToDoCards[cardIndex] };
      const updatedTasks = [...updatedCard.tasks];
      updatedTasks.push(action.taskName);
      ///
      updatedCard.tasks = updatedTasks;
      updatedToDoCards[cardIndex] = updatedCard;
      return {
        ...state,
        toDoCards: updatedToDoCards,
      };
    }

    case actionTypes.TASK_DELETED:
      const updatedToDoCards = [...state.toDoCards];
      const cardIndex = updatedToDoCards.findIndex(
        card => card.id === action.cardId
      );
      const updatedCard = { ...updatedToDoCards[cardIndex] };
      const updatedTasks = [...updatedCard.tasks];
      updatedTasks.splice(action.taskIndex, 1);
      ///
      updatedCard.tasks = updatedTasks;
      updatedToDoCards[cardIndex] = updatedCard;
      return {
        ...state,
        toDoCards: updatedToDoCards,
      };

    case actionTypes.CHECKBOX_CHANGED:
      const newChecked = !state.isChecked;
      if (newChecked) {
        const copiedToDoCards = [...state.toDoCards];
        console.log('copiedToDoCards', copiedToDoCards);
        const correspondingCards = state.toDoCards.filter(
          card => card.category === action.category
        );
        console.log('correspondingCards', correspondingCards);

        return {
          ...state,
          isChecked: newChecked,
          copiedToDoCards: [...copiedToDoCards],
          toDoCards: [...correspondingCards],
        };
      } else {
        return {
          ...state,
          isChecked: newChecked,
          toDoCards: [...state.copiedToDoCards],
        };
      }

    default:
      return state;
  }
};

export default reducer;