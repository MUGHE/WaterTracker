import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const HistoryScreen = ({ id }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
console.log("trying to get history with id is " + id)
            const response = await axios.get(`${BASE_URL}/history`, { params: { id} }); // Pass both id and date
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

        fetchHistory();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.header}>History</Text>
                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={styles.dateText}>Date: {item.Date}</Text>
                                <Text style={styles.amountText}>Water Intake: {item.water_intake_ammount} ml</Text>
                            </View>
                        ))
                    ) : (
                        <Text>No history data found</Text>
                    )}
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
    item: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    dateText: {
        fontSize: 16,
        marginBottom: 5,
    },
    amountText: {
        fontSize: 16,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default HistoryScreen;
