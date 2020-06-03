import React, { useState, useEffect } from "react";
import { View, StyleSheet, YellowBox, Text } from "react-native";
import { Button as ButtonE, Overlay } from "react-native-elements";

import homeServices from "../customerServices/homeServices";

import HeaderImage from "../components/cardList/headerCardList";
import CardList from "../components/cardList/cardList";
import NavBar from "../components/cardList/NavBar";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from "../components/Spinner/Spinner";

import { Fab, Icon, Button } from "native-base";

export default function (props) {
  //   Id	Name
  // 1	Lẩu - Buffet
  // 2	Hải sản
  // 3	Rau củ
  // 4	Thịt
  // 5	Đồ uống

  // Id	Name
  // 1	Size nhỏ
  // 2	Size vừa
  // 3	Size lớn
  const [foodGroupType, _] = useState({
    lau: 1,
    haisan: 2,
    raucu: 3,
    thit: 4,
    douong: 5,
  });

  const [isLoadingAllDish, setIsLoadingAllDish] = useState(true);
  const [isLoadingFavourite, setIsLoadingFavourite] = useState(true);
  const [isLoadingRecently, setIsLoadingRecently] = useState(true);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [isLoadingLau, setIsLoadingLau] = useState(true);
  const [isLoadingHaisan, setIsLoadingHaisan] = useState(true);
  const [isLoadingRaucu, setIsLoadingRaucu] = useState(true);
  const [isLoadingThit, setIsLoadingThit] = useState(true);
  const [isLoadingDouong, setIsLoadingDouong] = useState(true);

  const [listAllDish, setListAllDish] = useState(null);
  const [listFavorite, setListFavourite] = useState(null);
  const [listRecently, setListRecently] = useState(null);
  const [listTop, setListTop] = useState(null);
  const [listLau, setListLau] = useState(null);
  const [listHaisan, setListHaisan] = useState(null);
  const [listRaucu, setListRaucu] = useState(null);
  const [listThit, setListThit] = useState(null);
  const [listDouong, setListDouong] = useState(null);

  const [visible, setVisible] = useState(false);
  const [visibleLoading, setVisibleLoading] = useState(true);
  const [checkProfile, setCheckProfile] = useState(false);

  const [activeFab, setActiveFab] = useState(false);

  const [listLikedDish, setListLikedDish] = useState(
    props.route.params.response.account_AccountFoodFavorites
  );

  const [delaySearch, setDelayDearch] = useState(0);

  useEffect(() => {
    if (!checkProfile) {
      setCheckProfile(true);
      if (props.route.params.response.dob === null) {
        _showModal();
      }
    }

    if (isLoadingFavourite === true) {
      fetchFavourite();
      // setIsLoadingFavourite(false);
    }
    if (isLoadingRecently === true) {
      fetchRecently();
      // setIsLoadingRecently(false);
    }
    if (isLoadingTop === true) {
      fetchTop();
      // setIsLoadingTop(false);
    }
    if (isLoadingLau === true) {
      fetchLau();
      //  setIsLoadingLau(false);
    }
    if (isLoadingHaisan === true) {
      fetchHaisan();
      // setIsLoadingHaisan(false);
    }
    if (isLoadingRaucu === true) {
      fetchRaucu();
      // setIsLoadingRaucu(false);
    }
    if (isLoadingThit === true) {
      fetchThit();
      // setIsLoadingThit(false);
    }
    if (isLoadingDouong === true) {
      fetchDouong();
      // setIsLoadingDouong(false);
    }
    if (isLoadingAllDish === true) {
      fetchAllDish();
    }
  }, []);

  const fetchFavourite = () => {
    getListFoods(-3).then((data) => {
      setListFavourite(data);
      setIsLoadingFavourite(false);
    });
  };

  const fetchRecently = () => {
    getListFoods(-2).then((data) => {
      setListRecently(data);
      setIsLoadingRecently(false);
    });
  };

  const fetchTop = () => {
    getListFoods(-1).then((data) => {
      setListTop(data);
      setIsLoadingTop(false);
    });
  };

  const fetchLau = () => {
    getListFoods(1).then((data) => {
      setListLau(data);
      setIsLoadingLau(false);
    });
  };

  const fetchHaisan = () => {
    getListFoods(2).then((data) => {
      setListHaisan(data);
      setIsLoadingHaisan(false);
    });
  };

  const fetchRaucu = () => {
    getListFoods(3).then((data) => {
      setListRaucu(data);
      setIsLoadingRaucu(false);
    });
  };

  const fetchThit = () => {
    getListFoods(4).then((data) => {
      setListThit(data);
      setIsLoadingThit(false);
    });
  };

  const fetchDouong = () => {
    getListFoods(5).then((data) => {
      setListDouong(data);
      setIsLoadingDouong(false);
    });
  };

  const fetchAllDish = () => {
    getAllFoods().then((data) => {
      setListAllDish(data);
      setIsLoadingAllDish(false);
    });
  };

  const getAllFoods = async () => {
    let params = {};
    let response = await homeServices.list(params);
    // console.log("[INFO] Response in getAllFoods: ", response);
    return response;
  };

  const searchDish = async (name) => {
    let params = {
      name: {
        equal: name,
      },
    };

    var currentSec = new Date().getSeconds();
    if (currentSec != delaySearch) {
      // console.log("[INFO] params to search: ", params);
      setDelayDearch(currentSec);
      let response = await homeServices.list(params);

      return response;
    }
    return null;
  };

  const getListFoods = async (code) => {
    if (code == -3) {
      return getListFavouriteFoods();
    } else if (code == -2) {
      return getListRecentlyFoods();
    } else if (code == -1) {
      return getListTopOrderFoods();
    }

    let params = {
      foodGroupingId: {
        equal: code,
      },
    };
    let response = await homeServices.list(params);
    // console.log("[INFO] Response in home after getListFoods: ", response);
    return response;
  };

  const getListFavouriteFoods = async () => {
    let response = await homeServices.listFavorite();
    // console.log(
    //   "[INFO] Response in home after getListFavouriteFoods: ",
    //   response
    // );
    return response;
  };

  const getListRecentlyFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.listRecently(params);
    // console.log(
    //   "[INFO] Response in home after getListRecentlyFoods: ",
    //   response
    // );
    return response;
  };

  const getListTopOrderFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.listTopOrder(params);
    // console.log("[INFO] Response in home after listTopOrder: ", response);
    return response;
  };

  const onPressDetail = (cardData, titleHeader) => {
    cardData
      ? props.navigation.navigate("Detail", {
          listDishs: cardData,
          listFavourite: listLikedDish,
          setListLikedDish: setListLikedDish,
          fetchFavourite: fetchFavourite,
          titleHeader: titleHeader,
        })
      : null;
  };

  // For modal
  const _showModal = () => {
    setVisible(true);
  };
  const _hideModal = () => {
    setVisible(false);
  };
  const _onsubmitModal = () => {
    _hideModal();
    props.navigation.navigate("Profile", { showModal: true });
  };

  return (
    <>
      {/* Loading */}
      <Overlay
        fullScreen={true}
        visible={
          !listAllDish &&
          !listDouong &&
          !listFavorite &&
          !listHaisan &&
          !listLau &&
          !listRaucu &&
          !listRecently &&
          !listThit &&
          !listTop
        }
      >
        <Spinner />
      </Overlay>
      {/* Check is the first login then update profile */}

      <Fab
        active={activeFab}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#5067FF" }}
        position="bottomRight"
        onPress={() => setActiveFab(!activeFab)}
      >
        <Icon name="share" />
        <Button style={{ backgroundColor: "#34A34F" }}>
          <Icon name="logo-whatsapp" />
        </Button>
        <Button style={{ backgroundColor: "#3B5998" }}>
          <Icon name="logo-facebook" />
        </Button>
        <Button disabled style={{ backgroundColor: "#DD5144" }}>
          <Icon name="mail" />
        </Button>
      </Fab>

      <Overlay
        isVisible={visible}
        // onBackdropPress={_hideModal}
        overlayStyle={{ marginHorizontal: 10, paddingBottom: 10 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10 }}>
          Xin chào
        </Text>
        <Text style={{ fontSize: 20, padding: 10 }}>
          Chào mừng bạn đến với ứng dụng Mlem Mlem, vui lòng cập nhật thông tin
          cá nhân để chúng tôi có thể phục vụ bạn tốt hơn.
        </Text>
        <ButtonE title="Cập nhật thông tin ngay" onPress={_onsubmitModal} />
      </Overlay>

      {/* {console.log("Start Rendering")} */}
      <ScrollView style={styles.home}>
        <HeaderImage searchDish={searchDish} />
        <NavBar
          onPressAll={() => onPressDetail(listAllDish, "Tất cả")}
          onPressLau={() => onPressDetail(listLau, "Lẩu - Buffet")}
          onPressHaisan={() => onPressDetail(listHaisan, "Hải sản")}
          onPressRaucu={() => onPressDetail(listRaucu, "Rau củ")}
          onPressThit={() => onPressDetail(listThit, "Thịt")}
          onPressDouong={() => onPressDetail(listDouong, "Đồ uống")}
        />

        {listFavorite === null ? (
          <CardList
            cardData={listFavorite}
            onPressDetail={() => onPressDetail(listFavorite, "Món yêu thích")}
            title={"Yêu thích"}
            isLoading={!listFavorite}
          />
        ) : listFavorite.length != 0 ? (
          <CardList
            cardData={listFavorite}
            onPressDetail={() => onPressDetail(listFavorite, "Món yêu thích")}
            title={"Yêu thích"}
            isLoading={!listFavorite}
          />
        ) : null}

        {listRecently === null ? (
          <CardList
            cardData={listRecently}
            onPressDetail={() => onPressDetail(listRecently, "Đặt gần đây")}
            title={"Đặt gần đây"}
            isLoading={isLoadingRecently}
          />
        ) : listRecently.length != 0 ? (
          <CardList
            cardData={listRecently}
            onPressDetail={() => onPressDetail(listRecently, "Đặt gần đây")}
            title={"Đặt gần đây"}
            isLoading={isLoadingRecently}
          />
        ) : null}

        {listTop === null ? (
          <CardList
            cardData={listTop}
            onPressDetail={() => onPressDetail(listTop, "Đặt nhiều nhất")}
            title={"Đặt nhiều nhất"}
            isLoading={isLoadingTop}
          />
        ) : listTop.length != 0 ? (
          <CardList
            cardData={listTop}
            onPressDetail={() => onPressDetail(listTop, "Đặt nhiều nhất")}
            title={"Đặt nhiều nhất"}
            isLoading={isLoadingTop}
          />
        ) : null}

        {listLau === null ? (
          <CardList
            cardData={listLau}
            onPressDetail={() => onPressDetail(listLau, "Lẩu - Buffet")}
            title={"Lẩu - Buffet"}
            isLoading={isLoadingLau}
          />
        ) : listLau.length != 0 ? (
          <CardList
            cardData={listLau}
            onPressDetail={() => onPressDetail(listLau, "Lẩu - Buffet")}
            title={"Lẩu - Buffet"}
            isLoading={isLoadingLau}
          />
        ) : null}

        {listHaisan === null ? (
          <CardList
            cardData={listHaisan}
            onPressDetail={() => onPressDetail(listHaisan, "Hải sản")}
            title={"Hải sản"}
            isLoading={isLoadingHaisan}
          />
        ) : listHaisan.length != 0 ? (
          <CardList
            cardData={listHaisan}
            onPressDetail={() => onPressDetail(listHaisan, "Hải sản")}
            title={"Hải sản"}
            isLoading={isLoadingHaisan}
          />
        ) : null}

        {listRaucu === null ? (
          <CardList
            cardData={listRaucu}
            onPressDetail={() => onPressDetail(listRaucu, "Rau củ")}
            title={"Rau củ"}
            isLoading={isLoadingRaucu}
          />
        ) : listRaucu.length != 0 ? (
          <CardList
            cardData={listRaucu}
            onPressDetail={() => onPressDetail(listRaucu, "Rau củ")}
            title={"Rau củ"}
            isLoading={isLoadingRaucu}
          />
        ) : null}

        {listThit === null ? (
          <CardList
            cardData={listThit}
            onPressDetail={() => onPressDetail(listThit, "Thịt")}
            title={"Thịt"}
            isLoading={isLoadingThit}
          />
        ) : listThit.length != 0 ? (
          <CardList
            cardData={listThit}
            onPressDetail={() => onPressDetail(listThit, "Thịt")}
            title={"Thịt"}
            isLoading={isLoadingThit}
          />
        ) : null}

        {listDouong === null ? (
          <CardList
            cardData={listDouong}
            onPressDetail={() => onPressDetail(listDouong, "Đồ uống")}
            title={"Đồ uống"}
            isLoading={isLoadingDouong}
          />
        ) : listDouong.length != 0 ? (
          <CardList
            cardData={listDouong}
            onPressDetail={() => onPressDetail(listDouong, "Đồ uống")}
            title={"Đồ uống"}
            isLoading={isLoadingDouong}
          />
        ) : null}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  home: {
    backgroundColor: "#dee1e3",
    flex: 1,
  },
});
