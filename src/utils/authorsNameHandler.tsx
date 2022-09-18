export function authorsNameHandler(authorsName: string) {
  const arrayOfNames = authorsName.split(',');
  const resultString = [];
  for (let i = 0; i < arrayOfNames.length; i++) {
    if (i === arrayOfNames.length - 1) {
      resultString.push(<u>{arrayOfNames[i]}</u>);
    } else {
      resultString.push(<><u>{arrayOfNames[i]}</u> /&nbsp;</>);
    }
  }
  return resultString;
}

