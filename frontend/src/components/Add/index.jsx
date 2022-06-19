import styles from "./styles.module.css"
import {useParams} from "react-router-dom";
import React, {useState} from 'react';
import axios from "axios";

const Modify = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    let {type} = useParams();

    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `http://localhost:8080/api/${type}/add`
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
                <h1>Dodaj Pokemona</h1>
                <input
                    type="text"
                    placeholder="Nazwa"
                    name="pokeName"
                    onChange={handleChange}
                    Value={data.pokeName}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Atak"
                    name="attack"
                    onChange={handleChange}
                    value={data.attack}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Obrona"
                    name="defense"
                    onChange={handleChange}
                    value={data.defense}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="HP"
                    name="stamina"
                    onChange={handleChange}
                    value={data.stamina}
                    className={styles.input}
                />
                {error && <div
                    className={styles.error_msg}>{error}</div>}
                <button type="submit"
                        className={styles.green_btn}>
                    Dodaj Pokemona
                </button>
            </form>
        </div>
    </div>)
    const moveForm = (<div className={styles.main_container}>
        <div className={styles.right}>
            <form className={styles.form_container}
                  onSubmit={handleSubmit}>
                <h1>Dodaj Atak</h1>
                <input
                    type="text"
                    placeholder="Nazwa"
                    name="moveName"
                    value={data.moveName}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Typ"
                    name="type"
                    value={data.type}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Moc"
                    name="power"
                    value={data.power}
                    onChange={handleChange}
                    className={styles.input}
                />
                {error && <div
                    className={styles.error_msg}>{error}</div>}
                <button type="submit"
                        className={styles.green_btn}>
                    Dodaj Atak
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
