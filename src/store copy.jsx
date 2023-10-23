import { createStore, combineReducers } from "redux";

//step 1 : create state
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// step 2 : create reducer
const accountReducer = function (state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

const customerReducer = function (state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};

// step 4 : create store
// const store = createStore(accountReducer); // for one reducer only

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
}); // for more than 1 reducer

const store = createStore(rootReducer);

//  4.1 dispatch / getState/ store.
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 2000,
//     purpose: "buy a new system",
//   },
// });

// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// step 5 : ACTION CREATORS (developer convention) optional

function deposit(amount) {
  //   return { type: "account/deposit", payload: amount };
  store.dispatch({ type: "account/deposit", payload: amount });
}
function withdraw(amount) {
  //   return { type: "account/withdraw", payload: amount };
  store.dispatch({ type: "account/withdraw", payload: amount });
}
function requestLoan(amount, purpose) {
  //   return {
  //     type: "account/requestLoan",
  //     payload: {
  //       amount: amount,
  //       purpose: purpose,
  //     },
  //   };

  store.dispatch({
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  });
}
function payLoan() {
  //   return { type: "account/payLoan" };
  store.dispatch({ type: "account/payLoan" });
}

//action creators for customer

function createCustomer(fullName, nationalID) {
  store.dispatch({
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  });
}
function updateName(fullName) {
  store.dispatch({ type: "customer/updateName", payload: fullName });
}
