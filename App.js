import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ReviewList from './src/components/ReviewList';

function App() {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    firestore()
      .collection('Users')
      .get()
      .then((querySnapshot) => {
        setReviews(querySnapshot.docs);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ReviewList reviews={reviews} />
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});

export default App;
