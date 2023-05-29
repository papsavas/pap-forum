const BASE = 'https://jsonplaceholder.typicode.com'

export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export type Comment = {
  postId: number,
  id: number
  name: string,
  email: string,
  body: string
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const fetcher = (endpoint: string) => fetch(`${BASE}/${endpoint}`).then(r => r.json())

export const getPosts = () => fetcher(`posts`) as Promise<Post[]>;
export const getUsers = () => fetcher(`users`) as Promise<User[]>;
export const getUser = (id: number) => fetcher(`users/${id}`) as Promise<User>;
export const getComments = () => fetcher(`comments`) as Promise<Comment[]>;