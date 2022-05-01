export interface ISaveRef {
  _ref: string;
  _type: string;
  _key: string;
}

export interface IUser {
  _type: string;
  _id: string;
  userName: string;
  save?: ISaveRef[];
}
