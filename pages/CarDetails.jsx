import { carService } from "../services/car.service.js"

const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM

export function CarDetails() {

    const [car, setCar] = useState(null)

    const params = useParams()
    console.log('params:', params)

    useEffect(() => {
        loadCar()
    }, [params.carId])

    function loadCar() {
        carService.get(params.carId)
            .then(setCar)
            .catch(err => {
                console.log('Problem getting car:', err)
            })
    }

    if (!car) return <div>Loading...</div>

    const { vendor, speed } = car
    return (
        <section className="car-details">
            <h1>Car Vendor: {vendor}</h1>
            <h1>Car Speed: {speed} km/h</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/${vendor}.png`}
                onError={({ currentTarget }) => currentTarget.src = "../assets/img/default.png"}
            />
            <Link to="/car/hIi5OH">Next Car</Link>
            <button><Link to="/car">Back</Link></button>
        </section>
    )
}