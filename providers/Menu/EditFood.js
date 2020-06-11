import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";

import { TextInput } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Input, Overlay, Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { Spinner } from "native-base";
import RNFetchBlob from "rn-fetch-blob";

import ModalSelectFoodGroup from "./ModalSelectFoodGroup";

import BackICon from "../../assets/icon/provider/back.png";
import TickIcon from "../../assets/icon/tick.png";
import CircleIcon from "../../assets/icon/circle.png";
import ViewMore from "../../assets/icon/view_more.png";
import addIcon from "../../assets/icon/+.png";
import subIcon from "../../assets/icon/-.png";
const base_url = "http://admin.wepick.vn:20000";
export default function EditFood(props) {
  // const [data, setData] = useState(props.route.params.data);
  const [data, setData] = useState({
    descreption: null,
    discountRate: 10,
    errors: null,
    foodFoodGroupingMappings: null,
    foodFoodTypeMappings: null,
    id: 5,
    image: {
      content: null,
      errors: null,
      id: 8,
      mimeType: "application/octet-stream",
      name:
        "352332-buffet-lau-an-tha-ga-free-coca-tai-nha-hang-t-house-dai-co-viet.jpg",
      path: "/food/20200524/ba9ddc69-b8a9-4636-80f1-8a26aa0e1005.jpg",
      url:
        "/api/image/download/food/20200524/ba9ddc69-b8a9-4636-80f1-8a26aa0e1005.jpg",
    },
    imageId: 8,
    name: "Lẩu - Buffet",
    priceEach: 10000,
    status: { code: "Active", errors: null, id: 1, name: "Đang bán" },
    statusId: 1,
  });

  const [imageId, setImageId] = useState(data.imageId);
  const [image, setImage] = useState(base_url + data.image.url);
  const [priceEach, setPriceEach] = useState(data.priceEach);
  const [discountRate, setDiscountRate] = useState(data.discountRate);
  const [stateAvatar, setStateAvatar] = useState(false);
  const [size1, setSize1] = useState(false);
  const [size2, setSize2] = useState(false);
  const [size3, setSize3] = useState(false);
  const [foodGroupMapping, setFoodGroupMapping] = useState(
    data.foodFoodGroupingMappings
  );

  const [visibleFoodGroup, setvisibleFoodGroup] = useState(false);
  const [visibleChangeName, setVisibleChangeName] = useState(false);

  const increasePrice = () => {
    setPriceEach(priceEach + 1000);
  };

  const decreasePrice = () => {
    if (priceEach - 1000 >= 0) {
      setPriceEach(priceEach - 1000);
    }
  };

  const increaseDiscount = () => {
    if (data.discountRate + 1 <= 100) {
      setDiscountRate(discountRate + 1);
    }
  };

  const decreaseDiscount = () => {
    if (discountRate - 1 >= 0) {
      setDiscountRate(discountRate - 1);
    }
  };

  const setStatusId = (code) => {
    setData({ ...data, statusId: code });
  };

  const [modalName, setModalName] = useState(null);

  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };
    let photo = null;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let source = { uri: response.uri };
        setStateAvatar(true);
        RNFetchBlob.fetch(
          "POST",
          "http://admin.wepick.vn:20000/api/image/upload",
          {
            // dropbox upload headers

            "Content-Type": "multipart/form-data",
            // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
            // Or simply wrap the file path with RNFetchBlob.wrap().
          },
          [
            // element with property `filename` will be transformed into `file` in form data

            {
              name: "file",
              filename: response.fileName,
              data: RNFetchBlob.wrap(response.uri),
            },
            // custom content type
          ]
        )
          .then((res) => {
            let data = JSON.parse(res.data);
            // console.log(data.url);
            // console.log(
            //   "[INFO] Uri image: ",
            //   "http://admin.wepick.vn:20000" + data.url
            // );

            setImageId(data.id);
            setImage("http://admin.wepick.vn:20000" + data.url);

            setStateAvatar(false);
          })
          .catch((err) => {
            // error handling ..
            Alert.log("Upload error");
            console.log(err);
            setStateAvatar(false);
          });
      }
    });
  };

  const createParams = () => {
    let foodFoodTypeMappings = [];
    if (size1) {
      foodFoodTypeMappings.push({ foodTypeId: 1 });
    }

    if (size2) {
      foodFoodTypeMappings.push({ foodTypeId: 2 });
    }

    if (size3) {
      foodFoodTypeMappings.push({ foodTypeId: 3 });
    }

    let foodFoodGroupingMappings = [];

    // console.log(foodGroupMapping);
    if (foodGroupMapping) {
      for (let index = 0; index < foodGroupMapping.length; index++) {
        if (foodGroupMapping[index].isCliked) {
          foodFoodGroupingMappings.push({
            foodGroupingId: foodGroupMapping[index].id,
          });
        }
      }
    }

    let params = {
      name: data.name,
      priceEach: priceEach,
      discountRate: discountRate,
      imageId: imageId,
      statusId: data.statusId,
      descreption: data.descreption,
      foodFoodTypeMappings: foodFoodTypeMappings,
      foodFoodGroupingMappings: foodFoodGroupingMappings,
    };

    return params;
  };

  const changeFood = () => {
    let params = createParams();
    console.log("{INFO] Params: ", params);
  };

  return (
    <>
      <ModalSelectFoodGroup
        visible={visibleFoodGroup}
        setVisible={setvisibleFoodGroup}
        setFoodGroupMapping={setFoodGroupMapping}
      />
      <Overlay
        isVisible={visibleChangeName}
        onBackdropPress={() => setVisibleChangeName(false)}
        overlayStyle={{ width: 300, alignItems: "center" }}
      >
        <Input
          placeholder="Tên món ăn"
          defaultValue={data.descreption}
          onChangeText={(text) => {
            // setData({ ...data, name: text });
            setModalName(text);
          }}
        />
        <TouchableOpacity
          style={{
            width: 146,
            height: 48,
            backgroundColor: "#DC0000",
            alignItems: "center",
          }}
          onPress={() => {
            setData({ ...data, name: modalName });
            setVisibleChangeName(false);
          }}
        >
          <Text style={{ top: 10, color: "#ffffff" }}>Xong</Text>
        </TouchableOpacity>
      </Overlay>
      <ScrollView style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {stateAvatar ? (
            <View>
              <Spinner />
            </View>
          ) : (
            <Avatar
              size={150}
              // title="Ảnh"
              activeOpacity={0.7}
              source={
                image
                  ? {
                      uri: image,
                    }
                  : null
              }
              icon={{
                name: "camera",
                size: 50,
                color: "#d4d3cf",
                type: "font-awesome",
              }}
              // style={{ paddingVertical: 20 }}
              imageProps={(resizeMode = "center")}
              // showAccessory={true}
              // onAccessoryPress={() => {
              //   console.log("[INFO] Press accessoryPress");
              // }}
              onPress={() => {
                handleChoosePhoto();
              }}
              containerStyle={{ marginVertical: 20 }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              setVisibleChangeName(true);
            }}
          >
            <Text style={styles.titleImage}>
              {data.name ? data.name : "Vui lòng nhập tên món ăn"}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.title}>Các tuỳ chọn</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 13,
              paddingRight: 20,
              paddingTop: 14,
              paddingBottom: 14,
              // padding: 14,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => setSize1(!size1)}
                style={{ flexDirection: "row" }}
              >
                {!size1 ? (
                  <Image source={CircleIcon} style={styles.iconstyle} />
                ) : (
                  <Image source={TickIcon} style={styles.iconstyle} />
                )}
                <Text>Size nhỏ</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setSize2(!size2)}
                style={{ flexDirection: "row" }}
              >
                {!size2 ? (
                  <Image source={CircleIcon} style={styles.iconstyle} />
                ) : (
                  <Image source={TickIcon} style={styles.iconstyle} />
                )}
                <Text>Size vừa</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setSize3(!size3)}
                style={{ flexDirection: "row" }}
              >
                {!size3 ? (
                  <Image source={CircleIcon} style={styles.iconstyle} />
                ) : (
                  <Image source={TickIcon} style={styles.iconstyle} />
                )}
                <Text>Size lớn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Nhóm món ăn</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 14,
              position: "relative",
              flex: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 7,
                paddingLeft: 7,
              }}
              onPress={() => setvisibleFoodGroup(true)}
            >
              {/* {console.log(foodGroupMapping)} */}
              {foodGroupMapping ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={foodGroupMapping}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.cardView}>
                        {item.isCliked ? (
                          <View
                            style={{
                              // Card
                              borderRadius: 6,
                              elevation: 3,
                              backgroundColor: "#fff",
                              shadowOffset: { width: 1, height: 1 },
                              shadowColor: "#333",
                              shadowOpacity: 0.3,
                              shadowRadius: 2,
                              marginVertical: 2,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Image
                              source={TickIcon}
                              style={{
                                width: 18,
                                height: 18,
                                margin: 5,
                              }}
                            />
                            <Text
                              style={{
                                color: "#8A8F9C",
                                fontSize: 16,
                                margin: 5,
                              }}
                            >
                              {item.kindOfFood}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    );
                  }}
                />
              ) : (
                <Text>Bấm chọn</Text>
              )}
            </TouchableOpacity>
            {foodGroupMapping === null && (
              <TouchableOpacity
                style={{
                  right: 15,
                  position: "absolute",
                  flex: 3,
                  marginTop: 13,
                }}
              >
                <Image
                  source={ViewMore}
                  style={{ height: 13, width: 13 }}
                  onPress={() => setvisibleFoodGroup(true)}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 10,
              paddingRight: 10,
              color: "#8A8F9C",
              backgroundColor: "#DEDEDE",
            }}
          >
            <Text>Đơn Giá (size nhỏ)</Text>
            <Text> Khuyến mãi</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 14,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  decreasePrice();
                }}
              >
                <Image source={subIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity>
                {/* <TextInput value={data.priceEach.toString()} 
                  onChangeText={e=>{setData({...data,priceEach:parseInt(e)})}}
                /> */}

                <TextInput
                  value={priceEach.toString()}
                  onChangeText={(e) => {
                    if (e.replace(/[^0-9]/g, "").length === e.length) {
                      if (Number(e) < 0) {
                        setPriceEach(0);
                      } else {
                        setPriceEach(Number(e));
                      }

                      setInvalidPriceInput(false);
                    } else {
                      setInvalidPriceInput(true);
                    }
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  increasePrice();
                }}
              >
                <Image source={addIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text>đồng</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  decreaseDiscount();
                }}
              >
                <Image source={subIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              {/* <TextInput
                value={data.discountRate.toString()}
                onChangeText={(e) => {
                  setData({ ...data, discountRate: parseInt(e) });
                }}
              /> */}

              <TextInput
                value={discountRate.toString()}
                onChangeText={(e) => {
                  if (e.replace(/[^0-9]/g, "").length === e.length) {
                    if (Number(e) > 100) {
                      setDiscountRate(100);
                    } else if (Number(e) < 0) {
                      setDiscountRate(0);
                    } else {
                      setDiscountRate(Number(e));
                    }

                    setInvalidDiscountInput(false);
                  } else {
                    setInvalidDiscountInput(true);
                  }
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  increaseDiscount();
                }}
              >
                <Image source={addIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text>%</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Trạng thái</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingLeft: 13,
              paddingRight: 20,
              paddingTop: 14,
              paddingBottom: 14,
            }}
          >
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  setStatusId(1);
                }}
              >
                {data.statusId === 1 ? (
                  <Image source={TickIcon} style={styles.iconStyle} />
                ) : (
                  <Image source={CircleIcon} style={styles.iconStyle} />
                )}
                <Text>Đang bán</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  setStatusId(0);
                }}
              >
                {data.statusId != 1 ? (
                  <Image source={TickIcon} style={styles.iconStyle} />
                ) : (
                  <Image source={CircleIcon} style={styles.iconStyle} />
                )}
                <Text>Dừng bán</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Input
            placeholder="Mô tả"
            defaultValue={data.descreption}
            onChangeText={(text) => {
              setData({ ...data, descreption: text });
            }}
          ></Input>
        </View>

        <View style={styles.btnView}>
          <TouchableOpacity
            style={{
              width: 146,
              height: 48,
              backgroundColor: "#C7c7c7",
              alignItems: "center",
            }}
          >
            <Text style={{ top: 10 }}>Huỷ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeFood();
            }}
            style={{
              width: 146,
              height: 48,
              backgroundColor: "#DC0000",
              alignItems: "center",
            }}
          >
            <Text style={{ top: 10, color: "#ffffff" }}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },
  title: {
    paddingLeft: 10,
    color: "#8A8F9C",
    backgroundColor: "#DEDEDE",
  },
  image: {
    height: 199,
    width: 216,
    alignSelf: "center",
  },
  titleImage: {
    alignSelf: "center",
    fontFamily: "Reguler",
    fontSize: 20,
  },
  iconStyle: {
    width: 21,
    height: 21,
    marginRight: 10,
    marginLeft: 10,
  },
  iconstyle: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginLeft: 10,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 10,
  },
});
