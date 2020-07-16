// EditProfile

import React, {
  FunctionComponent,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import ReactNative from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Button, Icon, Text, Label} from 'native-base';
import styles from './styles';
import {ImageViewer} from '../../components/ImageViewer';
import {ModelView} from './ModelView';
import {useTheme} from 'react-native-paper';
import {color} from '../../theme/styles';
import {User} from '../../model/entities/user';
import {downloadCurrentUserData} from '../../model/dbinteractor/users/dbinteractor';
import inputText from "../../components/InputText/InputText";

const {View, ScrollView} = ReactNative;

export const EditProfile: FunctionComponent = ({route, navigation}) => {
  const nameLabelText = 'Name:';
  const addressLabelText = 'Address:';
  const genderLabelText = 'Gender:';
  const yearBirthLabelText = 'Year:';
  const emailLabelText = 'Email:';
  const darkTheme = useTheme().dark;

  const newUser = route.params.newUser;
  const completion = route.params.completion;
  const [state, setState] = useState(false);
  const [user, setUser] = useState<User>(newUser === null ? new User('', '') : newUser);
  const modelView = new ModelView(() => {
    setState((_state) => !_state);
  });
  modelView.user = user;

  useEffect(() => {
    downloadCurrentUserData((_user) => {
      if (_user === null) {
        return;
      }
      setUser(_user);
      modelView.user = _user;
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setParams({
      title: modelView.title,
    });
    navigation.setOptions({
      headerRight: () => (
        <Icon
          style={styles.rightBarButton}
          name={'ios-done-all'}
          onPress={() => {
            doneButtonPressed();
          }}
        />
      ),
    });
  }, [navigation]);

  function takePhotoButtonPressed() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        modelView.imageUrl = response.uri;
      }
    });
  }

  function doneButtonPressed() {
    modelView.submitData().then(() => {
      if (completion === null) {
        navigation.goBack();
      } else {
        completion();
      }
    });
  }

  return (
    <View
      style={[styles.container, {backgroundColor: darkTheme ? color.dark : color.white}]}>
      <ScrollView style={[styles.content]}>
        {inputText(nameLabelText, 'Type your name', modelView.name, darkTheme,(text) => {
          modelView.name = text;
        })}
        {inputText(addressLabelText, 'Type your address', modelView.address, darkTheme, (text) => {
          modelView.address = text;
        })}
        {inputText(genderLabelText, 'Type your gender', +modelView.gender, darkTheme, (text) => {
          modelView.gender = +text;
        })}
        {inputText(yearBirthLabelText, 'Type your year of birth', +modelView.yearBirth, darkTheme, (text) => {
          modelView.yearBirth = text;
        })}
        {inputText(emailLabelText, 'Type your email', modelView.email, darkTheme, (text) => {
          modelView.email = text;
        })}
        <Button
          block
          info
          style={styles.button}
          onPress={() => takePhotoButtonPressed()}>
          <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
        </Button>
        {!modelView.isImageEmpty && (
          <View>
            <ImageViewer
              imageStyle={styles.image}
              disabled={false}
              source={{uri: modelView.imageUrl}}
              downloadable={true}
              doubleTapEnabled={true}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
