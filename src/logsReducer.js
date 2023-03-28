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
    default: {
      return [`${action} happend`, ...logs];
    }
  }
};
