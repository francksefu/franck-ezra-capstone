const commentCounter = (div) => {
  let count = 0;
  div.forEach(() => {
    count += 1;
  });
  return count;
};
export default commentCounter;