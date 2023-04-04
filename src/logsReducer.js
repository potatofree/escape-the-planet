export const logsReducer = (logs, action) => {
  switch (action.type) {
    case "materials": {
      const newStep = `${action.counter} You've got ${action.materials} materials`;
      return [newStep, ...logs];
    }
    case "resources": {
      let gainedResources = [];
      for (let resource in action.resources) {
        gainedResources.push(`${resource}: ${action.resources[resource]}`);
      }
      const newStep = `${action.counter} You've gained ${gainedResources.join(
        ", "
      )}`;
      return [newStep, ...logs];
    }
    case "exploring start": {
      const newStep = `${action.counter}: Exploring started`;
      return [newStep, ...logs];
    }
    case "exploring stop": {
      const newStep = `${action.counter}: You returned to the base from the exploring`;
      return [newStep, ...logs];
    }
    default: {
      return [`${JSON.stringify(action)} happend`, ...logs];
    }
  }
};
