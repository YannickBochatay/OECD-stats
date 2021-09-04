import React from "react"
import Select from "react-select/async"
import debounce from "lodash/debounce"
import { withDataContext } from "./DataContext"

export default withDataContext(class DatabaseSelector extends React.Component {

    loadOptions = debounce((inputValue, callback) => {
        fetch(`https://data.oecd.org/search-api/?hf=20&b=0&r=%2Bf%2Flanguage%2Ffr&q=FUZZYAND%2F-0(${inputValue})&l=fr&sl=sl_dp&sc=enabled%3Atrue%2Cautomatically_correct%3Atrue&target=st_dp`)
        .then(res => res.text())
        .then(text => {
            const xml = new DOMParser().parseFromString(text, "text/xml")
            const options = [...xml.getElementsByTagName("Hit")]
                .map(node => ({
                    label : node.querySelector("Meta[name=title]").textContent,
                    value : node.getAttribute("url")
                }))
                .filter(({ value }) => value.indexOf("http") !== 0)
            callback(options)
        })
    }, 300)

    handleChange = option => {
        this.props.setKeyValue("database", option.value)
    }

    render() {
        return (
            <Select
                cacheOptions
                loadOptions={ this.loadOptions }
                onChange={ this.handleChange }
                placeholder="Cherchez une base de données..."
                value={ this.props.database }
            />
        )          
    }
})