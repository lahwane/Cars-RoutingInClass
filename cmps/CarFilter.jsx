const { useState, useEffect } = React

export function CarFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Our Cars</h2>
            <form>
                <label htmlFor="txt">Vendor</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input onChange={handleChange} value={minSpeed} type="number" name="minSpeed" id="minSpeed" />

                <button>Submit</button>
            </form>
        </section>
    )
}