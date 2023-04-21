export const logsReducer = (logs, action) => {
  const newStep = {
    stepNumber: action.counter ? action.counter : "DATE unknown",
    step: "Something happend",
  };
  switch (action.type) {
    case "materials": {
      newStep.step = `You've got ${action.materials} materials`;
      return [newStep, ...logs];
    }
    case "resources": {
      let gainedResources = [];
      for (let resource in action.resources) {
        gainedResources.push(`${resource}: ${action.resources[resource]}`);
      }
      newStep.step = `You've gained ${gainedResources.join(", ")}`;
      return [newStep, ...logs];
    }
    case "exploring start": {
      newStep.step = `Exploring started`;
      return [newStep, ...logs];
    }
    case "exploring stop": {
      newStep.step = `You returned to the base from the exploring`;
      return [newStep, ...logs];
    }
    default: {
      newStep.step = `${JSON.stringify(action)} happend`;
      return [newStep, ...logs];
    }
  }
};
