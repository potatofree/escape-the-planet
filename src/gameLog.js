export const logs = [];
export const gameLog = (step, ...arr) => {
  if (step === "materials") {
    logs.unshift(`You have get ${arr[0]} materials`);
  } else {
    logs.unshift(`${step} happend with ${arr} arguments`);
  }
};
