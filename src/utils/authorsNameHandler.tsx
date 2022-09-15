export function authorsNameHandler(authorsName: string[]) {
  const resultString = [];
  for (let i = 0; i < authorsName.length; i++) {
    if (i === authorsName.length - 1) {
      resultString.push(<u>{authorsName[i]}</u>);
    } else {
      resultString.push(<><u>{authorsName[i]}</u> /&nbsp;</>);
    }
  }
  return resultString;
}

