/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Alert} from 'react-native';
import {AuthApi, PostsApi, StorageApi} from '../network/interfaces';
import {isEmpty} from '../../utils/validate';
import {User} from './user';
import {ImagePickerResponse} from 'react-native-image-picker';

export class PostDocument {
  _id: string;
  author: string;
  body: string;
  title: string;
  url: string;
  uid: string;
  created: string;
  owner: User;
}

export class Post {
  _id: string;
  author: string;
  body: string;
  title: string;
  url: string;
  uid: string;
  created: string;
  owner: User;

  imagePickerResponse: ImagePickerResponse;

  postDocument(): PostDocument {
    const doc = new PostDocument();
    doc._id = this._id;
    doc.author = this.author;
    doc.body = this.body;
    doc.title = this.title;
    doc.url = this.url;
    doc.uid = this.uid;
    doc.created = this.created;
    doc.owner = this.owner;
    return doc;
  }

  constructor(snapshot: any) {
    if (snapshot._id !== undefined) {
      this._id = snapshot._id;
    }
    this.author = snapshot.author === undefined ? '' : snapshot.author;
    this.body = snapshot.body === undefined ? '' : snapshot.body;
    this.title = snapshot.title === undefined ? '' : snapshot.title;
    this.url = snapshot.url === undefined ? '' : snapshot.url;
    this.uid = snapshot.uid === undefined ? '' : snapshot.uid;
    this.created = snapshot.updatedAt === undefined ? null : snapshot.updatedAt;
    this.owner = snapshot.owner ? snapshot.owner : null;
    this.imagePickerResponse = snapshot.imagePickerResponse ? snapshot.imagePickerResponse : null;

    this.uploadPost = this.uploadPost.bind(this);
  }

  submitOnServer(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.title === null || isEmpty(this.title)) {
        reject('Please, enter post title');
      } else if (this.body === null || isEmpty(this.body)) {
        reject(Error('Please, enter post body'));
      } else {
        try {
          const run = async () => {
            await this.uploadPost();
            resolve();
          };
          run();
        } catch (error) {
          Alert.alert('Error', `${error}`);
          reject();
        }
      }
    });
  }

  async uploadPost() {
    try {
      const user = await AuthApi().getCurrentUser();
      this.uid = user._id;
      this.author = user.username;
      const id = await PostsApi().uploadData(this.postDocument());
      if (this.imagePickerResponse) {
        const pictureUrl = await StorageApi().uploadImage(
          this.imagePickerResponse,
          id,
        );
        this.url = pictureUrl;
        console.log(`Image's url: ${this.url}`);
      }
    } catch (error) {
      throw error;
    }
  }

  update(): Promise<any> {
    return this.submitOnServer();
  }
}
