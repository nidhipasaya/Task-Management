import React, { useState, useEffect } from 'react';
import axios from "axios";

const Jokes = () => {

    const [jokes, setJokes] = useState([])
    const [isLoaderEnable, setIsLoaderEnable] = useState(true)

    useEffect(() => {
        loadJokes();
    }, [])

    const loadJokes = async () => {
        const result = await axios.get('http://official-joke-api.appspot.com/jokes/ten')
        setJokes(result.data);
        if (jokes) {
            setIsLoaderEnable(false);
        }
    }
    return (<><div className="p-4" >
        <div className="card ">
            <div className="card-header">
                JOKES
            </div>

            <div className="p-4" >
                {isLoaderEnable ?
                    <div class="text-center">
                        <button className="btn btn-secondary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Please Wait...
                        </button>
                    </div>
                    : jokes.map((joke) => (
                        <>
                            <div className="card ">
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>{joke.setup}</p>
                                        <footer className="blockquote-footer">{joke.punchline}</footer>
                                    </blockquote>
                                </div>
                            </div>
                            <br />
                        </>
                    ))}
            </div>
        </div>
    </div></>)
}
export default Jokes;