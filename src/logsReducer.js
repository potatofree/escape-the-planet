export const logsReducer = (logs, action) => {
  switch (action.type) {
    case "materials": {
      const newStep = `${action.counter} You've got ${action.materials} materials`;
      return [newStep, ...logs];
    }
    case "resources": {
      const newStep = `${action.counter}: You've got ${action.resources
        .map((res, i) => "res_" + i + ":" + res)
        .join(", ")}`;
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
