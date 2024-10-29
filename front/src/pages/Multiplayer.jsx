import {useEffect} from 'react';

function Multiplayer() {

    useEffect(() => {
        document.title = 'Mode multijoueurs';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <div>
            Multiplayer works
        </div>
    );
}

export default Multiplayer;