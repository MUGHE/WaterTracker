import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import axios from 'axios';
import LogWater from './LogWater';
import { Button } from "react-native-paper";
import Setgoal from './Setgoal';
import HistoryScreen from './HistoryScreen';


const BASE_URL = 'http://localhost:3000/api';

const Homescreen = ({id}) => {
    const [data, setData] = useState(null);
    const [intake , setIntake] = useState(null);


    const [isTargetDialogVisible, setIsTargetDialogVisible] = React.useState(false);
    const [isCustomDialogVisible, setIsCustomDialogVisible] = React.useState(false);


    const fetchDataFromDB = async (id) => {
        try {
            console.log("Trying to hit API");
            const response = await axios.get(`${BASE_URL}/goal`, { params: { id } });
            console.log(response);
            if (response.status === 200 && response.data.length > 0) {
                return response.data[0]; // Assuming the data structure is an array
            }
            return null;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("hitting next request");
                await axios.post(`${BASE_URL}/goal`, { id });
                return fetchDataFromDB(id);
            } else {
                console.error('Failed to fetch data:', error);
                return null;
            }
        }
    };


    const addWater = async (amount) => {
        try {
            console.log("Trying to add water");
            const today = new Date().toISOString().split('T')[0];
            const response = await axios.post(`${BASE_URL}/intake`, { id, waterIntakeAmount: amount, date: today });
            if (response.status === 200 || response.status === 201) {
                // Assuming the response contains the updated amount
                const updatedIntake = response.data.waterIntakeAmount;
                setIntake((prevIntake) => ({
                    ...prevIntake,
                    water_intake_ammount: updatedIntake
                }));
                console.log("Water intake updated:", updatedIntake);
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.error('Failed to update water intake:', error);
        }
    }
    
    const setGoal = async (goal) => {
        try {
            console.log("Trying to set new goal");
            const response = await axios.post(`${BASE_URL}/goal`, { id, intakeTarget: goal });
            if (response.status === 200 || response.status === 201) {
                const updatedGoal = response.data.intakeTarget;
                setData((prevData) => ({
                    ...prevData,
                    Daily_Intake_Goal: updatedGoal
                }));
                console.log("New Goal Set:", updatedGoal);
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.error('Failed to set new goal:', error);
        }
    };
    


    const fetchIntakeAmmount = async (id) => {
        const today = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.get(`${BASE_URL}/intake`, { params: { id, date: today } }); // Pass both id and date
            if (response.status === 200) {
                return response.data[0]; // Assuming the data structure is an array
            }
            return null;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("No data found against id. Creating a new entry...");
                await axios.post(`${BASE_URL}/intake`, { id, waterIntakeAmount: 0, date: today });
                return fetchIntakeAmmount(id);
            } else {
                console.error('Failed to fetch data:', error);
                return null;
            }
        }
    };
    

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/history`, { params: { id } });
            if (response.status === 200) {
                setHistory(response.data);
            }
        } catch (error) {
            setError('Failed to fetch history');
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };
   
    useEffect(() => {
        const loadData = async () => {
         
            const fetchedData = await fetchDataFromDB(id);
            if (fetchedData) {
                const intakeAmmount = await fetchIntakeAmmount(id);
                setIntake(intakeAmmount);
            }
            setData(fetchedData);
        };

        loadData();
    }, [id]);



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.header}>Home Screen</Text>
                    {data ? (
                        <View style={styles.dataContainer}>
                            <Text style={styles.dataText}>Today's Intake Goal: {data.Daily_Intake_Goal}</Text>
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
                <View>
                    {intake ? (
                        <View style={styles.dataContainer}>
                            <Text style={styles.dataText}>Today's Intake Amount: {intake.water_intake_ammount}</Text>
                        </View>
                    ) : (
                        <Text>You have not Drink water today</Text>
                    )}
                </View>
                <View>
                    <Button onPress={() => setIsCustomDialogVisible(true)}>
                        <Text>
                        Add Water
                        </Text>
                    </Button>
                    <Button onPress={() => setIsTargetDialogVisible(true)}>
                        <Text>
                        Set Goal
                        </Text>
                    </Button>
                </View>
                <LogWater
                    isDialogVisible={isCustomDialogVisible}
                    setIsDialogVisible={setIsCustomDialogVisible}
                    addWater={addWater}
                />
                <Setgoal
                isDialogVisible={isTargetDialogVisible}
                setIsDialogVisible={setIsTargetDialogVisible}
                setGoal={setGoal}
            />
            <View>
                <HistoryScreen id={id}/>
            </View>

            

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dataContainer: {
        marginTop: 20,
    },
    dataText: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Homescreen;
