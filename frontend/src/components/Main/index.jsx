import styles from "./styles.module.css"
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const Main = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    const handleDelete = (key, value) => {
        console.log(key + " " + value.pokeName)
        let json
        let URL
        if (key == "poke") {
            URL = "http://localhost:8080/api/poke/delete"
            json = JSON.stringify({"pokeName": value.pokeName})
        } else {
            URL = "http://localhost:8080/api/move/delete"
            json = JSON.stringify({"moveName": value.moveName})
        }
        console.log(json)
        fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        window.location.reload()
    }
    const [pokes, getPokemons] = useState([])
    const poke_URL = "http://localhost:8080/api/poke"
    useEffect(() => {
        fetchPokemons()
    }, [])

    const fetchPokemons = () => {
        fetch(poke_URL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getPokemons(response);
            })
    }
    const [moves, getMoves] = useState([])
    const move_URL = "http://localhost:8080/api/move"
    useEffect(() => {
        fetchMoves()
    }, [])

    const fetchMoves = () => {
        fetch(move_URL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getMoves(response);
            })
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>MySite</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
            </nav>
            <table>
                <tbody>
                <tr>
                    <th>Pokemon</th>
                </tr>
                {pokes && pokes.length > 0 ? pokes.map(poke => (
                        <tr key={poke.pokeName}>
                            <td>{poke.pokeName}</td>

                            <td>
                                <Link to={`/details/poke/${poke.pokeName}`}>
                                    <button className={styles.grey_btn}>
                                        Detale
                                    </button>
                                </Link>
                            </td>

                            <td>
                                <Link to={`/modify/poke/${poke.pokeName}`}>
                                    <button className={styles.grey_btn}>
                                        Modyfikuj
                                    </button>
                                </Link>
                            </td>

                            <td>
                                <button className={styles.red_btn} onClick={() => handleDelete("poke", poke)}>
                                    Usun
                                </button>
                            </td>
                        </tr>
                    )) :
                    <tr>
                        <td className={styles.noData}>Brak Danych</td>
                    </tr>}
                <tr>
                    <td colSpan={4}>
                        <Link to="/add/poke">
                            <button className={styles.add_btn}>
                                Dodaj pokemona
                            </button>
                        </Link>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Moves</th>
                </tr>
                {moves && moves.length > 0 ? moves.map(move => (
                        <tr key={move.moveName}>
                            <td>{move.moveName}</td>

                            <td>
                                <Link to={`/details/move/${move.moveName}`}>
                                    <button className={styles.grey_btn}>
                                        Detale
                                    </button>
                                </Link>
                            </td>

                            <td>
                                <Link to={`/modify/move/${move.moveName}`}>
                                    <button className={styles.grey_btn}>
                                        Modyfikuj
                                    </button>
                                </Link>
                            </td>

                            <td>
                                <button className={styles.red_btn} onClick={() => handleDelete("move", move)}>
                                    Usun
                                </button>
                            </td>
                        </tr>
                    )) :
                    <tr>
                        <td className={styles.noData}>Brak Danych</td>
                    </tr>}
                <tr>
                    <td colSpan={4}>
                        <Link to="/add/move">
                            <button className={styles.add_btn}>
                                Dodaj atak
                            </button>
                        </Link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Main
