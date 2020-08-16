import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, Button, Dimensions, TextInput, FlatList } from 'react-native';

import 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    content: {book: 'Demo Default Book', due: "07/20/20", lentTo: 'Peter Chepkwony', checked: "out"},
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    content: {book: 'Another Default Book', due: "07/20/20", lentTo: 'Katya Petrovna', checked: "out"},
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    content: {book: 'Fantastic Defaults and Where to Find Them', due: "07/20/20", lentTo: 'John Brown', checked: "out"},
  },
];

const DATA2 = [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      content: {book: 'Fantastic Defaults and Where to Find Them', due: "07/20/20", lentTo: 'John Brown', checked: "in"},
    },
];

const Item = ({ content }) => (
  <View style={styles.item}>
    <View style={{width: '100%'}}>
      <Text style={styles.itemContentBook}>Book: <Text style={styles.bold}>{content.book}</Text></Text>
      <Text style={styles.itemContent}>Lent to: <Text style={styles.bold}>{content.lentTo}</Text></Text>
      <Text style={styles.itemContentDate}>Due: <Text style={styles.bold}>{content.due}</Text></Text>
    </View>
    <View style={styles.returnView}>
      <Button style={styles.returnText} color='#ACB143' title="Return" onPress={() => alert("Confirm Return")}>Return</Button>
    </View>
  </View>
);

const HistoryItem = ({ content }) => (
  <View style={styles.item}>
    <View style={{width: '100%'}}>
      <Text style={styles.itemContentBook}>Book: <Text style={styles.bold}>{content.book}</Text></Text>
      <Text style={styles.itemContent}>Lent to: <Text style={styles.bold}>{content.lentTo}</Text></Text>
      <Text style={styles.itemContentDate}>Due: <Text style={styles.bold}>{content.due}</Text></Text>
    </View>
  </View>
);

function ListItems(dataSet){
  const [text, setText] = useState();
  const[data, setData] = useState();
  const[testData, setTestData] = useState(DATA);
  const[shownData, setShownData] = useState();

  const renderItem = ({ item }) => (
    <Item content={item.content} />
  );

  useEffect( () => {
        const subscriber = firestore()
               .collection('users')
               .doc(auth().currentUser.uid)
                 .collection('checkedOut')
                 .onSnapshot(() => { querySnapshot => {
                    const data = [];
                    console.log(querySnapshot);
                    querySnapshot.forEach(documentSnapshot => {
                       data.push( documentSnapshot.data() );
                    });

                    setData(data);
                    setShownData(DATA2);
                 }
                 });
        return  () => subscriber()
  }, []);

  function searchFilterFunction(){
    //passing the inserted text in textinput
         const newData = testData.filter(function(item) {
           //applying filter for the inserted text in search bar
           const itemData = item.content.book ? item.content.book.toUpperCase() : ''.toUpperCase();
           let textData = '';
           let analyzeText = text;
           if (analyzeText != ''){ textData = analyzeText.toUpperCase(); }
           return itemData.indexOf(textData) > -1;
         });

     setShownData(newData);

     var query = firestore().collection('users').doc(auth().currentUser.uid).collection('checkedOut').where("title", ">=", text)
     query.get().then(function(querySnapshot) { setData(querySnapshot.docs);} )
     .catch(err => {console.log(err)});
  }

  return(
  <View style={styles.body}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={setText}
              value={text}
              underlineColorAndroid="transparent"
              placeholder="Search Books"
              onSubmitEditing={searchFilterFunction}
            />
            <FlatList
            data={testData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20}}
          />
    </View>);
}

function ListHistory(){
  const [text, setText] = useState();
  const[data, setData] = useState(DATA2);
  const[shownData, setShownData] = useState();

  const renderItem = ({ item }) => (
    <HistoryItem content={item.content} />
  );

  useEffect( () => {
        return  () => { console.log("clean up") }
  }, []);

  function searchFilterFunction(){
     //passing the inserted text in textinput
     const newData = data.filter(function(item) {
       //applying filter for the inserted text in search bar
       const itemData = item.content.book ? item.content.book.toUpperCase() : ''.toUpperCase();
       let textData = '';
       let analyzeText = text;
       if (analyzeText != ''){ textData = analyzeText.toUpperCase(); }
       return itemData.indexOf(textData) > -1;
     });
     console.log(newData);
     setShownData(newData);
  }

  return(
  <View style={styles.body}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={setText}
              value={text}
              underlineColorAndroid="transparent"
              placeholder="Search Books"
              onSubmitEditing={searchFilterFunction}
            />
            <FlatList
            data={shownData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20}}
          />
    </View>);
}


function Home() {
const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Checked-Out' },
    { key: 'second', title: 'History' },
  ]);

  const renderScene = SceneMap({
    first: ListItems,
    second: ListHistory,
  } );


  return (
        <TabView
              navigationState={{ index, routes }}
               renderScene={renderScene}
              onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={(props) =>
                              <TabBar
                                {...props}
                                style={{backgroundColor: "#6D5F22", height: 40}}
                                indicatorStyle={{backgroundColor: "#C1C76B"}}
                              />
                            }
            />
  );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    flex: 1,
    padding: 8,
    backgroundColor: '#fff7d6',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
   item: {
    backgroundColor: '#FFD6AD',
    padding: 20,
    width: '95%',
    marginVertical: 8,
    marginLeft: '2.55%',
    borderRadius: 6,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 2.62,
  },
  itemContentBook: {
    fontSize: 14,
    paddingBottom: 3,
    color: '#525252',
  },
  itemContent: {
    fontSize: 12,
     color: '#525252',
  },
  itemContentDate: {
    fontSize: 18,
    paddingTop: 3,
    paddingBottom: 3,
    color: '#525252',
  },
  bold: {
    fontWeight: 'bold',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#C1C76B',
    backgroundColor: '#FFFFFF',
  },
  returnText: {
    marginTop: '0%',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff9935'
    },
    returnView: {
      paddingTop: '5%',
      width: '100%',
      textAlign: 'right',
    }
});


export default Home;