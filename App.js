import React from 'react'
import { View,StyleSheet, Platform, StatusBar } from 'react-native'
import History from './components/History'
import AddEntry from './components/AddEntry'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createBottomTabNavigator, 
         createMaterialTopTabNavigator, 
         createAppContainer, 
         createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers' 

function UdaciStatusBar({backgroundColor,...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: "History",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: "Add Entry",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
  Live : {
    screen: Live,
    navigationOptions: {
      tabBarLabel: "Live",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
}
  
const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
    height: 56,
    backgroundColor: Platform.OS === "ios" ? white : purple,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
    width: 0,
    height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
    }
  }
}
  
const Tabs = Platform.OS === "ios"
  ? createAppContainer(createBottomTabNavigator(RouteConfigs, TabNavigatorConfig))
  : createAppContainer(createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig));

//Wrap with createAppContainer to work - React 3.0
const MainNavigator = createAppContainer(
  //createStackNavigator because new att - React 3.0
  createStackNavigator({
    home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    EntryDetail: {
      screen: EntryDetail,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
}));

export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',*/
  },
});