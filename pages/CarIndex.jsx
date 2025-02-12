import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { carService } from "../services/car.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { CarDetails } from "./CarDetails.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function CarIndex() {

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        carService.query(filterBy)
            .then(setCars)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(cars =>
                    cars.filter(car => car.id !== carId)
                )

                // eventBusService.emit('show-user-msg', { txt: 'Car Removed', type: 'success' })
                // showUserMsg({ txt: 'Car Removed', type: 'success' })
                showSuccessMsg('Car Removed')
            })
            .catch(err => {
                console.log('Problems removing car:', err)
                // eventBusService.emit('show-user-msg', { txt: 'Problems removing car', type: 'error' })
                // showUserMsg({ txt: 'Problems removing car', type: 'error' })
                showErrorMsg('Problems removing car')
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }


    if (!cars) return <div>Loading...</div>
    return (
        <section className="car-index">
            <CarFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/car/edit">Add Car</Link>
            <CarList onRemoveCar={onRemoveCar} cars={cars} />

        </section>
    )

}