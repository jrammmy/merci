import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Share,
  TouchableOpacity,
} from 'react-native';
import DefaultProfilePicture from '../assets/images/profile.png';
import Heart from '../assets/images/heart.png';
import firestore from '@react-native-firebase/firestore';

const ReviewDetail = ({
  name,
  businessName,
  submissionTime,
  experienceDetail,
  likes,
  id,
}) => {
  const [liked, setLiked] = useState(false);

  const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date(submissionTime);

  const onShare = async () => {
    const result = await Share.share({
      message: experienceDetail,
    });
    console.log(result);
  };

  function onPostLike(postId) {
    // Create a reference to the post
    const postReference = firestore().doc(`Users/${postId}`);
    return firestore().runTransaction(async (transaction) => {
      const postSnapshot = await transaction.get(postReference);
      console.log(`Likes for ${postId}: `, postSnapshot.data());
      if (!postSnapshot.exists) {
        throw 'Post does not exist!';
      } else {
        setLiked(true);
        await transaction.update(postReference, {
          likes: postSnapshot.data().likes + 1,
        });
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.topHalfInfoLeft}>
          <Image style={styles.image} source={DefaultProfilePicture} />
          <View style={{marginLeft: 5}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.businessName}>{businessName}</Text>
          </View>
        </View>
        <View style={styles.topHalfInfoRight}>
          <Text>
            {months[date.getMonth() + 1]} {date.getDay()}
          </Text>
          <Text>{date.toLocaleTimeString()}</Text>
        </View>
      </View>
      <View style={{paddingTop: 5, paddingBottom: 5}}>
        <Text>
          {liked
            ? `Liked by you and ${likes} others`
            : `Liked by ${likes} others`}
        </Text>
      </View>
      <View style={styles.bottomHalf}>
        <Text>{experienceDetail}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            onPostLike(id);
          }}>
          <Image style={styles.heart} source={Heart} />
        </TouchableOpacity>
        <Button title="Share" onPress={onShare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  businessName: {},
  topHalf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomHalf: {},
  topHalfInfoLeft: {
    marginLeft: 5,
    flexDirection: 'row',
  },
  topHalfInfoRight: {
    marginLeft: 5,
    alignItems: 'center',
  },
  heart: {
    height: 30,
    width: 30,
  },
});

export default ReviewDetail;
