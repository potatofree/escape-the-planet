export const logs = [];
export const gameLog = (step, ...arr) => {
  const counter = arr.slice(-1)[0] + 1;
  if (step === "materials") {
    logs.unshift(`${counter} You've got ${arr[0]} materials`);
  } else if (step === "resources") {
    logs.unshift(
      `${counter}: You've got ${arr[0]
        .map((res, i) => "res_" + i + ":" + res)
        .join(", ")}`
    );
  } else {
    logs.unshift(`${step} happend with ${arr} arguments`);
  }
};
