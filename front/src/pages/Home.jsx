import {useEffect} from 'react';

function Home() {

    useEffect(() => {
        document.title = 'Accueil';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <div>
            Home works
        </div>
    );
}

export default Home;
