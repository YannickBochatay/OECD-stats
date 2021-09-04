import React from "react"
import Select from "react-select"
import { withDataContext } from "./DataContext"

export default withDataContext(class Dimensions extends React.Component {

    state = { dimensionsOptions : {} }

    fetchDimensions = async() => {
        const res = await fetch("https://stats.oecd.org/restsdmx/sdmx.ashx/GetDataStructure/DP_LIVE")
        const text = await res.text()
        const xml = new DOMParser().parseFromString(text, "text/xml")

        const codeLists = [...xml.querySelectorAll("CodeList")]

        const dimensionsOptions = codeLists.reduce((obj, codeList) => {
            const labelSelect = codeList.querySelector("Name[*|lang=fr]")?.textContent || codeList.querySelector("Name[*|lang=en]")?.textContent

            const options = [...codeList.querySelectorAll("Code")].map(code => ({
                label : code.querySelector("Description[*|lang=fr]")?.textContent || code.querySelector("Description[*|lang=en]")?.textContent,
                value : code.getAttribute("value")
            }))

            obj[labelSelect] = options

            return obj
        }, {})

        this.setState({ dimensionsOptions })
    }

    handleChange = dimName => option => {
        this.props.setKeyValue("dimensions", { ...this.props.dimensions, [dimName] : option.value })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.database !== this.props.database) this.fetchDimensions()
    }

    componentDidMount() {
        if (this.props.database) this.fetchDimensions()
    }

    render() {

        const { database, dimensions } = this.props
        const { dimensionsOptions } = this.state
        const dimensionNames = Object.keys(dimensionsOptions)

        if (!database || !dimensionNames.length) return null

        return dimensionNames.map(dimName => {
            return (
                <div key={ dimName }>
                    <label>{ dimName }</label>
                    <Select
                        value={ dimensions[dimName] }
                        onChange={ this.handleChange(dimName) }
                        options={ dimensionsOptions[dimName] }
                    />
                </div>
            )
        })         
    }
})