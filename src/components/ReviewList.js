import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import ReviewDetail from './ReviewDetail';

const ReviewList = ({reviews}) => {
  const list = reviews.map((review, index) => {
    return (
      <ReviewDetail
        key={reviews[index]._data.id}
        name={reviews[index]._data.giverName}
        businessName={reviews[index]._data.businessName}
        submissionTime={reviews[index]._data.submissionTime}
        experienceDetail={reviews[index]._data.experienceDetail}
        likes={reviews[index]._data.likes}
        id={reviews[index]._data.id}
      />
    );
  });

  return <View>{list}</View>;
};

export default ReviewList;
