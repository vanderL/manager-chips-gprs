module.exports = {
    active(timestamp) {
        const today = new Date()
        const activeDate = new Date(timestamp)

        let active = today.getFullYear() - activeDate.getFullYear()
        const month = today.getMonth() - activeDate.getMonth()

        if (month < 0 ||
            month == 0 && 
            today.getDate() <= activeDate.getDate()){
            active = active - 1
        }

        return active
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            activeDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    formatPrice(price) {
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price/100)
    }
}
