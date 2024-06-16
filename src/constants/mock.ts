import { TPersonInfo } from "../types/types"

export const personInfoMock: TPersonInfo = {
  name:'Евгения Савченко',
  phone:'+7 (918) 078-17-05',
  email:'yysavch1@mts.ru',
  hire_date:'15.10.2020',
  position_name:'Дизайнер',
  department:'Трайб автоматизированных систем контактных центров',
  address:'Разработчики используют текст в качестве заполнителя макета страницы. Разработчики используют текст в качестве заполнителя макета страницы.'
}

export const personInfoEmptyMock: TPersonInfo = {
  name:'Имя Фамилия',
  phone:'номер телефона',
  email:'адрес электронной почты',
  hire_date:'дата найма',
  position_name:'должность',
  department:'название подразделения',
  address:'дополнительная информация'
}

export const personListMock: TPersonInfo[] = [
  personInfoMock,
  personInfoMock,
  personInfoMock,
  personInfoMock
];