const logger = store => next => action => {
  console.group();
    console.log("The action: ", action);
    const returnValue = next(action);
    console.log("The new state: ", store.getState());
  console.groupEnd();
}

export default logger;