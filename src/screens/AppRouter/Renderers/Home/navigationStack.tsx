/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {useState, useMemo} from 'react';
import {Appearance} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'native-base';
import {color} from '../../../../theme/styles';

import {DrawerContent} from '../Drawer/MenuContent';

import Home from '../../../Home/Home';
import PostPreview from '../../../Home/PostPreview';
import AddNewPost from '../../../Home/AddNewPost';
import Options from '../../../Home/Options';
import EditProfile from '../../../EditProfile';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {AppContext} from '../../../../components/other/context';
import CategoryPicker from '../../../../components/CategoryPicker';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function toggleDrawer(props) {
  props.navigation.toggleDrawer();
}

function Root(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: color.brand,
        },
        headerTintColor: color.white,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'normal',
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'eMia-React Native',
          headerLeft: () => (
            <Icon
              style={{color: color.white, marginLeft: 8}}
              name={'list'}
              type="Foundation"
              onPress={() => {
                toggleDrawer(props);
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PostPreview"
        component={PostPreview}
        options={{title: ''}}
      />
      <Stack.Screen
        name="CategoryPicker"
        component={CategoryPicker}
        options={{title: ''}}
      />
      <Stack.Screen
        name="YearsPicker"
        component={CategoryPicker}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AddNewPost"
        component={AddNewPost}
        options={{title: 'New Post'}}
      />
      <Stack.Screen name="Options" component={Options} options={{title: 'Filter'}}/>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: 'My Profile'}}
      />
    </Stack.Navigator>
  );
}

export function homeNavigationStack() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={Root} />
    </Drawer.Navigator>
  );
}

export default function mainNavigation() {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: color.dark,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: color.dark,
      text: '#ffffff',
    },
  };

  const colorScheme = Appearance.getColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  Appearance.addChangeListener(() => {
    setIsDarkTheme(Appearance.getColorScheme() === 'dark');
  });
  const appContext = useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }), []);

  return (
    <PaperProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <NavigationContainer theme={theme}>
          {homeNavigationStack()}
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  );
}
