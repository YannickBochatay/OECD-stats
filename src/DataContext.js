import React from "react"

const DataContext = React.createContext()

export default DataContext

export const withDataContext = Component => props => (
    <DataContext.Consumer>
        { context => <Component { ...context }/> }
    </DataContext.Consumer>
)