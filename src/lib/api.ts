const BASE = 'https://jsonplaceholder.typicode.com'

export type Post = {
  userId: User['id'],
  id: string | number,
  title: string,
  body: string
}

export type Comment = {
  postId: number,
  id: string | number,
  name: string,
  email: string,
  body: string
}

export type User = {
  id: number | string;
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

export const getPost = (id: Post['id']) => fetcher(`posts/${id}`) as Promise<Post>;
export const getPosts = () => fetcher(`posts`) as Promise<Post[]>;
export const getUsers = () => fetcher(`users`) as Promise<User[]>;
export const getUser = (id: User['id']) => fetcher(`users/${id}`) as Promise<User>;
export const getComments = () => fetcher(`comments`) as Promise<Comment[]>;
export const getPostComments = (postId: Post['id']) => fetcher(`posts/${postId}/comments`) as Promise<Comment[]>;