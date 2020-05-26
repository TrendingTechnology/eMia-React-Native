import {database} from '@model/firebase/config';
import {getDownloadURL} from '@model/firebase/storage/api';

// Create new user object in realtime database
export function createUser(user, callback) {
  database
    .ref('main')
    .child('users')
    .child(user.user.uid)
    .update({...user})
    .then(() => {
      callback(true, null, null);
    })
    .catch((error) => {
      callback(false, null, {message: error});
    });
}

// Get user object from the realtime database
export function getUser(uid, callback) {
  console.log('API. getUser uid=', uid);
  database
    .ref('main')
    .child('users')
    .child(uid)
    .once('value')
    .then(function (snapshot) {
      let exists = snapshot.val() != null;
      if (exists) {
        const user = snapshot.val();
        const data = {exists, user};
        callback(true, data, null);
      } else {
        callback(false, null, null);
      }
    })
    .catch((error) => {
      console.log('API. GET USER error: ', error.message);
      callback(false, null, error);
    });
}

export function fetchAllUsers(callback) {
  console.log('API. fetchAllUsers');
  database
    .ref('main')
    .child('users')
    .once('value')
    .then(function (snapshot) {
      var items = [];
      if (snapshot.val() !== null) {
        snapshot.forEach((child) => {
          items.push({
            value: child.val(),
            key: child.key,
          });
        });
      }
      const data = {items};
      callback(data, null);
    })
    .catch((error) => callback(null, error));
}

export function fetchAllPosts(callback) {
  console.log('API. fetchAllPosts');
  database
    .ref('main')
    .child('posts')
    .once('value')
    .then(function (snapshot) {
      var items = [];
      parsePosts(snapshot, items);
      putUrlsPhoto(items, callback);
    })
    .catch((error) => callback(null, error));
}

function parsePosts(snapshot, items) {
  console.log('API. parsePosts');
  if (snapshot.val() !== null) {
    snapshot.forEach((child) => {
      items.push({
        value: child.val(),
        url: '',
        avatarUrl: '',
        author: null,
        key: child.key,
      });
    });
  }
}

function putUrlsPhoto(items, completion) {
  console.log('API. putUrlsPhoto');
  var counter = items.length;
  if (counter > 0) {
    items.forEach((item) => {
      var photoName = item.value.id + '.jpg';
      getDownloadURL(photoName, function (url) {
        item.url = url;
        var avatarName = item.value.uid + '.jpg';
        getDownloadURL(avatarName, function (_url) {
          item.avatarUrl = _url;
          getUser(item.value.uid, function (user) {
            item.author = user;
            counter -= 1;
            if (counter === 0) {
              const data = {items};
              completion(data, null);
            }
          });
        });
      });
    });
  } else {
    const data = {items};
    completion(data, null);
  }
}