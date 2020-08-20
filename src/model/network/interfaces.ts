import {User} from "../entities/user";
import {
  MODEL_TYPE_SERVER,
  MODEL_TYPE,
  MODEL_TYPE_FIREBASE,
} from '../../config/constants';
import {UsersDBInteractor as FirebaseDBInteractor} from "./firebase/UsersDBInteractor";
import {UsersDBInteractor as ServerDBInteractor} from "./server/UsersDBInteractor";
import {PostsDBInteractor as FirebasePostsDBInteractor} from "./firebase/PostsDBInteractor";
import {PostsDBInteractor as ServerPostsDBInteractor} from "./server/PostsDBInteractor";
import {Post} from '../entities/post';

export interface Credentials {
  email: string;
  password: string;
}

export interface DBUsersInteractor {
  login(credentials: Credentials): Promise<{}>;

  registerNewUser(credentials: Credentials): Promise<string>;

  resetPassword(email: string): Promise<any>;

  signOut(): Promise<any>;

  isUserAuthenticated(): Promise<boolean>;

  getCurrentUserId(): Promise<string>;

  updateUser(user): Promise<any>;

  getCurrentUser(): Promise<User>;

  getUser(uid: string): Promise<User>;

  fetchAllUsers(): Promise<Array<User>>;

  getDownloadURL(uid: string): Promise<string>;
}

const firebaseInteractor = new FirebaseDBInteractor();
const serverInteractor = new ServerDBInteractor();

export function AuthApi(): DBUsersInteractor {
  if (MODEL_TYPE === MODEL_TYPE_SERVER) {
    return serverInteractor;
  } else if (MODEL_TYPE === MODEL_TYPE_FIREBASE) {
    return firebaseInteractor;
  }
}

// Posts database Interface

export interface PostItemModel {
  post: Post;
  imageUrl: string;
  avatarUrl: string;
  author: User;
}

export interface DBPostsInteractor {
  fetchAllPosts(uid: string): Promise<PostItemModel[]>;

  fetchMyPosts(): Promise<PostItemModel[]>;

  uploadData(post: Post): Promise<string>;

  assignImagesUrl(items: PostItemModel[]): Promise<PostItemModel[]>;

  getDownloadURL(postId: string): Promise<string>;
}

const firebasePostsInteractor = new FirebasePostsDBInteractor();
const serverPostsInteractor = new ServerPostsDBInteractor();

export function PostsApi(): DBPostsInteractor {
  if (MODEL_TYPE === MODEL_TYPE_SERVER) {
    return serverPostsInteractor;
  } else if (MODEL_TYPE === MODEL_TYPE_FIREBASE) {
    return firebasePostsInteractor;
  }
}
