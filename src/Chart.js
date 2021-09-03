/* eslint-disable no-unused-expressions */
import React from "react"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { withDataContext } from "./DataContext"
import moment from "moment"

Highcharts.setOptions({
    lang: {
        months: [
            'Janvier', 'Février', 'Mars', 'Avril',
            'Mai', 'Juin', 'Juillet', 'Août',
            'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        shortMonths : ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
        weekdays: [
            'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
            'Jeudi', 'Vendredi', 'Samedi'
        ],
        resetZoom : "Réinitialiser le zoom"
    }
})

export default withDataContext(class Chart extends React.Component {

    getBestData(zone, parameter) {

        if (parameter?.value === "decesCumul") return this.getCumulDeathData(zone)

        const { data, dateRange } = this.props

        const dataZone = data
            .filter(item => item.code === zone?.value)
            .filter(item => moment(item.date) >= dateRange?.startDate)
            .filter(item => moment(item.date) <= dateRange?.endDate)
            .filter(item => Number(item[parameter?.value]))

        const dataSources = dataZone.reduce((map, item) => {
            if (!(item.sourceType in map)) map[item.sourceType] = []
            map[item.sourceType].push(item)
            return map
        }, {})

        const sourceTypes = Object.keys(dataSources)
        const maxLength = Math.max(...sourceTypes.map(sourceType => dataSources[sourceType].length))
        const bestSource = sourceTypes.find(sourceType => dataSources[sourceType].length === maxLength)
        const bestData = dataSources[bestSource] || []

        return {
            data : bestData,
            source : bestSource
        }
    }

    getCumulDeathData(zone) {

        if (zone?.value !== "FRA") return { data : [], source : null }

        const { source, data : deces } = this.getBestData(zone, { value : "deces" }) || []
        const { data : decesEhpad } = this.getBestData(zone, { value : "decesEhpad" }) || []

        return {
            source,
            data : deces.map(item => {
                const add = decesEhpad.find(({ date }) => date === item.date)?.decesEhpad || 0
                return { ...item, decesCumul : item.deces + add }
            })
        }
    }

    setSeries() {
        const { zones, parameters } = this.props

        const series = []
        
        zones?.forEach(zone => {
            parameters?.forEach(parameter => {
                const { data, source } = this.getBestData(zone, parameter)
                const sourceName = data.length ? "données " + source : "Aucune donnée disponible"

                series.push({
                    name :  zone?.label + " - " + parameter?.label + " (" + sourceName + ")",
                    data : data.map(item => [Number(new Date(item.date)), Number(item[parameter?.value])] )
                })
            })
        })

        return series
    }

    setConfig() {

        return {
            title: { text: "" },
            chart: {
                width : null,
                height : this.props.chartHeight,
                zoomType : "x",
                resetZoomButton : {
                    theme : {
                        style : { color : "#ddd" }
                    }
                }
            },
            yAxis: {
                title: { text: "Nombre de cas" },
                type: this.props.scale
            },
            xAxis: {
                type: 'datetime'
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                itemStyle: {
                    color: '#bbb'
                },
                itemHoverStyle:{
                    color: '#fff'
                }
            },
            tooltip : {
                dateTimeLabelFormats : {
                    day : "%A %e %b %Y"
                }
            },
            series: this.setSeries()
        }
    }

    render() {
        return (
            <HighchartsReact
                highcharts={ Highcharts }
                options={ this.setConfig() }
                { ...this.props }
            />
        )
    }
})