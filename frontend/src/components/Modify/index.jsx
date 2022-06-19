import styles from "./styles.module.css"
import {Link, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from "axios";

const Modify = () => {
    const [details, getDetails] = useState([])


    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }


    let {type, name} = useParams();

    const URL = `http://localhost:8080/api/${type}/details/${name}`
    const fetchDetails = () => {
        fetch(URL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getDetails(response);
            })
    }
    useEffect(() => {
        fetchDetails()
    }, [])
    const [data, setData] = useState(details)
    const [error, setError] = useState("")
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `http://localhost:8080/api/${type}/modify/${name}`
            const {data: res} = await axios.post(url, data)

            console.log(res.message)
            window.location = "/"

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const pokeForm = (<div className={styles.main_container}>
        <div className={styles.right}>
            <form className={styles.form_container}
                  onSubmit={handleSubmit}>
                <h1>Modyfikuj Pokemona</h1>
                <input
                    type="text"
                    placeholder="Nazwa"
                    name="pokeName"
                    Value={name}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Atak"
                    name="attack"
                    defaultValue={details.attack}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Obrona"
                    name="defense"
                    onChange={handleChange}
                    defaultValue={details.defense}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="HP"
                    name="stamina"
                    onChange={handleChange}
                    defaultValue={details.stamina}
                    className={styles.input}
                />
                {error && <div
                    className={styles.error_msg}>{error}</div>}
                <button type="submit"
                        className={styles.green_btn}>
                    Modyfikuj Pokemona
                </button>
            </form>
        </div>
    </div>)
    const moveForm = (<div className={styles.main_container}>
        <div className={styles.right}>
            <form className={styles.form_container}
                  onSubmit={handleSubmit}>
                <h1>Modyfikuj Atak</h1>
                <input
                    type="text"
                    placeholder="Nazwa"
                    name="moveName"
                    onChange={handleChange}
                    Value={name}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Typ"
                    name="type"
                    onChange={handleChange}
                    defaultValue={details.type}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Moc"
                    name="power"
                    onChange={handleChange}
                    defaultValue={details.power}
                    className={styles.input}
                />
                {error && <div
                    className={styles.error_msg}>{error}</div>}
                <button type="submit"
                        className={styles.green_btn}>
                    Modyfikuj Atak
                </button>
            </form>
        </div>
    </div>)
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Poksy</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
            </nav>

            {type === "poke" ? pokeForm : moveForm}

        </div>
    )
}
export default Modify
