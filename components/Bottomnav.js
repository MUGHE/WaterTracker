import React from 'react';
import { BottomNavigation} from 'react-native-paper';
import Homescreen from './Homescreen';
import HistoryScreen from './HistoryScreen';

const Bottomnav = ({id}) => {
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'main', title: 'Main', icon: 'home' },
        { key: 'history', title: 'History', icon: 'chart-bell-curve' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'main':
                return <Homescreen id={id} />;
            case 'history':
                return <HistoryScreen id={id} />;
            default:
                return null;
        }
    };

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={true}
        />
    );
};

export default Bottomnav;