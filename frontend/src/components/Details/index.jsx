import styles from "./styles.module.css"
import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

const Details = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    let {type, name} = useParams();
    const [details, getDetails] = useState([])
    const URL = `http://localhost:8080/api/${type}/details/${name}`
    useEffect(() => {
        fetchDetails()
    }, [])

    const fetchDetails = () => {
        fetch(URL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getDetails(response);
            })
    }
    console.log(details)
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>MySite</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
            </nav>
            <div>
                <tbody>
                <tr>{details.pokeName}</tr>
                </tbody>
            </div>
        </div>
    )
}
export default Details
