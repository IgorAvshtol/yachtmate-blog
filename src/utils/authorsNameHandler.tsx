import { IAuthorsName } from '../interfaces';

export function authorsNameHandler(authorsName: IAuthorsName[]) {
  const resultString = [];
  for (let i = 0; i < authorsName.length; i++) {
    if (i === authorsName.length - 1) {
      resultString.push(<u>{authorsName[i].name}</u>);
    } else {
      resultString.push(<><u>{authorsName[i].name}</u> /&nbsp;</>);
    }
  }
  return resultString;
}

