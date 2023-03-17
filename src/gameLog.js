export const logs = [];
export const gameLog = (step, ...arr) => {
  if (step === "materials") {
    logs.unshift(`You've got ${arr[0]} materials`);
  } else if (step === "resources") {
    logs.unshift(
      `You've got ${arr[0].map((res, i) => "res_" + i + ":" + res).join(", ")}`
    );
  } else {
    logs.unshift(`${step} happend with ${arr} arguments`);
  }
};
