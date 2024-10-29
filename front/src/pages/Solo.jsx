import {useEffect} from 'react';

function Solo() {

    useEffect(() => {
        document.title = 'Mode solo';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <div>
            Solo works
        </div>
    );
}

export default Solo;