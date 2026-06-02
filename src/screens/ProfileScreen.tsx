// import React, { useState } from 'react'
// import { Alert, Text, TextInput } from 'react-native'
// import SafeAreaViewWrapper from '../components/SafeAreaViewWrapper'
// import { useLazyGetPostByIdQuery } from '../store/api/getPostApi'
// import { ActivityIndicator } from 'react-native-paper'
// import Button from '../components/Button'

// export default function ProfileScreen() {
//   const [id, setId] = useState<number>()
//   const [getPost, { isLoading, data, isError, error }] = useLazyGetPostByIdQuery()
//   return (
//     <SafeAreaViewWrapper>
//       <TextInput
//         onChangeText={(id) => setId(Number(id))}
//         style={{
//           borderWidth: 1,
//           marginVertical: 12,
//           borderRadius: 12
//         }}
//         placeholder='Enter post id' />

//       <Button
//         loading={isLoading}
//         onPress={() => {
//           if (!id || id <= 0) {
//             Alert.alert("Invalid ID");
//             return;
//           }
//           getPost(id);
//         }} btntitle='Search' />
//       {isLoading ? (
//         <ActivityIndicator />
//       ) : isError ? (
//         <Text style={{ color: "red" }}>
//           {JSON.stringify(error)}
//         </Text>
//       ) : (
//         <>
//           <Text>{data?.title}</Text>
//           <Text>{data?.userId}</Text>
//           <Text>{data?.id}</Text>
//           <Text>{data?.body}</Text>
//         </>
//       )}

//     </SafeAreaViewWrapper>
//   )
// }
import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useGetPostInfiniteQuery } from "../store/api/getInfinite"

export default function ProfileScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetPostInfiniteQuery();

  const posts =
    data?.pages.flatMap(page => page.items) ?? [];

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 15,paddingVertical:40 }}>
          <Text>{item.title}</Text>
        </View>
      )}

      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}

      onEndReachedThreshold={0.5}

      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator />
        ) : null
      }
    />
  );
}