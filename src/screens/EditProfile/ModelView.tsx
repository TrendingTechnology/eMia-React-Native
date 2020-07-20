import {User} from '../../model/entities/user';
import {isEmpty} from "../../utils/validate";
import {number} from "prop-types";

export class ModelView {
  private _user: User;
  private _imageUrl: string;
  private _localImagePath: string;
  private _update: () => void;

  constructor(update: () => void) {
    this._update = update;
    this._imageUrl = null;
    this._localImagePath = null;
    this.submitData = this.submitData.bind(this);
  }

  set user(newValue: User) {
    this._user = newValue;
  }

  get user(): User {
    return this._user;
  }

  updateView() {
    this._update();
  }

  renderView() {
    this.setUpImage().then(() => {
      this.updateView();
    });
  }

  get title(): string {
    return this.name;
  }

  // Name
  get name(): string {
    return this._user.username === undefined ? '' : this._user.username;
  }

  set name(newValue) {
    this._user.username = newValue;
    this.updateView();
  }

  // Address
  get address(): string {
    return this._user.address;
  }

  set address(newValue) {
    this._user.address = newValue;
    this.updateView();
  }

  // Gender
  get gender(): string {
    return  this._user.gender === null ? '' : this._user.gender.toString();
  }

  set gender(newValue) {
    if (isEmpty(newValue)) {
      this._user.gender = null;
    } else {
      this._user.gender = +newValue;
    }
    this.updateView();
  }

  // Year of birth
  get yearBirth(): string {
    return this._user.yearbirth === null ? '' : this._user.yearbirth.toString();
  }

  set yearBirth(newValue) {
    if (isEmpty(newValue)) {
      this._user.yearbirth = null;
    } else {
      this._user.yearbirth = +newValue;
    }
    this.updateView();
  }

  // Email
  get email(): string {
    return this._user.email;
  }

  set email(newValue) {
    this._user.email = newValue;
    this.updateView();
  }

  // Image
  set imageUrl(newValue: string) {
    this._imageUrl = newValue;
  }

  set localImagePath(newValue: string) {
    this._localImagePath = newValue;
  }

  setUpImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._user
        .getDownloadURL()
        .then((url) => {
          this._imageUrl = url as string;
          resolve(this._imageUrl);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Send user data on server
  submitData() {
    const _this = this;
    return new Promise((resolve, reject) => {
      if (isEmpty(_this.name)) {
        reject('Please, enter your name');
      } else {
        _this._user.update(_this._localImagePath, (result) => {
          resolve();
        });
      }
    });
  }
}
