import React, { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import { Overlay,Button} from 'react-native-elements'
export default function (props) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={{ backgroundColor: '#c3c3c3' }}>
      <Overlay
        visible={modalVisible}
        overlayStyle={{
          width: "100%",
          height: 150,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={styles.container}>
          <Button
            buttonStyle={{ ...styles.btnView }}
            titleStyle={{ fontFamily: 'Regular', fontSize: 20, color: 'black' }}
            title='Tuỳ chỉnh'
          />
          <Button
            buttonStyle={{ ...styles.btnView }}
            titleStyle={{ fontFamily: 'Regular', fontSize: 20, color: '#DC0000' }}
            title='Xoá'
          />
          <Button
            buttonStyle={{ ...styles.btnView }}
            titleStyle={{ fontFamily: 'Regular', fontSize: 20, color: 'black' }}
            title='Quay lại'
          />
        </View>
      </Overlay>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowRadius: 10,
  },
  content: {
    backgroundColor: "#AFAFAF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnView: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  }
})