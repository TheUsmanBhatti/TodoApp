//import liraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, TextInput } from 'react-native';
import { COLORS } from '../utilities/Colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';

import { PermissionsAndroid } from 'react-native';

import Moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { showMessage, hideMessage } from "react-native-flash-message";

// var allNotes = [];


// create a component
const TodoScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [settingsmodalVisible, setSettingsmodalVisible] = useState(false);

    const [ntitle, setNTitle] = useState('');
    const [ndescription, setNdescription] = useState('');
    const [ndate, setNdate] = useState(new Date());
    const [ntime, setNtime] = useState(new Date());
    const [nimage, setnImage] = useState('');
    const [nimageName, setnImageName] = useState('');

    const [showD, setShowD] = useState(false);
    const [showT, setShowT] = useState(false);

    const [update, setUpdate] = useState(false);


    const onDateChange = (event, selectedValue) => {
        const currentDate = selectedValue || new Date();
        setNdate(currentDate)
        setShowD(false);
    }

    const onTimeChange = (event, selectedValue) => {
        const currentDate = selectedValue || new Date();
        setNtime(currentDate);
        setShowT(false);
    }

     const [allNotes, setAllNotes] = useState([])





    const handleUpdateNote = (item, case2) => {


        setNTitle(item?.title);
        setNdescription(item?.description);
        setnImage(item?.imgUri);
        setNdate(ndate);
        setNtime(ntime);
        setModalVisible(true)
        setUpdate(true)




    }

    

    const handleOpenAddNoteModal = () => {
        resetForm();
        setModalVisible(true)
    }



    var eachNote = {
        title: '',
        description: '',
        date: '',
        time: '',
        imgUri: ''
    }


    const resetForm = () => {
        setnImage('')
        setNTitle('')
        setNdescription('')
        setnImageName('')
    }


    const handleModalSaveBtn = () => {

        if (!ntitle.length > 0) {
            showMessage({
                message: "Title is Required",
                type: "danger",
            });
        } else if (!ndescription.length > 0) {
            showMessage({
                message: "Description is Required",
                type: "danger",
            });
        } else {


            resetForm()
            addnewNot();


        }

    }


    const handleDelete = (item) => {


        // console.log("index is "+allNotes.indexOf(item))
        // var a = allNotes.indexOf(item);

        // allNotes.splice(a,1)

        // console.log("after "+allNotes)

        setAllNotes(allNotes.filter(i=> i.title != item.title))
    
    //    const res = allNotes.filter((i) => {
    //         return i.title == item.title
    //     });

    //     allNotes.splice(res);


        //  return;
    }



    const addnewNot = () => {

        const title = ntitle;
        const description = ndescription;
        const date = Moment(ndate).format("DD - MMM - YYYY");
        const time = Moment(ntime).format("hh:mm A");

        if (update == true) {

            const results = allNotes.filter(checkExists);
            allNotes.splice(results)

            function checkExists(title) {
                return title == title;

            }

            eachNote.title = title
            eachNote.description = description
            eachNote.date = date
            eachNote.time = time
            eachNote.imgUri = nimage


            setAllNotes([...allNotes,eachNote])


            // allNotes.push(eachNote);
            setModalVisible(false);
            setUpdate(false);


        } else {

            eachNote.title = title
            eachNote.description = description
            eachNote.date = date
            eachNote.time = time
            eachNote.imgUri = nimage
            // allNotes.push(eachNote);
            setAllNotes([...allNotes,eachNote])
            setModalVisible(false);

        }



    }





    const CameraLauncher = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                var options = {
                    title: 'Select Image',
                    customButtons: [
                        {
                            name: 'customOptionKey',
                            title: 'Choose Photo from Custom Option'
                        },
                    ],
                    storageOptions: {
                        skipBackup: true,
                        path: 'images',
                    },
                    includeBase64: true,
                };

                await launchCamera(options, response => {
                    // console.log('Response = ', response);
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log(
                            'User tapped custom button: ',
                            response.customButton
                        );
                        alert(response.customButton);
                    } else {
                        const source = {
                            uri: 'data:image/jpeg;base64,' + response.assets[0].base64
                        };

                        setnImage(source);
                        setnImageName(response?.assets[0]);
                    }
                });


            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const GalleryLaucnher = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                var options = {
                    title: 'Select Image',
                    customButtons: [
                        {
                            name: 'customOptionKey',
                            title: 'Choose Photo from Custom Option'
                        },
                    ],
                    storageOptions: {
                        skipBackup: true,
                        path: 'images',
                    },

                    includeBase64: true,
                };

                await launchImageLibrary(options, response => {
                    // console.log('Response = ', response);
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log(
                            'User tapped custom button: ',
                            response.customButton
                        );
                        alert(response.customButton);
                    } else {
                        const source = {
                            uri: 'data:image/jpeg;base64,' + response.assets[0].base64
                        };

                        setnImage(source);
                        setnImageName(response?.assets[0]);
                    }
                });


            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                visible={settingsmodalVisible}
                transparent={true}
            >
                <TouchableOpacity
                    onPress={() => setSettingsmodalVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)', alignItems: 'flex-end', paddingTop: 45, paddingRight: 5 }}>

                    <View style={{ width: '45%', height: 200, backgroundColor: '#fff', borderRadius: 15, borderWidth: .3, borderColor: COLORS.primary }}>

                        <Image style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 10, marginVertical: 10 }} source={require('../images/img1.jpg')} />
                        <Text style={{ alignSelf: 'center' }}>Muhammad Yaseen</Text>
                        <View style={{ height: 1, width: '30%', backgroundColor: COLORS.primary, alignSelf: 'center', marginVertical: 5 }} />

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderWidth: .3, margin: 5, borderRadius: 5 }}>
                            <Icon name="remove" size={20} color="#900" />
                            <Text>Clear All Notes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderWidth: .3, margin: 5, borderRadius: 5 }}>
                            <Icon name="check" size={20} color="#900" />
                            <Text> Review Completed</Text>
                        </TouchableOpacity>

                    </View>

                </TouchableOpacity>

            </Modal>

            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}

            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1, alignItems: 'center', padding: 15, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)' }}>
                    <View style={{ backgroundColor: '#fff', height: 380, width: '100%', borderRadius: 20 }}>

                        <View style={{ flexDirection: 'row', borderWidth: .5, borderTopEndRadius: 20, borderTopLeftRadius: 20 }}>
                            <Image
                                style={{ width: 130, height: 90, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, resizeMode: 'stretch' }}
                                source={nimage ? nimage : require('../images/imgIcon.jpeg')}

                            />
                            <View style={{ flex: 1, padding: 10, }}>
                                <Text>Upload Image By using</Text>
                                <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-evenly' }}>
                                    <TouchableOpacity
                                        onPress={CameraLauncher}
                                    >
                                        <Icon name="camera" size={25} color="#900" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={GalleryLaucnher}
                                    >
                                        <Icon2 name="images" size={25} color="#900" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View>

                            <View style={{ width: '100%', marginVertical: 10, }}>
                                <TextInput value={ntitle} onChangeText={setNTitle} placeholder="Enter Title" style={{ width: '90%', alignSelf: 'center', borderWidth: .5, borderRadius: 10, padding: 8 }} />
                            </View>
                            <View style={{ width: '100%', }}>
                                <TextInput value={ndescription} onChangeText={setNdescription} placeholder="Enter Description" style={{ width: '90%', alignSelf: 'center', borderWidth: .5, borderRadius: 10, padding: 8 }} />
                            </View>

                            {/* Date Selection Container */}
                            <TouchableOpacity
                                onPress={() => setShowD(true)}
                                style={{ width: '90%', marginVertical: 10, flexDirection: 'row', alignSelf: 'center', borderWidth: .5, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ padding: 13 }}>Date : {Moment(ndate).format("DD - MMM - YYYY")}</Text>
                                <Fontisto style={{ marginRight: 15 }} name="date" size={25} color="#900" />
                            </TouchableOpacity>
                            {showD && (
                                <RNDateTimePicker
                                    value={ndate}
                                    minimumDate={new Date()}
                                    display='default'
                                    mode={'date'}
                                    onChange={onDateChange}
                                />
                            )
                            }

                            {/* Time selection container */}
                            <TouchableOpacity
                                onPress={() => setShowT(true)}
                                style={{ width: '90%', marginBottom: 10, flexDirection: 'row', alignSelf: 'center', borderWidth: .5, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ padding: 13 }}>Time : {Moment(ntime).format("hh:mm A")}</Text>
                                <Fontisto style={{ marginRight: 15 }} name="clock" size={25} color="#900" />
                            </TouchableOpacity>
                            {showT && (
                                <RNDateTimePicker
                                    value={ntime}
                                    display='default'
                                    mode={'time'}
                                    onChange={onTimeChange}
                                />
                            )
                            }

                        </View>

                        <TouchableOpacity
                            style={{ width: '100%', padding: 5, }}
                            onPress={() => handleModalSaveBtn()}>
                            <Text style={{ color: '#fff', backgroundColor: COLORS.primary, fontWeight: 'bold', padding: 10, width: '90%', alignSelf: 'center', textAlign: 'center', borderRadius: 20, }}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>


            <TouchableOpacity
                onPress={() => handleOpenAddNoteModal()}
                style={{ position: 'absolute', zIndex: 999, right: 20, bottom: 20, width: 50, height: 50, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 10 }}>
                <Icon2 name="add-to-list" size={20} color="#900" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',

                }}>
                    Todo App  <Icon name="rocket" size={25} color="#900" />
                </Text>

                <TouchableOpacity
                    onPress={() => setSettingsmodalVisible(true)}
                    style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>T</Text>
                </TouchableOpacity>

            </View>

            <View style={{ height: 3, width: '70%', backgroundColor: COLORS.third, marginVertical: 15, alignSelf: 'center' }} />


            <FlatList
                data={allNotes}
                renderItem={({ item }) => (

                    <TouchableOpacity

                        onPress={() => {

                            const caseupdate = "updateCase";
                            handleUpdateNote(item, caseupdate);
                        }}
                    >
                        <View style={{ width: '100%', height: 130, backgroundColor: COLORS.primary, borderRadius: 20, padding: 5, flexDirection: 'row', marginBottom: 10 }}>
                            <Image style={{ width: 90, height: 100, resizeMode: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} source={item.imgUri} />
                            <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 20, marginStart: 6, padding: 12 }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item?.title}</Text>
                                    <TouchableOpacity
                                        onPress={() => handleDelete(item)}
                                    >
                                        <Icon1 name="delete" size={25} color='red' style={{ marginRight: 10 }} />
                                    </TouchableOpacity>
                                </View>


                                <Text style={{ marginVertical: 3 }}>{item?.description}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 2, justifyContent: 'space-around' }}>

                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                    <View style={{ width: '45%', backgroundColor: COLORS.primary, height: 35, borderRadius: 10, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <Icon2 name="clock" size={15} color="#900" />
                                        <Text> {item.time} </Text>
                                    </View>
                                    <View style={{ width: '55%', backgroundColor: COLORS.primary, height: 35, borderRadius: 10, borderWidth: 1, marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <Fontisto name="date" size={15} color="#900" />
                                        <Text> {item.date} </Text>
                                    </View>

                                </View>


                            </View>


                        </View>
                    </TouchableOpacity>
                )}

            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.fourth,
        padding: 10
    },
});

//make this component available to the app
export default TodoScreen;
