import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // 전체 네비게이션을 감싸는 컨테이너 불러오기
import { createStackNavigator } from "@react-navigation/stack"; // 스택 네비게이션 라이브러리 불러오기

// 각각 보여줄 화면들 불러오기
import Home from "./screens/Home";
import Add from "./screens/Add";

// 스택 네비게이션 만들기
const Stack = createStackNavigator();

/*
  NavigationContainer을 사용해, 전체 네비게이션을 감싼다.
  Stack.Navigator을 사용해, 스택 네비게이션으로 보여줄 화면을 감싼다.
  Stack.Screen을 사용해, 스택 네비게이션으로 보여줄 화면(React 컴포넌트 형식)을 지정해준다.

  스택 네이게이션은, 기본적으로 맨위에 작성한 화면을 보여준다. (메인화면)
*/
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
                  cardStyle: {
                      backgroundColor: '#FDE1DE'
                  }
              }}>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Add" component={Add} options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
