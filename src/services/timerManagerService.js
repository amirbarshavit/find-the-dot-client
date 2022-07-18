import { getRandomNumber } from "../utils";

export const startWaitingTime = () => {
  const waitingTime = getRandomNumber(2, 5);
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve();
    }, waitingTime * 1000);
  });
};

export const startPlayTime = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
