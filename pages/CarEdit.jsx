import { carService } from "../services/car.service.js"


const { useState, useEffect } = React

const { useParams, useNavigate, Link } = ReactRouterDOM


export function CarEdit() {

    const [carToEdit, setCarToEdit] = useState(carService.getEmptyCar())
    console.log('carToEdit:', carToEdit)

    const { carId } = useParams()
    console.log('carId:', carId)

    useEffect(() => {
        if (carId) loadCar()
    }, [])

    function loadCar() {
        carService.get(carId)
            .then(setCarToEdit)
            .catch(err => console.log('err:', err))
    }

    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setCarToEdit(prevCarToEdit => ({ ...prevCarToEdit, [field]: value }))
    }

    function onSaveCar(ev) {
        ev.preventDefault()

        carService.save(carToEdit)
            .then(savedCar => {
                console.log('savedCar:', savedCar)

                navigate('/car')
                // navigate(-1)
            })
            .catch(err => console.log('err:', err))
    }

    const { vendor, speed } = carToEdit

    return (
        <section className="car-edit">

            <h1>{carId ? 'Car Edit' : 'Car Add'}</h1>

            <form onSubmit={onSaveCar}>

                <label htmlFor="vendor">Vendor:</label>
                <input type="text" id="vendor" value={vendor} onChange={handleChange} name="vendor" />

                <label htmlFor="speed">Max Speed:</label>
                <input type="number" id="speed" value={speed || ''} onChange={handleChange} name="speed" />

                <button>Save</button>
            </form>
        </section>
    )
}