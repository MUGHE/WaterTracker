import React from 'react';
import { Provider, Portal, Dialog, Button, TextInput } from "react-native-paper";

export default function LogWater(props) {
    const [inputVal, setInputVal] = React.useState("");

    return (
        <Provider>
            <Portal>
                <Dialog 
                    visible={props.isDialogVisible}
                    onDismiss={() => props.setIsDialogVisible(false)}>
                    <Dialog.Title>Water intake</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Amount of water to add"
                            placeholder="in millilitres"
                            underlineColor="#2176FF"
                            theme={{colors: {primary: '#2176FF'}}}
                            value={inputVal}  // Set the value to inputVal
                            onChangeText={text => setInputVal(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            theme={{colors: {primary: '#2176FF'}}}
                            onPress={() => {
                                props.setIsDialogVisible(false);
                                if (inputVal !== "") props.addWater(parseInt(inputVal));
                                setInputVal("");  // Clear the input after submission
                            }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    );
}
