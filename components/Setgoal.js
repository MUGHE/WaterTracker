import { View, Text } from "react-native-web";
import React from 'react';
import { Provider, Portal, Dialog, Button, TextInput } from "react-native-paper";

function Setgoal(props) {
    const [inputVal, setInputVal] = React.useState("");

    return (
        <Provider>
            <Portal>
                <Dialog 
                    visible={props.isDialogVisible}
                    onDismiss={() => props.setIsDialogVisible(false)}>
                    <Dialog.Title>Water Intake</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Set your Daily Water Intake Goal"
                            placeholder="in millilitres"
                            underlineColor="#2176FF"
                            theme={{ colors: { primary: '#2176FF' } }}
                            onChangeText={text => setInputVal(text)}
                            value={inputVal}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            theme={{ colors: { primary: '#2176FF' } }}
                            onPress={() => {
                                props.setIsDialogVisible(false);
                                if (inputVal !== "") props.setGoal(parseInt(inputVal, 10));
                            }}>
                            Done
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    );
}

export default Setgoal;
