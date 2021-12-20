import { useEffect, useState } from "react";
import Spinner from "../../utils/spinner/spinner";
import Card from "../card/card";

import './home.css';
import Navbar from "../navbar/navbar";
import { Aux } from '../../hoc/aux';

interface Image {
    original: string;
    medium: string;
}
interface Item {
    name: string;
    image: Image;
    id: string;
}

/**
 * Renders a list of the tv series that can be sorted
 * @returns 
 */
function Home(props: any) {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([{}]);

    useEffect(() => {
        setLoading(true);
        const url = 'https://api.tvmaze.com/shows?page=1';
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                let sortedRes = res.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
                setLoading(false);
                setSeries(sortedRes);
            })
            .catch((err: ErrorEvent) => {
                setLoading(false);
                setError(err.message);
            })
    }, []);

    const onAscendingHandler = () => {
        let newRes = [...series];
        let sortedRes = newRes.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
        setSeries(sortedRes);
    }
    
    const onDescendingHandler = () => {
        let newRes = [...series];
        let sortedRes = newRes.sort((a: Item, b: Item) => b.name.localeCompare(a.name));
        setSeries(sortedRes);
    }
    
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const onCategorySet = () => {
        //use the alphabet
        const final = [];
        for (let item of alphabet.toUpperCase()) {
            const res = series.filter((el: Item) => el.name.startsWith(item));
            if (res) final.push({letter: item, array: res});
        }

        setCategories(final);
    }

    return (
        <>
            <Navbar />
            <div className="home-wrapper">
                {loading ?
                <Spinner />
                :
                error ?
                <h5 style={{color: 'red'}}>There was an error fetching the list: {error}</h5>
                :
                <>
                    <button className="sort" onClick={onAscendingHandler}>Ascending</button>
                    <button className="sort" onClick={onDescendingHandler}>Descending</button>
                    <button className="cat" onClick={onCategorySet}>Categorize</button>
                    {categories &&
                        <div className="cats">
                            {categories?.map((el: any, i) => {
                                return (
                                    <Aux key={i}>
                                        <h1>{el.letter}</h1>
                                        <div className="categ">
                                            {el.array?.map((item: any, i: any) => {
                                                return <Card key={i} {...item} />
                                            })}
                                        </div>
                                    </Aux>
                                )
                            })}
                        </div>
                    }
                    {series && 
                        <div className="home-cards">
                            {series?.map((el: Item, i) => {
                                return <Card key={i} {...el} />
                            })}
                        </div>  
                    }
                </>
                }
            </div>
        </>
    )
}


export default Home;